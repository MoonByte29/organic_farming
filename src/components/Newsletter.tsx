import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      await apiService.subscribeNewsletter(email);
    } catch (err) {
      console.warn('Backend subscription error:', err);
    }
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#ECE6D8] border-b border-[#DDD5C5]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0D8C6] text-xs font-semibold tracking-wider text-[#38432B] uppercase mb-4 font-sans">
          <Mail className="w-3.5 h-3.5" />
          <span>The Monsoon Chronicle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mb-3">
          Seasonal crop despatches & earthen living notes
        </h2>
        
        <p className="text-sm sm:text-base text-[#5B5E55] max-w-xl mx-auto mb-8">
          Subscribe to receive our quarterly harvesting calendar, traditional millet recipes, and early access to limited single-estate oil and honey batches.
        </p>

        {submitted ? (
          <div className="bg-[#FAF8F3] border border-[#CAD4BF] p-6 rounded-2xl max-w-lg mx-auto animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-[#38432B] font-semibold mb-1">
              <CheckCircle2 className="w-5 h-5 text-[#465B38]" />
              <span>Welcome to the Mitti & Monsoon Circle!</span>
            </div>
            <p className="text-xs text-[#5D6058] mb-3">
              We’ve reserved your seasonal welcoming voucher:
            </p>
            <div className="bg-[#EFE9DC] border border-dashed border-[#B8B2A2] px-4 py-2.5 rounded-lg inline-block font-mono text-sm font-bold text-[#38432B] tracking-wider">
              MONSOON250
            </div>
            <p className="text-[11px] text-[#7E8278] mt-2">
              Valid for ₹250 off any purchase over ₹999. Applied automatically at checkout.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-[#FAF8F3] border border-[#D5CDC0] focus:border-[#38432B] focus:outline-none px-4 py-3.5 rounded-full text-sm text-[#222421] placeholder-[#8E9188] shadow-xs"
            />
            <button
              type="submit"
              className="bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] px-6 py-3.5 rounded-full font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Join Circle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-6 text-xs text-[#7A7E74] mt-6">
          <span>✓ Zero spam ever</span>
          <span>·</span>
          <span>✓ Seasonal crop alerts</span>
          <span>·</span>
          <span>✓ Unsubscribe anytime</span>
        </div>
      </div>
    </section>
  );
};
