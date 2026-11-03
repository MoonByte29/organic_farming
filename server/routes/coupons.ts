import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const couponsRouter = Router();

// POST /api/coupons/validate
couponsRouter.post('/validate', async (req: Request, res: Response) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code required.' });
    }

    const cleanCode = String(code).toUpperCase().trim();
    const coupon = await db.coupons.findOne((c: any) => c.code === cleanCode && c.isActive);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Invalid coupon code.'
      });
    }

    const total = Number(cartTotal) || 0;
    if (coupon.minOrderAmount && total < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Add ₹${coupon.minOrderAmount - total} more to apply code ${coupon.code}. Minimum order ₹${coupon.minOrderAmount}.`
      });
    }

    let discountAmount = 0;
    if (coupon.discountAmount) {
      discountAmount = Math.min(coupon.discountAmount, total);
    } else if (coupon.discountPercent) {
      discountAmount = Math.round((total * coupon.discountPercent) / 100);
    }

    res.json({
      success: true,
      valid: true,
      code: coupon.code,
      discountAmount,
      description: coupon.description,
      message: `Coupon ${coupon.code} applied! Saved ₹${discountAmount}.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/coupons
couponsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const coupons = await db.coupons.find((c: any) => c.isActive);
    res.json({ success: true, count: coupons.length, data: coupons });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
