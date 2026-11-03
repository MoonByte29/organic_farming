import React from 'react';
import { X, Layers, Palette, Type, Package, Check, Download } from 'lucide-react';

interface BrandMiniKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandMiniKitModal: React.FC<BrandMiniKitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const colorSwatches = [
    {
      name: 'Limestone Canvas',
      hex: '#F8F6F0',
      rgb: '248, 246, 240',
      role: '60% Primary Canvas / Warm background',
      textDark: true
    },
    {
      name: 'Deep Forest Olive',
      hex: '#38432B',
      rgb: '56, 67, 43',
      role: 'Primary Brand Tone / Buttons / Hero Accent',
      textDark: false
    },
    {
      name: 'Warm Terracotta',
      hex: '#C87A54',
      rgb: '200, 122, 84',
      role: 'Earthenware Warmth / Secondary Badges',
      textDark: false
    },
    {
      name: 'Monsoon Sage',
      hex: '#465B38',
      rgb: '70, 91, 56',
      role: 'Leaf Accents / Italic Script Highlights',
      textDark: false
    },
    {
      name: 'Raw Linen Sand',
      hex: '#EAE4D7',
      rgb: '234, 228, 215',
      role: 'Dividers / Card Surfaces / Subtle Frames',
      textDark: true
    },
    {
      name: 'Charcoal Earth',
      hex: '#222421',
      rgb: '34, 36, 33',
      role: 'High-Contrast Readable Typography',
      textDark: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D7] text-xs font-semibold text-[#38432B] uppercase tracking-wider mb-2 font-sans">
            <Layers className="w-3.5 h-3.5" />
            <span>Assignment Deliverable B</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#222421]">
            Mitti & Monsoon® — Brand Mini-Kit
          </h2>
          <p className="text-xs sm:text-sm text-[#656860] mt-1 max-w-2xl">
            Complete brand identity system: wordmark concept, color palette hierarchy, typography pairing, and sample sustainable packaging designs.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1: Logo Concept & Wordmark */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-3 font-sans">
              <span className="w-2 h-2 rounded-full bg-[#38432B]" />
              <span>01. Wordmark & Identity Concept</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#FFFFFF] border border-[#E5DFD1] rounded-2xl p-6 sm:p-8">
              <div className="md:col-span-6 bg-[#F8F6F0] p-8 rounded-xl border border-[#ECE6D8] text-center">
                <div className="font-serif text-4xl sm:text-5xl tracking-tight text-[#222421] mb-2">
                  Mitti & Monsoon<sup className="text-sm font-sans font-normal opacity-70">®</sup>
                </div>
                <div className="text-xs tracking-[0.25em] uppercase font-sans text-[#4A5340] font-medium">
                  HANDCRAFTED • EARTHY • TIMELESS
                </div>
                <div className="mt-4 font-serif italic text-sm text-[#465B38]">
                  "Everyday pieces, rooted in earth & rain"
                </div>
              </div>

              <div className="md:col-span-6 space-y-3 text-xs sm:text-sm text-[#50534C] leading-relaxed">
                <h4 className="font-serif text-lg font-medium text-[#222421]">
                  Conceptual Symbolism
                </h4>
                <p>
                  <strong>Mitti (The Earth/Soil):</strong> Anchors the brand in India's agricultural soil and the living red/black clay used by indigenous potters. It speaks to authenticity, mineral nutrition, and the unvarnished roots of our food.
                </p>
                <p>
                  <strong>Monsoon (The Rainfall):</strong> Celebrates the seasonal life-giving showers that rejuvenate parched farmlands, signaling freshness, growth, and sustainable rainfed crops like millets and mustard.
                </p>
                <p className="text-xs text-[#71756C]">
                  Together, the brand connects the wholesome organic nourishment of the earth directly to the clay vessels it is stored, cooked, and savored in.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Colour Palette */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-3 font-sans">
              <Palette className="w-4 h-4 text-[#38432B]" />
              <span>02. Harmonious Natural Colour Palette</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {colorSwatches.map((color, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#E5DFD1] rounded-2xl overflow-hidden shadow-2xs"
                >
                  <div
                    className="h-24 w-full p-2 flex items-end justify-start"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        color.textDark ? 'text-black/80 bg-white/60' : 'text-white bg-black/30'
                      }`}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="font-serif text-sm font-medium text-[#222421] leading-tight">
                      {color.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#8C9085] mt-0.5">
                      RGB: {color.rgb}
                    </div>
                    <div className="text-[11px] text-[#555850] mt-1 leading-snug">
                      {color.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Typography Hierarchy */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-3 font-sans">
              <Type className="w-4 h-4 text-[#38432B]" />
              <span>03. Typographic System & Font Pairing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6">
                <div className="text-[11px] font-mono text-[#787B72] uppercase mb-1">
                  Primary Display / Headline Face
                </div>
                <h4 className="font-serif text-2xl text-[#222421] mb-2">
                  Cormorant Garamond
                </h4>
                <p className="text-xs text-[#5E6159] leading-relaxed mb-4">
                  A classical, high-contrast serif inspired by 16th-century Garamond typefaces. Conveys artisanal craftsmanship, literary depth, and organic elegance without feeling sterile or corporate.
                </p>
                <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#EDE7DA] font-serif">
                  <div className="text-2xl text-[#222421]">Agro-Biodiversity in India</div>
                  <div className="text-xl italic text-[#465B38] mt-1">Everyday pieces, rooted in earth & rain</div>
                  <div className="text-xs text-[#898C82] mt-2 font-mono">Aa Bb Cc Dd Ee Ff Gg 1234567890</div>
                </div>
              </div>

              <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6">
                <div className="text-[11px] font-mono text-[#787B72] uppercase mb-1">
                  Functional Body & Interface Face
                </div>
                <h4 className="font-sans text-2xl font-bold text-[#222421] mb-2">
                  Plus Jakarta Sans
                </h4>
                <p className="text-xs text-[#5E6159] leading-relaxed mb-4">
                  A modern, geometric neo-grotesque sans-serif with high x-height and clear numerals. Delivers effortless legibility across nutritional tables, batch metadata, and checkout forms.
                </p>
                <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#EDE7DA] font-sans">
                  <div className="text-sm font-semibold text-[#222421]">Clean Interface & Data Clarity</div>
                  <div className="text-xs text-[#5A5D55] mt-1">Single-origin cold-pressed oil · Batch: MM-WPO-25B</div>
                  <div className="text-xs text-[#898C82] mt-2 font-mono tabular-nums">₹380 · 500ml · Curcumin: 7.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Sample Packaging & Label Ideas */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38432B] mb-3 font-sans">
              <Package className="w-4 h-4 text-[#38432B]" />
              <span>04. Two Sample Product Packaging / Label Ideas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Packaging Concept 1 */}
              <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#F2EDE2] mb-4 border border-[#E5DFD1]">
                    <img
                      src="/src/assets/images/packaging_label_mockup_1793650251877.jpg"
                      alt="Sample Pouch Packaging"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-[#465B38] font-bold uppercase mb-1">
                    Packaging Idea 01
                  </div>
                  <h4 className="font-serif text-xl font-medium text-[#222421] mb-2">
                    Unbleached Kraft Pouch with Plantable Seed-Paper Tag
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#53564F]">
                    <li>• <strong>Material:</strong> 100% biodegradable unbleached plant kraft with cornstarch barrier lining.</li>
                    <li>• <strong>Label Typography:</strong> Cormorant Garamond title with delicate single-color soy ink botanical illustration.</li>
                    <li>• <strong>Farmer Traceability:</strong> Prominent QR code linking directly to the farmer cooperative video and soil report.</li>
                    <li>• <strong>Circular Feature:</strong> Swing tag embedded with native marigold and tulsi seeds that customer can plant in soil.</li>
                  </ul>
                </div>
              </div>

              {/* Packaging Concept 2 */}
              <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#F2EDE2] mb-4 border border-[#E5DFD1]">
                    <img
                      src="/src/assets/images/oil_cold_pressed_1793650249541.jpg"
                      alt="Sample Glass Bottle Packaging"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-[#465B38] font-bold uppercase mb-1">
                    Packaging Idea 02
                  </div>
                  <h4 className="font-serif text-xl font-medium text-[#222421] mb-2">
                    UV-Shielding Amber Pharmaceutical Glass with Natural Cork
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#53564F]">
                    <li>• <strong>Material:</strong> Reusable amber glass filtering 99% of photo-oxidative UV light to protect polyphenols.</li>
                    <li>• <strong>Seal:</strong> Natural sustainably harvested Mediterranean cork stopper tied with natural jute twine.</li>
                    <li>• <strong>Label:</strong> Textured cotton-rag paper label with embossed gold foil batch seal.</li>
                    <li>• <strong>Return & Refill:</strong> Customers in top 8 Indian metros receive ₹50 discount for returning sanitized bottles.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
