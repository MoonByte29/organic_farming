import React from 'react';
import { X, BookOpen, UserCheck, Eye, Sparkles, CheckCircle } from 'lucide-react';

interface DesignNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignNoteModal: React.FC<DesignNoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#222421] border border-[#DDD5C6] flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8 border-b border-[#E5DFD1] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D7] text-xs font-semibold text-[#885A3B] uppercase tracking-wider mb-2 font-sans">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Assignment Deliverable C</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#222421]">
            Candidate Design Note & Creative Rationale
          </h2>
          <div className="text-xs text-[#7A7E73] mt-1 font-mono">
            Candidate: Chandni · Role: Website Designer / Creative Assessment
          </div>
        </div>

        {/* 1-Page Concise Rationale Content */}
        <div className="space-y-8 text-[#4E514A] leading-relaxed text-sm">
          
          {/* Section 1: Who the Website is For */}
          <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6 sm:p-7 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-2 font-sans">
              <UserCheck className="w-4 h-4 text-[#38432B]" />
              <span>1. Who the Website is For (Target Personas)</span>
            </div>
            <h3 className="font-serif text-2xl text-[#222421] mb-3">
              Conscious Indian Consumers Transitioning from Commoditized Grocery to Intentional Living
            </h3>
            <p className="mb-4">
              Moving from local farmers' markets to pan-India digital commerce requires speaking to three distinct audience cohorts who distrust conventional supermarket chains:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#EDE7DB]">
                <strong className="text-[#222421] block text-sm mb-1 font-serif">Health-Conscious Families</strong>
                <p className="text-[#656860]">
                  Parents seeking authentic cold-pressed oils (unrefined, Mara Chekku) and low-GI heirloom millets for child nutrition and elder diabetic care. They demand verifiable batch IDs and chemical-free lab test reports.
                </p>
              </div>
              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#EDE7DB]">
                <strong className="text-[#222421] block text-sm mb-1 font-serif">Urban Professionals & Home Cooks</strong>
                <p className="text-[#656860]">
                  25–40 year olds in metros who enjoy mindful weekend cooking and desire aesthetics in their kitchen. They care where their Tellicherry pepper and single-estate honey come from, appreciating the farmer's story.
                </p>
              </div>
              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#EDE7DB]">
                <strong className="text-[#222421] block text-sm mb-1 font-serif">Conscious Gifting Buyers</strong>
                <p className="text-[#656860]">
                  Corporate leaders and wedding hosts weary of disposable plastic-wrapped confectioneries, looking for premium, wholesome hampers that convey thoughtfulness, wellness, and artisanal cultural pride.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Why I Chose this Look */}
          <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6 sm:p-7 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-2 font-sans">
              <Eye className="w-4 h-4 text-[#38432B]" />
              <span>2. Why I Chose This Look (Visual & Atmospheric Rationale)</span>
            </div>
            <h3 className="font-serif text-2xl text-[#222421] mb-3">
              Tactile Warmth, Architectural Calm & Zero "Supermarket Clutter"
            </h3>
            <p className="mb-3">
              Most grocery websites in India look like discount hypermarkets—screaming red discount tags, countdown timers, flashing banners, and hundreds of tiny thumbnail grids. This induces visual exhaustion and commoditizes the farmer’s sweat.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38432B] mt-2 shrink-0" />
                <span><strong>Warm Oatmeal & Limestone Canvas (`#F8F6F0`):</strong> Mimics natural unbleached handmade paper and morning sunlight, establishing an immediate visceral calming effect.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38432B] mt-2 shrink-0" />
                <span><strong>Cormorant Garamond Serif Pairing:</strong> Evokes the timeless dignity of historical Indian botanical journals, conveying luxury through quiet restraint rather than loud badges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38432B] mt-2 shrink-0" />
                <span><strong>Unboxed Spatial Discipline:</strong> Eliminating pill-shaped card borders in favor of generous whitespace and hairline divisions gives the product photography space to breathe, reflecting slow, honest craftsmanship.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: The One Big Idea */}
          <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6 sm:p-7 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-2 font-sans">
              <Sparkles className="w-4 h-4 text-[#38432B]" />
              <span>3. The One Big Idea (What Makes It Unique)</span>
            </div>
            <h3 className="font-serif text-2xl text-[#222421] mb-3">
              "Mitti & Monsoon": Uniting the Pure Organic Harvest with the Earthen Vessel
            </h3>
            <div className="bg-[#F6F2E8] p-5 rounded-xl border border-[#E4DCBA] mb-4">
              <p className="font-serif italic text-base sm:text-lg text-[#2E302A] leading-relaxed">
                "In traditional Indian homes, food was never isolated from the vessel that stored or cooked it. Mustard oil was cured in earthen jars; water was cooled in clay handis; chai was relished in porous kulhads."
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#555850] leading-relaxed">
              Mitti & Monsoon bridges this divide. We do not just sell cold-pressed oil or wild honey; we provide the complete ritual of rooted living: single-origin edible harvests paired with handcrafted stoneware cruets, spice cellars, and chai mugs. By showing how organic produce and ceramic craft stem from the identical soil (Mitti) watered by the monsoon rains, the brand transforms grocery from a recurring commodity chore into a deeply satisfying lifestyle experience.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
