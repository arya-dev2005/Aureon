<p align="center">
  <img src="assets/Aureon_Social_Preview.png" alt="Aureon Social Preview" width="100%">
</p>

# AUREON — Curated for the Exceptional
> **Premium E-Commerce Platform Curated for the Modern Luxury Marketplace**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF007F?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Mission

AUREON is a **premium e-commerce platform** curated for the modern luxury marketplace. It delivers a high-fidelity visual experience optimized for elite collectors and high-net-worth clientele. Featuring a customer marketplace, specialized VIP tiers, live streaming, interactive auctions, and robust merchant/admin dashboards.

### Key Product Pillars
* **Dark Luxury Visual System**: Deep void black backgrounds (`#0A0A0F`), sleek slate surfaces (`#12121A`), and refined champagne gold highlights (`#C9A96E`).
* **VIP & Membership Club**: Tabbed point dashboards, milestone status grids, and premium concierge chat interfaces.
* **Interactive Live Commerce**: Simulated real-time auction bidding matrixes, countdown drop schedules, and live video commerce displays.
* **Integrated Vendor Portals**: A self-contained dashboard enabling merchants to audit sales, adjust stock volumes directly, register catalog additions, and request payouts.
* **Administrative Console**: Live logs audit tracker, system maintenance config control flags, and merchant registration approval decks.

---

## 🏗️ Platform Architecture

```
┌────────────────────────────────────────────────────────┐
│                     AUREON PLATFORM                     │
├───────────────────────────┬────────────────────────────┤
│         FRONTEND          │        CI/CD ENGINE        │
│         (Vercel)          │      (GitHub Actions)      │
│                           │                            │
│   React SPA (Vite)        │   ci.yml (Compilation)     │
│   React Router v7         │   deploy-web.yml (Vercel)  │
│   Tailwind CSS v4         │   deploy-staging.yml       │
│   Framer Motion + GSAP    │   security.yml (Audit)     │
└───────────────────────────┴────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```
Aureon/
├── .github/
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── CODEOWNERS             # File ownership configuration
│   ├── copilot-instructions.md# Context guide for GitHub Copilot
│   ├── pull_request_template.md
│   └── workflows/             # GitHub Actions CI/CD workflows
│       ├── ci.yml
│       ├── deploy-staging.yml
│       ├── deploy-web.yml
│       └── security.yml
├── assets/                    # Media assets
├── dist/                      # Production built output
├── src/
│   ├── app/
│   │   ├── components/        # Layout & custom interactive elements
│   │   ├── data/              # Mock database arrays (products, reviews)
│   │   ├── pages/             # Portal pages & dashboard views
│   │   ├── routes.ts          # Unified Router definitions
│   │   └── main.tsx           # Application entry point
├── render.yaml                # Render static hosting configuration
├── package.json               # Package script lists & dependencies
└── index.html                 # HTML viewport entry
```

---

## 🔑 Secure Dashboard Access

Both portal sites are protected by mock validation checks. Authenticate using the coordinates below:

### 🛡️ Administrative Console
* **Route**: `/admin/dashboard`
* **Credentials**:
  * Email: `admin@aureon.com`
  * Password: `admin123`
* **Features**: Live platform logs, pending vendor approvals, and system multiplier configuration switches.

### 🏢 Vendor Partner Portal
* **Route**: `/vendor/dashboard`
* **Credentials**:
  * Email: `vendor@aureon.com`
  * Password: `vendor123`
* **Features**: Dynamic inventory stock adjusters, payout ledger requests, and catalog product creation.

---

## ⚡ Quick Start & Development

### Installation
Deploy dependencies locally using npm:
```bash
npm install
```

### Start Development Server
Boot Vite local hot-reloader:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) inside your browser.

### Type-Check Validation
Run the TypeScript validation tool:
```bash
npx tsc --noEmit
```

### Production Build
Generate minified static site bundles inside the `/dist` directory:
```bash
npm run build
```

---

## 🌳 Branching Workflow Guidelines
Aureon maintains three primary long-lived branches:
1. **`main` (Production)**: Always stable and mirrors the live deployment.
2. **`staging` (Pre-production)**: Used for staging deployment verification.
3. **`develop` (Integration)**: Active development line for merges.
---
