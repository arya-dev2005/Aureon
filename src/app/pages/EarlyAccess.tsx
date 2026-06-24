import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Bell, ShieldAlert, ArrowUpRight } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";

export function EarlyAccess() {
  const [countdown, setCountdown] = useState({ d: 2, h: 14, m: 33, s: 45 });

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 2; h = 14; m = 33; s = 45; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const upcomingDrops = ALL_PRODUCTS.filter(p => [5, 6].includes(p.id));

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Hero */}
      <div className="text-center space-y-6 mb-16 rounded-3xl border border-[#C9A96E]/15 p-10 relative overflow-hidden" style={{ background: "linear-gradient(180deg,rgba(201,169,110,0.03) 0%,transparent 100%)" }}>
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>VIP Early Access</span>
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide font-display mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Be the First to <span className="font-bold text-white">Own What's Next</span>
          </h1>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center gap-4 md:gap-6 pt-4">
          {[
            { val: countdown.d, label: "Days" },
            { val: countdown.h, label: "Hours" },
            { val: countdown.m, label: "Mins" },
            { val: countdown.s, label: "Secs" }
          ].map((c, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold tracking-tight text-[#C9A96E] border border-white/[0.04]" style={{ background: "#12121A", fontFamily: "monospace" }}>
                {String(c.val).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-[#71717A] mt-1.5 uppercase font-semibold">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Upcoming Releases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingDrops.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/[0.04] bg-[#12121A] p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-36 h-36 rounded-xl overflow-hidden bg-[#0A0A0F] border border-white/[0.06] flex items-center justify-center text-5xl">
                {p.emoji}
              </div>

              <div className="flex-grow space-y-3 text-center md:text-left">
                <div>
                  <span className="text-[10px] text-[#C9A96E] uppercase font-bold tracking-wider">{p.brand}</span>
                  <h3 className="text-base font-semibold text-white mt-0.5">{p.name}</h3>
                  <p className="text-xs text-[#71717A]">Expected Launch: June 26, 2026</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button className="h-9 px-4 rounded-lg bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-xs font-semibold text-[#C9A96E] hover:bg-[#C9A96E]/20 transition-all flex items-center justify-center gap-1.5">
                    <Bell className="w-4 h-4" />
                    <span>Notify Me</span>
                  </button>
                  <button className="h-9 px-4 rounded-lg border border-white/[0.08] text-xs font-semibold text-white hover:bg-white/[0.04] transition-all">
                    View Specifications
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
