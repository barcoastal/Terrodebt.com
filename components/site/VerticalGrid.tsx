import Link from "next/link";
import { VERTICALS } from "@/lib/verticals";
import { Reveal } from "./Reveal";

const TEASES: Record<string, string> = {
  trucking: "Factoring stacked on MCAs, fuel and driver pressure.",
  restaurants: "Seasonal swings and slim margins, same daily debit.",
  construction: "Progress payments do not match daily MCA pulls.",
  healthcare: "Insurance reimbursement lag plus equipment loans.",
  retail: "Inventory cycles versus thin gross margins.",
  ecommerce: "Ad spend, inventory, and platform payout holds.",
  salons: "1099 stylist payouts and supplier credit pressure.",
  auto: "Floor plan financing on top of stacked MCAs.",
};

export function VerticalGrid() {
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-slate tracking-tighter">Industries we serve</h2>
          <p className="mt-3 text-muted text-lg">Stacked MCAs hit every business differently. We tailor the program to yours.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {VERTICALS.map((v, i) => (
            <Reveal key={v.slug} delay={i * 0.05}>
              <Link
                href={`/industries/${v.slug}`}
                className="group block p-5 rounded-2xl border border-border bg-offwhite no-underline hover:border-electric hover:bg-white hover:-translate-y-0.5 hover:shadow-soft transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-base font-semibold text-slate tracking-tight">{v.name}</div>
                    <div className="mt-1 text-xs text-muted leading-relaxed">{TEASES[v.slug]}</div>
                  </div>
                  <span className="text-electric opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden>→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
