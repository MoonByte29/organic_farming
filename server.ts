import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes/index.js';
import { db } from './server/db/mongodb.js';
import { SEED_PRODUCTS, SEED_FARMERS, SEED_BATCHES, SEED_COUPONS, SEED_USERS, SEED_ORDERS } from './server/db/seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON request body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Seed MongoDB document database with initial organic harvests, farmers, lab batches, and coupons
  try {
    db.products.seed(SEED_PRODUCTS);
    db.farmers.seed(SEED_FARMERS);
    db.batches.seed(SEED_BATCHES);
    db.coupons.seed(SEED_COUPONS);
    db.users.seed(SEED_USERS);
    db.orders.seed(SEED_ORDERS);
  } catch (err) {
    console.warn('[MongoDB] Seeding warning:', err);
  }

  // Mount MERN REST API routes under /api
  app.use('/api', apiRouter);

  // Serve static assets from public
  app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

  // In development, mount Vite middleware in middlewareMode
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve pre-built dist bundle
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MERN Stack] Mitti & Monsoon backend & frontend active at http://0.0.0.0:${PORT}`);
    console.log(`[MERN Stack] REST API running at http://0.0.0.0:${PORT}/api/health`);
  });
}

startServer().catch((err) => {
  console.error('[MERN Stack] Server startup error:', err);
  process.exit(1);
});
