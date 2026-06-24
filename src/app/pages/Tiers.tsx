import { Check, X, ShieldAlert } from "lucide-react";

const TIERS = [
  {
    name: "Bronze",
    price: "Free",
    desc: "Access our standard digital luxury collections.",
    features: [true, false, false, false, false],
    cta: "Select Bronze",
    highlight: false,
    color: "#A1A1AA"
  },
  {
    name: "Gold",
    price: "₹2,999/Yr",
    desc: "Unlock priority releases, free express deliveries, and VIP desk access.",
    features: [true, true, true, true, false],
    cta: "Unlock Gold",
    highlight: true,
    color: "#C9A96E"
  },
  {
    name: "Platinum",
    price: "₹9,999/Yr",
    desc: "Private concierge desk, custom design consults, and private drops access.",
    features: [true, true, true, true, true],
    cta: "Go Platinum",
    highlight: false,
    color: "#B39257"
  }
];

const FEATURES = [
  "Access to standard collections",
  "Free Express Shipping",
  "24h Early Access to Drops",
  "Dedicated Curation Agent Support",
  "Private Custom Sourcing Desk"
];

export function Tiers() {
  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">VIP Tiers</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Membership <span className="font-bold text-white">Tiers</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs max-w-sm mx-auto leading-relaxed">
          Upgrade your catalog authorization levels to unlock dedicated curators and early private drops.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
        {TIERS.map((tier, idx) => (
          <div 
            key={idx}
            className="rounded-3xl border p-8 flex flex-col justify-between relative transition-all duration-300 hover:translate-y-[-4px]"
            style={{ 
              background: "#12121A",
              borderColor: tier.highlight ? "#C9A96E" : "rgba(255,255,255,0.04)",
              boxShadow: tier.highlight ? "0 10px 30px rgba(201,169,110,0.08)" : "none",
              transform: tier.highlight ? "scale(1.02)" : "scale(1)"
            }}
          >
            {tier.highlight && (
              <span className="absolute top-4 right-6 px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: tier.color }}>{tier.name}</span>
                <div className="text-3xl font-bold tracking-tight text-white font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {tier.price}
                </div>
              </div>
              <p className="text-[#A1A1AA] text-xs font-light leading-relaxed h-[60px]">{tier.desc}</p>
              
              <div className="w-full h-px bg-white/[0.04] my-6" />

              <ul className="space-y-3.5 text-xs font-light">
                {FEATURES.map((feat, fidx) => {
                  const active = tier.features[fidx];
                  return (
                    <li key={fidx} className="flex items-center gap-2.5">
                      <span className={active ? "text-[#C9A96E]" : "text-[#71717A]"}>
                        {active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </span>
                      <span className={active ? "text-[#F8F8FC]" : "text-[#71717A]"}>{feat}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button 
              className="w-full h-[48px] rounded-xl font-semibold tracking-wide text-xs uppercase transition-all mt-8"
              style={{ 
                background: tier.highlight 
                  ? "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)" 
                  : "transparent",
                color: tier.highlight ? "#0A0A0F" : "#C9A96E",
                border: tier.highlight ? "none" : "1px solid rgba(201,169,110,0.4)"
              }}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
