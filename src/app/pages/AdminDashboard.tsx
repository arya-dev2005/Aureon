import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  DollarSign, ShoppingBag, TrendingUp, Users, ShieldAlert,
  Lock, Settings, LogOut, Check, X, Shield, Activity
} from "lucide-react";

const GOLD = "#C9A96E";
const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";
const INPUT_STYLE = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(201,169,110,0.15)",
  color: "#F8F8FC",
  boxShadow: "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624",
};

interface Merchant {
  id: string;
  name: string;
  email: string;
  category: string;
  status: "Pending" | "Approved" | "Rejected";
}

export function AdminDashboard() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Portal Management State
  const [activeTab, setActiveTab] = useState<"Overview" | "Approvals" | "Settings">("Overview");
  const [merchants, setMerchants] = useState<Merchant[]>([
    { id: "V-101", name: "Aura Chronos", email: "onboarding@aurachronos.com", category: "Watches", status: "Pending" },
    { id: "V-102", name: "Velvet & Co.", email: "info@velvetandco.in", category: "Bags", status: "Pending" },
    { id: "V-103", name: "Apex Gemstones", email: "gems@apex.co", category: "Jewellery", status: "Approved" },
  ]);

  const [logs, setLogs] = useState([
    { text: "New Order #ORD-2026-005001 received", type: "order", time: "2 mins ago" },
    { text: "Vendor 'Aura Chronos' updated item stock", type: "catalog", time: "15 mins ago" },
    { text: "Customer 'Aryan M.' upgraded to Gold Tier", type: "vip", time: "1 hour ago" }
  ]);

  const [systemConfigs, setSystemConfigs] = useState({
    maintenance: false,
    vipBonus: true,
    strictVerification: true,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@aureon.com" && password === "admin123") {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid Administrator coordinates. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_auth");
  };

  const handleApproveMerchant = (id: string, action: "Approved" | "Rejected") => {
    setMerchants(prev => 
      prev.map(m => m.id === id ? { ...m, status: action } : m)
    );
    // Add log
    const target = merchants.find(m => m.id === id);
    if (target) {
      setLogs(l => [
        { text: `Merchant '${target.name}' registry application ${action.toLowerCase()}`, type: "system", time: "Just now" },
        ...l
      ]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: "#0A0A0F" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl border border-white/[0.04] space-y-6 relative"
          style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
        >
          {/* Admin crest */}
          <div className="text-center space-y-3">
            <div 
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
              style={{
                background: "rgba(201,169,110,0.06)",
                border: `1px solid ${GOLD}`,
                boxShadow: "0 0 20px rgba(201,169,110,0.12)"
              }}
            >
              <Shield className="w-7 h-7 text-[#C9A96E]" />
            </div>
            <h1 className="text-2xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Admin <span className="font-bold text-white">Console</span>
            </h1>
            <p className="text-[#A1A1AA] text-xs font-light">Enter credentials to establish administrative session.</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium text-center flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Admin Username</label>
              <input 
                required 
                type="email" 
                placeholder="admin@aureon.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" 
                style={INPUT_STYLE}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Security Password</label>
              <input 
                required 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" 
                style={INPUT_STYLE}
              />
            </div>

            <button 
              type="submit"
              className="w-full h-[50px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] mt-4 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              style={{ 
                background: `linear-gradient(135deg, ${GOLD} 0%, #D4B87A 50%, ${GOLD} 100%)`,
                boxShadow: "0 4px 15px rgba(201,169,110,0.2)"
              }}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authenticate Session</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[9px] text-[#71717A] tracking-wider uppercase">Credentials: admin@aureon.com / admin123</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const pendingCount = merchants.filter(m => m.status === "Pending").length;

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admin <span className="font-bold text-white">Console</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs font-light mt-1">Platform overview, logistics audits, settings, and partner onboarding.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-white">
            Secure Admin Session
          </span>
          <button 
            onClick={handleLogout}
            className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2.5 mb-8 flex-wrap">
        {[
          { id: "Overview" as const, label: "Overview", icon: Activity },
          { id: "Approvals" as const, label: `Merchant Approvals (${pendingCount})`, icon: Users },
          { id: "Settings" as const, label: "System Configs", icon: Settings },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border"
            style={{
              background: activeTab === t.id ? "rgba(201,169,110,0.08)" : "#12121A",
              color: activeTab === t.id ? GOLD : "#A1A1AA",
              borderColor: activeTab === t.id ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.05)",
              boxShadow: NEURO_SHADOW
            }}
          >
            <t.icon className="w-4 h-4" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Renderers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Overview" && (
            <div className="space-y-12 animate-fade-in">
              {/* KPI stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <DollarSign className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Revenue</div>
                  <div className="text-2xl font-bold text-white">₹24,99,999</div>
                  <div className="text-[10px] text-[#22C55E] font-medium">+12% vs last period</div>
                </div>

                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Orders</div>
                  <div className="text-2xl font-bold text-white">1,240</div>
                  <div className="text-[10px] text-[#22C55E] font-medium">+5% vs last period</div>
                </div>

                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <TrendingUp className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Conversion Rate</div>
                  <div className="text-2xl font-bold text-white">3.2%</div>
                  <div className="text-[10px] text-[#22C55E] font-medium">+0.4% vs last period</div>
                </div>

                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <Users className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Active Vendors</div>
                  <div className="text-2xl font-bold text-white">{merchants.filter(m => m.status === "Approved").length + 43} Stores</div>
                  <div className="text-[10px] text-[#C9A96E] font-medium">{pendingCount} pending applications</div>
                </div>
              </div>

              {/* Log Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <h2 className="text-base font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Platform Log Stream
                  </h2>

                  <div className="space-y-4 text-xs font-light">
                    {logs.map((log, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                        <span className="font-medium text-white">{log.text}</span>
                        <span className="text-[10px] text-[#71717A] font-mono whitespace-nowrap shrink-0 ml-3">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <h2 className="text-sm font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Actions Queue
                  </h2>

                  <div className="space-y-4 text-xs font-light">
                    {pendingCount > 0 ? (
                      <div className="flex justify-between items-center p-3 rounded-xl border border-[#C9A96E]/20 bg-[#C9A96E]/[0.02]">
                        <span className="text-white font-medium">{pendingCount} Pending Vendor Application{pendingCount > 1 ? "s" : ""}</span>
                        <button onClick={() => setActiveTab("Approvals")} className="text-[10px] font-bold text-[#C9A96E] hover:underline uppercase">Review</button>
                      </div>
                    ) : (
                      <div className="p-3 text-center text-[#71717A] text-xs">No pending applications</div>
                    )}
                    <div className="flex justify-between items-center p-3 rounded-xl border border-red-500/20 bg-red-500/[0.02]">
                      <span className="text-white font-medium">1 Audit Alert Flags</span>
                      <span className="text-[10px] font-bold text-red-400 uppercase">Investigate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Approvals" && (
            <div className="rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
              <div className="border-b border-white/[0.04] pb-4">
                <h2 className="text-lg font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Merchant Approvals Registry
                </h2>
                <p className="text-[#A1A1AA] text-xs mt-0.5">Review tax profile registry records and decide merchant access credentials.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-[#71717A] uppercase font-bold tracking-wider">
                      <th className="py-3 px-4">Vendor ID</th>
                      <th className="py-3 px-4">Store Name</th>
                      <th className="py-3 px-4">Contact Email</th>
                      <th className="py-3 px-4">Vertical</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchants.map((m) => (
                      <tr key={m.id} className="border-b border-white/[0.03] hover:bg-white/[0.01]">
                        <td className="py-3.5 px-4 font-mono font-medium text-[#C9A96E]">{m.id}</td>
                        <td className="py-3.5 px-4 font-semibold text-white">{m.name}</td>
                        <td className="py-3.5 px-4 text-[#A1A1AA]">{m.email}</td>
                        <td className="py-3.5 px-4">{m.category}</td>
                        <td className="py-3.5 px-4">
                          <span 
                            className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                            style={{
                              background: m.status === "Approved" ? "rgba(34,197,94,0.12)" : m.status === "Pending" ? "rgba(234,179,8,0.12)" : "rgba(239,68,68,0.12)",
                              color: m.status === "Approved" ? "#22C55E" : m.status === "Pending" ? "#EAB308" : "#EF4444"
                            }}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {m.status === "Pending" ? (
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleApproveMerchant(m.id, "Approved")}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-green-400 bg-green-500/5 hover:bg-green-500/10 border border-green-500/20"
                                title="Approve"
                              >
                                <Check className="w-4.5 h-4.5" />
                              </button>
                              <button 
                                onClick={() => handleApproveMerchant(m.id, "Rejected")}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20"
                                title="Reject"
                              >
                                <X className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[#52525b] text-[10px] font-medium">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
              <div className="border-b border-white/[0.04] pb-4">
                <h2 className="text-lg font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Platform Configuration Console
                </h2>
                <p className="text-[#A1A1AA] text-xs mt-0.5">Toggle global system rules and control authentication criteria.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "maintenance" as const,
                    label: "Global Maintenance Mode",
                    desc: "Suspend public front-end checkout and show a maintenance page.",
                  },
                  {
                    key: "vipBonus" as const,
                    label: "2x VIP Loyalty Multiplier",
                    desc: "Reward double loyalty points on select collections.",
                  },
                  {
                    key: "strictVerification" as const,
                    label: "Secure Multi-step Merchant Audit",
                    desc: "Enforce strict GSTIN registration audits for new merchants.",
                  },
                ].map(item => (
                  <div 
                    key={item.key}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] transition-all"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-white">{item.label}</h4>
                      <p className="text-xs text-[#A1A1AA] mt-0.5">{item.desc}</p>
                    </div>

                    <button 
                      onClick={() => setSystemConfigs(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="relative w-12 h-6 rounded-full transition-all duration-200"
                      style={{
                        background: systemConfigs[item.key] ? GOLD : "#0A0A0F",
                        border: "1px solid rgba(255,255,255,0.08)"
                      }}
                    >
                      <motion.span 
                        animate={{ x: systemConfigs[item.key] ? 26 : 4 }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className="absolute top-0.5 w-4.5 h-4.5 rounded-full block"
                        style={{ background: systemConfigs[item.key] ? "#0A0A0F" : "#A1A1AA" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
