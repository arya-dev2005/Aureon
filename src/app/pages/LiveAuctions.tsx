import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Hammer, Users, Timer, Info, Trophy } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";

interface Bid {
  bidder: string;
  amount: number;
  time: string;
}

const INITIAL_BIDS: Bid[] = [
  { bidder: "Collector #42", amount: 195000, time: "2m ago" },
  { bidder: "VIP-Arjun", amount: 190000, time: "5m ago" },
  { bidder: "Collector #10", amount: 185000, time: "12m ago" }
];

export function LiveAuctions() {
  const [currentBid, setCurrentBid] = useState(195000);
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const [timer, setTimer] = useState({ m: 14, s: 35 });
  const [placedBid, setPlacedBid] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTimer(prev => {
        let { m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 14; s = 35; }
        return { m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handlePlaceBid = (amt: number) => {
    if (amt <= currentBid) return;
    const newBid: Bid = { bidder: "You (VIP)", amount: amt, time: "Just now" };
    setBids([newBid, ...bids]);
    setCurrentBid(amt);
    setPlacedBid(true);
    setTimeout(() => setPlacedBid(false), 2000);
  };

  const product = ALL_PRODUCTS[0]; // Chronos Gold Watch

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Live <span className="font-bold text-white">Auctions</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light mt-1">Bid in real-time on highly-coveted, single-edition releases.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Showcase */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-white/[0.04] p-8 space-y-6" style={{ background: "#12121A" }}>
            <div className="aspect-square max-w-[400px] mx-auto overflow-hidden bg-[#0A0A0F] border border-white/[0.06] rounded-2xl flex items-center justify-center text-8xl">
              {product.emoji}
            </div>

            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-[#C9A96E] uppercase font-bold tracking-wider">{product.brand}</span>
              <h2 className="text-xl font-semibold text-white">{product.name}</h2>
              <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                Single-edition release featuring pristine 18k champagne gold mechanics and premium sapphire casing.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Bidding Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[#C9A96E]/20 p-6 md:p-8 space-y-6" style={{ background: "linear-gradient(135deg,rgba(201,169,110,0.04) 0%,#12121A 100%)" }}>
            {/* Bid details */}
            <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
              <div>
                <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Current High Bid</span>
                <div className="text-3xl font-bold text-white tracking-wide mt-1" style={{ color: "#C9A96E" }}>
                  ₹{currentBid.toLocaleString()}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Time Remaining</span>
                <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-1 font-mono">
                  <Timer className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>{String(timer.m).padStart(2, "0")}:{String(timer.s).padStart(2, "0")}</span>
                </div>
              </div>
            </div>

            {/* Quick Bids */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Quick Bid Options</div>
              <div className="grid grid-cols-3 gap-3">
                {[5000, 10000, 20000].map((inc, i) => {
                  const target = currentBid + inc;
                  return (
                    <button 
                      key={i}
                      onClick={() => handlePlaceBid(target)}
                      className="h-11 rounded-xl border border-white/[0.08] hover:border-[#C9A96E]/40 text-xs font-bold transition-all hover:bg-white/[0.02]"
                    >
                      +{inc / 1000}K
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bid History Feed */}
            <div className="space-y-4 pt-4 border-t border-white/[0.04]">
              <div className="text-xs font-semibold text-white uppercase tracking-wider">Bidding History</div>
              <div className="space-y-3.5 max-h-[140px] overflow-y-auto">
                {bids.map((b, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#A1A1AA]">{b.bidder}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">₹{b.amount.toLocaleString()}</span>
                      <span className="text-[10px] text-[#71717A] font-mono">{b.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
