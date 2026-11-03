import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const ordersRouter = Router();

// POST /api/orders
ordersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { items, customer, paymentMethod, couponCode } = req.body;

    if (!items || !items.length || !customer || !customer.fullName || !customer.phone || !customer.address) {
      return res.status(400).json({ success: false, message: 'Invalid order payload. Missing items or address.' });
    }

    // Server-side calculation of pricing and verification
    let calculatedSubtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const productId = item.productId || item.product?.id;
      const product = await db.products.findById(productId);
      const price = product ? product.price : (item.product?.price || 0);
      const name = product ? product.name : (item.product?.name || 'Artisanal item');
      const qty = item.quantity || 1;

      calculatedSubtotal += price * qty;
      orderItems.push({
        productId,
        name,
        price,
        quantity: qty,
        unit: product?.unit || item.product?.unit || 'unit'
      });
    }

    let discount = 0;
    if (couponCode && String(couponCode).toUpperCase() === 'MONSOON250') {
      discount = Math.min(250, calculatedSubtotal > 500 ? 250 : 0);
    }

    const freeShippingThreshold = 999;
    const shippingFee = calculatedSubtotal >= freeShippingThreshold ? 0 : 99;
    const totalAmount = Math.max(0, calculatedSubtotal - discount + shippingFee);

    // Generate Order ID (e.g. MM-784192)
    const orderId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = await db.orders.create({
      orderId,
      customer: {
        fullName: customer.fullName,
        phone: customer.phone,
        email: customer.email || '',
        address: customer.address,
        pincode: customer.pincode,
        city: customer.city
      },
      items: orderItems,
      subtotal: calculatedSubtotal,
      discount,
      shippingFee,
      totalAmount,
      couponCode: discount > 0 ? 'MONSOON250' : null,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'pending_on_delivery' : 'confirmed_prepaid',
      fulfillmentStatus: 'preparing_harvest_batch',
      estimatedDeliveryDays: '3-4 business days',
      packagingType: '100% plastic-free unbleached kraft & amber glass'
    });

    res.status(201).json({
      success: true,
      orderId,
      data: newOrder,
      message: 'Harvest order confirmed and scheduled for zero-plastic dispatch.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/:id
ordersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const rawId = (req.params.id || '').trim();
    const cleanId = rawId.toLowerCase();
    
    // Look up by exact orderId, case-insensitive, or partial number
    const order = await db.orders.findOne((o: any) => {
      if (!o) return false;
      const orderId = (o.orderId || '').toLowerCase();
      const docId = (o._id || '').toLowerCase();
      return orderId === cleanId || docId === cleanId || orderId.endsWith(cleanId) || cleanId.endsWith(orderId);
    });

    if (!order) {
      return res.status(404).json({ success: false, message: `Order #${rawId} not found in database.` });
    }
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders (lookup by phone)
ordersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      const allOrders = await db.orders.find();
      return res.json({ success: true, count: allOrders.length, data: allOrders.slice(0, 20) });
    }
    const orders = await db.orders.find((o: any) => o.customer?.phone === phone);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
