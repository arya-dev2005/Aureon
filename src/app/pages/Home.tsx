import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { Shield, Truck, RefreshCw, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard3D } from "../components/ProductCard3D";
import { GoldParticles } from "../components/GoldParticles";
import { CoverFlow } from "../components/CoverFlow";
import { HeroProduct3D } from "../components/HeroProduct3D";
import { ALL_PRODUCTS } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { icon: "⌚", label: "Watches" },
  { icon: "💎", label: "Jewellery" },
  { icon: "👜", label: "Bags" },
  { icon: "👓", label: "Eyewear" },
  { icon: "👟", label: "Footwear" },
  { icon: "🕶️", label: "Sunglasses" },
  { icon: "🎩", label: "Accessories" },
  { icon: "🧴", label: "Fragrances" },
];

const TRUST_ITEMS = [
  { icon: Shield, label: "100% Authentic", desc: "Every item verified for authenticity by our expert team." },
  { icon: Truck, label: "Free Delivery", desc: "Complimentary shipping on all orders above ₹5,000." },
  { icon: RefreshCw, label: "30-Day Returns", desc: "Hassle-free returns within 30 days of delivery." },
  { icon: Award, label: "Premium Packaging", desc: "Luxury unboxing experience with every order." },
];

const TESTIMONIALS = [
  {
    quote: "Absolutely world-class service. My watch arrived in stunning packaging and was exactly as described. Will shop here again.",
    name: "Arjun Mehta",
    location: "Mumbai",
    rating: 5,
  },
  {
    quote: "The diamond bracelet I ordered for my wife's anniversary was breathtaking. The quality far exceeded my expectations.",
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
  },
  {
    quote: "Fast delivery, impeccable packaging, and a product that looks ten times better in person. Truly luxury e-commerce done right.",
    name: "Rahul Verma",
    location: "Bengaluru",
    rating: 5,
  },
];

function useCountUp(target: number, duration = 2000, visible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, visible]);
  return count;
}

function StatBlock({ target, suffix, label, visible }: { target: number; suffix: string; label: string; visible: boolean }) {
  const count = useCountUp(target, 1800, visible);
  return (
    <div className="text-center">
      <div className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#C9A96E" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: "#A1A1AA" }}>{label}</div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ h: 5, m: 59, s: 47 });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 5; m = 59; s = 47; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // IntersectionObserver for stats counter
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const isMobileDevice = window.matchMedia("(pointer: coarse)").matches;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-header").forEach(el => {
        if (isMobileDevice) {
          gsap.fromTo(el,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
          );
        } else {
          gsap.fromTo(el,
            { rotateX: 58, opacity: 0, y: 15 },
            { rotateX: 0, opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
          );
        }
      });
      gsap.utils.toArray<HTMLElement>(".card-animate").forEach((el, i) => {
        if (isMobileDevice) {
          gsap.fromTo(el,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power1.out", delay: (i % 2) * 0.05,
              scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" } }
          );
        } else {
          gsap.fromTo(el,
            { opacity: 0, y: 48, rotateX: 18, transformPerspective: 1000 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.75, ease: "power2.out", delay: (i % 4) * 0.08,
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
          );
        }
      });
    }, pageRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const flashProducts = ALL_PRODUCTS.filter(p => [5, 6, 7, 8].includes(p.id));
  const trendingProducts = ALL_PRODUCTS.filter(p => [1, 2, 3, 4].includes(p.id));

  return (
    <div ref={pageRef} style={{ background: "#0A0A0F", color: "#F8F8FC" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(145deg,#06060F 0%,#11112A 48%,#08080F 100%)",
        }}
      >
        <GoldParticles />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
              style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }}>
              ✦ New Season — SS 2026
            </span>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05]"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Discover{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#C9A96E,#F0D99A,#C9A96E)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "goldShimmerText 4s ease infinite",
                  filter: "drop-shadow(0.5px 0.5px 0px #8B7040) drop-shadow(1px 1px 0px #80663a) drop-shadow(1.5px 1.5px 0px #705830) drop-shadow(2px 2px 0px #604a28) drop-shadow(3px 3px 4px rgba(0,0,0,0.85))",
                }}
              >
                Luxury,
              </span>
              <br />Redefined.
            </h1>

            <p className="text-lg max-w-md leading-relaxed" style={{ color: "#A1A1AA" }}>
              Explore a curated universe of premium timepieces, fine jewellery, and iconic accessories — each piece a statement of impeccable taste.
            </p>

            <div ref={statsRef} className="flex items-center gap-10 py-4">
              <StatBlock target={50} suffix="K+" label="Items" visible={statsVisible} />
              <div className="w-px h-10" style={{ background: "rgba(201,169,110,0.2)" }} />
              <StatBlock target={200} suffix="+" label="Brands" visible={statsVisible} />
              <div className="w-px h-10" style={{ background: "rgba(201,169,110,0.2)" }} />
              <StatBlock target={98} suffix="%" label="5-Star" visible={statsVisible} />
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/products")}
                className="px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg,#C9A96E,#D4B87A)",
                  color: "#0A0A0F",
                  animation: "ctaGlow 2.5s ease infinite",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                Shop the Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, borderColor: "rgba(201,169,110,0.6)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/products?sort=new")}
                className="px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{
                  background: "transparent",
                  color: "#C9A96E",
                  border: "1px solid rgba(201,169,110,0.35)",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              >
                New Arrivals →
              </motion.button>
            </div>
          </motion.div>

          {/* Right — custom 3D luxury watch pedestal showcase */}
          <HeroProduct3D />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#A1A1AA" }}>Scroll</span>
          <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(201,169,110,0.4)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "#C9A96E", animation: "scrollDrop 1.8s ease infinite" }} />
          </div>
        </div>
      </section>

      {/* ── CoverFlow ────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#0A0A0F" }}>
        <CoverFlow />
      </section>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="section-header text-center mb-12" style={{ perspective: "600px" }}>
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Shop by{" "}
              <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Category
              </span>
            </h2>
            <p style={{ color: "#A1A1AA" }}>Explore our curated selection across eight luxury verticals</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.label}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/products?cat=${cat.label}`)}
                className="flex flex-col items-center gap-3 group"
                style={{
                  perspective: "500px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  variants={{
                    hover: { scale: 1.08 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 relative border border-transparent"
                  style={{
                    boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624",
                    background: "#12121A",
                    transformStyle: "preserve-3d",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 0 20px rgba(201,169,110,0.35), 4px 4px 12px #060609";
                    el.style.background = "rgba(201,169,110,0.15)";
                    el.style.borderColor = "rgba(201,169,110,0.5)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "4px 4px 12px #060609, -3px -3px 9px #161624";
                    el.style.background = "#12121A";
                    el.style.borderColor = "transparent";
                  }}
                >
                  <motion.span
                    variants={{
                      hover: { translateZ: 18 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                  >
                    {cat.icon}
                  </motion.span>
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#C9A96E]/0 group-hover:border-[#C9A96E]/30 group-hover:scale-110 group-hover:animate-[spinSlow_12s_linear_infinite] transition-all duration-300" />
                </motion.div>
                <motion.span
                  variants={{
                    hover: { translateZ: 10 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="text-xs font-medium text-center"
                  style={{ color: "#A1A1AA", transformStyle: "preserve-3d" }}
                >
                  {cat.label}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flash Deals ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg,#0A0A0F 0%,#0D0A1A 50%,#0A0A0F 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="section-header flex flex-wrap items-center justify-between gap-6 mb-10" style={{ perspective: "600px" }}>
            <div>
              <h2 className="text-4xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                ⚡ Flash{" "}
                <span style={{ background: "linear-gradient(135deg,#8B5CF6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Deals
                </span>
              </h2>
              <p style={{ color: "#A1A1AA" }}>Limited-time offers — don't miss out</p>
            </div>
            {/* Countdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: "#A1A1AA" }}>Ends in:</span>
              {[countdown.h, countdown.m, countdown.s].map((val, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold font-mono"
                    style={{ background: "#12121A", boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624", color: "#C9A96E" }}>
                    {pad(val)}
                  </span>
                  {i < 2 && <span className="text-[#C9A96E] font-bold">:</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashProducts.map((p, i) => <ProductCard3D key={p.id} product={p} flash delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── Trending ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="section-header flex items-center justify-between mb-10" style={{ perspective: "600px" }}>
            <div>
              <h2 className="text-4xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                🔥 Trending{" "}
                <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Now
                </span>
              </h2>
              <p style={{ color: "#A1A1AA" }}>Our most coveted pieces this season</p>
            </div>
            <Link to="/products" className="text-sm font-medium" style={{ color: "#C9A96E", textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((p, i) => <ProductCard3D key={p.id} product={p} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── Premium Collection Banner ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-14">
        <div
          className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl p-1"
          style={{ animation: "borderSpin 3s linear infinite", background: "conic-gradient(from var(--ba,0deg),transparent 0%,#C9A96E 18%,#F0D99A 28%,transparent 45%,transparent 100%)" }}
        >
          <div
            className="relative rounded-[22px] overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#12121A 50%,#0A0A14 100%)", minHeight: 320 }}
          >
            {/* Grid texture overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(201,169,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.03) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
            <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-8">
              <span className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9A96E" }}>
                ✦ Exclusive Collection ✦
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold mb-5" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Curated{" "}
                <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A,#C9A96E)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "goldShimmerText 4s ease infinite" }}>
                  Excellence
                </span>
              </h2>
              <p className="text-lg max-w-xl mb-10" style={{ color: "#A1A1AA" }}>
                Handpicked by our luxury curators — pieces that transcend time and define personal legacy.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/products")}
                className="px-10 py-4 rounded-xl font-semibold text-base"
                style={{
                  background: "linear-gradient(135deg,#C9A96E,#D4B87A)",
                  color: "#0A0A0F",
                  fontFamily: "'Space Grotesk',sans-serif",
                  animation: "ctaGlow 2.5s ease infinite",
                  boxShadow: "0 0 30px rgba(201,169,110,0.3)",
                }}
              >
                Explore Collection
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="section-header text-center mb-12" style={{ perspective: "600px" }}>
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Why{" "}
              <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Choose Us
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map(item => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(201,169,110,0.3), 4px 4px 12px #060609, -3px -3px 9px #161624" }}
                className="card-animate p-6 rounded-2xl flex flex-col items-center text-center gap-4 transition-all duration-300"
                style={{
                  background: "#12121A",
                  boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)" }}>
                  <item.icon size={22} style={{ color: "#C9A96E" }} />
                </div>
                <div>
                  <div className="font-semibold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{item.label}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "linear-gradient(180deg,#0A0A0F 0%,#0C0C18 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="section-header text-center mb-12" style={{ perspective: "600px" }}>
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              What Our{" "}
              <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Clients Say
              </span>
            </h2>
            <p style={{ color: "#A1A1AA" }}>Real stories from verified luxury buyers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <motion.div
                key={t.name}
                whileHover={{ scale: 1.02 }}
                className="card-animate p-6 rounded-2xl relative overflow-hidden transition-all duration-300"
                style={{
                  background: "#12121A",
                  boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  const shimmer = el.querySelector(".shimmer-line") as HTMLElement;
                  if (shimmer) shimmer.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  const shimmer = el.querySelector(".shimmer-line") as HTMLElement;
                  if (shimmer) shimmer.style.opacity = "0";
                }}
              >
                {/* Top shimmer line */}
                <div className="shimmer-line absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300" style={{
                  background: "linear-gradient(90deg,transparent,#C9A96E,#F0D99A,#C9A96E,transparent)",
                  opacity: 0,
                }} />
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className="text-sm" style={{ color: "#C9A96E" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#A1A1AA" }}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)", color: "#0A0A0F" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#A1A1AA" }}>{t.location}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)" }}>
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0A0A0F" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-14 text-center">
          <div className="section-header" style={{ perspective: "600px" }}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block" style={{ color: "#C9A96E" }}>Stay in the Loop</span>
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Exclusive Access,{" "}
              <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                First
              </span>
            </h2>
            <p className="mb-8" style={{ color: "#A1A1AA" }}>
              Subscribe for early access to new collections, flash deal alerts, and member-only discounts.
            </p>
          </div>
          <form
            className="flex gap-3"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none"
              style={{
                background: "#12121A",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#F8F8FC",
                boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624",
              }}
            />
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              type="submit"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg,#C9A96E,#D4B87A)",
                color: "#0A0A0F",
                fontFamily: "'Space Grotesk',sans-serif",
              }}
            >
              Subscribe
            </motion.button>
          </form>
          <p className="text-xs mt-3" style={{ color: "#52525B" }}>No spam. Unsubscribe at any time. Privacy guaranteed.</p>
        </div>
      </section>
    </div>
  );
}
