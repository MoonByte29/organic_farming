import { Router, Request, Response } from 'express';
import { productsRouter } from './products.js';
import { ordersRouter } from './orders.js';
import { inquiriesRouter } from './inquiries.js';
import { newsletterRouter } from './newsletter.js';
import { authRouter } from './auth.js';
import { farmersRouter } from './farmers.js';
import { batchesRouter } from './batches.js';
import { couponsRouter } from './coupons.js';
import { adminRouter } from './admin.js';
import { db } from '../db/mongodb.js';

export const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/inquiries', inquiriesRouter);
apiRouter.use('/newsletter', newsletterRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/farmers', farmersRouter);
apiRouter.use('/batches', batchesRouter);
apiRouter.use('/coupons', couponsRouter);
apiRouter.use('/admin', adminRouter);

// Comprehensive MERN Stack health check and database telemetry
apiRouter.get('/health', async (_req: Request, res: Response) => {
  try {
    const productsCount = await db.products.countDocuments();
    const ordersCount = await db.orders.countDocuments();
    const inquiriesCount = await db.inquiries.countDocuments();
    const subscribersCount = await db.subscribers.countDocuments();
    const usersCount = await db.users.countDocuments();
    const farmersCount = await db.farmers.countDocuments();
    const batchesCount = await db.batches.countDocuments();
    const couponsCount = await db.coupons.countDocuments();

    res.json({
      status: 'healthy',
      stack: 'MERN (MongoDB, Express, React, Node.js)',
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        engine: 'MongoDB Document Engine',
        collections: {
          products: productsCount,
          orders: ordersCount,
          inquiries: inquiriesCount,
          subscribers: subscribersCount,
          users: usersCount,
          farmers: farmersCount,
          batches: batchesCount,
          coupons: couponsCount
        }
      },
      endpoints: [
        'GET /api/products',
        'GET /api/products/:id',
        'POST /api/products/:id/reviews',
        'POST /api/orders',
        'GET /api/orders/:id',
        'GET /api/orders',
        'POST /api/inquiries',
        'GET /api/inquiries',
        'POST /api/newsletter',
        'POST /api/auth/send-otp',
        'POST /api/auth/verify-otp',
        'GET /api/auth/me',
        'PUT /api/auth/profile',
        'GET /api/farmers',
        'GET /api/farmers/:id',
        'GET /api/batches/:batchId',
        'POST /api/coupons/validate',
        'GET /api/admin/metrics',
        'GET /api/health'
      ],
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});
