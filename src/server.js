import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { createApp } from './app.js';
import { isDatabaseUnavailable } from './runtime-store.js';

const prisma = new PrismaClient();
const app = createApp(prisma);
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  console.log(`Big Boys Rental API listening on port ${port}`);
});

prisma.$connect().catch(error => {
  if (isDatabaseUnavailable(error)) {
    console.warn('PostgreSQL is unavailable; API data operations will use the in-memory fallback.');
    return;
  }
  console.error('Unable to connect to PostgreSQL:', error.message);
});

async function shutdown(signal) {
  console.log(`Received ${signal}; shutting down.`);
  server.close(async error => {
    if (error) {
      console.error('Error while closing the HTTP server:', error);
      process.exitCode = 1;
    }
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('Error while disconnecting Prisma:', disconnectError);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
