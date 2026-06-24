import { useState } from "react";
import { motion } from "motion/react";
import { Tv, Heart, Users, Share2, Send, ShoppingBag } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";

interface ChatMessage {
  user: string;
  msg: string;
  vip: boolean;
}

export function LiveStreams() {
  const [likes, setLikes] = useState(142);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { user: "Priya S.", msg: "Can we see the clasp details of the gold watch?", vip: true },
    { user: "Rohan V.", msg: "Does this come with a warranty document?", vip: false },
    { user: "Vikram M.", msg: "Unboxing packaging looks absolute class", vip: true }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setMessages([...messages, { user: "Collector", msg: inputVal, vip: true }]);
    setInputVal("");
  };

  const featuredProduct = ALL_PRODUCTS[0]; // Chronos Gold Watch

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Live <span className="font-bold text-white">Streams</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light mt-1">Join private unboxings, style reviews, and auctions with our master curators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Stream Video Player Mockup */}
        <div className="lg:col-span-8 space-y-4">
          <div 
            className="rounded-3xl border border-white/[0.06] aspect-video relative overflow-hidden flex items-center justify-center bg-cover bg-center shadow-2xl"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />

            {/* Overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-3 relative z-10">
              <span className="h-6 px-2.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-red-600 border border-red-500 text-white flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Live Now</span>
              </span>
              <span className="h-6 px-2.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-black/60 border border-white/[0.08] text-[#F8F8FC] flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>1.2K Watching</span>
              </span>
            </div>

            {/* Product card highlight overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 border border-white/[0.08] backdrop-blur-md flex items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg border border-white/[0.06] bg-[#0A0A0F] flex items-center justify-center text-2xl">
                  {featuredProduct.emoji}
                </div>
                <div>
                  <div className="text-[9px] text-[#C9A96E] font-bold uppercase">{featuredProduct.brand}</div>
                  <h4 className="text-xs font-semibold text-white mt-0.5">{featuredProduct.name}</h4>
                  <div className="text-xs text-white font-mono mt-0.5">₹{featuredProduct.price.toLocaleString()}</div>
                </div>
              </div>
              <button 
                className="h-9 px-4 rounded-xl text-[10px] font-bold uppercase text-[#0A0A0F] whitespace-nowrap"
                style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)" }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat Sidebar */}
        <div className="lg:col-span-4 h-[440px] flex flex-col justify-between rounded-3xl border border-white/[0.04] p-5" style={{ background: "#12121A" }}>
          <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/[0.04] pb-3 mb-3 text-white">Stream Chat</h3>

          <div className="flex-grow overflow-y-auto space-y-3.5 pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className="text-xs leading-normal">
                <span className="font-semibold text-white mr-1.5 flex items-center gap-1.5">
                  {m.vip && <span className="text-[8px] px-1 rounded bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">VIP</span>}
                  {m.user}
                </span>
                <span className="text-[#A1A1AA] font-light">{m.msg}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 border-t border-white/[0.04] pt-3 mt-3">
            <input 
              type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)}
              placeholder="Send message..."
              className="flex-grow h-10 px-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-[#C9A96E]"
            />
            <button type="submit" className="w-10 h-10 rounded-xl bg-[#C9A96E] hover:bg-[#D4B87A] flex items-center justify-center text-[#0A0A0F]">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
