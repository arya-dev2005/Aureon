import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard3D } from "../components/ProductCard3D";
import { ALL_PRODUCTS, CATEGORIES, BRANDS } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 12;

type SortKey = "price_asc" | "price_desc" | "rating" | "discount" | "new" | "";

function sortProducts(products: typeof ALL_PRODUCTS, sort: SortKey) {
  const arr = [...products];
  if (sort === "price_asc") return arr.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") return arr.sort((a, b) => b.price - a.price);
  if (sort === "rating") return arr.sort((a, b) => b.rating - a.rating);
  if (sort === "discount") return arr.sort((a, b) => b.discount - a.discount);
  return arr;
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-px skeleton-shimmer"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.04)",
        boxShadow: "3px 3px 10px #060609, -2px -2px 7px #121220",
        height: 380,
        borderRadius: 16,
        transformStyle: "preserve-3d",
        transform: "rotateX(6deg)",
      }}
    >
      <div className="p-4 space-y-4 h-full flex flex-col justify-between">
        <div className="w-full aspect-square rounded-xl bg-zinc-900/60 flex items-center justify-center relative overflow-hidden">
          <div className="w-18 h-18 rounded-full bg-zinc-800/40" />
        </div>
        <div className="space-y-2">
          <div className="w-1/3 h-3 bg-zinc-800/60 rounded" />
          <div className="w-3/4 h-4.5 bg-zinc-800/80 rounded" />
          <div className="w-1/2 h-3 bg-zinc-800/50 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-zinc-900/30">
          <div className="space-y-1.5">
            <div className="w-16 h-5 bg-zinc-800/80 rounded" />
            <div className="w-10 h-3 bg-zinc-800/40 rounded" />
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-800/60" />
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const catParam = searchParams.get("cat") ?? "";
  const qParam = searchParams.get("q") ?? "";
  const sortParam = (searchParams.get("sort") ?? "") as SortKey;

  const [selectedCats, setSelectedCats] = useState<string[]>(catParam ? [catParam] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>(sortParam);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(qParam);
  const [loading, setLoading] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);

  // Sync catParam changes
  useEffect(() => {
    if (catParam) setSelectedCats([catParam]);
  }, [catParam]);

  // Filter
  const filtered = sortProducts(
    ALL_PRODUCTS.filter(p => {
      const matchCat = selectedCats.length === 0 || selectedCats.includes(p.category);
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      const matchQ = !searchInput.trim() || p.name.toLowerCase().includes(searchInput.toLowerCase()) || p.brand.toLowerCase().includes(searchInput.toLowerCase());
      return matchCat && matchBrand && matchPrice && matchRating && matchQ;
    }),
    sort
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [selectedCats, selectedBrands, minPrice, maxPrice, minRating, sort, searchInput]);

  // Trigger loading skeleton on filter or page changes
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(id);
  }, [selectedCats, selectedBrands, minPrice, maxPrice, minRating, sort, searchInput, page]);

  // GSAP scroll animations
  useEffect(() => {
    if (loading) return;
    const isMobileDevice = window.matchMedia("(pointer: coarse)").matches;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".card-animate").forEach((el, i) => {
        if (isMobileDevice) {
          gsap.set(el, { opacity: 1, y: 0, rotateX: 0 });
          return;
        }
        gsap.fromTo(el,
          { opacity: 0, y: 48, rotateX: 18, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: "power2.out", delay: (i % 4) * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }
        );
      });
    }, pageRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [paginated, loading]);

  const toggleCat = (cat: string) => setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const toggleBrand = (brand: string) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);

  const removeFilter = (type: "cat" | "brand" | "rating" | "q", val?: string) => {
    if (type === "cat" && val) setSelectedCats(prev => prev.filter(c => c !== val));
    if (type === "brand" && val) setSelectedBrands(prev => prev.filter(b => b !== val));
    if (type === "rating") setMinRating(0);
    if (type === "q") setSearchInput("");
  };

  const hasActiveFilters = selectedCats.length > 0 || selectedBrands.length > 0 || minRating > 0 || searchInput.trim() !== "";

  const neuCard = { background: "#0D0D16", boxShadow: "4px 4px 12px #060609, -3px -3px 9px #161624" } as const;

  const SidebarContent = () => (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.06)" }}>
          <Search size={14} style={{ color: "#A1A1AA" }} />
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#F8F8FC" }}
          />
          {searchInput && <button onClick={() => setSearchInput("")}><X size={12} style={{ color: "#A1A1AA" }} /></button>}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A96E" }}>Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleCat(cat)}
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: selectedCats.includes(cat) ? "linear-gradient(135deg,#C9A96E,#D4B87A)" : "#12121A",
                  border: selectedCats.includes(cat) ? "1px solid #C9A96E" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "2px 2px 6px #060609, -1px -1px 4px #161624",
                }}
              >
                {selectedCats.includes(cat) && <span className="text-[8px] font-bold text-[#0A0A0F]">✓</span>}
              </div>
              <span
                className="text-[13px] transition-colors duration-200"
                style={{ color: selectedCats.includes(cat) ? "#F8F8FC" : "#A1A1AA", cursor: "pointer" }}
                onClick={() => toggleCat(cat)}
              >
                {cat}
              </span>
              <span className="ml-auto text-[11px]" style={{ color: "#52525B" }}>
                ({ALL_PRODUCTS.filter(p => p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A96E" }}>Brand</h3>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => toggleBrand(brand)}
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: selectedBrands.includes(brand) ? "linear-gradient(135deg,#C9A96E,#D4B87A)" : "#12121A",
                  border: selectedBrands.includes(brand) ? "1px solid #C9A96E" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "2px 2px 6px #060609, -1px -1px 4px #161624",
                }}
              >
                {selectedBrands.includes(brand) && <span className="text-[8px] font-bold text-[#0A0A0F]">✓</span>}
              </div>
              <span
                className="text-[13px] transition-colors duration-200"
                style={{ color: selectedBrands.includes(brand) ? "#F8F8FC" : "#A1A1AA", cursor: "pointer" }}
                onClick={() => toggleBrand(brand)}
              >
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A96E" }}>Price Range</h3>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[11px] mb-1 block" style={{ color: "#52525B" }}>Min (₹)</label>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(Number(e.target.value))}
              min={0} max={50000} step={500}
              className="w-full px-3 py-2 rounded-lg text-xs outline-none"
              style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.06)", color: "#F8F8FC" }}
            />
          </div>
          <div className="flex-1">
            <label className="text-[11px] mb-1 block" style={{ color: "#52525B" }}>Max (₹)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              min={0} max={50000} step={500}
              className="w-full px-3 py-2 rounded-lg text-xs outline-none"
              style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.06)", color: "#F8F8FC" }}
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#C9A96E" }}>Minimum Rating</h3>
        <div className="space-y-2">
          {[{ label: "4.5+ ★★★★★", val: 4.5 }, { label: "4.0+ ★★★★", val: 4.0 }, { label: "3.5+ ★★★", val: 3.5 }, { label: "Any rating", val: 0 }].map(opt => (
            <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setMinRating(opt.val)}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: minRating === opt.val ? "linear-gradient(135deg,#C9A96E,#D4B87A)" : "#12121A",
                  border: minRating === opt.val ? "1px solid #C9A96E" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "2px 2px 6px #060609, -1px -1px 4px #161624",
                }}>
                {minRating === opt.val && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#0A0A0F" }} />}
              </div>
              <span className="text-[13px]" style={{ color: minRating === opt.val ? "#F8F8FC" : "#A1A1AA" }}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={() => { setSelectedCats([]); setSelectedBrands([]); setMinPrice(0); setMaxPrice(50000); setMinRating(0); setSearchInput(""); }}
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ border: "1px solid rgba(201,169,110,0.3)", color: "#C9A96E", background: "rgba(201,169,110,0.05)" }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div ref={pageRef} style={{ background: "#0A0A0F", color: "#F8F8FC", minHeight: "100vh" }}>
      {/* Page Header */}
      <div className="px-6 lg:px-14 py-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "#A1A1AA" }}>
          <Link to="/" className="hover:text-[#C9A96E] transition-colors" style={{ color: "#A1A1AA", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "#52525B" }}>/</span>
          <span style={{ color: "#F8F8FC" }}>Products</span>
          {catParam && <>
            <span style={{ color: "#52525B" }}>/</span>
            <span style={{ color: "#C9A96E" }}>{catParam}</span>
          </>}
        </nav>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          {catParam ? catParam : "Our Collection"}
        </h1>
      </div>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-72 shrink-0 p-6 sticky top-[116px] self-start max-h-[calc(100vh-120px)] overflow-y-auto"
          style={{ ...neuCard, borderRight: "1px solid rgba(255,255,255,0.04)", minHeight: "calc(100vh - 116px)" }}>
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={16} style={{ color: "#C9A96E" }} />
            <h2 className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Filters</h2>
          </div>
          <SidebarContent />
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="lg:hidden fixed inset-0 z-50 flex"
            >
              <div
                className="w-72 h-full overflow-y-auto p-6"
                style={{ background: "#0D0D16", boxShadow: "4px 0 30px rgba(0,0,0,0.6)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} style={{ color: "#C9A96E" }} />
                    <h2 className="font-semibold text-sm">Filters</h2>
                  </div>
                  <button onClick={() => setSidebarOpen(false)}><X size={18} style={{ color: "#A1A1AA" }} /></button>
                </div>
                <SidebarContent />
              </div>
              <div className="flex-1" style={{ background: "rgba(0,0,0,0.6)" }} onClick={() => setSidebarOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 px-6 lg:px-8 py-6 min-w-0">
          {/* Sort bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}
              >
                <SlidersHorizontal size={13} /> Filters
              </button>
              <span className="text-sm" style={{ color: "#A1A1AA" }}>
                Showing <span style={{ color: "#F8F8FC", fontWeight: 600 }}>{Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span style={{ color: "#F8F8FC", fontWeight: 600 }}>{filtered.length}</span> results
              </span>
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.07)", color: "#F8F8FC", boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161624" }}
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCats.map(cat => (
                <span key={cat} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }}>
                  {cat}
                  <button onClick={() => removeFilter("cat", cat)}><X size={10} /></button>
                </span>
              ))}
              {selectedBrands.map(brand => (
                <span key={brand} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }}>
                  {brand}
                  <button onClick={() => removeFilter("brand", brand)}><X size={10} /></button>
                </span>
              ))}
              {minRating > 0 && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }}>
                  {minRating}+ ★
                  <button onClick={() => removeFilter("rating")}><X size={10} /></button>
                </span>
              )}
              {searchInput.trim() && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.35)", color: "#C9A96E" }}>
                  "{searchInput}"
                  <button onClick={() => removeFilter("q")}><X size={10} /></button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-6xl mb-6" style={{ filter: "drop-shadow(0 0 20px rgba(201,169,110,0.4))" }}>🔍</div>
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif", color: "#C9A96E" }}>No products found</h3>
              <p className="mb-6" style={{ color: "#A1A1AA" }}>Try adjusting your filters or browse the full collection.</p>
              <button
                onClick={() => { setSelectedCats([]); setSelectedBrands([]); setMinPrice(0); setMaxPrice(50000); setMinRating(0); setSearchInput(""); }}
                className="px-6 py-3 rounded-xl font-medium text-sm"
                style={{ background: "linear-gradient(135deg,#C9A96E,#D4B87A)", color: "#0A0A0F" }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginated.map((p, i) => <ProductCard3D key={p.id} product={p} delay={i * 60} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161624", color: "#A1A1AA" }}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200"
                  style={{
                    background: page === p ? "linear-gradient(135deg,#C9A96E,#D4B87A)" : "#12121A",
                    color: page === p ? "#0A0A0F" : "#A1A1AA",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161624",
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ background: "#12121A", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "3px 3px 8px #060609, -2px -2px 6px #161624", color: "#A1A1AA" }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
