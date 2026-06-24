import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Timer, Flame, ShoppingCart } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";

export function FlashSales() {
  const [countdown, setCountdown] = useState({ h: 4, m: 23, s: 15 });

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 4; m = 23; s = 15; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const flashProducts = ALL_PRODUCTS.filter(p => [5, 6, 7].includes(p.id));

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="text-center space-y-6 mb-16 rounded-3xl border border-red-500/10 p-8" style={{ background: "linear-gradient(180deg,rgba(239,68,68,0.03) 0%,transparent 100%)" }}>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Flash Deal</span>
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide font-display mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Vault Flash <span className="font-bold text-white">Sales</span>
          </h1>
        </div>

        {/* Countdown */}
        <div className="flex justify-center items-center gap-3 text-lg font-bold font-mono tracking-wider pt-2">
          <Timer className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="text-red-400">Ends In:</span>
          <span className="bg-red-500/10 px-2 py-1 rounded border border-red-500/20">{String(countdown.h).padStart(2, "0")}</span>
          <span>:</span>
          <span className="bg-red-500/10 px-2 py-1 rounded border border-red-500/20">{String(countdown.m).padStart(2, "0")}</span>
          <span>:</span>
          <span className="bg-red-500/10 px-2 py-1 rounded border border-red-500/20">{String(countdown.s).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {flashProducts.map((p) => (
          <div 
            key={p.id}
            className="rounded-3xl border border-white/[0.04] bg-[#12121A] p-6 space-y-5 flex flex-col justify-between"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
          >
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#0A0A0F] border border-white/[0.06] flex items-center justify-center text-5xl relative">
                {p.emoji}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-red-600 text-white">
                  -30% OFF
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#C9A96E] uppercase font-bold tracking-wider">{p.brand}</span>
                <h3 className="text-sm font-semibold text-white mt-0.5">{p.name}</h3>
                
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-lg font-bold text-white">₹{p.price.toLocaleString()}</span>
                  <span className="text-xs text-[#71717A] line-through">₹{Math.floor(p.price * 1.3).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Claims bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[10px] text-[#A1A1AA] font-medium">
                <span>78% Claimed</span>
                <span>Only 2 Left</span>
              </div>
              <div className="w-full h-1.5 bg-[#1A1A24] rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "78%" }} />
              </div>

              <button 
                className="w-full h-11 rounded-xl bg-red-600 hover:bg-red-500 font-semibold tracking-wide text-xs uppercase text-white transition-all flex items-center justify-center gap-1.5 mt-3 shadow-lg shadow-red-600/15"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Claim Deal</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
