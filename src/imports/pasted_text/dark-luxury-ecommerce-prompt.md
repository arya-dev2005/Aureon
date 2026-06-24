================================================================================
PREMIUM DARK E-COMMERCE UI/UX DESIGN PROMPT FOR FIGMA AI
================================================================================

ROLE & CONTEXT
--------------
You are a world-class Principal UI/UX Designer and Design Systems Architect with 
15+ years of experience crafting premium digital commerce experiences for 
Fortune 500 brands. You specialize in dark-mode luxury interfaces, high-contrast 
visual hierarchies, and conversion-optimized e-commerce design systems. Your work 
has been featured in Awwwards, Behance, and Dribbble. You understand the 
psychology of luxury digital shopping: trust, aspiration, clarity, and frictionless 
conversion.

BRAND POSITIONING
-----------------
Design a premium dark-themed e-commerce platform that rivals the sophistication 
of Flipkart Black, Amazon Premium, and luxury brand digital storefronts. This is 
NOT a mass-market design — it is a curated, elevated shopping experience for 
discerning customers who expect excellence in every pixel.

DESIGN PHILOSOPHY
-----------------
"Dark Luxury Commerce" — Where opulence meets usability. Every interaction should 
feel like unboxing a premium product. The interface should whisper exclusivity while 
screaming functionality.

================================================================================
COLOR SYSTEM (Dark Luxury Palette)
================================================================================

PRIMARY COLORS:
- Background Base:        #0A0A0F (Deep Void Black)
- Background Elevated:      #12121A (Surface Layer)
- Background Card:          #1A1A24 (Card/Panel Surface)
- Background Hover:         #222230 (Interactive Hover State)

ACCENT COLORS:
- Primary Accent:           #C9A96E (Champagne Gold — for CTAs, highlights, badges)
- Primary Accent Hover:     #D4B87A (Lighter Gold — hover state)
- Secondary Accent:         #8B5CF6 (Electric Violet — for deals, urgency)
- Success:                  #22C55E (Emerald — order confirmation, stock)
- Warning:                  #F59E0B (Amber — low stock, alerts)
- Error:                    #EF4444 (Crimson — errors, out of stock)
- Info:                     #3B82F6 (Royal Blue — information, links)

TEXT COLORS:
- Text Primary:             #F8F8FC (Pure White with warmth)
- Text Secondary:           #A1A1AA (Muted Silver — descriptions, meta)
- Text Tertiary:            #71717A (Dim Grey — placeholders, disabled)
- Text Inverse:             #0A0A0F (For light backgrounds/buttons)

BORDER & DIVIDER:
- Border Subtle:            rgba(255, 255, 255, 0.06)
- Border Default:           rgba(255, 255, 255, 0.10)
- Border Focus:             #C9A96E (Gold focus rings)
- Divider:                  rgba(255, 255, 255, 0.05)

GRADIENTS:
- Hero Gradient:            linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0F0F1A 100%)
- Card Glow:                linear-gradient(180deg, rgba(201,169,110,0.08) 0%, transparent 100%)
- CTA Gradient:             linear-gradient(135deg, #C9A96E 0%, #D4B87A 50%, #C9A96E 100%)
- Deal Badge:               linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)

================================================================================
TYPOGRAPHY SYSTEM
================================================================================

FONT FAMILY:
- Primary:                  "Inter" or "Geist" — Clean, geometric, highly legible
- Display:                  "Space Grotesk" or "Clash Display" — For headlines, hero text
- Accent:                   "Playfair Display" — For luxury product names, prices

TYPE SCALE:
- Display 1 (Hero):         72px / 80px line-height / -0.02em tracking / Weight 700
- Display 2 (Section):      48px / 56px line-height / -0.01em tracking / Weight 600
- H1 (Page Title):          36px / 44px line-height / -0.01em tracking / Weight 600
- H2 (Card Title):          24px / 32px line-height / 0em tracking / Weight 600
- H3 (Subsection):          20px / 28px line-height / 0em tracking / Weight 500
- Body Large:               18px / 28px line-height / 0em tracking / Weight 400
- Body:                     16px / 24px line-height / 0em tracking / Weight 400
- Body Small:               14px / 20px line-height / 0.01em tracking / Weight 400
- Caption:                  12px / 16px line-height / 0.02em tracking / Weight 500 / UPPERCASE
- Price Display:            28px / 36px line-height / -0.02em tracking / Weight 700 / Accent Font

================================================================================
SPACING SYSTEM (8px Base Grid)
================================================================================

- xs:   4px
- sm:   8px
- md:   16px
- lg:   24px
- xl:   32px
- 2xl:  48px
- 3xl:  64px
- 4xl:  96px
- 5xl:  128px

Border Radius:
- sm:   6px  (Buttons, badges, small elements)
- md:   12px (Cards, inputs, modals)
- lg:   16px (Large cards, panels)
- xl:   24px (Hero sections, feature cards)
- full: 9999px (Pills, avatars, circular buttons)

================================================================================
SHADOW SYSTEM (Dark Mode Optimized)
================================================================================

- shadow-sm:     0 1px 2px rgba(0,0,0,0.3), 0 0 1px rgba(201,169,110,0.05)
- shadow-md:     0 4px 12px rgba(0,0,0,0.4), 0 0 2px rgba(201,169,110,0.08)
- shadow-lg:     0 8px 24px rgba(0,0,0,0.5), 0 0 4px rgba(201,169,110,0.10)
- shadow-xl:     0 16px 48px rgba(0,0,0,0.6), 0 0 8px rgba(201,169,110,0.12)
- shadow-glow:   0 0 20px rgba(201,169,110,0.15), 0 0 40px rgba(201,169,110,0.08)
- shadow-focus:  0 0 0 3px rgba(201,169,110,0.25), 0 0 0 1px rgba(201,169,110,0.50)

================================================================================
COMPONENT SPECIFICATIONS
================================================================================

--- BUTTONS ---

PRIMARY CTA (Gold):
- Background:    Gradient CTA (Champagne Gold)
- Text:          #0A0A0F (Black)
- Font:          16px / Weight 600 / 1px letter-spacing
- Padding:       14px 32px
- Border Radius: 12px
- Shadow:        shadow-md + subtle gold glow
- Hover:         Scale 1.02, brightness 1.1, shadow-lg
- Active:        Scale 0.98, brightness 0.95
- Icon:          Right-aligned arrow, slides right 4px on hover

SECONDARY CTA (Outline):
- Background:    transparent
- Border:        1px solid rgba(201,169,110,0.4)
- Text:          #C9A96E (Gold)
- Hover:         Background rgba(201,169,110,0.08), border opacity 1.0

GHOST CTA:
- Background:    transparent
- Text:          #F8F8FC (White)
- Hover:         Background rgba(255,255,255,0.06)

ICON BUTTON (Circular):
- Size:          44px x 44px
- Background:    #1A1A24
- Border:        1px solid rgba(255,255,255,0.08)
- Hover:         Background #222230, border rgba(201,169,110,0.3)
- Icon:          20px, stroke-width 2px, color #A1A1AA
- Hover Icon:    Color #F8F8FC

--- PRODUCT CARDS ---

Standard Product Card:
- Background:    #12121A
- Border:        1px solid rgba(255,255,255,0.06)
- Border Radius: 16px
- Padding:       0 (image bleeds to edge) + 20px (content area)
- Shadow:        shadow-sm
- Hover:         Border rgba(201,169,110,0.2), shadow-lg, translateY(-4px)
- Transition:    all 0.4s cubic-bezier(0.4, 0, 0.2, 1)

Card Image Area:
- Aspect Ratio:  1:1 (square) or 3:4 (portrait)
- Background:    Gradient overlay at bottom (transparent to #12121A)
- Object Fit:    cover
- Hover:         Scale 1.05, brightness 1.05

Card Content:
- Brand Name:    12px / UPPERCASE / #A1A1AA / Weight 500 / 2px letter-spacing
- Product Name:  16px / #F8F8FC / Weight 500 / 2-line clamp
- Rating:        Star icon (#C9A96E) + "4.8" + "(2.4k)" in #71717A
- Price:         20px / #F8F8FC / Weight 700 + Accent Font
- Old Price:     14px / #71717A / strikethrough
- Discount:      12px / #22C55E (Green) / "-25%"
- Badge:         Positioned top-left, pill shape, gradient background

Premium Product Card (Featured):
- Border:        1px solid rgba(201,169,110,0.15)
- Background:    Gradient Card Glow at top
- Shadow:        shadow-glow
- Badge:         "PREMIUM" in gold, top-right corner

--- NAVIGATION ---

Top Navigation Bar:
- Height:        72px
- Background:    rgba(10,10,15,0.85) + backdrop-blur(12px)
- Border Bottom: 1px solid rgba(255,255,255,0.06)
- Position:      sticky top-0, z-50

Logo:
- Font:          Display font, 24px, Weight 700
- Color:         #F8F8FC with gold accent dot
- Hover:         Subtle gold glow

Search Bar:
- Background:    rgba(255,255,255,0.05)
- Border:        1px solid rgba(255,255,255,0.08)
- Border Radius: 12px
- Height:        48px
- Placeholder:   "Search for premium products..." in #71717A
- Focus:         Border #C9A96E, shadow-focus, background rgba(201,169,110,0.03)
- Icon:          Search icon left, 20px, #71717A
- Hover:         Background rgba(255,255,255,0.08)

Nav Icons (Cart, Wishlist, Profile):
- Size:          24px
- Color:         #A1A1AA
- Hover:         #F8F8FC
- Badge:         Red dot (#EF4444) with white number, 16px circle, positioned top-right

Category Navigation (Below header):
- Background:    #0A0A0F
- Height:        56px
- Items:         Horizontal scroll, 14px / #A1A1AA / Weight 500
- Active:        #F8F8FC with gold underline (2px, 4px border-radius)
- Hover:         #F8F8FC
- Divider:       Subtle vertical lines between categories

--- HERO SECTION ---

Hero Banner:
- Height:        70vh (min 500px)
- Background:    Hero Gradient + subtle noise texture (opacity 0.03)
- Content:       Left-aligned, max-width 600px, vertically centered
- Tagline:       12px / UPPERCASE / #C9A96E / Weight 600 / 3px letter-spacing
- Headline:      Display 1 / #F8F8FC / "Discover Luxury, Redefined"
- Subheadline:   Body Large / #A1A1AA / max-width 480px
- CTA Group:     Primary CTA + Ghost CTA side by side, gap 16px
- Image:         Right side, product showcase with subtle float animation
- Decorative:    Gold geometric shapes (circles, lines) at 5% opacity

Hero Carousel Indicators:
- Style:         40px x 4px rounded rectangles
- Active:        #C9A96E
- Inactive:      rgba(255,255,255,0.2)
- Hover:         rgba(255,255,255,0.4)

--- PRODUCT GRID ---

Section Header:
- Title:         H1 / #F8F8FC
- Subtitle:      Body / #A1A1AA
- "View All" Link: 14px / #C9A96E / with arrow icon, hover: underline

Grid Layout:
- Desktop:       4 columns, gap 24px
- Tablet:        3 columns, gap 20px
- Mobile:        2 columns, gap 16px

--- BADGES & TAGS ---

Deal Badge:
- Background:    Gradient Deal Badge
- Text:          #FFFFFF / 11px / Weight 700 / UPPERCASE
- Padding:       6px 12px
- Border Radius: 6px (top-left of card)

Premium Badge:
- Background:    rgba(201,169,110,0.12)
- Border:        1px solid rgba(201,169,110,0.3)
- Text:          #C9A96E / 11px / Weight 600
- Icon:          Crown or diamond icon, 12px

Stock Badge:
- In Stock:      "In Stock" / #22C55E / green dot
- Low Stock:     "Only 3 left" / #F59E0B / amber dot
- Out of Stock:  "Out of Stock" / #EF4444 / red dot / opacity 0.6 on card

--- MODALS & DRAWERS ---

Cart Drawer (Right Slide):
- Width:         420px (desktop), 100% (mobile)
- Background:    #0A0A0F
- Border Left:   1px solid rgba(255,255,255,0.08)
- Header:        "Shopping Cart" / H2 / with item count badge
- Item Row:      Image 80x80 + Name + Variant + Qty Stepper + Price + Remove
- Qty Stepper:   36px buttons, 1px border, centered number
- Footer:        Subtotal + Shipping + Total + Checkout CTA
- Overlay:       rgba(0,0,0,0.7) with backdrop-blur(4px)

Quick View Modal:
- Background:    #12121A
- Border Radius: 24px
- Max Width:     900px
- Layout:        Image left (50%) + Details right (50%)
- Shadow:        shadow-xl
- Close:         Top-right, Icon Button

--- INPUTS & FORMS ---

Text Input:
- Background:    rgba(255,255,255,0.04)
- Border:        1px solid rgba(255,255,255,0.08)
- Border Radius: 12px
- Height:        52px
- Padding:       0 16px
- Text:          #F8F8FC / 16px
- Placeholder:   #71717A
- Focus:         Border #C9A96E, shadow-focus, background rgba(201,169,110,0.03)
- Error:         Border #EF4444, error message below in #EF4444 / 12px

Select/Dropdown:
- Same as input
- Chevron icon:  20px, #A1A1AA, rotates 180deg on open
- Dropdown:      Background #1A1A24, border rgba(255,255,255,0.08), shadow-lg
- Option Hover:  Background rgba(201,169,110,0.08)

--- FOOTER ---

Footer:
- Background:    #06060A (Darker than base)
- Border Top:    1px solid rgba(255,255,255,0.06)
- Padding:       80px 0 40px

Newsletter Section:
- Headline:      "Join the Inner Circle" / H2
- Subtext:       "Exclusive drops, early access, member-only pricing"
- Input:         Inline with button, max-width 480px
- Button:        Primary CTA, "Subscribe"

Footer Links:
- Columns:       4 columns (Shop, Support, Company, Legal)
- Column Title:  14px / UPPERCASE / #F8F8FC / Weight 600 / 1px letter-spacing
- Links:         14px / #A1A1AA / hover #F8F8FC with gold underline
- Social Icons:  24px / #71717A / hover #C9A96E

Bottom Bar:
- Border Top:    1px solid rgba(255,255,255,0.04)
- Padding:       24px 0
- Left:          "© 2026 PremiumStore. All rights reserved."
- Right:         Payment icons (Visa, Mastercard, Amex, UPI) in monochrome

================================================================================
PAGE-SPECIFIC DESIGNS
================================================================================

--- HOME PAGE ---

1. HERO BANNER (as specified above)
2. CATEGORY QUICK LINKS:
   - Horizontal scrollable row
   - Circular icon (56px) + label below
   - Icon background: rgba(255,255,255,0.04), hover: rgba(201,169,110,0.10)
   - Icon color: #C9A96E

3. FLASH DEALS SECTION:
   - Background:    Gradient from #0A0A0F to #1A0A1A (subtle purple tint)
   - Countdown:     Large numbers (48px) / #F8F8FC / with "HRS : MIN : SEC" labels
   - Timer Color:   #EF4444 (urgency)
   - Products:      4-card horizontal scroll with "snap" behavior

4. TRENDING PRODUCTS:
   - Section header with "Trending Now" + flame icon
   - 4-column grid
   - "Trending" badge on top 3 products

5. PREMIUM COLLECTION BANNER:
   - Full-width, height 400px
   - Background:    Luxury product lifestyle image with heavy dark overlay (70%)
   - Content:       Center-aligned, max-width 600px
   - Tag:           "PREMIUM COLLECTION" / gold
   - Headline:      "Curated Excellence"
   - CTA:           "Explore Collection"

6. BRAND MARQUEE:
   - Auto-scrolling horizontal logos
   - Grayscale logos, hover: full color + gold tint
   - Speed:         30s linear infinite

7. TESTIMONIALS:
   - 3-column grid
   - Card:          #12121A, border, 16px radius
   - Quote icon:    32px, #C9A96E, opacity 0.3
   - Stars:         #C9A96E
   - Avatar:        48px circle
   - Name:          16px / #F8F8FC
   - Verified:      Green checkmark + "Verified Buyer"

8. NEWSLETTER + FOOTER (as specified)

--- PRODUCT LISTING PAGE ---

Layout:
- Left Sidebar:    280px (filters)
- Right Content:   Flexible (product grid)
- Gap:             32px

Filter Sidebar:
- Background:      transparent
- Section Title:   14px / UPPERCASE / #F8F8FC / Weight 600 / 1px letter-spacing
- Filter Options:  Checkbox + Label, 14px / #A1A1AA
- Checkbox:        18px square, 2px border #71717A, checked: #C9A96E fill
- Price Slider:    Custom range input, track #1A1A24, fill #C9A96E, thumb: white
- Active Filters:  Pill tags with "x" remove button

Sort Bar:
- Background:      #12121A
- Border Radius:   12px
- Padding:         12px 20px
- Left:            "Showing 1-24 of 1,240 results"
- Right:           Sort dropdown + View toggle (grid/list icons)

Product Grid:
- 3 columns (with sidebar)
- Pagination:      Centered, previous/next arrows + numbered pages
- Active Page:     #C9A96E background, black text
- Inactive:        transparent, #A1A1AA text, hover: rgba(255,255,255,0.06)

--- PRODUCT DETAIL PAGE ---

Layout:
- Left:            Product images (60% width)
- Right:           Product info (40% width)
- Gap:             48px

Image Gallery:
- Main Image:      Large, aspect-ratio 1:1, border-radius 16px
- Thumbnails:      Vertical column left of main, 80x80, 8px gap
- Active Thumb:    2px border #C9A96E
- Zoom:            Hover to zoom (magnify effect)
- Lightbox:        Click to full-screen gallery

Product Info:
- Breadcrumb:      Home > Category > Subcategory > Product / 14px / #71717A
- Brand:           12px / UPPERCASE / #C9A96E / clickable link
- Name:            H1 / #F8F8FC
- Rating:          Stars + "4.8" + "(2,456 reviews)" / clickable
- Price:           Price Display / #F8F8FC
- Old Price:       strikethrough / #71717A
- Discount:        "Save 25%" / #22C55E
- Short Desc:      Body / #A1A1AA / 3 lines
- Variants:        Color swatches (circular, 32px, selected: 2px gold ring) + Size buttons
- Size Buttons:    48x48, border, selected: gold border + gold text
- Quantity:        Stepper (minus, number, plus)
- Stock:           "In Stock" / green dot + "Usually ships in 24 hours"
- Action Buttons:  "Add to Cart" (Primary CTA, full width) + "Add to Wishlist" (Icon button)
- Buy Now:         "Buy Now" (Secondary CTA, full width)

Tabs Section (below fold):
- Tabs:            Description | Specifications | Reviews | Shipping
- Tab Bar:         Border bottom, active: gold underline + white text
- Content:         Rich text, tables, review cards

Related Products:
- "You May Also Like" / H2
- 4-card horizontal scroll

Recently Viewed:
- "Recently Viewed" / H3
- 5 small cards (smaller variant)

--- CART PAGE ---

Layout:
- Left:            Cart items (65%)
- Right:           Order summary (35%), sticky top-100px

Cart Item:
- Image:           120x120, border-radius 12px
- Details:         Name + Variant + Price + Qty stepper + Remove link
- Subtotal:        Right-aligned, bold

Order Summary Card:
- Background:      #12121A
- Border:          1px solid rgba(255,255,255,0.06)
- Border Radius:   16px
- Padding:         24px
- Rows:            Subtotal | Shipping (Free/Calculated) | Tax | Discount (if coupon)
- Total:           24px / #F8F8FC / Weight 700 / Accent Font
- Coupon Input:    Inline button "Apply"
- Checkout CTA:    Primary CTA, full width, "Proceed to Checkout"
- Secure:          Lock icon + "Secure SSL Encrypted"

Empty Cart:
- Illustration:    Shopping bag icon, 120px, #1A1A24
- Message:         "Your cart is empty" / H2
- Subtext:         "Discover our premium collection"
- CTA:             "Start Shopping" / Primary CTA

--- CHECKOUT PAGE ---

Layout:
- Left:            Checkout form (60%)
- Right:           Order summary (40%), sticky

Progress Steps:
- 1. Shipping | 2. Payment | 3. Review
- Active:          Gold number circle + white text
- Completed:       Gold checkmark
- Inactive:        Grey number + grey text
- Connector:       Gold line between completed steps

Form Sections:
- Section Title:   H3 with number badge (gold circle, white number)
- Inputs:          As specified in form section
- Address:         Autocomplete-enabled, country dropdown
- Saved Addresses: Card selection, selected: gold border

Payment:
- Stripe Elements: Dark-themed card input
- Saved Cards:     Card visualization (dark card design, last 4 digits)
- UPI/Wallet:      Logo buttons, selected: gold border

Order Summary (Right):
- Product list:    Thumbnail 48x48 + Name + Qty + Price
- Totals:          As cart page
- Place Order CTA:   Large Primary CTA, "Place Order — ₹12,499"

--- ORDER SUCCESS PAGE ---

- Confetti animation (subtle, gold particles)
- Checkmark:       Animated circle with check, 80px, gold
- Order Number:    "Order #ORD-2026-004291" / H1
- Message:         "Thank you for your purchase!" / H2
- Details:         Estimated delivery date, shipping address summary
- CTA Group:       "Track Order" (Primary) + "Continue Shopping" (Ghost)
- Order Summary:   Collapsible product list

--- ADMIN DASHBOARD ---

Layout:
- Sidebar:         260px, dark, icons + labels
- Header:          64px, search, notifications, profile
- Content:         Flexible, padding 32px

Sidebar:
- Background:      #06060A
- Active Item:     Left gold border (3px), background rgba(201,169,110,0.08)
- Icon:            20px, active: gold, inactive: #71717A
- Label:           14px, active: white, inactive: #A1A1AA
- Collapsible:     Arrow icon, smooth animation

Dashboard Cards:
- Stats Row:       4 cards, revenue | orders | customers | conversion
- Card:            #12121A, border, 16px radius
- Icon:            40px circle, subtle colored background
- Number:          32px / white / Weight 700
- Label:           14px / #A1A1AA
- Trend:           Arrow + percentage, green/red

Charts:
- Line Chart:      Gold line, dark grid, tooltip on hover
- Bar Chart:       Gradient bars (gold to transparent)
- Donut Chart:     Gold segment, dark background

Data Tables:
- Header:          14px / UPPERCASE / #A1A1AA / background #0A0A0F
- Row:             16px / #F8F8FC / hover: rgba(255,255,255,0.03)
- Border:          1px solid rgba(255,255,255,0.04)
- Status:          Colored dot + text (green/amber/red)
- Actions:         3-dot menu, dropdown
- Pagination:      As product listing

================================================================================
MICRO-INTERACTIONS & ANIMATIONS
================================================================================

- Page Transitions:       Fade + slight translateY (8px to 0), 0.3s ease-out
- Card Hover:             translateY(-4px), border-color transition, shadow grow, 0.4s cubic-bezier(0.4,0,0.2,1)
- Button Hover:           Scale 1.02, brightness increase, icon translateX(4px), 0.2s ease
- Image Hover:            Scale 1.05, 0.6s ease
- Skeleton Loading:       Shimmer animation, gradient from #12121A to #1A1A24 to #12121A, 1.5s infinite
- Toast Notifications:    Slide in from right, auto-dismiss 4s, progress bar
- Cart Badge:             Scale bounce on update
- Accordion:              Smooth height transition, 0.3s ease
- Modal Open:             Fade in overlay, scale modal from 0.95 to 1, 0.2s ease-out
- Scroll Reveal:          Elements fade up as they enter viewport, stagger 0.1s
- Search Dropdown:        Fade + slide down, 0.15s ease
- Quantity Stepper:       Number slides up/down on change
- Wishlist Heart:         Fill animation + scale bounce, red fill (#EF4444)

================================================================================
RESPONSIVE BREAKPOINTS
================================================================================

- Mobile:       < 640px   (1-2 columns, full-width cards, bottom nav)
- Tablet:       640-1024px (2-3 columns, sidebar becomes drawer)
- Desktop:      1024-1440px (3-4 columns, full layout)
- Wide:         > 1440px   (max-width 1440px container, centered)

Mobile Specific:
- Bottom Navigation:  5 icons (Home, Search, Cart, Wishlist, Profile)
- Swipe Gestures:     Swipe product images, swipe to delete cart items
- Pull to Refresh:    On product lists
- Sticky Add to Cart: Product page bottom bar

================================================================================
ACCESSIBILITY REQUIREMENTS
================================================================================

- Contrast Ratio:       Minimum 4.5:1 for normal text, 3:1 for large text
- Focus Indicators:     Gold outline (#C9A96E) 2px offset, visible on all interactive elements
- Keyboard Navigation:  Full tab navigation, visible focus states
- Screen Reader:        Proper ARIA labels, alt text for all images
- Motion Preference:    Respect prefers-reduced-motion, disable animations
- Color Independence:   Never rely on color alone for information

================================================================================
DELIVERABLES EXPECTED FROM FIGMA AI
================================================================================

1. Design System File:
   - Color styles (all tokens)
   - Text styles (all typography)
   - Effect styles (shadows)
   - Component library (all components as Figma variants)

2. Page Designs (High-Fidelity):
   - Home Page
   - Product Listing Page (with filters)
   - Product Detail Page
   - Cart Page
   - Checkout Flow (3 steps)
   - Order Success Page
   - User Account / Orders
   - Admin Dashboard
   - Mobile versions of all pages

3. Prototype:
   - Clickable flows: Home → Product → Cart → Checkout → Success
   - Hover states and micro-interactions
   - Mobile navigation flow

4. Design Tokens Export:
   - JSON format for developer handoff
   - CSS variables reference
   - Tailwind config mapping

================================================================================
MOOD & ATMOSPHERE KEYWORDS
================================================================================

Luxury, Premium, Exclusive, Curated, Sophisticated, Modern, Dark, Gold, 
Minimal, Clean, High-Contrast, Aspirational, Trustworthy, Frictionless, 
Premium Materials, Night Mode, VIP Experience, Concierge Shopping, 
Boutique Digital, Black Card Aesthetic

================================================================================