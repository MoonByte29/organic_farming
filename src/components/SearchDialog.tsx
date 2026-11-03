import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, Star, ArrowRight } from 'lucide-react';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.farmer.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="relative bg-[#FAF8F3] border border-[#DDD5C6] rounded-3xl max-w-2xl w-full shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#E0D8C8] pb-4">
          <Search className="w-5 h-5 text-[#38432B] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search single-origin oil, raw honey, millets, spices, tableware..."
            className="w-full bg-transparent text-sm sm:text-base text-[#222421] placeholder-[#8C9086] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8C9086] hover:text-[#222421] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EFEAE0] hover:bg-[#E5DFD1] text-[#383A35] flex items-center justify-center cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestions when Query is Empty */}
        {!query.trim() && (
          <div className="py-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7A7E73] mb-3 font-sans">
              Popular Organic Inquiries
            </div>
            <div className="flex flex-wrap gap-2">
              {['Mustard Oil', 'Wild Honey', 'Foxtail Millet', 'Lakadong Turmeric', 'Ceramic Mug', 'Diwali Gift Box'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-[#EFE9DC] hover:bg-[#E5DFD1] text-xs font-medium text-[#464842] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="py-4 max-h-[60vh] overflow-y-auto space-y-2">
            <div className="text-xs text-[#7A7E73] mb-2 px-1">
              Found {searchResults.length} creations for "{query}"
            </div>

            {searchResults.length === 0 ? (
              <div className="py-10 text-center text-xs text-[#6F726A]">
                No matching produce or wares found. Try searching for "oil", "honey", "millet", or "mug".
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-white hover:bg-[#F2ECE0] border border-[#E8E2D6] flex items-center justify-between gap-4 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#EFEAE0] overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="font-serif text-sm font-medium text-[#222421]">
                        {product.name}
                      </h5>
                      <div className="text-[11px] text-[#696C63]">
                        {product.origin} · {product.unit}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-serif font-bold text-sm text-[#38432B] tabular-nums">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#6A6D64] justify-end">
                      <Star className="w-3 h-3 fill-[#C87A54] text-[#C87A54]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
