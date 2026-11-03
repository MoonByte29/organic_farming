import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandPromise } from './components/BrandPromise';
import { FeaturedProducts } from './components/FeaturedProducts';
import { SeedToShelf } from './components/SeedToShelf';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { ShopPage } from './components/ShopPage';
import { OurStoryPage } from './components/OurStoryPage';
import { BulkOrdersPage } from './components/BulkOrdersPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchDialog } from './components/SearchDialog';
import { AuthDialog } from './components/AuthDialog';
// import { BrandMiniKitModal } from './components/BrandMiniKitModal';
// import { DesignNoteModal } from './components/DesignNoteModal';
// import { MernStatusModal } from './components/MernStatusModal';
import { OrderTracking } from './components/OrderTracking';
import { Footer } from './components/Footer';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'story' | 'bulk'>('home');
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [trackingOpen, setTrackingOpen] = useState<boolean>(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('MM-ORD-4192');
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);

  // Cart state initialized with 1 item by default so user can immediately test cart features
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1
    }
  ]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (tab: string, category = 'all') => {
    if (tab === 'shop' || tab === 'collections') {
      setActiveTab('shop');
      setShopCategory(category);
    } else if (tab === 'story') {
      setActiveTab('story');
    } else if (tab === 'bulk') {
      setActiveTab('bulk');
    } else {
      setActiveTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTracking = (orderId?: string) => {
    if (orderId) {
      setTrackingOrderId(orderId);
    }
    setTrackingOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#292A28] flex flex-col font-sans selection:bg-[#38432B] selection:text-[#F8F6F0]">
      
      {/* Top Subtle Announcement Bar */}
      {bannerVisible && (
        <aside aria-label="Seasonal announcement" className="bg-[#38432B] text-[#F4F1EA] text-xs px-4 py-2 flex items-center justify-between font-sans border-b border-[#2C3522]">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <span className="hidden sm:inline">🌿 First Monsoon Harvest:</span>
            <span>Single-origin cold-pressed oils & wild raw honey now bottled.</span>
            <span className="underline underline-offset-2 font-medium cursor-pointer ml-1" onClick={() => handleNavigate('shop')}>
              Shop Harvest
            </span>
            <span className="mx-1 opacity-50">·</span>
            <span 
              className="underline underline-offset-2 font-medium cursor-pointer text-[#E5F0D8] hover:text-white"
              onClick={() => handleOpenTracking('MM-ORD-4192')}
            >
              Track Package
            </span>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="text-[#D0DBC4] hover:text-white p-1 ml-2 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Primary Navigation Bar (Identical to reference mockup top bar) */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenMiniKit={() => setMiniKitOpen(true)}
        onOpenDesignNote={() => setDesignNoteOpen(true)}
        onOpenTracking={() => handleOpenTracking()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section: Exact layout and typography from uploaded reference image */}
            <Hero
              onShopClick={() => handleNavigate('shop')}
              onStoryClick={() => handleNavigate('story')}
            />

            {/* Brand Promise Section */}
            <BrandPromise />

            {/* Featured Products Collection */}
            <FeaturedProducts
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              getItemQuantity={(productId) => cartItems.find((ci) => ci.product.id === productId)?.quantity || 0}
              onViewAllClick={() => handleNavigate('shop')}
            />

            {/* Seed-to-Shelf Interactive Story (Assignment bonus & core) */}
            <SeedToShelf />

            {/* Attributable Testimonials & Proof */}
            <Testimonials />

            {/* Newsletter & Harvest Journal Signup */}
            <Newsletter />
          </>
        )}

        {activeTab === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            initialCategory={shopCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            getItemQuantity={(productId) => cartItems.find((ci) => ci.product.id === productId)?.quantity || 0}
          />
        )}

        {activeTab === 'story' && (
          <OurStoryPage />
        )}

        {activeTab === 'bulk' && (
          <BulkOrdersPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenMiniKit={() => setMiniKitOpen(true)}
        onOpenDesignNote={() => setDesignNoteOpen(true)}
        onOpenMernStatus={() => setMernStatusOpen(true)}
        onOpenTracking={handleOpenTracking}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Cart Drawer with Checkout */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenTracking={handleOpenTracking}
      />

      {/* Fast Product Search Dialog */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Profile & Account Dialog */}
      <AuthDialog
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      {/* Assignment Mandatory Deliverable B: Brand Mini-Kit Modal */}
      {/* <BrandMiniKitModal
        isOpen={miniKitOpen}
        onClose={() => setMiniKitOpen(false)}
      /> */}

      {/* Assignment Mandatory Deliverable C: 1-Page Design Note Modal */}
      {/* <DesignNoteModal
        isOpen={designNoteOpen}
        onClose={() => setDesignNoteOpen(false)}
      /> */}

      {/* Live MERN Stack Backend Diagnostics Modal */}
      {/* <MernStatusModal
        isOpen={mernStatusOpen}
        onClose={() => setMernStatusOpen(false)}
      /> */}

      {/* Live Order Tracking with Milestones */}
      <OrderTracking
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

    </div>
  );
}
