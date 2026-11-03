import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sprout, ShieldCheck, CloudRain } from 'lucide-react';
import CeramicsHeroImage from '../assets/images/hero_ceramics_still_life_1793651013505.jpg';
import OilsHoneyHeroImage from '../assets/images/hero_organic_harvest_1793651015582.jpg';
import MilletsGrainsHeroImage from '../assets/images/millets_heritage_grains_1793650250177.jpg';
import SpicesHeroImage from '../assets/images/spices_stone_ground_1793650251807.jpg';

interface HeroProps {
  onShopClick: () => void;
  onStoryClick: () => void;
  onProductSelect?: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onStoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'ceramics',
      eyebrow: 'HANDCRAFTED • EARTHY • TIMELESS',
      titleLine1: 'Everyday pieces,',
      titleLine2: 'rooted in earth',
      titleAccent: '& rain',
      subtext: 'Handcrafted ceramics, home décor and lifestyle pieces inspired by nature, soil and the monsoon.',
      ctaPrimary: 'Shop the Collection',
      ctaSecondary: 'Our Story',
      image: CeramicsHeroImage,
      badge: 'Ceramic Studio',
      feature1: 'Handcrafted with care',
      feature2: 'Sustainable materials',
      feature3: 'Inspired by nature'
    },
    {
      id: 'oils-honey',
      eyebrow: 'SINGLE-ORIGIN • COLD-PRESSED • PURE',
      titleLine1: 'Living pantry,',
      titleLine2: 'pressed from soil',
      titleAccent: '& sunshine',
      subtext: 'Mara Chekku wood-pressed oils and wild canopy raw honey harvested in harmony with seasonal rhythms.',
      ctaPrimary: 'Explore Organic Pantry',
      ctaSecondary: 'Meet Our Farmers',
      image: OilsHoneyHeroImage,
      badge: 'Virgin Cold-Press',
      feature1: 'Wood-churned <38°C',
      feature2: 'Zero synthetic inputs',
      feature3: 'Lab-tested purity'
    },
    {
      id: 'millets-grains',
      eyebrow: 'HERITAGE • UNPOLISHED • NUTRIENT-RICH',
      titleLine1: 'Ancient millets,',
      titleLine2: 'nurtured by monsoon',
      titleAccent: '& native seeds',
      subtext: 'Drought-hardy heirloom foxtail and little millets cultivated by indigenous farming cooperatives across drylands.',
      ctaPrimary: 'Shop Ancient Grains',
      ctaSecondary: 'Seed-to-Shelf Story',
      image: MilletsGrainsHeroImage,
      badge: 'Heirloom Harvest',
      feature1: 'High dietary fiber',
      feature2: 'Naturally low-GI',
      feature3: 'Zero micro-plastics'
    },
    {
      id: 'spices',
      eyebrow: 'POTENT • STONE-GROUND • SACRED',
      titleLine1: 'Forest spices,',
      titleLine2: 'pulverized cold on',
      titleAccent: '& stone chakkis',
      subtext: 'High-curcumin Lakadong turmeric and Tellicherry black peppercorns from misty shade-grown forest canopies.',
      ctaPrimary: 'Discover Spices',
      ctaSecondary: 'View Lab Reports',
      image: SpicesHeroImage,
      badge: '7.4% Curcumin',
      feature1: 'Cold watermill ground',
      feature2: 'Zero lead & starches',
      feature3: 'Direct farmer trade'
    }
  ];

  const slide = slides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#F8F6F0] overflow-hidden border-b border-[#E8E2D5]">
      {/* Background soft ambient warm gradient */}
      <div className="absolute inset-0 bg-radial from-[#F4EFE6]/60 via-[#F8F6F0] to-[#F8F6F0] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-6 z-10 flex flex-col justify-center max-w-xl">
            {/* Eyebrow / Kicker */}
            <div className="mb-4">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
                {slide.eyebrow}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.08] tracking-[-0.015em] text-[#222421] mb-6">
              <span className="block">{slide.titleLine1}</span>
              <span className="block">
                {slide.titleLine2}{' '}
                <span className="italic font-normal text-[#465B38] font-serif ml-1">
                  {slide.titleAccent}
                </span>
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-base sm:text-lg text-[#5A5C56] font-normal leading-relaxed mb-8 max-w-lg">
              {slide.subtext}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={onShopClick}
                className="bg-[#38432B] hover:bg-[#2C3522] text-[#F8F6F0] px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2.5 shadow-sm group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38432B]/30"
              >
                <span>{slide.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onStoryClick}
                className="border border-[#9C9A91] hover:border-[#38432B] text-[#333530] hover:text-[#38432B] px-8 py-3.5 rounded-full font-medium text-sm transition-colors duration-200 bg-transparent cursor-pointer focus:outline-none"
              >
                {slide.ctaSecondary}
              </button>
            </div>

            {/* Value Propositions Strip */}
            <div className="pt-6 border-t border-[#E5DFD1] grid grid-cols-3 gap-3 sm:gap-6 text-xs text-[#52544E]">
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DC] flex items-center justify-center shrink-0 text-[#38432B]">
                  <Sprout className="w-4 h-4 stroke-[1.8]" />
                </div>
                <span className="font-medium leading-tight">{slide.feature1}</span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DC] flex items-center justify-center shrink-0 text-[#38432B]">
                  <ShieldCheck className="w-4 h-4 stroke-[1.8]" />
                </div>
                <span className="font-medium leading-tight">{slide.feature2}</span>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DC] flex items-center justify-center shrink-0 text-[#38432B]">
                  <CloudRain className="w-4 h-4 stroke-[1.8]" />
                </div>
                <span className="font-medium leading-tight">{slide.feature3}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-xl border border-[#E2DBD0] bg-[#EFEAE0] aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Product Visual */}
              <img
                src={slide.image}
                alt={`${slide.titleLine1} ${slide.titleLine2} - Mitti & Monsoon`}
                className="w-full h-full object-cover transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Subtle architectural vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Slide badge */}
              <div className="absolute top-4 left-4 bg-[#F8F6F0]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#38432B] border border-[#E2DBD0] shadow-xs">
                {slide.badge}
              </div>

              {/* Interactive Carousel Arrows */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-[#F8F6F0]/85 hover:bg-[#F8F6F0] text-[#292A28] border border-[#DED7C8] flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2]" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-[#F8F6F0]/85 hover:bg-[#F8F6F0] text-[#292A28] border border-[#DED7C8] flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              {/* Carousel Pagination Dots */}
              <div className="absolute bottom-5 right-6 flex items-center gap-2 z-20 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlide
                        ? 'w-6 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
