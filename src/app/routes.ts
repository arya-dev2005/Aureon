import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Orders } from "./pages/Orders";
import { Account } from "./pages/Account";
import { Wishlist } from "./pages/Wishlist";
import { NotFound } from "./pages/NotFound";

// Phase 1: Auth & Onboarding Pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Shipping } from "./pages/Shipping";
import { Legal } from "./pages/Legal";
import { Trust } from "./pages/Trust";
import { Addresses } from "./pages/Addresses";
import { Payments } from "./pages/Payments";
import { OrderTracking } from "./pages/OrderTracking";
import { MyReviews } from "./pages/MyReviews";

// Phase 2: VIP & Membership Pages
import { MembershipHub } from "./pages/MembershipHub";
import { LoyaltyDashboard } from "./pages/LoyaltyDashboard";
import { EarlyAccess } from "./pages/EarlyAccess";
import { Concierge } from "./pages/Concierge";
import { Tiers } from "./pages/Tiers";

// Phase 3 & 4: Marketplace & Live Commerce Pages
import { SellerStorefront } from "./pages/SellerStorefront";
import { BecomeSeller } from "./pages/BecomeSeller";
import { VendorDashboard } from "./pages/VendorDashboard";
import { LiveStreams } from "./pages/LiveStreams";
import { LiveAuctions } from "./pages/LiveAuctions";
import { FlashSales } from "./pages/FlashSales";
import { LiveChat } from "./pages/LiveChat";

// Phase 5: Admin Control Center Pages
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "orders", Component: Orders },
      { path: "account", Component: Account },
      { path: "wishlist", Component: Wishlist },
      
      // Phase 1 Routes
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "verify-email", Component: VerifyEmail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "shipping", Component: Shipping },
      { path: "privacy", Component: Legal },
      { path: "terms", Component: Legal },
      { path: "cookies", Component: Legal },
      { path: "trust", Component: Trust },
      { path: "account/addresses", Component: Addresses },
      { path: "account/payments", Component: Payments },
      { path: "account/orders/:id/track", Component: OrderTracking },
      { path: "account/reviews", Component: MyReviews },

      // Phase 2 Routes
      { path: "membership", Component: MembershipHub },
      { path: "membership/loyalty", Component: LoyaltyDashboard },
      { path: "membership/early-access", Component: EarlyAccess },
      { path: "membership/concierge", Component: Concierge },
      { path: "membership/tiers", Component: Tiers },

      // Phase 3 & 4 Routes
      { path: "seller/:sellerId", Component: SellerStorefront },
      { path: "become-seller", Component: BecomeSeller },
      { path: "vendor/dashboard", Component: VendorDashboard },
      { path: "live", Component: LiveStreams },
      { path: "live/auctions", Component: LiveAuctions },
      { path: "flash-sales", Component: FlashSales },
      { path: "chat", Component: LiveChat },

      // Phase 5 Routes
      { path: "admin/dashboard", Component: AdminDashboard },

      { path: "*", Component: NotFound },
    ],
  },
]);
