import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquareCode, Edit, Trash2, CheckCircle2, X } from "lucide-react";
import { ALL_PRODUCTS, type Product } from "../data/products";

interface Review {
  id: number;
  product: Product;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    product: ALL_PRODUCTS[0], // Chronos Gold Watch
    rating: 5,
    title: "Absolutely Impeccable",
    comment: "The structural precision is top notch. The packaging alone feels like unboxing a masterpiece. Will collect again.",
    date: "June 20, 2026"
  }
];

export function MyReviews() {
  const [activeTab, setActiveTab] = useState<"pending" | "submitted">("pending");
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const pendingProducts = ALL_PRODUCTS.filter(p => [2, 3].includes(p.id));

  const handleOpenReview = (p: Product) => {
    setSelectedProduct(p);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const newReview: Review = {
      id: Date.now(),
      product: selectedProduct,
      rating,
      title,
      comment,
      date: "June 24, 2026"
    };

    setReviews([...reviews, newReview]);
    setShowModal(false);
    
    // Reset Form
    setRating(5);
    setTitle("");
    setComment("");
    setSelectedProduct(null);
    setActiveTab("submitted");
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-5xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          My <span className="font-bold text-white">Reviews</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light mt-1">Review your luxury collection purchases and share your feedback.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/[0.04] pb-3 mb-8 text-sm font-semibold uppercase tracking-wider">
        <button 
          onClick={() => setActiveTab("pending")}
          className="relative pb-3 transition-colors focus:outline-none"
          style={{ color: activeTab === "pending" ? "#C9A96E" : "#71717A" }}
        >
          <span>Pending Reviews</span>
          {activeTab === "pending" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E]" />}
        </button>
        <button 
          onClick={() => setActiveTab("submitted")}
          className="relative pb-3 transition-colors focus:outline-none"
          style={{ color: activeTab === "submitted" ? "#C9A96E" : "#71717A" }}
        >
          <span>Submitted Reviews</span>
          {activeTab === "submitted" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E]" />}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "pending" ? (
          <motion.div 
            key="pending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {pendingProducts.length > 0 ? (
              pendingProducts.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl border border-white/[0.04] bg-[#12121A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl border border-white/[0.06] bg-[#0A0A0F] flex items-center justify-center text-3xl">{p.emoji}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                      <p className="text-xs text-[#71717A]">Purchased on June 18, 2026</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleOpenReview(p)}
                    className="h-10 px-5 rounded-xl text-xs font-semibold text-[#0A0A0F] whitespace-nowrap transition-all"
                    style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)" }}
                  >
                    Write a Review
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-[#71717A] text-xs">
                All purchases have been successfully reviewed.
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="submitted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r.id} className="p-6 rounded-2xl border border-white/[0.04] bg-[#12121A] space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border border-white/[0.06] bg-[#0A0A0F] flex items-center justify-center text-2xl">{r.product.emoji}</div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{r.product.name}</h4>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-current" style={{ color: idx < r.rating ? "#C9A96E" : "rgba(255,255,255,0.06)" }} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#71717A] font-semibold">{r.date}</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <h5 className="font-semibold text-white">{r.title}</h5>
                    <p className="text-[#A1A1AA] leading-relaxed font-light">{r.comment}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/[0.03] pt-4 text-[10px] text-[#71717A] font-semibold">
                    <span className="flex items-center gap-1 text-[#22C55E]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Collector</span>
                    </span>
                    <div className="flex gap-3">
                      <button className="hover:text-[#C9A96E] transition-all flex items-center gap-1">
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button className="hover:text-red-400 transition-all flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-[#71717A] text-xs">
                You have not submitted any reviews yet.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-[460px] rounded-3xl border border-white/[0.06] p-8 space-y-6 relative"
              style={{ background: "#12121A" }}
            >
              <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-[#71717A] hover:text-[#F8F8FC]">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Write Review
              </h2>

              <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4">
                <div className="w-12 h-12 rounded-lg border border-white/[0.06] bg-[#0A0A0F] flex items-center justify-center text-2xl">{selectedProduct.emoji}</div>
                <div className="text-xs font-semibold">{selectedProduct.name}</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Select Rating</label>
                  <div className="flex gap-2.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button 
                        key={i} type="button" onClick={() => setRating(i)}
                        className="text-2xl transition-all"
                      >
                        <Star className="w-7 h-7" style={{ color: i <= rating ? "#C9A96E" : "rgba(255,255,255,0.06)", fill: i <= rating ? "currentColor" : "none" }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Review Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Exceptional product!" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Review Body</label>
                  <textarea required value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Describe your unboxing and product experience..." rows={4} className="w-full p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E] resize-none" />
                </div>

                <button 
                  type="submit"
                  className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] mt-4"
                  style={{ 
                    background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)"
                  }}
                >
                  Post Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
