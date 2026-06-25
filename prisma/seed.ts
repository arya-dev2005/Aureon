import { PrismaClient } from '@prisma/client';
import { ALL_PRODUCTS } from '../src/app/data/products.ts';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing products...');
  await prisma.product.deleteMany({});

  console.log('Seeding products from frontend dataset...');
  for (const product of ALL_PRODUCTS) {
    await prisma.product.create({
      data: {
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        rating: product.rating,
        reviewsCount: product.reviews,
        badge: product.badge,
        stock: product.stock,
        premium: product.premium,
        emoji: product.emoji,
        category: product.category,
        description: product.description,
        features: product.features,
        specs: product.specs,
        colors: product.colors,
        tags: product.tags,
      },
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
