import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Ananya Sengupta',
      role: 'Integrative Nutritionist & Functional Medicine Practitioner',
      city: 'Mumbai',
      quote: 'Most commercial "cold-pressed" oils in India are thermally refined to increase shelf life. Mitti & Monsoon’s Mara Chekku mustard and sesame oils are genuinely unheated; you can detect the living polyphenol aroma the moment you open the amber bottle.',
      impact: 'Recommends to 120+ clinical patients annually',
      rating: 5
    },
    {
      name: 'Chef Vikramaditya Rathore',
      role: 'Heritage Culinary Director, Oudh Kitchens',
      city: 'New Delhi',
      quote: 'The Tellicherry peppercorns and Lakadong turmeric possess depth that industrial spice brands simply cannot replicate. The stone-ground milling keeps the essential oils intact rather than burning them away in commercial hammer mills.',
      impact: 'Featured in signature regional tasting menus',
      rating: 5
    },
    {
      name: 'Priya & Karan Deshmukh',
      role: 'Conscious Home Cooks & Parents',
      city: 'Bengaluru',
      quote: 'We replaced polished white rice with Mitti & Monsoon’s unpolished Foxtail millet six months ago. Our kids love the nutty sweetness, and knowing the exact farm in Bundelkhand where it was harvested gives our family immense peace of mind.',
      impact: 'Subscribed customer for 8 consecutive harvests',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-[#F8F6F0] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
            TESTED & TRUSTED
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mt-2 mb-3">
            Voices from conscious kitchens across India
          </h2>
          <p className="text-sm sm:text-base text-[#61635C]">
            Stories of real health transformation from physicians, culinary masters, and everyday families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5DFD1] rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C87A54] text-[#C87A54]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#C8C2B3]" />
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#474A43] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#F2EDE1]">
                <div className="font-serif text-base font-medium text-[#222421]">
                  {t.name}
                </div>
                <div className="text-xs text-[#75786F] leading-tight mt-0.5">
                  {t.role} · <span className="text-[#38432B] font-medium">{t.city}</span>
                </div>
                <div className="mt-2 text-[11px] font-sans font-medium text-[#465B38] bg-[#F1EDE4] px-2.5 py-1 rounded inline-block">
                  ✓ {t.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
