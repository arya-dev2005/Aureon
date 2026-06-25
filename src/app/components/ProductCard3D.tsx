import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Star, ShoppingCart, Heart, Crown, Eye } from "lucide-react";
import { useStore } from "../context/StoreContext";
import type { Product } from "../data/products";

export type { Product as ProductData };

function StockBadge({ stock }: { stock: string }) {
  const isIn = stock === "In Stock";
  const isLow = stock.startsWith("Only");
  const color = isIn ? "#22C55E" : isLow ? "#F59E0B" : "#EF4444";
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}CC` }} />
      {stock}
    </span>
  );
}

export function ProductCard3D({ product, flash = false, delay = 0 }: { product: Product; flash?: boolean; delay?: number }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const rotX = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      rotX.set(0);
      rotY.set(0);
      shineX.set(50);
      shineY.set(50);
      return;
    }
  }, [rotX, rotY, shineX, shineY]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    rotX.set(((y - rect.height / 2) / rect.height) * -5);
    rotY.set(((x - rect.width / 2) / rect.width) * 5);
    shineX.set((x / rect.width) * 100);
    shineY.set((y / rect.height) * 100);
  };
  const handleLeave = () => { rotX.set(0); rotY.set(0); setHovered(false); };

  const isFlash = flash || product.badge === "FLASH DEAL";
  const badgeGrad = isFlash ? "linear-gradient(135deg,#8B5CF6,#A78BFA)" : "linear-gradient(135deg,#C9A96E,#D4B87A)";
  const neuShadow = product.premium ? "4px 4px 12px #060609, -3px -3px 9px #161624" : "3px 3px 10px #060609, -2px -2px 7px #121220";

  return (
    <div className="card-animate" style={{ perspective: "900px", animationDelay: `${delay}ms` }}>
      <div className="rounded-2xl p-px" style={product.premium
        ? { background: hovered ? "conic-gradient(from var(--ba,0deg),transparent 0%,#C9A96E 18%,#F0D99A 28%,transparent 45%,transparent 100%)" : "rgba(201,169,110,0.22)", animation: hovered ? "borderSpin 2.8s linear infinite" : "none" }
        : { background: hovered ? "rgba(201,169,110,0.32)" : "rgba(255,255,255,0.058)" }
      }>
        <motion.div
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          onClick={() => navigate(`/products/${product.id}`)}
          style={{
            rotateX: rotX, rotateY: rotY,
            transformStyle: "preserve-3d",
            willChange: "transform",
            borderRadius: 16, overflow: "hidden",
            background: product.premium ? "linear-gradient(160deg,rgba(201,169,110,0.07) 0%,#12121A 38%,#0D0D16 100%)" : "linear-gradient(160deg,rgba(255,255,255,0.025) 0%,#12121A 100%)",
            boxShadow: hovered ? `0 22px 52px rgba(0,0,0,0.72),0 0 ${product.premium ? "40px" : "22px"} rgba(201,169,110,${product.premium ? "0.28" : "0.16"}),${neuShadow}` : neuShadow,
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", cursor: "pointer",
          }}
          animate={{ scale: hovered ? 1.008 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Specular */}
          <motion.div className="absolute inset-0 pointer-events-none z-20 rounded-2xl" style={{ background: `radial-gradient(circle at ${shineX.get()}% ${shineY.get()}%,rgba(255,255,255,0.055) 0%,transparent 50%)`, opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }} />
          {/* Glare sweep */}
          <div className="absolute inset-0 z-20 overflow-hidden rounded-2xl pointer-events-none" style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.15s" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, width: "3.5rem", background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.1),transparent)", animation: hovered ? "glare 1.1s ease forwards" : "none", left: "-3.5rem" }} />
          </div>

          {/* Image area */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
            <div className="w-full h-full flex items-center justify-center" style={{ background: product.premium ? "radial-gradient(circle at 50% 44%,rgba(201,169,110,0.12) 0%,#0F0F1A 62%)" : "radial-gradient(circle at 50% 44%,rgba(30,30,50,0.8) 0%,#0A0A0F 68%)" }}>
              <motion.div animate={{ scale: hovered ? 1.07 : 1, filter: hovered ? "drop-shadow(0 0 22px rgba(201,169,110,0.45))" : "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }} transition={{ duration: 0.55 }} style={{ fontSize: "5.2rem", transformStyle: "preserve-3d" }}>
                {product.emoji}
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(18,18,26,0.92) 0%,transparent 100%)" }} />

            {product.badge && (
              <motion.div whileHover={{ rotateX: 5 }} className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-white text-[10px] font-bold tracking-wider uppercase" style={{ background: badgeGrad, boxShadow: "0 2px 10px rgba(0,0,0,0.45)" }}>
                {product.badge}
              </motion.div>
            )}
            {product.premium && (
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold" style={{ background: "rgba(10,10,15,0.88)", border: "1px solid rgba(201,169,110,0.4)", color: "#C9A96E", backdropFilter: "blur(10px)", animation: "floatBadge 3s ease-in-out infinite" }}>
                <Crown size={9} className="fill-[#C9A96E]" /> PREMIUM
              </div>
            )}

            <motion.button
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.65 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(8,8,14,0.88)", border: wishlisted ? "1px solid rgba(239,68,68,0.55)" : "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
              onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
              whileTap={{ scale: 0.85 }}
            >
              <Heart size={13} className={wishlisted ? "fill-red-500 text-red-500" : "text-zinc-400"} />
            </motion.button>
            <motion.button
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.22 }}
              className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium text-zinc-300"
              style={{ background: "rgba(8,8,14,0.88)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
              onClick={e => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
            >
              <Eye size={10} /> Quick View
            </motion.button>
          </div>

          <div className="p-4 space-y-1.5">
            <StockBadge stock={product.stock} />
            <span className="block text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: "#C9A96E" }}>{product.brand}</span>
            <h3 className="text-sm font-medium leading-snug line-clamp-2" style={{ color: "#F8F8FC" }}>{product.name}</h3>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <motion.span key={s} whileHover={{ scale: 1.3, y: -1 }} transition={{ duration: 0.15, delay: s * 0.03 }}>
                    <Star size={11} className={s <= Math.round(product.rating) ? "fill-[#C9A96E] text-[#C9A96E]" : "text-zinc-700"} />
                  </motion.span>
                ))}
              </div>
              <span className="text-[12px] font-semibold text-white">{product.rating}</span>
              <span className="text-[11px] text-zinc-600">({(product.reviews/1000).toFixed(1)}k)</span>
            </div>
            <div className="flex items-end justify-between pt-0.5">
              <div>
                <div className="text-lg font-bold leading-none" style={{ fontFamily: "'Playfair Display',serif", color: "#F8F8FC" }}>₹{product.price.toLocaleString("en-IN")}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] line-through text-zinc-600">₹{product.oldPrice.toLocaleString("en-IN")}</span>
                  <span className="text-[11px] font-semibold text-emerald-400">-{product.discount}%</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl"
                style={{ background: hovered ? "linear-gradient(135deg,#C9A96E,#D4B87A)" : "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.32)", color: hovered ? "#0A0A0F" : "#C9A96E", boxShadow: hovered ? "0 0 18px rgba(201,169,110,0.5)" : "none", transition: "background 0.25s,color 0.25s,box-shadow 0.25s" }}
                onClick={e => { e.stopPropagation(); addToCart(product); }}
              >
                <ShoppingCart size={15} />
              </motion.button>
            </div>
          </div>
          {product.premium && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.6),transparent)" }} />}
        </motion.div>
      </div>
    </div>
  );
}
