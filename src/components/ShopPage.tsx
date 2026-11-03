import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { Filter, Star, Plus, Minus, SlidersHorizontal, ArrowUpDown, X, Search } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onAddToCart,
  onUpdateQuantity,
  getItemQuantity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const origins = ['all', 'Rajasthan', 'Kerala', 'Madhya Pradesh', 'Meghalaya', 'Khurja & Pondicherry'];
  const certifications = ['all', 'India Organic', 'Jaivik Bharat', 'Fair Wild', 'Lead-Free Glaze'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchOrigin = p.origin.toLowerCase().includes(q);
        if (!matchName && !matchSubtitle && !matchOrigin) return false;
      }
      // Max price
      if (p.price > maxPrice) return false;
      // In stock
      if (inStockOnly && !p.inStock) return false;
      // Certifications
      if (selectedCert !== 'all') {
        const hasCert = p.certifications.some((c) => c.toLowerCase().includes(selectedCert.toLowerCase()));
        if (!hasCert) return false;
      }
      // Origin
      if (selectedOrigin !== 'all') {
        if (!p.origin.toLowerCase().includes(selectedOrigin.toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, selectedCert, selectedOrigin, sortBy]);

  const handleAdd = (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(2500);
    setSelectedCert('all');
    setSelectedOrigin('all');
    setInStockOnly(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '' || maxPrice < 2500 || selectedCert !== 'all' || selectedOrigin !== 'all' || inStockOnly;

  return (
    <div className="bg-[#F8F6F0] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Title & Breadcrumb */}
        <div className="mb-10">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#4A5340] uppercase font-sans mb-1.5">
            ALL NATURAL HARVESTS & WARES
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#222421]">
            Artisanal Organic Pantry & Pottery
          </h1>
          <p className="text-sm sm:text-base text-[#61635C] mt-2 max-w-2xl">
            Sourced directly from native agro-climatic zones across India. Single-origin, chemical-free, and hand-processed in small unhurried batches.
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="bg-[#FAF8F3] border border-[#E5DFD1] rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C9085] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mustard oil, honey, millets..."
              className="w-full bg-[#FFFFFF] border border-[#DDD5C6] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#222421] placeholder-[#8E9188] focus:border-[#38432B] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C9085] hover:text-[#222421]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD5C6] text-xs font-medium text-[#2F312B]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#73776C] hidden sm:block" />
              <span className="text-xs text-[#73776C] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFFFF] border border-[#DDD5C6] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#222421] focus:border-[#38432B] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Backdrop */}
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
            onClick={() => setMobileFilterOpen(false)}
          />
        )}

        {/* Layout Grid: Fixed Sticky Sidebar Filters + Scrolling Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Desktop Fixed/Sticky Filters Sidebar */}
          <aside
            className={`
              ${mobileFilterOpen ? 'fixed inset-x-4 top-24 bottom-6 z-50 overflow-y-auto block shadow-2xl' : 'hidden'}
              md:block md:col-span-4 lg:col-span-3
              md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-7.5rem)] md:overflow-y-auto
              space-y-6 bg-[#FAF8F3] border border-[#E5DFD1] rounded-2xl p-6 shadow-xs
            `}
          >
            
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D4]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#38432B]" />
                <span className="font-serif text-lg font-medium text-[#222421]">Filters</span>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#8A5738] hover:text-[#222421] font-medium underline underline-offset-2 cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="md:hidden p-1 text-[#6F7369] hover:text-black rounded-lg cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#73776D] mb-3 font-sans">
                Categories
              </h4>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#38432B] text-white'
                        : 'text-[#4A4D46] hover:bg-[#EFEAE0]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[11px] font-mono ${selectedCategory === cat.id ? 'text-[#D0DBC4]' : 'text-[#8C9086]'}`}>
                      {cat.id === 'all' ? products.length : products.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-[#E8E2D4]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#73776D] font-sans">
                  Max Price
                </h4>
                <span className="text-xs font-mono font-bold text-[#222421]">
                  ₹{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#38432B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#868A80] mt-1">
                <span>₹200</span>
                <span>₹2500</span>
              </div>
            </div>

            {/* Origin Region */}
            <div className="pt-4 border-t border-[#E8E2D4]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#73776D] mb-2.5 font-sans">
                Origin Region
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {origins.map((orig) => (
                  <button
                    key={orig}
                    onClick={() => setSelectedOrigin(orig)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                      selectedOrigin === orig
                        ? 'bg-[#38432B] text-white font-medium'
                        : 'bg-[#EFE9DC] text-[#4F524A] hover:bg-[#E4DDD0]'
                    }`}
                  >
                    {orig === 'all' ? 'All Terroirs' : orig}
                  </button>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div className="pt-4 border-t border-[#E8E2D4]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#73776D] mb-2.5 font-sans">
                Certification
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {certifications.map((cert) => (
                  <button
                    key={cert}
                    onClick={() => setSelectedCert(cert)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                      selectedCert === cert
                        ? 'bg-[#38432B] text-white font-medium'
                        : 'bg-[#EFE9DC] text-[#4F524A] hover:bg-[#E4DDD0]'
                    }`}
                  >
                    {cert === 'all' ? 'All Standard' : cert}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-4 border-t border-[#E8E2D4]">
              <label className="flex items-center gap-2.5 text-xs text-[#3E413B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-[#38432B] w-4 h-4"
                />
                <span className="font-medium">In-Stock Only</span>
              </label>
            </div>

          </aside>

          {/* Right: Products Grid (Scrolls continuously while filters remain sticky) */}
          <main className="md:col-span-8 lg:col-span-9">
            {/* Results count banner */}
            <div className="flex items-center justify-between text-xs text-[#6F7369] mb-4 px-1">
              <span>
                Showing <strong className="text-[#222421]">{filteredProducts.length}</strong> single-origin creations
              </span>
              {hasActiveFilters && (
                <span className="text-[#38432B] font-medium">Filtered Selection</span>
              )}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FAF8F3] border border-dashed border-[#D2C9B8] rounded-3xl p-12 text-center max-w-md mx-auto my-8">
                <div className="w-12 h-12 rounded-full bg-[#EFE9DC] text-[#696C63] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#222421] mb-2">
                  No harvests match your criteria
                </h3>
                <p className="text-xs text-[#6B6E65] mb-5">
                  Try clearing your filters or search query to browse our seasonal single-origin pantry.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#38432B] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#252E1C] cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div className="absolute top-3 left-3 bg-[#FAF8F3]/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-medium text-[#465B38] border border-[#E5DFD1]">
                          {product.categoryLabel}
                        </div>
                      </div>

                      {/* Product Metadata */}
                      <div className="p-4 sm:p-5">
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

                        <h3 className="font-serif text-lg font-medium text-[#222421] group-hover:text-[#38432B] transition-colors leading-snug mb-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#63665E] line-clamp-2 leading-relaxed mb-3">
                          {product.subtitle}
                        </p>

                        {/* Farmer Callout */}
                        <div className="text-[11px] text-[#556B2F] bg-[#F4F1EA] px-2.5 py-1 rounded inline-block">
                          🌾 {product.farmer}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Add to Cart */}
                    <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[#F2ECE0] flex items-center justify-between">
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
                          <span className="w-6 text-center font-bold text-xs font-mono tabular-nums text-[#38432B]">
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
                          className="px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 bg-[#38432B] hover:bg-[#252E1C] text-[#F8F6F0] cursor-pointer shadow-xs active:scale-95"
                          aria-label={`Add ${product.name} to bag`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};
