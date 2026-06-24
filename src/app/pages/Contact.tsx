import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Clock, Plus, Minus, Send, CheckCircle2 } from "lucide-react";

const SUBJECTS = ["Order Inquiry", "Product Question", "Returns", "VIP Support", "Partnership"];

const FAQS = [
  { q: "How do I join the Aureon VIP program?", a: "Membership is currently invitation-only or automatically unlocked upon crossing lifetime spend thresholds. You can apply or purchase memberships in the Membership Tiers section." },
  { q: "What is your standard shipping window?", a: "We process orders within 24 hours. Concierge delivery takes 24-48 hours across major metros, while standard express shipping takes 2-3 business days." },
  { q: "How do I return an item?", a: "Returns can be initiated directly from your customer account portal within 30 days of delivery. Items must be unworn and in original luxury packaging with tags intact." },
  { q: "Is international delivery available?", a: "Yes, we ship to over 60 countries. Duties and taxes are calculated directly at checkout to ensure transparent delivery." }
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [faqIndex, setFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              We're Here for <span className="font-bold text-white">You</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm font-light">Our concierge team typically responds within 2 hours.</p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-5 rounded-2xl border border-white/[0.04] p-6 md:p-8"
                style={{ background: "#12121A" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Your Name</label>
                    <input 
                      type="text" required value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Email Address</label>
                    <input 
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Phone (Optional)</label>
                    <input 
                      type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Subject</label>
                    <select 
                      value={subject} onChange={(e) => setSubject(e.target.value)}
                      className="w-full h-11 px-4 bg-[#12121A] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E] text-[#F8F8FC]"
                    >
                      {SUBJECTS.map((sub, idx) => (
                        <option key={idx} value={sub} className="bg-[#12121A]">{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-[#A1A1AA]">
                    <span className="uppercase tracking-wider font-semibold">Message Details</span>
                    <span>{message.length} / 1000</span>
                  </div>
                  <textarea 
                    maxLength={1000} required value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry..." rows={5}
                    className="w-full p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E] resize-none"
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] transition-all relative overflow-hidden flex items-center justify-center gap-2"
                  style={{ 
                    background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)",
                    boxShadow: "0 4px 15px rgba(201,169,110,0.25)"
                  }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#0A0A0F] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-white/[0.04] p-8 text-center space-y-6"
                style={{ background: "#12121A" }}
              >
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-[#22C55E]/10 border border-[#22C55E]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Inquiry Transmitted</h3>
                  <p className="text-[#A1A1AA] text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you. Your request is queued. One of our concierge agents will email you back shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="h-10 px-6 rounded-lg text-xs font-semibold border border-white/[0.08] hover:bg-white/[0.04]"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Contact info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-2xl border border-white/[0.04] p-6 space-y-6" style={{ background: "#12121A" }}>
            <h2 className="text-xl font-semibold tracking-wide border-b border-white/[0.04] pb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Concierge Desk
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] text-[#C9A96E]">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Email Inquiry</div>
                  <a href="mailto:support@aureon.com" className="text-sm font-semibold hover:text-[#C9A96E] transition-all">support@aureon.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] text-[#C9A96E]">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Direct Dial</div>
                  <a href="tel:+91-XXXX-XXXXXX" className="text-sm font-semibold hover:text-[#C9A96E] transition-all">+91-XXXX-XXXXXX</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/[0.06] text-[#C9A96E]">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold">Desk Hours</div>
                  <div className="text-sm font-semibold">Mon-Sat, 9AM - 8PM IST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="mt-24 border-t border-white/[0.04] pt-16">
        <h2 className="text-2xl font-semibold tracking-wide text-center mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const active = faqIndex === index;
            return (
              <div 
                key={index} 
                className="rounded-xl border border-white/[0.04] overflow-hidden transition-all duration-300"
                style={{ background: active ? "#12121A" : "rgba(255,255,255,0.01)" }}
              >
                <button 
                  onClick={() => setFaqIndex(active ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-semibold">{faq.q}</span>
                  <span className="text-[#C9A96E] transition-transform duration-300" style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}>
                    {active ? <Minus className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-white/[0.03]"
                    >
                      <div className="p-5 text-[#A1A1AA] text-xs font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
