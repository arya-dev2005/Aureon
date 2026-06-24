import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { GoldParticles } from "../components/GoldParticles";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      navigate("/account");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex text-[#F8F8FC] relative overflow-hidden" style={{ background: "#0A0A0F" }}>
      {/* Left: Brand Showcase */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop')",
            filter: "brightness(0.25) contrast(1.1)"
          }} 
        />
        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0F] via-transparent to-black/40 pointer-events-none" />
        
        {/* Gold Particles */}
        <GoldParticles />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <span 
            className="text-2xl font-bold tracking-[3px] text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            AUREON
          </span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A96E" }} />
        </Link>

        <div className="relative z-10 my-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-light leading-tight tracking-wide"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Curated for the <br />
            <span className="font-bold text-[#C9A96E]">Exceptional</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#A1A1AA] mt-4 max-w-md text-base leading-relaxed"
          >
            Access our private collections, VIP benefits, and personalized luxury services.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-[#71717A] tracking-wider uppercase">
          <Shield className="w-4 h-4 text-[#C9A96E]" />
          <span>Secured with Bank-Grade Encryption</span>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px] rounded-3xl p-8 border border-white/[0.06] shadow-2xl relative"
          style={{ background: "#12121A" }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Welcome Back
            </h2>
            <p className="text-[#A1A1AA] text-sm mt-1">Sign in to your luxury portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3.5 rounded-xl border border-red-500/20 text-red-400 text-xs text-center"
                style={{ background: "rgba(239, 68, 68, 0.08)" }}
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-[52px] pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                  style={{
                    boxShadow: email ? "0 0 10px rgba(201,169,110,0.05)" : "none"
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#C9A96E] hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-11 pr-11 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#F8F8FC]"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
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
              ) : "Sign In to Aureon"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <span className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.06] -translate-y-1/2" />
            <span className="relative z-10 px-3 text-[11px] text-[#71717A] uppercase tracking-wider" style={{ background: "#12121A" }}>
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2.5 h-[52px] rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-semibold hover:bg-white/[0.06] transition-all hover:border-[#C9A96E]/40">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.822-6.3-6.3 0-3.478 2.822-6.3 6.3-6.3 1.637 0 3.125.621 4.256 1.637l3.04-3.04C19.26 2.657 15.98 1.5 12.24 1.5c-5.795 0-10.5 4.705-10.5 10.5s4.705 10.5 10.5 10.5c5.155 0 9.873-3.717 9.873-10.5 0-.585-.052-1.154-.15-1.715H12.24Z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 h-[52px] rounded-xl border border-white/[0.08] bg-[#1A1A24] text-xs font-semibold hover:bg-white/[0.06] transition-all hover:border-[#C9A96E]/40">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.52-.62.72-1.16 1.87-1.02 2.98 1.1.09 2.23-.55 2.97-1.44Z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="mt-8 text-center text-xs">
            <span className="text-[#71717A]">Don't have an account? </span>
            <Link to="/register" className="text-[#C9A96E] font-semibold hover:underline">Join Aureon</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
