import Link from "next/link";
import { VERTICALS } from "@/lib/verticals";

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
      <div className="mx-auto max-w-content px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate">Industries we serve</h2>
        <p className="mt-2 text-muted">Stacked MCAs hit every business differently. We tailor the program to yours.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {VERTICALS.map((v) => (
            <Link
              key={v.slug}
              href={`/industries/${v.slug}`}
              className="block p-5 rounded-xl border border-border bg-offwhite no-underline hover:border-electric hover:no-underline"
            >
              <div className="text-base font-semibold text-slate">{v.name}</div>
              <div className="mt-1 text-xs text-muted leading-relaxed">{TEASES[v.slug]}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
