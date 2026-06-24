import { Shield, Lock, CreditCard, Eye, Fingerprint, Award } from "lucide-react";

const BADGES = [
  { icon: Lock, title: "SSL Encrypted Sessions", desc: "Every transaction is sealed with bank-grade 256-bit encryption pipelines." },
  { icon: CreditCard, title: "PCI DSS Compliant", desc: "We adhere strictly to payment industry security standards to secure your credit card details." },
  { icon: Shield, title: "Fraud Detection Sentinel", desc: "Real-time AI behavioral scans evaluate and mitigate fraudulent transaction risks." },
  { icon: Fingerprint, title: "Two-Factor Authentication", desc: "Protect your customer account credentials with multi-factor mobile authentication." },
  { icon: Award, title: "Authenticity Verified", desc: "Every luxury watch, bag, or eyewear piece is physically checked and authenticated." },
  { icon: Eye, title: "GDPR Data Privacy", desc: "Complete transparency. You command, retrieve, or purge your customer logs at any time." }
];

export function Trust() {
  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="text-center space-y-3 mb-16">
        <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">Security Standards</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Your Trust, Our <span className="font-bold text-white">Priority</span>
        </h1>
        <p className="text-[#A1A1AA] text-sm max-w-md mx-auto leading-relaxed">
          State-of-the-art encryption algorithms protecting your personal details and transactions.
        </p>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {BADGES.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-white/[0.04] bg-[#12121A] transition-all duration-300 hover:border-[#C9A96E]/20 hover:translate-y-[-4px]"
              style={{ boxShadow: "3px 3px 10px #060609, -2px -2px 7px #121220" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] mb-5">
                <Icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{b.title}</h3>
              <p className="text-[#A1A1AA] text-xs font-light leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Stats and Logos */}
      <div className="border-t border-white/[0.04] pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-1">
          <div className="text-3xl font-bold text-[#C9A96E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>₹50 Crore+</div>
          <div className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">Securely Processed</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-[#C9A96E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0 Cases</div>
          <div className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">Of Confirmed Fraud</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-[#C9A96E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>99.99%</div>
          <div className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">Platform Uptime</div>
        </div>
      </div>
    </div>
  );
}
