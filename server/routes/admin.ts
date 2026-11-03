import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const adminRouter = Router();

// GET /api/admin/metrics
adminRouter.get('/metrics', async (_req: Request, res: Response) => {
  try {
    const orders = await db.orders.find();
    const inquiries = await db.inquiries.find();
    const subscribers = await db.subscribers.find();
    const products = await db.products.find();
    const users = await db.users.find();

    const totalRevenue = orders.reduce((acc: number, o: any) => acc + (o.totalAmount || 0), 0);
    const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

    // Fulfillment status breakdown
    const fulfillmentStats = {
      preparing: orders.filter((o: any) => o.fulfillmentStatus === 'preparing_harvest_batch').length,
      dispatched: orders.filter((o: any) => o.fulfillmentStatus === 'dispatched_in_amber_glass').length,
      delivered: orders.filter((o: any) => o.fulfillmentStatus === 'delivered').length
    };

    res.json({
      success: true,
      data: {
        totalRevenue,
        ordersCount: orders.length,
        averageOrderValue,
        inquiriesCount: inquiries.length,
        subscribersCount: subscribers.length,
        productsCount: products.length,
        registeredCustomersCount: users.length,
        fulfillmentStats,
        recentOrders: orders.slice(0, 5)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/orders/:id/status
adminRouter.patch('/orders/:id/status', async (req: Request, res: Response) => {
  try {
    const { fulfillmentStatus, paymentStatus } = req.body;
    const order = await db.orders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const updated = await db.orders.updateOne(
      (o: any) => o._id === order._id,
      {
        ...(fulfillmentStatus && { fulfillmentStatus }),
        ...(paymentStatus && { paymentStatus })
      }
    );

    res.json({ success: true, data: updated, message: 'Order status updated.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
