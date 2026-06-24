import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  DollarSign, ShoppingBag, Receipt, AlertTriangle, 
  Lock, LogOut, Check, Store, Package, CreditCard, Plus, Eye, X
} from "lucide-react";

const GOLD = "#C9A96E";
const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";
const INPUT_STYLE = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(201,169,110,0.15)",
  color: "#F8F8FC",
  boxShadow: "inset 2px 2px 6px #060609, inset -2px -2px 4px #161624",
};

interface CatalogItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export function VendorDashboard() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("vendor_auth") === "true";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Portal Management State
  const [activeTab, setActiveTab] = useState<"Sales" | "Catalog" | "Payouts">("Sales");
  const [catalog, setCatalog] = useState<CatalogItem[]>([
    { id: "P-01", name: "Gold Chrono Elite Watch", sku: "W-CH-GL-01", price: 185000, stock: 1 },
    { id: "P-02", name: "Structured Calfskin Eyewear", sku: "E-PR-BK-02", price: 22000, stock: 2 },
    { id: "P-03", name: "Diamond Drop Earrings", sku: "J-ER-DM-05", price: 125000, stock: 8 },
  ]);

  // Catalog Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSku, setNewSku] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");

  // Payout states
  const [payouts, setPayouts] = useState([
    { id: "PAY-901", date: "10 Jun 2026", amount: 350000, status: "Transferred" },
    { id: "PAY-902", date: "24 Jun 2026", amount: 132500, status: "Processing" },
  ]);
  const [requestedPayout, setRequestedPayout] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "vendor@aureon.com" && password === "vendor123") {
      setIsLoggedIn(true);
      sessionStorage.setItem("vendor_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid Vendor coordinates. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("vendor_auth");
  };

  const handleUpdateStock = (id: string, amount: number) => {
    setCatalog(prev => 
      prev.map(item => {
        if (item.id === id) {
          const nextStock = Math.max(0, item.stock + amount);
          return { ...item, stock: nextStock };
        }
        return item;
      })
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSku || !newPrice || !newStock) return;
    const newItem: CatalogItem = {
      id: `P-0${catalog.length + 1}`,
      name: newName,
      sku: newSku,
      price: Number(newName) || Number(newPrice),
      stock: Number(newStock),
    };
    setCatalog(prev => [...prev, newItem]);
    setShowAddModal(false);
    setNewName("");
    setNewSku("");
    setNewPrice("");
    setNewStock("");
  };

  const handleRequestPayout = () => {
    if (requestedPayout) return;
    setRequestedPayout(true);
    setPayouts(prev => [
      { id: `PAY-${Date.now().toString().slice(-3)}`, date: "Today", amount: 482500, status: "Submitted" },
      ...prev
    ]);
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
          {/* Vendor crest */}
          <div className="text-center space-y-3">
            <div 
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
              style={{
                background: "rgba(201,169,110,0.06)",
                border: `1px solid ${GOLD}`,
                boxShadow: "0 0 20px rgba(201,169,110,0.12)"
              }}
            >
              <Store className="w-7 h-7 text-[#C9A96E]" />
            </div>
            <h1 className="text-2xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Vendor <span className="font-bold text-white">Portal</span>
            </h1>
            <p className="text-[#A1A1AA] text-xs font-light">Sign in to manage your luxury brand catalog & payouts.</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Registered Email</label>
              <input 
                required 
                type="email" 
                placeholder="vendor@aureon.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" 
                style={INPUT_STYLE}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Partner Password</label>
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
              <span>Login to Storefront</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[9px] text-[#71717A] tracking-wider uppercase">Credentials: vendor@aureon.com / vendor123</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const revenue = catalog.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const lowStockCount = catalog.filter(c => c.stock <= 2).length;

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Vendor <span className="font-bold text-white">Dashboard</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs font-light mt-1">Review active collections, stock, orders, and request payouts.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-white">
            Aura Luxury Merchant
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
          { id: "Sales" as const, label: "Sales & Orders", icon: DollarSign },
          { id: "Catalog" as const, label: `Catalog Directory (${catalog.length})`, icon: Package },
          { id: "Payouts" as const, label: "Remittances & Payouts", icon: CreditCard },
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
          {activeTab === "Sales" && (
            <div className="space-y-12">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <DollarSign className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Revenue Catalog Value</div>
                  <div className="text-2xl font-bold text-white">₹{revenue.toLocaleString()}</div>
                </div>

                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Orders</div>
                  <div className="text-2xl font-bold text-white">124 Items</div>
                </div>

                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <Receipt className="w-5 h-5 text-[#C9A96E]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Commission (10%)</div>
                  <div className="text-2xl font-bold text-white">₹{(revenue * 0.1).toLocaleString()}</div>
                </div>

                <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Restock Alerts</div>
                  <div className="text-2xl font-bold text-[#F59E0B]">{lowStockCount} Products</div>
                </div>
              </div>

              {/* Main content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <h2 className="text-base font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Recent Orders
                  </h2>

                  <div className="space-y-4 text-xs font-light">
                    {[
                      { id: "ORD-2026-005001", customer: "Priya Sharma", items: "1x Chronos Gold Watch", total: "₹1,85,000", status: "Processing" },
                      { id: "ORD-2026-004291", customer: "Arjun Mehta", items: "1x Luxury Leather Bag", total: "₹95,000", status: "Dispatched" }
                    ].map((order, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                        <div>
                          <div className="font-semibold text-white">{order.id}</div>
                          <div className="text-[#A1A1AA] mt-0.5">{order.customer} • {order.items}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">{order.total}</div>
                          <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-[#C9A96E] mt-0.5">{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
                  <h2 className="text-sm font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Low Stock Alerts
                  </h2>

                  <div className="space-y-4 text-xs">
                    {catalog.filter(c => c.stock <= 2).map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-red-500/10 bg-red-500/[0.02] flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-white">{item.name}</h4>
                          <p className="text-[10px] text-[#71717A] mt-0.5">SKU: {item.sku}</p>
                        </div>
                        <span className="text-[#EF4444] font-bold text-[10px]">Only {item.stock} Left</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Catalog" && (
            <div className="rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Active Product Catalog
                  </h2>
                  <p className="text-[#A1A1AA] text-xs mt-0.5">Update prices, replenish units in stock, or launch new entries.</p>
                </div>

                <button 
                  onClick={() => setShowAddModal(true)}
                  className="h-10 px-5 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] flex items-center gap-1.5 transition-all"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, #D4B87A)` }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-[#71717A] uppercase font-bold tracking-wider">
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">List Price</th>
                      <th className="py-3 px-4">Units Stock</th>
                      <th className="py-3 px-4 text-right">Adjustment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalog.map((item) => (
                      <tr key={item.id} className="border-b border-white/[0.03] hover:bg-white/[0.01]">
                        <td className="py-3.5 px-4 font-mono text-[#C9A96E]">{item.sku}</td>
                        <td className="py-3.5 px-4 font-semibold text-white">{item.name}</td>
                        <td className="py-3.5 px-4 font-mono font-medium text-white">₹{item.price.toLocaleString()}</td>
                        <td className="py-3.5 px-4">
                          <span 
                            className={`font-semibold ${item.stock <= 2 ? "text-[#EF4444]" : "text-zinc-300"}`}
                          >
                            {item.stock} unit{item.stock !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button 
                              onClick={() => handleUpdateStock(item.id, -1)}
                              className="w-7 h-7 rounded bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white flex items-center justify-center font-bold text-xs"
                              title="Decrease Stock"
                            >
                              -
                            </button>
                            <button 
                              onClick={() => handleUpdateStock(item.id, 1)}
                              className="w-7 h-7 rounded bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white flex items-center justify-center font-bold text-xs"
                              title="Increase Stock"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Payouts" && (
            <div className="rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}>
              <div className="flex justify-between items-center border-b border-white/[0.04] pb-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Payouts & Remittances
                  </h2>
                  <p className="text-[#A1A1AA] text-xs mt-0.5">Submit request commands for active platform outstanding balances.</p>
                </div>

                <button 
                  disabled={requestedPayout}
                  onClick={handleRequestPayout}
                  className="h-10 px-5 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] flex items-center gap-1.5 transition-all disabled:opacity-50"
                  style={{ background: requestedPayout ? "#52525B" : `linear-gradient(135deg, ${GOLD}, #D4B87A)` }}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{requestedPayout ? "Request Submitted" : "Request Payout"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] space-y-1">
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Remitted to Date</div>
                  <div className="text-2xl font-bold text-white">₹4,82,500</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#C9A96E]/[0.02] border border-[#C9A96E]/20 space-y-1">
                  <div className="text-[10px] text-[#C9A96E] uppercase tracking-wider font-semibold">Outstanding Balance</div>
                  <div className="text-2xl font-bold text-[#C9A96E]">₹{requestedPayout ? "0" : "4,82,500"}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Payout Logs</h3>
                <div className="space-y-3">
                  {payouts.map(pay => (
                    <div key={pay.id} className="flex justify-between items-center p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] text-xs font-light">
                      <div>
                        <div className="font-semibold text-white">{pay.id}</div>
                        <div className="text-[#A1A1AA] mt-0.5">{pay.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹{pay.amount.toLocaleString()}</div>
                        <span 
                          className="inline-block text-[8px] font-bold uppercase tracking-wider mt-0.5"
                          style={{
                            color: pay.status === "Transferred" ? "#22C55E" : pay.status === "Processing" ? "#EAB308" : GOLD
                          }}
                        >
                          {pay.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Catalog Entry Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-[450px] rounded-3xl border border-white/[0.06] p-8 space-y-6 relative"
              style={{ background: "#12121A" }}
            >
              <button 
                onClick={() => setShowAddModal(false)} 
                className="absolute right-6 top-6 text-[#71717A] hover:text-[#F8F8FC]"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Add Catalog Product
              </h2>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Product Name</label>
                  <input required type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Product Name" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" style={INPUT_STYLE} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">SKU Identifier</label>
                  <input required type="text" value={newSku} onChange={(e) => setNewSku(e.target.value)} placeholder="e.g. W-EL-GL-03" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" style={INPUT_STYLE} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Price (INR)</label>
                    <input required type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="₹ Price" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" style={INPUT_STYLE} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Initial Stock</label>
                    <input required type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)} placeholder="Units" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" style={INPUT_STYLE} />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] mt-4"
                  style={{ 
                    background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)"
                  }}
                >
                  Create Entry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
