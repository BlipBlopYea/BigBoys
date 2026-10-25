import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import express from 'express';
import { ApiError, createBookingsRouter } from './bookings.js';
import { createEquipmentRouter } from './equipment.js';
import { createPaymentsRouter } from './payments.js';

export function createApp(prisma) {
  const app = express();
  app.use(express.json({
    limit: '100kb',
    verify(req, res, buffer) {
      req.rawBody = Buffer.from(buffer);
    }
  }));
  app.use('/api/equipment', createEquipmentRouter(prisma));
  app.use('/api/bookings', createBookingsRouter(prisma));
  app.use('/api', createPaymentsRouter(prisma));
  const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
  app.get(['/', '/index.html'], (req, res, next) => res.sendFile(join(projectRoot, 'index.html'), error => error && next(error)));
  for (const asset of ['app.js', 'styles.css', 'heroimage.jpg', 'BigBoys.jpg']) {
    app.get(`/${asset}`, (req, res, next) => res.sendFile(join(projectRoot, asset), error => error && next(error)));
  }
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint was not found.' });
  });
  app.use((error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Request body must contain valid JSON.' });
    }
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'Request body is too large.' });
    }
    if (error instanceof ApiError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error('Unhandled API error:', error);
    return res.status(500).json({ error: 'An unexpected server error occurred.' });
  });
  return app;
}
