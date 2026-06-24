import { useState, useEffect, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";

const FEATURED = [
  { id: 1, emoji: "⌚", brand: "Aurum", name: "Carbon Fibre Chronograph Elite", price: 24999, oldPrice: 34999, discount: 29, rating: 4.9, reviews: 2841, color: "#C9A96E", glow: "rgba(201,169,110,0.35)" },
  { id: 2, emoji: "💎", brand: "Luminos", name: "Precision Architect Timepiece", price: 18499, oldPrice: 22999, discount: 20, rating: 4.7, reviews: 1204, color: "#8B5CF6", glow: "rgba(139,92,246,0.35)" },
  { id: 3, emoji: "🌙", brand: "Lune", name: "Moon Phase Diamond Bezel", price: 45000, oldPrice: 68000, discount: 34, rating: 5.0, reviews: 189, color: "#C9A96E", glow: "rgba(201,169,110,0.35)" },
  { id: 4, emoji: "👑", brand: "Crest", name: "Heritage Skeleton Dial", price: 12299, oldPrice: 19999, discount: 38, rating: 4.9, reviews: 622, color: "#F59E0B", glow: "rgba(245,158,11,0.35)" },
  { id: 5, emoji: "🏆", brand: "AeroForge", name: "Titanium Sport Chronos", price: 6499, oldPrice: 10999, discount: 41, rating: 4.7, reviews: 731, color: "#22C55E", glow: "rgba(34,197,94,0.3)" },
];

function getItemProps(offset: number) {
  const abs = Math.abs(offset);
  if (abs > 2) return null;
  return {
    rotateY: offset * 44,
    z: abs === 0 ? 0 : abs === 1 ? -160 : -310,
    scale: abs === 0 ? 1 : abs === 1 ? 0.8 : 0.6,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.62 : 0.28,
    blur: abs === 0 ? 0 : abs === 1 ? 1 : 2.5,
    zIndex: 10 - abs * 3,
    x: offset * 55,
  };
}

export function CoverFlow() {
  const [active, setActive] = useState(2);
  const n = FEATURED.length;

  const rotX = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const [hovered, setHovered] = useState(false);

  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);
  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);

  useEffect(() => {
    const id = setInterval(next, 4800);
    return () => clearInterval(id);
  }, [next]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    rotX.set(((y - rect.height / 2) / rect.height) * -6);
    rotY.set(((x - rect.width / 2) / rect.width) * 6);
    shineX.set((x / rect.width) * 100);
    shineY.set((y / rect.height) * 100);
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
    setHovered(false);
  };

  return (
    <section
      className="py-20 overflow-hidden section-target"
      style={{
        background: "linear-gradient(180deg, #070710 0%, #0A0A0F 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-16 px-6 section-header" style={{ transformOrigin: "top center" }}>
        <span
          className="inline-block text-[11px] font-bold tracking-[0.22em] uppercase mb-3 px-3.5 py-1.5 rounded-full"
          style={{
            color: "#C9A96E",
            background: "rgba(201,169,110,0.09)",
            border: "1px solid rgba(201,169,110,0.22)",
          }}
        >
          ✦ Signature Pieces
        </span>
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Featured Collection
        </h2>
      </div>

      {/* 3D Stage */}
      <div
        className="relative flex items-center justify-center mx-auto"
        style={{ perspective: "1300px", perspectiveOrigin: "50% 40%", height: 440 }}
      >
        {FEATURED.map((item, i) => {
          const rawOffset = ((i - active + n) % n);
          const offset = rawOffset <= n / 2 ? rawOffset : rawOffset - n;
          const props = getItemProps(offset);
          if (!props) return null;
          const isCenter = offset === 0;

          return (
            <motion.div
              key={item.id}
              onClick={() => !isCenter && setActive(i)}
              animate={{
                rotateY: props.rotateY,
                z: props.z,
                scale: props.scale,
                opacity: props.opacity,
                x: props.x,
                filter: `blur(${props.blur}px)`,
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                width: 265,
                zIndex: props.zIndex,
                cursor: isCenter ? "default" : "pointer",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card face */}
              <motion.div
                onMouseMove={isCenter ? handleMove : undefined}
                onMouseEnter={isCenter ? () => setHovered(true) : undefined}
                onMouseLeave={isCenter ? handleLeave : undefined}
                style={{
                  background: isCenter
                    ? `linear-gradient(160deg, ${item.color}12 0%, #13131E 40%)`
                    : "#0D0D16",
                  border: isCenter
                    ? `1px solid ${item.color}55`
                    : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? `0 28px 70px rgba(0,0,0,0.75), 0 0 48px ${item.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : "0 8px 28px rgba(0,0,0,0.55)",
                  transition: "border 0.5s ease, background 0.5s ease",
                  rotateX: isCenter ? rotX : 0,
                  rotateY: isCenter ? rotY : 0,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Glare specular highlight for active card */}
                {isCenter && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: `radial-gradient(circle at ${shineX.get()}% ${shineY.get()}%,rgba(255,255,255,0.06) 0%,transparent 60%)`,
                      opacity: hovered ? 1 : 0,
                      transition: "opacity 0.2s"
                    }}
                  />
                )}
                {/* Image area */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: 220,
                    background: `radial-gradient(circle at 50% 42%, ${item.color}1A 0%, #080812 68%)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Rotating glow ring behind emoji */}
                  {isCenter && (
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: 140, height: 140,
                        border: `1px solid ${item.color}28`,
                        animation: "spinSlow 12s linear infinite",
                      }}
                    />
                  )}
                  <div
                    style={{
                      fontSize: "6.5rem",
                      filter: isCenter
                        ? `drop-shadow(0 0 28px ${item.glow}) drop-shadow(0 0 60px ${item.color}30)`
                        : "none",
                      animation: isCenter ? "floatWatch 5s ease-in-out infinite" : "none",
                      transition: "filter 0.5s ease",
                    }}
                  >
                    {item.emoji}
                  </div>

                  {/* Center card top shimmer */}
                  {isCenter && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)`,
                      }}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div
                    className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1"
                    style={{ color: item.color }}
                  >
                    {item.brand}
                  </div>
                  <div className="text-sm font-medium text-white line-clamp-1 mb-2">
                    {item.name}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={10}
                          className={
                            s <= Math.round(item.rating)
                              ? "fill-[#C9A96E] text-[#C9A96E]"
                              : "text-zinc-700"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-white">{item.rating}</span>
                    <span className="text-[10px] text-zinc-600">
                      ({(item.reviews / 1000).toFixed(1)}k)
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div
                        className="text-base font-bold"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: "#F8F8FC",
                        }}
                      >
                        ₹{item.price.toLocaleString("en-IN")}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] line-through text-zinc-600">
                          ₹{item.oldPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400">
                          -{item.discount}%
                        </span>
                      </div>
                    </div>

                    {isCenter && (
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="flex items-center justify-center w-9 h-9 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}, #D4B87A)`,
                          color: "#0A0A0F",
                          boxShadow: `0 0 16px ${item.glow}`,
                        }}
                      >
                        <ShoppingCart size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Floor reflection for center card */}
              {isCenter && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0, right: 0,
                    height: 70,
                    overflow: "hidden",
                    pointerEvents: "none",
                    borderRadius: "0 0 22px 22px",
                  }}
                >
                  <div
                    style={{
                      height: 70,
                      transform: "scaleY(-1) translateY(-100%)",
                      opacity: 0.22,
                      maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
                      filter: "blur(3px)",
                      background: `linear-gradient(to top, ${item.color}22 0%, transparent 100%)`,
                    }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-14">
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "#10101A",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#71717A",
            boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161622",
          }}
        >
          <ChevronLeft size={17} />
        </motion.button>

        <div className="flex items-center gap-2">
          {FEATURED.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 26 : 8,
                backgroundColor:
                  i === active ? "#C9A96E" : "rgba(255,255,255,0.14)",
                boxShadow:
                  i === active
                    ? "0 0 10px rgba(201,169,110,0.5)"
                    : "none",
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 4, borderRadius: 99 }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "#10101A",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#71717A",
            boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161622",
          }}
        >
          <ChevronRight size={17} />
        </motion.button>
      </div>
    </section>
  );
}
