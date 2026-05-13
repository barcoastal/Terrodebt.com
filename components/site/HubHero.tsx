import Link from "next/link";
import { PRODUCTS } from "@/lib/product-content";

export function HubHero() {
  return (
    <section className="bg-offwhite border-b border-rule">
      <div className="mx-auto max-w-content px-6 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
          Information hub
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate leading-[1.05] max-w-4xl">
          TerraDebt is the information hub on{" "}
          <span className="text-electric">business debt restructure</span>.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
          Plain-English guides, free calculators, and active programs covering six categories of business debt. Start by picking a topic.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 max-w-3xl">
          {PRODUCTS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/services/${p.slug}`}
              className="group flex items-baseline gap-3 border-t border-rule pt-3 no-underline text-slate hover:text-electric transition"
            >
              <span className="font-mono text-[11px] text-muted group-hover:text-electric transition w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium tracking-tight">
                {p.shortName}
              </span>
              <span className="ml-auto text-muted group-hover:text-electric transition" aria-hidden>→</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
          <span>
            <Link href="/articles" className="text-slate hover:text-electric no-underline border-b border-rule hover:border-electric pb-0.5">
              Browse all guides
            </Link>
          </span>
          <span>
            <Link href="/tools" className="text-slate hover:text-electric no-underline border-b border-rule hover:border-electric pb-0.5">
              Use the free calculators
            </Link>
          </span>
          <span>
            <Link href="/industries" className="text-slate hover:text-electric no-underline border-b border-rule hover:border-electric pb-0.5">
              Coverage by industry
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
