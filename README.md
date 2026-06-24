![Aureon Social Preview](assets/Aureon_Social_Preview.png)

# AUREON — Premium Dark Luxury E-Commerce Platform

Aureon is a state-of-the-art, high-fidelity luxury e-commerce frontend designed for high-net-worth individuals and elite collectors. Built with a unified design language centered around deep void black surfaces, champagne gold accents, glassmorphic interfaces, and premium micro-animations.

---

## 🌟 Executive Summary & Vision

As an e-commerce platform, Aureon bridges the gap between high-end physical boutique shopping and elite digital convenience. The application provides three distinct entry layers:
1. **Curated Customer Marketplace**: Featuring editorial collections, interactive 3D product showcases, early drops, live streams, and personal concierge messaging channels.
2. **Merchant Partner Portal**: Allowing verified luxury vendors to audit catalogs, adjust unit stock counts, and request outstanding balances.
3. **Platform Administrative Console**: Providing high-level insights, log streaming audits, merchant registrations, and system flag settings.

---

## 🛠️ Technology Stack

* **Build & Development Tooling**: Vite + TypeScript (TSC) for quick compilation.
* **Component Layer**: React (v19) utilizing React Router (v7) for nested route layouts.
* **Styling & Theme**: Tailwind CSS combined with custom luxury CSS variables.
* **Icons**: Lucide React for consistent vector symbols.
* **Animations**: Framer Motion (`motion/react`) and GSAP for scroll-based luxury elements.

---

## 🎨 Core Design System

To preserve the brand's premium identity, developers must strictly adhere to the following color palette and typography hierarchy:
* **Background Color**: `#0A0A0F` (Deep Void Black)
* **Surface Overlay**: `#12121A` (Sleek Charcoal)
* **Card Boundaries**: `#1A1A24` (High-contrast Dark Surface)
* **Branding Accents**: `#C9A96E` (Champagne Gold)
* **Primary Typography**: Space Grotesk (Display Headers) and Inter (Body copy).
* **Price Typography**: Playfair Display (Luxury serif).
* **Hover Micro-animations**: Subtle gold-tinted drop shadows, glare sweep animations, and card tilts.

---

## 📂 Repository Directory Structure

The nested React Router routes are mapped dynamically as follows:

```
src/
├── app/
│   ├── components/            # Shared UI components
│   │   ├── CustomCursor.tsx   # Custom luxury cursor logic
│   │   ├── Layout.tsx         # Site layout containing navigation & footer
│   │   └── ProductCard3D.tsx  # Card with 3D tilts and gold glow effects
│   ├── data/                  # Mock databases and schema definitions
│   │   └── products.ts        # Luxury product catalogue dataset
│   ├── pages/                 # High-fidelity page components
│   │   ├── Home.tsx           # Editorial landing page
│   │   ├── Products.tsx       # Search, filter, and categorised product grids
│   │   ├── ProductDetail.tsx  # Immersive product page
│   │   ├── Cart.tsx           # Order basket review
│   │   ├── Checkout.tsx       # High-fidelity secure payment forms
│   │   ├── Orders.tsx         # Interactive customer orders ledger
│   │   ├── OrderTracking.tsx  # Interactive order pipeline status maps
│   │   ├── Login.tsx          # Public customer login
│   │   ├── Register.tsx       # Customer registration with password validations
│   │   ├── AdminDashboard.tsx # Platform administration dashboard
│   │   ├── VendorDashboard.tsx# Partner catalog & payouts board
│   │   └── ...
│   └── routes.ts              # Unified React Router routing setup
```

---

## 🔑 Administrator & Merchant Partner Access

The admin and vendor dashboard portals are secured with mock credentials for verification:

### 🛡️ Administrative Console
* **Route**: `/admin/dashboard`
* **Credentials**:
  * Email: `admin@aureon.com`
  * Password: `admin123`
* **Key Features**: Tabbed workspace supporting platform KPIs, live order log streaming, merchant application approvals, and system maintenance toggles.

### 🏢 Vendor Partner Portal
* **Route**: `/vendor/dashboard`
* **Credentials**:
  * Email: `vendor@aureon.com`
  * Password: `vendor123`
* **Key Features**: Sales statistics audit, active catalog adjustments (price views, dynamic stock updates, new item onboarding modal), and payout remittance history.

---

## ⚡ Developer Setup & Script Pipelines

Ensure you have [Node.js](https://nodejs.org/) installed before proceeding.

### 1. Installation
Install the project dependencies using npm:
```bash
npm install
```

### 2. Run Local Development Server
Start the local Vite development server:
```bash
npm run dev
```
The server will boot locally at `http://localhost:5173/`.

### 3. TypeScript Compilation Checks
Validate compile-time type safety before creating pull requests:
```bash
npx.cmd tsc --noEmit
```

### 4. Build Production Bundle
Generate highly optimized client-side assets inside the `/dist` directory:
```bash
npm run build
```

---

## 🌳 Professional Branch Workflow

Aureon utilizes a git strategy mirroring production release lines:
1. **`main` (Production)**: Always stable, production-ready release line.
2. **`staging` (Pre-release)**: Mirror of production used for QA checks.
3. **`develop` (Integration)**: Active development line where new features are aggregated.

To deploy hotfixes or features, create short-lived feature branches (e.g. `feature/<name>` or `bugfix/<name>`) from `develop` and submit a Pull Request to merge back.
