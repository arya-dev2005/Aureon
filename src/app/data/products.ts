export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  badge: string | null;
  stock: string;
  premium: boolean;
  emoji: string;
  category: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: string[];
  tags: string[];
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1, brand: "Aurum", name: "Carbon Fibre Chronograph Elite",
    price: 24999, oldPrice: 34999, discount: 29, rating: 4.9, reviews: 2841,
    badge: "TRENDING", stock: "In Stock", premium: true, emoji: "⌚", category: "Watches",
    description: "The pinnacle of horological engineering. A 44mm carbon composite case houses a Swiss ETA 7750 automatic movement delivering 72-hour power reserve. Every detail speaks to obsessive craftsmanship.",
    features: ["Swiss ETA 7750 Movement", "72hr Power Reserve", "Carbon Composite Case", "Sapphire Crystal", "100m Water Resistance"],
    specs: { "Case": "44mm Carbon Fibre", "Movement": "Swiss ETA 7750", "Power Reserve": "72hrs", "Water Resistance": "100m", "Strap": "Rubber / Folding Clasp" },
    colors: ["#1A1A1A", "#C9A96E", "#2A2A3A"],
    tags: ["automatic", "chronograph", "carbon", "luxury"],
  },
  {
    id: 2, brand: "Luminos", name: "Precision Architect Timepiece",
    price: 18499, oldPrice: 22999, discount: 20, rating: 4.7, reviews: 1204,
    badge: "HOT DEAL", stock: "Low Stock", premium: false, emoji: "🕰️", category: "Watches",
    description: "Geometric minimalism meets Swiss precision. The Architect's clean dial and architectural case lines make it the definitive dress watch for the modern connoisseur.",
    features: ["Swiss Quartz Movement", "Mineral Crystal", "Brushed Steel Case", "Italian Leather Strap", "30m Splash Resistant"],
    specs: { "Case": "40mm Stainless Steel", "Movement": "Swiss Quartz", "Crystal": "Mineral", "Strap": "Tan Italian Leather", "Water Resistance": "30m" },
    colors: ["#C0C0C0", "#C9A96E", "#2C2C2C"],
    tags: ["dress watch", "minimalist", "quartz"],
  },
  {
    id: 3, brand: "NovaStar", name: "Midnight Sapphire Automatic",
    price: 31500, oldPrice: 38000, discount: 17, rating: 4.8, reviews: 967,
    badge: null, stock: "In Stock", premium: true, emoji: "⌚", category: "Watches",
    description: "A deep midnight blue sunburst dial with a 38mm rose-gold case. The Miyota 9015 movement hums quietly inside, visible through an exhibition caseback that reveals its intricate ballet.",
    features: ["Miyota 9015 Automatic", "Exhibition Caseback", "Sunburst Blue Dial", "Rose Gold PVD Case", "50m Water Resistance"],
    specs: { "Case": "38mm Rose Gold PVD", "Movement": "Miyota 9015", "Dial": "Midnight Blue Sunburst", "Crystal": "Double-Domed Sapphire", "Water Resistance": "50m" },
    colors: ["#1B2A4A", "#C9A96E", "#B76E79"],
    tags: ["automatic", "dress watch", "blue dial"],
  },
  {
    id: 4, brand: "Vellum", name: "Rose Gold Escapement Series",
    price: 15299, oldPrice: 19999, discount: 23, rating: 4.6, reviews: 3410,
    badge: "TRENDING", stock: "In Stock", premium: false, emoji: "⌚", category: "Watches",
    description: "Where mechanical artistry becomes wearable jewellery. The skeletonised dial reveals every gear, spring and escapement wheel in glorious rose-gold plated detail.",
    features: ["Skeleton Automatic Movement", "Rose Gold Plating", "Open Heart Dial", "Genuine Leather Strap", "Handcrafted in Switzerland"],
    specs: { "Case": "42mm Rose Gold Plated", "Movement": "Skeleton Automatic", "Dial": "Open Heart", "Crystal": "Sapphire", "Strap": "Burgundy Leather" },
    colors: ["#B76E79", "#C9A96E", "#1A1A1A"],
    tags: ["skeleton", "rose gold", "automatic"],
  },
  {
    id: 5, brand: "Oscuro", name: "Stealth Black Tourbillon",
    price: 8999, oldPrice: 14999, discount: 40, rating: 4.8, reviews: 512,
    badge: "FLASH DEAL", stock: "Only 3 left", premium: true, emoji: "⌚", category: "Watches",
    description: "A tourbillon complication at an accessible luxury price point. The all-matte-black DLC case and matching dial give this watch an almost invisible, predatory presence on the wrist.",
    features: ["Manual-Wind Tourbillon", "DLC Black Coating", "Exhibition Caseback", "Anti-Reflective Crystal", "Alligator-Embossed Strap"],
    specs: { "Case": "43mm DLC Steel", "Movement": "Manual-Wind Tourbillon", "Frequency": "28,800 vph", "Crystal": "AR Sapphire", "Strap": "Black Alligator Embossed" },
    colors: ["#0A0A0A", "#1A1A1A", "#C9A96E"],
    tags: ["tourbillon", "black", "flash deal"],
  },
  {
    id: 6, brand: "Lune", name: "Moon Phase Diamond Bezel",
    price: 45000, oldPrice: 68000, discount: 34, rating: 5.0, reviews: 189,
    badge: "FLASH DEAL", stock: "Only 2 left", premium: true, emoji: "🌙", category: "Watches",
    description: "40 VVS diamonds encircle the bezel of this ultra-complication. The moon-phase indicator at 6 o'clock is accurate to one day in 122 years, set within a mother-of-pearl celestial dial.",
    features: ["40 VVS Diamond Bezel", "Moon Phase Complication", "Mother-of-Pearl Dial", "Automatic Movement", "Certified Fine Jewellery"],
    specs: { "Case": "36mm 18k White Gold", "Diamonds": "40 × VVS F-G", "Movement": "Automatic Moon Phase", "Dial": "Mother of Pearl", "Certification": "IGI Certified" },
    colors: ["#F5F5F5", "#C9A96E", "#4A90D9"],
    tags: ["diamonds", "moon phase", "gold"],
  },
  {
    id: 7, brand: "Solaris", name: "Titanium Solar Hybrid",
    price: 12800, oldPrice: 16500, discount: 22, rating: 4.5, reviews: 876,
    badge: null, stock: "In Stock", premium: false, emoji: "⌚", category: "Watches",
    description: "Aerospace-grade titanium fused with solar charging technology. Never wind, never replace a battery — the kinetic capacitor charges in any light and stores energy for 6 months.",
    features: ["Solar Hybrid Movement", "Grade 5 Titanium Case", "6-Month Power Reserve", "GPS Sync", "200m Water Resistance"],
    specs: { "Case": "45mm Grade 5 Titanium", "Movement": "Solar Hybrid GPS", "Power Reserve": "6 months", "Water Resistance": "200m", "Weight": "89g with strap" },
    colors: ["#8A9BA8", "#C9A96E", "#2D3E4E"],
    tags: ["titanium", "solar", "sport"],
  },
  {
    id: 8, brand: "Crest", name: "Heritage Skeleton Dial",
    price: 12299, oldPrice: 19999, discount: 38, rating: 4.9, reviews: 622,
    badge: "FLASH DEAL", stock: "In Stock", premium: false, emoji: "👑", category: "Watches",
    description: "Inspired by English pocket-watch heritage. The hand-bevelled bridges and rhodium-plated movement plates are visible through a sapphire crystal caseback and skeletonised dial.",
    features: ["Hand-Bevelled Movement", "Rhodium-Plated Plates", "Skeleton Dial", "Sapphire Crystal Front & Back", "Handmade in England"],
    specs: { "Case": "41mm Sterling Silver PVD", "Movement": "ETA 2824 Skeleton", "Finishing": "Côtes de Genève", "Crystal": "Double Sapphire", "Strap": "English Bridle Leather" },
    colors: ["#C0C0C0", "#B8A060", "#1A1A1A"],
    tags: ["skeleton", "heritage", "handmade"],
  },
  {
    id: 9, brand: "Astral", name: "Gold-Plated Tennis Bracelet",
    price: 8999, oldPrice: 12500, discount: 28, rating: 4.8, reviews: 1456,
    badge: "TRENDING", stock: "In Stock", premium: true, emoji: "💎", category: "Jewellery",
    description: "52 individually set cushion-cut cubic zirconia stones in an 18k gold-plated sterling silver setting. The double-safety clasp ensures it stays exactly where it belongs — on your wrist.",
    features: ["52 Cushion-Cut CZ", "18k Gold Plated 925 Silver", "Double-Safety Clasp", "Adjustable Length", "Tarnish Resistant"],
    specs: { "Material": "18k Gold Plated 925 Silver", "Stone": "AAA Cubic Zirconia", "Length": "18cm adjustable", "Width": "4mm", "Clasp": "Double-Safety Box" },
    colors: ["#C9A96E", "#F5F5F5", "#B8B8C8"],
    tags: ["gold", "bracelet", "cubic zirconia"],
  },
  {
    id: 10, brand: "Lumière", name: "Baroque Pearl Drop Earrings",
    price: 4299, oldPrice: 6999, discount: 39, rating: 4.7, reviews: 892,
    badge: null, stock: "In Stock", premium: false, emoji: "💍", category: "Jewellery",
    description: "Naturally irregular baroque freshwater pearls hand-knotted on 22k gold wire drops. No two pairs are identical — each earring is a singular natural sculpture.",
    features: ["Genuine Baroque Freshwater Pearls", "22k Gold-Plated Wire", "Hypoallergenic Posts", "Hand-Knotted", "Natural Lustre Certificate"],
    specs: { "Pearl": "8-10mm Baroque Freshwater", "Setting": "22k Gold-Plated 925 Silver", "Length": "4.5cm drop", "Post": "Hypoallergenic Surgical Steel", "Colour": "White / Peach / Lavender" },
    colors: ["#F0E8D0", "#C9A96E", "#D4A0B4"],
    tags: ["pearls", "earrings", "baroque"],
  },
  {
    id: 11, brand: "Noir", name: "Structured Calfskin Tote",
    price: 22999, oldPrice: 31000, discount: 26, rating: 4.9, reviews: 734,
    badge: null, stock: "In Stock", premium: true, emoji: "👜", category: "Bags",
    description: "Architectural purity in full-grain Italian calfskin. The structured silhouette holds its shape regardless of what you carry, while hand-stitched contrast seams signal deliberate craftsmanship.",
    features: ["Full-Grain Italian Calfskin", "Hand-Stitched Seams", "Solid Brass Hardware", "3 Internal Compartments", "Dust Bag Included"],
    specs: { "Material": "Full-Grain Italian Calfskin", "Hardware": "Solid Brass", "Dimensions": "36 × 28 × 14cm", "Strap Drop": "22cm / 42cm", "Lining": "Suede" },
    colors: ["#1A1A1A", "#7B4F3A", "#C9A96E"],
    tags: ["tote", "calfskin", "structured"],
  },
  {
    id: 12, brand: "Vega", name: "Mini Croc-Embossed Crossbody",
    price: 9499, oldPrice: 13999, discount: 32, rating: 4.6, reviews: 1108,
    badge: "TRENDING", stock: "In Stock", premium: false, emoji: "👛", category: "Bags",
    description: "Compact luxury for the modern urbanist. The croc-embossed vegan leather achieves a genuinely sumptuous texture, finished with 24k gold-tone chain hardware.",
    features: ["Croc-Embossed Vegan Leather", "24k Gold-Tone Chain", "Hidden Magnetic Clasp", "Detachable Chain Strap", "Eco-Certified Materials"],
    specs: { "Material": "Croc-Embossed Vegan Leather", "Hardware": "24k Gold-Tone", "Dimensions": "20 × 14 × 7cm", "Chain Length": "120cm", "Closure": "Magnetic Clasp" },
    colors: ["#1A1A1A", "#7B4F3A", "#C9A96E"],
    tags: ["crossbody", "croc", "vegan"],
  },
  {
    id: 13, brand: "Optique Noir", name: "Titanium Aviator Frames",
    price: 7999, oldPrice: 10500, discount: 24, rating: 4.7, reviews: 567,
    badge: null, stock: "In Stock", premium: false, emoji: "👓", category: "Eyewear",
    description: "Beta-titanium temples flex and spring back under any stress. The gold-tone bridge and adjustable nose pads ensure a custom fit. Compatible with prescription lenses.",
    features: ["Beta-Titanium Temples", "Gold-Tone Bridge", "Adjustable Nose Pads", "Prescription Compatible", "Italian Acetate Tips"],
    specs: { "Frame": "Beta Titanium", "Lens Width": "55mm", "Bridge": "17mm", "Temple": "145mm", "Weight": "18g" },
    colors: ["#C9A96E", "#C0C0C0", "#1A1A1A"],
    tags: ["titanium", "aviator", "prescription"],
  },
  {
    id: 14, brand: "Sol Noir", name: "Oversized Shield Sunglasses",
    price: 5299, oldPrice: 7500, discount: 29, rating: 4.8, reviews: 943,
    badge: "HOT DEAL", stock: "Low Stock", premium: false, emoji: "🕶️", category: "Eyewear",
    description: "Maximum UV protection meets maximum drama. The single-piece polycarbonate shield lens offers Category 4 UV400 coverage, while the acetate frame wraps with authority.",
    features: ["Cat 4 UV400 Lens", "Single-Piece Shield", "Acetate Frame", "Anti-Reflective Coating", "Polarised Option Available"],
    specs: { "Lens": "Polycarbonate UV400 Cat 4", "Frame": "Italian Acetate", "Lens Width": "72mm", "Bridge": "14mm", "Polarised": "Available" },
    colors: ["#1A1A1A", "#4A3A2A", "#8B5CF6"],
    tags: ["shield", "oversized", "polarised"],
  },
  {
    id: 15, brand: "AeroForge", name: "Titanium Sport Chronos",
    price: 6499, oldPrice: 10999, discount: 41, rating: 4.7, reviews: 731,
    badge: "FLASH DEAL", stock: "Only 5 left", premium: false, emoji: "🏆", category: "Watches",
    description: "Built for the athlete who refuses to compromise on style. Grade 5 titanium casing, 200m water resistance and a tachymeter bezel that computes lap speeds without a phone.",
    features: ["Grade 5 Titanium Case", "Tachymeter Bezel", "200m Water Resistance", "Luminous Hands", "Screw-Down Crown"],
    specs: { "Case": "46mm Grade 5 Titanium", "Movement": "Swiss Quartz Chrono", "Water Resistance": "200m", "Bezel": "Uni-Directional Tachymeter", "Crystal": "Mineral" },
    colors: ["#8A9BA8", "#EF4444", "#1A1A1A"],
    tags: ["sport", "titanium", "chronograph"],
  },
  {
    id: 16, brand: "Éclat", name: "Diamond Pavé Pendant Necklace",
    price: 16500, oldPrice: 22000, discount: 25, rating: 4.9, reviews: 418,
    badge: null, stock: "In Stock", premium: true, emoji: "💎", category: "Jewellery",
    description: "A teardrop pendant entirely paved with 88 VS1 diamonds in an 18k white gold micro-pavé setting. The 45cm box chain is crafted to the same exacting standard.",
    features: ["88 VS1 Diamonds", "18k White Gold", "Micro-Pavé Setting", "45cm Box Chain", "GIA Certified"],
    specs: { "Metal": "18k White Gold", "Diamonds": "88 × VS1 F-G", "Total Carat": "0.62ct", "Chain Length": "45cm", "Certification": "GIA" },
    colors: ["#F5F5F5", "#C9A96E", "#D0D0E0"],
    tags: ["diamonds", "pendant", "white gold"],
  },
];

export const CATEGORIES = [...new Set(ALL_PRODUCTS.map(p => p.category))];
export const BRANDS = [...new Set(ALL_PRODUCTS.map(p => p.brand))];

export function getProduct(id: number) {
  return ALL_PRODUCTS.find(p => p.id === id) ?? null;
}

export function getRelated(product: Product, limit = 4) {
  return ALL_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
