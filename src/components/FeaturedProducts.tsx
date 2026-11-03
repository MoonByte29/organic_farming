import React, { useState } from 'react';
import { Product } from '../types';
import { Star, Plus, Minus, Eye } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  onViewAllClick: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onUpdateQuantity,
  getItemQuantity,
  onViewAllClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'oils', label: 'Cold-Pressed Oils' },
    { id: 'honey', label: 'Wild Honey' },
    { id: 'millets', label: 'Millets' },
    { id: 'spices', label: 'Spices' },
    { id: 'ceramics', label: 'Tableware' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products.slice(0, 6)
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 bg-[#F8F6F0] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans">
              SEASONAL PROVISIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#222421] mt-1.5">
              Pure harvests & artisanal wares
            </h2>
            <p className="text-sm sm:text-base text-[#61635C] mt-2 max-w-xl">
              Grown without chemical pesticides, pressed cold, or hand-thrown from mineral clay.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="text-sm font-semibold text-[#38432B] hover:text-[#222421] transition-colors underline underline-offset-4 shrink-0 focus:outline-none cursor-pointer"
          >
            Explore Full Catalog ({products.length} Items) →
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#38432B] text-[#F8F6F0]'
                  : 'bg-[#EFEAE0] text-[#4F514B] hover:bg-[#E5DFD2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-[#FFFFFF] border border-[#E8E2D6] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] bg-[#F2ECE0] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle category badge */}
                  <div className="absolute top-3.5 left-3.5 bg-[#FAF8F3]/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-medium text-[#465B38] border border-[#E5DFD1]">
                    {product.categoryLabel}
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FAF8F3]/90 hover:bg-white text-[#292A28] border border-[#E5DFD1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Quick preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  {/* Origin & Rating metadata */}
                  <div className="flex items-center justify-between text-xs text-[#71746B] mb-2 font-sans">
                    <span>{product.origin}</span>
                    <div className="flex items-center gap-1 text-[#38432B]">
                      <Star className="w-3.5 h-3.5 fill-[#C87A54] text-[#C87A54]" />
                      <span className="font-semibold text-xs tabular-nums text-[#292A28]">
                        {product.rating}
                      </span>
                      <span className="text-[#898C83]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#222421] group-hover:text-[#38432B] transition-colors leading-snug mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#63665E] line-clamp-2 leading-relaxed mb-4">
                    {product.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Add to Cart Action */}
              <div className="px-5 pb-5 pt-2 border-t border-[#F2ECE0] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-[#222421] tabular-nums font-sans">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#9B9E95] line-through tabular-nums">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#787A72]">
                    per {product.unit}
                  </span>
                </div>

                {getItemQuantity(product.id) > 0 ? (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center border border-[#38432B] bg-[#F2EDE1] rounded-full p-0.5 text-xs font-medium shadow-xs"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(product.id, getItemQuantity(product.id) - 1);
                      }}
                      className="w-7 h-7 rounded-full bg-white hover:bg-[#EAE4D7] text-[#222421] flex items-center justify-center transition-colors cursor-pointer active:scale-90"
                      aria-label="Decrease quantity"
                      title="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs font-mono tabular-nums text-[#38432B]">
                      {getItemQuantity(product.id)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(product.id, getItemQuantity(product.id) + 1);
                      }}
                      className="w-7 h-7 rounded-full bg-[#38432B] hover:bg-[#252E1C] text-white flex items-center justify-center transition-colors cursor-pointer active:scale-90"
                      aria-label="Increase quantity"
                      title="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] cursor-pointer shadow-xs active:scale-95"
                    aria-label={`Add ${product.name} to bag`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
