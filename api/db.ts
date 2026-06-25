import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Enable WebSockets support for Neon serverless drivers in Node
if (typeof globalThis === 'undefined' || !('window' in globalThis)) {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
