# CLAUDE.md — SG Border Live (sgborder.live)

## Project Overview

**SG Border Live** is a real-time Singapore-to-JB causeway traffic dashboard and commuter intelligence platform. It provides live checkpoint status, traffic camera feeds, cross-border bus tracking, AI-powered departure recommendations, and deep SEO guide content — all wrapped in a clean, fast, mobile-first UI that makes CausewayTraffic.sg look cluttered.

**Core thesis:** The existing competitor (CausewayTraffic.sg) has decent data but poor UX, no real bus tracking, no Telegram integration, and weak programmatic SEO. We win on design, data depth, bus intelligence, and distribution (Telegram premium).

**Revenue model:** AdSense on web + Telegram premium subscriptions ($2.99/mo) for real-time alerts, personalized departure windows, and ad-free experience.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 14+ (App Router) | SSR for SEO, ISR for guides, fast edge delivery |
| Styling | Tailwind CSS 3.4+ | Utility-first, responsive, consistent design system |
| Database | Supabase (PostgreSQL + Realtime) | Free tier, real-time subscriptions for live dashboard |
| Hosting | Vercel | Auto SG edge CDN, cron jobs, serverless functions |
| Data Pipeline | n8n on Hostinger VPS | Already running, handles LTA polling + processing |
| Bot | Telegram Bot API (node-telegram-bot-api) | Premium feature, deployed on Hostinger VPS via n8n |
| Analytics | Plausible (self-hosted on VPS) or Vercel Analytics | Privacy-first, no cookie banner needed |
| Ads | Google AdSense | Primary revenue stream |
| DNS/CDN | Cloudflare | Free, DDoS protection, SSL |

---

## Project Structure

```
sgborder-live/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (nav, footer, fonts, metadata)
│   │   ├── page.tsx                  # Homepage — live dashboard
│   │   ├── globals.css               # Tailwind base + custom design tokens
│   │   │
│   │   ├── woodlands/
│   │   │   └── page.tsx              # Woodlands checkpoint deep-dive
│   │   ├── tuas/
│   │   │   └── page.tsx              # Tuas checkpoint deep-dive
│   │   │
│   │   ├── bus/
│   │   │   ├── page.tsx              # Bus hub — all cross-border services
│   │   │   ├── [service]/
│   │   │   │   └── page.tsx          # Individual bus route page (programmatic)
│   │   │   └── compare/
│   │   │       └── page.tsx          # Side-by-side bus comparison tool
│   │   │
│   │   ├── guides/
│   │   │   ├── page.tsx              # Guide index
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual guide (MDX or DB-driven)
│   │   │
│   │   ├── calculator/
│   │   │   └── page.tsx              # VEP + toll + fuel cost calculator
│   │   │
│   │   ├── predict/
│   │   │   └── page.tsx              # "Should I Leave Now?" AI tool
│   │   │
│   │   ├── rts-link/
│   │   │   └── page.tsx              # RTS Link info hub + countdown
│   │   │
│   │   ├── holidays/
│   │   │   ├── page.tsx              # Holiday calendar overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Per-holiday prediction (programmatic)
│   │   │
│   │   ├── telegram/
│   │   │   └── page.tsx              # Telegram bot landing + signup
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── methodology/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── terms/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Clean top nav with status indicator dots
│   │   │   ├── Footer.tsx             # Minimal footer with legal links
│   │   │   ├── MobileNav.tsx          # Bottom tab bar (mobile)
│   │   │   └── AdSlot.tsx             # Reusable AdSense component
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatusCard.tsx         # Main status card (Smooth/Moderate/Heavy/Jammed)
│   │   │   ├── StatusBadge.tsx        # Colored pill badge for status
│   │   │   ├── CameraGrid.tsx        # Traffic camera image grid
│   │   │   ├── CameraModal.tsx       # Full-screen camera viewer
│   │   │   ├── TravelTimeBar.tsx     # Estimated travel time with visual bar
│   │   │   ├── CheckpointToggle.tsx  # Woodlands ↔ Tuas toggle
│   │   │   ├── DirectionToggle.tsx   # SG→JB ↔ JB→SG toggle
│   │   │   ├── HourlyHeatmap.tsx     # 24-hour pattern heatmap
│   │   │   ├── LivePulse.tsx         # Animated "live" indicator
│   │   │   └── LastUpdated.tsx       # "Updated 2 min ago" timestamp
│   │   │
│   │   ├── bus/
│   │   │   ├── BusArrivalCard.tsx    # Next bus countdown card
│   │   │   ├── BusRouteTable.tsx     # Route details table
│   │   │   ├── BusCompareWidget.tsx  # Side-by-side route comparison
│   │   │   ├── BusStopSelector.tsx   # Departure point selector
│   │   │   └── BusFareTable.tsx      # Fare comparison (SGD + MYR)
│   │   │
│   │   ├── tools/
│   │   │   ├── CostCalculator.tsx    # Interactive cost calculator
│   │   │   ├── PredictorWidget.tsx   # "Should I Leave Now?" widget
│   │   │   ├── FuelCompare.tsx       # SG vs JB fuel price widget
│   │   │   └── RTSCountdown.tsx      # RTS Link countdown timer
│   │   │
│   │   ├── content/
│   │   │   ├── GuideCard.tsx         # Guide preview card for listings
│   │   │   ├── FAQAccordion.tsx      # FAQ with schema markup
│   │   │   ├── HolidayCalendar.tsx   # Color-coded holiday traffic calendar
│   │   │   └── TableOfContents.tsx   # Sticky TOC for guide pages
│   │   │
│   │   └── shared/
│   │       ├── SEOHead.tsx            # Dynamic meta tags + schema
│   │       ├── Breadcrumbs.tsx        # Breadcrumb nav with schema
│   │       ├── ShareButtons.tsx       # Social share (WhatsApp priority for SG)
│   │       └── CTATelegram.tsx        # "Get alerts on Telegram" CTA banner
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Supabase browser client
│   │   │   ├── server.ts             # Supabase server client
│   │   │   └── types.ts              # Generated DB types
│   │   │
│   │   ├── api/
│   │   │   ├── lta.ts                # LTA DataMall API wrapper
│   │   │   ├── google-routes.ts      # Google Routes API wrapper
│   │   │   └── bus-arrivals.ts       # Bus arrival data fetcher
│   │   │
│   │   ├── scoring.ts                # Traffic status scoring algorithm
│   │   ├── constants.ts              # Camera IDs, bus stops, route configs
│   │   ├── bus-data.ts               # Static bus route/fare/schedule data
│   │   ├── holidays.ts               # SG + MY holiday calendar data
│   │   └── seo.ts                    # SEO utilities (schema generators, meta)
│   │
│   └── data/
│       ├── bus-routes.json           # All cross-border bus route data
│       ├── bus-fares.json            # Fare tables (SGD + MYR)
│       ├── camera-locations.json     # LTA camera IDs for Woodlands + Tuas
│       ├── holidays-2026.json        # Holiday dates + predicted severity
│       └── guides/                   # MDX guide content files
│           ├── best-time-cross.mdx
│           ├── friday-woodlands.mdx
│           ├── cw1-bus-guide.mdx
│           └── ... (20+ guide files)
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # Database schema
│
├── n8n/
│   ├── traffic-data-pipeline.json    # Main data collection workflow
│   ├── bus-arrival-pipeline.json     # Bus arrival polling workflow
│   ├── telegram-bot.json             # Telegram bot workflow
│   └── daily-aggregation.json        # Historical data aggregation
│
├── telegram/
│   └── bot.ts                        # Telegram bot logic (runs on VPS)
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png                  # Default OG image
│   ├── og-woodlands.png
│   ├── og-tuas.png
│   └── robots.txt
│
├── CLAUDE.md                         # This file
├── PROMPTS.md                        # Sequential build prompts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System

### Philosophy
**Clean. Scannable. Instant.** Every pixel serves a purpose. No clutter. No text overrun. No visual noise. Users should get the answer they need in under 3 seconds on mobile. This is a utility — not a magazine.

### Color Tokens

```css
/* Status Colors — the core visual language */
--status-smooth: #22C55E;      /* Green 500 */
--status-moderate: #F59E0B;    /* Amber 500 */
--status-heavy: #F97316;       /* Orange 500 */
--status-jammed: #EF4444;      /* Red 500 */

/* Brand */
--brand-primary: #0F172A;      /* Slate 900 — dark, authoritative */
--brand-accent: #3B82F6;       /* Blue 500 — trust, info */
--brand-accent-light: #DBEAFE; /* Blue 100 */

/* Surfaces */
--surface-bg: #FFFFFF;
--surface-card: #F8FAFC;       /* Slate 50 */
--surface-border: #E2E8F0;     /* Slate 200 */
--surface-hover: #F1F5F9;      /* Slate 100 */

/* Text */
--text-primary: #0F172A;       /* Slate 900 */
--text-secondary: #64748B;     /* Slate 500 */
--text-muted: #94A3B8;         /* Slate 400 */

/* Dark Mode */
--dark-bg: #0F172A;
--dark-card: #1E293B;
--dark-border: #334155;
--dark-text: #F8FAFC;
--dark-text-secondary: #94A3B8;
```

### Typography

```css
/* Headings: Plus Jakarta Sans (Google Fonts — modern, geometric, clean) */
--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;

/* Body: Inter (legibility champion, great for data-heavy UI) */
--font-body: 'Inter', system-ui, sans-serif;

/* Mono: JetBrains Mono (for timestamps, data values) */
--font-mono: 'JetBrains Mono', monospace;

/* Scale */
--text-xs: 0.75rem;     /* 12px — timestamps, labels */
--text-sm: 0.875rem;    /* 14px — secondary text */
--text-base: 1rem;      /* 16px — body */
--text-lg: 1.125rem;    /* 18px — card titles */
--text-xl: 1.25rem;     /* 20px — section headers */
--text-2xl: 1.5rem;     /* 24px — page titles */
--text-3xl: 1.875rem;   /* 30px — hero */
--text-4xl: 2.25rem;    /* 36px — landing hero */
```

### Layout Rules

1. **Max content width:** 1200px (centered)
2. **Card padding:** 16px mobile, 24px desktop
3. **Card border-radius:** 12px (rounded-xl)
4. **Section spacing:** 48px between major sections
5. **Grid:** 1 col mobile → 2 col tablet → 3 col desktop (for camera grid)
6. **No text overflow ever:** All text truncates with ellipsis or wraps cleanly
7. **Touch targets:** Minimum 44px × 44px for all interactive elements
8. **Status cards:** Always show the status color as a left border accent (4px)

### Mobile-First Navigation

```
┌─────────────────────────────┐
│  🟢 SG Border Live    ☰    │  ← Top bar: logo + status dot + hamburger
├─────────────────────────────┤
│                             │
│     [ MAIN CONTENT ]        │
│                             │
├─────────────────────────────┤
│  🚗    🚌    📊    💰    ✈️ │  ← Bottom tab bar (mobile only)
│ Live   Bus  Guides Calc  TG │
└─────────────────────────────┘
```

### Component Design Patterns

**Status Card (the hero component):**
```
┌──────────────────────────────────┐
│ 🟢│ WOODLANDS → JB               │
│   │ Smooth · ~25 min              │
│   │ ████░░░░░░░░ 25 min           │
│   │ Updated 2 min ago  📷 Cameras │
└──────────────────────────────────┘
```
- Left color bar matches status
- Travel time as visual progress bar (max 180 min)
- Tap to expand: cameras, hourly pattern, bus options

**Bus Arrival Card:**
```
┌──────────────────────────────────┐
│ 🚌 CW1 · Kranji → JB CIQ        │
│   Next: 3 min · 12 min · 28 min  │
│   ────────────────────────────── │
│ 🚌 170X · Kranji → JB Sentral    │
│   Next: 7 min · 19 min           │
└──────────────────────────────────┘
```

---

## Database Schema (Supabase)

```sql
-- Core traffic data (collected every 5 min)
CREATE TABLE traffic_snapshots (
  id BIGSERIAL PRIMARY KEY,
  checkpoint TEXT NOT NULL CHECK (checkpoint IN ('woodlands', 'tuas')),
  direction TEXT NOT NULL CHECK (direction IN ('sg_to_jb', 'jb_to_sg')),
  status TEXT NOT NULL CHECK (status IN ('smooth', 'moderate', 'heavy', 'jammed')),
  congestion_score INTEGER NOT NULL CHECK (congestion_score BETWEEN 0 AND 100),
  google_travel_min REAL,
  lta_speed_kmh REAL,
  estimated_wait_min REAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast dashboard queries
CREATE INDEX idx_snapshots_latest ON traffic_snapshots (checkpoint, direction, created_at DESC);
-- Index for historical pattern queries
CREATE INDEX idx_snapshots_patterns ON traffic_snapshots (checkpoint, direction, 
  EXTRACT(DOW FROM created_at), EXTRACT(HOUR FROM created_at));

-- Camera images (latest URLs)
CREATE TABLE camera_feeds (
  camera_id TEXT PRIMARY KEY,
  checkpoint TEXT NOT NULL,
  direction TEXT,
  image_url TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bus arrival data (updated every 60 seconds)
CREATE TABLE bus_arrivals (
  id BIGSERIAL PRIMARY KEY,
  bus_stop_code TEXT NOT NULL,
  service_no TEXT NOT NULL,
  next_bus_min REAL,
  next_bus2_min REAL,
  next_bus3_min REAL,
  load TEXT CHECK (load IN ('SEA', 'SDA', 'LSD')),  -- Seats Available, Standing, Limited Standing
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bus_latest ON bus_arrivals (bus_stop_code, service_no, updated_at DESC);

-- Hourly aggregated historical data (computed daily)
CREATE TABLE historical_averages (
  id BIGSERIAL PRIMARY KEY,
  checkpoint TEXT NOT NULL,
  direction TEXT NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  hour_of_day INTEGER NOT NULL CHECK (hour_of_day BETWEEN 0 AND 23),
  avg_travel_min REAL NOT NULL,
  avg_congestion_score REAL NOT NULL,
  sample_count INTEGER NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (checkpoint, direction, day_of_week, hour_of_day)
);

-- Guide content (for programmatic SEO pages)
CREATE TABLE guides (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,           -- MDX or HTML
  category TEXT,                   -- 'checkpoint', 'bus', 'regulation', 'holiday', 'tips'
  target_keyword TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Holiday predictions (programmatic SEO)
CREATE TABLE holidays (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE,
  predicted_severity TEXT CHECK (predicted_severity IN ('normal', 'busy', 'heavy', 'extreme')),
  woodlands_peak_hours TEXT,       -- JSON array of peak hour ranges
  tuas_peak_hours TEXT,            -- JSON array of peak hour ranges
  tips TEXT,                       -- Markdown tips
  meta_title TEXT,
  meta_description TEXT,
  year INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telegram subscribers (premium feature)
CREATE TABLE telegram_subscribers (
  id BIGSERIAL PRIMARY KEY,
  telegram_user_id BIGINT UNIQUE NOT NULL,
  telegram_username TEXT,
  preferred_checkpoint TEXT DEFAULT 'both',
  alert_threshold TEXT DEFAULT 'heavy',  -- when to send alerts
  morning_digest BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programmatic bus route pages
CREATE TABLE bus_routes (
  id BIGSERIAL PRIMARY KEY,
  service_no TEXT UNIQUE NOT NULL,     -- CW1, CW2, 170, 170X, 160, 950, etc.
  operator TEXT NOT NULL,              -- 'Causeway Link', 'SBS Transit'
  route_name TEXT NOT NULL,            -- 'Kranji MRT → JB CIQ'
  sg_departure TEXT NOT NULL,          -- 'Kranji MRT (Exit C, Stop 45139)'
  jb_arrival TEXT NOT NULL,            -- 'JB CIQ 1st Link'
  via_checkpoint TEXT NOT NULL,        -- 'woodlands' or 'tuas'
  fare_sgd REAL,
  fare_myr REAL,
  first_bus TEXT,
  last_bus TEXT,
  frequency_peak TEXT,                 -- '2-3 min'
  frequency_offpeak TEXT,              -- '15-30 min'
  payment_methods TEXT,                -- JSON array
  tips TEXT,                           -- Markdown tips
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Supabase Realtime for live dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE traffic_snapshots;
ALTER PUBLICATION supabase_realtime ADD TABLE bus_arrivals;
ALTER PUBLICATION supabase_realtime ADD TABLE camera_feeds;
```

---

## API Integrations

### LTA DataMall
- **Base URL:** `https://datamall2.mytransport.sg/ltaodataservice`
- **Auth:** Header `AccountKey: {YOUR_KEY}`
- **Endpoints used:**
  - `GET /Traffic/Camera` — returns camera image URLs (refresh 1-5 min)
  - `GET /v3/TrafficSpeedBands` — speed data per road segment
  - `GET /v2/EstTravelTimes` — estimated travel times on expressways
  - `GET /v2/BusArrival?BusStopCode={code}` — next bus arrivals
  - `GET /v2/TrafficIncidents` — current road incidents

### Google Routes API (Compute Route Matrix)
- **Endpoint:** `POST https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix`
- **Auth:** API key in header
- **Usage:** 4 origin-destination pairs, every 5 min = ~1,152 elements/day ≈ $0.17/day
- **Route pairs:**
  1. Woodlands Checkpoint → JB CIQ (1.44643, 103.76932 → 1.46333, 103.76556)
  2. Tuas Checkpoint → JB CIQ 2nd Link (1.34029, 103.63649 → 1.39781, 103.59850)
  3. (reverse directions)

### Telegram Bot API
- **Base URL:** `https://api.telegram.org/bot{TOKEN}/`
- **Commands:**
  - `/status` — current Woodlands + Tuas status (free)
  - `/woodlands` — detailed Woodlands status + cameras (free)
  - `/tuas` — detailed Tuas status + cameras (free)
  - `/bus` — next bus times at all departure points (free)
  - `/predict` — "Should I leave now?" (premium)
  - `/alerts on` — enable real-time alerts (premium)
  - `/digest on` — enable 6AM daily digest (premium)
  - `/subscribe` — upgrade to premium ($2.99/mo)

---

## Traffic Scoring Algorithm

```typescript
interface TrafficInput {
  googleTravelMin: number;      // From Routes API
  ltaSpeedKmh: number;          // From Speed Bands (BKE or AYE segment)
  historicalAvgMin: number;     // From historical_averages table
  ltaEstTravelMin?: number;     // From LTA Est Travel Times (if available)
}

interface TrafficStatus {
  status: 'smooth' | 'moderate' | 'heavy' | 'jammed';
  score: number;                // 0-100
  estimatedWaitMin: number;
  color: string;
  emoji: string;
  label: string;
}

function calculateTrafficStatus(input: TrafficInput): TrafficStatus {
  const { googleTravelMin, ltaSpeedKmh, historicalAvgMin } = input;
  
  // Normalize Google travel time (baseline: 15 min smooth, 180 min max jam)
  const googleScore = Math.min(100, ((googleTravelMin - 15) / 165) * 100);
  
  // Normalize speed (80 kmh = free flow, 5 kmh = standstill)
  const speedScore = Math.max(0, ((80 - ltaSpeedKmh) / 75) * 100);
  
  // Historical deviation bonus (worse than usual = higher score)
  const deviation = historicalAvgMin > 0 
    ? ((googleTravelMin - historicalAvgMin) / historicalAvgMin) * 30
    : 0;
  
  // Weighted composite
  const rawScore = (googleScore * 0.50) + (speedScore * 0.30) + Math.max(0, deviation) * 0.20;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));
  
  if (score < 20) return { status: 'smooth', score, estimatedWaitMin: googleTravelMin, color: '#22C55E', emoji: '🟢', label: 'Smooth' };
  if (score < 45) return { status: 'moderate', score, estimatedWaitMin: googleTravelMin, color: '#F59E0B', emoji: '🟡', label: 'Moderate' };
  if (score < 70) return { status: 'heavy', score, estimatedWaitMin: googleTravelMin, color: '#F97316', emoji: '🟠', label: 'Heavy' };
  return { status: 'jammed', score, estimatedWaitMin: googleTravelMin, color: '#EF4444', emoji: '🔴', label: 'Jammed' };
}
```

---

## Programmatic SEO Strategy

### Template-Driven Page Generation

**Bus Route Pages** — `/bus/[service]`
- Auto-generate from `bus_routes` table
- Each page: route map, fare table, schedule, tips, nearby alternatives, FAQ
- Target keywords: "cw1 bus to jb", "bus 170 to jb schedule", "bus 950 woodlands to jb"

**Holiday Traffic Pages** — `/holidays/[slug]`
- Auto-generate from `holidays` table
- Each page: predicted severity, best times, historical data, checkpoint comparison
- Target keywords: "cny causeway traffic 2026", "hari raya jb traffic prediction"

**Day-Specific Guide Pages** — `/guides/[slug]`
- Pre-built content for every day × checkpoint × direction combo
- Target keywords: "friday woodlands traffic", "saturday tuas to jb best time"

### Internal Linking Strategy
- Every page links to related bus routes, guides, and tools
- Dashboard status cards link to relevant checkpoint pages
- Bus pages cross-link to guides about optimal travel times
- Holiday pages link to specific checkpoint guides
- Calculator pages link to VEP and fuel guides

### Schema Markup on Every Page
- `WebApplication` on homepage
- `FAQPage` on all guide and info pages  
- `HowTo` on process guides (VEP registration, MyICA setup)
- `BreadcrumbList` on all pages
- `Article` on guide pages with `datePublished`, `dateModified`
- `Event` on holiday prediction pages

---

## Key Camera IDs (LTA DataMall)

### Woodlands Checkpoint
- `2701` — Woodlands Checkpoint (BKE approach)
- `2702` — Woodlands Causeway
- `2703` — Woodlands Checkpoint (towards SG)
- `2704` — Woodlands Checkpoint (towards JB)
- `2705` — Woodlands Centre Road
- `2706` — BKE (Woodlands flyover)

### Tuas Checkpoint  
- `4703` — Tuas Checkpoint
- `4707` — Tuas Second Link
- `4708` — AYE (Tuas approach)
- `4709` — Tuas West Road
- `4710` — Second Link approach
- `4712` — AYE before Tuas

*(Verify exact camera IDs on first API call — store in camera-locations.json)*

---

## Key Bus Stop Codes

| Stop Code | Location | Services |
|-----------|----------|----------|
| `46211` | Woodlands Temp Int (Checkpoint) | 160, 170, 170X, 950, CW1, CW2, CW5 |
| `45139` | Opp Kranji Stn | CW1, 170X |
| `04111` | Queen Street Terminal | CW2, 170, SJE |
| `25421` | Tuas Link MRT | CW7 |
| `22009` | Jurong Town Hall Int | 160, CW3, CW4 |
| `03218` | Newton Circus (Food Centre) | CW5 |

---

## n8n Workflow Architecture

### Workflow 1: Traffic Data Pipeline (every 5 min)
```
Cron (*/5 * * * *) 
  → HTTP: LTA Traffic Images API
  → HTTP: LTA Speed Bands API  
  → HTTP: Google Routes API (4 route pairs)
  → Function: Run scoring algorithm
  → Supabase: INSERT traffic_snapshots
  → Supabase: UPSERT camera_feeds
```

### Workflow 2: Bus Arrival Pipeline (every 60 sec)
```
Cron (*/1 * * * *)
  → HTTP: LTA Bus Arrival (stop 46211) — SBS services
  → HTTP: LTA Bus Arrival (stop 45139) — CW1/170X
  → HTTP: LTA Bus Arrival (stop 04111) — CW2/170/SJE
  → HTTP: LTA Bus Arrival (stop 25421) — CW7
  → Supabase: UPSERT bus_arrivals
```

### Workflow 3: Telegram Bot
```
Telegram Trigger (webhook)
  → Switch on command
    → /status: Supabase query → format message → reply
    → /bus: Supabase query → format bus times → reply
    → /predict: Supabase query + historical → Claude API → reply (premium check)
    → /alerts: Update telegram_subscribers → confirm
    → /subscribe: Generate payment link → reply
```

### Workflow 4: Daily Aggregation (once daily at 3AM)
```
Cron (0 3 * * *)
  → Supabase: Query yesterday's snapshots
  → Function: Calculate hourly averages per checkpoint/direction
  → Supabase: UPSERT historical_averages
  → Function: Clean old snapshots (keep 30 days raw, aggregated forever)
```

### Workflow 5: Telegram Alerts (every 5 min)
```
Cron (*/5 * * * *)
  → Supabase: Get latest traffic_snapshots
  → Supabase: Get telegram_subscribers where alerts = true
  → Function: Check if status crossed subscriber's threshold
  → If changed: Send Telegram notification
```

---

## Content Checklist (Pre-Launch)

### Must Have (Launch Day)
- [ ] Homepage live dashboard
- [ ] Woodlands checkpoint page
- [ ] Tuas checkpoint page
- [ ] Bus hub page with all routes
- [ ] 3 individual bus route pages (CW1, 170X, CW2)
- [ ] VEP calculator
- [ ] About / Methodology / Privacy / Terms
- [ ] FAQ schema on homepage

### Week 1 Post-Launch
- [ ] 5 more bus route pages (160, 170, 950, CW5, CW7)
- [ ] "Best Time to Cross" guide
- [ ] "Friday Woodlands" guide
- [ ] "Saturday To JB" guide  
- [ ] Telegram bot MVP (/status, /bus)
- [ ] RTS Link page

### Week 2 Post-Launch
- [ ] 5 more day-specific guides
- [ ] Holiday prediction pages (next 3 upcoming holidays)
- [ ] "Should I Leave Now?" predictor
- [ ] Telegram premium features
- [ ] Bus comparison tool

---

## Performance Targets

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Dashboard load:** < 1.5s on 4G
- **Data freshness:** Status updated every 5 min, bus arrivals every 60 sec

---

## File Naming Conventions

- Components: PascalCase (`StatusCard.tsx`)
- Pages: lowercase directory with `page.tsx`
- Utilities: camelCase (`scoring.ts`)
- Data files: kebab-case (`bus-routes.json`)
- Guides: kebab-case slug (`friday-woodlands.mdx`)

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LTA DataMall
LTA_ACCOUNT_KEY=

# Google
GOOGLE_ROUTES_API_KEY=

# Telegram
TELEGRAM_BOT_TOKEN=

# AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# Site
NEXT_PUBLIC_SITE_URL=https://sgborder.live
```
