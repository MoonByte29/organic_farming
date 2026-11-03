export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'oils' | 'honey' | 'millets' | 'spices' | 'ceramics' | 'hampers';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  image: string;
  origin: string;
  farmer: string;
  harvestSeason: string;
  batchId: string;
  certifications: string[];
  description: string;
  benefits: string[];
  tasteNotes?: string;
  process: string;
  nutrition: {
    calories: string;
    keyNutrient: string;
    pureExtraction: string;
  };
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  region: string;
  state: string;
  crop: string;
  farmingMethod: string;
  experienceYears: number;
  quote: string;
  story: string;
  image: string;
  hectaresRegenerated: number;
}

export interface BulkOrderInquiry {
  fullName: string;
  email: string;
  phone: string;
  occasion: string;
  quantity: number;
  budgetRange: string;
  message: string;
}

export type TrackingStatus = 'order_confirmed' | 'packed' | 'dispatched' | 'in_transit' | 'out_for_delivery' | 'delivered';

export interface TrackingMilestone {
  id: string;
  stage: TrackingStatus;
  title: string;
  subtitle: string;
  timestamp: string;
  location: string;
  completed: boolean;
  isCurrent: boolean;
  notes?: string;
}

export interface TrackingDetails {
  orderId: string;
  awbNumber: string;
  carrier: string;
  status: TrackingStatus;
  statusLabel: string;
  originHub: string;
  destinationCity: string;
  destinationAddress: string;
  recipientName: string;
  estimatedDelivery: string;
  packedDate: string;
  packagingDetails: string;
  ecoImpact: {
    plasticSaved: string;
    carbonOffset: string;
  };
  items: {
    productId?: string;
    name: string;
    price: number;
    quantity: number;
    unit?: string;
    image?: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
  milestones: TrackingMilestone[];
}

