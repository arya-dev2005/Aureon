import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Package, Truck, CheckCircle2, XCircle, BarChart2, Star, RotateCcw, ChevronDown } from "lucide-react";

const GOLD = "#C9A96E";
const NEURO_SHADOW = "4px 4px 12px #060609, -3px -3px 9px #161624";

type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";

interface OrderItem {
  emoji: string;
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  trackingId: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "PS-20240315-0042",
    date: "15 Mar 2024",
    status: "Delivered",
    items: [
      { emoji: "⌚", name: "Carbon Fibre Chronograph Elite", qty: 1, price: 24999 },
      { emoji: "💎", name: "Gold-Plated Tennis Bracelet", qty: 1, price: 8999 },
    ],
    total: 33998,
    trackingId: "DTDC1234567890",
  },
  {
    id: 2,
    orderNumber: "PS-20240402-0081",
    date: "02 Apr 2024",
    status: "Shipped",
    items: [
      { emoji: "👜", name: "Structured Calfskin Tote", qty: 1, price: 22999 },
      { emoji: "💍", name: "Baroque Pearl Drop Earrings", qty: 2, price: 4299 },
      { emoji: "👓", name: "Titanium Aviator Frames", qty: 1, price: 7999 },
    ],
    total: 39596,
    trackingId: "BLUEDART9876543",
  },
  {
    id: 3,
    orderNumber: "PS-20240418-0109",
    date: "18 Apr 2024",
    status: "Processing",
    items: [
      { emoji: "🌙", name: "Moon Phase Diamond Bezel", qty: 1, price: 45000 },
    ],
    total: 45000,
    trackingId: "—",
  },
];

const STATUS_CONFIG: Record<OrderStatus, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Delivered: { color: "#22C55E", bg: "rgba(34,197,94,0.12)", icon: CheckCircle2 },
  Shipped: { color: "#3B82F6", bg: "rgba(59,130,246,0.12)", icon: Truck },
  Processing: { color: "#EAB308", bg: "rgba(234,179,8,0.12)", icon: Package },
  Cancelled: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", icon: XCircle },
};

const FILTER_TABS = ["All", "Active", "Delivered", "Cancelled"] as const;
type FilterTab = typeof FILTER_TABS[number];

function filterOrders(orders: Order[], tab: FilterTab): Order[] {
  if (tab === "All") return orders;
  if (tab === "Active") return orders.filter((o) => o.status === "Shipped" || o.status === "Processing");
  if (tab === "Delivered") return orders.filter((o) => o.status === "Delivered");
  if (tab === "Cancelled") return orders.filter((o) => o.status === "Cancelled");
  return orders;
}

export function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = filterOrders(MOCK_ORDERS, activeTab);

  const stats = [
    { label: "Total Orders", value: MOCK_ORDERS.length, color: GOLD, icon: BarChart2 },
    { label: "Active", value: MOCK_ORDERS.filter((o) => o.status === "Shipped" || o.status === "Processing").length, color: "#3B82F6", icon: Truck },
    { label: "Delivered", value: MOCK_ORDERS.filter((o) => o.status === "Delivered").length, color: "#22C55E", icon: CheckCircle2 },
    { label: "Returns", value: 0, color: "#EF4444", icon: RotateCcw },
  ];

  return (
    <div className="min-h-screen px-4 lg:px-14 py-10" style={{ background: "#0A0A0F" }}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#F8F8FC" }}>
            My Orders
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#A1A1AA" }}>Track, manage and review your purchases</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="p-4 rounded-2xl flex items-center gap-4"
              style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}15`, color }}
              >
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", color }}>{value}</p>
                <p className="text-xs" style={{ color: "#A1A1AA" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeTab === tab ? "rgba(201,169,110,0.08)" : "#12121A",
                color: activeTab === tab ? GOLD : "#A1A1AA",
                border: `1px solid ${activeTab === tab ? "rgba(201,169,110,0.35)" : "rgba(255,255,255,0.05)"}`,
                boxShadow: NEURO_SHADOW,
              }}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: GOLD }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Order Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <span className="text-6xl">📦</span>
                <p className="text-lg font-semibold" style={{ color: "#F8F8FC" }}>No orders found</p>
                <p className="text-sm" style={{ color: "#A1A1AA" }}>No {activeTab.toLowerCase()} orders to display</p>
              </motion.div>
            ) : (
              filtered.map((order) => {
                const { color, bg, icon: StatusIcon } = STATUS_CONFIG[order.status];
                const isExpanded = expandedId === order.id;
                const previewItems = order.items.slice(0, 2);
                const extra = order.items.length - 2;

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "#12121A", boxShadow: NEURO_SHADOW }}
                  >
                    <div className="p-5">
                      {/* Top row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: GOLD }}>
                            {order.orderNumber}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "#A1A1AA" }}>{order.date}</p>
                        </div>
                        <span
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: bg, color }}
                        >
                          <StatusIcon size={11} />
                          {order.status}
                        </span>
                      </div>

                      {/* Items preview */}
                      <div className="flex items-center gap-2 mb-4">
                        {previewItems.map((item, i) => (
                          <div
                            key={i}
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ background: "#0D0D16", boxShadow: NEURO_SHADOW }}
                          >
                            {item.emoji}
                          </div>
                        ))}
                        {extra > 0 && (
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold"
                            style={{ background: "#0D0D16", color: "#A1A1AA", boxShadow: NEURO_SHADOW }}
                          >
                            +{extra}
                          </div>
                        )}
                        <div className="ml-auto text-right">
                          <p className="text-xs" style={{ color: "#A1A1AA" }}>Total</p>
                          <p
                            className="text-xl font-bold"
                            style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}
                          >
                            ₹{order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => navigate(`/account/orders/${order.id}/track`)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: "transparent",
                            color: "#A1A1AA",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "#F8F8FC";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "#A1A1AA";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                          }}
                        >
                          Track Order
                        </button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : order.id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: "rgba(201,169,110,0.06)",
                            color: GOLD,
                            border: `1px solid rgba(201,169,110,0.25)`,
                          }}
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown size={11} />
                          </motion.span>
                        </button>
                        {order.status === "Delivered" && (
                          <>
                            <button
                              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                              style={{ background: "transparent", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                              <Star size={10} /> Write Review
                            </button>
                            <button
                              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                              style={{ background: "transparent", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}
                            >
                              <RotateCcw size={10} /> Return Item
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-5 pb-5 pt-3 space-y-3"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                          >
                            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
                              Order Items
                            </p>
                            {order.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                <span className="text-2xl">{item.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate" style={{ color: "#F8F8FC" }}>{item.name}</p>
                                  <p className="text-xs" style={{ color: "#A1A1AA" }}>Qty: {item.qty}</p>
                                </div>
                                <p
                                  className="text-sm font-semibold"
                                  style={{ fontFamily: "'Playfair Display',serif", color: GOLD }}
                                >
                                  ₹{(item.price * item.qty).toLocaleString()}
                                </p>
                              </div>
                            ))}
                            {order.trackingId !== "—" && (
                              <p className="text-xs" style={{ color: "#A1A1AA" }}>
                                Tracking ID: <span style={{ color: "#F8F8FC" }}>{order.trackingId}</span>
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
