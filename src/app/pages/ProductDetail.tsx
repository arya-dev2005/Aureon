import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Star, ShoppingCart, Heart, Check, Package, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard3D } from "../components/ProductCard3D";
import { getProduct, getRelated } from "../data/products";
import { useStore } from "../context/StoreContext";

gsap.registerPlugin(ScrollTrigger);

type TabKey = "description" | "specifications" | "reviews" | "shipping";

const MOCK_REVIEWS = [
  {
    name: "Vikram Nair",
    date: "12 June 2026",
    rating: 5,
    text: "Exceptional quality. The finishing is immaculate — photographs don't do it justice. Delivery was swift and the packaging alone felt like a luxury experience.",
  },
  {
    name: "Ananya Bose",
    date: "3 May 2026",
    rating: 5,
    text: "I was sceptical buying something this premium online, but every doubt was obliterated the moment I opened the box. Will be my go-to store from now on.",
  },
  {
    name: "Rohit Kapoor",
    date: "18 April 2026",
    rating: 4,
    text: "Beautifully crafted and arrived well ahead of schedule. Loses one star only because the sizing guide could be clearer, but the product itself is flawless.",
  },
];

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? "fill-[#C9A96E] text-[#C9A96E]" : "text-zinc-700"}
        />
      ))}
    </span>
  );
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProduct(Number(id));
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const wishlisted = product ? isWishlisted(product.id) : false;

  const related = product ? getRelated(product) : [];

  // GSAP for related cards
  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".card-animate").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: (i % 4) * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    }, pageRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center" style={{ background: "#0A0A0F", minHeight: "60vh" }}>
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#C9A96E" }}>Product Not Found</h2>
        <p className="mb-8" style={{ color: "#A1A1AA" }}>The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 rounded-xl font-medium text-sm"
          style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)", color: "#0A0A0F" }}
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty, product.colors[selectedColor]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const neuShadow = "4px 4px 12px #060609, -3px -3px 9px #161624";

  const thumbStyles = [
    { background: "radial-gradient(circle,rgba(201,169,110,0.15) 0%,#0F0F1A 70%)" },
    { background: "radial-gradient(circle,rgba(255,255,255,0.07) 0%,#0C0C18 70%)" },
    { background: "radial-gradient(circle,rgba(138,90,246,0.12) 0%,#0A0A14 70%)" },
  ];

  return (
    <div ref={pageRef} style={{ background: "#0A0A0F", color: "#F8F8FC" }}>
      {/* Breadcrumb */}
      <div className="px-6 lg:px-14 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <nav className="flex items-center gap-1.5 text-xs flex-wrap" style={{ color: "#A1A1AA" }}>
          <Link to="/" className="hover:text-[#C9A96E] transition-colors" style={{ color: "#A1A1AA", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={12} style={{ color: "#52525B" }} />
          <Link to="/products" className="hover:text-[#C9A96E] transition-colors" style={{ color: "#A1A1AA", textDecoration: "none" }}>Products</Link>
          <ChevronRight size={12} style={{ color: "#52525B" }} />
          <Link to={`/products?cat=${product.category}`} className="hover:text-[#C9A96E] transition-colors" style={{ color: "#A1A1AA", textDecoration: "none" }}>{product.category}</Link>
          <ChevronRight size={12} style={{ color: "#52525B" }} />
          <span className="truncate max-w-[220px]" style={{ color: "#F8F8FC" }}>{product.name}</span>
        </nav>
      </div>

      {/* Main product layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-10 lg:gap-14">
          {/* ── LEFT: Gallery ─────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Main image area */}
            <motion.div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                aspectRatio: "1/1",
                background: thumbStyles[activeThumb].background,
                boxShadow: neuShadow,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Gold glow behind emoji */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(circle at 50% 50%,rgba(201,169,110,0.1) 0%,transparent 65%)",
              }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeThumb}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontSize: "10rem",
                    filter: "drop-shadow(0 0 40px rgba(201,169,110,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.7))",
                    zIndex: 2,
                  }}
                >
                  {product.emoji}
                </motion.div>
              </AnimatePresence>
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l" style={{ borderColor: "rgba(201,169,110,0.4)" }} />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r" style={{ borderColor: "rgba(201,169,110,0.4)" }} />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l" style={{ borderColor: "rgba(201,169,110,0.4)" }} />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r" style={{ borderColor: "rgba(201,169,110,0.4)" }} />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {thumbStyles.map((style, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveThumb(i)}
                  className="flex-1 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 py-4 transition-all duration-300"
                  style={{
                    background: style.background,
                    boxShadow: neuShadow,
                    border: activeThumb === i ? "1.5px solid #C9A96E" : "1.5px solid rgba(255,255,255,0.05)",
                    aspectRatio: "1/1",
                    maxHeight: 100,
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{product.emoji}</span>
                  <span className="text-[10px]" style={{ color: "#A1A1AA" }}>View {i + 1}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product Info ────────────────────────────────── */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#C9A96E" }}>{product.brand}</span>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1.5 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRow rating={product.rating} />
              <span className="font-semibold text-sm">{product.rating}</span>
              <span className="text-sm" style={{ color: "#52525B" }}>({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display',serif", color: "#F8F8FC" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-lg line-through" style={{ color: "#52525B", fontFamily: "'Playfair Display',serif" }}>
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-sm font-bold" style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)" }}>
                {product.discount}% OFF
              </span>
            </div>

            {/* Stock badge */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{
                background: product.stock === "In Stock" ? "#22C55E" : product.stock.startsWith("Only") ? "#F59E0B" : "#EF4444",
                boxShadow: `0 0 8px ${product.stock === "In Stock" ? "#22C55E" : product.stock.startsWith("Only") ? "#F59E0B" : "#EF4444"}`,
              }} />
              <span className="text-sm font-medium" style={{
                color: product.stock === "In Stock" ? "#22C55E" : product.stock.startsWith("Only") ? "#F59E0B" : "#EF4444",
              }}>{product.stock}</span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>{product.description}</p>

            {/* Color selector */}
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: "#A1A1AA" }}>
                Colour
              </span>
              <div className="flex gap-2.5">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={color}
                    className="w-8 h-8 rounded-full transition-all duration-200"
                    style={{
                      background: color,
                      outline: selectedColor === i ? `2px solid #C9A96E` : "2px solid transparent",
                      outlineOffset: 3,
                      boxShadow: selectedColor === i ? "0 0 10px rgba(201,169,110,0.5)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: "#A1A1AA" }}>
                Quantity
              </span>
              <div className="flex items-center gap-0 w-32 rounded-xl overflow-hidden" style={{ boxShadow: neuShadow, background: "#12121A" }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors"
                  style={{ color: qty > 1 ? "#C9A96E" : "#52525B" }}
                >
                  −
                </button>
                <span className="flex-1 text-center font-semibold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold"
                  style={{ color: "#C9A96E" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: addedToCart ? "linear-gradient(135deg,#22C55E,#16A34A)" : "linear-gradient(135deg,#C9A96E,#D4B87A)",
                  color: "#0A0A0F",
                  fontFamily: "'Space Grotesk',sans-serif",
                  animation: !addedToCart ? "ctaGlow 2.5s ease infinite" : "none",
                }}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span key="added" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                      <Check size={16} /> Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                      <ShoppingCart size={16} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(239,68,68,0.55)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: wishlisted ? "rgba(239,68,68,0.12)" : "#12121A",
                  border: wishlisted ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: neuShadow,
                }}
              >
                <Heart size={18} className={wishlisted ? "fill-red-500 text-red-500" : "text-zinc-400"} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="pt-2">
              <span className="text-xs font-semibold tracking-wider uppercase mb-3 block" style={{ color: "#A1A1AA" }}>
                Key Features
              </span>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: "#A1A1AA" }}>
                    <Check size={13} style={{ color: "#C9A96E", flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────── */}
        <div className="mt-16">
          {/* Tab bar */}
          <div className="flex gap-0 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {(["description", "specifications", "reviews", "shipping"] as TabKey[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-3.5 text-sm font-medium capitalize transition-colors duration-200"
                style={{ color: activeTab === tab ? "#F8F8FC" : "#A1A1AA" }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg,#C9A96E,#F0D99A,#C9A96E)" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {/* Description */}
              {activeTab === "description" && (
                <motion.div key="desc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                  className="max-w-3xl space-y-4">
                  <p className="text-base leading-relaxed" style={{ color: "#A1A1AA" }}>{product.description}</p>
                  <p className="text-base leading-relaxed" style={{ color: "#A1A1AA" }}>
                    Each piece in our collection is individually inspected by our quality assurance team before dispatch. We partner exclusively with authorised distributors and certified manufacturers to guarantee provenance and authenticity. Your investment is protected from the moment you place your order to the day it arrives at your door.
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "#A1A1AA" }}>
                    The {product.brand} {product.name} represents the pinnacle of what the {product.category} category has to offer at this price point. Whether as a personal indulgence or a considered gift, it carries with it a timeless quality that appreciates in meaning over years of ownership.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: Shield, label: "100% Authentic", desc: "Verified by our team" },
                      { icon: Package, label: "Luxury Packaging", desc: "Premium presentation box" },
                      { icon: Truck, label: "Insured Shipping", desc: "End-to-end tracking" },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.05)", boxShadow: neuShadow }}>
                        <item.icon size={18} style={{ color: "#C9A96E", flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <div className="text-sm font-semibold mb-0.5">{item.label}</div>
                          <div className="text-xs" style={{ color: "#A1A1AA" }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Specifications */}
              {activeTab === "specifications" && (
                <motion.div key="specs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                  className="max-w-2xl rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.05)", boxShadow: neuShadow }}>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div
                      key={key}
                      className="grid grid-cols-[180px_1fr] px-5 py-3.5 text-sm"
                      style={{ background: i % 2 === 0 ? "#12121A" : "#0F0F18" }}
                    >
                      <span className="font-medium" style={{ color: "#C9A96E" }}>{key}</span>
                      <span style={{ color: "#A1A1AA" }}>{val}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Reviews */}
              {activeTab === "reviews" && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                  className="space-y-5 max-w-2xl">
                  {MOCK_REVIEWS.map((r, i) => (
                    <div key={i} className="p-5 rounded-2xl relative overflow-hidden"
                      style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.05)", boxShadow: neuShadow }}>
                      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.4),transparent)" }} />
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                            style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)", color: "#0A0A0F" }}>
                            {r.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{r.name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs" style={{ color: "#52525B" }}>{r.date}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                                style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)" }}>
                                Verified
                              </span>
                            </div>
                          </div>
                        </div>
                        <StarRow rating={r.rating} size={13} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>{r.text}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Shipping */}
              {activeTab === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                  {[
                    { icon: Truck, title: "Express Delivery", desc: "Guaranteed delivery within 2–3 business days. Real-time tracking link sent via SMS and email.", highlight: "Free on orders above ₹5,000" },
                    { icon: Shield, title: "Insured Transit", desc: "Every shipment is fully insured against loss or damage. File a claim in minutes through our app.", highlight: "100% covered" },
                    { icon: Package, title: "Luxury Packaging", desc: "Your item is presented in a bespoke box with tissue, ribbon, and a personalised note card.", highlight: "Complimentary" },
                    { icon: RotateCcw, title: "Easy Returns", desc: "Changed your mind? Return within 30 days for a full refund. No questions asked.", highlight: "30-day policy" },
                  ].map(item => (
                    <div key={item.title} className="p-5 rounded-2xl"
                      style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.05)", boxShadow: neuShadow }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)" }}>
                          <item.icon size={16} style={{ color: "#C9A96E" }} />
                        </div>
                        <div className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{item.title}</div>
                      </div>
                      <p className="text-xs leading-relaxed mb-2" style={{ color: "#A1A1AA" }}>{item.desc}</p>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(201,169,110,0.1)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.25)" }}>
                        {item.highlight}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Related Products ──────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-10 pb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                You May Also{" "}
                <span style={{ background: "linear-gradient(135deg,#C9A96E,#F0D99A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Like
                </span>
              </h2>
              <Link to={`/products?cat=${product.category}`} className="text-sm font-medium" style={{ color: "#C9A96E", textDecoration: "none" }}>
                View all {product.category} →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard3D key={p.id} product={p} delay={i * 80} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
