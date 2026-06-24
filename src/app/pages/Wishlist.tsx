import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingCart, X, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { ALL_PRODUCTS } from "../data/products";

const GOLD = "#C9A96E";
const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={10}
          fill={i <= Math.round(rating) ? GOLD : "none"}
          style={{ color: i <= Math.round(rating) ? GOLD : "#3F3F46" }}
        />
      ))}
    </div>
  );
}

export function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const products = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));
  const premiumCount = products.filter((p) => p.premium).length;
  const estimatedTotal = products.reduce((s, p) => s + p.price, 0);

  const handleMoveAll = () => {
    products.forEach((p) => addToCart(p, 1));
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6" style={{ background: "#0A0A0F" }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="text-8xl"
        >
          🤍
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
            Your wishlist is empty
          </h2>
          <p style={{ color: "#A1A1AA" }}>Save items you love to find them later</p>
        </motion.div>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <Link
            to="/products"
            className="px-8 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #D4B87A, ${GOLD})`,
              color: "#0A0A0F",
              textDecoration: "none",
              boxShadow: "0 4px 22px rgba(201,169,110,0.45)",
              animation: "ctaGlow 3s ease infinite",
            }}
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 lg:px-14 py-10" style={{ background: "#0A0A0F" }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
              My Wishlist
            </h1>
            <p className="mt-1 text-sm" style={{ color: "#A1A1AA" }}>
              {products.length} item{products.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleMoveAll}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #D4B87A, ${GOLD})`,
              color: "#0A0A0F",
              boxShadow: "0 4px 22px rgba(201,169,110,0.45)",
              animation: "ctaGlow 3s ease infinite",
            }}
          >
            <ShoppingCart size={14} />
            Move All to Cart
            <span
              className="absolute inset-y-0 w-10 skew-x-[-20deg]"
              style={{ background: "rgba(255,255,255,0.18)", animation: "glare 3s ease infinite" }}
            />
          </motion.button>
        </div>

        {/* Stats Bar */}
        <div
          className="flex flex-wrap items-center gap-6 p-5 rounded-2xl"
          style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
        >
          <div className="flex items-center gap-2">
            <Heart size={16} fill={GOLD} style={{ color: GOLD }} />
            <span className="text-sm font-semibold" style={{ color: "#F8F8FC" }}>{products.length} Saved Items</span>
          </div>
          <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "#A1A1AA" }}>
              <span className="font-semibold" style={{ color: GOLD }}>{premiumCount}</span> Premium Items
            </span>
          </div>
          <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "#A1A1AA" }}>Estimated Value</span>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}
            >
              ₹{estimatedTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="relative rounded-2xl p-5 flex flex-col gap-4 group"
                style={{
                  background: "#12121A",
                  boxShadow: NEURO_SHADOW,
                  border: "1px solid transparent",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(201,169,110,0.35)";
                  el.style.boxShadow = `${NEURO_SHADOW}, 0 0 24px rgba(201,169,110,0.12)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "transparent";
                  el.style.boxShadow = NEURO_SHADOW;
                }}
              >
                {/* Remove Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    color: "#EF4444",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <X size={12} />
                </button>

                {/* Badge */}
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider"
                    style={{ background: "rgba(201,169,110,0.12)", color: GOLD, animation: "floatBadge 3s ease infinite" }}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Emoji box */}
                <div
                  className="w-full aspect-square rounded-xl flex items-center justify-center text-5xl"
                  style={{ background: "#0D0D16", boxShadow: NEURO_SHADOW }}
                >
                  {product.emoji}
                </div>

                {/* Info */}
                <div className="space-y-1 flex-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: GOLD }}>
                    {product.brand}
                  </p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "#F8F8FC" }}>
                    {product.name}
                  </p>
                  <StarRating rating={product.rating} />
                  <p className="text-[10px]" style={{ color: "#52525b" }}>
                    ({product.reviews.toLocaleString()} reviews)
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}
                  >
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span
                    className="text-xs line-through"
                    style={{ color: "#52525b" }}
                  >
                    ₹{product.oldPrice.toLocaleString()}
                  </span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}
                  >
                    -{product.discount}%
                  </span>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #D4B87A)`,
                    color: "#0A0A0F",
                    boxShadow: "0 3px 14px rgba(201,169,110,0.35)",
                  }}
                >
                  <ShoppingCart size={12} />
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
