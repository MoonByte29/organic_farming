import React, { useState } from 'react';
import { FARMERS, CERTIFICATIONS } from '../data/farmers';
import { MapPin, Sprout, Heart, Shield, Award, Users, Droplets, CheckCircle } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(FARMERS[0].id);

  const activeFarmer = FARMERS.find((f) => f.id === selectedFarmerId) || FARMERS[0];

  return (
    <div className="bg-[#F8F6F0] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Brand Genesis Hero */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans mb-2">
            OUR SOIL, OUR RAINFALL, OUR JOURNEY
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#222421] leading-[1.1] mb-6">
            From local farmers’ market stalls to conscious Indian kitchens
          </h1>
          <p className="text-base sm:text-lg text-[#555850] leading-relaxed mb-4">
            Mitti & Monsoon began on a misty Sunday morning at a small wooden folding table in Bangalore’s farmers’ market. We set out to answer one urgent question: <span className="italic font-serif text-[#38432B]">Why had modern grocery shelves reduced India’s thousands of years of rich agrarian biodiversity to bleached, plastic-wrapped uniformity?</span>
          </p>
          <p className="text-sm sm:text-base text-[#656860] leading-relaxed">
            In India, wholesome nourishment has always been rooted in two eternal forces: <strong>Mitti</strong> (the sacred mineral-rich soil that feeds the seed and the clay that vessels are sculpted from) and <strong>Monsoon</strong> (the seasonal life-giving rains that awaken the dry earth). We unite them into one unbroken cycle.
          </p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <div className="bg-[#FAF8F3] border border-[#E2DBD0] rounded-2xl p-6 text-center">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#38432B] mb-1">
              450+
            </div>
            <div className="text-xs text-[#6F7369] font-medium">
              Smallholder farming families
            </div>
          </div>
          <div className="bg-[#FAF8F3] border border-[#E2DBD0] rounded-2xl p-6 text-center">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#38432B] mb-1">
              116 Ha
            </div>
            <div className="text-xs text-[#6F7369] font-medium">
              Land converted to regenerative organic
            </div>
          </div>
          <div className="bg-[#FAF8F3] border border-[#E2DBD0] rounded-2xl p-6 text-center">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#38432B] mb-1">
              +42%
            </div>
            <div className="text-xs text-[#6F7369] font-medium">
              Average price premium paid above MSP
            </div>
          </div>
          <div className="bg-[#FAF8F3] border border-[#E2DBD0] rounded-2xl p-6 text-center">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#38432B] mb-1">
              Zero
            </div>
            <div className="text-xs text-[#6F7369] font-medium">
              Synthetic chemicals or single-use plastics
            </div>
          </div>
        </div>

        {/* Terroir & Farmer Spotlights */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
                MEET THE GUARDIANS OF OUR SOIL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mt-1">
                Transparent Single-Origin Farm Partnerships
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6A6D64] max-w-md">
              Every jar, bottle, and pouch of Mitti & Monsoon can be traced back to an identified regional collective.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Farmers List Selector */}
            <div className="lg:col-span-5 space-y-3">
              {FARMERS.map((farmer) => (
                <button
                  key={farmer.id}
                  onClick={() => setSelectedFarmerId(farmer.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    farmer.id === selectedFarmerId
                      ? 'bg-[#38432B] text-[#F8F6F0] border-[#38432B] shadow-md'
                      : 'bg-[#FAF8F3] text-[#222421] border-[#E5DFD1] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-lg font-medium">
                      {farmer.name}
                    </span>
                    <span className={`text-xs ${farmer.id === selectedFarmerId ? 'text-[#D0DBC4]' : 'text-[#84887D]'}`}>
                      {farmer.region}, {farmer.state}
                    </span>
                  </div>
                  <div className={`text-xs ${farmer.id === selectedFarmerId ? 'text-[#E0E7D6]' : 'text-[#5B5D56]'}`}>
                    Crop: {farmer.crop}
                  </div>
                </button>
              ))}
            </div>

            {/* Farmer Deep Dive Card */}
            <div className="lg:col-span-7 bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden bg-[#EFEAE0] shrink-0 border border-[#DDD5C6]">
                  <img
                    src={activeFarmer.image}
                    alt={activeFarmer.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#38432B] font-semibold bg-[#EAE4D7] px-2.5 py-1 rounded-md mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeFarmer.region}, {activeFarmer.state}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#222421]">
                      {activeFarmer.name}
                    </h3>
                    <div className="text-xs text-[#6F7369] mt-1">
                      {activeFarmer.experienceYears} Years Practicing Natural Regenerative Farming
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8E2D4] text-xs text-[#52554E]">
                    <strong>Regenerative Method:</strong> {activeFarmer.farmingMethod}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-[#FAF4E8] border border-[#E5DAC4] p-5 rounded-2xl mb-6">
                <p className="font-serif italic text-base sm:text-lg text-[#3A3C36] leading-relaxed">
                  "{activeFarmer.quote}"
                </p>
              </div>

              {/* Bio Story */}
              <p className="text-sm text-[#555850] leading-relaxed mb-4">
                {activeFarmer.story}
              </p>

              {activeFarmer.hectaresRegenerated > 0 && (
                <div className="inline-flex items-center gap-2 text-xs text-[#38432B] font-medium bg-[#EFE9DC] px-3.5 py-1.5 rounded-lg">
                  <Sprout className="w-4 h-4" />
                  <span>{activeFarmer.hectaresRegenerated} Hectares Restored to Natural Biodiversity</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Certifications & Quality Standard */}
        <div className="bg-[#ECE6D8] border border-[#DDD5C5] rounded-3xl p-8 lg:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
              STANDARDS & ACCREDITATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mt-1 mb-2">
              Verifiable Organic Integrity
            </h2>
            <p className="text-xs sm:text-sm text-[#5B5E55]">
              We adhere strictly to certified Indian and global organic frameworks, supported by batch-by-batch laboratory testing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F3] border border-[#DFD7C8] rounded-2xl p-5 shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E8E1D3] text-[#38432B] flex items-center justify-center mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-mono font-semibold text-[#82867B] uppercase mb-1">
                  {cert.badge}
                </div>
                <h4 className="font-serif text-lg font-medium text-[#222421] mb-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-[#5D6058] leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
