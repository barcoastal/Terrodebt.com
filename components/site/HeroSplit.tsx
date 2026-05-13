import Link from "next/link";
import Image from "next/image";

const INDUSTRY_PILLS = [
  "trucking",
  "restaurants",
  "construction",
  "healthcare",
  "retail",
  "ecommerce",
];

export function HeroSplit() {
  return (
    <section className="bg-offwhite">
      {/* Top hairline meta-bar */}
      <div className="border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted">
          <span>TerraDebt · GRL Recovery LLC</span>
          <span>Fort Lauderdale, FL</span>
        </div>
      </div>

      {/* Main hero — asymmetric. Left text in the container, photo bleeds off right edge. */}
      <div className="relative">
        <div className="mx-auto max-w-content px-6 pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
            <div className="md:col-span-7">
              <span className="inline-block bg-electric text-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider">
                Business Debt Restructure
              </span>

              <h1 className="mt-7 text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-slate leading-[0.95]">
                Restructure your business debt with a coordinated plan.
              </h1>

              <p className="mt-7 text-xl text-muted max-w-xl leading-relaxed">
                TerraDebt covers MCA, SBA, equipment finance, vendor, bank, and tax debt. One team. Six coverage areas. A free assessment to find your fit.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/get-started"
                  className="bg-slate text-white px-5 py-3 text-sm font-semibold no-underline hover:bg-slate-soft transition inline-flex items-center gap-2"
                >
                  Get free assessment
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-medium text-slate no-underline hover:text-electric transition inline-flex items-center gap-2"
                >
                  Browse coverage
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="mt-12 pt-5 border-t border-rule">
                <Link
                  href="/services"
                  className="font-mono text-[11px] uppercase tracking-wider text-slate no-underline hover:text-electric transition inline-flex items-center gap-2"
                >
                  What we cover
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            {/* Spacer in the grid (photo is positioned absolutely on desktop, see below) */}
            <div className="md:col-span-5 md:hidden">
              <div className="relative aspect-[4/5] border border-rule overflow-hidden">
                <Image
                  src="/images/hero.png"
                  alt="A small business owner reviewing finances at their workspace"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate/80 backdrop-blur-sm px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
                  Fig. 01 / Operator
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: full-bleed photo on the right that overflows the container */}
        <div
          aria-hidden
          className="hidden md:block absolute top-16 right-0 bottom-12 lg:top-24 lg:bottom-16"
          style={{
            // Photo width = ~42% of viewport, sitting flush to right edge
            width: "min(48vw, 720px)",
          }}
        >
          <div className="relative h-full w-full border border-rule overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="A small business owner reviewing finances at their workspace"
              fill
              priority
              sizes="(min-width: 1024px) 720px, 48vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-slate/85 backdrop-blur-sm px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white">
              Fig. 01 / Operator
            </div>
          </div>
        </div>
      </div>

      {/* Hairline-bracketed industry pills row */}
      <div className="border-y border-rule">
        <div className="mx-auto max-w-content px-6 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span className="text-slate">Used in</span>
            {INDUSTRY_PILLS.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                <span className="text-slate">{p}</span>
                {i < INDUSTRY_PILLS.length - 1 && <span className="text-rule">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
