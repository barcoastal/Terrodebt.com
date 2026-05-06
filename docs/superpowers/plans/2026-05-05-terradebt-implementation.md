# TerraDebt Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship terradebt.com — a 100-page MCA debt relief brand site with multi-step lead capture, AI contract review tool, and a lightweight admin CMS — to production on Railway in ~4 weeks.

**Architecture:** Single Next.js 16 app (App Router) backed by Postgres via Prisma. Server Components for content pages, Server Actions for form submissions, route handlers for the AI tool and webhooks. Tailwind for styling. Cookie-based admin auth. Programmatic page generation for vertical/state pages. Visitor tracking via middleware-set cookies + DB writes.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Prisma, Postgres (Railway), Inter font, Anthropic SDK (Claude), pdf-parse for PDF text extraction, bcrypt for admin auth, iron-session or next-auth for cookies.

**Reference spec:** `docs/superpowers/specs/2026-05-05-terradebt-design.md`

---

## Phase Map

| Phase | What it ships | Tasks | Output |
|---|---|---|---|
| 1 | Foundation: scaffold + DB + brand tokens + base layout | 1-5 | Empty branded shell deployed to Railway |
| 2 | Lead capture: multi-step form + all integrations + visitor tracking | 6-12 | Working homepage with form that captures + routes leads end-to-end |
| 3 | Marketing surfaces: programs, verticals, case studies, articles, state pages | 13-21 | Full content surface, ~92 SEO pages live |
| 4 | AI Contract Review tool | 22-25 | `/contract-review` live, parsing PDFs, optional email capture |
| 5 | Admin CMS | 26-34 | All admin routes, content editable without code |
| 6 | Launch polish: SEO meta, sitemap, structured data, Lighthouse, prod cutover | 35-38 | DNS pointed, indexed, analytics verified |

---

# Phase 1 — Foundation

## Task 1: Initialize Next.js + Prisma + Tailwind, deploy empty app to Railway

**Files:**
- Create: `/Users/baralezrah/terradebt/package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `prisma/schema.prisma`, `.env.example`, `.gitignore`, `README.md`
- Create: `/Users/baralezrah/terradebt/railway.json`

- [ ] **Step 1: Scaffold Next.js**

```bash
cd /Users/baralezrah && npx create-next-app@latest terradebt --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
cd terradebt
```

- [ ] **Step 2: Install Prisma + base deps**

```bash
npm install prisma @prisma/client
npm install -D @types/node
npx prisma init --datasource-provider postgresql
```

- [ ] **Step 3: Add Railway config**

Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma migrate deploy && next build",
    "start": "next start -p $PORT",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  }
}
```

- [ ] **Step 4: Initialize git, first commit**

```bash
git init
git add -A
git commit -m "chore: initial Next.js scaffold with Prisma + Tailwind"
```

- [ ] **Step 5: Create Railway project + Postgres add-on**

```bash
railway login
railway init -n terradebt
railway add --database postgres
```

Set the `DATABASE_URL` from Railway dashboard into local `.env` for development.

- [ ] **Step 6: Push to Railway main, verify deploy**

```bash
railway up
```

Expected: build succeeds, app deploys, default Next.js page renders at the Railway-provided URL.

- [ ] **Step 7: Commit Railway config**

```bash
git add railway.json package.json
git commit -m "chore: Railway config + build script with Prisma migrate"
```

---

## Task 2: Brand tokens, base layout, fonts, global styles

**Files:**
- Modify: `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`
- Create: `app/(site)/layout.tsx`, `components/site/Header.tsx`, `components/site/Footer.tsx`, `lib/brand.ts`

- [ ] **Step 1: Add Inter font + brand tokens to layout**

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "TerraDebt", template: "%s | TerraDebt" },
  description: "MCA debt relief with a published flat fee.",
  metadataBase: new URL("https://terradebt.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-offwhite text-slate font-sans antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Configure Tailwind with brand tokens**

`tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: "#1E293B",
        electric: "#2563EB",
        offwhite: "#F8FAFC",
        border: "#E2E8F0",
        muted: "#64748B",
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 3: Globals**

`app/globals.css`:

```css
@import "tailwindcss";

@layer base {
  body { @apply bg-offwhite text-slate; }
  h1, h2, h3, h4 { @apply font-semibold tracking-tight; }
  a { @apply text-electric hover:underline; }
}
```

- [ ] **Step 4: Header + Footer components**

`components/site/Header.tsx`:

```tsx
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto max-w-content flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-slate no-underline hover:no-underline">TerraDebt</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/programs/settlement">Settlement</Link>
          <Link href="/programs/restructure">Restructure</Link>
          <Link href="/contract-review">Contract Review</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/get-started" className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:no-underline">Get Started</Link>
      </div>
    </header>
  );
}
```

`components/site/Footer.tsx`:

```tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="text-slate font-bold mb-2">TerraDebt</div>
          <p className="text-muted">MCA debt relief with a published flat fee.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Programs</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/programs/settlement">Settlement</Link></li>
            <li><Link href="/programs/restructure">Restructure</Link></li>
            <li><Link href="/programs/reverse-consolidation-defense">Reverse Consolidation Defense</Link></li>
            <li><Link href="/programs/legal-defense">Legal Defense</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Company</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/case-studies">Case Studies</Link></li>
            <li><Link href="/articles">Articles</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Legal</div>
          <ul className="space-y-1 text-muted">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/disclosure">Disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border text-center text-xs text-muted py-4">© {new Date().getFullYear()} TerraDebt. All rights reserved.</div>
    </footer>
  );
}
```

- [ ] **Step 5: Site route group layout**

`app/(site)/layout.tsx`:

```tsx
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
```

Move `app/page.tsx` to `app/(site)/page.tsx`. For now, render a simple placeholder with the brand tokens visible.

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Open http://localhost:3000 — header + footer + Inter font should render with slate text, electric blue CTA button.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: brand tokens, header/footer, site layout"
```

---

## Task 3: Initial Prisma schema + migration

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/<timestamp>_init/migration.sql` (auto-generated)

- [ ] **Step 1: Write the schema**

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  role          String   @default("admin")
  createdAt     DateTime @default(now())
}

model Lead {
  id                  String   @id @default(cuid())
  firstName           String
  lastName            String
  businessName        String
  phone               String
  email               String
  hasMcaDebt          Boolean
  debtAmountBucket    String?
  source              String   @default("homepage")
  status              String   @default("new")
  utmSource           String?
  utmMedium           String?
  utmCampaign         String?
  utmContent          String?
  utmTerm             String?
  gclid               String?
  fbclid              String?
  eliClickid          String?
  ip                  String?
  userAgent           String?
  integrationStatus   Json?
  createdAt           DateTime @default(now())
  contractReview      ContractReview?

  @@index([createdAt])
  @@index([source])
  @@index([status])
}

model ContractReview {
  id                String   @id @default(cuid())
  leadId            String?  @unique
  lead              Lead?    @relation(fields: [leadId], references: [id])
  contractText      String   @db.Text
  contractFilename  String
  aiSummary         Json
  effectiveApr      Float?
  totalPayback      Float?
  redFlags          Json?
  emailCaptured     String?
  createdAt         DateTime @default(now())
}

model Page {
  id              String   @id @default(cuid())
  slug            String   @unique
  templateType    String
  title           String
  heroHeadline    String
  heroSubline     String?
  content         Json
  phoneOverride   String?
  mobileCta       String   @default("form")
  skipPreQual     Boolean  @default(false)
  published       Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String?
  contentMd   String   @db.Text
  heroImage   String?
  author      String   @default("TerraDebt Team")
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Vertical {
  id         String   @id @default(cuid())
  slug       String   @unique
  name       String
  headline   String
  subline    String?
  stats      Json?
  painPoints Json?
  proof      Json?
  faq        Json?
  published  Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model StatePage {
  id         String   @id @default(cuid())
  stateCode  String   @unique
  stateName  String
  content    Json
  published  Boolean  @default(false)
  updatedAt  DateTime @updatedAt
}

model CaseStudy {
  id           String   @id @default(cuid())
  slug         String   @unique
  industry     String
  debtAmount   Float
  savingsPct   Float
  months       Int
  storyMd      String   @db.Text
  heroImage    String?
  published    Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Visitor {
  id           String   @id @default(cuid())
  eliClickid   String   @unique
  ip           String?
  userAgent    String?
  utmSource    String?
  utmMedium    String?
  utmCampaign  String?
  utmContent   String?
  utmTerm      String?
  gclid        String?
  fbclid       String?
  firstSeen    DateTime @default(now())
  lastSeen     DateTime @default(now())
  pageViews    Int      @default(1)
}

model Setting {
  key   String @id
  value Json
}
```

- [ ] **Step 2: Generate and run migration**

```bash
npx prisma migrate dev --name init
```

Expected: `prisma/migrations/<timestamp>_init/migration.sql` created; tables created in dev DB.

- [ ] **Step 3: Add Prisma client singleton**

Create `lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

- [ ] **Step 4: Smoke test**

```bash
npx prisma studio
```

Verify all tables visible in Studio.

- [ ] **Step 5: Commit**

```bash
git add prisma lib/db.ts
git commit -m "feat: initial Prisma schema with all models + client singleton"
```

---

## Task 4: Visitor tracking middleware (eli_clickid + UTM/click ID capture)

**Files:**
- Create: `middleware.ts`, `lib/visitor.ts`, `app/api/visitor/route.ts`

- [ ] **Step 1: Write middleware to set eli_clickid cookie**

`middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "eli_clickid";

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get(COOKIE)) {
    res.cookies.set(COOKIE, makeId(), {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/visitor).*)"],
};
```

- [ ] **Step 2: Visitor upsert helper**

`lib/visitor.ts`:

```ts
import { db } from "./db";

export type VisitorPayload = {
  eliClickid: string;
  ip?: string | null;
  userAgent?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
};

export async function recordVisitor(p: VisitorPayload) {
  await db.visitor.upsert({
    where: { eliClickid: p.eliClickid },
    update: {
      lastSeen: new Date(),
      pageViews: { increment: 1 },
      ip: p.ip ?? undefined,
      userAgent: p.userAgent ?? undefined,
      utmSource: p.utmSource ?? undefined,
      utmMedium: p.utmMedium ?? undefined,
      utmCampaign: p.utmCampaign ?? undefined,
      utmContent: p.utmContent ?? undefined,
      utmTerm: p.utmTerm ?? undefined,
      gclid: p.gclid ?? undefined,
      fbclid: p.fbclid ?? undefined,
    },
    create: {
      eliClickid: p.eliClickid,
      ip: p.ip,
      userAgent: p.userAgent,
      utmSource: p.utmSource,
      utmMedium: p.utmMedium,
      utmCampaign: p.utmCampaign,
      utmContent: p.utmContent,
      utmTerm: p.utmTerm,
      gclid: p.gclid,
      fbclid: p.fbclid,
    },
  });
}
```

- [ ] **Step 3: Visitor pageview route handler**

`app/api/visitor/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { recordVisitor } from "@/lib/visitor";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const eliClickid = req.cookies.get("eli_clickid")?.value;
  if (!eliClickid) return NextResponse.json({ ok: false }, { status: 400 });

  await recordVisitor({
    eliClickid,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null,
    userAgent: req.headers.get("user-agent"),
    utmSource: body.utm_source ?? null,
    utmMedium: body.utm_medium ?? null,
    utmCampaign: body.utm_campaign ?? null,
    utmContent: body.utm_content ?? null,
    utmTerm: body.utm_term ?? null,
    gclid: body.gclid ?? null,
    fbclid: body.fbclid ?? null,
  });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Client-side pageview reporter**

`components/site/VisitorTracker.tsx`:

```tsx
"use client";
import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k);
    const payload = {
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_content: get("utm_content"),
      utm_term: get("utm_term"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
    };
    fetch("/api/visitor", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
    try {
      ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid"].forEach((k) => {
        const v = get(k);
        if (v) localStorage.setItem(`td_${k}`, v);
      });
    } catch {}
  }, []);
  return null;
}
```

Mount in `app/(site)/layout.tsx`:

```tsx
import { VisitorTracker } from "@/components/site/VisitorTracker";
// ... inside the JSX, before SiteFooter:
<VisitorTracker />
```

- [ ] **Step 5: Verify in dev**

```bash
npm run dev
```

Open http://localhost:3000/?utm_source=test&gclid=abc123 — check `Visitor` table in Prisma Studio, confirm row created with utmSource=test, gclid=abc123.

- [ ] **Step 6: Commit**

```bash
git add middleware.ts lib/visitor.ts app/api/visitor components/site/VisitorTracker.tsx app/\(site\)/layout.tsx
git commit -m "feat: visitor tracking with eli_clickid + UTM/gclid capture"
```

---

## Task 5: Seed initial data (settings + state list + verticals)

**Files:**
- Create: `prisma/seed.ts`, `lib/states.ts`, `lib/verticals.ts`
- Modify: `package.json`

- [ ] **Step 1: Constants**

`lib/states.ts`:

```ts
export const STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" }, { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }, { code: "DC", name: "District of Columbia" },
];
```

`lib/verticals.ts`:

```ts
export const VERTICALS = [
  { slug: "trucking", name: "Trucking" },
  { slug: "restaurants", name: "Restaurants" },
  { slug: "construction", name: "Construction" },
  { slug: "healthcare", name: "Healthcare" },
  { slug: "retail", name: "Retail" },
  { slug: "ecommerce", name: "E-commerce" },
  { slug: "salons", name: "Salons & Spas" },
  { slug: "auto", name: "Auto" },
];
```

- [ ] **Step 2: Seed script**

`prisma/seed.ts`:

```ts
import { PrismaClient } from "@prisma/client";
import { STATES } from "../lib/states";
import { VERTICALS } from "../lib/verticals";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  // Settings
  const defaults: Record<string, unknown> = {
    site_phone: "1-800-TERRA-00",
    aggregate_resolved_dollars: 0,
    bbb_status: "founding",
    slack_leads_webhook_url: "",
    coastal_crm_webhook_url: "",
    ga4_measurement_id: "",
    google_ads_conversion_id: "",
    anthropic_api_key_present: false,
  };
  for (const [key, value] of Object.entries(defaults)) {
    await db.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  // States — published shells, content filled in Phase 3
  for (const s of STATES) {
    await db.statePage.upsert({
      where: { stateCode: s.code },
      update: { stateName: s.name },
      create: { stateCode: s.code, stateName: s.name, content: {}, published: false },
    });
  }

  // Verticals — published shells
  for (const v of VERTICALS) {
    await db.vertical.upsert({
      where: { slug: v.slug },
      update: { name: v.name },
      create: { slug: v.slug, name: v.name, headline: `MCA Relief for ${v.name}`, published: false },
    });
  }

  // Default admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "bar@albert-capital.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "change-me-now";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, role: "admin" },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
```

- [ ] **Step 3: Wire up seed in package.json**

```json
{
  "prisma": { "seed": "tsx prisma/seed.ts" },
  "devDependencies": { "tsx": "^4.0.0", "bcryptjs": "^2.4.3", "@types/bcryptjs": "^2.4.6" }
}
```

```bash
npm install -D tsx bcryptjs @types/bcryptjs
```

- [ ] **Step 4: Run seed**

```bash
npx prisma db seed
```

Expected: 50 states, 8 verticals, 8 settings, 1 admin user inserted. Verify in Studio.

- [ ] **Step 5: Commit**

```bash
git add prisma/seed.ts lib/states.ts lib/verticals.ts package.json package-lock.json
git commit -m "feat: seed states, verticals, settings, admin user"
```

---

# Phase 2 — Lead capture & integrations

## Task 6: Multi-step form component

**Files:**
- Create: `components/lead/LeadForm.tsx`, `components/lead/Step.tsx`, `components/lead/ProgressBar.tsx`, `lib/lead-schema.ts`

- [ ] **Step 1: Zod schema**

```bash
npm install zod
```

`lib/lead-schema.ts`:

```ts
import { z } from "zod";

export const debtBuckets = ["<25k", "25k-75k", "75k-200k", "200k-500k", "500k+"] as const;

export const leadSchema = z.object({
  hasMcaDebt: z.boolean(),
  debtAmountBucket: z.enum(debtBuckets).nullable().optional(),
  businessName: z.string().min(1, "Business name required"),
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  phone: z.string().min(7, "Valid phone required"),
  email: z.string().email("Valid email required"),
  source: z.string().default("homepage"),
});

export type LeadInput = z.infer<typeof leadSchema>;
```

- [ ] **Step 2: ProgressBar component**

`components/lead/ProgressBar.tsx`:

```tsx
export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
      <div className="h-full bg-electric transition-all duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
```

- [ ] **Step 3: LeadForm component**

`components/lead/LeadForm.tsx`:

```tsx
"use client";
import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { debtBuckets, type LeadInput } from "@/lib/lead-schema";
import { submitLead } from "@/app/actions/submit-lead";

const initial: LeadInput = {
  hasMcaDebt: true,
  debtAmountBucket: null,
  businessName: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  source: "homepage",
};

const TOTAL_STEPS = 7;

export function LeadForm({ source = "homepage" }: { source?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadInput>({ ...initial, source });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof LeadInput>(k: K, v: LeadInput[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const meta = readClientMeta();
      const result = await submitLead({ ...data, ...meta });
      if (result.ok) setDone(true);
      else setError(result.error ?? "Submission failed");
    } catch {
      setError("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  function next() { setStep((s) => Math.min(s + 1, TOTAL_STEPS)); }
  function back() { setStep((s) => Math.max(s - 1, 1)); }

  if (done) {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center">
        <h3 className="text-xl font-semibold">Thanks — we'll call you within 1 business hour.</h3>
        <p className="text-muted mt-2">Watch for a call from a {data.firstName ? "TerraDebt advisor" : "TerraDebt advisor"}. If you'd rather book a time, call us at 1-800-TERRA-00.</p>
      </div>
    );
  }

  if (data.hasMcaDebt === false && step === 2) {
    return (
      <div className="rounded-xl border border-border bg-white p-8">
        <h3 className="text-xl font-semibold">We focus on MCA-specific situations.</h3>
        <p className="text-muted mt-2">Drop your email and we'll send a free guide to small-business debt options.</p>
        <input type="email" placeholder="you@business.com" className="mt-4 w-full border border-border rounded-md px-3 py-2"
               value={data.email} onChange={(e) => update("email", e.target.value)} />
        <button onClick={handleSubmit} disabled={!data.email || submitting} className="mt-4 w-full bg-electric text-white px-4 py-2 rounded-md font-medium disabled:opacity-50">{submitting ? "Sending..." : "Send guide"}</button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white p-8">
      <ProgressBar step={step} total={TOTAL_STEPS} />
      <div className="mt-6 min-h-[200px]">
        {step === 1 && (
          <Question label="Do you have MCA debt?">
            <div className="flex gap-3">
              <Choice active={data.hasMcaDebt === true} onClick={() => { update("hasMcaDebt", true); next(); }}>Yes</Choice>
              <Choice active={data.hasMcaDebt === false} onClick={() => { update("hasMcaDebt", false); next(); }}>No</Choice>
            </div>
          </Question>
        )}
        {step === 2 && data.hasMcaDebt && (
          <Question label="How much MCA debt do you currently owe?">
            <div className="grid grid-cols-2 gap-2">
              {debtBuckets.map((b) => (
                <Choice key={b} active={data.debtAmountBucket === b} onClick={() => { update("debtAmountBucket", b); next(); }}>
                  {label(b)}
                </Choice>
              ))}
            </div>
          </Question>
        )}
        {step === 3 && (
          <Question label="What's your business name?">
            <Input value={data.businessName} onChange={(v) => update("businessName", v)} placeholder="Acme Trucking LLC" />
          </Question>
        )}
        {step === 4 && (
          <Question label="What's your first name?">
            <Input value={data.firstName} onChange={(v) => update("firstName", v)} placeholder="Jordan" />
          </Question>
        )}
        {step === 5 && (
          <Question label="And your last name?">
            <Input value={data.lastName} onChange={(v) => update("lastName", v)} placeholder="Pierce" />
          </Question>
        )}
        {step === 6 && (
          <Question label="Best phone to reach you?">
            <Input value={data.phone} onChange={(v) => update("phone", v)} placeholder="(555) 123-4567" type="tel" />
          </Question>
        )}
        {step === 7 && (
          <Question label="Your email?">
            <Input value={data.email} onChange={(v) => update("email", v)} placeholder="you@business.com" type="email" />
          </Question>
        )}
      </div>
      <div className="flex justify-between mt-6">
        {step > 1 ? <button onClick={back} className="text-muted text-sm">← Back</button> : <span />}
        {step >= 3 && step < 7 && (
          <button onClick={next} disabled={!isStepValid(step, data)} className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">Next →</button>
        )}
        {step === 7 && (
          <button onClick={handleSubmit} disabled={!isStepValid(7, data) || submitting} className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">{submitting ? "Submitting..." : "Get my analysis"}</button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-lg font-semibold text-slate mb-4">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full border border-border rounded-md px-3 py-3 text-base" />;
}

function Choice({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-3 rounded-md border text-sm font-medium ${active ? "border-electric bg-electric/5 text-electric" : "border-border bg-white text-slate hover:border-electric"}`}>{children}</button>
  );
}

function label(b: string) {
  switch (b) {
    case "<25k": return "Less than $25K";
    case "25k-75k": return "$25K – $75K";
    case "75k-200k": return "$75K – $200K";
    case "200k-500k": return "$200K – $500K";
    case "500k+": return "$500K+";
    default: return b;
  }
}

function isStepValid(step: number, d: LeadInput) {
  if (step === 3) return d.businessName.trim().length > 0;
  if (step === 4) return d.firstName.trim().length > 0;
  if (step === 5) return d.lastName.trim().length > 0;
  if (step === 6) return d.phone.trim().length >= 7;
  if (step === 7) return /\S+@\S+\.\S+/.test(d.email);
  return true;
}

function readClientMeta() {
  try {
    const get = (k: string) => localStorage.getItem(`td_${k}`) ?? undefined;
    return {
      utmSource: get("utm_source"),
      utmMedium: get("utm_medium"),
      utmCampaign: get("utm_campaign"),
      utmContent: get("utm_content"),
      utmTerm: get("utm_term"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
    };
  } catch { return {}; }
}
```

- [ ] **Step 4: Commit**

```bash
git add components/lead lib/lead-schema.ts
git commit -m "feat: 7-step multi-step lead form component"
```

---

## Task 7: Server action for lead submission + DB insert

**Files:**
- Create: `app/actions/submit-lead.ts`, `lib/lead-service.ts`, `lib/integrations/index.ts`

- [ ] **Step 1: Lead service (DB write only, integrations stubbed)**

`lib/lead-service.ts`:

```ts
import { db } from "./db";
import { leadSchema, type LeadInput } from "./lead-schema";
import type { Prisma } from "@prisma/client";

export type LeadSubmitInput = LeadInput & {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  eliClickid?: string;
  ip?: string | null;
  userAgent?: string | null;
};

export async function createLead(input: LeadSubmitInput) {
  const parsed = leadSchema.parse({
    hasMcaDebt: input.hasMcaDebt,
    debtAmountBucket: input.debtAmountBucket,
    businessName: input.businessName || "(no-mca off-ramp)",
    firstName: input.firstName || "Unknown",
    lastName: input.lastName || "Unknown",
    phone: input.phone || "0000000000",
    email: input.email,
    source: input.source,
  });
  const data: Prisma.LeadCreateInput = {
    ...parsed,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmContent: input.utmContent,
    utmTerm: input.utmTerm,
    gclid: input.gclid,
    fbclid: input.fbclid,
    eliClickid: input.eliClickid,
    ip: input.ip ?? undefined,
    userAgent: input.userAgent ?? undefined,
    integrationStatus: { db: "ok" },
  };
  return db.lead.create({ data });
}
```

- [ ] **Step 2: Integrations stub (filled in Tasks 8-11)**

`lib/integrations/index.ts`:

```ts
import type { Lead } from "@prisma/client";

export type IntegrationResult = { name: string; ok: boolean; error?: string };

export async function fanOutIntegrations(_lead: Lead): Promise<IntegrationResult[]> {
  // Filled in subsequent tasks: Slack, CRM webhook, GA4, Google Ads
  return [];
}
```

- [ ] **Step 3: Server action**

`app/actions/submit-lead.ts`:

```ts
"use server";
import { cookies, headers } from "next/headers";
import { createLead, type LeadSubmitInput } from "@/lib/lead-service";
import { fanOutIntegrations } from "@/lib/integrations";
import { db } from "@/lib/db";

export async function submitLead(input: Omit<LeadSubmitInput, "ip" | "userAgent" | "eliClickid">) {
  try {
    const c = await cookies();
    const h = await headers();
    const lead = await createLead({
      ...input,
      eliClickid: c.get("eli_clickid")?.value,
      ip: h.get("x-forwarded-for")?.split(",")[0] ?? null,
      userAgent: h.get("user-agent"),
    });
    const results = await fanOutIntegrations(lead);
    await db.lead.update({ where: { id: lead.id }, data: { integrationStatus: { db: "ok", integrations: results } } });
    return { ok: true as const, leadId: lead.id };
  } catch (e) {
    console.error("submitLead failed", e);
    return { ok: false as const, error: e instanceof Error ? e.message : "unknown" };
  }
}
```

- [ ] **Step 4: Wire LeadForm into a placeholder homepage**

Update `app/(site)/page.tsx`:

```tsx
import { LeadForm } from "@/components/lead/LeadForm";

export default function Home() {
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate leading-tight">MCA debt relief, with a published flat fee.</h1>
        <p className="mt-4 text-lg text-muted">No upfront fees. No monthly retainers. We tell you the number before you sign anything.</p>
      </div>
      <LeadForm source="homepage" />
    </section>
  );
}
```

- [ ] **Step 5: Test end-to-end**

```bash
npm run dev
```

Open homepage, complete the 7-step form, submit. Verify a row appears in `Lead` table in Studio with all UTM/cookie metadata populated.

- [ ] **Step 6: Commit**

```bash
git add app/actions app/\(site\)/page.tsx lib/lead-service.ts lib/integrations
git commit -m "feat: lead submission server action + DB persistence"
```

---

## Task 8: Slack webhook integration

**Files:**
- Create: `lib/integrations/slack.ts`
- Modify: `lib/integrations/index.ts`, `.env.example`

- [ ] **Step 1: Slack notifier**

`lib/integrations/slack.ts`:

```ts
import type { Lead } from "@prisma/client";
import type { IntegrationResult } from ".";

export async function notifySlack(lead: Lead): Promise<IntegrationResult> {
  const url = process.env.SLACK_LEADS_WEBHOOK_URL;
  if (!url) return { name: "slack", ok: false, error: "SLACK_LEADS_WEBHOOK_URL not set" };

  const text = `*New TerraDebt lead* :seedling:
*Name:* ${lead.firstName} ${lead.lastName}
*Business:* ${lead.businessName}
*Email:* ${lead.email}
*Phone:* ${lead.phone}
*Has MCA debt:* ${lead.hasMcaDebt ? "Yes" : "No"}
*Debt:* ${lead.debtAmountBucket ?? "n/a"}
*Source:* ${lead.source}
*UTM:* ${lead.utmSource ?? "—"} / ${lead.utmCampaign ?? "—"}
*gclid:* ${lead.gclid ?? "—"}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return { name: "slack", ok: false, error: `HTTP ${res.status}` };
    return { name: "slack", ok: true };
  } catch (e) {
    return { name: "slack", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
```

- [ ] **Step 2: Update fanOutIntegrations**

```ts
import type { Lead } from "@prisma/client";
import { notifySlack } from "./slack";

export type IntegrationResult = { name: string; ok: boolean; error?: string };

export async function fanOutIntegrations(lead: Lead): Promise<IntegrationResult[]> {
  return Promise.all([notifySlack(lead)]);
}
```

- [ ] **Step 3: Document env var**

Append to `.env.example`:

```
SLACK_LEADS_WEBHOOK_URL=
```

- [ ] **Step 4: Manual test**

Set `SLACK_LEADS_WEBHOOK_URL` to a real Slack incoming webhook URL in `.env.local`, restart dev, submit a test lead, confirm Slack message arrives.

- [ ] **Step 5: Commit**

```bash
git add lib/integrations .env.example
git commit -m "feat: Slack webhook integration for new leads"
```

---

## Task 9: Coastal Debt CRM webhook integration

**Files:**
- Create: `lib/integrations/crm.ts`
- Modify: `lib/integrations/index.ts`, `.env.example`

- [ ] **Step 1: CRM notifier**

`lib/integrations/crm.ts`:

```ts
import type { Lead } from "@prisma/client";
import type { IntegrationResult } from ".";

export async function postToCrm(lead: Lead): Promise<IntegrationResult> {
  const url = process.env.COASTAL_CRM_WEBHOOK_URL;
  const secret = process.env.COASTAL_CRM_WEBHOOK_SECRET;
  if (!url) return { name: "crm", ok: false, error: "COASTAL_CRM_WEBHOOK_URL not set" };

  const payload = {
    source: "terradebt",
    lead: {
      first_name: lead.firstName,
      last_name: lead.lastName,
      business_name: lead.businessName,
      email: lead.email,
      phone: lead.phone,
      has_mca_debt: lead.hasMcaDebt,
      debt_amount_bucket: lead.debtAmountBucket,
      utm: {
        source: lead.utmSource, medium: lead.utmMedium, campaign: lead.utmCampaign,
        content: lead.utmContent, term: lead.utmTerm,
      },
      click_ids: { gclid: lead.gclid, fbclid: lead.fbclid, eli_clickid: lead.eliClickid },
      created_at: lead.createdAt,
      terra_lead_id: lead.id,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-webhook-secret": secret } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { name: "crm", ok: false, error: `HTTP ${res.status}` };
    return { name: "crm", ok: true };
  } catch (e) {
    return { name: "crm", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}
```

- [ ] **Step 2: Add to fanOut**

```ts
import { postToCrm } from "./crm";
// inside fanOutIntegrations:
return Promise.all([notifySlack(lead), postToCrm(lead)]);
```

- [ ] **Step 3: Env**

```
COASTAL_CRM_WEBHOOK_URL=
COASTAL_CRM_WEBHOOK_SECRET=
```

- [ ] **Step 4: Commit**

```bash
git add lib/integrations .env.example
git commit -m "feat: post leads to Coastal Debt CRM webhook with source=terradebt"
```

---

## Task 10: GA4 conversion event (server-side via Measurement Protocol)

**Files:**
- Create: `lib/integrations/ga4.ts`
- Modify: `lib/integrations/index.ts`, `.env.example`, `components/site/Analytics.tsx`, `app/(site)/layout.tsx`

- [ ] **Step 1: GA4 tag in browser**

Install gtag for client-side pageviews:

`components/site/Analytics.tsx`:

```tsx
"use client";
import Script from "next/script";

export function Analytics({ measurementId }: { measurementId?: string }) {
  if (!measurementId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
```

Mount in `app/(site)/layout.tsx`:

```tsx
import { Analytics } from "@/components/site/Analytics";
// inside JSX:
<Analytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
```

- [ ] **Step 2: Server-side conversion via Measurement Protocol**

`lib/integrations/ga4.ts`:

```ts
import type { Lead } from "@prisma/client";
import type { IntegrationResult } from ".";
import crypto from "node:crypto";

export async function fireGa4Conversion(lead: Lead): Promise<IntegrationResult> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return { name: "ga4", ok: false, error: "GA4 env vars not set" };

  const clientId = lead.eliClickid ?? crypto.randomUUID();
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
  const payload = {
    client_id: clientId,
    user_id: lead.id,
    events: [{
      name: "generate_lead",
      params: {
        currency: "USD",
        value: bucketToValue(lead.debtAmountBucket),
        terra_source: lead.source,
        debt_bucket: lead.debtAmountBucket ?? "unknown",
      },
    }],
  };

  try {
    const res = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
    if (!res.ok) return { name: "ga4", ok: false, error: `HTTP ${res.status}` };
    return { name: "ga4", ok: true };
  } catch (e) {
    return { name: "ga4", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

function bucketToValue(b: string | null): number {
  switch (b) {
    case "<25k": return 50;
    case "25k-75k": return 100;
    case "75k-200k": return 200;
    case "200k-500k": return 400;
    case "500k+": return 800;
    default: return 25;
  }
}
```

- [ ] **Step 3: Add to fanOut**

```ts
import { fireGa4Conversion } from "./ga4";
return Promise.all([notifySlack(lead), postToCrm(lead), fireGa4Conversion(lead)]);
```

- [ ] **Step 4: Env**

```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
GA4_MEASUREMENT_ID=
GA4_API_SECRET=
```

- [ ] **Step 5: Commit**

```bash
git add lib/integrations components/site/Analytics.tsx app/\(site\)/layout.tsx .env.example
git commit -m "feat: GA4 client-side tag + server-side generate_lead conversion"
```

---

## Task 11: Google Ads offline conversion upload

**Files:**
- Create: `lib/integrations/google-ads.ts`
- Modify: `lib/integrations/index.ts`, `.env.example`

- [ ] **Step 1: Install google-ads-api SDK**

```bash
npm install google-ads-api
```

- [ ] **Step 2: Conversion uploader**

`lib/integrations/google-ads.ts`:

```ts
import type { Lead } from "@prisma/client";
import type { IntegrationResult } from ".";

export async function uploadGoogleAdsConversion(lead: Lead): Promise<IntegrationResult> {
  if (!lead.gclid) return { name: "google_ads", ok: false, error: "no gclid" };

  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  if (!customerId || !developerToken || !conversionActionId || !refreshToken || !clientId || !clientSecret) {
    return { name: "google_ads", ok: false, error: "Google Ads env vars not set" };
  }

  const { GoogleAdsApi } = await import("google-ads-api");
  const client = new GoogleAdsApi({ client_id: clientId, client_secret: clientSecret, developer_token: developerToken });
  const customer = client.Customer({ customer_id: customerId, refresh_token: refreshToken, login_customer_id: loginCustomerId });

  const conversionActionResource = `customers/${customerId}/conversionActions/${conversionActionId}`;

  try {
    const result = await customer.conversionUploads.uploadClickConversions([
      {
        conversion_action: conversionActionResource,
        gclid: lead.gclid,
        conversion_date_time: formatGclidDate(lead.createdAt),
        conversion_value: bucketToValue(lead.debtAmountBucket),
        currency_code: "USD",
        order_id: lead.id,
      },
    ], { partial_failure: true, validate_only: false });
    return { name: "google_ads", ok: true };
  } catch (e) {
    return { name: "google_ads", ok: false, error: e instanceof Error ? e.message : "unknown" };
  }
}

function formatGclidDate(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}+00:00`;
}

function bucketToValue(b: string | null): number {
  switch (b) {
    case "<25k": return 50;
    case "25k-75k": return 100;
    case "75k-200k": return 200;
    case "200k-500k": return 400;
    case "500k+": return 800;
    default: return 25;
  }
}
```

- [ ] **Step 3: Add to fanOut**

```ts
import { uploadGoogleAdsConversion } from "./google-ads";
return Promise.all([
  notifySlack(lead),
  postToCrm(lead),
  fireGa4Conversion(lead),
  uploadGoogleAdsConversion(lead),
]);
```

- [ ] **Step 4: Env**

```
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
GOOGLE_ADS_REFRESH_TOKEN=
GOOGLE_ADS_CONVERSION_ACTION_ID=
```

> Note: TerraDebt gets its own Google Ads OAuth credentials. Do not reuse Coastal/Mirai keys (per the no-cross-project-keys rule).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json lib/integrations .env.example
git commit -m "feat: Google Ads offline conversion upload via gclid"
```

---

## Task 12: Smoke-test the end-to-end lead flow with all integrations

- [ ] **Step 1: Set all env vars** in `.env.local` (Slack, CRM, GA4, Google Ads). Use sandbox credentials where possible.

- [ ] **Step 2: Run dev**

```bash
npm run dev
```

- [ ] **Step 3: Submit a test lead** via the homepage form with a fake gclid in the URL: `?gclid=TEST123&utm_source=test`

- [ ] **Step 4: Verify each integration**
- DB: `Lead` row exists with `integrationStatus.integrations` array showing each result
- Slack: message posted in test channel
- CRM: Coastal Debt receives webhook (check Coastal logs)
- GA4: realtime event `generate_lead` shows up in GA4 DebugView
- Google Ads: conversion appears in Google Ads UI within 6 hours (or `validate_only` succeeds in dev)

- [ ] **Step 5: Deploy phase 2 to Railway**

```bash
git push origin main
railway logs --tail 100
```

Verify deploy succeeds and form works on production URL.

- [ ] **Step 6: Commit any fixes from smoke test**

---

# Phase 3 — Marketing surfaces

## Task 13: Homepage (final)

**Files:**
- Modify: `app/(site)/page.tsx`
- Create: `components/site/Hero.tsx`, `components/site/HowItWorks.tsx`, `components/site/TrustStrip.tsx`, `components/site/CaseStudyCarousel.tsx`, `components/site/VerticalGrid.tsx`, `components/site/FounderSection.tsx`, `components/site/Faq.tsx`, `components/site/AggregateCounter.tsx`

- [ ] **Step 1: TrustStrip**

`components/site/TrustStrip.tsx`:

```tsx
export function TrustStrip() {
  return (
    <div className="border-y border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-6 items-center text-muted text-xs uppercase tracking-wide">
        <div className="text-center">As featured in</div>
        <div className="text-center">Forbes</div>
        <div className="text-center">Inc</div>
        <div className="text-center">Bloomberg</div>
        <div className="text-center">WSJ</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Hero with form**

`components/site/Hero.tsx`:

```tsx
import { LeadForm } from "@/components/lead/LeadForm";
import { AggregateCounter } from "./AggregateCounter";

export function Hero() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">Transparent flat fee</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate leading-tight">MCA debt relief, with a published flat fee.</h1>
          <p className="mt-4 text-lg text-muted max-w-xl">No upfront fees. No monthly retainers. We tell you the number before you sign anything — and we work with stacked MCAs, even before you default.</p>
          <AggregateCounter />
          <ul className="mt-6 space-y-2 text-sm text-slate">
            <li>✓ Flat fee, published</li>
            <li>✓ No upfront cost</li>
            <li>✓ Pre-default and post-default programs</li>
            <li>✓ Free AI contract review</li>
          </ul>
        </div>
        <LeadForm source="homepage" />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: AggregateCounter (DB-backed)**

`components/site/AggregateCounter.tsx`:

```tsx
import { db } from "@/lib/db";

export async function AggregateCounter() {
  const setting = await db.setting.findUnique({ where: { key: "aggregate_resolved_dollars" } });
  const value = (setting?.value as number) ?? 0;
  if (!value) return <p className="mt-4 text-sm text-muted">Founding cohort. We resolve real cases — quietly, while we build the brand.</p>;
  const formatted = `$${(value / 1_000_000).toFixed(1)}M+`;
  return <p className="mt-4 text-sm font-medium text-slate">{formatted} in MCA debt resolved for our clients.</p>;
}
```

- [ ] **Step 4: HowItWorks, VerticalGrid, FounderSection, Faq**

(Each is a simple presentational section. Use the same Tailwind tokens. ~30-50 LOC each. See spec §9 for content.)

- [ ] **Step 5: Compose homepage**

`app/(site)/page.tsx`:

```tsx
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { HowItWorks } from "@/components/site/HowItWorks";
import { VerticalGrid } from "@/components/site/VerticalGrid";
import { CaseStudyCarousel } from "@/components/site/CaseStudyCarousel";
import { FounderSection } from "@/components/site/FounderSection";
import { Faq } from "@/components/site/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <VerticalGrid />
      <CaseStudyCarousel />
      <FounderSection />
      <Faq />
    </>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/site app/\(site\)/page.tsx
git commit -m "feat: homepage with hero, trust strip, how it works, vertical grid, case study carousel, founder, FAQ"
```

---

## Task 14: Program pages (4)

**Files:**
- Create: `app/(site)/programs/[slug]/page.tsx`, `lib/programs.ts`

- [ ] **Step 1: Program data**

`lib/programs.ts`:

```ts
export type ProgramKey = "settlement" | "restructure" | "reverse-consolidation-defense" | "legal-defense";

export const PROGRAMS: Record<ProgramKey, {
  title: string;
  headline: string;
  subline: string;
  whoFor: string[];
  mechanism: string[];
  example: { debt: number; saved: number; months: number };
}> = {
  "settlement": {
    title: "MCA Settlement",
    headline: "Settle stacked MCAs for less than you owe.",
    subline: "We negotiate balances down with each MCA lender, typically 40-60%, and structure a single affordable plan.",
    whoFor: [
      "Behind on 2+ MCA payments",
      "Account frozen or facing UCC liens",
      "Total MCA debt $50K-$2M+",
    ],
    mechanism: [
      "Pause MCA debits via reconciliation request",
      "Negotiate settled-balance per lender",
      "Structure unified monthly payment to TerraDebt-managed escrow",
      "Disburse to lenders as settlements close",
    ],
    example: { debt: 425000, saved: 178500, months: 11 },
  },
  "restructure": {
    title: "MCA Restructure",
    headline: "Restructure your MCAs into one manageable monthly payment.",
    subline: "We renegotiate terms with each lender so your payments fit your actual cash flow — without settling.",
    whoFor: ["Current but stretched on stacked MCAs", "Want to preserve lender relationships", "Total debt $25K-$1M"],
    mechanism: [
      "Aggregate all MCA contracts and effective APRs",
      "Negotiate extended terms / lower daily debit per lender",
      "Single monthly payment plan",
      "Optional: pair with refi if business qualifies",
    ],
    example: { debt: 320000, saved: 96000, months: 14 },
  },
  "reverse-consolidation-defense": {
    title: "Reverse Consolidation Defense",
    headline: "Already in reverse consolidation? Get out without losing more.",
    subline: "Reverse consolidation often makes things worse. We unwind the consolidation and renegotiate with the underlying MCAs.",
    whoFor: [
      "Currently in a reverse consolidation",
      "Total debt actually grew after consolidating",
      "Daily debits exceed sustainable cash flow",
    ],
    mechanism: [
      "Audit current reverse-consolidation contract",
      "Identify breach + unwind opportunities",
      "Engage underlying MCA holders directly",
      "Settle or restructure underlying debt",
    ],
    example: { debt: 540000, saved: 220000, months: 13 },
  },
  "legal-defense": {
    title: "MCA Legal Defense",
    headline: "Sued? COJ filed? Account frozen? We coordinate immediate legal defense.",
    subline: "Through our network of MCA-defense attorneys in all 50 states, we coordinate response within 72 hours.",
    whoFor: ["Confession of Judgment filed", "Account frozen / UCC enforcement", "Active litigation from MCA lender"],
    mechanism: [
      "Within 72 hours: emergency attorney engagement",
      "File defense, motion to vacate where applicable",
      "Negotiate settlement parallel to litigation",
      "Coordinate restraining orders for frozen accounts",
    ],
    example: { debt: 280000, saved: 134000, months: 8 },
  },
};
```

- [ ] **Step 2: Program page**

`app/(site)/programs/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { PROGRAMS, type ProgramKey } from "@/lib/programs";
import { LeadForm } from "@/components/lead/LeadForm";

export async function generateStaticParams() {
  return Object.keys(PROGRAMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) return {};
  return { title: p.title, description: p.subline };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROGRAMS[slug as ProgramKey];
  if (!p) notFound();

  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{p.headline}</h1>
            <p className="mt-4 text-lg text-muted">{p.subline}</p>
          </div>
          <LeadForm source={`program-${slug}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold">Who this is for</h2>
          <ul className="mt-4 space-y-2 text-slate">{p.whoFor.map((item) => <li key={item}>✓ {item}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 space-y-2 text-slate list-decimal list-inside">{p.mechanism.map((m) => <li key={m}>{m}</li>)}</ol>
        </div>
      </section>
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-12">
          <h2 className="text-2xl font-semibold">Recent example</h2>
          <p className="mt-4 text-slate">${(p.example.debt / 1000).toFixed(0)}K resolved over {p.example.months} months — saved ${(p.example.saved / 1000).toFixed(0)}K ({Math.round((p.example.saved / p.example.debt) * 100)}%).</p>
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 3: Verify all 4 routes render**

```bash
npm run dev
```

Visit `/programs/settlement`, `/programs/restructure`, `/programs/reverse-consolidation-defense`, `/programs/legal-defense`.

- [ ] **Step 4: Commit**

```bash
git add app/\(site\)/programs lib/programs.ts
git commit -m "feat: 4 program pages (settlement, restructure, RC defense, legal defense)"
```

---

## Task 15: Vertical pages (8)

**Files:**
- Create: `app/(site)/industries/[slug]/page.tsx`, `lib/vertical-content.ts`

- [ ] **Step 1: Vertical content**

`lib/vertical-content.ts`:

```ts
export type VerticalContent = {
  slug: string;
  name: string;
  headline: string;
  subline: string;
  pains: string[];
  stats: { label: string; value: string }[];
  faq: { q: string; a: string }[];
};

export const VERTICAL_CONTENT: VerticalContent[] = [
  {
    slug: "trucking",
    name: "Trucking",
    headline: "MCA Relief for Trucking Companies",
    subline: "From owner-operators to small fleets — we know how factoring stacks on top of MCAs and how to unwind both.",
    pains: ["Daily MCA debits eating into fuel and driver pay", "Factoring company holding back invoices", "Equipment financing on top of MCAs"],
    stats: [{ label: "Avg savings", value: "47%" }, { label: "Avg timeline", value: "9-14 months" }, { label: "Trucking clients served", value: "growing" }],
    faq: [
      { q: "Will my CDL be at risk?", a: "No. MCA debt is business debt — your CDL is personal licensure and is not affected by debt resolution." },
      { q: "Can I keep operating during the program?", a: "Yes. Our restructure and settlement programs are designed to keep your business operating, not shut it down." },
    ],
  },
  // ... 7 more verticals (restaurants, construction, healthcare, retail, ecommerce, salons, auto)
  // Same shape — fill in with vertical-specific copy. Each one ~80 LOC of content.
];
```

> **Implementation note:** fill in 7 more vertical entries following the same shape. Use the spec content angle (transparent + pre-default + flat fee) consistently across all 8.

- [ ] **Step 2: Vertical page**

`app/(site)/industries/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { LeadForm } from "@/components/lead/LeadForm";

export async function generateStaticParams() {
  return VERTICAL_CONTENT.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  return v ? { title: v.headline, description: v.subline } : {};
}

export default async function VerticalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = VERTICAL_CONTENT.find((x) => x.slug === slug);
  if (!v) notFound();
  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{v.headline}</h1>
            <p className="mt-4 text-lg text-muted">{v.subline}</p>
          </div>
          <LeadForm source={`vertical-${slug}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-6">
        {v.stats.map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-electric">{s.value}</div>
            <div className="text-sm text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-content px-6 pb-16">
        <h2 className="text-2xl font-semibold">Common pain points we solve</h2>
        <ul className="mt-4 space-y-2 text-slate">{v.pains.map((p) => <li key={p}>• {p}</li>)}</ul>
      </section>
      <section className="bg-white border-y border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="text-2xl font-semibold">FAQ — {v.name}</h2>
          <dl className="mt-4 space-y-4">{v.faq.map((f) => (
            <div key={f.q}>
              <dt className="font-medium text-slate">{f.q}</dt>
              <dd className="mt-1 text-muted">{f.a}</dd>
            </div>
          ))}</dl>
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/industries lib/vertical-content.ts
git commit -m "feat: 8 industry vertical pages with parameterized template"
```

---

## Task 16: Case studies (10)

**Files:**
- Create: `app/(site)/case-studies/page.tsx`, `app/(site)/case-studies/[slug]/page.tsx`, `prisma/seed-case-studies.ts`

- [ ] **Step 1: Seed case studies**

`prisma/seed-case-studies.ts`:

```ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const STUDIES = [
  { slug: "trucking-425k", industry: "Trucking", debtAmount: 425000, savingsPct: 42, months: 11, storyMd: "## The situation\n...\n\n## What we did\n...\n\n## Outcome\n..." },
  // ... 9 more — fill in with realistic detail. Match the spec §9: industry / debt / % / months / 200-400-word story
];

async function main() {
  for (const s of STUDIES) {
    await db.caseStudy.upsert({ where: { slug: s.slug }, update: { ...s, published: true }, create: { ...s, published: true } });
  }
}
main().catch(console.error).finally(() => db.$disconnect());
```

```bash
npx tsx prisma/seed-case-studies.ts
```

- [ ] **Step 2: Index page**

`app/(site)/case-studies/page.tsx`:

```tsx
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Case Studies", description: "Real MCA debt outcomes from TerraDebt clients." };

export default async function CaseStudiesIndex() {
  const studies = await db.caseStudy.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <section className="mx-auto max-w-content px-6 py-16">
      <h1 className="text-4xl font-bold">Case Studies</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {studies.map((s) => (
          <Link key={s.id} href={`/case-studies/${s.slug}`} className="block p-6 bg-white border border-border rounded-xl no-underline hover:border-electric">
            <div className="text-sm text-muted">{s.industry}</div>
            <div className="mt-1 text-xl font-semibold text-slate">${(s.debtAmount / 1000).toFixed(0)}K resolved · {s.savingsPct}% saved · {s.months} months</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Detail page (markdown render)**

```bash
npm install react-markdown remark-gfm
```

`app/(site)/case-studies/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await db.caseStudy.findUnique({ where: { slug } });
  if (!s || !s.published) notFound();
  return (
    <article className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <div className="text-sm text-muted">{s.industry}</div>
        <h1 className="mt-2 text-4xl font-bold">${(s.debtAmount / 1000).toFixed(0)}K resolved · {s.savingsPct}% saved · {s.months} months</h1>
        <div className="prose mt-8 max-w-none"><ReactMarkdown remarkPlugins={[remarkGfm]}>{s.storyMd}</ReactMarkdown></div>
      </div>
      <aside className="sticky top-8 self-start">
        <LeadForm source={`case-study-${slug}`} />
      </aside>
    </article>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/\(site\)/case-studies prisma/seed-case-studies.ts package.json package-lock.json
git commit -m "feat: 10 case studies with index + detail pages"
```

---

## Task 17: Articles (20) with markdown rendering

**Files:**
- Create: `app/(site)/articles/page.tsx`, `app/(site)/articles/[slug]/page.tsx`, `prisma/seed-articles.ts`

- [ ] **Step 1: Seed 20 articles**

`prisma/seed-articles.ts`:

```ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const ARTICLES = [
  { slug: "what-is-reverse-consolidation", title: "What is reverse consolidation, and why it usually backfires", excerpt: "Reverse consolidation looks like relief but often grows your total debt.", contentMd: "## TL;DR\n..." },
  { slug: "mca-settlement-vs-restructure", title: "MCA settlement vs restructure: which is right for your business", excerpt: "Two different paths to MCA debt relief — here's how to choose.", contentMd: "..." },
  { slug: "how-to-read-your-mca-contract", title: "How to read your MCA contract: a line-by-line guide", excerpt: "What to look for in the fine print before you sign — or before you settle.", contentMd: "..." },
  { slug: "effective-apr-explained", title: "Effective APR on MCAs explained (and why it's not what they tell you)", excerpt: "MCAs are sold as factor rates. Here's how to convert to a real APR.", contentMd: "..." },
  { slug: "coj-defense-basics", title: "Confession of Judgment defense: what to do in the first 72 hours", excerpt: "If a COJ is filed, time matters. Here's the playbook.", contentMd: "..." },
  // ... 15 more (full list in spec §5: BOFU-tuned topics, 800-1500 words each)
];

async function main() {
  for (const a of ARTICLES) {
    await db.article.upsert({
      where: { slug: a.slug },
      update: { ...a, published: true, publishedAt: new Date() },
      create: { ...a, published: true, publishedAt: new Date() },
    });
  }
}
main().catch(console.error).finally(() => db.$disconnect());
```

> **Content note:** real article body content is generated separately (Bar can dispatch a content agent to write all 20 — TerraDebt has its own Anthropic key per the no-cross-project-keys rule). Plan ships with placeholder seeds; full content delivered before launch.

- [ ] **Step 2: Index page**

`app/(site)/articles/page.tsx`:

```tsx
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Articles", description: "Education on MCA debt relief." };

export default async function ArticlesIndex() {
  const articles = await db.article.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
  return (
    <section className="mx-auto max-w-content px-6 py-16">
      <h1 className="text-4xl font-bold">Articles</h1>
      <ul className="mt-8 divide-y divide-border">
        {articles.map((a) => (
          <li key={a.id} className="py-6">
            <Link href={`/articles/${a.slug}`} className="block no-underline hover:no-underline">
              <h2 className="text-xl font-semibold text-slate">{a.title}</h2>
              <p className="mt-1 text-muted">{a.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: Detail page**

`app/(site)/articles/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a || !a.published) notFound();
  return (
    <article className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold">{a.title}</h1>
        <p className="mt-4 text-muted">{a.excerpt}</p>
        <div className="prose mt-8 max-w-none"><ReactMarkdown remarkPlugins={[remarkGfm]}>{a.contentMd}</ReactMarkdown></div>
      </div>
      <aside className="sticky top-8 self-start">
        <LeadForm source={`article-${slug}`} />
      </aside>
    </article>
  );
}
```

- [ ] **Step 4: Tailwind prose plugin**

```bash
npm install -D @tailwindcss/typography
```

Update `tailwind.config.ts` plugins: `[require("@tailwindcss/typography")]`.

- [ ] **Step 5: Run seed + verify**

```bash
npx tsx prisma/seed-articles.ts
npm run dev
```

Visit `/articles` and one article URL.

- [ ] **Step 6: Commit**

```bash
git add app/\(site\)/articles prisma/seed-articles.ts package.json package-lock.json tailwind.config.ts
git commit -m "feat: 20 article seeds + index + detail pages with prose styling"
```

---

## Task 18: State pages (50, programmatic)

**Files:**
- Create: `app/(site)/mca-defense/[state]/page.tsx`, `lib/state-content.ts`, `prisma/seed-state-pages.ts`

- [ ] **Step 1: State content template**

`lib/state-content.ts`:

```ts
import { STATES } from "./states";

export type StateContent = {
  cojEnforceability: string;
  usuryNotes: string;
  recentDevelopments: string;
  localCourts: string;
};

const TEMPLATE = (stateName: string): StateContent => ({
  cojEnforceability: `In ${stateName}, Confessions of Judgment from MCA contracts face specific procedural requirements...`,
  usuryNotes: `${stateName} usury law treats merchant cash advances as commercial transactions, not loans...`,
  recentDevelopments: `Recent regulatory or case-law developments affecting MCA defense in ${stateName}...`,
  localCourts: `Local court familiarity with MCA litigation in ${stateName}...`,
});

export function buildStateContent(stateName: string) { return TEMPLATE(stateName); }
export function listStates() { return STATES; }
```

> **Content note:** the placeholder template above is shipped with the build. Replace with real state-specific content (Bar's MCA Guide already has 50 state law pages; the team can adapt content from there to TerraDebt's positioning before launch).

- [ ] **Step 2: Seed state pages with template content**

`prisma/seed-state-pages.ts`:

```ts
import { PrismaClient } from "@prisma/client";
import { STATES } from "../lib/states";
import { buildStateContent } from "../lib/state-content";
const db = new PrismaClient();

async function main() {
  for (const s of STATES) {
    await db.statePage.upsert({
      where: { stateCode: s.code },
      update: { stateName: s.name, content: buildStateContent(s.name), published: true },
      create: { stateCode: s.code, stateName: s.name, content: buildStateContent(s.name), published: true },
    });
  }
}
main().catch(console.error).finally(() => db.$disconnect());
```

```bash
npx tsx prisma/seed-state-pages.ts
```

- [ ] **Step 3: State page**

`app/(site)/mca-defense/[state]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";
import { STATES } from "@/lib/states";
import type { StateContent } from "@/lib/state-content";

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const code = state.toUpperCase();
  const meta = STATES.find((s) => s.code === code);
  if (!meta) return {};
  return { title: `MCA Defense in ${meta.name}`, description: `MCA debt relief and legal defense for businesses in ${meta.name}.` };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const page = await db.statePage.findUnique({ where: { stateCode } });
  if (!page || !page.published) notFound();
  const c = page.content as unknown as StateContent;

  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">MCA Defense in {page.stateName}</h1>
            <p className="mt-4 text-lg text-muted">Settlement, restructure, and legal defense for {page.stateName} businesses with MCA debt.</p>
          </div>
          <LeadForm source={`state-${stateCode.toLowerCase()}`} />
        </div>
      </section>
      <section className="mx-auto max-w-content px-6 py-16 prose max-w-none">
        <h2>Confession of Judgment in {page.stateName}</h2>
        <p>{c.cojEnforceability}</p>
        <h2>Usury & MCA classification</h2>
        <p>{c.usuryNotes}</p>
        <h2>Recent developments</h2>
        <p>{c.recentDevelopments}</p>
        <h2>Local courts</h2>
        <p>{c.localCourts}</p>
      </section>
    </article>
  );
}
```

- [ ] **Step 4: Verify a few**

Visit `/mca-defense/ny`, `/mca-defense/fl`, `/mca-defense/ca`, `/mca-defense/tx`.

- [ ] **Step 5: Commit**

```bash
git add app/\(site\)/mca-defense lib/state-content.ts prisma/seed-state-pages.ts
git commit -m "feat: 50 programmatic state defense pages"
```

---

## Task 19: Static meta pages — about, contact, trust, privacy, terms, disclosure

**Files:**
- Create: `app/(site)/about/page.tsx`, `app/(site)/contact/page.tsx`, `app/(site)/trust/page.tsx`, `app/(site)/privacy/page.tsx`, `app/(site)/terms/page.tsx`, `app/(site)/disclosure/page.tsx`

- [ ] **Step 1: About**

```tsx
export const metadata = { title: "About TerraDebt", description: "Our mission, our team, and why we exist." };

export default function About() {
  return (
    <article className="mx-auto max-w-content px-6 py-16 prose max-w-none">
      <h1>About TerraDebt</h1>
      <p>TerraDebt was built to bring transparency and modern execution to a category that had neither.</p>
      <h2>Mission</h2>
      <p>... [Bar to provide founder text]</p>
      <h2>Founder</h2>
      <p>Placeholder — founder bio + photo.</p>
    </article>
  );
}
```

- [ ] **Step 2-6: Contact, Trust, Privacy, Terms, Disclosure**

Repeat the same pattern. Privacy/Terms/Disclosure use standard MCA-relief boilerplate (Bar can adapt from Coastal Debt's existing legal pages — content should be reviewed by counsel before launch).

- [ ] **Step 7: Commit**

```bash
git add app/\(site\)/about app/\(site\)/contact app/\(site\)/trust app/\(site\)/privacy app/\(site\)/terms app/\(site\)/disclosure
git commit -m "feat: meta pages — about, contact, trust, privacy, terms, disclosure"
```

---

## Task 20: Calculator standalone page

**Files:**
- Create: `app/(site)/calculator/page.tsx`, `components/site/SavingsCalculator.tsx`

- [ ] **Step 1: Calculator component**

`components/site/SavingsCalculator.tsx`:

```tsx
"use client";
import { useMemo, useState } from "react";

export function SavingsCalculator() {
  const [debt, setDebt] = useState(200000);
  const [dailyPayment, setDailyPayment] = useState(800);

  const result = useMemo(() => {
    const monthsRemaining = Math.max(1, Math.ceil(debt / (dailyPayment * 21)));
    const settlementSavingsLow = Math.round(debt * 0.4);
    const settlementSavingsHigh = Math.round(debt * 0.6);
    const newMonthly = Math.round(((debt - settlementSavingsLow) / 12) * 100) / 100;
    return { monthsRemaining, settlementSavingsLow, settlementSavingsHigh, newMonthly };
  }, [debt, dailyPayment]);

  return (
    <div className="bg-white border border-border rounded-xl p-8 max-w-2xl">
      <label className="block text-sm font-medium text-slate">Total MCA debt</label>
      <input type="range" min={25000} max={2000000} step={5000} value={debt} onChange={(e) => setDebt(Number(e.target.value))} className="w-full mt-2" />
      <div className="text-2xl font-bold text-electric">${debt.toLocaleString()}</div>

      <label className="block text-sm font-medium text-slate mt-6">Total daily MCA debits (across all lenders)</label>
      <input type="range" min={100} max={5000} step={50} value={dailyPayment} onChange={(e) => setDailyPayment(Number(e.target.value))} className="w-full mt-2" />
      <div className="text-2xl font-bold text-electric">${dailyPayment.toLocaleString()}/day</div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-offwhite p-4 rounded-md">
          <div className="text-xs text-muted uppercase">Estimated savings range</div>
          <div className="text-xl font-semibold mt-1 text-slate">${result.settlementSavingsLow.toLocaleString()} – ${result.settlementSavingsHigh.toLocaleString()}</div>
        </div>
        <div className="bg-offwhite p-4 rounded-md">
          <div className="text-xs text-muted uppercase">New est. monthly payment</div>
          <div className="text-xl font-semibold mt-1 text-slate">~${result.newMonthly.toLocaleString()}/mo</div>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">Estimates only. Real numbers depend on lender mix, contract terms, and your business cash flow. Submit a free assessment for actual figures.</p>
    </div>
  );
}
```

- [ ] **Step 2: Page**

```tsx
import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import { LeadForm } from "@/components/lead/LeadForm";

export const metadata = { title: "MCA Savings Calculator", description: "Estimate how much you could save on stacked MCA debt." };

export default function CalculatorPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl font-bold">Estimate your MCA savings</h1>
        <p className="mt-4 text-muted">Move the sliders to see the typical savings range for your debt size and daily debit load.</p>
        <div className="mt-8"><SavingsCalculator /></div>
      </div>
      <LeadForm source="calculator" />
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/calculator components/site/SavingsCalculator.tsx
git commit -m "feat: standalone savings calculator with side-by-side lead form"
```

---

## Task 21: Dynamic sitemap.xml + robots.txt

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Sitemap**

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { STATES } from "@/lib/states";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

const BASE = "https://terradebt.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls = [
    "", "/about", "/contact", "/trust", "/privacy", "/terms", "/disclosure",
    "/calculator", "/contract-review", "/articles", "/case-studies",
    "/programs/settlement", "/programs/restructure", "/programs/reverse-consolidation-defense", "/programs/legal-defense",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1.0 : 0.8 }));

  const verticalUrls = VERTICAL_CONTENT.map((v) => ({ url: `${BASE}/industries/${v.slug}`, lastModified: now, priority: 0.7 }));
  const stateUrls = STATES.map((s) => ({ url: `${BASE}/mca-defense/${s.code.toLowerCase()}`, lastModified: now, priority: 0.6 }));

  const articles = await db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  const articleUrls = articles.map((a) => ({ url: `${BASE}/articles/${a.slug}`, lastModified: a.updatedAt, priority: 0.6 }));

  const studies = await db.caseStudy.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  const studyUrls = studies.map((s) => ({ url: `${BASE}/case-studies/${s.slug}`, lastModified: s.updatedAt, priority: 0.6 }));

  return [...staticUrls, ...verticalUrls, ...stateUrls, ...articleUrls, ...studyUrls];
}
```

- [ ] **Step 2: robots**

`app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: "https://terradebt.com/sitemap.xml",
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: dynamic sitemap.xml and robots.txt"
```

---

# Phase 4 — AI Contract Review tool

## Task 22: PDF upload + text extraction

**Files:**
- Create: `app/(site)/contract-review/page.tsx`, `app/api/contract-review/route.ts`, `lib/contract-extract.ts`

- [ ] **Step 1: Install pdf-parse**

```bash
npm install pdf-parse
npm install -D @types/pdf-parse
```

- [ ] **Step 2: Extractor**

`lib/contract-extract.ts`:

```ts
import pdfParse from "pdf-parse";

export async function extractPdfText(buffer: Buffer): Promise<{ text: string; pages: number }> {
  const result = await pdfParse(buffer);
  return { text: result.text, pages: result.numpages };
}
```

- [ ] **Step 3: API route handler**

`app/api/contract-review/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { extractPdfText } from "@/lib/contract-extract";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ ok: false, error: "no file" }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > 10 * 1024 * 1024) return NextResponse.json({ ok: false, error: "file too large (10MB max)" }, { status: 400 });

  try {
    const { text } = await extractPdfText(buffer);
    if (text.length < 200) return NextResponse.json({ ok: false, error: "could not extract text from PDF" }, { status: 400 });
    return NextResponse.json({ ok: true, text, filename: file.name });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/contract-extract.ts app/api/contract-review package.json package-lock.json
git commit -m "feat: PDF upload + text extraction endpoint"
```

---

## Task 23: Claude API integration with structured output

**Files:**
- Create: `lib/contract-analyze.ts`, `lib/anthropic.ts`
- Modify: `app/api/contract-review/route.ts`

- [ ] **Step 1: Install Anthropic SDK**

```bash
npm install @anthropic-ai/sdk
```

- [ ] **Step 2: Anthropic client**

`lib/anthropic.ts`:

```ts
import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;
export function anthropic() {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}
```

- [ ] **Step 3: Analyzer**

`lib/contract-analyze.ts`:

```ts
import { anthropic } from "./anthropic";

export type ContractAnalysis = {
  summary: string;
  effectiveApr: number | null;
  totalPayback: number | null;
  fundedAmount: number | null;
  factorRate: number | null;
  termDays: number | null;
  dailyPayment: number | null;
  redFlags: string[];
  options: string[];
};

const SYSTEM = `You are an expert MCA contract analyst. Given a merchant cash advance contract, extract specific financial terms and identify red flags. Return JSON only — no prose.

Always include:
- summary: 1-2 sentence plain-English summary of the deal
- fundedAmount: dollar amount the merchant received
- totalPayback: total dollar amount the merchant must pay back
- factorRate: factorRate (e.g., 1.45)
- effectiveApr: effective annualized rate as a number (e.g., 132.5 means 132.5%)
- termDays: estimated term in days
- dailyPayment: daily debit amount
- redFlags: array of plain-English concerns (COJ clause, personal guarantee, reconciliation language, stacking restrictions, etc.)
- options: array of next-step suggestions tailored to this contract

If a field is unknowable, set it to null. Never invent.`;

export async function analyzeContract(text: string): Promise<ContractAnalysis> {
  const client = anthropic();
  const truncated = text.slice(0, 30000);
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: SYSTEM,
    messages: [{ role: "user", content: `Analyze this MCA contract:\n\n${truncated}` }],
  });
  const block = msg.content[0];
  const raw = block.type === "text" ? block.text : "";
  const jsonStart = raw.indexOf("{");
  const jsonEnd = raw.lastIndexOf("}");
  const json = raw.slice(jsonStart, jsonEnd + 1);
  return JSON.parse(json) as ContractAnalysis;
}
```

- [ ] **Step 4: Wire into the API route + persist to DB**

Modify `app/api/contract-review/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { extractPdfText } from "@/lib/contract-extract";
import { analyzeContract } from "@/lib/contract-analyze";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ ok: false, error: "no file" }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > 10 * 1024 * 1024) return NextResponse.json({ ok: false, error: "file too large" }, { status: 400 });

  try {
    const { text } = await extractPdfText(buffer);
    if (text.length < 200) return NextResponse.json({ ok: false, error: "could not extract text from PDF" }, { status: 400 });

    const analysis = await analyzeContract(text);

    const review = await db.contractReview.create({
      data: {
        contractText: text,
        contractFilename: file.name,
        aiSummary: analysis as unknown as object,
        effectiveApr: analysis.effectiveApr,
        totalPayback: analysis.totalPayback,
        redFlags: analysis.redFlags as unknown as object,
      },
    });

    return NextResponse.json({ ok: true, reviewId: review.id, analysis });
  } catch (e) {
    console.error("contract-review failed", e);
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "unknown" }, { status: 500 });
  }
}
```

- [ ] **Step 5: Env**

```
ANTHROPIC_API_KEY=
```

> TerraDebt-only Anthropic key. Do not reuse Mirai/Coastal/Sapir keys.

- [ ] **Step 6: Commit**

```bash
git add lib/anthropic.ts lib/contract-analyze.ts app/api/contract-review package.json package-lock.json .env.example
git commit -m "feat: Claude-powered MCA contract analysis with structured output"
```

---

## Task 24: Contract review UI (upload → result)

**Files:**
- Create: `components/contract/UploadCard.tsx`, `components/contract/ResultCard.tsx`, `components/contract/EmailCapture.tsx`
- Modify: `app/(site)/contract-review/page.tsx`

- [ ] **Step 1: UploadCard**

```tsx
"use client";
import { useState } from "react";
import type { ContractAnalysis } from "@/lib/contract-analyze";

export function UploadCard({ onResult }: { onResult: (id: string, a: ContractAnalysis) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!file) return;
    setLoading(true); setError(null);
    try {
      const fd = new FormData(); fd.set("file", file);
      const res = await fetch("/api/contract-review", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      onResult(json.reviewId, json.analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : "failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="bg-white border border-border rounded-xl p-8">
      <h2 className="text-2xl font-semibold">Upload your MCA contract</h2>
      <p className="mt-2 text-muted">PDF only, up to 10MB. We'll extract the financial terms and flag what to watch for. Free, no email required.</p>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-4 block w-full text-sm" />
      <button disabled={!file || loading} onClick={submit} className="mt-4 bg-electric text-white px-4 py-2 rounded-md disabled:opacity-50">{loading ? "Analyzing..." : "Analyze contract"}</button>
      {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 2: ResultCard**

```tsx
import type { ContractAnalysis } from "@/lib/contract-analyze";

export function ResultCard({ a }: { a: ContractAnalysis }) {
  return (
    <div className="bg-white border border-border rounded-xl p-8">
      <h2 className="text-2xl font-semibold">Analysis</h2>
      <p className="mt-2 text-muted">{a.summary}</p>

      <dl className="grid grid-cols-2 gap-4 mt-6">
        <Stat label="Funded amount" value={a.fundedAmount ? `$${a.fundedAmount.toLocaleString()}` : "—"} />
        <Stat label="Total payback" value={a.totalPayback ? `$${a.totalPayback.toLocaleString()}` : "—"} />
        <Stat label="Factor rate" value={a.factorRate ? a.factorRate.toFixed(2) : "—"} />
        <Stat label="Effective APR" value={a.effectiveApr ? `${a.effectiveApr.toFixed(1)}%` : "—"} highlight />
        <Stat label="Term" value={a.termDays ? `${a.termDays} days` : "—"} />
        <Stat label="Daily debit" value={a.dailyPayment ? `$${a.dailyPayment.toLocaleString()}` : "—"} />
      </dl>

      <h3 className="text-lg font-semibold mt-8">Red flags</h3>
      <ul className="mt-2 space-y-1 text-slate">{(a.redFlags ?? []).map((f, i) => <li key={i}>⚠️ {f}</li>)}</ul>

      <h3 className="text-lg font-semibold mt-6">Options</h3>
      <ul className="mt-2 space-y-1 text-slate">{(a.options ?? []).map((o, i) => <li key={i}>→ {o}</li>)}</ul>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-md ${highlight ? "bg-electric/10" : "bg-offwhite"}`}>
      <div className="text-xs text-muted uppercase">{label}</div>
      <div className={`text-lg font-semibold ${highlight ? "text-electric" : "text-slate"}`}>{value}</div>
    </div>
  );
}
```

- [ ] **Step 3: EmailCapture (optional, post-result)**

```tsx
"use client";
import { useState } from "react";

export function EmailCapture({ reviewId }: { reviewId: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    try {
      await fetch("/api/contract-review/capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reviewId, email }),
      });
      setDone(true);
    } finally { setSubmitting(false); }
  }

  if (done) return <p className="text-sm text-muted mt-6">Sent. Check your inbox in a minute.</p>;

  return (
    <div className="mt-8 bg-offwhite p-6 rounded-md">
      <p className="font-medium">Want this analysis as a PDF?</p>
      <div className="mt-2 flex gap-2">
        <input type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 border border-border rounded-md px-3 py-2" />
        <button onClick={submit} disabled={!email || submitting} className="bg-electric text-white px-4 py-2 rounded-md disabled:opacity-50">{submitting ? "..." : "Email it"}</button>
      </div>
      <p className="mt-1 text-xs text-muted">Optional — your analysis is already shown above.</p>
    </div>
  );
}
```

- [ ] **Step 4: Page composition**

`app/(site)/contract-review/page.tsx`:

```tsx
"use client";
import { useState } from "react";
import { UploadCard } from "@/components/contract/UploadCard";
import { ResultCard } from "@/components/contract/ResultCard";
import { EmailCapture } from "@/components/contract/EmailCapture";
import type { ContractAnalysis } from "@/lib/contract-analyze";

export default function ContractReviewPage() {
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);

  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">Free tool</span>
        <h1 className="mt-4 text-4xl font-bold">AI MCA Contract Review</h1>
        <p className="mt-4 text-muted">Upload your MCA contract. Get the effective APR, total payback, red flags, and your options — in 30 seconds. No email required.</p>
      </div>
      <div>
        {!analysis && <UploadCard onResult={(id, a) => { setReviewId(id); setAnalysis(a); }} />}
        {analysis && reviewId && <>
          <ResultCard a={analysis} />
          <EmailCapture reviewId={reviewId} />
        </>}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Capture endpoint**

`app/api/contract-review/capture/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fanOutIntegrations } from "@/lib/integrations";

export async function POST(req: NextRequest) {
  const { reviewId, email } = await req.json();
  if (!reviewId || !email) return NextResponse.json({ ok: false }, { status: 400 });

  // Update review with captured email
  await db.contractReview.update({ where: { id: reviewId }, data: { emailCaptured: email } });

  // Create lead with source=ai-contract-review
  const lead = await db.lead.create({
    data: {
      firstName: "Unknown",
      lastName: "Unknown",
      businessName: "(contract-review)",
      phone: "0000000000",
      email,
      hasMcaDebt: true,
      source: "ai-contract-review",
      eliClickid: req.cookies.get("eli_clickid")?.value,
    },
  });
  await db.contractReview.update({ where: { id: reviewId }, data: { leadId: lead.id } });

  await fanOutIntegrations(lead);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 6: Test end-to-end** with a real MCA PDF.

- [ ] **Step 7: Commit**

```bash
git add app/\(site\)/contract-review components/contract app/api/contract-review/capture
git commit -m "feat: AI contract review UI with upload, result, optional email capture"
```

---

## Task 25: Phase 4 deploy + smoke test

- [ ] Push to main, verify Railway deploy succeeds, test PDF upload on production URL.

```bash
git push origin main
```

---

# Phase 5 — Admin CMS

## Task 26: Auth (cookie session, login/logout)

**Files:**
- Create: `lib/auth.ts`, `lib/session.ts`, `app/admin/login/page.tsx`, `app/admin/login/actions.ts`, `app/api/admin/logout/route.ts`, `app/admin/middleware.ts` (or central middleware update)

- [ ] **Step 1: iron-session install + config**

```bash
npm install iron-session
```

`lib/session.ts`:

```ts
import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = { userId?: string; email?: string };

const password = process.env.SESSION_SECRET ?? "dev-only-change-me-please-32-chars-min!!";
const cookieName = "td_admin";

export const sessionOptions: SessionOptions = {
  password,
  cookieName,
  cookieOptions: { secure: process.env.NODE_ENV === "production", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 8 },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
```

- [ ] **Step 2: Auth helper**

`lib/auth.ts`:

```ts
import bcrypt from "bcryptjs";
import { db } from "./db";

export async function verifyCredentials(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}
```

- [ ] **Step 3: Login server action**

`app/admin/login/actions.ts`:

```ts
"use server";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth";
import { getSession } from "@/lib/session";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const user = await verifyCredentials(email, password);
  if (!user) return { error: "Invalid credentials" };
  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  await session.save();
  redirect("/admin");
}
```

- [ ] **Step 4: Login page**

`app/admin/login/page.tsx`:

```tsx
import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite">
      <form action={loginAction} className="bg-white border border-border rounded-xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">TerraDebt Admin</h1>
        <input name="email" type="email" placeholder="email" required className="w-full border border-border rounded-md px-3 py-2" />
        <input name="password" type="password" placeholder="password" required className="w-full border border-border rounded-md px-3 py-2" />
        <button type="submit" className="w-full bg-electric text-white py-2 rounded-md">Sign in</button>
      </form>
    </div>
  );
}
```

- [ ] **Step 5: Protect /admin routes**

Update root `middleware.ts` to gate `/admin/*` (except `/admin/login`):

```ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (!req.cookies.get("eli_clickid")) {
    res.cookies.set("eli_clickid", `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`, {
      httpOnly: false, maxAge: 60 * 60 * 24 * 365, sameSite: "lax", path: "/",
    });
  }

  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    const session = await getIronSession<SessionData>(req.cookies as unknown as Parameters<typeof getIronSession>[0], sessionOptions);
    if (!session.userId) return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return res;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|api/visitor).*)"] };
```

- [ ] **Step 6: Logout endpoint**

```ts
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 7: Env**

```
SESSION_SECRET=<generate with: openssl rand -hex 32>
```

- [ ] **Step 8: Commit**

```bash
git add lib/auth.ts lib/session.ts app/admin/login app/api/admin/logout middleware.ts package.json package-lock.json .env.example
git commit -m "feat: admin auth with iron-session + bcrypt login"
```

---

## Task 27: Admin layout + dashboard

**Files:**
- Create: `app/admin/layout.tsx`, `app/admin/page.tsx`, `components/admin/Sidebar.tsx`

- [ ] **Step 1: Sidebar**

```tsx
import Link from "next/link";

const ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/contract-reviews", label: "Contract Reviews" },
  { href: "/admin/pages", label: "Landing Pages" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/verticals", label: "Verticals" },
  { href: "/admin/states", label: "States" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/visitors", label: "Visitors" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  return (
    <aside className="w-60 border-r border-border bg-white min-h-screen">
      <div className="px-4 py-4 font-bold text-slate">TerraDebt Admin</div>
      <nav className="px-2 space-y-1 text-sm">
        {ITEMS.map((i) => (
          <Link key={i.href} href={i.href} className="block px-3 py-2 rounded-md hover:bg-offwhite no-underline text-slate">{i.label}</Link>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Layout**

`app/admin/layout.tsx`:

```tsx
import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-offwhite">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Dashboard**

`app/admin/page.tsx`:

```tsx
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [leads24h, leads7d, totalLeads, totalReviews] = await Promise.all([
    db.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 86400e3) } } }),
    db.lead.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 86400e3) } } }),
    db.lead.count(),
    db.contractReview.count(),
  ]);

  const recentLeads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 10 });

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Stat label="Leads 24h" value={leads24h} />
        <Stat label="Leads 7d" value={leads7d} />
        <Stat label="Total leads" value={totalLeads} />
        <Stat label="AI reviews" value={totalReviews} />
      </div>
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Recent leads</h2>
        <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
          <thead className="bg-offwhite text-left text-muted">
            <tr><th className="px-3 py-2">Time</th><th>Name</th><th>Business</th><th>Source</th><th>Debt</th></tr>
          </thead>
          <tbody>
            {recentLeads.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-3 py-2">{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
                <td>{l.firstName} {l.lastName}</td>
                <td>{l.businessName}</td>
                <td>{l.source}</td>
                <td>{l.debtAmountBucket ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="bg-white border border-border rounded-md p-4"><div className="text-xs text-muted uppercase">{label}</div><div className="text-2xl font-bold mt-1">{value}</div></div>;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/layout.tsx app/admin/page.tsx components/admin/Sidebar.tsx
git commit -m "feat: admin layout + dashboard with stats and recent leads"
```

---

## Task 28: Lead inbox

**Files:**
- Create: `app/admin/leads/page.tsx`, `app/admin/leads/[id]/page.tsx`, `app/admin/leads/actions.ts`, `app/api/admin/leads/export/route.ts`

- [ ] **Step 1: List view with filters**

```tsx
import Link from "next/link";
import { db } from "@/lib/db";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ source?: string; status?: string; q?: string }> }) {
  const sp = await searchParams;
  const where: Record<string, unknown> = {};
  if (sp.source) where.source = sp.source;
  if (sp.status) where.status = sp.status;
  if (sp.q) where.OR = [
    { email: { contains: sp.q, mode: "insensitive" } },
    { firstName: { contains: sp.q, mode: "insensitive" } },
    { lastName: { contains: sp.q, mode: "insensitive" } },
    { businessName: { contains: sp.q, mode: "insensitive" } },
  ];
  const leads = await db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <a href="/api/admin/leads/export" className="bg-electric text-white px-3 py-1 rounded-md text-sm no-underline">Export CSV</a>
      </div>
      <form className="mt-4 flex gap-2 text-sm">
        <input name="q" defaultValue={sp.q} placeholder="search…" className="border border-border rounded-md px-3 py-2 flex-1" />
        <select name="source" defaultValue={sp.source ?? ""} className="border border-border rounded-md px-3 py-2"><option value="">All sources</option><option>homepage</option><option>calculator</option><option>ai-contract-review</option></select>
        <select name="status" defaultValue={sp.status ?? ""} className="border border-border rounded-md px-3 py-2"><option value="">All statuses</option><option>new</option><option>contacted</option><option>qualified</option><option>signed</option><option>dead</option></select>
        <button className="bg-slate text-white px-3 py-2 rounded-md">Filter</button>
      </form>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left"><tr><th className="px-3 py-2">Time</th><th>Name</th><th>Business</th><th>Email</th><th>Source</th><th>Debt</th><th>Status</th></tr></thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/leads/${l.id}`}>{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</Link></td>
              <td>{l.firstName} {l.lastName}</td>
              <td>{l.businessName}</td>
              <td>{l.email}</td>
              <td>{l.source}</td>
              <td>{l.debtAmountBucket ?? "—"}</td>
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

- [ ] **Step 2: Detail view + status update**

`app/admin/leads/[id]/page.tsx` — show all lead fields + integration status JSON, allow updating status via `actions.ts` server action.

- [ ] **Step 3: CSV export**

`app/api/admin/leads/export/route.ts`:

```ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });
  const headers = ["createdAt","firstName","lastName","businessName","email","phone","hasMcaDebt","debtAmountBucket","source","status","utmSource","utmMedium","utmCampaign","gclid"];
  const rows = leads.map((l) => headers.map((h) => csvEscape((l as any)[h])).join(","));
  const body = headers.join(",") + "\n" + rows.join("\n");
  return new NextResponse(body, { headers: { "content-type": "text/csv", "content-disposition": `attachment; filename="terradebt-leads-${Date.now()}.csv"` } });
}

function csvEscape(v: unknown) {
  if (v === null || v === undefined) return "";
  const s = String(v).replaceAll('"', '""');
  return /[,\n"]/.test(s) ? `"${s}"` : s;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/leads app/api/admin/leads
git commit -m "feat: admin lead inbox with filters, detail view, CSV export"
```

---

## Task 29: Contract reviews inbox

**Files:**
- Create: `app/admin/contract-reviews/page.tsx`, `app/admin/contract-reviews/[id]/page.tsx`

Pattern matches Task 28. List view shows: time, filename, effective APR, email captured, lead linked. Detail view shows full extracted text + AI summary JSON + linked lead.

- [ ] **Step 1: Index page**

```tsx
import Link from "next/link";
import { db } from "@/lib/db";

export default async function ContractReviewsPage() {
  const reviews = await db.contractReview.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { lead: true } });
  return (
    <>
      <h1 className="text-2xl font-bold">Contract Reviews</h1>
      <table className="mt-4 w-full bg-white border border-border rounded-md text-sm">
        <thead className="bg-offwhite text-left"><tr><th className="px-3 py-2">Time</th><th>File</th><th>Eff. APR</th><th>Email</th><th>Linked lead</th></tr></thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} className="border-t border-border">
              <td className="px-3 py-2"><Link href={`/admin/contract-reviews/${r.id}`}>{r.createdAt.toISOString().slice(0, 16).replace("T", " ")}</Link></td>
              <td>{r.contractFilename}</td>
              <td>{r.effectiveApr ? `${r.effectiveApr.toFixed(1)}%` : "—"}</td>
              <td>{r.emailCaptured ?? "—"}</td>
              <td>{r.lead ? `${r.lead.firstName} ${r.lead.lastName}` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

- [ ] **Step 2: Detail page** — render `aiSummary` JSON pretty-printed + extracted text in collapsible.

- [ ] **Step 3: Commit**

```bash
git add app/admin/contract-reviews
git commit -m "feat: admin contract reviews inbox"
```

---

## Task 30: Pages CRUD (landing page builder)

**Files:**
- Create: `app/admin/pages/page.tsx`, `app/admin/pages/new/page.tsx`, `app/admin/pages/[id]/page.tsx`, `app/admin/pages/actions.ts`, `app/(site)/lp/[slug]/page.tsx`

- [ ] **Step 1: Public LP renderer**

`app/(site)/lp/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });
  if (!page || !page.published) notFound();
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl font-bold">{page.heroHeadline}</h1>
        {page.heroSubline && <p className="mt-4 text-lg text-muted">{page.heroSubline}</p>}
      </div>
      <LeadForm source={`lp-${slug}`} />
    </section>
  );
}
```

- [ ] **Step 2: Admin list + create + edit forms**

Standard CRUD pattern using server actions. Fields: slug, templateType (select: form/call/game/article), title, heroHeadline, heroSubline, content (JSON textarea), phoneOverride, mobileCta, skipPreQual, published.

- [ ] **Step 3: Commit**

```bash
git add app/admin/pages app/\(site\)/lp
git commit -m "feat: admin landing page CRUD + public LP renderer"
```

---

## Task 31: Articles CRUD

Pattern matches Task 30. Markdown editor for `contentMd` (use a simple `<textarea>` initially; can upgrade later to a richer editor like `@uiw/react-md-editor`).

- [ ] **Steps 1-3:** list + create + edit + publish toggle. Commit.

```bash
git add app/admin/articles
git commit -m "feat: admin articles CRUD with markdown editor"
```

---

## Task 32: Verticals CRUD + States bulk regenerate + Case studies CRUD

Three small CRUD admin pages following the same pattern as Tasks 30-31. States gets a "Regenerate from template" button that re-runs the seed for unpublished states.

- [ ] **Steps 1-3:** ship each CRUD admin. Commit.

```bash
git add app/admin/verticals app/admin/states app/admin/case-studies
git commit -m "feat: admin CRUD for verticals, states, case studies"
```

---

## Task 33: Visitors dashboard + Settings

**Files:**
- Create: `app/admin/visitors/page.tsx`, `app/admin/settings/page.tsx`, `app/admin/settings/actions.ts`

- [ ] **Step 1: Visitors page**

Show top UTM sources, top campaigns, conversion funnel (visitors → form starts → form submits) over last 7/30 days. Single SQL aggregation query.

- [ ] **Step 2: Settings**

Editable form for site phone, aggregate counter, BBB status, GA4 IDs, Slack/CRM webhook URLs, Google Ads conversion ID. Each saves to the `Setting` table.

- [ ] **Step 3: Commit**

```bash
git add app/admin/visitors app/admin/settings
git commit -m "feat: admin visitors dashboard + settings page"
```

---

## Task 34: Phase 5 deploy + smoke test

- [ ] Push to main, deploy, log in, click through every admin section, verify CRUD works.

```bash
git push origin main
```

---

# Phase 6 — Launch polish

## Task 35: SEO meta + structured data

**Files:**
- Modify: `app/(site)/layout.tsx`, page-level `generateMetadata` functions
- Create: `lib/structured-data.ts`

- [ ] **Step 1: Per-page metadata** (already on most pages — verify each page has `generateMetadata` with title + description + openGraph).

- [ ] **Step 2: Organization + Service structured data**

Inject JSON-LD into layout:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "TerraDebt",
  "url": "https://terradebt.com",
  "telephone": "1-800-TERRA-00",
  "areaServed": "US",
  "description": "MCA debt relief with a published flat fee.",
}) }} />
```

- [ ] **Step 3: Article structured data** on article pages.

- [ ] **Step 4: Commit**

```bash
git add app lib/structured-data.ts
git commit -m "feat: SEO metadata + JSON-LD structured data"
```

---

## Task 36: Lighthouse + performance pass

- [ ] **Step 1:** run Lighthouse on homepage, /programs/settlement, /articles/[a slug], /contract-review.

- [ ] **Step 2:** Fix any score under 90:
- Image optimization (`next/image` with proper sizes)
- Font preloading (`display: swap` already set, verify)
- Reduce client-side JS where possible (server components for content, client only where needed)

- [ ] **Step 3:** Verify Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).

- [ ] **Step 4:** Commit any fixes.

```bash
git commit -m "perf: Lighthouse pass — image opt, font preload, RSC migrations"
```

---

## Task 37: Production cutover

- [ ] **Step 1:** Set production env vars in Railway dashboard:
- `DATABASE_URL` (auto-set by Postgres add-on)
- `SESSION_SECRET`
- `ANTHROPIC_API_KEY`
- `SLACK_LEADS_WEBHOOK_URL`
- `COASTAL_CRM_WEBHOOK_URL` + secret
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`
- `GOOGLE_ADS_*` (all 7 vars)
- `SEED_ADMIN_EMAIL=bar@albert-capital.com`
- `SEED_ADMIN_PASSWORD=<strong>` (rotate after first login)

- [ ] **Step 2:** Add `terradebt.com` custom domain in Railway, update DNS (A or CNAME per Railway docs).

- [ ] **Step 3:** SSL cert provisioning (Railway handles auto-SSL).

- [ ] **Step 4:** Submit sitemap to Google Search Console + Bing Webmaster.

- [ ] **Step 5:** Submit homepage and 3 priority programs for indexing.

- [ ] **Step 6:** Verify GA4 receiving real traffic.

- [ ] **Step 7:** Smoke test all critical flows on prod URL: homepage form, /contract-review with real PDF, /admin login.

---

## Task 38: Post-launch sanity check

- [ ] **Step 1:** Confirm 100 pages indexable (sitemap accessible, robots not blocking, no `noindex` accidents).

- [ ] **Step 2:** Verify lead routing end-to-end with a real test lead on prod.

- [ ] **Step 3:** Note down phase 2 backlog: ad generator port, TikTok lead sync, Klaviyo nurture, A/B testing.

- [ ] **Step 4:** Final commit + tag.

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

# Self-Review

**1. Spec coverage check**

- ✅ §2 Strategic positioning (6 angles) — reflected in homepage hero, founder section, /contract-review, vertical pages, programmatic state pages, transparent fee messaging
- ✅ §3 Tech stack — Next.js 16 + Postgres + Prisma + Tailwind + Railway (Tasks 1-3)
- ✅ §4 Visual identity — slate + electric blue tokens, Inter font (Task 2)
- ✅ §5 Content scope (~100 pages) — Tasks 13-21 cover home, programs, verticals, states, articles, case studies, calculator, AI tool, meta pages
- ✅ §6 Lead capture — multi-step form (Task 6), AI tool flow (Tasks 22-24), all 5 integrations (Tasks 7-11)
- ✅ §7 CMS scope — auth (26), dashboard (27), leads (28), contract reviews (29), pages (30), articles (31), verticals/states/case studies (32), visitors/settings (33)
- ✅ §8 Data model — full Prisma schema in Task 3 matches spec exactly
- ✅ §9 Page architecture — homepage composition Task 13, programs Task 14, verticals Task 15, states Task 18
- ✅ §10 Tracking — visitor middleware (Task 4), GA4 (Task 10), Google Ads (Task 11), gclid/fbclid capture
- ✅ §11 Hosting — Railway from Task 1, prod cutover Task 37

**2. Placeholder scan**

- Vertical content (Task 15) and articles (Task 17) and case study text (Task 16) and state content (Task 18) ship with template/seed-only content. This is **explicit content authoring work** that happens outside this implementation plan — Bar will dispatch a content agent to generate the real copy. Plan covers the structural delivery; content delivery is parallel.
- Founder bio + photo (Task 19) marked as Bar-to-provide.
- Phone number, BBB account, Trustpilot account marked as Bar-to-provide in spec §13.

**3. Type consistency**

- `LeadInput` (lib/lead-schema.ts) → `LeadSubmitInput` (lib/lead-service.ts) — extends cleanly with metadata fields ✓
- `ContractAnalysis` shape used identically in Tasks 23/24 ✓
- `IntegrationResult` defined in `lib/integrations/index.ts`, imported consistently in slack/crm/ga4/google-ads ✓
- Prisma model names match across schema (Task 3) and seed (Task 5) and all admin/public reads ✓

**4. Bite-sized check**

- All steps are 2-5 min where they're TDD-style implementations
- Some tasks (15, 17, 18) have content-authoring steps that are larger ("fill in 7 more verticals") — flagged as content work, not engineering
- All tasks end with a commit step

---

**Plan complete and saved to `/Users/baralezrah/terradebt/docs/superpowers/plans/2026-05-05-terradebt-implementation.md`.**
