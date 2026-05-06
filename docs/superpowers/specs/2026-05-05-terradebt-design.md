# TerraDebt — Design Spec

**Date:** 2026-05-05
**Owner:** Bar Elezra
**Domain:** terradebt.com
**Status:** Draft for review

---

## 1. What this is

TerraDebt is a new MCA debt relief brand — a sister to Coastal Debt — positioned as the modern, transparent, multi-angle player in a category dominated by 2018-era law-firm sites. It is a marketing site (content + landing pages) backed by a lightweight CMS for content control, lead capture, AI contract review, and lead routing.

This is a single-spec, single-implementation-plan project. It is large but cohesive (frontend + backend live in one Next.js app).

## 2. Strategic positioning

Six stacked positioning angles, all owned by TerraDebt simultaneously:

1. **Transparent / fee-published** — flat published rate; no upfront, no monthly fees
2. **Pre-default targeting** — owners with stacked MCAs still current, before lawsuits
3. **Vertical-first content** — dedicated pages per industry vertical (8 at launch)
4. **AI-tool-led** — free MCA contract review tool (upload contract → effective APR + options)
5. **Founder/personal brand** — founder voice on About + (later) video content
6. **MCA Guide handoff** — explicit BOFU funnel from themcaguide.com

Differentiation vs the top 10 competitors: every other brand owns 1-2 of these angles. TerraDebt stacks all 6.

## 3. Tech stack

**Frontend + Backend (single Next.js app):**
- Next.js 16 (App Router)
- Postgres (Railway managed)
- Prisma ORM
- TypeScript throughout
- Tailwind CSS
- Hosted on Railway (`terradebt` service, main branch auto-deploy)

**Concepts ported from Coastal Debt CMS:**
- 4 landing-page template types (form, call, game, article)
- Visitor tracking + UTM/click ID capture (eli_clickid pattern)
- Multi-step lead form pattern

**New systems built for TerraDebt:**
- Vertical-page builder (parameterized template, copy/stats per vertical)
- State-page generator (50 states, programmatic from template + state data)
- AI Contract Review tool (upload PDF → Claude API → effective APR breakdown)
- Article/blog CMS (markdown editor + media upload)
- Case-study builder

**Repo location:** `/Users/baralezrah/terradebt`

## 4. Visual identity

**Direction:** Slate + electric blue — modern fintech / Stripe-adjacent.

| Token | Value | Use |
|---|---|---|
| `--slate` | `#1E293B` | Primary text, dark surfaces |
| `--electric` | `#2563EB` | Primary CTA, links, accents |
| `--white` | `#FFFFFF` | Surfaces |
| `--off-white` | `#F8FAFC` | Page background |
| `--border` | `#E2E8F0` | Borders, dividers |
| `--muted` | `#64748B` | Secondary text |

**Type:** Inter throughout (geometric sans). Display weight 600/700 for headlines, 400/500 for body. Generous whitespace.

**Vibe:** Stripe / Mercury / Brex polish. NOT a 2018 law firm. NOT Coastal Debt's blue (#3052FF) — this is a cooler, brighter electric blue.

## 5. Content scope at launch (~100 pages)

> Brainstorm target was "Standard ~80". Final breakdown lands around 100 because of standard meta pages (about/contact/legal/trust). Core SEO surface = 92 (home + 4 programs + 8 verticals + 50 states + 20 articles + 10 case studies).

| Section | Count | Notes |
|---|---|---|
| Homepage | 1 | Hero with calculator, social proof, AI tool CTA, founder section |
| Program pages | 4 | Settlement / Restructure / Reverse Consolidation Defense / Legal Defense |
| Vertical pages | 8 | Trucking, Restaurants, Construction, Healthcare, Retail, E-comm, Salons, Auto |
| State defense pages | 50 | Programmatic — "MCA Defense in [State]" |
| Articles / blog | 20 | Educational + BOFU-tuned, internal links to programs |
| Case studies | 10 | Industry / debt amount / % saved / timeline / story |
| AI Contract Review tool | 1 | `/contract-review` — upload PDF, get breakdown |
| Calculator | 1 | Standalone "Estimate your savings" page |
| Founder / About | 1 | Founder story, mission, team |
| Trust / Reviews | 1 | Aggregated reviews, BBB seal, testimonials |
| Contact | 1 | Phone + form |
| Privacy / Terms / Disclosure | 3 | Legal |

**Article topic seeds (sample):** What is reverse consolidation, MCA settlement vs restructure, How to read your MCA contract, Effective APR explained, COJ defense basics, How MCA debt relief actually works, etc.

## 6. Lead capture flow

### 6.1 Multi-step form (used on all landing page CTAs and homepage)

| Step | Field | Type |
|---|---|---|
| 1 | Do you have MCA debt? | Yes / No |
| 2 | How much MCA debt? | Slider or buckets (`<$25K`, `$25K-$75K`, `$75K-$200K`, `$200K-$500K`, `$500K+`) |
| 3 | Business name | Text |
| 4 | First name | Text |
| 5 | Last name | Text |
| 6 | Phone | Tel |
| 7 | Email | Email |

**Logic:**
- Step 1 = "No" → friendly off-ramp page ("We focus on MCA-specific situations; here's a free guide") + email capture only
- Step 1 = "Yes" → continue through all 7 steps
- Each step is its own screen (mobile-first), back button, progress bar
- Submission stores lead in DB and fires all integrations (see 6.3)

### 6.2 AI Contract Review tool (separate flow)

Standalone page at `/contract-review`:
1. User uploads MCA contract PDF
2. Server extracts text, sends to Claude API with structured prompt
3. Returns: effective APR, total payback, daily/weekly payment breakdown, red flags, recommended next steps
4. Result shown immediately (no email gate)
5. Optional capture at result: "Email me this PDF report" → captures email + creates a lead with source `ai-contract-review`

### 6.3 Integrations (full stack from day 1)

On any lead submission:
1. Insert into Postgres `leads` table with full payload + UTM + click IDs
2. POST webhook to Coastal Debt CRM endpoint (TBD URL — placeholder env var `COASTAL_CRM_WEBHOOK_URL`)
3. POST to Slack channel via incoming webhook (`SLACK_LEADS_WEBHOOK_URL`)
4. Fire GA4 conversion event `generate_lead` with value
5. Upload Google Ads offline conversion if `gclid` present — TerraDebt gets its own Google Ads OAuth + yaml credentials file (not shared with Mirai/Coastal/Sapir, per the no-cross-project-keys rule). Env vars: `GOOGLE_ADS_CONVERSION_ACTION_ID`, `GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_YAML_PATH`

## 7. CMS / admin scope

Admin lives at `/admin` (cookie-auth, single-admin or admin+staff roles). Routes:

| Route | Purpose |
|---|---|
| `/admin` | Dashboard — leads count, AI submissions, top pages |
| `/admin/leads` | Lead inbox — filter by source, status, date; export CSV |
| `/admin/contract-reviews` | AI contract submissions — view contract, AI summary, lead link |
| `/admin/pages` | Landing-page CRUD — pick template (form/call/game/article), edit copy via fields |
| `/admin/articles` | Article CRUD — markdown editor, media upload, publish/draft |
| `/admin/verticals` | Vertical-page editor — copy/stats/proof per vertical |
| `/admin/states` | State-page generator — bulk regenerate from template + state data file |
| `/admin/case-studies` | Case study CRUD |
| `/admin/visitors` | Visitor tracking dashboard — UTM/click ID breakdown |
| `/admin/settings` | Phone numbers, BBB/trust assets, Slack/CRM webhook URLs, GA/Ads IDs |

**Out of scope at launch (phase 2):**
- Ad generator (port from Coastal in phase 2)
- TikTok lead sync (port in phase 2)
- A/B testing
- Email/SMS broadcast (Klaviyo)
- Full analytics dashboard

## 8. Data model (initial Prisma schema)

```
User           id, email, password_hash, role, created_at
Lead           id, first_name, last_name, business_name, phone, email,
               has_mca_debt, debt_amount_bucket, source, status,
               utm_*, gclid, fbclid, eli_clickid, ip, user_agent,
               created_at, integration_status (json)
ContractReview id, lead_id?, contract_text, contract_filename, ai_summary (json),
               effective_apr, total_payback, red_flags (json),
               email_captured?, created_at
Page           id, slug, template_type (form|call|game|article),
               title, hero_headline, hero_subline, content (json),
               phone_override?, mobile_cta (call|form),
               skip_pre_qual?, published, created_at, updated_at
Article        id, slug, title, excerpt, content_md, hero_image,
               author, published, published_at, created_at, updated_at
Vertical       id, slug, name, headline, subline, stats (json),
               pain_points (json), proof (json), faq (json), published
StatePage      id, state_code, state_name, content (json), published
CaseStudy      id, slug, industry, debt_amount, savings_pct, months,
               story_md, hero_image, published
Visitor        id, eli_clickid, ip, user_agent, utm_*, gclid, fbclid,
               first_seen, last_seen, page_views (int)
Setting        key, value (json)
```

## 9. Page architecture

### Homepage hero
- Headline: transparency wedge ("MCA debt relief, with a published flat fee.")
- Multi-step form embedded right side / below on mobile
- Aggregate dollar counter ("$X+ resolved") — settable via admin
- Trust strip: BBB seal + Trustpilot/Google rating + media badges
- Below fold: how it works, AI contract review CTA, vertical grid, case studies, founder section, FAQ

### Program pages
Same template, parameterized: settlement vs restructure vs reverse consolidation defense vs legal defense. Each page has its own headline, mechanism explanation, "is this right for you" qualifier, case study, multi-step form CTA.

### Vertical pages
Industry-specific copy + stats + pain points + 1 case study from the vertical. Same form CTA at top + bottom.

### State pages
Programmatic. Template + state-specific data: relevant state laws, COJ enforceability in that state, local court considerations, state-specific case study where available.

### Articles
Markdown-rendered. Each article has internal links to relevant program pages, vertical pages, and the AI contract tool.

## 10. Tracking & analytics

- GA4 (existing TerraDebt property TBD — placeholder env var)
- Google Ads conversion tracking (gclid capture + offline upload)
- Meta Pixel (fbclid capture)
- Custom `eli_clickid` system (port pattern from Coastal Debt)
- All visitors tracked in `Visitor` table on first page view (cookie-based ID)

## 11. Hosting & deploy

- **Railway** project: `terradebt`
- Auto-deploy from `main` branch
- Postgres add-on attached
- Environment variables managed via Railway dashboard
- Domain `terradebt.com` pointed to Railway service
- TerraDebt has its **own** API keys (Anthropic, Google Ads, etc.) per the no-cross-project-keys rule — do not reuse Coastal/Mirai/Sapir keys

## 12. Out of scope (explicitly)

- Mobile apps
- Customer portal / login for clients (post-sale)
- Payment processing
- Ad generator (phase 2)
- TikTok lead sync (phase 2)
- Klaviyo email nurture (phase 2)
- A/B testing infra (phase 2)
- Multi-language

## 13. Open items & assumptions to confirm

| # | Item | Default assumption |
|---|---|---|
| O1 | Lead routing: which CRM endpoint | Default: same Coastal Debt CMS leads endpoint receives TerraDebt leads tagged `source=terradebt`. Confirm or use separate endpoint. |
| O2 | Slack channel for leads | `#terradebt-leads` (new channel) |
| O3 | Founder name + photo for About page | Bar to provide; placeholder copy in initial build |
| O4 | Phone number to display | Either reuse Coastal's or get a new one — Bar to confirm before launch |
| O5 | Aggregate dollar counter — starting number | $0 / "Founding" badge until first wins, then update |
| O6 | Trustpilot/BBB accounts | Bar to set up; placeholder badges until live |

## 14. Success criteria

**Launch (week ~4):**
- All 80 pages live and indexed
- Lead form submits successfully end-to-end (DB + Slack + CRM webhook + GA4)
- AI contract review tool produces accurate effective APR breakdown for at least 5 sample contracts
- Admin can edit landing page copy, articles, verticals, settings without engineering
- Lighthouse score >90 on mobile homepage
- All forms POST under 1s p95

**Post-launch 30 days:**
- 50+ leads from organic + paid combined
- 20+ AI contract reviews completed
- 10+ articles indexed and ranking
- Phase 2 backlog (ad generator port, Klaviyo, A/B testing) prioritized
