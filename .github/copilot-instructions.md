# AUREON — Copilot Context Instructions

## Project Overview
AUREON is a premium dark-themed luxury e-commerce frontend built with:
- React + Vite + TypeScript
- Single-repo client-side architecture (all source under `src/`)
- React Router (v7) in `src/app/routes.ts`
- Tailwind CSS (Utility-first CSS styling)
- Framer Motion (`motion/react`) + GSAP (Animations)
- Lucide React (Icons)

## Architecture Rules
1. **Frontend Architecture**: Standalone Single Page Application (SPA).
2. **Routing Setup**: Standard browser router configured in [routes.ts](file:///c:/Users/ADMIN/CFA/Aureon/src/app/routes.ts). All views are housed under the main [Layout.tsx](file:///c:/Users/ADMIN/CFA/Aureon/src/app/components/Layout.tsx) layout wrapper.
3. **Data Mocking**: Authentication states, payouts, catalog inventory, streams, and tracking are simulated on the client side using components state, `sessionStorage` or local mock data.

## Code Style
- **TypeScript**: Strict mode enabled. Avoid `any`. Use custom types and interfaces.
- **Imports**: Group: React → Router/Hooks → External → Components/Views → Types/Data.
- **Styling**: Tailwind CSS classes combined with design system constants.
- **Theme Invariants**:
  - Background: `bg-[#0A0A0F]` (Deep Void Black)
  - Surface: `bg-[#12121A]` (Sleek Charcoal)
  - Cards: `bg-[#1A1A24]` (Dark Surface)
  - Accents: `text-[#C9A96E]`, `border-[#C9A96E]` (Champagne Gold)
  - Text Primary: `text-[#F8F8FC]` (Bright White-Silver)
  - Text Secondary: `text-[#A1A1AA]`, `text-[#71717A]`
- **Animations**: Framer Motion for interactive page states and toggles; GSAP for cinematic scroll-driven events. Respect `prefers-reduced-motion`.

## File Naming Conventions
- Component Files: PascalCase (e.g., `ProductCard3D.tsx`)
- View Pages: PascalCase (e.g., `AdminDashboard.tsx`)
- Context & Stores: camelCase (e.g., `StoreContext.tsx`)
- Styles: standard css (e.g., `index.css`)
