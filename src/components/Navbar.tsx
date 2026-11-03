import React, { useState } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Sparkles, BookOpen, Layers, Truck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string, category?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenMiniKit: () => void;
  onOpenDesignNote: () => void;
  onOpenTracking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  onOpenMiniKit,
  onOpenDesignNote,
  onOpenTracking
}) => {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-2xl lg:text-[28px] tracking-tight text-[#292A28] group-hover:text-[#38432B] transition-colors">
              Mitti & Monsoon<sup className="text-xs ml-0.5 font-sans font-normal opacity-75">®</sup>
            </span>
          </button>
        </div>

        {/* Navigation Links Zone */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-[#4A4B47] font-medium">
          {/* Shop with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('shop')}
              className={`flex items-center gap-1.5 hover:text-[#292A28] transition-colors py-2 focus:outline-none ${
                activeTab === 'shop' ? 'text-[#292A28] font-semibold' : ''
              }`}
            >
              <span>Shop</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {shopDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-[#FCFBF8] border border-[#E5DFD1] shadow-lg rounded-xl py-3 px-2 mt-1 animate-in fade-in slide-in-from-top-1">
                <button
                  onClick={() => {
                    onNavigate('shop', 'all');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#38432B] font-medium hover:bg-[#F2ECE0] rounded-lg transition-colors"
                >
                  All Harvests & Wares
                </button>
                <div className="my-1.5 border-t border-[#ECE6D9]"></div>
                <button
                  onClick={() => {
                    onNavigate('shop', 'oils');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#4F504B] hover:text-[#292A28] hover:bg-[#F2ECE0] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Cold-Pressed Oils</span>
                  <span className="text-xs text-[#8A8984]">Wood Chekku</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop', 'honey');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#4F504B] hover:text-[#292A28] hover:bg-[#F2ECE0] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Wild Forest Honey</span>
                  <span className="text-xs text-[#8A8984]">Raw</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop', 'millets');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#4F504B] hover:text-[#292A28] hover:bg-[#F2ECE0] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Ancient Millets & Grains</span>
                  <span className="text-xs text-[#8A8984]">Unpolished</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop', 'spices');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#4F504B] hover:text-[#292A28] hover:bg-[#F2ECE0] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Stone-Ground Spices</span>
                  <span className="text-xs text-[#8A8984]">Lakadong</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop', 'ceramics');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#4F504B] hover:text-[#292A28] hover:bg-[#F2ECE0] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Handcrafted Tableware</span>
                  <span className="text-xs text-[#8A8984]">Stoneware</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop', 'hampers');
                    setShopDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm text-[#4F504B] hover:text-[#292A28] hover:bg-[#F2ECE0] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Curated Gift Hampers</span>
                  <span className="text-xs text-[#8A8984]">Festive</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className={`hover:text-[#292A28] transition-colors focus:outline-none ${
              activeTab === 'collections' ? 'text-[#292A28] font-semibold' : ''
            }`}
          >
            Collections
          </button>

          <button
            onClick={() => onNavigate('story')}
            className={`hover:text-[#292A28] transition-colors focus:outline-none ${
              activeTab === 'story' ? 'text-[#292A28] font-semibold' : ''
            }`}
          >
            Our Story
          </button>

          <button
            onClick={() => onNavigate('bulk')}
            className={`hover:text-[#292A28] transition-colors focus:outline-none ${
              activeTab === 'bulk' ? 'text-[#292A28] font-semibold' : ''
            }`}
          >
            Gifting & Bulk
          </button>

          <button
            onClick={onOpenTracking}
            className="hover:text-[#292A28] transition-colors focus:outline-none flex items-center gap-1.5 cursor-pointer text-[#4A4B47] hover:text-[#292A28]"
            title="Track Order Package & Delivery Milestones"
          >
            <Truck className="w-4 h-4 text-[#38432B]" />
            <span>Track Order</span>
          </button>

          {/* Quick links for Candidate Assessment deliverables */}
          {/* <div className="h-4 w-[1px] bg-[#D8D2C4] hidden xl:block"></div> */}
          
          {/* <button
            onClick={onOpenMiniKit}
            className="hidden xl:flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#5A634E] hover:text-[#292A28] font-medium transition-colors"
            title="View Brand Mini-Kit (Assignment Deliverable B)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Brand Kit</span>
          </button> */}

          {/* <button
            onClick={onOpenDesignNote}
            className="hidden xl:flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#885A3B] hover:text-[#292A28] font-medium transition-colors"
            title="View Design Rationale Note (Assignment Deliverable C)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Design Note</span>
          </button> */}
        </nav>

        {/* Action Icons Zone */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0 text-[#2F302C]">
          {/* Order Tracking Icon Button */}
          <button
            onClick={onOpenTracking}
            className="p-1.5 hover:text-[#38432B] transition-colors cursor-pointer rounded-full hover:bg-[#EAE4D7]/50"
            aria-label="Track package milestones"
            title="Track Order Status"
          >
            <Truck className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 hover:text-[#38432B] transition-colors cursor-pointer rounded-full hover:bg-[#EAE4D7]/50"
            aria-label="Search organic produce and tableware"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* User Account / Sign In */}
          <button
            onClick={onOpenAuth}
            className="p-1.5 hover:text-[#38432B] transition-colors cursor-pointer rounded-full hover:bg-[#EAE4D7]/50"
            aria-label="Account profile"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Shopping Cart Button with Dynamic Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-1.5 hover:text-[#38432B] transition-colors cursor-pointer rounded-full hover:bg-[#EAE4D7]/50 flex items-center justify-center"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#38432B] text-white text-[11px] font-sans font-medium rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
