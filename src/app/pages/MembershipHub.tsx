import { useState } from "react";
import { motion } from "motion/react";
import { Crown, Gift, Share2, Clipboard, Check } from "lucide-react";

export function MembershipHub() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://aureon.com/join?ref=VIP-ARJUN";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Hero Banner */}
      <div 
        className="rounded-3xl p-8 md:p-12 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg,#C9A96E 0%,#B39257 100%)",
          boxShadow: "0 10px 30px rgba(201,169,110,0.15)"
        }}
      >
        <div className="absolute right-[-20px] top-[-20px] w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="space-y-2 relative z-10 text-[#0A0A0F]">
          <span className="text-[10px] uppercase font-bold tracking-[3px] opacity-80">VIP Registry</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-none tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Welcome to Aureon VIP
          </h1>
          <p className="text-xs font-medium opacity-80">Member since March 24, 2026</p>
        </div>

        <div className="px-6 py-4 rounded-2xl bg-[#0A0A0F] border border-white/[0.08] flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E]">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[9px] text-[#71717A] uppercase tracking-wider font-bold">Current Status</div>
            <div className="text-sm font-bold text-white tracking-wide">Gold Tier Member</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Progress & Benefits */}
        <div className="lg:col-span-8 space-y-8">
          {/* Progress Card */}
          <div className="rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A" }}>
            <h2 className="text-base font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tier Progression
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">Gold Tier</span>
                <span className="text-[#C9A96E]">2,450 / 5,000 Pts (Platinum)</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A24] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] rounded-full" style={{ width: "49%" }} />
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A" }}>
            <h2 className="text-base font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Your Active Privileges
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Complimentary Express Shipping",
                "24-Hour VIP Early Access to Drops",
                "Birthday Concierge Gift Voucher",
                "Dedicated Styling Personal Shopper"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#C9A96E]/10 text-[#C9A96E]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-white font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Referrals & Actions */}
        <div className="lg:col-span-4 space-y-8">
          {/* Referral Card */}
          <div className="rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
              <Share2 className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h2 className="text-sm font-semibold tracking-wide">Invite Exceptional Friends</h2>
              <p className="text-xs text-[#A1A1AA] leading-normal font-light">
                Provide them access and gain 250 loyalty credits when they place their first purchase.
              </p>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" readOnly value={referralLink}
                className="flex-grow h-10 px-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[10px] focus:outline-none text-[#A1A1AA] font-mono select-all"
              />
              <button 
                onClick={handleCopy}
                className="h-10 px-4 rounded-xl text-xs font-semibold text-[#0A0A0F] whitespace-nowrap transition-all flex items-center gap-1.5"
                style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)" }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
