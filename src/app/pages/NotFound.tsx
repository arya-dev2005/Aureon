import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Home, Package } from "lucide-react";

const GOLD = "#C9A96E";

const DECORATIVE_CIRCLES = [
  { size: 420, top: "-10%", left: "-8%", delay: "0s", duration: "18s" },
  { size: 280, top: "55%", right: "-5%", delay: "4s", duration: "24s" },
  { size: 180, top: "20%", right: "20%", delay: "8s", duration: "15s" },
  { size: 320, bottom: "-12%", left: "30%", delay: "2s", duration: "20s" },
  { size: 120, top: "40%", left: "15%", delay: "6s", duration: "12s" },
];

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-116px)] px-6 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Decorative circles */}
      {DECORATIVE_CIRCLES.map((circle, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: circle.size,
            height: circle.size,
            top: (circle as { top?: string }).top,
            left: (circle as { left?: string }).left,
            right: (circle as { right?: string }).right,
            bottom: (circle as { bottom?: string }).bottom,
            border: "1px solid rgba(201,169,110,0.06)",
            animation: `spinSlow ${circle.duration} linear infinite`,
            animationDelay: circle.delay,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        {/* 404 Heading */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 20 }}
          style={{
            fontSize: "clamp(6rem, 18vw, 10rem)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            lineHeight: 1,
            background: `linear-gradient(135deg, #8A6A3A 0%, ${GOLD} 30%, #F0D99A 50%, ${GOLD} 70%, #8A6A3A 100%)`,
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "goldShimmerText 5s ease infinite",
            textShadow: "none",
            filter: "drop-shadow(4px 6px 0px rgba(0,0,0,0.6)) drop-shadow(8px 12px 0px rgba(0,0,0,0.3))",
          }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="max-w-sm text-base leading-relaxed"
          style={{ color: "#A1A1AA" }}
        >
          The page you're looking for has drifted into the void.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #D4B87A, ${GOLD})`,
              color: "#0A0A0F",
              boxShadow: "0 4px 22px rgba(201,169,110,0.45)",
              animation: "ctaGlow 3s ease infinite",
            }}
          >
            <Home size={14} />
            Go Home
            <span
              className="absolute inset-y-0 w-12 skew-x-[-20deg]"
              style={{ background: "rgba(255,255,255,0.18)", animation: "glare 4s ease infinite" }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{
              background: "transparent",
              color: GOLD,
              border: `1px solid rgba(201,169,110,0.35)`,
              boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.06)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.6)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 12px #060609, -3px -3px 9px #161624, 0 0 16px rgba(201,169,110,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.35)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 12px #060609, -3px -3px 9px #161624";
            }}
          >
            <Package size={14} />
            Browse Products
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
