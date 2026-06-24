import { useState } from "react";
import { useParams } from "react-router";
import { motion } from "motion/react";
import { Star, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";
import { ProductCard3D } from "../components/ProductCard3D";

export function SellerStorefront() {
  const { sellerId } = useParams<{ sellerId?: string }>();
  const [following, setFollowing] = useState(false);

  const sellerProducts = ALL_PRODUCTS.filter(p => p.id <= 4);

  return (
    <div className="min-h-screen text-[#F8F8FC]" style={{ background: "#0A0A0F" }}>
      {/* Banner */}
      <div 
        className="h-[260px] bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop')",
          filter: "brightness(0.4)"
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative mt-[-60px] z-10 space-y-10 pb-20">
        {/* Info Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-end gap-5 flex-wrap">
            <div className="w-28 h-28 rounded-full border-4 border-[#0A0A0F] overflow-hidden bg-[#12121A] flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🏛️</span>
            </div>
            <div className="space-y-1 pt-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Aura Chronos Boutique
                </h1>
                <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-1 text-[#C9A96E]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold">4.9</span>
                </div>
                <span>•</span>
                <span>1,240 Sales</span>
                <span>•</span>
                <span className="text-[#22C55E]">Premium Seller</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setFollowing(!following)}
            className="h-10 px-6 rounded-xl font-semibold tracking-wide text-xs uppercase transition-all flex items-center gap-1.5 border"
            style={{ 
              borderColor: following ? "rgba(255,255,255,0.08)" : "rgba(201,169,110,0.4)",
              color: following ? "#A1A1AA" : "#C9A96E",
              background: following ? "rgba(255,255,255,0.02)" : "rgba(201,169,110,0.05)"
            }}
          >
            {following ? "Following" : "Follow Store"}
          </button>
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Store Catalog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sellerProducts.map((p, idx) => (
              <ProductCard3D key={p.id} product={p} delay={idx * 50} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
