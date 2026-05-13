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

// Pair each product slug with a photographic backdrop pulled from /public/images
const PRODUCT_BACKDROP: Record<string, string> = {
  "mca-debt-relief": "/images/industry-trucking.png",
  "sba-loan-modification": "/images/industry-construction.png",
  "equipment-finance-restructure": "/images/industry-auto.png",
  "vendor-supplier-debt": "/images/industry-retail.png",
  "bank-loan-workout": "/images/industry-restaurants.png",
  "business-tax-debt": "/images/industry-salons.png",
};

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
      {/* Topic photo cards shelf */}
      <section className="bg-paper border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-14">
          <div className="flex items-end justify-between gap-6 border-b border-ink pb-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Browse by topic
              </span>
              <h2 className="mt-1 font-bold tracking-tight text-ink text-2xl md:text-3xl leading-tight">
                The six coverage areas
              </h2>
            </div>
            <Link
              href="/services"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric no-underline hover:underline shrink-0"
            >
              All topics →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink border border-ink">
            {PRODUCTS.map((p, i) => {
              const num = String(i + 1).padStart(2, "0");
              const bg = PRODUCT_BACKDROP[p.slug] ?? "/images/hero.png";
              return (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="group relative overflow-hidden bg-ink block no-underline aspect-[4/3]"
                >
                  <Image
                    src={bg}
                    alt=""
                    fill
                    className="object-cover opacity-60 transition duration-700 group-hover:opacity-50 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/55" aria-hidden />
                  <span
                    aria-hidden
                    className="absolute top-4 left-5 font-mono font-bold text-electric leading-none text-7xl md:text-8xl"
                  >
                    {num}
                  </span>
                  <div className="absolute inset-x-5 bottom-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-soft">
                      {p.category}
                    </span>
                    <h3 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                      {p.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em]">
                      <span className="text-white/60">
                        {counts[p.slug] ?? 0} {counts[p.slug] === 1 ? "guide" : "guides"}
                      </span>
                      <span className="text-electric-soft border-b border-transparent group-hover:border-electric-soft">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
          <section key={shelf.slug} className="bg-paper-soft border-b border-rule">
            <div className="mx-auto max-w-content px-6 py-10 md:py-12">
              <div className="flex items-end justify-between gap-6 border-b border-ink pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Latest on {shelf.name}
                </span>
                <Link
                  href={`/services/${shelf.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric no-underline hover:underline shrink-0"
                >
                  Topic page →
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((a) => (
                  <Link key={a.slug} href={`/insights/${a.slug}`} className="group block no-underline bg-paper border border-ink">
                    <div className="h-1 bg-electric w-full" aria-hidden />
                    {a.heroImage && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-paper-soft">
                        <Image
                          src={a.heroImage}
                          alt={a.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <span className="absolute top-3 left-3 bg-ink text-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                          {topicLabel(a.slug)}
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-base md:text-lg font-bold tracking-tight text-ink leading-snug group-hover:text-electric transition">
                        {a.title}
                      </h3>
                      {a.excerpt && (
                        <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>
                      )}
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {readTime(a.contentMd)} min read
                      </p>
                    </div>
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
