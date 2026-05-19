# Business Debt Insider Brand Book

**Version 1.5** · 2026-05-04

This document is the source of truth for the Business Debt Insider brand, visual identity, voice, and how to apply both. Anything that touches a customer, a screen, an investor deck, or a paid ad starts here.

The site renders a live version of this system at `/brand` for designers and engineers to inspect tokens and components in context.

---

## 1. Brand essence

### Positioning

Business Debt Insider is a business debt restructure company. We cover five coverage areas: MCA debt relief, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt. We work pre-default and post-default, give every merchant free calculators that surface effective APR and stack burden, and coordinate state-licensed attorneys in all 50 states. We are built for fit across the full debt mix, not for a single-product pitch.

### Mission

Restore cash flow and dignity to small business owners carrying difficult business debt, across every product category that affects the operation: MCA, equipment, vendor, bank, and tax. Coordinated workouts without the scare tactics and theatrics of the relief industry.

### Vision

Every owner with stretched business debt gets a clear, math-first assessment across the full debt mix before they make their next move.

### Values

- **Honest math up front.** We give every merchant free calculators that surface effective APR and stack burden before any pitch.
- **Action, not theatrics.** No fake media badges, no inflated dollar counters, no scare-tactic copy.
- **Pre-default first.** We earn the right to talk to merchants before they get sued, not after.
- **Tools over talk.** Free calculators are more useful than a sales pitch. We lead with the math.
- **Relentless craft.** The category looks like 2018. We don't.

### Tagline

> The business debt brief, written by operators.

### Sub-headlines

- The modern way to restructure business debt.
- For the owner carrying stretched business debt across more than one product.
- A coordinated path through MCA, equipment, vendor, bank, and tax debt.

### Products

The five product categories Business Debt Insider covers, each with a dedicated service page:

- **MCA Debt Relief** (`/services/mca-debt-relief`). Settlement, restructure, reverse consolidation defense, and 72-hour legal coordination on stacked merchant cash advances.
- **Equipment Finance Restructure** (`/services/equipment-finance-restructure`). Term extensions, lease modifications, buyout negotiation, and acceleration defense.
- **Vendor & Supplier Debt** (`/services/vendor-supplier-debt`). Coordinated paydowns and settlements with trade creditors. COD-plus-arrears arrangements.
- **Bank Loan & LOC Workouts** (`/services/bank-loan-workout`). Forbearance, covenant waivers, term modifications with special assets groups.
- **Business Tax Debt** (`/services/business-tax-debt`). IRS and state tax workouts: installment agreements, OIC, CNC status, Trust Fund Recovery Penalty defense.

---

## 2. Logo system

The Business Debt Insider mark is built around three pieces: a geometric T inside a slate square, a wordmark in Inter Bold, and an electric-blue dot that closes both the wordmark and the icon. The dot is the brand's signal element. It's the moment of grounding.

### Assets

| File | Use |
|---|---|
| `/logos/freshline-lockup.svg` | Default lockup (icon + wordmark). First choice for headers, footers, decks. |
| `/logos/freshline-wordmark.svg` | Wordmark only. Use when icon is redundant or space is constrained horizontally. |
| `/logos/freshline-wordmark-white.svg` | Wordmark on dark backgrounds (slate, photographs). |
| `/logos/freshline-wordmark.svg` | Single-color wordmark. Inherits `currentColor`. Use for embossing, single-ink prints, or coloring via CSS. |
| `/logos/freshline-icon.svg` | Slate icon mark on light backgrounds. App icons, social avatars, favicons. |
| `/logos/freshline-icon.svg` | Light icon variant for very dark backgrounds where the slate square needs separation. |
| `/logos/favicon.svg` | 32px-tuned favicon (simpler proportions for small sizes). |

### Construction

- **Square**: 64×64 viewBox, 14px corner radius (22% radius ratio, matches Apple iOS app icon proportion).
- **T glyph**: stem 10px wide, top bar 36px wide, weight balanced for legibility down to 16px.
- **Accent dot**: 5px radius, emerald green (#10B981), positioned bottom-right of the T glyph (or trailing the wordmark). Always present. The dot is non-negotiable.
- **Wordmark**: Inter Bold (700), `letter-spacing: -1.6` at 48px, lowercase. Lowercase is intentional. We don't shout.

### Clear space

Maintain minimum clear space equal to the height of the dot (5px at 64px, ~8% of the icon size) on all sides of the lockup. No copy, no edges, no background imagery should encroach.

### Minimum size

- Lockup: 120px wide minimum (digital), 1 inch wide minimum (print).
- Icon alone: 24px wide minimum.
- Below 24px, use `favicon.svg` instead.

### Don'ts

- Don't recolor the wordmark in any color other than `#1E293B`, white, or `currentColor`.
- Don't drop the electric dot. Ever.
- Don't stretch, shear, rotate, or apply effects (shadows, glows, gradients).
- Don't place the slate icon on a slate background. Use the light icon variant.
- Don't put the lockup over busy photography. Use a flat fill or scrim.
- Don't render the wordmark in any font other than Inter Bold (or, when path-converted, the original outlines).

---

## 3. Color

The palette is intentionally narrow. Two foundation colors, three neutrals, and a small set of semantic colors. The brand earns its modernness from restraint, not rainbows.

### Foundation

| Token | Hex | RGB | Use |
|---|---|---|---|
| Slate | `#1E293B` | `30 41 59` | Primary text, dark surfaces, icon mark, all body copy |
| Electric | `#10B981` | `16 185 129` | Primary CTA, links, accent dot, key emphasis |

### Surfaces

| Token | Hex | Use |
|---|---|---|
| White | `#FFFFFF` | Card surfaces, contained content blocks |
| Off-white | `#F8FAFC` | Page background, secondary surfaces |
| Border | `#E2E8F0` | Dividers, card borders, input borders |
| Muted | `#64748B` | Secondary text, captions, placeholders |

### Semantic

These are not in `globals.css` yet. Add when needed (e.g., admin status badges).

| Intent | Hex |
|---|---|
| Success | `#16A34A` |
| Warning | `#D97706` |
| Danger | `#DC2626` |

### Usage rules

- **Electric is sacred.** Reserve emerald green for CTAs, links, the accent dot, and one key emphasis per screen. If everything is electric, nothing is.
- **Black is banned.** We use slate (`#1E293B`), never pure black. Black reads as harsh; slate reads as serious.
- **Pure white only on cards.** Page backgrounds use off-white (`#F8FAFC`) so cards lift cleanly.
- **Borders are quiet.** Border color (`#E2E8F0`) at 1px is the default. Anything heavier reads as a boxy 2018 site.
- **Accessibility.** Slate on off-white: 13.4:1 contrast. Electric on white: 4.5:1. Muted on off-white: 4.6:1. All AA-compliant.

### Tints (for backgrounds)

Use Tailwind's `/N` opacity syntax for tinted accents (e.g., `bg-electric/10` for the emerald green badge background). Approved tints:

- `bg-electric/5`, barely-there accent fill
- `bg-electric/10`, badge backgrounds, subtle highlight zones
- `bg-electric/20`, hover states (use sparingly)
- `bg-slate/5`, table row hover

---

## 4. Typography

### Family

Three typefaces, each with a defined role, all loaded via `next/font/google` with `display: "swap"`:

- **Fraunces** (variable serif with `opsz`, `SOFT`, `WONK` axes). Used for headline display only: h1 and h2 across the marketing site. Exposed as `--font-serif`. Apply with `.font-serif` or `.font-serif-tight` (the latter adds a slight letter-spacing tightening for large display sizes).
- **Inter** (variable sans). Body copy, h3 and h4, navigation, buttons, forms. Exposed as `--font-inter`. The default `font-sans` family.
- **JetBrains Mono**. Numerical accents, eyebrows, kickers, metadata stamps, dates, code. Exposed as `--font-mono`. Apply with `.font-mono`.

The pairing logic is editorial. Fraunces gives the site a magazine voice on headlines without sliding into serif-y warmth where it should not be. Inter does the heavy lifting on readability. JetBrains Mono carries the data and the metadata.

### Hierarchy

| Token | Tailwind | Family | Weight | Size | Use |
|---|---|---|---|---|---|
| Display | `font-serif-tight font-bold text-5xl md:text-6xl lg:text-7xl` | Fraunces | 700 | 48-72px | Hero headlines, one per page |
| H1 | `font-serif-tight font-bold text-4xl md:text-5xl` | Fraunces | 700 | 36-48px | Page titles |
| H2 | `font-serif-tight font-bold text-3xl md:text-4xl` | Fraunces | 700 | 24-36px | Section titles |
| H3 | `font-serif font-bold text-xl md:text-2xl` | Fraunces | 700 | 20-24px | Subsection titles, card headlines |
| H4 | `text-lg font-semibold` | Inter | 600 | 18px | Compact card titles |
| Body | `text-base` | Inter | 400 | 16px | Default body copy |
| Body-lg | `text-lg md:text-xl text-muted` | Inter | 400 | 18-20px | Hero sublines, lead paragraphs |
| Small | `text-sm text-muted` | Inter | 400 | 14px | Captions, secondary metadata |
| Kicker | `font-mono text-[11px] uppercase tracking-wider text-muted` | JetBrains Mono | 500 | 11px | Eyebrows, kickers, datelines |
| Mono | `font-mono` | JetBrains Mono | 400 | 13-14px | Stats, numerical accents, code |

### Rules

- **One Display per page.** The hero. That's it.
- **Tighten headlines, breathe body.** Headlines use `tracking-tight`. Body uses default. Sublines use `leading-relaxed` if longer than 2 lines.
- **No all-caps body copy.** Eyebrows and table headers only.
- **No italics for emphasis.** Use weight (semibold) or color (slate vs muted).
- **Lowercase the wordmark.** Always. The brand is "businessdebtinsider" not "Business Debt Insider." in display contexts. (This document uses Business Debt Insider in prose for English readability, the visual mark stays lowercase.)

---

## 5. Voice & tone

We speak like a smart, slightly impatient operator who's seen the inside of bad MCA contracts and wants to help you avoid one. Specifically:

### Voice attributes

| We are | We are not |
|---|---|
| Direct | Sales-y |
| Specific | Vague |
| Confident | Cocky |
| Calm | Frantic |
| Plain-spoken | Jargon-heavy |
| Honest about uncertainty | Hedging on everything |

### Tone shift by context

- **Marketing pages**: confident, specific, generous with proof. "Here's the math. Here's the program. Here's what it costs."
- **Calculators (/tools)**: clinical, neutral, fact-first. "Effective APR: 132.5%. Daily debit: $1,200. Stack health: critical. Likely program fit: settlement with legal coordination."
- **Admin / internal copy**: terse, command-oriented. "Lead created", "Webhook failed", "Regenerate from template".
- **Legal / disclosure**: precise, deflationary, honest. "Outcomes vary." "We are not a law firm." "We do not guarantee specific savings."

### Writing rules

- **No em dashes.** Use periods, commas, hyphens, or restructure. The em dash is overused in AI-written copy and it's a tell.
- **No exclamation points** in marketing copy. Period.
- **Active voice.** "We negotiate balances down" not "Balances are negotiated".
- **Specific numbers beat ranges.** "42% saved on a $425K program" beats "up to 60% savings".
- **No empty intensifiers.** Cut "very", "really", "quite", "actually" unless they earn their keep.
- **Talk to one merchant.** Second-person singular. "Your stacked MCAs" not "merchants' stacked MCAs".
- **Stop selling at "yes".** Once a merchant qualifies, switch to logistics. Don't keep pitching.

### Vocabulary

| Use | Don't use |
|---|---|
| "Stacked MCAs" | "MCA debt portfolio" |
| "Effective APR" | "True cost of capital" |
| "Reconciliation" | "Renegotiation" (when referring to the formal MCA process) |
| "Confession of Judgment / COJ" | "Legal action" |
| "Daily debit" | "Daily withdrawal" |
| "Merchant" or "owner" | "Customer", "client" (in marketing) |
| "Program" | "Solution", "offering" |
| "Resolved" | "Settled" (avoid this verb on the homepage; reserve for when discussing the settlement program specifically) |

### Forbidden phrases

- "Don't lose your business!" (scare tactics)
- "Up to 80% off!" (inflation, exclamation, generic)
- "We've helped thousands!" (unverifiable, lazy)
- "Best in the industry" (generic, undefendable)
- "World class" (meaningless)
- "Published flat fee" / "Flat fee, published" (factually inaccurate; Business Debt Insider does not publish program fees pre-consultation)
- "No upfront fees" / "No upfront cost" / "No upfront retainer" (factually inaccurate)
- "Transparent flat fee" / "fee in writing on day one" / "We tell you the number before you sign anything" (factually inaccurate)
- "As featured in" / "As seen in" (no real media placements yet)
- Any sentence ending in an em dash

### Sample voice

**Hero**:
> Resolve stacked MCAs with a tailored program. Free assessment. Free calculators. Programs scoped to your specific situation.

**Email**:
> Bar, quick note. Based on the numbers you ran in the calculator, your stack is at a 132% weighted APR with a COJ clause in two of the contracts. The settlement program would resolve the balance for around $X over 11 months. If you want to talk it through, I have time tomorrow at 2:30 ET.

**Disclosure**:
> We are not a law firm. We coordinate licensed attorneys in your state when legal defense is required. We do not guarantee specific savings or outcomes. Results depend on lender mix, contract terms, and your business cash flow.

---

## 6. Spacing & layout

### Container

`max-w-content` is **72rem** (1152px). Use it for all marketing page wrappers.

```tsx
<section className="mx-auto max-w-content px-6 py-16">
```

### Vertical rhythm

- Section padding: `py-16` (4rem) on desktop, `py-12` on mobile (handled automatically by Tailwind defaults).
- Section spacing on stack: `mt-24` between major homepage sections (footer-style spacing). Within a section, `mt-8` between sub-blocks.
- Card padding: `p-6` for compact, `p-8` for hero-adjacent cards.

### Grid

- Two-column hero: `grid md:grid-cols-2 gap-12 items-start`, content left, form right.
- Three-stat row: `grid md:grid-cols-3 gap-6`.
- Four-card grid: `grid md:grid-cols-4 gap-6`.

### Border radius

| Element | Radius |
|---|---|
| Buttons, inputs | `rounded-md` (6px) |
| Cards | `rounded-xl` (12px) |
| Icon mark, app icon | `rounded-[14px]` (22% of viewport edge) |
| Pill badges | `rounded-full` |

### Shadows

We use shadows minimally. Default: no shadow on cards (border alone). For elevated states (modals, dropdowns), use:

```css
box-shadow: 0 1px 3px rgb(15 23 42 / 0.04), 0 8px 24px rgb(15 23 42 / 0.06);
```

That's `shadow-md` Tailwind-equivalent but tuned to slate (not black) for warmth.

---

## 7. Components

### Button

```tsx
// Primary
<button className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium">

// Secondary
<button className="bg-slate text-white px-4 py-2 rounded-md text-sm font-medium">

// Ghost
<button className="text-electric px-4 py-2 rounded-md text-sm font-medium">

// Outline
<button className="border border-border bg-white px-4 py-2 rounded-md text-sm font-medium">
```

Disabled: add `disabled:opacity-50 disabled:cursor-not-allowed`.

### Input

```tsx
<input className="border border-border rounded-md px-3 py-2 text-base" />
```

Focus state inherits browser default ring. Don't add custom focus styling unless accessibility audit demands it.

### Card

```tsx
<div className="bg-white border border-border rounded-xl p-6">
```

For compact stat cards (dashboard): `p-4 rounded-md`.

### Badge / Pill

```tsx
// Accent badge (used in hero eyebrows)
<span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">

// Neutral badge (status chips)
<span className="inline-block bg-offwhite text-muted text-xs font-medium px-2 py-0.5 rounded">
```

### Form layout (multi-step)

Used for the lead form. Pattern:

1. One question per screen.
2. Progress bar at top (`<ProgressBar step={n} total={7} />`).
3. Buttons: Yes/No or 4-up grid for choices; single text input for free-form.
4. Back button bottom-left, Next/Submit bottom-right.
5. Validation per step before allowing Next.

### Stat card

```tsx
<div className="bg-white border border-border rounded-xl p-6">
  <div className="text-3xl font-bold text-electric">42%</div>
  <div className="text-sm text-muted mt-1">Average savings</div>
</div>
```

### Nav (header)

White background, slate links, electric primary CTA on the right. `border-b border-border`. See `components/site/Header.tsx`.

---

## 8. Iconography

Use **Lucide** icons (free, MIT, geometric, matches our type weight). Sized to body copy by default, `w-4 h-4` for inline, `w-5 h-5` for buttons, `w-6 h-6` for section accents. Stroke `1.5` (Lucide default).

```tsx
import { CheckCircle2, ArrowRight } from "lucide-react";
<CheckCircle2 className="w-5 h-5 text-electric" />
```

Don't mix icon libraries. Don't use emoji as icons in the UI. The form's check (✓), arrow (→), and warning (⚠) are deliberate exceptions for high-density list contexts.

---

## 9. Imagery

### Photography

We use photography sparingly. When we do:

- **Real owners, never stock**. Subjects look like the merchants we serve: trucking owner-operators, restaurant managers, contractors. No suit-and-tie agency shots.
- **Natural light, real environments**. Inside a truck cab, behind a restaurant counter, on a job site. Not against a backdrop.
- **Composition**: subject left or right of center, allowing room for type overlay if needed.

### Color treatment

If we color-grade, push toward a slightly cool, slightly desaturated look. No film emulation, no orange-and-teal Hollywood grade.

### Illustration

Avoid illustration except for:
- Empty states in admin ("No leads yet")
- The favicon and icon mark itself

Style: geometric, single weight, electric or slate fill. No gradients. No characters. No "people-shaped blobs".

---

## 10. Don'ts (the cliffs)

- Don't add a third color. The discipline is the brand.
- Don't write copy with em dashes or exclamation points.
- Don't stack badges. One trust signal per slot.
- Don't add stock photography "to humanize the page".
- Don't say "world class", "industry-leading", "best of breed".
- Don't add gradients, glows, or shadows that aren't in this guide.
- Don't ship a page without the multi-step form on conversion-focused surfaces.
- Don't rebrand the wordmark in a different font for one campaign.

---

## 11. Source files

- Logos: `/Users/baralezrah/terradebt/public/logos/`
- Tokens (CSS): `/Users/baralezrah/terradebt/app/globals.css` (`@theme inline` block)
- Components: `/Users/baralezrah/terradebt/components/site/`
- Live design system: `https://businessdebtinsider.com/brand` (or `http://localhost:3000/brand` in dev)

## 12. Changelog

- **1.0**, 2026-05-05: Initial brand book. Established positioning, logo system (lockup, wordmark, icon, monogram, favicon variants), color palette (slate + electric + 3 neutrals), Inter typography, voice & tone, component library reference, imagery direction.
- **1.1**, 2026-05-05: Removed false fee-transparency claims (Business Debt Insider has upfront fees and does not publish program fees pre-consultation). Removed false "as featured in" media badge references. Repositioned tagline to "Resolve stacked MCAs with a tailored program." Voice still anchors on direct, specific, confident, calm.
- **1.2**, 2026-05-05: Removed AI Contract Review tool (not a real product). Added free calculators (Effective APR, Stacked MCA, Health Check) at /tools.
- **1.3**, 2026-05-12: Pivoted from MCA-only to multi-product business debt restructure firm. New tagline ("Restructure business debt with a coordinated workout."). Product categories: MCA Debt Relief, Equipment Finance Restructure, Vendor & Supplier Debt, Bank Loan & LOC Workouts, Business Tax Debt. Methods reduced from four to three (settlement, restructure, legal defense). Reverse consolidation defense folded into the MCA product page. Voice and visual system unchanged.
- **1.4**, 2026-05-04: Editorial pivot. Site now positions as the editorial-grade authority on business debt restructure, with magazine-led homepage, research-style essay grids, and named bylines. Tagline updated to "The business debt brief, written by operators." Typography expanded from Inter-only to Inter + Fraunces (serif headlines on h1/h2) + JetBrains Mono (kickers and numerical accents). Palette refined with warmer offwhite (#FAFAF7), new cream (#F5F2EA) for editorial blocks, and a warm hairline rule (#E5E0D5). Mesh and grid-pattern overlays removed from hero zones. Sticky LeadForm removed from /services/[slug], /articles/[slug], and /industries/[slug] in favor of quieter editorial sidebars and a SubscribeForm + Talk-to-the-team CTA pair at the end of each piece. LeadForm retained on /get-started, /go/[id], and /contact. New components: EditorialHero, TopicAreas, ResearchBand, FeaturedEssays, AboutTheFirm, FaqQuiet, EditorialClose, SubscribeForm. New /api/subscribe endpoint persists newsletter signups into the Lead table with source distinguished.
