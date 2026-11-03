import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const inquiriesRouter = Router();

// POST /api/inquiries
inquiriesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, occasion, quantity, tier, budgetRange, message } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Full name, email, and phone number are required.' });
    }

    const tierPrices: Record<string, number> = {
      standard: 1250,
      reserve: 2200,
      heritage: 3450
    };

    const requestedQty = Number(quantity) || 50;
    const selectedTier = tier || 'reserve';
    const baseUnit = tierPrices[selectedTier] || 2200;
    const discountRate = requestedQty >= 100 ? 0.20 : requestedQty >= 50 ? 0.15 : 0.10;
    const estimatedUnitPrice = Math.round(baseUnit * (1 - discountRate));
    const estimatedTotal = estimatedUnitPrice * requestedQty;

    const inquiryId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;

    const inquiry = await db.inquiries.create({
      inquiryId,
      fullName,
      email,
      phone,
      occasion: occasion || 'corporate',
      tier: selectedTier,
      quantity: requestedQty,
      estimatedUnitPrice,
      estimatedTotal,
      budgetRange: budgetRange || `₹${estimatedTotal.toLocaleString('en-IN')}`,
      message: message || '',
      status: 'pending_concierge_review',
      assignedTo: 'Artisan Gifting Concierge'
    });

    res.status(201).json({
      success: true,
      inquiryId,
      data: inquiry,
      message: 'Bulk gifting inquiry received. Sample proposal being prepared.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/inquiries
inquiriesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const inquiries = await db.inquiries.find();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
