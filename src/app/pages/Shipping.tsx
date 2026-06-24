import { motion } from "motion/react";
import { Check, Truck, ShieldCheck, Box, RefreshCcw } from "lucide-react";

const TIMELINE = [
  { icon: Box, title: "1. Order Confirmed", desc: "Your purchase is secured and items are reserved for packaging." },
  { icon: ShieldCheck, title: "2. Quality Checked", desc: "Our specialists inspect each item for pristine quality and authenticity." },
  { icon: Truck, title: "3. Dispatched", desc: "Transferred to our premium shipping courier. Tracking becomes active." },
  { icon: Check, title: "4. Delivered", desc: "Enjoy your purchase. Unbox the curated luxury." }
];

const RATES = [
  { region: "Metros & Major Cities", standard: "2-3 Days (Free)", express: "Next Day (₹250)", limit: "Free Express above ₹10,000" },
  { region: "Rest of India", standard: "3-5 Days (Free)", express: "2 Days (₹350)", limit: "Free Express above ₹15,000" },
  { region: "International (60+ Countries)", standard: "7-10 Days (₹1,500)", express: "4-5 Days (₹3,000)", limit: "Free above ₹50,000" }
];

export function Shipping() {
  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">Delivery Guidelines</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Shipping & <span className="font-bold text-white">Returns</span>
        </h1>
        <p className="text-[#A1A1AA] text-sm max-w-md mx-auto leading-relaxed">
          Complementary premium packaging and fully-tracked courier service included with every purchase.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="mb-24 space-y-10">
        <h2 className="text-xl font-semibold tracking-wide border-b border-white/[0.04] pb-3 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Fulfillment Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-[36px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent z-0" />
          {TIMELINE.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="text-center flex flex-col items-center space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-[200px] mx-auto font-light">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipping Rates Table */}
      <div className="mb-24 space-y-6">
        <h2 className="text-xl font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Delivery Options & Tariffs
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/[0.04]">
          <table className="w-full text-left text-sm" style={{ background: "#12121A" }}>
            <thead>
              <tr className="border-b border-white/[0.06] text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                <th className="p-4">Destination Region</th>
                <th className="p-4">Standard Transit</th>
                <th className="p-4">Express Transit</th>
                <th className="p-4">Thresholds</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((rate, idx) => (
                <tr key={idx} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-white">{rate.region}</td>
                  <td className="p-4 text-[#A1A1AA]">{rate.standard}</td>
                  <td className="p-4 text-[#A1A1AA]">{rate.express}</td>
                  <td className="p-4 text-[#C9A96E] font-medium">{rate.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns Policy */}
      <div className="rounded-2xl border border-white/[0.04] p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center justify-between" style={{ background: "linear-gradient(135deg,rgba(201,169,110,0.05) 0%,rgba(10,10,15,0.4) 100%)" }}>
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-[#C9A96E]">
            <RefreshCcw className="w-6 h-6" />
            <span className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>30-Day Luxury Return Guarantee</span>
          </div>
          <p className="text-[#A1A1AA] text-xs leading-relaxed font-light">
            We accept returns of unworn, unaltered products with original labels and warranty tags attached in pristine, unblemished packaging. Simply drop us an inquiry to arrange a complimentary home pick-up courier collection.
          </p>
        </div>
        <button 
          className="h-[52px] px-8 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] whitespace-nowrap transition-all"
          style={{ 
            background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)",
            boxShadow: "0 4px 15px rgba(201,169,110,0.2)"
          }}
        >
          Request Return Label
        </button>
      </div>
    </div>
  );
}
