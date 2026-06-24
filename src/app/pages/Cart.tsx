import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Lock, Minus, Plus, X, ArrowLeft } from "lucide-react";
import { useStore } from "../context/StoreContext";

const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";
const GOLD = "#C9A96E";

export function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + tax;

  const handleApplyCoupon = () => {
    if (coupon.trim()) setCouponApplied(true);
  };

  if (cart.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6"
        style={{ background: "#0A0A0F" }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="text-8xl"
        >
          🛒
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center space-y-3"
        >
          <h2
            className="text-3xl font-bold"
            style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}
          >
            Your cart feels lonely
          </h2>
          <p style={{ color: "#A1A1AA" }}>Discover our premium collection</p>
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
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 lg:px-14 py-10" style={{ background: "#0A0A0F" }}>
      <div className="max-w-7xl mx-auto">
        {/* Page heading */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "#A1A1AA", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#A1A1AA")}
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT: Cart Items ──────────────────────────────── */}
          <div className="flex-1" style={{ flexBasis: "65%" }}>
            <div className="flex items-center gap-3 mb-6">
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}
              >
                Shopping Cart
              </h1>
              <span
                className="px-3 py-0.5 rounded-full text-sm font-semibold"
                style={{ background: "rgba(201,169,110,0.15)", color: GOLD, border: `1px solid rgba(201,169,110,0.3)` }}
              >
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => {
                  const subtotal = item.product.price * item.quantity;
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="relative flex items-center gap-4 p-4 rounded-2xl group"
                      style={{
                        background: "#12121A",
                        boxShadow: NEURO_SHADOW,
                        borderLeft: "2px solid transparent",
                        transition: "border-color 0.25s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.borderLeftColor = GOLD)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent")
                      }
                    >
                      {/* Emoji box */}
                      <div
                        className="flex items-center justify-center rounded-xl text-4xl shrink-0"
                        style={{
                          width: 80,
                          height: 80,
                          background: "#0D0D16",
                          boxShadow: NEURO_SHADOW,
                        }}
                      >
                        {item.product.emoji}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: GOLD }}>
                          {item.product.brand}
                        </p>
                        <p className="font-semibold text-sm truncate" style={{ color: "#F8F8FC" }}>
                          {item.product.name}
                        </p>
                        <span
                          className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            background:
                              item.product.stock === "In Stock"
                                ? "rgba(34,197,94,0.12)"
                                : "rgba(234,179,8,0.12)",
                            color: item.product.stock === "In Stock" ? "#22C55E" : "#EAB308",
                          }}
                        >
                          {item.product.stock}
                        </span>
                        <p className="text-sm font-semibold mt-1" style={{ color: GOLD, fontFamily: "'Playfair Display',serif" }}>
                          ₹{item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Qty stepper */}
                      <div
                        className="flex items-center gap-2 rounded-xl px-2 py-1"
                        style={{ background: "#0D0D16", boxShadow: NEURO_SHADOW }}
                      >
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: "#12121A", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold" style={{ color: "#F8F8FC" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ background: "#12121A", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right shrink-0 w-24 hidden sm:block">
                        <p className="text-xs text-zinc-600 mb-0.5">Subtotal</p>
                        <p
                          className="font-bold text-base"
                          style={{ fontFamily: "'Playfair Display',serif", color: "#F8F8FC" }}
                        >
                          ₹{subtotal.toLocaleString()}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}
                      >
                        <X size={11} />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ──────────────────────────── */}
          <div className="lg:w-[35%] shrink-0">
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                background: "#0D0D16",
                boxShadow: NEURO_SHADOW,
                position: "sticky",
                top: 120,
              }}
            >
              <h2
                className="text-lg font-bold"
                style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}
              >
                Order Summary
              </h2>

              {/* Summary rows */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#A1A1AA" }}>Subtotal</span>
                  <span style={{ color: "#F8F8FC" }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#A1A1AA" }}>Shipping</span>
                  <span style={{ color: "#22C55E", fontWeight: 600 }}>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#A1A1AA" }}>Tax (18% GST)</span>
                  <span style={{ color: "#F8F8FC" }}>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold" style={{ color: "#F8F8FC" }}>
                  Total
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}
                >
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Coupon */}
              <div className="space-y-2">
                <p className="text-xs font-medium" style={{ color: "#A1A1AA" }}>Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,169,110,0.15)",
                      color: "#F8F8FC",
                      boxShadow: "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)";
                      e.currentTarget.style.boxShadow =
                        "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624, 0 0 0 3px rgba(201,169,110,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)";
                      e.currentTarget.style.boxShadow =
                        "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624";
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: couponApplied ? "rgba(34,197,94,0.15)" : "rgba(201,169,110,0.12)",
                      color: couponApplied ? "#22C55E" : GOLD,
                      border: `1px solid ${couponApplied ? "rgba(34,197,94,0.3)" : "rgba(201,169,110,0.25)"}`,
                      boxShadow: NEURO_SHADOW,
                    }}
                  >
                    {couponApplied ? "✓" : "Apply"}
                  </button>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/checkout")}
                className="w-full py-4 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #D4B87A, ${GOLD})`,
                  color: "#0A0A0F",
                  boxShadow: "0 4px 22px rgba(201,169,110,0.45)",
                  animation: "ctaGlow 3s ease infinite",
                }}
              >
                <span className="relative z-10">Proceed to Checkout →</span>
                <span
                  className="absolute inset-y-0 w-12 skew-x-[-20deg]"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    animation: "glare 3s ease infinite",
                  }}
                />
              </motion.button>

              {/* SSL badge */}
              <div className="flex items-center justify-center gap-2">
                <Lock size={12} style={{ color: "#A1A1AA" }} />
                <span className="text-xs" style={{ color: "#A1A1AA" }}>256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
