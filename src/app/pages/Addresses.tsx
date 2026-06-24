import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Plus, Trash2, Edit2, ShieldCheck, X } from "lucide-react";

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    phone: "+91 98765 43210",
    street: "Flat 402, Sea Breeze Apartments, Carter Road",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400050",
    country: "India",
    isDefault: true
  },
  {
    id: 2,
    name: "Arjun Mehta",
    phone: "+91 98765 43210",
    street: "Penthouse B, DLF Phase 5",
    city: "Gurugram",
    state: "Haryana",
    zip: "122002",
    country: "India",
    isDefault: false
  }
];

export function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("India");
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now(),
      name,
      phone,
      street,
      city,
      state,
      zip,
      country,
      isDefault
    };

    let updated = [...addresses];
    if (isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }
    setAddresses([...updated, newAddress]);
    setShowModal(false);
    
    // Reset Form
    setName("");
    setPhone("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setIsDefault(false);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen text-[#F8F8FC] py-20 px-8 max-w-6xl mx-auto" style={{ background: "#0A0A0F" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.04] pb-6 mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Address <span className="font-bold text-white">Book</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs font-light mt-1">Configure your primary and alternative shipping destinations.</p>
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
          <span>Add Destination</span>
        </button>
      </div>

      {/* Grid */}
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((a) => (
            <div 
              key={a.id}
              className="p-6 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between"
              style={{ 
                background: "#12121A",
                borderColor: a.isDefault ? "#C9A96E" : "rgba(255,255,255,0.04)"
              }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-[#C9A96E]" />
                    <span className="text-sm font-semibold">{a.name}</span>
                  </div>
                  {a.isDefault && (
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#C9A96E]">
                      Default
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#A1A1AA] leading-relaxed space-y-1">
                  <p>{a.street}</p>
                  <p>{a.city}, {a.state} - {a.zip}</p>
                  <p>{a.country}</p>
                  <p className="pt-2 text-[10px] text-[#71717A]">Phone: {a.phone}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/[0.03]">
                <button className="text-xs text-[#71717A] hover:text-[#C9A96E] transition-all flex items-center gap-1.5 font-semibold">
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(a.id)} className="text-xs text-[#71717A] hover:text-red-400 transition-all flex items-center gap-1.5 font-semibold">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-white/[0.04] space-y-6" style={{ background: "#12121A" }}>
          <div className="w-16 h-16 rounded-full mx-auto bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#71717A]">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold">No Saved Destinations</h3>
            <p className="text-[#A1A1AA] text-xs max-w-sm mx-auto leading-relaxed">
              Your address registry is empty. Add a delivery destination to facilitate checkout tracking.
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="h-10 px-6 rounded-lg text-xs font-semibold border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E]/5"
          >
            Add Address
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
              className="w-full max-w-[500px] rounded-3xl border border-white/[0.06] p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
              style={{ background: "#12121A" }}
            >
              <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-[#71717A] hover:text-[#F8F8FC]">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Add New Destination
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Phone</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">Street Address</label>
                  <input type="text" required value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Suite, Flat, Road, Landmark..." className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-[#C9A96E]" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">City</label>
                    <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full h-11 px-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">State</label>
                    <input type="text" required value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="w-full h-11 px-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-semibold">ZIP Code</label>
                    <input type="text" required value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP" className="w-full h-11 px-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-[#C9A96E]" />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <input type="checkbox" id="modal-default" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} className="accent-[#C9A96E] cursor-pointer" />
                  <label htmlFor="modal-default" className="text-xs text-[#A1A1AA] cursor-pointer select-none">Set as primary destination</label>
                </div>

                <button 
                  type="submit"
                  className="w-full h-[52px] rounded-xl font-semibold tracking-wide text-xs uppercase text-[#0A0A0F] mt-4"
                  style={{ 
                    background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)"
                  }}
                >
                  Save Address
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
