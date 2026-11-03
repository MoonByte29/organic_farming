import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const authRouter = Router();

// POST /api/auth/send-otp
authRouter.post('/send-otp', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone || String(phone).replace(/\D/g, '').length < 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit Indian phone number required.' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    // In production SMS integration (e.g. Twilio/Msg91), here we dispatch SMS.
    // For seamless testing, we generate an authentic 4-digit code (e.g. 1234 or random)
    const code = cleanPhone === '9876543210' ? '1234' : Math.floor(1000 + Math.random() * 9000).toString();

    await db.otps.create({
      phone: cleanPhone,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    });

    res.json({
      success: true,
      message: `OTP sent to +91 ${cleanPhone}.`,
      demoCode: code
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/verify-otp
authRouter.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone number and OTP code required.' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);

    // Check OTP record or allow standard test code 1234
    const validOtp = await db.otps.findOne((o: any) => o.phone === cleanPhone && (o.code === otp || otp === '1234'));

    if (!validOtp && otp !== '1234') {
      return res.status(401).json({ success: false, message: 'Invalid or expired OTP code.' });
    }

    // Lookup or create customer profile
    let user = await db.users.findOne((u: any) => u.phone === cleanPhone);
    if (!user) {
      user = await db.users.create({
        phone: cleanPhone,
        name: `Harvest Member ${cleanPhone.slice(-4)}`,
        email: `member.${cleanPhone.slice(-4)}@mittimonsoon.in`,
        loyaltySeeds: 100, // 100 welcome seeds
        level: 'Seedling Guardian',
        address: '',
        city: 'India',
        pincode: '',
        ordersCount: 0
      });
    }

    // Fetch user's orders
    const userOrders = await db.orders.find((o: any) => o.customer?.phone === cleanPhone);

    res.json({
      success: true,
      token: `mm_token_${user._id}_${Date.now()}`,
      user: {
        ...user,
        orders: userOrders
      },
      message: 'Authentication successful. Welcome to the Mitti & Monsoon Circle.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/auth/me
authRouter.get('/me', async (req: Request, res: Response) => {
  try {
    const phone = req.query.phone ? String(req.query.phone).replace(/\D/g, '').slice(-10) : '9876543210';
    let user = await db.users.findOne((u: any) => u.phone === phone);

    if (!user) {
      user = await db.users.create({
        phone,
        name: 'Chandni Sharma',
        email: 'chandni@mittimonsoon.in',
        loyaltySeeds: 420,
        level: 'Soil Guardian',
        address: 'Indiranagar, Bengaluru',
        city: 'Bengaluru',
        pincode: '560038',
        ordersCount: 3
      });
    }

    const orders = await db.orders.find((o: any) => o.customer?.phone === phone);

    res.json({
      success: true,
      user: {
        ...user,
        orders
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/auth/profile
authRouter.put('/profile', async (req: Request, res: Response) => {
  try {
    const { phone, name, email, address, city, pincode } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number required to identify account.' });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const updated = await db.users.updateOne(
      (u: any) => u.phone === cleanPhone,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(address && { address }),
        ...(city && { city }),
        ...(pincode && { pincode })
      }
    );

    res.json({ success: true, user: updated, message: 'Profile updated successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
