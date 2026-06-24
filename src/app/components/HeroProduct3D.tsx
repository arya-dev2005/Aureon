import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function HeroProduct3D() {
  const rotX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(isTouch);

    if (isTouch) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.beta === null || e.gamma === null) return;
        // Phone tilt limits: Beta represents front-to-back tilt (typically 40-70deg when reading), Gamma is side tilt (-90 to 90)
        // Center around typical holding angle: Beta = 50
        const b = e.beta - 50;
        const g = e.gamma;
        
        // Map to a very subtle 3D tilt (max 5 degrees as requested by reducing 3D tilt by 50%)
        const targetX = Math.max(-5, Math.min(5, b * 0.15));
        const targetY = Math.max(-5, Math.min(5, g * 0.15));
        
        rotX.set(-targetX);
        rotY.set(targetY);
      };
      
      window.addEventListener("deviceorientation", handleOrientation);
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }
  }, [rotX, rotY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle 3D tilt: max 4.5 degrees multiplier
    const targetX = ((y - rect.height / 2) / (rect.height / 2)) * -4.5;
    const targetY = ((x - rect.width / 2) / (rect.width / 2)) * 4.5;
    
    rotX.set(targetX);
    rotY.set(targetY);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div
      className="hidden lg:flex items-center justify-center relative w-full h-[500px]"
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Interactive Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          width: 440,
          height: 440,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          cursor: "grab",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* Orbiting Ring 1 (Outer, Tilted) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 390,
            height: 390,
            border: "1px solid rgba(201, 169, 110, 0.08)",
            boxShadow: "inset 0 0 15px rgba(201, 169, 110, 0.03)",
            transformStyle: "preserve-3d",
            animation: "orbitRing1 22s linear infinite",
          }}
        />

        {/* Orbiting Ring 2 (Inner, Tilted Opposite) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 310,
            height: 310,
            border: "1px dashed rgba(201, 169, 110, 0.14)",
            transformStyle: "preserve-3d",
            animation: "orbitRing2 15s linear infinite",
          }}
        />

        {/* Orbiting Particle Dot */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 8,
            height: 8,
            background: "linear-gradient(135deg, #C9A96E, #F0D99A)",
            boxShadow: "0 0 12px #C9A96E",
            animation: "orbit 8s linear infinite",
            top: "50%",
            left: "50%",
            marginTop: -4,
            marginLeft: -4,
          }}
        />

        {/* Glass Pedestal Platform */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(10, 10, 15, 0.6) 80%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(201, 169, 110, 0.22)",
            boxShadow: "0 22px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(201, 169, 110, 0.12)",
            transform: "rotateX(72deg) translateZ(-70px)",
          }}
        />

        {/* Pedestal Bottom Base Glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 220,
            height: 220,
            background: "radial-gradient(circle, rgba(201, 169, 110, 0.15) 0%, transparent 70%)",
            transform: "rotateX(72deg) translateZ(-72px)",
          }}
        />

        {/* Watch Reflection on Pedestal */}
        <motion.div
          animate={{
            y: [88, 93, 88],
            opacity: [0.12, 0.08, 0.12],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            width: 170,
            height: 170,
            transform: "scaleY(-0.35) rotateX(72deg) translateZ(-69px)",
            filter: "blur(2.2px)",
            pointerEvents: "none",
            opacity: 0.12,
          }}
        >
          {/* Flipped simple SVG watch for reflection */}
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#12121A" stroke="#C9A96E" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="44" fill="#0A0A0F" />
            <line x1="50" y1="50" x2="50" y2="28" stroke="#C9A96E" strokeWidth="2.5" />
            <line x1="50" y1="50" x2="68" y2="50" stroke="#F0D99A" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Floating Watch Object */}
        <motion.div
          animate={{
            y: [-12, 2, -12],
            rotateZ: [-0.5, 0.5, -0.5],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            transformStyle: "preserve-3d",
            zIndex: 10,
          }}
          className="relative flex items-center justify-center"
        >
          {/* Main Watch SVG */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 100 100"
            className="filter drop-shadow-[0_18px_35px_rgba(0,0,0,0.85)]"
          >
            <defs>
              <radialGradient id="watchBezel" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1E1E2A" />
                <stop offset="75%" stopColor="#111119" />
                <stop offset="100%" stopColor="#C9A96E" />
              </radialGradient>
              <radialGradient id="dialBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#181824" />
                <stop offset="85%" stopColor="#0B0B0F" />
                <stop offset="100%" stopColor="#050508" />
              </radialGradient>
              <linearGradient id="goldAcc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A96E" />
                <stop offset="50%" stopColor="#F0D99A" />
                <stop offset="100%" stopColor="#A07840" />
              </linearGradient>
            </defs>

            {/* Watch Bezel Outer Ring */}
            <circle cx="50" cy="50" r="48" fill="url(#watchBezel)" stroke="#C9A96E" strokeWidth="1" />
            <circle cx="50" cy="50" r="45" fill="url(#dialBg)" />

            {/* Ticks around the clock */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 50 + 39 * Math.sin(angle);
              const y1 = 50 - 39 * Math.cos(angle);
              const x2 = 50 + 43 * Math.sin(angle);
              const y2 = 50 - 43 * Math.cos(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={i % 3 === 0 ? "#C9A96E" : "#52525B"}
                  strokeWidth={i % 3 === 0 ? "0.8" : "0.5"}
                />
              );
            })}

            {/* Sub-dials (Chronograph) */}
            <circle cx="50" cy="36" r="6.5" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
            <line x1="50" y1="36" x2="52.5" y2="33" stroke="#C9A96E" strokeWidth="0.6" strokeLinecap="round" />
            
            <circle cx="38" cy="55" r="6.5" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
            <line x1="38" y1="55" x2="35" y2="57" stroke="#C9A96E" strokeWidth="0.6" strokeLinecap="round" />

            <circle cx="62" cy="55" r="6.5" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
            <line x1="62" y1="55" x2="64.5" y2="52" stroke="#C9A96E" strokeWidth="0.6" strokeLinecap="round" />

            {/* Luxury Brand Label */}
            <text
              x="50"
              y="24"
              textAnchor="middle"
              fill="#C9A96E"
              fontSize="2.8"
              fontWeight="bold"
              letterSpacing="0.6"
              fontFamily="'Space Grotesk', sans-serif"
            >
              AUREON
            </text>
            
            {/* Automatic Chrono text */}
            <text
              x="50"
              y="68"
              textAnchor="middle"
              fill="#71717A"
              fontSize="1.8"
              letterSpacing="0.3"
              fontFamily="'Inter', sans-serif"
            >
              CHRONOGRAPH
            </text>

            {/* Hands (Hour, Minute, Second) */}
            {/* Hour hand */}
            <g style={{ transform: "rotate(96deg)", transformOrigin: "50px 50px" }}>
              <line x1="50" y1="50" x2="50" y2="34" stroke="url(#goldAcc)" strokeWidth="1.5" strokeLinecap="round" />
              <polygon points="50,31 48.5,34.5 51.5,34.5" fill="#C9A96E" />
            </g>

            {/* Minute hand */}
            <g style={{ transform: "rotate(325deg)", transformOrigin: "50px 50px" }}>
              <line x1="50" y1="50" x2="50" y2="25" stroke="url(#goldAcc)" strokeWidth="1" strokeLinecap="round" />
              <polygon points="50,22 49,25.5 51,25.5" fill="#F0D99A" />
            </g>

            {/* Second hand */}
            <g style={{ transform: "rotate(190deg)", transformOrigin: "50px 50px" }}>
              <line x1="50" y1="50" x2="50" y2="20" stroke="#EF4444" strokeWidth="0.45" strokeLinecap="round" />
              <circle cx="50" cy="50" r="1.2" fill="#EF4444" />
            </g>

            {/* Center pinion */}
            <circle cx="50" cy="50" r="0.8" fill="#C9A96E" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
