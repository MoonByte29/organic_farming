import React, { useState } from 'react';
import { Gift, Building2, Heart, CheckCircle2, Send, Phone, Mail, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';

export const BulkOrdersPage: React.FC = () => {
  const [tier, setTier] = useState<'standard' | 'reserve' | 'heritage'>('reserve');
  const [quantity, setQuantity] = useState<number>(50);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('corporate');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const tierPrices = {
    standard: 1250,
    reserve: 2200,
    heritage: 3450
  };

  const discountRate = quantity >= 100 ? 0.20 : quantity >= 50 ? 0.15 : 0.10;
  const unitPrice = tierPrices[tier];
  const discountedUnitPrice = Math.round(unitPrice * (1 - discountRate));
  const estimatedTotal = discountedUnitPrice * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setIsSubmitting(true);
    try {
      await apiService.submitInquiry({
        fullName,
        email,
        phone,
        occasion,
        quantity,
        tier,
        budgetRange: `₹${estimatedTotal.toLocaleString('en-IN')}`,
        message
      });
    } catch (err) {
      console.warn('Backend inquiry error, proceeding with confirmation:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#F8F6F0] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans mb-2">
            CONSCIOUS CURATIONS FOR CELEBRATIONS
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#222421] mb-4">
            Bespoke Gifting & Wholesale Partnerships
          </h1>
          <p className="text-sm sm:text-base text-[#5B5D56] leading-relaxed">
            Move away from throwaway plastics and mass-manufactured sweets. Gift your teams, wedding guests, or clients heirloom organic nourishment paired with handcrafted ceramic keepsakes that last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Hamper Estimator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-2 font-sans">
                <Sparkles className="w-4 h-4" />
                <span>Step 1: Estimate Your Custom Hamper</span>
              </div>
              <h3 className="font-serif text-2xl text-[#222421] mb-4">
                Select Hamper Tier & Quantity
              </h3>

              {/* Tier Selection */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => setTier('standard')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    tier === 'standard'
                      ? 'bg-[#38432B] text-white border-[#38432B]'
                      : 'bg-[#FFFFFF] text-[#222421] border-[#E5DFD1] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div>
                    <div className="font-serif text-lg font-medium">The Earth Essentials Hamper</div>
                    <div className={`text-xs ${tier === 'standard' ? 'text-[#D0DBC4]' : 'text-[#6F726A]'}`}>
                      Wild Honey (350g) + Tellicherry Pepper (150g) + Hand-turned Wooden Dipper
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm shrink-0 ml-3">
                    ₹1,250 <span className="text-xs font-normal opacity-75">/ box</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('reserve')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    tier === 'reserve'
                      ? 'bg-[#38432B] text-white border-[#38432B]'
                      : 'bg-[#FFFFFF] text-[#222421] border-[#E5DFD1] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div>
                    <div className="font-serif text-lg font-medium flex items-center gap-2">
                      <span>The Monsoon Harvest Chest</span>
                      <span className="text-[10px] bg-[#C87A54] text-white px-2 py-0.5 rounded-full font-sans font-semibold">
                        Most Popular
                      </span>
                    </div>
                    <div className={`text-xs ${tier === 'reserve' ? 'text-[#D0DBC4]' : 'text-[#6F726A]'}`}>
                      Wood-Pressed Mustard Oil + Wild Honey + Lakadong Turmeric + Handcrafted Speckled Ceramic Mug
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm shrink-0 ml-3">
                    ₹2,200 <span className="text-xs font-normal opacity-75">/ box</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('heritage')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    tier === 'heritage'
                      ? 'bg-[#38432B] text-white border-[#38432B]'
                      : 'bg-[#FFFFFF] text-[#222421] border-[#E5DFD1] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div>
                    <div className="font-serif text-lg font-medium">The Royal Agro-Heritage Trunk</div>
                    <div className={`text-xs ${tier === 'heritage' ? 'text-[#D0DBC4]' : 'text-[#6F726A]'}`}>
                      All 5 signature single-origin provisions + Pair of Stoneware Mugs + Olive Oil Pourer in Reclaimed Teak Chest
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm shrink-0 ml-3">
                    ₹3,450 <span className="text-xs font-normal opacity-75">/ box</span>
                  </div>
                </button>
              </div>

              {/* Quantity Slider */}
              <div className="mb-6 pt-4 border-t border-[#E8E2D4]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#52554E] uppercase font-sans">
                    Order Volume
                  </span>
                  <span className="font-mono font-bold text-lg text-[#222421]">
                    {quantity} Units
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#38432B] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#868A80] mt-1">
                  <span>20 (Min order)</span>
                  <span>100 ({Math.round(discountRate * 100)}% Volume Discount)</span>
                  <span>500+</span>
                </div>
              </div>

              {/* Real-time Calculation Summary */}
              <div className="bg-[#EFE9DC] border border-[#DDD5C6] rounded-2xl p-5 space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6E66]">
                  <span>Catalog Price:</span>
                  <span className="font-mono line-through">₹{unitPrice * quantity}</span>
                </div>
                <div className="flex justify-between text-[#465B38] font-semibold">
                  <span>Volume Savings ({Math.round(discountRate * 100)}%):</span>
                  <span className="font-mono">-₹{(unitPrice - discountedUnitPrice) * quantity}</span>
                </div>
                <div className="pt-2 border-t border-[#D5CDC0] flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-[#222421]">
                    Estimated Total:
                  </span>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-[#38432B] tabular-nums">
                      ₹{estimatedTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[11px] text-[#71756C]">
                      (~₹{discountedUnitPrice}/unit incl. custom branding)
                    </span>
                  </div>
                </div>
              </div>

              {/* Inclusions checklist */}
              <div className="mt-5 space-y-1.5 text-xs text-[#52554E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38432B]" />
                  <span>Complimentary plantable marigold seed-paper message cards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38432B]" />
                  <span>Custom company logo sleeve or wax-seal ribbon customization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38432B]" />
                  <span>Doorstep pan-India multi-location dispatch support</span>
                </div>
              </div>
            </div>

            {/* Direct Studio Contact Info */}
            <div className="bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl p-6 text-xs text-[#52554E] space-y-3">
              <h4 className="font-serif text-lg font-medium text-[#222421]">
                Mitti & Monsoon Farm Concierge
              </h4>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#38432B]" />
                <span>+91 98450 18234 (Mon-Sat, 9am - 7pm IST)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#38432B]" />
                <span>gifting@mittimonsoon.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#38432B]" />
                <span>Studio 4, The Potter’s Orchard, Whitefield, Bengaluru 560066</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Submission Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-2 font-sans">
                Step 2: Submit Your Request
              </div>
              <h3 className="font-serif text-2xl text-[#222421] mb-2">
                Receive a Detailed Proposal within 4 Hours
              </h3>
              <p className="text-xs text-[#6F7369] mb-6">
                Tell us about your celebration, wedding, or organization. We’ll curate sample tasting kits and physical samples for your review.
              </p>

              {submitted ? (
                <div className="bg-[#EBF3E6] border border-[#CAD9BF] p-8 rounded-2xl text-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#38432B] text-white flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl font-medium text-[#222421] mb-2">
                    Enquiry Received with Gratitude!
                  </h4>
                  <p className="text-xs text-[#52554E] leading-relaxed mb-4">
                    Thank you, {fullName}. Our lead artisan concierge has received your request for <strong>{quantity} units</strong> of {tier === 'standard' ? 'The Earth Essentials Hamper' : tier === 'reserve' ? 'The Monsoon Harvest Chest' : 'The Royal Agro-Heritage Trunk'}.
                  </p>
                  <p className="text-xs text-[#52554E] font-medium">
                    We will send a formal digital brochure and confirm your sample dispatch to <strong>{email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs text-[#38432B] underline font-semibold cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-[#3E413B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Chandni Sharma"
                      className="w-full bg-white border border-[#DDD5C6] rounded-xl px-4 py-3 text-sm focus:border-[#38432B] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-[#3E413B] mb-1">
                        Corporate / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="chandni@company.com"
                        className="w-full bg-white border border-[#DDD5C6] rounded-xl px-4 py-3 text-sm focus:border-[#38432B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#3E413B] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-[#DDD5C6] rounded-xl px-4 py-3 text-sm focus:border-[#38432B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#3E413B] mb-1">
                      Gifting Occasion / Type *
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-white border border-[#DDD5C6] rounded-xl px-4 py-3 text-sm focus:border-[#38432B] focus:outline-none cursor-pointer"
                    >
                      <option value="corporate">Corporate Festive Gifting (Diwali / New Year / Annual Meet)</option>
                      <option value="wedding">Conscious Wedding Return Favours</option>
                      <option value="wholesale">Wholesale Supply for Cafe / Hotel / Farm Store</option>
                      <option value="event">Wellness Retreat / Conference Delegate Kits</option>
                      <option value="other">Custom Bespoke Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#3E413B] mb-1">
                      Customization Notes / Delivery Deadlines (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share preferred delivery dates, custom branding requests, or specific dietary preferences..."
                      className="w-full bg-white border border-[#DDD5C6] rounded-xl px-4 py-3 text-sm focus:border-[#38432B] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] py-3.5 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Gifting Enquiry</span>
                  </button>

                  <p className="text-[11px] text-[#787B72] text-center mt-2">
                    Direct human review · We respect your privacy and never share your contact details.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
