import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Search, Package, MapPin, Truck, CheckCircle2, User, Phone, Mail } from "lucide-react";

const STEPS = [
  { status: "Confirmed", desc: "Order placed & payment verified", date: "June 24, 10:45 AM" },
  { status: "Processing", desc: "Inspection & packaging completed", date: "June 24, 02:30 PM" },
  { status: "Dispatched", desc: "Courier partner picked up cargo", date: "June 25, 09:15 AM" },
  { status: "Out for Delivery", desc: "Near delivery location", date: "Est: June 26" },
  { status: "Delivered", desc: "Unboxing luxury", date: "Est: June 26" }
];

export function OrderTracking() {
  const { id } = useParams<{ id?: string }>();
  const [searchId, setSearchId] = useState(id || "ORD-2026-004291");
  const [activeOrder, setActiveOrder] = useState<string | null>(id ? id : "ORD-2026-004291");
  const [currentStepIdx, setCurrentStepIdx] = useState(2); // Mocked: Dispatched

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) setActiveOrder(searchId);
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-5xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Search Order */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Track Your <span className="font-bold text-white">Order</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light max-w-sm mx-auto">
          Enter your order reference code and checkout details to monitor tracking pipelines.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3 max-w-md mx-auto pt-4">
          <div className="relative flex-grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input 
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. ORD-2026-004291"
              className="w-full h-11 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]"
            />
          </div>
          <button 
            type="submit"
            className="h-11 px-6 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] transition-all"
            style={{ 
              background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)"
            }}
          >
            Track
          </button>
        </form>
      </div>

      {activeOrder && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Timeline details */}
          <div className="lg:col-span-8 space-y-8 rounded-2xl border border-white/[0.04] p-6 md:p-8" style={{ background: "#12121A" }}>
            <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
              <div>
                <span className="text-[10px] text-[#71717A] uppercase font-semibold">Reference</span>
                <div className="text-sm font-bold text-white tracking-wider">{activeOrder}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
                In Transit
              </span>
            </div>

            {/* Vertical timeline */}
            <div className="relative pl-8 space-y-8">
              {/* Vertical line connector */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/[0.04]" />

              {STEPS.map((step, idx) => {
                const isCompleted = idx < currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const isFuture = idx > currentStepIdx;

                return (
                  <div key={idx} className="relative flex justify-between items-start gap-4">
                    {/* Circle Indicator */}
                    <div 
                      className="absolute left-[-29px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{ 
                        background: isCompleted ? "#C9A96E" : isCurrent ? "#12121A" : "#0A0A0F",
                        borderColor: isCompleted || isCurrent ? "#C9A96E" : "rgba(255,255,255,0.06)",
                        boxShadow: isCurrent ? "0 0 10px rgba(201,169,110,0.3)" : "none"
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0A0A0F] fill-current" />
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C9A96E] animate-pulse" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/[0.1]" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 
                        className="text-sm font-semibold transition-colors"
                        style={{ color: isFuture ? "#71717A" : "#F8F8FC" }}
                      >
                        {step.status}
                      </h3>
                      <p className="text-[#A1A1AA] text-xs font-light">{step.desc}</p>
                    </div>

                    <span className="text-[10px] text-[#71717A] font-semibold whitespace-nowrap text-right pt-0.5">
                      {step.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Desk Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A" }}>
              <h2 className="text-sm font-semibold tracking-wide border-b border-white/[0.04] pb-4">
                Delivery Details
              </h2>
              
              <div className="space-y-4 text-xs font-light leading-relaxed">
                <div>
                  <div className="text-[9px] text-[#71717A] uppercase font-bold mb-1">Destination Address</div>
                  <p className="text-[#A1A1AA]">Arjun Mehta</p>
                  <p className="text-[#71717A]">Sea Breeze Apartments, Carter Road, Bandra West, Mumbai, 400050</p>
                </div>
                <div>
                  <div className="text-[9px] text-[#71717A] uppercase font-bold mb-1">Courier Desk</div>
                  <p className="text-[#A1A1AA] flex items-center gap-1.5 font-semibold">
                    <Truck className="w-4 h-4 text-[#C9A96E]" />
                    <span>Aureon Logistics (Express)</span>
                  </p>
                  <p className="text-[#71717A] mt-1">Awb Ref: AWB-874291038</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
