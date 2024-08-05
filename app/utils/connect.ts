import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Ensure the global.prisma property is typed correctly
  const globalWithPrisma = global as typeof globalThis & { prisma?: PrismaClient };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
