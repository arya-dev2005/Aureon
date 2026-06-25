import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "./db.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type JwtPayload = {
  userId: string;
};

type AuthRequest = Request & {
  userId?: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return secret;
}

function readCookie(req: Request, name: string) {
  const cookies = req.headers.cookie?.split(";") ?? [];
  const match = cookies
    .map((cookie) => cookie.trim().split("="))
    .find(([key]) => key === name);

  return match ? decodeURIComponent(match.slice(1).join("=")) : undefined;
}

function setAuthCookie(res: Response, token: string) {
  res.cookie("aureon_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
}

function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice("Bearer ".length)
    : undefined;
  const token = headerToken ?? readCookie(req, "aureon_token");

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    req.userId = decoded.userId;
    return next();
  } catch {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

function publicUser(user: { id: string; email: string; name: string | null }) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      status: "degraded",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown database error",
      timestamp: new Date().toISOString(),
    });
  }
});

app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    const email = body.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name: body.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    const token = jwt.sign({ userId: user.id }, getJwtSecret(), { expiresIn: "24h" });
    setAuthCookie(res, token);

    return res.status(201).json({ token, user: publicUser(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid registration details", issues: error.errors });
    }
    return res.status(500).json({ error: error instanceof Error ? error.message : "Registration failed" });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, getJwtSecret(), { expiresIn: "24h" });
    setAuthCookie(res, token);

    return res.json({ token, user: publicUser(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid login details", issues: error.errors });
    }
    return res.status(500).json({ error: error instanceof Error ? error.message : "Login failed" });
  }
});

app.get("/api/auth/me", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Profile lookup failed" });
  }
});

export default app;
