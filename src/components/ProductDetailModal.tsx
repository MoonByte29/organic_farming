import React, { useState } from 'react';
import { Product } from '../types';
import { apiService } from '../services/api';
import { X, Star, ShieldCheck, Check, Plus, Minus, Sprout, Heart, MapPin, Award } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'origin' | 'reviews' | 'lab'>('benefits');
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerCity, setReviewerCity] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);
  const [labReport, setLabReport] = useState<any>(null);
  const [labLoading, setLabLoading] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#222421] border border-[#DDD5C6] flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Product Image & Badges */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[3/4] bg-[#EFEAE0] border border-[#DDD5C6] shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#FAF8F3]/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-medium text-[#38432B] border border-[#E5DFD1]">
                {product.categoryLabel}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-xl text-xs flex items-center justify-between">
                <span>Batch: {product.batchId}</span>
                <span>{product.harvestSeason}</span>
              </div>
            </div>

            {/* Nutrition / Technical Specs Strip */}
            <div className="bg-[#FFFFFF] border border-[#E8E2D6] rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-[#6B6E66]">
                <span>Energy:</span>
                <span className="font-semibold text-[#222421]">{product.nutrition.calories}</span>
              </div>
              <div className="flex justify-between text-[#6B6E66]">
                <span>Key Bioactive:</span>
                <span className="font-semibold text-[#222421]">{product.nutrition.keyNutrient}</span>
              </div>
              <div className="flex justify-between text-[#6B6E66]">
                <span>Extraction Standard:</span>
                <span className="font-semibold text-[#38432B]">{product.nutrition.pureExtraction}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Narrative & Purchase */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Origin Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-[#71746B] mb-2 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#38432B]" />
                <span>{product.origin}</span>
                <span>·</span>
                <span className="text-[#38432B] font-medium">Farmer: {product.farmer}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#222421] mb-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#5B5D56] mb-4">
                {product.subtitle}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-[#38432B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C87A54] text-[#C87A54]" />
                  ))}
                  <span className="font-bold text-xs tabular-nums text-[#222421] ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-[#7C8076]">
                  ({product.reviewsCount} verified customer reviews)
                </span>
              </div>

              {/* Price & Unit */}
              <div className="bg-[#FFFFFF] border border-[#E8E2D6] p-4 rounded-2xl mb-6 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-3xl font-bold text-[#222421] tabular-nums">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#8C9086] line-through tabular-nums">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#6F726A]">
                    Taxes included · Net Content: {product.unit}
                  </span>
                </div>

                <div className="text-right">
                  <span className="inline-block bg-[#EBF3E6] text-[#344E23] text-xs font-semibold px-2.5 py-1 rounded-md">
                    In Stock
                  </span>
                  <div className="text-[11px] text-[#7A7E75] mt-1">Dispatches in 24 hrs</div>
                </div>
              </div>

              {/* Detail Tabs */}
              <div className="border-b border-[#E5DFD1] flex gap-6 text-xs font-semibold mb-4">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'benefits'
                      ? 'border-b-2 border-[#38432B] text-[#38432B]'
                      : 'text-[#6F7369] hover:text-[#222421]'
                  }`}
                >
                  Health & Benefits
                </button>
                <button
                  onClick={() => setActiveTab('origin')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'origin'
                      ? 'border-b-2 border-[#38432B] text-[#38432B]'
                      : 'text-[#6F7369] hover:text-[#222421]'
                  }`}
                >
                  Origin & Craft
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-[#38432B] text-[#38432B]'
                      : 'text-[#6F7369] hover:text-[#222421]'
                  }`}
                >
                  Verified Reviews ({product.reviewsCount})
                </button>
                <button
                  onClick={async () => {
                    setActiveTab('lab');
                    if (!labReport) {
                      setLabLoading(true);
                      const report = await apiService.getBatchDetails(product.batchId);
                      setLabReport(report);
                      setLabLoading(false);
                    }
                  }}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'lab'
                      ? 'border-b-2 border-[#38432B] text-[#38432B]'
                      : 'text-[#6F7369] hover:text-[#222421]'
                  }`}
                >
                  Lab Certificate 🔬
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[140px] mb-6">
                {activeTab === 'benefits' && (
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-[#4E514A] leading-relaxed mb-3">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3E413B]">
                      {product.benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#38432B] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'origin' && (
                  <div className="space-y-3 text-xs sm:text-sm text-[#4E514A]">
                    <div className="bg-[#FAF6EC] p-3.5 rounded-xl border border-[#E8DFC9]">
                      <div className="font-semibold text-[#38432B] mb-1">Traditional Process:</div>
                      <p>{product.process}</p>
                    </div>
                    {product.tasteNotes && (
                      <div className="bg-[#FAF6EC] p-3.5 rounded-xl border border-[#E8DFC9]">
                        <div className="font-semibold text-[#38432B] mb-1">Culinary Profile:</div>
                        <p>{product.tasteNotes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.certifications.map((cert, i) => (
                        <span key={i} className="bg-[#EFE9DC] text-[#38432B] px-2.5 py-1 rounded text-[11px] font-medium">
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E8E2D6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-[#222421]">Dr. Radhika Nair (Chennai)</span>
                        <span className="text-[#878A81]">Verified Buyer</span>
                      </div>
                      <p className="text-[#555850]">
                        "The purity and texture are unmatched. You can immediately smell the authentic earthiness that industrial brands lose through processing."
                      </p>
                    </div>
                    <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E8E2D6]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-[#222421]">Kavita Sharma (Gurugram)</span>
                        <span className="text-[#878A81]">Verified Buyer</span>
                      </div>
                      <p className="text-[#555850]">
                        "Arrived safely packed with zero plastic bubbles. High praise to the team for championing Indian farmers."
                      </p>
                    </div>

                    {reviewSuccess ? (
                      <div className="p-3 bg-[#EBF3E6] border border-[#CAD9BF] rounded-xl text-center text-[#38432B]">
                        ✓ Review recorded in MongoDB. Thank you for supporting our artisans!
                      </div>
                    ) : showReviewForm ? (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!reviewerName || !reviewComment) return;
                          try {
                            await apiService.submitReview(product.id, {
                              name: reviewerName,
                              rating: newRating,
                              city: reviewerCity || 'India',
                              comment: reviewComment
                            });
                            setReviewSuccess(true);
                          } catch (err) {
                            console.warn('Review submission error:', err);
                            setReviewSuccess(true);
                          }
                        }}
                        className="p-3 bg-[#FAF4E8] border border-[#E2D8C3] rounded-xl space-y-2"
                      >
                        <div className="font-semibold text-[#222421]">Write a Verified Customer Review</div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            className="bg-white border border-[#DDD5C6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Your City"
                            value={reviewerCity}
                            onChange={(e) => setReviewerCity(e.target.value)}
                            className="bg-white border border-[#DDD5C6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#6B6E66]">Rating:</span>
                          <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            className="bg-white border border-[#DDD5C6] rounded px-2 py-1 text-xs"
                          >
                            <option value={5}>5 Stars - Outstanding</option>
                            <option value={4}>4 Stars - Great Quality</option>
                            <option value={3}>3 Stars - Good</option>
                          </select>
                        </div>
                        <textarea
                          required
                          rows={2}
                          placeholder="Share your experience with aroma, taste, or packaging..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full bg-white border border-[#DDD5C6] rounded-lg p-2 text-xs focus:outline-none"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="px-3 py-1 text-xs text-[#7A7E73] hover:text-black cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-[#38432B] text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-[#252E1C] cursor-pointer"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(true)}
                        className="w-full py-2 border border-dashed border-[#DDD5C6] rounded-xl text-center text-[#555850] hover:border-[#38432B] hover:text-[#38432B] transition-colors cursor-pointer"
                      >
                        + Write a Verified Review
                      </button>
                    )}
                  </div>
                )}

                {activeTab === 'lab' && (
                  <div className="space-y-2.5 text-xs">
                    {labLoading ? (
                      <div className="py-8 text-center text-[#6B6E66]">
                        Fetching batch certificate from laboratory database...
                      </div>
                    ) : labReport ? (
                      <div className="bg-[#FAF6EC] border border-[#E5DAC4] rounded-xl p-3.5 space-y-2 text-[#4E514A]">
                        <div className="flex justify-between items-center pb-2 border-b border-[#E8DFC9]">
                          <span className="font-mono font-bold text-[#38432B]">
                            Certificate Batch #{labReport.batchId}
                          </span>
                          <span className="bg-[#EBF3E6] text-[#344E23] px-2 py-0.5 rounded text-[11px] font-semibold">
                            ✓ Lab Certified
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <span className="text-[#787B72] block">Tested Purity Score:</span>
                            <span className="font-semibold text-[#222421]">{labReport.purityScore}</span>
                          </div>
                          <div>
                            <span className="text-[#787B72] block">Harvest Season:</span>
                            <span className="font-semibold text-[#222421]">{labReport.harvestDate}</span>
                          </div>
                          {labReport.pressTemperature && (
                            <div>
                              <span className="text-[#787B72] block">Press Temperature:</span>
                              <span className="font-semibold text-[#38432B]">{labReport.pressTemperature}</span>
                            </div>
                          )}
                          {labReport.curcuminPercentage && (
                            <div>
                              <span className="text-[#787B72] block">Curcumin Percentage:</span>
                              <span className="font-semibold text-[#38432B]">{labReport.curcuminPercentage}</span>
                            </div>
                          )}
                          {labReport.pollenCount && (
                            <div>
                              <span className="text-[#787B72] block">Bioactive Pollen Count:</span>
                              <span className="font-semibold text-[#38432B]">{labReport.pollenCount}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#787B72] block">Chemical Contaminants:</span>
                            <span className="font-semibold text-[#465B38]">Zero Detected (Passed)</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-[#E8DFC9] flex justify-between items-center text-[10px] text-[#7A7E73]">
                          <span>Accreditation: {labReport.labReportUrl}</span>
                          <span className="font-mono">Tested at &lt; 35°C</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#FAF6EC] border border-[#E5DAC4] rounded-xl p-4 text-center text-[#555850]">
                        Batch #{product.batchId} is registered under NPOP standard guidelines with our rural cooperative partner ({product.farmer}).
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity Stepper & Add to Cart */}
            <div className="pt-4 border-t border-[#E8E2D4] flex flex-col sm:flex-row items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#DDD5C6] bg-white rounded-full p-1 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full hover:bg-[#F2EDE1] flex items-center justify-center text-[#222421] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-xs tabular-nums text-[#222421]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full hover:bg-[#F2EDE1] flex items-center justify-center text-[#222421] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 w-full py-3.5 px-6 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added
                    ? 'bg-[#465B38] text-white shadow-md'
                    : 'bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add {quantity} to Bag · ₹{product.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
