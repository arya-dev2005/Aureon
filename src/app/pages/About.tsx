import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, HelpCircle, Compass, CheckCircle, Globe } from "lucide-react";
import { GoldParticles } from "../components/GoldParticles";

const STEPS = [
  { icon: Compass, title: "Discover", desc: "Our curators travel the globe to source exceptional items from premier artisans." },
  { icon: HelpCircle, title: "Evaluate", desc: "Each piece undergoes strict validation checks for authenticity and quality." },
  { icon: CheckCircle, title: "Present", desc: "Curated products are showcased on our invite-only dark luxury interface." }
];

const STATS = [
  { val: 10000, suffix: "+", label: "Curated Products" },
  { val: 500, suffix: "+", label: "Luxury Brands" },
  { val: 98, suffix: "%", label: "Collector Satisfaction" },
  { val: 24, suffix: "h", label: "Concierge Delivery" }
];

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = target;
    const increment = end / (duration / 16);
    const t = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [visible, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function About() {
  return (
    <div className="min-h-screen text-[#F8F8FC] relative" style={{ background: "#0A0A0F" }}>
      {/* Hero Section */}
      <div className="relative h-[70vh] flex flex-col justify-center items-center text-center p-8 overflow-hidden border-b border-white/[0.04]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=1200&auto=format&fit=crop')",
            filter: "brightness(0.18) contrast(1.1)"
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none" />
        <GoldParticles />

        <div className="relative z-10 max-w-3xl space-y-6 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C9A96E] text-xs uppercase tracking-[3px] font-semibold"
          >
            Since 2026
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-6xl font-light tracking-wide leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The Story of <span className="font-bold text-white">Aureon</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[#A1A1AA] text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed"
          >
            Where intentional curation meets world-class craftsmanship. Discover digital luxury.
          </motion.p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#71717A] tracking-widest uppercase">
          <span>Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C9A96E]" />
        </div>
      </div>

      {/* Our Mission */}
      <div className="max-w-6xl mx-auto py-24 px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <blockquote 
            className="text-3xl md:text-4xl font-light leading-tight italic"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F8F8FC" }}
          >
            "We believe luxury is not about the price. It's about <span className="text-[#C9A96E] not-italic font-bold">intention</span>."
          </blockquote>
          <div className="w-16 h-0.5 mt-6 bg-[#C9A96E]" />
        </div>
        <div className="text-[#A1A1AA] text-sm md:text-base leading-relaxed space-y-4 font-light">
          <p>
            Aureon was founded as a reaction against mass market, frictionless digital experiences that prioritize volume over value. We curate exclusively for collectors, designers, and enthusiasts who appreciate structural precision and tactile elegance.
          </p>
          <p>
            Each brand represented on our platform is hand-selected. We examine their manufacturing standards, creative direction, and commitment to longevity before adding them to our system.
          </p>
        </div>
      </div>

      {/* The Curation Process */}
      <div className="py-24" style={{ background: "#12121A" }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">Our Methodology</span>
            <h2 className="text-3xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Curation Cycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent z-0" />

            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div 
                  key={i}
                  className="rounded-2xl p-6 border border-white/[0.04] bg-[#1A1A24]/60 relative z-10 transition-all hover:border-[#C9A96E]/30 text-center"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                >
                  <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* By the Numbers */}
      <div className="max-w-6xl mx-auto py-24 px-8 border-t border-white/[0.04]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-[#C9A96E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <CountUp target={s.val} />
                {s.suffix}
              </div>
              <div className="text-xs text-[#A1A1AA] tracking-wider uppercase font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
