import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown, Edit3, MapPin, Shield, Bell, Trash2, Plus, Monitor, Smartphone } from "lucide-react";

const GOLD = "#C9A96E";
const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";

const MOCK_USER = {
  name: "Aryan Sharma",
  email: "aryan@premium.store",
  phone: "+91 98765 43210",
  avatar: "AS",
  memberSince: "March 2023",
  tier: "Gold Member",
};

const TABS = ["Profile", "Addresses", "Security", "Preferences"] as const;
type Tab = typeof TABS[number];

const INPUT_STYLE = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(201,169,110,0.15)",
  color: "#F8F8FC",
  boxShadow: "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624",
};

function FieldInput({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "#A1A1AA" }}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={INPUT_STYLE}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(201,169,110,0.55)";
          e.currentTarget.style.boxShadow = "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624, 0 0 0 3px rgba(201,169,110,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)";
          e.currentTarget.style.boxShadow = "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624";
        }}
      />
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
      style={{
        background: on ? `linear-gradient(135deg, ${GOLD}, #D4B87A)` : "#12121A",
        border: `1px solid ${on ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: on ? `0 0 12px rgba(201,169,110,0.3)` : NEURO_SHADOW,
      }}
    >
      <motion.div
        animate={{ x: on ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-0.5 w-4 h-4 rounded-full"
        style={{ background: on ? "#0A0A0F" : "#52525b" }}
      />
    </button>
  );
}

export function Account() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [prefs, setPrefs] = useState({ emailNotif: true, smsAlerts: false, offers: true, newArrivals: true });

  const togglePref = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="min-h-screen px-4 lg:px-14 py-10" style={{ background: "#0A0A0F" }}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Header Card */}
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
        >
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #D4B87A)`,
              color: "#0A0A0F",
              boxShadow: `0 0 24px rgba(201,169,110,0.3), ${NEURO_SHADOW}`,
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {MOCK_USER.avatar}
          </div>
          <div className="flex-1 space-y-1.5">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
              {MOCK_USER.name}
            </h2>
            <p className="text-sm" style={{ color: "#A1A1AA" }}>{MOCK_USER.email}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(201,169,110,0.12)", color: GOLD, border: "1px solid rgba(201,169,110,0.25)" }}
              >
                <Crown size={10} />
                {MOCK_USER.tier}
              </span>
              <span className="text-xs" style={{ color: "#52525b" }}>Member since {MOCK_USER.memberSince}</span>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0"
            style={{
              background: "rgba(201,169,110,0.06)",
              color: GOLD,
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: NEURO_SHADOW,
            }}
          >
            <Edit3 size={12} />
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeTab === tab ? "rgba(201,169,110,0.08)" : "#12121A",
                color: activeTab === tab ? GOLD : "#A1A1AA",
                border: `1px solid ${activeTab === tab ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.05)"}`,
                boxShadow: NEURO_SHADOW,
              }}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                  style={{ background: GOLD }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "Profile" && (
              <div
                className="rounded-2xl p-6 space-y-5"
                style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
              >
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput label="Full Name" defaultValue={MOCK_USER.name} />
                  <FieldInput label="Email" defaultValue={MOCK_USER.email} type="email" />
                  <FieldInput label="Phone" defaultValue={MOCK_USER.phone} />
                  <FieldInput label="Date of Birth" defaultValue="01/01/1995" type="date" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: "#A1A1AA" }}>Gender</label>
                  <div className="flex gap-3">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        className="px-5 py-2 rounded-xl text-sm transition-all"
                        style={{
                          background: g === "Male" ? "rgba(201,169,110,0.1)" : "#0D0D16",
                          color: g === "Male" ? GOLD : "#A1A1AA",
                          border: `1px solid ${g === "Male" ? "rgba(201,169,110,0.35)" : "rgba(255,255,255,0.06)"}`,
                          boxShadow: NEURO_SHADOW,
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-xl font-bold text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #D4B87A)`,
                    color: "#0A0A0F",
                    boxShadow: "0 4px 18px rgba(201,169,110,0.35)",
                  }}
                >
                  Save Changes
                </motion.button>
              </div>
            )}

            {activeTab === "Addresses" && (
              <div className="space-y-4">
                {[
                  { type: "Home", icon: "🏠", line1: "42, Sunflower Society, Andheri West", line2: "Mumbai, Maharashtra – 400053", phone: "+91 98765 43210" },
                  { type: "Office", icon: "🏢", line1: "Tech Park, Building B, Floor 5, BKC", line2: "Mumbai, Maharashtra – 400051", phone: "+91 98765 43210" },
                ].map((addr) => (
                  <div
                    key={addr.type}
                    className="rounded-2xl p-5 flex items-start gap-4"
                    style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "#0D0D16", boxShadow: NEURO_SHADOW }}
                    >
                      {addr.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold" style={{ color: "#F8F8FC" }}>{addr.type}</p>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: "rgba(201,169,110,0.1)", color: GOLD }}>
                          {addr.type === "Home" ? "Default" : "Work"}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#A1A1AA" }}>{addr.line1}</p>
                      <p className="text-xs" style={{ color: "#A1A1AA" }}>{addr.line2}</p>
                      <p className="text-xs mt-1" style={{ color: "#52525b" }}>{addr.phone}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{ background: "rgba(201,169,110,0.06)", color: GOLD, border: "1px solid rgba(201,169,110,0.2)" }}
                      >
                        <Edit3 size={10} /> Edit
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{ background: "rgba(239,68,68,0.06)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}
                      >
                        <Trash2 size={10} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold w-full justify-center transition-all"
                  style={{
                    background: "rgba(201,169,110,0.04)",
                    color: GOLD,
                    border: `1px dashed rgba(201,169,110,0.3)`,
                    boxShadow: NEURO_SHADOW,
                  }}
                >
                  <Plus size={14} />
                  Add New Address
                </button>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="space-y-5">
                {/* Change Password */}
                <div className="rounded-2xl p-6 space-y-4" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <h3 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                    Change Password
                  </h3>
                  <FieldInput label="Current Password" type="password" />
                  <FieldInput label="New Password" type="password" />
                  <FieldInput label="Confirm New Password" type="password" />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-xl font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, #D4B87A)`, color: "#0A0A0F", boxShadow: "0 4px 18px rgba(201,169,110,0.35)" }}
                  >
                    Update Password
                  </motion.button>
                </div>

                {/* 2FA */}
                <div
                  className="rounded-2xl p-5 flex items-center gap-4"
                  style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}
                  >
                    <Shield size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#F8F8FC" }}>Two-Factor Authentication</p>
                    <p className="text-xs" style={{ color: "#A1A1AA" }}>Add an extra layer of security to your account</p>
                  </div>
                  <Toggle on={true} onToggle={() => {}} />
                </div>

                {/* Active Sessions */}
                <div className="rounded-2xl p-6 space-y-4" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <h3 className="text-base font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                    Active Sessions
                  </h3>
                  {[
                    { device: "MacBook Pro", location: "Mumbai, India", icon: Monitor, current: true },
                    { device: "iPhone 15 Pro", location: "Mumbai, India", icon: Smartphone, current: false },
                  ].map(({ device, location, icon: Icon, current }) => (
                    <div key={device} className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "#0D0D16", color: "#A1A1AA", boxShadow: NEURO_SHADOW }}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: "#F8F8FC" }}>{device}</p>
                        <p className="text-xs" style={{ color: "#A1A1AA" }}>{location}</p>
                      </div>
                      {current ? (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}>
                          Current
                        </span>
                      ) : (
                        <button className="text-xs" style={{ color: "#EF4444" }}>Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Preferences" && (
              <div className="rounded-2xl p-6 space-y-4" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
                  Notification Preferences
                </h3>
                {[
                  { key: "emailNotif" as const, label: "Email Notifications", desc: "Order updates, receipts, and important alerts", icon: Bell },
                  { key: "smsAlerts" as const, label: "SMS Alerts", desc: "OTP, delivery updates via SMS", icon: Smartphone },
                  { key: "offers" as const, label: "Exclusive Offers", desc: "Flash deals and member-only discounts", icon: Crown },
                  { key: "newArrivals" as const, label: "New Arrivals", desc: "Be first to know about new collections", icon: MapPin },
                ].map(({ key, label, desc, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: "#0D0D16",
                      border: `1px solid ${prefs[key] ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.04)"}`,
                      boxShadow: NEURO_SHADOW,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: prefs[key] ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.03)",
                        color: prefs[key] ? GOLD : "#52525b",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: "#F8F8FC" }}>{label}</p>
                      <p className="text-xs" style={{ color: "#A1A1AA" }}>{desc}</p>
                    </div>
                    <Toggle on={prefs[key]} onToggle={() => togglePref(key)} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
