import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, Plus, Trash2, ShieldCheck, X } from "lucide-react";

interface Card {
  id: number;
  bank: string;
  number: string;
  expiry: string;
  name: string;
  network: "Visa" | "Mastercard";
  isDefault: boolean;
}

const INITIAL_CARDS: Card[] = [
  {
    id: 1,
    bank: "HDFC Premium",
    number: "•••• •••• •••• 4242",
    expiry: "09/29",
    name: "ARJUN MEHTA",
    network: "Visa",
    isDefault: true
  },
  {
    id: 2,
    bank: "ICICI Emeralde",
    number: "•••• •••• •••• 8888",
    expiry: "12/28",
    name: "ARJUN MEHTA",
    network: "Mastercard",
    isDefault: false
  }
];

export function Payments() {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [network, setNetwork] = useState<"Visa" | "Mastercard">("Visa");
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = "•••• •••• •••• " + cardNumber.slice(-4);
    const newCard: Card = {
      id: Date.now(),
      bank: bank || "Custom Card",
      number: cleanNumber,
      expiry,
      name: name.toUpperCase(),
      network,
      isDefault
    };

    let updated = [...cards];
    if (isDefault) {
      updated = updated.map(c => ({ ...c, isDefault: false }));
    }
    setCards([...updated, newCard]);
    setShowModal(false);
    
    // Reset Form
    setBank("");
    setCardNumber("");
    setExpiry("");
    setName("");
    setIsDefault(false);
  };

  const handleDelete = (id: number) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-6 mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Payment <span className="font-bold text-white">Methods</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs font-light mt-1">Manage your cards and UPI configurations.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="h-11 px-6 rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] flex items-center gap-2 transition-all"
          style={{ 
            background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)",
            boxShadow: "0 4px 15px rgba(201,169,110,0.2)"
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Card</span>
        </button>
      </div>

      {/* Grid of Saved Cards */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <motion.div 
              key={c.id}
              whileHover={{ scale: 1.01, translateY: -4 }}
              className="rounded-2xl border border-white/[0.06] p-6 flex flex-col justify-between h-[210px] relative overflow-hidden group select-none shadow-xl cursor-pointer"
              style={{ 
                background: "linear-gradient(135deg,#161622 0%,#0C0C14 100%)",
                boxShadow: c.isDefault ? "0 0 24px rgba(201,169,110,0.08)" : "none"
              }}
            >
              {/* Card background glowing rings */}
              <div className="absolute right-[-40px] top-[-40px] w-48 h-48 rounded-full border border-[#C9A96E]/5 pointer-events-none group-hover:border-[#C9A96E]/10 transition-all duration-500" />
              <div className="absolute right-[-20px] top-[-20px] w-36 h-36 rounded-full border border-[#C9A96E]/5 pointer-events-none group-hover:border-[#C9A96E]/10 transition-all duration-500" />

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">{c.bank}</div>
                  {c.isDefault && (
                    <span className="inline-block px-1.5 py-0.5 rounded text-[7px] font-bold tracking-wider bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E] mt-1.5 uppercase">
                      Default
                    </span>
                  )}
                </div>
                {/* Chip Icon */}
                <div className="w-9 h-7 rounded bg-[#C9A96E]/20 border border-[#C9A96E]/40 relative overflow-hidden">
                  <div className="absolute inset-[3px] border border-[#C9A96E]/30 grid grid-cols-3 gap-0.5">
                    <div className="border-r border-[#C9A96E]/30" />
                    <div className="border-r border-[#C9A96E]/30" />
                  </div>
                </div>
              </div>

              <div className="text-xl tracking-[4px] text-white font-medium my-4 relative z-10" style={{ fontFamily: "monospace" }}>
                {c.number}
              </div>

              <div className="flex justify-between items-end relative z-10 border-t border-white/[0.03] pt-4">
                <div>
                  <div className="text-[8px] text-[#71717A] uppercase tracking-widest">Cardholder</div>
                  <div className="text-xs font-semibold text-white tracking-wide">{c.name}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[8px] text-[#71717A] uppercase tracking-widest text-right">Expiry</div>
                    <div className="text-xs font-semibold text-white">{c.expiry}</div>
                  </div>
                  <span className="text-sm font-bold italic tracking-wide text-white">
                    {c.network}
                  </span>
                </div>
              </div>

              {/* Trash icon overlay on hover */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                className="absolute right-4 bottom-14 w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-white/[0.04] space-y-6" style={{ background: "#12121A" }}>
          <div className="w-16 h-16 rounded-full mx-auto bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#71717A]">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold">No Saved Payment Methods</h3>
            <p className="text-[#A1A1AA] text-xs max-w-sm mx-auto leading-relaxed">
              Your billing catalog is empty. Save cards to secure faster transaction processes.
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="h-10 px-6 rounded-lg text-xs font-semibold border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E]/5"
          >
            Add Card
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
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
                Add Payment Card
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Cardholder Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="ARJUN MEHTA" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E] uppercase" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Card Network</label>
                    <select 
                      value={network} onChange={(e) => setNetwork(e.target.value as "Visa" | "Mastercard")}
                      className="w-full h-11 px-4 bg-[#12121A] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E] text-[#F8F8FC]"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Bank Name</label>
                    <input type="text" required value={bank} onChange={(e) => setBank(e.target.value)} placeholder="e.g. HDFC, ICICI" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Card Number</label>
                  <input type="text" required maxLength={16} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Expiry Date</label>
                    <input type="text" required maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">CVC / Security Code</label>
                    <input type="password" required maxLength={3} placeholder="•••" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <input type="checkbox" id="modal-card-default" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} className="accent-[#C9A96E] cursor-pointer" />
                  <label htmlFor="modal-card-default" className="text-xs text-[#A1A1AA] cursor-pointer select-none">Set as primary payment card</label>
                </div>

                <button 
                  type="submit"
                  className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] mt-4"
                  style={{ 
                    background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)"
                  }}
                >
                  Add Card
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
