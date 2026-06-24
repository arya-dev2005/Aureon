================================================================================
3D EFFECTS & LUXURY ANIMATIONS ADD-ON PROMPT FOR FIGMA AI
================================================================================

CONTEXT: You are enhancing an EXISTING premium dark e-commerce homepage that 
already has the following base design:
- Dark theme (#0A0A0F background, #12121A cards, #C9A96E gold accents)
- Next.js 16 + React + Tailwind CSS + ShadCN UI stack
- Product cards, hero banner, navigation, category grid already built
- Clean, minimal luxury aesthetic

Your task: Add MAGNIFICENT 3D effects and cinematic animations that elevate 
the existing design from "good" to "breathtaking." Every effect must feel 
purposeful, not decorative. Think: Apple product reveals, luxury watch 
showcases, high-end automotive configurators.

================================================================================
TECHNOLOGY CONSTRAINTS (CRITICAL)
================================================================================

The implementation stack is:
- React 18+ with hooks
- Next.js 16 App Router
- Tailwind CSS v4
- Framer Motion (primary animation library)
- GSAP + ScrollTrigger (scroll-driven animations)
- Three.js / React Three Fiber (3D elements only where necessary)
- Lenis (smooth scroll)
- CSS 3D transforms (preferred for simple effects)

NO heavy libraries. Performance budget: 60fps on mid-range devices.

================================================================================
1. HERO SECTION 3D TRANSFORMATION
================================================================================

EFFECT: "Floating Product Showcase"

Current State: Static hero with text left, product image right.

Enhancement:
- The hero product image (right side) should exist in a 3D perspective space.
- On mouse move over the hero section, the product tilts in 3D following the cursor.
- Tilt range: X-axis ±15°, Y-axis ±15° (subtle, not dizzying).
- Add a "floating" animation: gentle sine-wave vertical motion (translateY ±10px, 
  4s duration, infinite, ease-in-out).
- Product casts a dynamic shadow that shifts opposite to the tilt direction.
- Behind the product: 3-5 thin gold wireframe rings (torus shapes) that rotate 
  slowly on different axes (CSS 3D transforms, not Three.js).
- On page load: Product scales from 0.8 to 1.0 with a spring bounce (damping: 20).
  Text elements stagger in from left (opacity 0→1, translateX -30px→0, 
  stagger 0.1s per element).

Implementation:
- Use CSS `perspective: 1000px` on the hero container.
- Product wrapper: `transform-style: preserve-3d`.
- Mouse tracking via `onMouseMove` with `requestAnimationFrame` throttle.
- Wireframe rings: Pure CSS with `border-radius: 50%`, `border: 1px solid rgba(201,169,110,0.15)`, 
  animated with `@keyframes rotateX/Y/Z`.

================================================================================
2. PRODUCT CARDS — 3D FLIP & HOVER DEPTH
================================================================================

EFFECT: "Glassmorphic 3D Card Tilt"

Current State: Standard cards with hover lift (translateY -4px).

Enhancement:
- Each card exists in a 3D space with `perspective: 800px` on the grid container.
- On hover: Card tilts toward the cursor (max ±8° on X and Y axes).
- A "glare" effect sweeps across the card surface on hover — a white gradient 
  at 10% opacity that moves from top-left to bottom-right over 0.6s.
- Card image pops forward in Z-space (translateZ 30px) on hover.
- Card border glows gold (box-shadow: 0 0 20px rgba(201,169,110,0.15)) on hover.
- On mouse leave: Card smoothly returns to flat (0.4s cubic-bezier(0.4,0,0.2,1)).
- "Add to Cart" button slides up from bottom of card on hover (translateY 20px→0, 
  opacity 0→1).
- For "Premium" cards: Add a subtle gold shimmer sweep across the border 
  (keyframes, 3s infinite, linear).

Implementation:
- Track mouse position relative to each card's center.
- Calculate rotation: `rotateX = (y - centerY) / 10`, `rotateY = (centerX - x) / 10`.
- Glare: Absolute positioned div with `background: linear-gradient(135deg, transparent 40%, 
  rgba(255,255,255,0.1) 50%, transparent 60%)`, animated with `transform: translateX(-100% to 100%)`.

================================================================================
3. CATEGORY QUICK LINKS — 3D ORBIT CAROUSEL
================================================================================

EFFECT: "Orbital Category Ring"

Current State: Horizontal scrollable category icons.

Enhancement:
- Transform into a 3D horizontal carousel with depth.
- Center category is full size (scale 1.0), opacity 1.0.
- Side categories are smaller (scale 0.85), pushed back in Z-space (translateZ -50px), 
  opacity 0.6, and slightly rotated (rotateY ±15°).
- On scroll/drag: Categories rotate in a circular path (CSS 3D transform: rotateY + translateZ).
- Active category has a gold glow ring beneath it (pulse animation, 2s infinite).
- On click: Selected category scales up with a spring animation and the ring 
  "snaps" to center.
- Auto-rotate slowly when idle (every 4s, snap to next category).

Implementation:
- Container: `perspective: 1200px`, `transform-style: preserve-3d`.
- Each item: `transform: rotateY(angle) translateZ(300px)` where angle = (index * 360/count).
- Drag interaction: Update rotation angle based on drag delta.
- Use Framer Motion `useMotionValue` and `useTransform` for smooth physics.

================================================================================
4. SCROLL-TRIGGERED 3D PARALLAX SECTIONS
================================================================================

EFFECT: "Cinematic Depth Scroll"

Enhancement for all page sections:
- Each section has 3 depth layers that move at different speeds on scroll:
  - Background decorative elements: 0.3x scroll speed (slowest, deep background)
  - Main content: 1.0x scroll speed (normal)
  - Floating accent elements: 1.5x scroll speed (fastest, foreground)
- Gold geometric shapes (circles, hexagons) float in the background of each section.
  They rotate slowly and parallax at 0.2x speed.
- Section headers: Animate in with a 3D flip (rotateX 90°→0°, opacity 0→1) 
  when entering viewport (GSAP ScrollTrigger).
- Product grid rows: Stagger in with 3D perspective — each row comes from 
  translateZ(-100px) and rotateX(10°) to normal position, stagger 0.15s per row.
- "Premium Collection Banner": Full-width image with a 3D depth map effect 
  (mouse moves shift layers slightly for fake 3D depth).

Implementation:
- GSAP ScrollTrigger for all scroll-driven animations.
- Parallax: `gsap.to(element, { y: -100, ease: "none", scrollTrigger: { scrub: true } })`.
- 3D flip headers: `gsap.from(header, { rotateX: 90, opacity: 0, duration: 0.8, 
  scrollTrigger: { trigger: section, start: "top 80%" } })`.

================================================================================
5. PRODUCT IMAGE GALLERY — 3D COVER FLOW
================================================================================

EFFECT: "Cinematic Product Carousel"

Enhancement for any product showcase section:
- 3D cover flow style carousel for featured products.
- Center product: Full size, front-facing, sharp focus.
- Side products: Rotated 45° away (rotateY ±45°), pushed back (translateZ -200px), 
  blurred slightly (filter: blur(2px)), opacity 0.5.
- Navigation: Drag to rotate, or click arrows to snap to next product.
- On product change: Current product scales down and rotates away, new product 
  scales up and rotates to center (0.6s spring animation).
- Reflection: Each product has a subtle floor reflection (transform: scaleY(-1), 
  mask-image: linear-gradient(transparent, black), opacity 0.15).
- Auto-play: Every 5 seconds, with pause on hover.

Implementation:
- Framer Motion `AnimatePresence` + `motion.div` with `rotateY`, `translateZ`, `scale`.
- Reflection: CSS pseudo-element with `transform: scaleY(-1) translateY(-100%)`.

================================================================================
6. LOADING & TRANSITION STATES — 3D SKELETONS
================================================================================

EFFECT: "Dimensional Loading Experience"

Enhancement for loading states:
- Skeleton cards are not flat — they have a subtle 3D depth.
- Shimmer animation moves diagonally across skeletons (not just left-to-right).
- On data load: Skeleton cards "flip" in 3D to reveal real content 
  (rotateY 90°→0°, 0.5s, stagger 0.05s per card).
- Page transitions: When navigating between pages, the current page content 
  "folds away" in 3D (rotateX -90° + opacity 0) while new page unfolds 
  (rotateX 90°→0° + opacity 0→1).
- Loading spinner: 3D rotating gold ring (not a flat circle). Two rings 
  rotating in opposite directions at different speeds.

Implementation:
- Skeleton: `transform: rotateX(5deg)` for subtle depth.
- Page transition: Framer Motion `AnimatePresence` with custom `variants` for 
  enter/exit 3D transforms.
- Spinner: CSS `border-radius: 50%`, `border-top: 2px solid #C9A96E`, 
  `border-right: 2px solid transparent`, `@keyframes spin`.

================================================================================
7. INTERACTIVE 3D BADGES & MICRO-ELEMENTS
================================================================================

EFFECT: "Living UI Elements"

Enhancement for small interactive elements:
- "Deal" badges: Slight 3D tilt on hover (rotateX ±5°), gold shimmer sweep 
  across surface (keyframes, 2s infinite).
- "Premium" badge: Subtle floating animation (translateY ±3px, 3s infinite) 
  + gold glow pulse.
- Rating stars: On hover, stars fill sequentially with a 3D pop (scale 1.2→1.0 
  with spring) from left to right.
- Cart icon: When item added, the cart icon does a 3D "bounce" (scale 1.0→1.3→1.0 
  + rotateZ -10°→10°→0°) and the badge count "rolls" like a slot machine.
- Notification toasts: Slide in from right with a 3D perspective tilt 
  (rotateY -15°→0°), then settle flat.

Implementation:
- Framer Motion `whileHover`, `whileTap`, `animate` props.
- Cart bounce: `animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}`.
- Toast: `initial={{ x: 100, rotateY: -15, opacity: 0 }}` → `animate={{ x: 0, rotateY: 0, opacity: 1 }}`.

================================================================================
8. HERO TEXT — 3D TYPOGRAPHY EFFECTS
================================================================================

EFFECT: "Dimensional Typography"

Enhancement for hero headlines:
- Hero headline text has a subtle 3D extrusion effect.
- Method: Multiple text layers stacked with slight offset (1px per layer, 5 layers total).
  - Layer 1 (back): Darkest gold (#8B7355)
  - Layer 2-4: Mid gold (#A68B5B)
  - Layer 5 (front): Bright gold (#C9A96E)
- On page load: Each letter staggers in with a 3D flip (rotateY 90°→0°) 
  and slight translateZ pop (0→20px). Duration: 0.05s per letter, stagger 0.03s.
- On mouse move over headline: Text subtly tilts toward cursor (max ±3°).
- Subheadline: Fades in with a blur-to-sharp effect (filter: blur(10px)→blur(0), 
  opacity 0→1, 0.8s, delay 0.5s after headline).

Implementation:
- 3D text: CSS `text-shadow` with multiple layers: 
  `text-shadow: 1px 1px 0 #8B7355, 2px 2px 0 #A68B5B, 3px 3px 0 #A68B5B, 
  4px 4px 0 #A68B5B, 5px 5px 0 #C9A96E`.
- Letter animation: Split text into spans, animate each with Framer Motion.

================================================================================
9. AMBIENT BACKGROUND — 3D PARTICLE FIELD
================================================================================

EFFECT: "Luxury Particle Atmosphere"

Enhancement for page backgrounds:
- Very subtle, sparse gold particles floating in the background of the hero 
  and premium sections.
- Particles: Small circles (2-4px), gold color at 10-20% opacity.
- Movement: Slow drift upward with slight horizontal sine-wave motion.
- Depth: Particles exist at different Z-depths (some closer, larger, faster; 
  some farther, smaller, slower).
- Interaction: On mouse move, particles gently repel away from cursor 
  (subtle, 20px radius, 0.3s ease-out).
- Performance: Max 50 particles, CSS animations only (no canvas/Three.js 
  for this simple effect). Use `will-change: transform`.
- Only visible in hero and premium banner sections, not on product grids 
  (to avoid distraction from content).

Implementation:
- Generate 50 divs with random positions, sizes, and animation delays.
- CSS `@keyframes float` with `translateY` and `translateX`.
- Mouse repel: Calculate distance from cursor, apply inverse translation 
  via CSS custom properties updated with JS.

================================================================================
10. SCROLL PROGRESS — 3D INDICATOR
================================================================================

EFFECT: "Cylindrical Scroll Progress"

Enhancement for scroll feedback:
- Replace flat scroll progress bar with a 3D cylindrical progress indicator.
- A thin gold ring (circular progress) fixed at the bottom-right of viewport.
- Ring fills as user scrolls (stroke-dashoffset animation).
- Ring has a subtle 3D rotation (rotateX 60°) so it looks like a cylinder segment.
- Percentage text in center: "42%" in gold, 12px, Weight 600.
- On section change: Ring briefly pulses (scale 1.0→1.1→1.0, 0.3s).
- Click on ring: Smooth scroll to top with Lenis.

Implementation:
- SVG circle with `stroke-dasharray` and `stroke-dashoffset`.
- CSS `transform: rotateX(60deg)` on the SVG container.
- GSAP ScrollTrigger updates `stroke-dashoffset` based on scroll progress.

================================================================================
ANIMATION TIMING & EASING REFERENCE
================================================================================

- Micro-interactions: 0.2s, ease-out
- Card hover: 0.4s, cubic-bezier(0.4, 0, 0.2, 1)
- Page transitions: 0.5s, cubic-bezier(0.22, 1, 0.36, 1)
- Scroll reveals: 0.8s, cubic-bezier(0.16, 1, 0.3, 1)
- 3D rotations: 0.6s, spring(1, 0.8, 10, 0) for Framer Motion
- Ambient loops: 4s-8s, ease-in-out, infinite
- Stagger delays: 0.05s-0.15s per item

PERFORMANCE RULES:
- Use `transform` and `opacity` only for animations (GPU-accelerated).
- Apply `will-change: transform` only during active animations.
- Use `contain: layout style paint` on animated containers.
- Lazy-load 3D elements below the fold (IntersectionObserver).
- Respect `prefers-reduced-motion`: disable 3D tilts, reduce parallax, 
  simplify transitions to simple fades.

================================================================================
DELIVERABLES FOR FIGMA AI
================================================================================

1. 3D Effect Annotations:
   - Overlay each component with animation specs (timing, easing, transform values).
   - Show "before/after" states for hover effects.

2. Animation Prototype:
   - Interactive prototype showing all 3D hover effects.
   - Scroll demo with parallax and reveal animations.
   - Page transition demo.

3. Developer Handoff:
   - Animation values table (duration, easing, transform, delay).
   - CSS code snippets for 3D transforms.
   - Framer Motion variant objects for each component.
   - GSAP ScrollTrigger configuration examples.

================================================================================