import Link from "next/link";
import { PRODUCTS } from "@/lib/product-content";

export function CoverageList() {
  return (
    <section className="bg-white border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4 md:sticky md:top-24">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              What we cover
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-slate leading-tight">
              Six categories of business debt.
            </h2>
            <p className="mt-4 text-base text-muted max-w-md leading-relaxed">
              Each has its own contract structures, lender behavior, and workout playbook. Read the relevant guide before you make a move.
            </p>
          </div>

          <ol className="md:col-span-8 divide-y divide-rule">
            {PRODUCTS.map((p, i) => (
              <li key={p.slug} className="py-7 first:pt-0 last:pb-0">
                <Link
                  href={`/services/${p.slug}`}
                  className="group grid grid-cols-12 gap-6 items-baseline no-underline"
                >
                  <span className="col-span-1 font-mono text-sm text-muted group-hover:text-electric transition">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-11">
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate group-hover:text-electric transition">
                        {p.name}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-electric transition">
                        Read the guide →
                      </span>
                    </div>
                    <p className="mt-3 text-muted leading-relaxed max-w-2xl">
                      {p.subline}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
