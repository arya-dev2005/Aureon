import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, Loader2, ArrowRight } from "lucide-react";
import { GoldParticles } from "../components/GoldParticles";

type VerifyState = "verifying" | "success" | "expired";

export function VerifyEmail() {
  const [state, setState] = useState<VerifyState>("verifying");

  useEffect(() => {
    // Simulate verification API call
    const t1 = setTimeout(() => {
      setState("success");
    }, 2500);

    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-[#F8F8FC] relative overflow-hidden" style={{ background: "#0A0A0F" }}>
      {state === "success" && <GoldParticles />}

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] rounded-3xl p-8 border border-white/[0.06] shadow-2xl text-center relative z-10"
        style={{ background: "#12121A" }}
      >
        <AnimatePresence mode="wait">
          {state === "verifying" && (
            <motion.div 
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="relative w-16 h-16 mx-auto">
                <Loader2 className="w-16 h-16 text-[#C9A96E] animate-spin" />
              </div>
              <h2 className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Verifying Credentials
              </h2>
              <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-[280px] mx-auto">
                Decrypting and validating your secure email confirmation token. Please wait.
              </p>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
                </motion.div>
              </div>

              <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Email Verified
              </h2>
              <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-[280px] mx-auto">
                Your Aureon security credentials are confirmed. Welcome to the portal.
              </p>

              <Link 
                to="/account"
                className="inline-flex w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] items-center justify-center gap-2 transition-all relative overflow-hidden"
                style={{ 
                  background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)",
                  boxShadow: "0 4px 15px rgba(201,169,110,0.25)"
                }}
              >
                <span>Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {state === "expired" && (
            <motion.div 
              key="expired"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />
              </div>

              <h2 className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Link Expired
              </h2>
              <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-[280px] mx-auto">
                This verification code has expired. Request a new link to proceed.
              </p>

              <button 
                onClick={() => {
                  setState("verifying");
                  setTimeout(() => setState("success"), 2000);
                }}
                className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#F8F8FC] transition-all border border-white/[0.08] hover:bg-white/[0.04]"
              >
                Resend Verification Link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
