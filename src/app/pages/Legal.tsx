import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Eye, Lock, FileText, ChevronRight } from "lucide-react";

type Tab = "privacy" | "terms" | "cookies";

export function Legal() {
  const [activeTab, setActiveTab] = useState<Tab>("privacy");

  // Cookie Settings state
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // locked
    analytics: true,
    marketing: false,
    preferences: true
  });
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-5xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Title */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">Governance & Privacy</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Legal & <span className="font-bold text-white">Policies</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Left Side: Navigation Links */}
        <div className="md:col-span-1 space-y-2">
          {[
            { id: "privacy", label: "Privacy Policy", icon: Eye },
            { id: "terms", label: "Terms of Service", icon: FileText },
            { id: "cookies", label: "Cookie Policy", icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-all border"
                style={{
                  background: active ? "rgba(201,169,110,0.06)" : "transparent",
                  borderColor: active ? "#C9A96E" : "rgba(255,255,255,0.04)",
                  color: active ? "#C9A96E" : "#A1A1AA"
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4.5 h-4.5" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Right Side: Document Content */}
        <div className="md:col-span-3 rounded-2xl border border-white/[0.04] p-8 md:p-10 font-light text-[#A1A1AA] text-sm leading-relaxed space-y-6" style={{ background: "#12121A" }}>
          <AnimatePresence mode="wait">
            {activeTab === "privacy" && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-lg border-b border-white/[0.04] pb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Privacy Policy</h2>
                </div>
                <p><strong>Effective Date:</strong> June 24, 2026</p>
                <p>
                  Aureon values your privacy. We collect, store, and process your personal details to provide custom luxury concierge experiences, secure checkout payments, and tracking metrics.
                </p>
                <h3 className="text-white font-semibold mt-6 mb-2">1. Personal Information Collection</h3>
                <p>
                  We collect your full name, shipping coordinates, billing details, verified email addresses, phone contacts, and browsing logs.
                </p>
                <h3 className="text-white font-semibold mt-6 mb-2">2. Data Security</h3>
                <p>
                  All transactional records are SSL encrypted and processed via PCI-DSS-compliant gateways. We do not store credit card credentials locally.
                </p>
              </motion.div>
            )}

            {activeTab === "terms" && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-lg border-b border-white/[0.04] pb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Terms of Service</h2>
                </div>
                <p><strong>Effective Date:</strong> June 24, 2026</p>
                <p>
                  By creating an account, placing an order, or accessing the Aureon storefront, you agree to these Terms.
                </p>
                <h3 className="text-white font-semibold mt-6 mb-2">1. Product Pricing & Availability</h3>
                <p>
                  Our prices reflect real-time curation. We reserve the right to cancel orders arising from catalog pricing mismatches or supplier availability constraints.
                </p>
                <h3 className="text-white font-semibold mt-6 mb-2">2. VIP Memberships</h3>
                <p>
                  Membership fees are billed annually. We reserve the right to rescind invitations or close accounts for policies infringement.
                </p>
              </motion.div>
            )}

            {activeTab === "cookies" && (
              <motion.div
                key="cookies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-lg border-b border-white/[0.04] pb-4">
                  <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Cookie Policy</h2>
                </div>
                <p>
                  We utilize cookies to speed up secure logging sessions, cache products, and evaluate site engagement trends.
                </p>
                
                <div className="p-6 rounded-xl border border-[#C9A96E]/20 bg-white/[0.02] space-y-4">
                  <h3 className="text-white font-semibold text-base mb-2">Manage Preferences</h3>
                  <p className="text-xs text-[#A1A1AA] leading-normal">
                    Turn cookie categories on or off below. Essential cookies cannot be disabled.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">Essential (Always Active)</span>
                      <input type="checkbox" disabled checked className="accent-[#C9A96E] cursor-not-allowed" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">Analytics & Tracking</span>
                      <input 
                        type="checkbox" 
                        checked={cookieSettings.analytics} 
                        onChange={(e) => setCookieSettings(prev => ({ ...prev, analytics: e.target.checked }))} 
                        className="accent-[#C9A96E] cursor-pointer" 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">Marketing & Personalization</span>
                      <input 
                        type="checkbox" 
                        checked={cookieSettings.marketing} 
                        onChange={(e) => setCookieSettings(prev => ({ ...prev, marketing: e.target.checked }))} 
                        className="accent-[#C9A96E] cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
