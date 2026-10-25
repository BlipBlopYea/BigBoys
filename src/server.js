import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { createApp } from './app.js';

const prisma = new PrismaClient();
const app = createApp(prisma);
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  console.log(`Big Boys Rental API listening on port ${port}`);
});

async function shutdown(signal) {
  console.log(`Received ${signal}; shutting down.`);
  server.close(async error => {
    if (error) {
      console.error('Error while closing the HTTP server:', error);
      process.exitCode = 1;
    }
    await prisma.$disconnect();
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
