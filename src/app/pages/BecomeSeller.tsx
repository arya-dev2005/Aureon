import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Award, Briefcase, Plus, Send, Check } from "lucide-react";

export function BecomeSeller() {
  const [salesRange, setSalesRange] = useState(50000);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [bName, setBName] = useState("");
  const [gst, setGst] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName || !gst || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Hero */}
      <div className="text-center space-y-4 mb-20">
        <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">Merchant Partnerships</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Sell on <span className="font-bold text-white">Aureon</span>
        </h1>
        <p className="text-[#A1A1AA] text-sm max-w-md mx-auto leading-relaxed">
          Gain exposure to over 1 million+ active collector accounts seeking verified luxury and premium items.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Application Form */}
        <div className="lg:col-span-7 space-y-8">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-3xl border border-white/[0.04] space-y-5"
                style={{ background: "#12121A" }}
              >
                <h2 className="text-lg font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Merchant Application
                </h2>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Business Name</label>
                    <input required type="text" value={bName} onChange={(e) => setBName(e.target.value)} placeholder="Aura Luxury Imports..." className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Business Email</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="merchant@email.com" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">GSTIN / PAN</label>
                      <input required type="text" value={gst} onChange={(e) => setGst(e.target.value)} placeholder="GST/PAN Number" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E] uppercase" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Expected Monthly Volume</label>
                      <span className="text-[#C9A96E] font-semibold">₹{salesRange.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min={50000} max={2500000} step={50000}
                      value={salesRange} onChange={(e) => setSalesRange(Number(e.target.value))}
                      className="w-full accent-[#C9A96E] cursor-pointer"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] transition-all flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)" }}
                >
                  <span>Submit Application</span>
                  <Send className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-white/[0.04] p-8 text-center space-y-6"
                style={{ background: "#12121A" }}
              >
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Application Received</h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-sm mx-auto font-light">
                    Our vendor onboarding division will review your PAN/GST coordinates and get back to you within 48 business hours.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Benefits info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A" }}>
            <h2 className="text-sm font-semibold tracking-wide border-b border-white/[0.04] pb-4">
              Onboarding Benefits
            </h2>

            <div className="space-y-4 text-xs font-light leading-relaxed">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Direct Auditing Channels</h4>
                  <p className="text-[#A1A1AA] mt-0.5">Secure, verified sales pathways showing lifetime payouts and transactions.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="w-5 h-5 text-[#C9A96E] shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">0% Platform Commission</h4>
                  <p className="text-[#A1A1AA] mt-0.5">No onboarding platform fees for your first 3 months of catalog indexing.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Briefcase className="w-5 h-5 text-[#C9A96E] shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Logistic Channels Support</h4>
                  <p className="text-[#A1A1AA] mt-0.5">Aureon logistics handles premium unboxing collections and fast delivery dispatches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
