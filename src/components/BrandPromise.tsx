import React from 'react';
import { Droplets, HeartHandshake, PackageCheck, Sun } from 'lucide-react';

export const BrandPromise: React.FC = () => {
  const promises = [
    {
      icon: Sun,
      title: 'Living Soil & Native Seeds',
      kicker: 'Regenerative Agriculture',
      description: 'Grown exclusively with indigenous heirloom varieties nurtured by rainwater and bio-diverse polyculture.'
    },
    {
      icon: Droplets,
      title: 'Heritage Wooden Cold-Press',
      kicker: 'Slow Extraction <38°C',
      description: 'Pressed gently in seasoned Vaagai wood churns to preserve active phytonutrients and natural aroma.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Farmer Fair Trade',
      kicker: 'Fair Wages for 450+ Families',
      description: 'We bypass intermediaries to pay guaranteed living premiums directly to smallholder farming collectives.'
    },
    {
      icon: PackageCheck,
      title: 'Clay Storage & Zero Plastics',
      kicker: 'Eco-Conscious Packaging',
      description: 'Preserved in terracotta clay and amber glass containers to protect living nutrients from sunlight degradation.'
    }
  ];

  return (
    <section className="py-16 bg-[#F3EFE6] border-b border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
            OUR SACRED CONVICTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mt-2 mb-3">
            Honoring the soil, the rainfall & the hands that harvest
          </h2>
          <p className="text-sm sm:text-base text-[#61635C]">
            We bridge rural Indian smallholders with conscious urban homes, delivering unadulterated nourishment in its purest form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p, index) => {
            const IconComponent = p.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF8F3] border border-[#E5DFD1] rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#D5CDC0] flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#E8E2D5] text-[#38432B] flex items-center justify-center mb-5">
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7E73] mb-1 font-sans">
                    {p.kicker}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#222421] mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#5B5D56] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
