import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

interface StoreCtx {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (product: Product, qty?: number, color?: string) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    // seed with one item so cart looks lived-in
    {
      product: {
        id: 1, brand: "Aurum", name: "Carbon Fibre Chronograph Elite",
        price: 24999, oldPrice: 34999, discount: 29, rating: 4.9, reviews: 2841,
        badge: "TRENDING", stock: "In Stock", premium: true, emoji: "⌚", category: "Watches",
        description: "", features: [], specs: {}, colors: [], tags: [],
      },
      quantity: 1,
      color: "#1A1A1A",
    },
  ]);
  const [wishlist, setWishlist] = useState<number[]>([3, 9]);

  const addToCart = (product: Product, qty = 1, color?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { product, quantity: qty, color }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: number) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const isWishlisted = (id: number) => wishlist.includes(id);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, isWishlisted, cartCount, cartTotal }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
