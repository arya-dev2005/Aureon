import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!submitted || timer <= 0) return;
    const t = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [submitted, timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-[#F8F8FC]" style={{ background: "#0A0A0F" }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] rounded-3xl p-8 border border-white/[0.06] shadow-2xl text-center"
        style={{ background: "#12121A" }}
      >
        {!submitted ? (
          <>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)" }}>
              <KeyRound className="w-8 h-8 text-[#C9A96E]" />
            </div>
            
            <h2 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Reset Password
            </h2>
            <p className="text-[#A1A1AA] text-xs mt-2 mb-6 max-w-[280px] mx-auto leading-relaxed">
              Enter your registered email below, and we'll send a custom link to restore access.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-[52px] pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading || !email}
                className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] transition-all relative overflow-hidden"
                style={{ 
                  background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)",
                  boxShadow: "0 4px 15px rgba(201,169,110,0.25)"
                }}
              >
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[#0A0A0F] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <Mail className="w-8 h-8 text-[#22C55E]" />
            </div>

            <h2 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Check Your Email
            </h2>
            <p className="text-[#A1A1AA] text-xs max-w-[280px] mx-auto leading-relaxed">
              We have dispatched password recovery instructions to <span className="text-[#F8F8FC] font-semibold">{email}</span>.
            </p>

            <button 
              onClick={handleResend}
              disabled={timer > 0}
              className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase transition-all border"
              style={{
                borderColor: timer > 0 ? "rgba(255,255,255,0.06)" : "rgba(201,169,110,0.4)",
                color: timer > 0 ? "#71717A" : "#C9A96E",
                background: timer > 0 ? "rgba(255,255,255,0.01)" : "rgba(201,169,110,0.05)"
              }}
            >
              {timer > 0 ? `Resend Link in ${timer}s` : "Resend Verification Email"}
            </button>
          </motion.div>
        )}

        <div className="mt-8 pt-4 border-t border-white/[0.05]">
          <Link to="/login" className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#C9A96E] transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
