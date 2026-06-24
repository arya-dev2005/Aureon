import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Send, Search, Check, Mic, Image, Paperclip } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  unread: number;
}

const INITIAL_CONTACTS: Contact[] = [
  { id: 1, name: "Aureon VIP Support", avatar: "👑", preview: "Your personal stylist is online.", time: "11:42 AM", unread: 2 },
  { id: 2, name: "TechWorld Vendor", avatar: "🏛️", preview: "Awb Ref: AWB-874291038.", time: "Yesterday", unread: 0 }
];

export function LiveChat() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [activeContact, setActiveContact] = useState<Contact>(INITIAL_CONTACTS[0]);
  const [messages, setMessages] = useState([
    { sender: "agent", text: "Welcome to Aureon Secure Chat. Let me know what you need help with.", time: "11:40 AM" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input, time: "11:45 AM" }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "agent", text: "Received. Our support concierge will verify the reference coordinates and follow up.", time: "11:46 AM" }
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[600px] border border-white/[0.04] rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#12121A" }}>
        
        {/* Left Side: Contact List */}
        <div className="md:col-span-4 border-r border-white/[0.04] p-4 flex flex-col justify-between h-full bg-[#0E0E16]">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/[0.04] pb-2">Conversations</h3>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" placeholder="Search contacts..."
                className="w-full h-9 pl-9 pr-4 bg-white/[0.02] border border-white/[0.08] rounded-lg text-xs focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <div className="space-y-2 pt-2">
              {contacts.map((c) => {
                const isActive = activeContact.id === c.id;
                return (
                  <button 
                    key={c.id} onClick={() => { setActiveContact(c); if(c.unread > 0) c.unread = 0; }}
                    className="w-full p-3 rounded-xl border flex gap-3 text-left transition-all focus:outline-none"
                    style={{
                      background: isActive ? "rgba(201,169,110,0.04)" : "transparent",
                      borderColor: isActive ? "#C9A96E" : "transparent"
                    }}
                  >
                    <div className="w-10 h-10 rounded-full border border-white/[0.08] bg-[#1A1A24] flex items-center justify-center text-lg">{c.avatar}</div>
                    <div className="flex-grow space-y-1 min-w-0">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-white truncate">{c.name}</span>
                        <span className="text-[9px] text-[#71717A] font-mono shrink-0">{c.time}</span>
                      </div>
                      <p className="text-[10px] text-[#71717A] truncate font-light leading-normal">{c.preview}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Chat */}
        <div className="md:col-span-8 flex flex-col justify-between h-full p-5">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-white/[0.04] pb-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1A24] border border-white/[0.08] flex items-center justify-center text-lg">{activeContact.avatar}</div>
            <div>
              <h4 className="text-xs font-bold text-white">{activeContact.name}</h4>
              <span className="text-[9px] text-[#C9A96E] font-semibold uppercase tracking-wider">Online Support Desk</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => {
              const isAgent = m.sender === "agent";
              return (
                <div key={idx} className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
                  <div 
                    className="p-3.5 rounded-2xl max-w-[80%] text-xs font-light leading-relaxed relative"
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

          {/* Form and Attachments */}
          <form onSubmit={handleSend} className="flex gap-3 items-center border-t border-white/[0.04] pt-4 mt-4">
            <div className="flex gap-2 text-[#71717A]">
              <button type="button" className="hover:text-white transition-all"><Paperclip className="w-4.5 h-4.5" /></button>
              <button type="button" className="hover:text-white transition-all"><Image className="w-4.5 h-4.5" /></button>
            </div>
            
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Write secure message..."
              className="flex-grow h-10 px-3.5 bg-white/[0.02] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-[#C9A96E]"
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
