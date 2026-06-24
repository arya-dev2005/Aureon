import { motion } from "motion/react";
import { DollarSign, ShoppingBag, Receipt, AlertTriangle } from "lucide-react";

export function VendorDashboard() {
  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Vendor <span className="font-bold text-white">Dashboard</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light mt-1">Review catalog metrics, active transactions, and logistics pipelines.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <DollarSign className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Revenue This Month</div>
          <div className="text-2xl font-bold text-white">₹4,82,500</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Total Orders</div>
          <div className="text-2xl font-bold text-white">124 Items</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <Receipt className="w-5 h-5 text-[#C9A96E]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Commission Accrued</div>
          <div className="text-2xl font-bold text-white">10% (₹48,250)</div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-6 space-y-2" style={{ background: "#12121A" }}>
          <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Restock Alerts</div>
          <div className="text-2xl font-bold text-[#F59E0B]">2 Products</div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A" }}>
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

        {/* Right Column: Inventory Alerts */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.04] p-6 space-y-5" style={{ background: "#12121A" }}>
          <h2 className="text-sm font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Low Stock Alerts
          </h2>

          <div className="space-y-4 text-xs">
            {[
              { name: "Gold Chrono watch", sku: "W-CH-GL-01", stock: "Only 1 Left" },
              { name: "Premium Eyewear", sku: "E-PR-BK-02", stock: "Only 2 Left" }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-red-500/10 bg-red-500/[0.02] flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-white">{item.name}</h4>
                  <p className="text-[10px] text-[#71717A] mt-0.5">SKU: {item.sku}</p>
                </div>
                <span className="text-[#EF4444] font-bold text-[10px]">{item.stock}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
