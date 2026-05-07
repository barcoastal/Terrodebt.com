import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand & Design System",
  description: "TerraDebt's brand identity, color tokens, typography, and component library.",
};

export default function BrandPage() {
  return (
    <article className="mx-auto max-w-content px-6 py-16 space-y-24">
      <header>
        <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">v1.0</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate">Brand &amp; Design System</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">
          The visual and verbal source of truth for TerraDebt. Use this page to inspect tokens and components in context. The complete brand book lives in <code className="text-sm bg-offwhite px-2 py-0.5 rounded">/brand/BRAND.md</code>.
        </p>
      </header>

      <Section number="01" title="Logo system" description="The TerraDebt mark is a geometric T inside a slate square, paired with the wordmark in Inter Bold. The electric blue dot is the brand's signal element. It always appears.">
        <div className="grid md:grid-cols-2 gap-6">
          <LogoCard label="Default lockup" file="/logos/terradebt-lockup.svg" bg="bg-white" />
          <LogoCard label="Wordmark" file="/logos/terradebt-wordmark.svg" bg="bg-white" />
          <LogoCard label="Wordmark on dark" file="/logos/terradebt-wordmark-white.svg" bg="bg-slate" />
          <LogoCard label="Wordmark monochrome" file="/logos/terradebt-wordmark-mono.svg" bg="bg-offwhite" tint />
          <LogoCard label="Icon mark (slate)" file="/logos/terradebt-icon.svg" bg="bg-white" small />
          <LogoCard label="Icon mark (light, on dark)" file="/logos/terradebt-icon-light.svg" bg="bg-slate" small />
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Don rule="Don't recolor the wordmark outside slate, white, or currentColor." />
          <Don rule="Don't drop the electric dot. It's non-negotiable." />
          <Don rule="Don't apply shadows, glows, gradients, or filters." />
        </div>
      </Section>

      <Section number="02" title="Color" description="Two foundation colors. Three neutrals. Restraint earns the modernness.">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Swatch name="Slate" hex="#1E293B" varName="--color-slate" use="Primary text, dark surfaces" textOn="white" />
          <Swatch name="Electric" hex="#2563EB" varName="--color-electric" use="CTAs, links, accent" textOn="white" />
          <Swatch name="White" hex="#FFFFFF" varName="--color-white" use="Card surfaces" textOn="slate" border />
          <Swatch name="Off-white" hex="#F8FAFC" varName="--color-offwhite" use="Page background" textOn="slate" border />
          <Swatch name="Border" hex="#E2E8F0" varName="--color-border" use="Dividers, card edges" textOn="slate" border />
          <Swatch name="Muted" hex="#64748B" varName="--color-muted" use="Secondary text, captions" textOn="white" />
        </div>

        <h3 className="text-lg font-semibold mt-8">Approved tints</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <TintSwatch label="bg-electric/5" cls="bg-electric/5" />
          <TintSwatch label="bg-electric/10" cls="bg-electric/10" />
          <TintSwatch label="bg-electric/20" cls="bg-electric/20" />
          <TintSwatch label="bg-slate/5" cls="bg-slate/5" />
        </div>
      </Section>

      <Section number="03" title="Typography" description="Inter, variable, via next/font. One typeface. No pairing.">
        <div className="space-y-6">
          <TypeRow tag="Display" cls="text-5xl md:text-6xl font-bold tracking-tight" sample="Resolve stacked MCAs with a tailored program." />
          <TypeRow tag="H1" cls="text-4xl md:text-5xl font-bold tracking-tight" sample="Settle stacked MCAs for less than you owe." />
          <TypeRow tag="H2" cls="text-2xl md:text-3xl font-semibold tracking-tight" sample="How it works" />
          <TypeRow tag="H3" cls="text-xl font-semibold" sample="Recent example" />
          <TypeRow tag="Body" cls="text-base" sample="Settlement, restructure, or legal defense, coordinated end to end. Free assessment to find your fit." />
          <TypeRow tag="Body large (muted)" cls="text-lg text-muted" sample="The modern way to resolve stacked MCAs." />
          <TypeRow tag="Small (muted)" cls="text-sm text-muted" sample="Estimates only. Real numbers depend on lender mix and contract terms." />
          <TypeRow tag="Eyebrow" cls="text-xs uppercase tracking-wide text-muted font-medium" sample="Featured Case Study" />
        </div>
      </Section>

      <Section number="04" title="Buttons" description="One primary action per screen. Electric is sacred.">
        <div className="flex flex-wrap gap-3 items-center">
          <button className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium">Primary</button>
          <button className="bg-slate text-white px-4 py-2 rounded-md text-sm font-medium">Secondary</button>
          <button className="text-electric px-4 py-2 rounded-md text-sm font-medium">Ghost</button>
          <button className="border border-border bg-white px-4 py-2 rounded-md text-sm font-medium text-slate">Outline</button>
          <button disabled className="bg-electric text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">Disabled</button>
        </div>
      </Section>

      <Section number="05" title="Inputs" description="Border at 1px. Focus uses native ring. No custom outlines.">
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <input type="text" placeholder="Business name" className="border border-border rounded-md px-3 py-3 text-base" />
          <input type="email" placeholder="you@business.com" className="border border-border rounded-md px-3 py-3 text-base" />
          <select className="border border-border rounded-md px-3 py-3 text-base"><option>Less than $25K</option></select>
          <textarea placeholder="Tell us about your situation" rows={3} className="border border-border rounded-md px-3 py-3 text-base" />
        </div>
      </Section>

      <Section number="06" title="Cards" description="White surface, 1px border, 12px radius. No shadow by default.">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="text-sm text-muted">Trucking</div>
            <div className="mt-1 text-xl font-semibold text-slate">$425K resolved · 42% saved · 11 months</div>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-electric">47%</div>
            <div className="text-sm text-muted mt-1">Average savings</div>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <h4 className="text-lg font-semibold">Reconciliation Sprint</h4>
            <p className="mt-1 text-muted text-sm">A 30-day program for owners still current on stacked MCAs.</p>
          </div>
        </div>
      </Section>

      <Section number="07" title="Badges & status" description="Pill shape. Tints, not solid color, for accent.">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-3 py-1 rounded-full">Tailored program</span>
          <span className="inline-block bg-offwhite text-muted text-xs font-medium px-2 py-0.5 rounded border border-border">Draft</span>
          <span className="inline-block bg-electric/10 text-electric text-xs font-medium px-2 py-0.5 rounded">Active</span>
          <span className="inline-block bg-slate/5 text-slate text-xs font-medium px-2 py-0.5 rounded">Completed</span>
        </div>
      </Section>

      <Section number="08" title="Voice & tone" description="Direct. Specific. Confident. Calm. Plain-spoken.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="text-xs uppercase tracking-wide text-muted font-medium">Hero</div>
            <p className="mt-3 text-slate">Resolve stacked MCAs with a tailored program. Free assessment. Free AI contract review. Programs scoped to your specific situation.</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="text-xs uppercase tracking-wide text-muted font-medium">Outreach email</div>
            <p className="mt-3 text-slate">Bar, quick note. The contract you uploaded shows a 132% effective APR with a COJ clause. The settlement program would resolve the balance for around $X over 11 months. If you want to talk it through, I have time tomorrow at 2:30 ET.</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="text-xs uppercase tracking-wide text-muted font-medium">Disclosure</div>
            <p className="mt-3 text-slate">We are not a law firm. We coordinate licensed attorneys in your state when legal defense is required. We do not guarantee specific savings or outcomes. Results depend on lender mix, contract terms, and your business cash flow.</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="text-xs uppercase tracking-wide text-muted font-medium">Forbidden</div>
            <ul className="mt-3 space-y-1 text-slate text-sm">
              <li>✕ &quot;Don&apos;t lose your business!&quot; (scare tactics)</li>
              <li>✕ &quot;Up to 80% off!&quot; (inflation, exclamation, generic)</li>
              <li>✕ &quot;World class&quot;, &quot;industry-leading&quot; (meaningless)</li>
              <li>✕ &quot;Published flat fee&quot;, &quot;No upfront fees&quot; (factually inaccurate)</li>
              <li>✕ &quot;As featured in&quot;, &quot;As seen in&quot; (no real placements yet)</li>
              <li>✕ Any sentence ending in an em dash</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section number="09" title="Spacing & layout" description="Container 1152px. Vertical rhythm via Tailwind defaults.">
        <div className="bg-white border border-border rounded-xl p-6 font-mono text-sm space-y-1">
          <div><span className="text-muted">max-w-content</span> = 72rem (1152px)</div>
          <div><span className="text-muted">section py</span> = py-16 (4rem)</div>
          <div><span className="text-muted">card padding</span> = p-6 / p-8</div>
          <div><span className="text-muted">card radius</span> = rounded-xl (12px)</div>
          <div><span className="text-muted">button radius</span> = rounded-md (6px)</div>
          <div><span className="text-muted">icon-mark radius</span> = 14px (22% of 64px)</div>
        </div>
      </Section>

      <Section number="10" title="Don'ts" description="The discipline is the brand.">
        <div className="grid md:grid-cols-2 gap-4">
          <Don rule="Don't add a third color." />
          <Don rule="Don't write copy with em dashes or exclamation points." />
          <Don rule="Don't stack trust badges. One signal per slot." />
          <Don rule="Don't add stock photography to &ldquo;humanize&rdquo; the page." />
          <Don rule="Don't ship a page without the multi-step form on conversion surfaces." />
          <Don rule="Don't rebrand the wordmark in a different font for a campaign." />
        </div>
      </Section>

      <footer className="pt-12 border-t border-border text-sm text-muted">
        TerraDebt brand system v1.0. Source: <code className="text-xs bg-offwhite px-2 py-0.5 rounded">brand/BRAND.md</code>. Last updated 2026-05-05.
      </footer>
    </article>
  );
}

function Section({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-4">
        <span className="text-xs uppercase tracking-wide text-muted font-medium">{number}</span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate">{title}</h2>
      </div>
      <p className="mt-2 text-muted max-w-2xl">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function LogoCard({ label, file, bg, small, tint }: { label: string; file: string; bg: string; small?: boolean; tint?: boolean }) {
  return (
    <div className={`border border-border rounded-xl ${bg} ${tint ? "text-slate" : ""} p-8 flex flex-col items-center justify-center min-h-[160px]`}>
      <div className={small ? "w-16 h-16" : "w-full max-w-[280px]"}>
        <Image src={file} alt={label} width={small ? 64 : 320} height={small ? 64 : 64} className="w-full h-auto" unoptimized />
      </div>
      <div className={`mt-4 text-xs uppercase tracking-wide font-medium ${bg.includes("slate") ? "text-white/70" : "text-muted"}`}>{label}</div>
    </div>
  );
}

function Swatch({ name, hex, varName, use, textOn, border }: { name: string; hex: string; varName: string; use: string; textOn: "white" | "slate"; border?: boolean }) {
  const textCls = textOn === "white" ? "text-white" : "text-slate";
  return (
    <div className={`rounded-xl ${border ? "border border-border" : ""} overflow-hidden`}>
      <div className={`${textCls} p-6 min-h-[140px] flex flex-col justify-end`} style={{ backgroundColor: hex }}>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-xs opacity-80 font-mono mt-1">{hex}</div>
      </div>
      <div className="bg-white p-3 text-xs">
        <div className="text-muted font-mono">{varName}</div>
        <div className="text-slate mt-1">{use}</div>
      </div>
    </div>
  );
}

function TintSwatch({ label, cls }: { label: string; cls: string }) {
  return (
    <div className={`${cls} border border-border rounded-md p-6 text-xs font-mono text-slate`}>{label}</div>
  );
}

function TypeRow({ tag, cls, sample }: { tag: string; cls: string; sample: string }) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-4 items-baseline border-b border-border pb-6">
      <div className="text-xs uppercase tracking-wide text-muted font-medium">{tag}</div>
      <div className={`${cls} text-slate`}>{sample}</div>
    </div>
  );
}

function Don({ rule }: { rule: string }) {
  return (
    <div className="bg-white border border-border rounded-md p-4 text-sm text-slate">
      <span className="text-muted mr-2">✕</span>{rule}
    </div>
  );
}
