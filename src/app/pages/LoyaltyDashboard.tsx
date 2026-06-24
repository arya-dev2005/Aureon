import { motion } from "motion/react";
import { Sparkles, Calendar, Receipt, TrendingUp } from "lucide-react";

const HISTORY = [
  { desc: "Loyalty Credits (Purchase #ORD-2026-004291)", type: "earn", amt: "+245 Pts", date: "June 24, 2026" },
  { desc: "Referral Bonus (TechWorld Signup)", type: "earn", amt: "+250 Pts", date: "June 22, 2026" },
  { desc: "Birthday Gift Coupon Redemption", type: "redeem", amt: "-500 Pts", date: "June 14, 2026" },
  { desc: "Welcome Bonus Credits", type: "earn", amt: "+100 Pts", date: "March 24, 2026" }
];

export function LoyaltyDashboard() {
  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-5xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Loyalty <span className="font-bold text-white">Dashboard</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light mt-1">Audit your points accumulations, cash savings, and activity history.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <Sparkles className="w-5.5 h-5.5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Balance</div>
          <div className="text-2xl font-bold text-white">2,450 Credits</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <TrendingUp className="w-5.5 h-5.5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Lifetime Savings</div>
          <div className="text-2xl font-bold text-white">₹12,499 Saved</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <Calendar className="w-5.5 h-5.5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Next Reward</div>
          <div className="text-2xl font-bold text-white">5,000 Pts Threshold</div>
        </div>
      </div>

      {/* Activity History list */}
      <div className="rounded-2xl border border-white/[0.04] p-6 md:p-8 space-y-6" style={{ background: "#12121A" }}>
        <h2 className="text-base font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Points History
        </h2>

        <div className="space-y-4">
          {HISTORY.map((h, idx) => {
            const isEarn = h.type === "earn";
            return (
              <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#A1A1AA]">
                    <Receipt className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">{h.desc}</h3>
                    <p className="text-[10px] text-[#71717A] mt-0.5">{h.date}</p>
                  </div>
                </div>

                <span 
                  className="text-xs font-bold whitespace-nowrap"
                  style={{ color: isEarn ? "#22C55E" : "#EF4444" }}
                >
                  {h.amt}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
