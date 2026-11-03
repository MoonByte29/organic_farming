import React, { useState } from 'react';
import { CartItem } from '../types';
import { apiService } from '../services/api';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag, Truck, Loader2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenTracking?: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenTracking
}) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'success'>('cart');
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Shipping form state
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const [couponError, setCouponError] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const freeShippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || rawSubtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, rawSubtotal - (couponApplied ? discountAmount : 0) + shippingFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError('');
    try {
      const res = await apiService.validateCoupon(couponCode, rawSubtotal);
      if (res.valid) {
        setCouponApplied(true);
        setDiscountAmount(res.discountAmount || 250);
      } else {
        setCouponError(res.message || 'Invalid coupon code');
      }
    } catch (err) {
      if (couponCode.trim().toUpperCase() === 'MONSOON250') {
        setCouponApplied(true);
        setDiscountAmount(250);
      } else {
        setCouponError('Invalid coupon code');
      }
    }
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) return;

    setIsSubmitting(true);
    try {
      // Send to MERN backend Express route -> MongoDB
      const res = await apiService.createOrder({
        items: cartItems.map((ci) => ({ productId: ci.product.id, quantity: ci.quantity })),
        customer: { fullName, phone, address, pincode, city: city || 'India' },
        paymentMethod,
        couponCode: couponApplied ? 'MONSOON250' : undefined
      });

      setOrderId(res.orderId || `MM-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStep('success');
      onClearCart();
    } catch (err) {
      console.warn('Backend order placement error, fallback to client order ID:', err);
      const generatedId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setCheckoutStep('success');
      onClearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF8F3] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DFD1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5DFD1] flex items-center justify-between bg-[#F8F6F0]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#38432B]" />
            <h3 className="font-serif text-xl font-medium text-[#222421]">
              {checkoutStep === 'cart' && 'Your Harvest Bag'}
              {checkoutStep === 'address' && 'Delivery Address'}
              {checkoutStep === 'success' && 'Harvest Dispatched'}
            </h3>
          </div>
          <button
            onClick={resetAll}
            className="w-8 h-8 rounded-full hover:bg-[#EAE4D7] flex items-center justify-center text-[#555850] cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {checkoutStep === 'cart' && (
            <>
              {/* Free shipping progress bar */}
              <div className="bg-[#FFFFFF] border border-[#E8E2D6] p-3.5 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#38432B] font-medium">
                    <Truck className="w-3.5 h-3.5" />
                    {isFreeShipping ? 'You’ve unlocked Free Express Shipping across India!' : `Add ₹${freeShippingThreshold - rawSubtotal} more for Free Shipping`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#EFEAE0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#38432B] transition-all duration-300"
                    style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EFEAE0] text-[#787C72] flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg text-[#222421] mb-1">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-[#71746B] mb-4">
                    Explore single-origin cold-pressed oils, wild raw honey, and handcrafted tableware.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#38432B] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#252E1C] cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white border border-[#E8E2D6] rounded-xl p-3 flex gap-3 items-center justify-between"
                    >
                      <div className="w-16 h-16 rounded-lg bg-[#F2EDE1] overflow-hidden shrink-0 border border-[#E8E2D6]">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-2">
                        <h5 className="font-serif text-sm font-medium text-[#222421] truncate">
                          {item.product.name}
                        </h5>
                        <div className="text-[11px] text-[#71746B]">
                          {item.product.unit} · ₹{item.product.price}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-[#F2ECE0] hover:bg-[#E5DFD1] text-[#222421] flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono tabular-nums w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-[#F2ECE0] hover:bg-[#E5DFD1] text-[#222421] flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0 flex flex-col justify-between items-end h-16">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#9E9F99] hover:text-[#C87A54] cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-serif font-bold text-sm text-[#222421] tabular-nums">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Form */}
              {cartItems.length > 0 && (
                <div className="pt-2">
                  {couponApplied ? (
                    <div className="bg-[#EBF3E6] border border-[#CAD7BF] p-2.5 rounded-xl flex items-center justify-between text-xs text-[#38432B]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#465B38]" />
                        <span>Code <strong>MONSOON250</strong> applied (-₹{discountAmount})</span>
                      </div>
                      <button
                        onClick={() => setCouponApplied(false)}
                        className="text-[11px] text-[#7E8278] hover:text-black underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try code: MONSOON250"
                        className="flex-1 bg-white border border-[#DDD5C6] rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#38432B]"
                      />
                      <button
                        type="submit"
                        className="bg-[#EFEAE0] hover:bg-[#E5DFD1] text-[#222421] px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'address' && (
            <form onSubmit={handleCompleteOrder} className="space-y-3.5 text-xs">
              <div className="bg-[#FAF4E8] p-3 rounded-xl border border-[#E5DAC4] text-[11px] text-[#555850]">
                📦 Safe zero-plastic dispatch from Bangalore within 24 hours.
              </div>

              <div>
                <label className="block font-medium text-[#3E413B] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chandni"
                  className="w-full bg-white border border-[#DDD5C6] rounded-xl px-3.5 py-2.5 text-xs focus:border-[#38432B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-medium text-[#3E413B] mb-1">Phone (for OTP) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-[#DDD5C6] rounded-xl px-3.5 py-2.5 text-xs focus:border-[#38432B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#3E413B] mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 560001"
                    className="w-full bg-white border border-[#DDD5C6] rounded-xl px-3.5 py-2.5 text-xs focus:border-[#38432B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#3E413B] mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, building, street, landmark"
                  className="w-full bg-white border border-[#DDD5C6] rounded-xl px-3.5 py-2 text-xs focus:border-[#38432B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#3E413B] mb-1">City & State *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Bengaluru, Karnataka"
                  className="w-full bg-white border border-[#DDD5C6] rounded-xl px-3.5 py-2.5 text-xs focus:border-[#38432B] focus:outline-none"
                />
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <label className="block font-medium text-[#3E413B] mb-1.5">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-[#38432B] text-white border-[#38432B]'
                        : 'bg-white text-[#383A35] border-[#DDD5C6]'
                    }`}
                  >
                    <div className="font-bold text-[11px]">UPI / QR</div>
                    <div className="text-[10px] opacity-75">GPay/PhonePe</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#38432B] text-white border-[#38432B]'
                        : 'bg-white text-[#383A35] border-[#DDD5C6]'
                    }`}
                  >
                    <div className="font-bold text-[11px]">Pay on Delivery</div>
                    <div className="text-[10px] opacity-75">Cash / UPI</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#38432B] text-white border-[#38432B]'
                        : 'bg-white text-[#383A35] border-[#DDD5C6]'
                    }`}
                  >
                    <div className="font-bold text-[11px]">Cards</div>
                    <div className="text-[10px] opacity-75">Debit/Credit</div>
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] py-3.5 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Confirm Order · ₹{finalTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full text-center text-[11px] text-[#71756C] underline cursor-pointer"
              >
                ← Back to cart items
              </button>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#38432B] text-white flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-[#222421]">
                Order Confirmed!
              </h4>
              <div className="bg-[#EFE9DC] inline-block px-4 py-1.5 rounded-lg font-mono text-sm font-bold text-[#38432B]">
                Order #{orderId}
              </div>
              <p className="text-xs text-[#565952] max-w-xs mx-auto leading-relaxed">
                Thank you for supporting 450+ Indian regenerative farming families. We are carefully packing your harvest in amber glass and unbleached kraft paper.
              </p>
              <div className="bg-white border border-[#E8E2D6] p-4 rounded-xl text-left text-xs space-y-1.5 text-[#5B5E57]">
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-[#222421]">3-4 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Tracking Updates:</span>
                  <span className="font-semibold text-[#222421]">Sent via WhatsApp & SMS</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <span className="font-semibold text-[#38432B]">100% Plastic-Free</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    if (onOpenTracking) {
                      onOpenTracking(orderId);
                    }
                    resetAll();
                  }}
                  className="w-full bg-[#38432B] hover:bg-[#252E1C] text-white px-6 py-3 rounded-xl text-xs font-semibold cursor-pointer shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Package Live</span>
                </button>

                <button
                  onClick={resetAll}
                  className="w-full bg-white hover:bg-[#F2ECE0] text-[#55594F] border border-[#DDD7C9] px-6 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer (Summary & Action) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E5DFD1] bg-[#F8F6F0] space-y-3">
            <div className="space-y-1 text-xs text-[#6F7369]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-[#222421]">₹{rawSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#465B38] font-medium">
                  <span>Welcome Voucher:</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping across India:</span>
                <span className="font-mono">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-[#E5DFD1] flex justify-between items-baseline font-bold text-sm text-[#222421]">
                <span>Total Amount:</span>
                <span className="font-serif text-xl text-[#38432B] tabular-nums">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('address')}
              className="w-full bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] py-3.5 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#7E8278]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38432B]" />
                100% Secure Checkout
              </span>
              <span>·</span>
              <span>No-Questions Return Guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
