import React, { useState } from 'react';
import { CloudRain, Sun, Disc3, ShieldCheck, ArrowRight } from 'lucide-react';

export const SeedToShelf: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'step-1',
      stepNum: '01',
      title: 'Monsoon Seeding & Living Soils',
      lead: 'Regenerative polyculture and native heirloom seeds',
      description: 'Our farming partners prepare soils during pre-monsoon showers using cow-dung vermicompost and indigenous Jeevamrutha brews. Zero chemical pesticides or synthetic DAP fertilizers touch the earth.',
      metric: '100% Native Heirloom Seeds',
      metricDetail: 'Never GM or lab-hybridized',
      icon: CloudRain,
      detailPoints: [
        'Naturally rainfed kharif & rabi cropping cycles',
        'Companion planting with marigold and legumes for organic pest repellent',
        'Living soils with 3.8x higher microbial biomass than conventional land'
      ],
      image: '/src/assets/images/millets_heritage_grains_1793650250177.jpg'
    },
    {
      id: 'step-2',
      stepNum: '02',
      title: 'Gentle Hand-Harvest & Sun-Curing',
      lead: 'Slow sun-drying under clean rural skies',
      description: 'Crops are hand-harvested at peak maturity by local farming collectives. Grains, mustard seeds, and turmeric rhizomes are spread on unbleached cotton and bamboo mats to dry gently in the Indian sun.',
      metric: 'Zero Industrial Kiln Drying',
      metricDetail: 'Natural moisture equilibrium',
      icon: Sun,
      detailPoints: [
        'Optimal moisture stabilized at 8-10% without burning fragile volatile oils',
        'Hand-sorted to remove damaged seeds or foreign matter',
        'Sunlight natural UV sterilization'
      ],
      image: '/src/assets/images/spices_stone_ground_1793650251807.jpg'
    },
    {
      id: 'step-3',
      stepNum: '03',
      title: 'Wood-Pressed & Stone-Milled',
      lead: 'Mara Chekku slow crushing below 38°C',
      description: 'Traditional slow-moving pestles made from seasoned Vaagai wood gently crush the oilseeds at 14 RPM. Turmeric and spices are pulverized between slow watermill-powered granite stones to retain curcumin and aroma.',
      metric: '< 38°C Extraction Heat',
      metricDetail: 'Preserves living enzymes',
      icon: Disc3,
      detailPoints: [
        'No industrial chemical solvents like hexane or caustic soda',
        'Natural decantation over 72 hours without artificial centrifugal bleaching',
        'Retains 100% natural vitamin E, sesame lignans, and pungent polyphenols'
      ],
      image: '/src/assets/images/oil_cold_pressed_1793650249541.jpg'
    },
    {
      id: 'step-4',
      stepNum: '04',
      title: 'Clay Curing & Eco-Friendly Delivery',
      lead: 'UV-blocking amber glass and unbleached kraft paper',
      description: 'Oils and honey are stored in terracotta tanks to settle, then poured into UV-shielding amber glass bottles with natural cork stoppers. We ship nationwide using corrugated paper and biodegradable paper tape.',
      metric: 'Zero Plastic Footprint',
      metricDetail: '100% recyclable glass & kraft',
      icon: ShieldCheck,
      detailPoints: [
        'UV-filtering bottles shield delicate oils from photo-oxidation',
        'Seed-paper packaging tags that bloom into wild marigolds when planted',
        'Carbon-neutral courier distribution to every pin code across India'
      ],
      image: '/src/assets/images/packaging_label_mockup_1793650251877.jpg'
    }
  ];

  const current = stages[activeStage];
  const IconComp = current.icon;

  return (
    <section className="py-20 bg-[#F4EFE6] border-b border-[#E0D9CB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
            SEED TO SHELF CHRONICLE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mt-2 mb-3">
            How honest food travels from Indian soil to your table
          </h2>
          <p className="text-sm sm:text-base text-[#5E6058]">
            An unhurried journey honoring time-tested Indian agrarian traditions, slow mechanical pressing, and zero synthetic shortcuts.
          </p>
        </div>

        {/* Interactive Steps Selector Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stages.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(idx)}
              className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                idx === activeStage
                  ? 'bg-[#38432B] text-[#F8F6F0] border-[#38432B] shadow-md'
                  : 'bg-[#FAF8F3] text-[#42443F] border-[#E2DBD0] hover:bg-[#FFFFFF]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${idx === activeStage ? 'text-[#D0DBC4]' : 'text-[#84877F]'}`}>
                  {st.stepNum}
                </span>
                <span className="text-[11px] font-sans opacity-75">Phase {idx + 1}</span>
              </div>
              <div className="font-medium text-xs sm:text-sm line-clamp-1">
                {st.title}
              </div>
            </button>
          ))}
        </div>

        {/* Stage Content Showcase Box */}
        <div className="bg-[#FAF8F3] border border-[#E0D8CA] rounded-3xl p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Narrative text & points */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBE5D8] text-[#38432B] flex items-center justify-center">
                <IconComp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#73776D]">STAGE {current.stepNum} OF 04</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#222421]">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#465B38] font-medium mb-3">
              {current.lead}
            </p>

            <p className="text-sm sm:text-base text-[#575A52] leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Metric pill */}
            <div className="inline-flex items-center gap-3 bg-[#EFE9DC] border border-[#E2DBD0] px-4 py-2 rounded-xl mb-6">
              <span className="font-serif text-lg font-bold text-[#38432B]">
                {current.metric}
              </span>
              <span className="text-xs text-[#6B6E66] border-l border-[#DCD5C5] pl-3">
                {current.metricDetail}
              </span>
            </div>

            {/* Detail Checklist */}
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#4F524A]">
              {current.detailPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38432B] mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Next stage quick button */}
            <div className="mt-8 pt-6 border-t border-[#EAE3D5] flex items-center justify-between">
              <span className="text-xs text-[#7A7E74]">
                Next: {stages[(activeStage + 1) % stages.length].title}
              </span>
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                className="text-xs font-semibold text-[#38432B] hover:text-[#222421] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Stage Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#DDD5C6] shadow-sm bg-[#EFEAE0]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF8F3]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#38432B] border border-[#E2DBD0]">
                Verified Organic Process
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
