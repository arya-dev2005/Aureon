import { motion } from "motion/react";
import { DollarSign, ShieldCheck, ShoppingBag, TrendingUp, Users, ArrowUpRight } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-6 mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admin <span className="font-bold text-white">Console</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs font-light mt-1">Monitor revenue, platform transaction logs, and user onboarding.</p>
        </div>

        <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-white">
          Date Scope: Today
        </span>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <DollarSign className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Revenue</div>
          <div className="text-2xl font-bold text-white">₹24,99,999</div>
          <div className="text-[10px] text-[#22C55E]">+12% vs last period</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Orders</div>
          <div className="text-2xl font-bold text-white">1,240</div>
          <div className="text-[10px] text-[#22C55E]">+5% vs last period</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <TrendingUp className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Conversion Rate</div>
          <div className="text-2xl font-bold text-white">3.2%</div>
          <div className="text-[10px] text-[#22C55E]">+0.4% vs last period</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <Users className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Active Vendors</div>
          <div className="text-2xl font-bold text-white">45 Stores</div>
          <div className="text-[10px] text-[#22C55E]">+3 onboarding</div>
        </div>
      </div>

      {/* Tables and alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A" }}>
          <h2 className="text-base font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Platform Log Stream
          </h2>

          <div className="space-y-4 text-xs">
            {[
              { text: "New Order #ORD-2026-005001 received", type: "order", time: "2 mins ago" },
              { text: "Vendor 'Aura Chronos' updated item stock", type: "catalog", time: "15 mins ago" },
              { text: "Customer 'Arjun M.' upgraded to Gold Tier", type: "vip", time: "1 hour ago" }
            ].map((log, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <span className="font-medium text-white">{log.text}</span>
                <span className="text-[10px] text-[#71717A] font-mono whitespace-nowrap shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A" }}>
          <h2 className="text-sm font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Actions Queue
          </h2>

          <div className="space-y-4 text-xs font-light">
            {[
              { desc: "2 Pending Vendor Applications", action: "Review" },
              { desc: "3 Failed Transaction Audits", action: "Retry" }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/[0.02]">
                <span className="text-white font-medium">{item.desc}</span>
                <button className="text-[10px] font-bold text-[#C9A96E] hover:underline uppercase">{item.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
