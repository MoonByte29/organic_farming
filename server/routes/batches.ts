import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const batchesRouter = Router();

// GET /api/batches/:batchId
batchesRouter.get('/:batchId', async (req: Request, res: Response) => {
  try {
    const { batchId } = req.params;
    const batch = await db.batches.findOne((b: any) => b.batchId.toLowerCase() === batchId.toLowerCase());

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: `Batch ${batchId} not found in central laboratory database.`
      });
    }

    res.json({
      success: true,
      data: batch
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/batches
batchesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const batches = await db.batches.find();
    res.json({ success: true, count: batches.length, data: batches });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
