import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Debt restructure for trucking, restaurants, healthcare, construction, retail, e-commerce, salons, auto repair. Industry-specific cash flow expertise.",
};

export default function IndustriesIndex() {
  return (
    <article>
      <section className="relative bg-offwhite border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="relative mx-auto max-w-content px-6 py-20">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Industries</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">Industries we serve.</h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">Eight verticals at launch. Each program adapts to the cash flow shape, lender mix, and seasonality of the industry we are working with.</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {VERTICAL_CONTENT.map((v) => (
          <Link key={v.slug} href={`/industries/${v.slug}`} className="group surface-card overflow-hidden no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
            <div className="relative aspect-[16/10] bg-offwhite overflow-hidden">
              <Image src={`/images/industry-${v.slug}.png`} alt={v.name} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight text-slate">{v.name}</h2>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">View →</span>
              </div>
              <p className="mt-2 text-muted line-clamp-2">{v.subline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {v.stats.slice(0, 2).map((s) => (
                  <span key={s.label} className="text-xs bg-offwhite border border-border rounded-md px-2 py-1 text-slate">
                    <span className="font-mono font-semibold text-electric">{s.value}</span> <span className="text-muted">{s.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </article>
  );
}
