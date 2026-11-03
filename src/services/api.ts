import { Product, BulkOrderInquiry } from '../types';

export interface BackendHealth {
  status: string;
  stack: string;
  environment: string;
  uptimeSeconds: number;
  database: {
    engine: string;
    collections: {
      products: number;
      orders: number;
      inquiries: number;
      subscribers: number;
      users?: number;
      farmers?: number;
      batches?: number;
      coupons?: number;
    };
  };
  endpoints?: string[];
  timestamp: string;
}

export interface UserProfile {
  _id: string;
  phone: string;
  name: string;
  email: string;
  loyaltySeeds: number;
  level: string;
  address?: string;
  city?: string;
  pincode?: string;
  ordersCount: number;
  orders?: any[];
}

export interface BatchLabReport {
  batchId: string;
  productName: string;
  harvestDate: string;
  pressingDate?: string;
  pressTemperature?: string;
  acidValue?: string;
  purityScore: string;
  leadCadmiumTested?: string;
  curcuminPercentage?: string;
  leadChromateDetection?: string;
  pollenCount?: string;
  moistureContent?: string;
  sucroseContent?: string;
  labReportUrl: string;
  farmerGroup: string;
}

export const apiService = {
  // Check MERN backend health status
  async checkHealth(): Promise<BackendHealth | null> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('[API] Backend health check failed:', err);
      return null;
    }
  },

  // Auth: Send OTP
  async sendOtp(phone: string): Promise<{ success: boolean; message: string; demoCode?: string }> {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return await res.json();
  },

  // Auth: Verify OTP
  async verifyOtp(phone: string, otp: string): Promise<{ success: boolean; user?: UserProfile; token?: string; message: string }> {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    return await res.json();
  },

  // Auth: Get current profile
  async getMe(phone?: string): Promise<{ success: boolean; user: UserProfile }> {
    const url = phone ? `/api/auth/me?phone=${encodeURIComponent(phone)}` : '/api/auth/me';
    const res = await fetch(url);
    return await res.json();
  },

  // Auth: Update profile
  async updateProfile(data: Partial<UserProfile>): Promise<{ success: boolean; user: UserProfile }> {
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Fetch all products from MongoDB
  async getProducts(params?: { category?: string; origin?: string; q?: string; maxPrice?: number }): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.category && params.category !== 'all') searchParams.set('category', params.category);
      if (params?.origin && params.origin !== 'all') searchParams.set('origin', params.origin);
      if (params?.q) searchParams.set('q', params.q);
      if (params?.maxPrice) searchParams.set('maxPrice', String(params.maxPrice));

      const queryStr = searchParams.toString();
      const res = await fetch(`/api/products${queryStr ? `?${queryStr}` : ''}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API] Falling back to local data:', err);
      return [];
    }
  },

  // Submit checkout order to Express / MongoDB
  async createOrder(payload: {
    items: { productId: string; quantity: number }[];
    customer: { fullName: string; phone: string; email?: string; address: string; pincode: string; city: string };
    paymentMethod: string;
    couponCode?: string;
  }) {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to create order');
    }
    return await res.json();
  },

  // Lookup order by Order ID
  async getOrderById(orderId: string) {
    const res = await fetch(`/api/orders/${orderId}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  },

  // Validate promotional coupon
  async validateCoupon(code: string, cartTotal: number): Promise<{ success: boolean; valid: boolean; discountAmount: number; message: string }> {
    const res = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, cartTotal })
    });
    return await res.json();
  },

  // Lookup single-origin batch laboratory certificate
  async getBatchDetails(batchId: string): Promise<BatchLabReport | null> {
    try {
      const res = await fetch(`/api/batches/${encodeURIComponent(batchId)}`);
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    } catch (err) {
      return null;
    }
  },

  // Fetch farmers and terroirs from MongoDB
  async getFarmers(): Promise<any[]> {
    try {
      const res = await fetch('/api/farmers');
      if (!res.ok) return [];
      const json = await res.json();
      return json.data;
    } catch (err) {
      return [];
    }
  },

  // Submit bulk gifting inquiry to Express / MongoDB
  async submitInquiry(inquiry: BulkOrderInquiry & { tier: string }) {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to submit inquiry');
    }
    return await res.json();
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email: string) {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to subscribe');
    }
    return await res.json();
  },

  // Post verified customer review
  async submitReview(productId: string, review: { name: string; rating: number; city: string; comment: string }) {
    const res = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error('Failed to post review');
    return await res.json();
  },

  // Fetch e-commerce admin analytics
  async getAdminMetrics() {
    const res = await fetch('/api/admin/metrics');
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  }
};
