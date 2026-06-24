import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const r = 25;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      setProgress(p);
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashOffset = circ - progress * circ;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
      title="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 300,
        cursor: "pointer",
        transformStyle: "preserve-3d",
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
      }}
    >
      {/* The tilt wrapper that creates the cylindrical illusion */}
      <div
        style={{
          transform: "rotateX(42deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
          <defs>
            <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A96E" />
              <stop offset="100%" stopColor="#F0D99A" />
            </linearGradient>
            <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A96E" />
              <stop offset="50%" stopColor="#222230" />
              <stop offset="100%" stopColor="#A07840" />
            </linearGradient>
            <linearGradient id="glareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.01)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Outer Bezel Border Ring */}
          <circle
            cx="34"
            cy="34"
            r={r + 5}
            stroke="url(#bezelGrad)"
            strokeWidth="1.2"
          />

          {/* Mini Watch Bezel Ticks */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 34 + (r + 3) * Math.sin(angle);
            const y1 = 34 - (r + 3) * Math.cos(angle);
            const x2 = 34 + (r + 5) * Math.cos(angle); // slightly offset for design
            const y2 = 34 - (r + 5) * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,169,110,0.6)" strokeWidth="0.8" />;
          })}

          {/* Dial Face Background */}
          <circle
            cx="34"
            cy="34"
            r={r}
            fill="#101017"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="2.5"
          />

          {/* Progress Arc Line */}
          <circle
            cx="34"
            cy="34"
            r={r}
            stroke="url(#pg)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 34 34)"
            style={{ transition: "stroke-dashoffset 0.12s linear" }}
          />

          {/* Specular Dial glare split */}
          <path
            d="M 9,34 A 25,25 0 0,1 59,34 Z"
            fill="url(#glareGrad)"
            pointerEvents="none"
          />

          {/* Percent text */}
          <text
            x="34"
            y="34"
            textAnchor="middle"
            dy="0.4em"
            fill="#C9A96E"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="'Space Grotesk', sans-serif"
          >
            {Math.round(progress * 100)}%
          </text>
        </svg>
      </div>
    </motion.div>
  );
}
