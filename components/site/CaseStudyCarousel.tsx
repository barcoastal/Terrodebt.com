import Link from "next/link";
import { db } from "@/lib/db";

type Card = {
  slug: string;
  industry: string;
  debtAmount: number;
  savingsPct: number;
  months: number;
};

const PLACEHOLDERS: Card[] = [
  { slug: "trucking-425k", industry: "Trucking", debtAmount: 425000, savingsPct: 42, months: 11 },
  { slug: "restaurant-180k", industry: "Restaurant", debtAmount: 180000, savingsPct: 51, months: 9 },
  { slug: "construction-560k", industry: "Construction", debtAmount: 560000, savingsPct: 47, months: 13 },
  { slug: "ecommerce-220k", industry: "E-commerce", debtAmount: 220000, savingsPct: 55, months: 8 },
];

export async function CaseStudyCarousel() {
  let cards: Card[] = PLACEHOLDERS;
  try {
    const rows = await db.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
    if (rows.length > 0) {
      cards = rows.map((r) => ({
        slug: r.slug,
        industry: r.industry,
        debtAmount: r.debtAmount,
        savingsPct: r.savingsPct,
        months: r.months,
      }));
    }
  } catch {
    cards = PLACEHOLDERS;
  }

  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-slate">Recent outcomes</h2>
          <Link href="/case-studies" className="text-sm font-medium">View all case studies</Link>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="block p-5 rounded-xl border border-border bg-white no-underline hover:border-electric hover:no-underline"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">{c.industry}</div>
              <div className="mt-3 text-2xl font-bold text-slate">${(c.debtAmount / 1000).toFixed(0)}K</div>
              <div className="text-xs text-muted">debt resolved</div>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-electric font-semibold">{c.savingsPct}% saved</span>
                <span className="text-muted">{c.months} months</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
