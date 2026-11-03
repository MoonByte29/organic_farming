import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const newsletterRouter = Router();

// POST /api/newsletter
newsletterRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await db.subscribers.findOne((s: any) => s.email === normalizedEmail);

    if (existing) {
      return res.json({
        success: true,
        alreadySubscribed: true,
        voucherCode: 'MONSOON250',
        message: 'Welcome back! Your code MONSOON250 is active for ₹250 off.'
      });
    }

    const subscriber = await db.subscribers.create({
      email: normalizedEmail,
      status: 'active',
      voucherIssued: 'MONSOON250',
      source: 'website_footer_newsletter'
    });

    res.status(201).json({
      success: true,
      data: subscriber,
      voucherCode: 'MONSOON250',
      message: 'Successfully subscribed to the Monsoon Chronicle. Code MONSOON250 has been issued.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/newsletter
newsletterRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const subscribers = await db.subscribers.find();
    res.json({ success: true, count: subscribers.length });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
