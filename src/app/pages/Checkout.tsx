import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check, Lock, CreditCard, Smartphone, Building2, Package } from "lucide-react";
import { useStore } from "../context/StoreContext";

const GOLD = "#C9A96E";
const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";

const INPUT_STYLE = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(201,169,110,0.15)",
  color: "#F8F8FC",
  boxShadow: "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624",
};

type FormData = {
  firstName: string; lastName: string; email: string; phone: string;
  address1: string; address2: string; city: string; state: string; pincode: string;
  paymentMethod: string; cardNumber: string; expiry: string; cvv: string;
};

const INIT_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address1: "", address2: "", city: "", state: "", pincode: "",
  paymentMethod: "upi", cardNumber: "", expiry: "", cvv: "",
};

const PAYMENT_OPTIONS = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Pay via PhonePe, GPay, Paytm" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
  { id: "netbanking", label: "Net Banking", icon: Building2, desc: "All major banks supported" },
  { id: "cod", label: "Cash on Delivery", icon: Package, desc: "Pay when you receive" },
];

function InputField({
  label, value, onChange, placeholder, type = "text", className = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-medium" style={{ color: "#A1A1AA" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={INPUT_STYLE}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)";
          e.currentTarget.style.boxShadow =
            "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624, 0 0 0 3px rgba(201,169,110,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)";
          e.currentTarget.style.boxShadow = "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624";
        }}
      />
    </div>
  );
}

export function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT_FORM);

  const set = (key: keyof FormData) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + tax;

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/orders");
  };

  const stepLabels = ["Shipping", "Payment", "Review"];

  return (
    <div className="min-h-screen px-4 lg:px-14 py-10" style={{ background: "#0A0A0F" }}>
      <div className="max-w-6xl mx-auto">
        {/* ── Progress Bar ────────────────────────────── */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {stepLabels.map((label, idx) => {
            const num = idx + 1;
            const isCompleted = step > num;
            const isActive = step === num;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                    style={{
                      background: isCompleted || isActive
                        ? `linear-gradient(135deg, ${GOLD}, #D4B87A)`
                        : "#0D0D16",
                      color: isCompleted || isActive ? "#0A0A0F" : "#52525b",
                      boxShadow: isActive
                        ? `0 0 20px rgba(201,169,110,0.4), ${NEURO_SHADOW}`
                        : NEURO_SHADOW,
                    }}
                  >
                    {isCompleted ? <Check size={16} /> : num}
                  </div>
                  <span
                    className="text-xs font-medium hidden sm:block"
                    style={{ color: isActive ? GOLD : "#52525b" }}
                  >
                    {label}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className="w-24 h-0.5 mx-2 rounded-full transition-all duration-500"
                    style={{
                      background: step > num
                        ? `linear-gradient(90deg, ${GOLD}, #D4B87A)`
                        : "rgba(255,255,255,0.07)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT ───────────────────────────────────── */}
          <div className="flex-1" style={{ flexBasis: "60%" }}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-6 space-y-5"
                  style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                >
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                    Shipping Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="First Name" value={form.firstName} onChange={set("firstName")} placeholder="Aryan" />
                    <InputField label="Last Name" value={form.lastName} onChange={set("lastName")} placeholder="Sharma" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Email" value={form.email} onChange={set("email")} type="email" placeholder="aryan@example.com" />
                    <InputField label="Phone" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                  </div>
                  <InputField label="Address Line 1" value={form.address1} onChange={set("address1")} placeholder="House No., Street" />
                  <InputField label="Address Line 2 (Optional)" value={form.address2} onChange={set("address2")} placeholder="Landmark, Area" />
                  <div className="grid grid-cols-3 gap-4">
                    <InputField label="City" value={form.city} onChange={set("city")} placeholder="Mumbai" />
                    <InputField label="State" value={form.state} onChange={set("state")} placeholder="Maharashtra" />
                    <InputField label="Pincode" value={form.pincode} onChange={set("pincode")} placeholder="400001" />
                  </div>
                  <GoldCTA onClick={() => setStep(2)} label="Continue to Payment →" />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-6 space-y-5"
                  style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                >
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {PAYMENT_OPTIONS.map(({ id, label, icon: Icon, desc }) => (
                      <button
                        key={id}
                        onClick={() => set("paymentMethod")(id)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left"
                        style={{
                          background: form.paymentMethod === id ? "rgba(201,169,110,0.06)" : "#0D0D16",
                          border: `1px solid ${form.paymentMethod === id ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.05)"}`,
                          boxShadow: form.paymentMethod === id
                            ? `0 0 16px rgba(201,169,110,0.15), ${NEURO_SHADOW}`
                            : NEURO_SHADOW,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: form.paymentMethod === id ? `rgba(201,169,110,0.15)` : "rgba(255,255,255,0.04)",
                            color: form.paymentMethod === id ? GOLD : "#52525b",
                          }}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "#F8F8FC" }}>{label}</p>
                          <p className="text-xs" style={{ color: "#A1A1AA" }}>{desc}</p>
                        </div>
                        <div className="ml-auto">
                          <div
                            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                            style={{ borderColor: form.paymentMethod === id ? GOLD : "#52525b" }}
                          >
                            {form.paymentMethod === id && (
                              <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Card fields */}
                  <AnimatePresence>
                    {form.paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <InputField label="Card Number" value={form.cardNumber} onChange={set("cardNumber")} placeholder="1234 5678 9012 3456" />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM / YY" />
                          <InputField label="CVV" value={form.cvv} onChange={set("cvv")} placeholder="123" type="password" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      ← Back
                    </button>
                    <div className="flex-[2]">
                      <GoldCTA onClick={() => setStep(3)} label="Review Order →" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-6 space-y-6"
                  style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                >
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                    Review Order
                  </h2>

                  {/* Address summary */}
                  <div className="p-4 rounded-xl space-y-1" style={{ background: "#0D0D16", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Shipping To</p>
                    <p className="text-sm" style={{ color: "#F8F8FC" }}>
                      {form.firstName || "Aryan"} {form.lastName || "Sharma"}
                    </p>
                    <p className="text-sm" style={{ color: "#A1A1AA" }}>
                      {form.address1 || "123, Sample Street"}{form.address2 ? `, ${form.address2}` : ""}
                    </p>
                    <p className="text-sm" style={{ color: "#A1A1AA" }}>
                      {form.city || "Mumbai"}, {form.state || "Maharashtra"} – {form.pincode || "400001"}
                    </p>
                    <p className="text-sm" style={{ color: "#A1A1AA" }}>{form.email || "aryan@example.com"}</p>
                  </div>

                  {/* Payment summary */}
                  <div className="p-4 rounded-xl" style={{ background: "#0D0D16", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Payment Method</p>
                    <p className="text-sm capitalize" style={{ color: "#F8F8FC" }}>
                      {PAYMENT_OPTIONS.find((p) => p.id === form.paymentMethod)?.label}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="p-4 rounded-xl space-y-3" style={{ background: "#0D0D16", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Items ({cart.length})</p>
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <span className="text-2xl">{item.product.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: "#F8F8FC" }}>{item.product.name}</p>
                          <p className="text-xs" style={{ color: "#A1A1AA" }}>Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold shrink-0" style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}>
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      ← Back
                    </button>
                    <div className="flex-[2]">
                      <GoldCTA onClick={handlePlaceOrder} label="Confirm & Place Order ✓" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Summary ─────────────────────────── */}
          <div className="lg:w-[40%] shrink-0">
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ background: "#0D0D16", boxShadow: NEURO_SHADOW, position: "sticky", top: 120 }}
            >
              <h3 className="text-base font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                Your Order
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                    >
                      {item.product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "#F8F8FC" }}>{item.product.name}</p>
                      <p className="text-xs" style={{ color: "#A1A1AA" }}>Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0" style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}>
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#A1A1AA" }}>Subtotal</span>
                  <span style={{ color: "#F8F8FC" }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#A1A1AA" }}>Shipping</span>
                  <span style={{ color: "#22C55E" }}>Free</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#A1A1AA" }}>Tax (18% GST)</span>
                  <span style={{ color: "#F8F8FC" }}>₹{tax.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: "#F8F8FC" }}>Total</span>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}
                >
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Lock size={11} style={{ color: "#52525b" }} />
                <span className="text-xs" style={{ color: "#52525b" }}>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoldCTA({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full py-4 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${GOLD}, #D4B87A, ${GOLD})`,
        color: "#0A0A0F",
        boxShadow: "0 4px 22px rgba(201,169,110,0.45)",
        animation: "ctaGlow 3s ease infinite",
      }}
    >
      <span className="relative z-10">{label}</span>
      <span
        className="absolute inset-y-0 w-12 skew-x-[-20deg]"
        style={{ background: "rgba(255,255,255,0.18)", animation: "glare 3s ease infinite" }}
      />
    </motion.button>
  );
}
