import React from 'react';
import { Heart, Sprout, ShieldCheck, Mail, MapPin, Truck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, category?: string) => void;
  onOpenMiniKit: () => void;
  onOpenDesignNote: () => void;
  onOpenMernStatus?: () => void;
  onOpenTracking?: (orderId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenMiniKit,
  onOpenDesignNote,
  onOpenMernStatus,
  onOpenTracking
}) => {
  return (
    <footer className="bg-[#262824] text-[#D8D6CE] pt-16 pb-12 border-t border-[#383A34]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#3B3D37]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-serif text-3xl tracking-tight text-[#FAF8F3]">
              Mitti & Monsoon<sup className="text-xs font-sans font-normal opacity-70">®</sup>
            </div>
            <p className="font-serif italic text-sm text-[#A8B49E]">
              "Everyday pieces, rooted in earth & rain"
            </p>
            <p className="text-xs text-[#9B998E] leading-relaxed max-w-sm">
              Single-origin organic food harvests and handcrafted studio stoneware created in partnership with 450+ regenerative farmers and potters across rural India.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#BAB8AE]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8FA37E]" />
                Certified Organic
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-[#8FA37E]" />
                Zero Chemical Inputs
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-base font-medium text-[#FAF8F3]">
              Pantry Harvests
            </h4>
            <ul className="space-y-2 text-[#A8A69C]">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'oils')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wood-Pressed Oils (Kacchi Ghani)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'honey')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wild Forest Raw Honey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'millets')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Unpolished Ancient Millets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'spices')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stone-Ground Lakadong Turmeric
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'ceramics')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hand-Thrown Ceramic Mugs
                </button>
              </li>
            </ul>
          </div>

          {/* Ethos & Stories Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-base font-medium text-[#FAF8F3]">
              Ethos & Terroir
            </h4>
            <ul className="space-y-2 text-[#A8A69C]">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Genesis & Farmers’ Stalls
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  The Seed-to-Shelf Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bulk')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wedding & Corporate Gifting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Jaivik Bharat & NPOP Accreditations
                </button>
              </li>
            </ul>
          </div>

          {/* Assessment Deliverables Column */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-base font-medium text-[#FAF8F3]">
              Assessment Kit
            </h4>
            <ul className="space-y-2 text-[#A8A69C]">
              <li>
                <button
                  onClick={onOpenMiniKit}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#B8C9A7]"
                >
                  <span>→ View Brand Mini-Kit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDesignNote}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#DDB093]"
                >
                  <span>→ View 1-Page Design Note</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMernStatus}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#B8D8BA]"
                >
                  <span>→ MERN Backend & API Status</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenTracking?.('MM-ORD-4192')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#F0DFBD]"
                >
                  <span>→ Package Milestones & Live Tracking</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#86847A] leading-tight">
                Full-stack MERN with Node.js Express server, MongoDB document collections, and React frontend.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#87857C]">
          <div>
            © {new Date().getFullYear()} Mitti & Monsoon Organics Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Crafted with intentionality by Chandni</span>
            <span>·</span>
            <span>Bengaluru & Pune</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
