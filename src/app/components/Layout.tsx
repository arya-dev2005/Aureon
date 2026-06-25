import { useState, useEffect, useRef } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence, useAnimate } from "motion/react";
import {
  Search, ShoppingCart, Heart, User, Menu, X,
  Instagram, Twitter, Facebook, Youtube,
} from "lucide-react";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { useStore } from "../context/StoreContext";

const NAV_LINKS = [
  { to: "/products", label: "All Products", hasDropdown: true },
  { to: "/products?sort=new", label: "New Arrivals" },
  { to: "/membership", label: "VIP Club" },
  { to: "/live", label: "Live Commerce" },
];

const PRODUCT_CATEGORIES = [
  { to: "/products?cat=Watches", label: "Watches" },
  { to: "/products?cat=Jewellery", label: "Jewellery" },
  { to: "/products?cat=Bags", label: "Bags" },
  { to: "/products?cat=Eyewear", label: "Eyewear" },
];

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/products?sort=new" },
      { label: "Bestsellers", to: "/products?sort=bestseller" },
      { label: "Flash Deals", to: "/flash-sales" },
      { label: "Live Auctions", to: "/live/auctions" },
      { label: "VIP Membership", to: "/membership" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/faq" },
      { label: "Track Order", to: "/account/orders/1001/track" },
      { label: "Shipping & Returns", to: "/shipping" },
      { label: "Contact Us", to: "/contact" },
      { label: "Trust & Security", to: "/trust" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Become a Seller", to: "/become-seller" },
      { label: "Vendor Portal", to: "/vendor/dashboard" },
      { label: "Admin Console", to: "/admin/dashboard" },
      { label: "Live Streams", to: "/live" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Cookie Policy", to: "/cookies" },
    ],
  },
];

export function LogoWordmark({ className = "", size = "lg" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const isSm = size === "sm";
  const fontSize = isSm ? "18px" : "24px";
  const letterSpacing = isSm ? "2px" : "3px";
  const slashLeft = isSm ? "2.5px" : "3.5px";
  const slashWidth = isSm ? "13px" : "18px";
  const ringInset = isSm ? "2.5px" : "4px";

  return (
    <div className={`flex flex-col items-start leading-none select-none ${className}`}>
      <span
        className="font-bold flex items-center text-white"
        style={{
          fontSize,
          letterSpacing,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* The 'A' with a thin diagonal gold slash */}
        <span className="relative inline-flex" style={{ marginRight: isSm ? "0.5px" : "1px" }}>
          A
          <span
            className="absolute bottom-[3px] h-[1.5px] rotate-[-26deg] origin-bottom-left"
            style={{
              left: slashLeft,
              width: slashWidth,
              backgroundColor: "#C9A96E",
              boxShadow: "0 0 4px rgba(201,169,110,0.5)"
            }}
          />
        </span>
        <span>URE</span>
        {/* The 'O' with a concentric ring */}
        <span className="relative inline-flex" style={{ marginLeft: "0.5px", marginRight: "0.5px" }}>
          O
          <span
            className="absolute rounded-full border border-dashed animate-[spinSlow_12s_linear_infinite]"
            style={{
              inset: ringInset,
              borderColor: "rgba(201,169,110,0.65)",
              borderWidth: "1px",
              boxShadow: "0 0 3px rgba(201,169,110,0.2)"
            }}
          />
        </span>
        <span>N</span>
      </span>
      <span
        style={{
          fontSize: isSm ? "8px" : "10px",
          color: "#A1A1AA",
          letterSpacing: "1px",
          marginTop: isSm ? "1px" : "3px"
        }}
        className="font-medium uppercase"
      >
        Curated for the Exceptional
      </span>
    </div>
  );
}

export function Layout() {
  const { cartCount, wishlist } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hoveredAllProducts, setHoveredAllProducts] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  const [cartScope, animateCart] = useAnimate();
  const [wishScope, animateWish] = useAnimate();

  useEffect(() => {
    if (cartCount > 0) {
      animateCart(cartScope.current, { scale: [1, 1.22, 0.95, 1], rotate: [0, -8, 8, 0] }, { duration: 0.4 });
    }
  }, [cartCount, animateCart]);

  useEffect(() => {
    if (wishlist.length > 0) {
      animateWish(wishScope.current, { scale: [1, 1.18, 0.95, 1], y: [0, -4, 0] }, { duration: 0.42 });
    }
  }, [wishlist.length, animateWish]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  return (
    <div style={{ background: "#0A0A0F", color: "#F8F8FC", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <CustomCursor />
      <ScrollProgress />

      {/* ── Sticky Nav ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-14"
        style={{
          height: 68,
          background: "rgba(7,7,12,0.94)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderBottom: "1px solid rgba(201,169,110,0.08)",
          boxShadow: "0 1px 0 rgba(201,169,110,0.04), 0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <Link to="/" aria-label="Aureon home" className="shrink-0 group" style={{ textDecoration: "none" }}>
          <LogoWordmark />
        </Link>

        {/* Search bar (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-3 flex-1 mx-10 max-w-lg px-4 rounded-xl h-11 transition-all duration-300"
          style={{
            background: searchOpen ? "rgba(201,169,110,0.04)" : "rgba(255,255,255,0.03)",
            border: searchOpen ? "1px solid rgba(201,169,110,0.55)" : "1px solid rgba(255,255,255,0.07)",
            boxShadow: searchOpen ? "0 0 0 3px rgba(201,169,110,0.1)" : "none",
          }}
        >
          <Search size={15} style={{ color: searchOpen ? "#C9A96E" : "#52525b", flexShrink: 0 }} />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search premium products..."
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-700"
            style={{ color: "#F8F8FC" }}
          />
        </form>

        {/* Icon buttons */}
        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="hidden md:flex" style={{ textDecoration: "none" }}>
            <motion.div
              ref={wishScope}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "#10101A",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161622",
                color: "#71717A",
                transition: "border 0.2s, box-shadow 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(201,169,110,0.38)";
                el.style.boxShadow = "3px 3px 8px #060609, -2px -2px 6px #161622, 0 0 16px rgba(201,169,110,0.12)";
                el.style.color = "#F8F8FC";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.boxShadow = "3px 3px 8px #060609, -2px -2px 6px #161622";
                el.style.color = "#71717A";
              }}
            >
              <Heart size={17} />
              <AnimatePresence mode="popLayout">
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0.6, opacity: 0, y: -2 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.6, opacity: 0, y: 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-red-500"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <Link to="/cart" className="hidden md:flex" style={{ textDecoration: "none" }}>
            <motion.div
              ref={cartScope}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "#10101A",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161622",
                color: "#71717A",
                transition: "border 0.2s, box-shadow 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(201,169,110,0.38)";
                el.style.boxShadow = "3px 3px 8px #060609, -2px -2px 6px #161622, 0 0 16px rgba(201,169,110,0.12)";
                el.style.color = "#F8F8FC";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.boxShadow = "3px 3px 8px #060609, -2px -2px 6px #161622";
                el.style.color = "#71717A";
              }}
            >
              <ShoppingCart size={17} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6, opacity: 0, y: -2 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.6, opacity: 0, y: 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-red-500"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <div
            className="hidden md:block relative text-left"
            onMouseEnter={() => setUserMenuOpen(true)}
            onMouseLeave={() => setUserMenuOpen(false)}
          >
            <Link to="/account" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                style={{
                  background: "#10101A",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161622",
                  color: "#71717A",
                  transition: "border 0.2s, box-shadow 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(201,169,110,0.38)";
                  el.style.boxShadow = "3px 3px 8px #060609, -2px -2px 6px #161622, 0 0 16px rgba(201,169,110,0.12)";
                  el.style.color = "#F8F8FC";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(255,255,255,0.06)";
                  el.style.boxShadow = "3px 3px 8px #060609, -2px -2px 6px #161622";
                  el.style.color = "#71717A";
                }}
              >
                <User size={17} />
              </motion.div>
            </Link>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl p-2 border border-white/[0.06] z-50"
                  style={{
                    background: "rgba(18,18,26,0.98)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 16px rgba(201,169,110,0.05)",
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    {[
                      { to: "/account", label: "My Profile" },
                      { to: "/orders", label: "My Orders" },
                      { to: "/account/addresses", label: "Saved Addresses" },
                      { to: "/account/payments", label: "Payment Methods" },
                      { to: "/account/reviews", label: "Product Reviews" },
                      { to: "/membership", label: "VIP Club Hub" },
                    ].map(item => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setUserMenuOpen(false)}
                        className="px-3 py-2 rounded-lg text-xs transition-colors hover:text-white"
                        style={{
                          color: "#A1A1AA",
                          textDecoration: "none",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                          e.currentTarget.style.color = "#C9A96E";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#A1A1AA";
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="h-px bg-white/[0.04] my-1" />
                    <Link
                      to="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold hover:text-[#C9A96E]"
                      style={{
                        color: "#C9A96E",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      Login / Register
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden w-9 h-9 flex items-center justify-center text-zinc-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Category strip */}
      <div className="hidden md:flex items-center gap-7 px-14 overflow-x-auto" style={{ height: 48, background: "#08080E", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        {NAV_LINKS.map(({ to, label, hasDropdown }) => (
          <div
            key={label}
            className="relative shrink-0"
            onMouseEnter={() => { if (hasDropdown) setHoveredAllProducts(true); }}
            onMouseLeave={() => { if (hasDropdown) setHoveredAllProducts(false); }}
          >
            <NavLink
              to={to}
              end={to === "/products"}
              className="text-[13px] font-medium pb-2.5 transition-colors duration-200 block"
              style={({ isActive }) => ({ color: isActive ? "#F8F8FC" : "#71717A", textDecoration: "none" })}
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1">
                  {label}
                  {hasDropdown && <span className="text-[8px] opacity-70">▼</span>}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg,#C9A96E,#F0D99A,#C9A96E)" }} />}
                </span>
              )}
            </NavLink>

            {hasDropdown && (
              <AnimatePresence>
                {hoveredAllProducts && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-1 w-44 rounded-xl p-2 border border-white/[0.06] z-50 shadow-2xl"
                    style={{
                      background: "rgba(18,18,26,0.98)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      {PRODUCT_CATEGORIES.map(cat => (
                        <Link
                          key={cat.label}
                          to={cat.to}
                          className="px-3 py-2 rounded-lg text-xs transition-colors hover:text-white text-zinc-400 no-underline"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                            e.currentTarget.style.color = "#C9A96E";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#A1A1AA";
                          }}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="md:hidden fixed inset-y-0 right-0 top-[68px] w-full sm:w-[320px] z-40 flex flex-col p-6 overflow-y-auto"
            style={{
              background: "rgba(10,10,15,0.98)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(201,169,110,0.1)",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.6)"
            }}
          >
            <div className="flex flex-col gap-3">
              {/* Menu Links */}
              {NAV_LINKS.map(link => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="border-b border-white/[0.06] py-1">
                      <div className="flex justify-between items-center py-2">
                        <Link to={link.to} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-[#F8F8FC] no-underline">
                          {link.label}
                        </Link>
                        <button
                          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                          className="p-1 text-[#C9A96E] hover:text-white focus:outline-none"
                        >
                          <motion.span animate={{ rotate: mobileCategoriesOpen ? 180 : 0 }} className="inline-block text-xs">▼</motion.span>
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileCategoriesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 flex flex-col gap-2.5 mt-1 pb-2"
                          >
                            {PRODUCT_CATEGORIES.map(cat => (
                              <Link
                                key={cat.label}
                                to={cat.to}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm font-medium text-zinc-400 no-underline hover:text-[#C9A96E] transition-colors"
                              >
                                {cat.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium py-3 border-b border-white/[0.06] text-[#F8F8FC] no-underline hover:text-[#C9A96E] transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="h-px bg-white/[0.06] my-4" />

              {/* Mobile Moved Actions */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C9A96E] mb-1">My Account</span>

                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex justify-between items-center py-2.5 px-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-[#F8F8FC] no-underline"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={15} className="text-[#C9A96E]" /> My Cart
                  </span>
                  {cartCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-red-500">
                      {cartCount}
                    </span>
                  ) : <span className="text-zinc-600 text-xs">Empty</span>}
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex justify-between items-center py-2.5 px-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-[#F8F8FC] no-underline"
                >
                  <span className="flex items-center gap-2">
                    <Heart size={15} className="text-[#C9A96E]" /> My Wishlist
                  </span>
                  {wishlist.length > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-red-500">
                      {wishlist.length}
                    </span>
                  ) : <span className="text-zinc-600 text-xs">Empty</span>}
                </Link>

                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2.5 px-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-[#F8F8FC] no-underline"
                >
                  <User size={15} className="text-[#C9A96E]" /> Profile Dashboard
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 mt-2 h-11 rounded-xl font-semibold text-xs uppercase text-[#0A0A0F]"
                  style={{ background: "linear-gradient(135deg, #C9A96E 0%, #D4B87A 100%)" }}
                >
                  Sign In / Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <Outlet />

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer style={{ background: "#04040B", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2 lg:col-span-1 space-y-4">
              <Link to="/" style={{ textDecoration: "none" }}>
                <LogoWordmark size="sm" />
              </Link>
              <p className="text-xs text-zinc-700 leading-relaxed max-w-[170px]">Where luxury meets digital. Curated excellence since 2026.</p>
              <div className="flex gap-1.5">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.1 }} className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-700 hover:text-[#C9A96E] transition-colors" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                    <Icon size={12} />
                  </motion.button>
                ))}
              </div>
            </div>
            {FOOTER_COLS.map(col => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4" style={{ color: "#F8F8FC" }}>{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-xs text-zinc-700 hover:text-white transition-colors duration-200 hover:underline decoration-[#C9A96E] underline-offset-2"
                        style={{ textDecorationColor: "#C9A96E" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-[11px] text-zinc-700">© 2026 Aureon. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              {["VISA", "MC", "AMEX", "UPI"].map(c => (
                <span key={c} className="px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-700" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
        @keyframes goldShimmerText { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatWatch { 0%,100%{transform:translateY(0px) rotate(-1.5deg)} 50%{transform:translateY(-14px) rotate(1.5deg)} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-3px)} }
        @keyframes orbit { 0%{transform:rotate(0deg) translateX(135px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(135px) rotate(-360deg)} }
        @keyframes scrollDrop { 0%{transform:translateY(-100%);opacity:0} 40%{opacity:1} 100%{transform:translateY(260%);opacity:0} }
        @keyframes glare { from{left:-3.5rem} to{left:110%} }
        @keyframes ctaGlow { 0%,100%{box-shadow:0 4px 22px rgba(201,169,110,0.45),0 0 44px rgba(201,169,110,0.15)} 50%{box-shadow:0 4px 30px rgba(201,169,110,0.6),0 0 65px rgba(201,169,110,0.25)} }
        @property --ba { syntax:"<angle>"; initial-value:0deg; inherits:false; }
        @keyframes borderSpin { to{--ba:360deg} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(201,169,110,0.2);border-radius:99px} ::-webkit-scrollbar-thumb:hover{background:rgba(201,169,110,0.4)}
      `}</style>
    </div>
  );
}
