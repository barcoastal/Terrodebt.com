import Link from "next/link";
import { Reveal } from "./Reveal";
import { PRODUCTS } from "@/lib/product-content";

// Map each product to a small visual element rendered inside the cell.
type Visual = "settlement-bars" | "restructure-bars" | "equipment-tiles" | "vendor-chain" | "bank-tiles" | "tax-ladder";

const VISUAL_BY_SLUG: Record<string, Visual> = {
  "mca-debt-relief": "settlement-bars",
  "sba-loan-modification": "restructure-bars",
  "equipment-finance-restructure": "equipment-tiles",
  "vendor-supplier-debt": "vendor-chain",
  "bank-loan-workout": "bank-tiles",
  "business-tax-debt": "tax-ladder",
};

const SHORT_BODY: Record<string, string> = {
  "mca-debt-relief": "Settlement, restructure, reverse consolidation defense, and 72-hour legal coordination on stacked merchant cash advances.",
  "sba-loan-modification": "Hardship modifications and offer in compromise on SBA 7(a), 504, and EIDL loans. Coordinated with the lender and the SBA.",
  "equipment-finance-restructure": "Term extensions, lease modifications, and acceleration defense. Keep the equipment you depend on.",
  "vendor-supplier-debt": "Coordinated paydowns and settlements with trade creditors. Resolve the debt without breaking the supply chain.",
  "bank-loan-workout": "Forbearance, covenant waivers, and term modifications with the bank's special assets group.",
  "business-tax-debt": "Installment agreements, offer in compromise, and Trust Fund Recovery Penalty defense.",
};

export function FeatureBento() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">What we do</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Six product categories. One coordinated team.</h2>
            <p className="mt-4 text-muted leading-relaxed">We match the product to the debt mix, the timeline, and where you sit relative to default. No single playbook.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 + i * 0.05} className="h-full">
              <Link
                href={`/services/${p.slug}`}
                className="surface-card p-6 md:p-7 flex flex-col h-full transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] no-underline"
              >
                <Eyebrow>Product {String(i + 1).padStart(2, "0")}</Eyebrow>
                <CellTitle>{p.name}</CellTitle>
                <CellBody>{SHORT_BODY[p.slug]}</CellBody>
                <div className="mt-auto pt-5">
                  <Visual kind={VISUAL_BY_SLUG[p.slug]} />
                </div>
                <div className="mt-5 font-mono text-[11px] uppercase tracking-wider text-electric">
                  Explore {p.shortName.toLowerCase()} →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-wider text-electric">{children}</span>;
}

function CellTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-slate leading-snug">{children}</h3>;
}

function CellBody({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-muted text-sm leading-relaxed">{children}</p>;
}

function Visual({ kind }: { kind: Visual }) {
  if (kind === "settlement-bars") {
    return (
      <div className="rounded-xl border border-border bg-offwhite p-4">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Recent close-out</div>
        <div className="mt-3 space-y-2.5">
          <BarRow label="Owed" value="$425K" pct={100} color="bg-slate/70" />
          <BarRow label="Paid" value="$246K" pct={58} color="bg-electric" />
        </div>
      </div>
    );
  }
  if (kind === "restructure-bars") {
    return (
      <div className="rounded-xl border border-border bg-offwhite p-4">
        <div className="flex items-end gap-1.5 h-14">
          {[44, 42, 38, 32, 28, 22, 18, 18, 18, 18].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h * 1.6}%`, background: i >= 5 ? "var(--color-electric)" : "var(--color-border)" }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-baseline justify-between text-[10px] font-mono uppercase tracking-wider">
          <span className="text-muted">Monthly payment</span>
          <span className="text-electric">Reduced 38%</span>
        </div>
      </div>
    );
  }
  if (kind === "equipment-tiles") {
    return (
      <div className="grid grid-cols-3 gap-2">
        <StatTile value="82%" label="Cure rate" />
        <StatTile value="36mo" label="Avg extension" />
        <StatTile value="$2M" label="Max contract" />
      </div>
    );
  }
  if (kind === "vendor-chain") {
    return (
      <div className="rounded-xl border border-border bg-offwhite p-4">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Coordinated paydown</div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="font-mono text-[10px] bg-electric/10 text-electric px-2 py-1 rounded">
              V{n}
            </span>
          ))}
          <span className="text-border">+6</span>
        </div>
        <div className="mt-3 text-[11px] text-muted">11 vendors, one plan</div>
      </div>
    );
  }
  if (kind === "bank-tiles") {
    return (
      <div className="grid grid-cols-3 gap-2">
        <StatTile value="78%" label="Workout rate" />
        <StatTile value="180d" label="Avg engagement" />
        <StatTile value="$25M" label="Top of range" />
      </div>
    );
  }
  if (kind === "tax-ladder") {
    return (
      <div className="rounded-xl border border-border bg-offwhite p-4">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Resolution paths</div>
        <ul className="mt-3 space-y-1.5 text-[11px]">
          <li className="flex items-center justify-between">
            <span className="text-slate">Installment</span>
            <span className="font-mono text-muted">36-72mo</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-slate">OIC</span>
            <span className="font-mono text-electric">60-75% off</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-slate">CNC</span>
            <span className="font-mono text-muted">Bridge</span>
          </li>
        </ul>
      </div>
    );
  }
  return null;
}

function BarRow({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="font-mono font-semibold text-slate">{value}</span>
      </div>
      <div className="mt-1 h-2 bg-border rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-offwhite px-2 py-2 text-center">
      <div className="font-mono text-base font-bold text-slate tracking-tight">{value}</div>
      <div className="mt-0.5 text-[9px] uppercase tracking-wider text-muted leading-tight">{label}</div>
    </div>
  );
}
