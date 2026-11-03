import { Router, Request, Response } from 'express';
import { db } from '../db/mongodb';

export const productsRouter = Router();

// GET /api/products
productsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, origin, q, maxPrice } = req.query;
    let items = await db.products.find();

    if (category && category !== 'all') {
      items = items.filter((p: any) => p.category === category);
    }

    if (origin && origin !== 'all') {
      items = items.filter((p: any) => p.origin.toLowerCase().includes(String(origin).toLowerCase()));
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!isNaN(max)) {
        items = items.filter((p: any) => p.price <= max);
      }
    }

    if (q) {
      const queryStr = String(q).toLowerCase();
      items = items.filter((p: any) =>
        p.name.toLowerCase().includes(queryStr) ||
        p.subtitle.toLowerCase().includes(queryStr) ||
        p.origin.toLowerCase().includes(queryStr)
      );
    }

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/products/:id
productsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await db.products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/products/:id/reviews
productsRouter.post('/:id/reviews', async (req: Request, res: Response) => {
  try {
    const { name, rating, city, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Missing required review fields' });
    }

    const review = await db.reviews.create({
      productId: req.params.id,
      name,
      rating: Number(rating),
      city: city || 'India',
      comment,
      verifiedPurchase: true
    });

    // Update product rating and reviews count
    const product = await db.products.findById(req.params.id);
    if (product) {
      const newCount = (product.reviewsCount || 0) + 1;
      const currentRating = product.rating || 5.0;
      const updatedRating = Number(((currentRating * product.reviewsCount + Number(rating)) / newCount).toFixed(1));
      await db.products.updateOne({ _id: product._id }, {
        rating: updatedRating,
        reviewsCount: newCount
      });
    }

    res.status(201).json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
