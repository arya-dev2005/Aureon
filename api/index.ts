import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// JWT Auth Middleware helper
export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// 1. Health check route
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    // Check DB connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'healthy', database: 'connected', timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected', error: (err as Error).message });
  }
});

// Zod schemas for Auth
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// 2. Auth: Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: (err as Error).message });
  }
});

// 3. Auth: Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: (err as Error).message });
  }
});

// 4. Auth: Profile (Protected)
app.get('/api/auth/me', authenticate as express.RequestHandler, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// 5. Products: List & Filter
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const { cat, sort, q } = req.query;

    const whereClause: any = {};
    if (cat) {
      whereClause.category = String(cat);
    }
    if (q) {
      whereClause.OR = [
        { name: { contains: String(q), mode: 'insensitive' } },
        { brand: { contains: String(q), mode: 'insensitive' } },
        { description: { contains: String(q), mode: 'insensitive' } }
      ];
    }

    let orderBy: any = {};
    if (sort === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { price: 'desc' };
    } else if (sort === 'new') {
      orderBy = { id: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    } else {
      orderBy = { id: 'asc' };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: orderBy,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// 6. Products: Get by ID
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Zod schemas for order & review
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3),
});

const orderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

const orderSchema = z.object({
  items: z.array(orderItemSchema),
  paymentMethod: z.string(),
});

// 7. Products: Submit Review (Protected)
app.post('/api/products/:id/reviews', authenticate as express.RequestHandler, async (req: AuthRequest, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const body = reviewSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        productId,
        userId: user.id,
        userName: user.name || 'Anonymous Connoisseur',
        rating: body.rating,
        comment: body.comment,
      }
    });

    // Recalculate average rating
    const allReviews = await prisma.review.findMany({ where: { productId } });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewsCount: allReviews.length,
      }
    });

    res.status(201).json(review);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: (err as Error).message });
  }
});

// 8. Orders: Place Order
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const body = orderSchema.parse(req.body);

    // Optional auth token retrieval
    let userId: string | undefined;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };
        userId = decoded.userId;
      } catch (e) {
        // Continue as guest
      }
    }

    // Fetch and check all products
    let totalAmount = 0;
    const lineItems: { productId: number; quantity: number; price: number }[] = [];

    for (const item of body.items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
      totalAmount += product.price * item.quantity;
      lineItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order inside transaction
    const order = await prisma.$transaction(async (tx) => {
      const ord = await tx.order.create({
        data: {
          userId: userId || null,
          totalAmount,
          paymentMethod: body.paymentMethod,
          status: 'PAID', // Monolith mock completes payment immediately
        }
      });

      for (const line of lineItems) {
        await tx.orderItem.create({
          data: {
            orderId: ord.id,
            productId: line.productId,
            quantity: line.quantity,
            price: line.price,
          }
        });
      }

      return ord;
    });

    res.status(201).json(order);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: (err as Error).message });
  }
});

// 9. Orders: Get History (Protected)
app.get('/api/orders', authenticate as express.RequestHandler, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default app;
