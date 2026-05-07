import Link from "next/link";
import { db } from "@/lib/db";
import { Reveal } from "./Reveal";

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
      <div className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl md:text-5xl font-bold text-slate tracking-tighter">Recent outcomes</h2>
            <Link href="/case-studies" className="text-sm font-medium text-electric no-underline hover:underline">View all case studies →</Link>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                href={`/case-studies/${c.slug}`}
                className="group block surface-card p-6 no-underline hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] hover:border-electric/40 transition-all h-full"
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">{c.industry}</div>
                <div className="mt-4 font-mono text-3xl font-semibold text-slate tracking-tight">
                  ${(c.debtAmount / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-muted">debt resolved</div>
                <div className="mt-5 pt-5 border-t border-border flex justify-between items-baseline text-sm">
                  <span className="font-mono text-electric font-semibold">{c.savingsPct}% saved</span>
                  <span className="font-mono text-xs text-muted">{c.months} mo</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
