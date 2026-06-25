import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { User, Mail, Phone, Lock, Shield, Eye, EyeOff } from "lucide-react";
import { GoldParticles } from "../components/GoldParticles";

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength
  const [strength, setStrength] = useState(0); // 0 to 4
  const [strengthLabel, setStrengthLabel] = useState("");
  const [strengthColor, setStrengthColor] = useState("#71717A");

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setStrengthLabel("");
      return;
    }
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    setStrength(score);

    if (score === 1) {
      setStrengthLabel("Weak");
      setStrengthColor("#EF4444");
    } else if (score === 2 || score === 3) {
      setStrengthLabel("Medium");
      setStrengthColor("#F59E0B");
    } else if (score === 4) {
      setStrengthLabel("Strong");
      setStrengthColor("#22C55E");
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json().catch(() => ({})) as { token?: string; error?: string };

      if (!response.ok || !data.token) {
        throw new Error(data.error ?? "Unable to create your account. Please try again.");
      }

      localStorage.setItem("aureon_token", data.token);
      navigate("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-[#F8F8FC] relative overflow-hidden" style={{ background: "#0A0A0F" }}>
      {/* Left Brand Showcase */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1200&auto=format&fit=crop')",
            filter: "brightness(0.22) contrast(1.15)"
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0F] via-transparent to-black/30 pointer-events-none" />
        
        <GoldParticles />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <span className="text-2xl font-bold tracking-[3px] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
            An Experience <br />
            Beyond <span className="font-bold text-[#C9A96E]">Shopping</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#A1A1AA] mt-4 max-w-md text-base leading-relaxed"
          >
            Create your credential and unlock concierge access, priority delivery, and custom loyalty programs.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-[#71717A] tracking-wider uppercase">
          <Shield className="w-4 h-4 text-[#C9A96E]" />
          <span>Complimentary Membership Included</span>
        </div>
      </div>

      {/* Right Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[440px] rounded-3xl p-8 border border-white/[0.06] shadow-2xl relative overflow-y-auto max-h-[90vh]"
          style={{ background: "#12121A" }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Join Aureon
            </h2>
            <p className="text-[#A1A1AA] text-sm mt-1">Begin your tailored luxury journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-xl border border-red-500/20 text-red-400 text-xs text-center"
                style={{ background: "rgba(239, 68, 68, 0.08)" }}
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-11 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-11 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <Phone className="w-4 h-4" />
                </span>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-11 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-11 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span style={{ color: strengthColor }}>Strength: {strengthLabel}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="rounded-full transition-all duration-300"
                        style={{ 
                          background: i <= strength ? strengthColor : "rgba(255,255,255,0.06)" 
                        }} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none transition-all focus:border-[#C9A96E]"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1.5">
              <input 
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 cursor-pointer accent-[#C9A96E]"
              />
              <label htmlFor="agree" className="text-xs text-[#A1A1AA] leading-normal cursor-pointer select-none">
                I agree to the <Link to="/terms" className="text-[#C9A96E] hover:underline font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-[#C9A96E] hover:underline font-medium">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] transition-all relative overflow-hidden mt-3"
              style={{ 
                background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)",
                boxShadow: "0 4px 15px rgba(201,169,110,0.25)"
              }}
            >
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#0A0A0F] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : "Create Your Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-[#71717A]">Already a member? </span>
            <Link to="/login" className="text-[#C9A96E] font-semibold hover:underline">Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
