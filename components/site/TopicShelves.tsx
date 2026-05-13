import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/product-content";
import { db } from "@/lib/db";

type Article = {
  slug: string;
  title: string;
  excerpt: string | null;
  heroImage: string | null;
  contentMd: string;
  publishedAt: Date | null;
  createdAt: Date;
};

function readTime(md: string): number {
  if (!md) return 6;
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}

function topicLabel(slug: string): string {
  if (slug.includes("mca")) return "MCA";
  if (slug.includes("sba")) return "SBA";
  if (slug.includes("equipment")) return "Equipment";
  if (slug.includes("vendor")) return "Vendor";
  if (slug.includes("bank")) return "Bank";
  if (slug.includes("tax")) return "Tax";
  return "Guide";
}

const TOPIC_SHELVES = [
  { name: "MCA Debt Relief", slug: "mca-debt-relief", match: ["mca", "reverse", "coj", "ucc", "factor", "settle", "consolidate"] },
  { name: "SBA Loan Modification", slug: "sba-loan-modification", match: ["sba", "loan-modification", "eidl"] },
  { name: "Business Tax Debt", slug: "business-tax-debt", match: ["tax", "irs"] },
];

function countMatchesForTopic(slug: string, keywords: string[]): number {
  // Count product guides only (we render product category cards in the first shelf)
  // Used for the big shelf card "[N guides]" mono count.
  return keywords.length; // placeholder; actual article counts come from DB below
}

export async function TopicShelves() {
  let allArticles: Article[] = [];
  try {
    const rows = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        heroImage: true,
        contentMd: true,
        publishedAt: true,
        createdAt: true,
      },
    });
    allArticles = rows as Article[];
  } catch {}

  const counts: Record<string, number> = {};
  for (const p of PRODUCTS) {
    counts[p.slug] = allArticles.filter((a) => {
      const s = a.slug.toLowerCase();
      if (p.slug === "mca-debt-relief") return s.includes("mca") || s.includes("reverse") || s.includes("coj") || s.includes("ucc");
      if (p.slug === "sba-loan-modification") return s.includes("sba") || s.includes("loan-modification") || s.includes("eidl");
      if (p.slug === "business-tax-debt") return s.includes("tax") || s.includes("irs");
      if (p.slug === "equipment-finance-restructure") return s.includes("equipment");
      if (p.slug === "vendor-supplier-debt") return s.includes("vendor");
      if (p.slug === "bank-loan-workout") return s.includes("bank") || s.includes("covenant");
      return false;
    }).length;
  }

  return (
    <>
      {/* Topic cards shelf */}
      <section className="bg-white border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-14">
          <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                Browse by topic
              </span>
              <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
                The six coverage areas
              </h2>
            </div>
            <Link
              href="/services"
              className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline shrink-0"
            >
              All topics →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="group bg-slate text-white p-6 md:p-7 no-underline transition hover:bg-slate-soft block"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-electric-soft">
                  {p.category}
                </span>
                <h3 className="mt-2 text-xl md:text-2xl font-bold tracking-tight leading-snug text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">
                  {p.subline}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                  <span className="text-white/60">
                    {counts[p.slug] ?? 0} {counts[p.slug] === 1 ? "guide" : "guides"}
                  </span>
                  <span className="text-electric-soft border-b border-transparent group-hover:border-electric-soft">
                    Read the guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topic-specific article shelves */}
      {TOPIC_SHELVES.map((shelf) => {
        const matched = allArticles.filter((a) => {
          const s = a.slug.toLowerCase();
          return shelf.match.some((k) => s.includes(k));
        });
        const cards = matched.slice(0, 4);
        if (cards.length === 0) return null;
        return (
          <section key={shelf.slug} className="bg-offwhite border-b border-rule">
            <div className="mx-auto max-w-content px-6 py-10 md:py-12">
              <div className="flex items-end justify-between gap-6 border-b border-rule pb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Latest on {shelf.name}
                </span>
                <Link
                  href={`/services/${shelf.slug}`}
                  className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline shrink-0"
                >
                  Topic page →
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`} className="group block no-underline">
                    {a.heroImage && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-cream border border-rule">
                        <Image
                          src={a.heroImage}
                          alt={a.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    )}
                    <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider text-electric">
                      {topicLabel(a.slug)}
                    </span>
                    <h3 className="mt-1 text-base md:text-lg font-semibold tracking-tight text-slate leading-snug group-hover:underline decoration-1 underline-offset-4">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>
                    )}
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {readTime(a.contentMd)} min read
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
