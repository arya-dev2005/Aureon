import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, RotateCcw, Shield, HelpCircle, Award, Compass, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { icon: ShoppingBag, name: "Orders & Shipping", count: 8 },
  { icon: RotateCcw, name: "Returns & Refunds", count: 5 },
  { icon: Shield, name: "Payments & Security", count: 6 },
  { icon: HelpCircle, name: "Account & Login", count: 4 },
  { icon: Award, name: "VIP & Membership", count: 7 },
  { icon: Compass, name: "Product Curation", count: 4 }
];

const ARTICLES = [
  { cat: "Orders & Shipping", title: "How can I track my concierge order delivery status?", body: "Standard express delivery is tracked in real-time within your account dashboard under 'Order History' or on our dedicated Order Tracking page using your tracking number." },
  { cat: "Orders & Shipping", title: "What regions support 24-hour concierge delivery?", a: "We offer 24-hour premium delivery to Mumbai, Delhi NCR, Bengaluru, and Chennai." },
  { cat: "Returns & Refunds", title: "What items are excluded from returns?", body: "All custom personalized items and final flash sale items are excluded from returns. Standard products are returnable within 30 days." },
  { cat: "Payments & Security", title: "What secure payment gateways are supported?", body: "We integrate with Stripe and Razorpay, supporting multi-currency, secure credit cards, UPI, and bank transfers with 3D Secure verification." },
  { cat: "VIP & Membership", title: "How do I redeem my loyalty reward points?", body: "Redeem points directly within the VIP Hub Dashboard. Points can be exchanged for free shipping, personal shopper concierge credits, or product discounts." }
];

export function FAQ() {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filteredArticles = ARTICLES.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(query.toLowerCase()) || 
                          (a.body && a.body.toLowerCase().includes(query.toLowerCase()));
    const matchesCat = selectedCat ? a.cat === selectedCat : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Search Header */}
      <div className="text-center space-y-6 mb-16">
        <div className="space-y-3">
          <span className="text-xs text-[#C9A96E] uppercase tracking-[3px] font-semibold">Help Center</span>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            How Can We Assist <span className="font-bold text-white">You</span>?
          </h1>
        </div>

        {/* Large Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#71717A]">
            <Search className="w-5 h-5" />
          </span>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full h-14 pl-14 pr-6 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-sm focus:outline-none focus:border-[#C9A96E] transition-all"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          const isSelected = selectedCat === c.name;
          return (
            <button 
              key={i}
              onClick={() => setSelectedCat(isSelected ? null : c.name)}
              className="p-5 rounded-2xl border text-center transition-all duration-300 focus:outline-none relative overflow-hidden"
              style={{ 
                background: isSelected ? "rgba(201,169,110,0.06)" : "#12121A",
                borderColor: isSelected ? "#C9A96E" : "rgba(255,255,255,0.04)"
              }}
            >
              <div 
                className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center border transition-all"
                style={{ 
                  background: isSelected ? "#C9A96E/10" : "rgba(255,255,255,0.02)",
                  borderColor: isSelected ? "#C9A96E" : "rgba(255,255,255,0.06)",
                  color: isSelected ? "#C9A96E" : "#A1A1AA"
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-semibold tracking-wide truncate">{c.name}</div>
              <div className="text-[9px] text-[#71717A] mt-1">{c.count} Articles</div>
            </button>
          );
        })}
      </div>

      {/* Articles Listing */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold tracking-wide border-b border-white/[0.04] pb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {selectedCat ? `${selectedCat} Articles` : "Search Results & Help Articles"}
        </h2>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((a, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-white/[0.04] p-6 hover:border-[#C9A96E]/20 transition-all duration-300"
                  style={{ background: "#12121A" }}
                >
                  <span className="text-[9px] text-[#C9A96E] uppercase tracking-wider font-bold mb-1.5 block">{a.cat}</span>
                  <h3 className="text-sm font-semibold mb-2 flex items-center justify-between">
                    <span>{a.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#71717A] hover:text-[#C9A96E] transition-all cursor-pointer" />
                  </h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed font-light">{a.body || "View this article to learn more about the guidelines and processes configured on Aureon."}</p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16 text-[#71717A] text-sm">
                No matching articles found. Clear filters or adjust your search keywords.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
