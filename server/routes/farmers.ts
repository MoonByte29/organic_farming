import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const farmersRouter = Router();

// GET /api/farmers
farmersRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const farmers = await db.farmers.find();
    res.json({
      success: true,
      count: farmers.length,
      data: farmers
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/farmers/:id
farmersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const farmer = await db.farmers.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({ success: false, message: 'Farmer collective not found.' });
    }
    res.json({ success: true, data: farmer });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
