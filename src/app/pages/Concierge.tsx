import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, User, Sparkles, Send, Ruler, DollarSign } from "lucide-react";
import { ALL_PRODUCTS, type Product } from "../data/products";

interface Message {
  sender: "user" | "agent";
  text: string;
  time: string;
}

export function Concierge() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "agent", text: "Welcome to your private concierge. I am your personal shopper. Tell me about the luxury item, gift, or style curation you are seeking today.", time: "10:30 AM" }
  ]);
  const [inputText, setInputText] = useState("");
  const [budget, setBudget] = useState(50000);
  const [prefCategory, setPrefCategory] = useState("Watches");
  const [preferences, setPreferences] = useState("");
  const [submittedRequest, setSubmittedRequest] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { sender: "user", text: inputText, time: "10:32 AM" };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      const agentMsg: Message = { sender: "agent", text: "Understood. Searching our vault catalog and consulting with our curators. I will update you with customized collection files shortly.", time: "10:33 AM" };
      setMessages(prev => [...prev, agentMsg]);
    }, 1500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedRequest(true);
  };

  const curatedProducts = ALL_PRODUCTS.filter(p => p.premium);

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.04] pb-6 mb-10">
        <h1 className="text-3xl font-light tracking-wide font-display" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Personal <span className="font-bold text-white">Concierge</span>
        </h1>
        <p className="text-[#A1A1AA] text-xs font-light mt-1">Connect directly with luxury style curations and private shopping consultants.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Chat interface */}
        <div className="lg:col-span-7 flex flex-col h-[520px] rounded-3xl border border-white/[0.04] p-5 overflow-hidden justify-between" style={{ background: "#12121A" }}>
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4 mb-4">
            <div className="w-10 h-10 rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E] relative">
              <User className="w-5 h-5" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#12121A]" />
            </div>
            <div>
              <h3 className="text-xs font-bold">Aureon Stylist Desk</h3>
              <p className="text-[9px] text-[#C9A96E] uppercase tracking-wider font-semibold">Active Curation Agent</p>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-grow overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => {
              const isAgent = m.sender === "agent";
              return (
                <div key={idx} className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
                  <div 
                    className="p-4 rounded-2xl max-w-[80%] text-xs font-light leading-relaxed relative"
                    style={{ 
                      background: isAgent ? "rgba(255,255,255,0.02)" : "rgba(201,169,110,0.08)",
                      border: isAgent ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(201,169,110,0.15)",
                      color: isAgent ? "#A1A1AA" : "#F8F8FC"
                    }}
                  >
                    {m.text}
                    <span className="block text-[8px] text-[#71717A] text-right mt-1.5 font-mono">{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSend} className="flex gap-3 border-t border-white/[0.04] pt-4 mt-4">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for recommendations, tracking updates, or custom fits..."
              className="flex-grow h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-[#C9A96E]"
            />
            <button 
              type="submit"
              className="w-11 h-11 rounded-xl bg-[#C9A96E] hover:bg-[#D4B87A] flex items-center justify-center text-[#0A0A0F] transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: Request Form & curated recommendations */}
        <div className="lg:col-span-5 space-y-8">
          <AnimatePresence mode="wait">
            {!submittedRequest ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleRequestSubmit}
                className="rounded-3xl border border-white/[0.04] p-6 space-y-5"
                style={{ background: "#12121A" }}
              >
                <div className="flex items-center gap-2 text-[#C9A96E]">
                  <Sparkles className="w-5 h-5" />
                  <h2 className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Curation Brief</h2>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Target Category</label>
                    <select 
                      value={prefCategory} onChange={(e) => setPrefCategory(e.target.value)}
                      className="w-full h-10 px-3 bg-[#12121A] border border-white/[0.08] rounded-xl text-[#F8F8FC] focus:outline-none"
                    >
                      <option value="Watches">Watches</option>
                      <option value="Jewellery">Jewellery</option>
                      <option value="Bags">Bags</option>
                      <option value="Eyewear">Eyewear</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Curation Budget</label>
                      <span className="text-[#C9A96E] font-mono">₹{budget.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min={10000} max={500000} step={10000}
                      value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-[#C9A96E] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#71717A] uppercase font-bold tracking-wider">Style Preference</label>
                    <textarea 
                      required value={preferences} onChange={(e) => setPreferences(e.target.value)}
                      placeholder="Specify material preferences, wrist size, dials, or specific occasions..."
                      rows={3}
                      className="w-full p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-[#C9A96E] resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-11 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] transition-all"
                  style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)" }}
                >
                  Request Custom Collection
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-white/[0.04] p-6 space-y-4 text-center"
                style={{ background: "#12121A" }}
              >
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold">Brief Transmitted</h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-xs mx-auto font-light">
                    Your brief is registered. Our curating team will review preferences and compile a custom list of items.
                  </p>
                </div>
                <button onClick={() => setSubmittedRequest(false)} className="h-9 px-4 rounded-lg text-[10px] font-semibold border border-white/[0.08] hover:bg-white/[0.04]">
                  Submit another brief
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
