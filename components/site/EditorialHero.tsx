import Link from "next/link";

const PILLS = ["MCA", "SBA", "Equipment", "Vendor", "Bank", "Tax"];

const STAT_TILES = [
  { value: "47%", label: "Avg savings on settled balances" },
  { value: "11 mo", label: "Avg program timeline" },
  { value: "50", label: "States with counsel" },
  { value: "6", label: "Coverage areas" },
];

export function EditorialHero() {
  return (
    <section className="relative bg-offwhite overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(16,185,129,0.06), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-content px-6 pt-16 md:pt-24 pb-20 md:pb-24 grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
        {/* Left: pitch */}
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 bg-white border border-border text-slate text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            Business debt restructure
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.02] text-slate">
            Restructure your business debt with a{" "}
            <span className="text-electric">coordinated plan</span>.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            TerraDebt covers MCA, SBA, equipment finance, vendor, bank, and tax debt. One team, six coverage areas, and a free assessment to find your fit.
          </p>

          <div className="mt-7 flex flex-wrap gap-2 max-w-xl">
            {PILLS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1 text-xs font-medium text-slate"
              >
                <span className="w-1 h-1 rounded-full bg-electric" />
                {p}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="bg-slate text-white px-5 py-3 rounded-xl text-sm font-semibold no-underline hover:bg-slate-soft transition inline-flex items-center gap-2"
            >
              Get my free assessment
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/services"
              className="bg-white border border-border text-slate px-5 py-3 rounded-xl text-sm font-semibold no-underline hover:border-electric hover:text-electric transition"
            >
              Browse coverage areas
            </Link>
          </div>
        </div>

        {/* Right: stat card */}
        <div className="md:col-span-5 md:sticky md:top-24">
          <div className="bg-white border border-border rounded-2xl shadow-soft p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Where programs land
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-electric">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                Active
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {STAT_TILES.map((s) => (
                <div key={s.label} className="bg-offwhite border border-border rounded-xl p-4">
                  <div className="font-mono text-3xl font-bold text-electric tracking-tighter">{s.value}</div>
                  <div className="mt-1 text-xs text-muted leading-snug">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-sm text-slate leading-relaxed">
                Working numbers across TerraDebt&apos;s coverage areas. Outcomes vary per program.
              </p>
              <Link
                href="/articles"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline"
              >
                Read the articles
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-electric" />
              50-state counsel
            </span>
            <span className="text-border">·</span>
            <span>Pre and post default</span>
            <span className="text-border">·</span>
            <span>Free assessment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
