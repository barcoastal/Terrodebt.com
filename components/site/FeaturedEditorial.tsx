import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

type Article = {
  slug: string;
  title: string;
  excerpt: string | null;
  heroImage: string | null;
  author: string;
  publishedAt: Date | null;
  createdAt: Date;
  contentMd: string;
};

const FALLBACK: Article = {
  slug: "what-is-reverse-consolidation",
  title: "What is reverse consolidation, and why it usually backfires",
  excerpt:
    "Reverse consolidations look like a fix and usually make stacked MCAs worse. Here is the math, the typical contract pattern, and what to do instead.",
  heroImage: "/images/insights/what-is-reverse-consolidation.png",
  author: "Business Debt Insider",
  publishedAt: new Date("2026-04-15"),
  createdAt: new Date("2026-04-15"),
  contentMd: "",
};

function topicFromSlug(slug: string): string {
  if (slug.includes("mca")) return "MCA";
  if (slug.includes("equipment")) return "Equipment";
  if (slug.includes("vendor")) return "Vendor";
  if (slug.includes("bank")) return "Bank";
  if (slug.includes("tax")) return "Tax";
  if (slug.includes("coj") || slug.includes("ucc")) return "Legal";
  return "Guide";
}

function readTime(md: string): number {
  if (!md) return 6;
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export async function FeaturedEditorial() {
  let articles: Article[] = [];
  try {
    const rows = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 5,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        heroImage: true,
        author: true,
        publishedAt: true,
        createdAt: true,
        contentMd: true,
      },
    });
    articles = rows as Article[];
  } catch {}

  const featured = articles[0] ?? FALLBACK;
  const stack = articles.slice(1, 5);

  return (
    <section className="bg-paper border-b border-ink">
      <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10">
        {/* Featured */}
        <div className="md:col-span-7">
          <Link href={`/insights/${featured.slug}`} className="group relative block no-underline overflow-hidden bg-ink aspect-[16/11]">
            {featured.heroImage && (
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" aria-hidden />
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <span className="bg-electric text-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                Featured Guide
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                {readTime(featured.contentMd)} min read
              </span>
            </div>
            <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
              <h1 className="font-bold tracking-tight text-white text-2xl md:text-4xl lg:text-5xl leading-[1.05]">
                {featured.title}
              </h1>
              {featured.excerpt && (
                <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl line-clamp-2">
                  {featured.excerpt}
                </p>
              )}
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                <span>By {featured.author || "Business Debt Insider"}</span>
                <span className="text-white/30">·</span>
                <span>Updated {formatDate(featured.publishedAt ?? featured.createdAt)}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Stack */}
        <aside className="md:col-span-5">
          <div className="border-t-2 border-ink pt-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink font-semibold">
              More from Business Debt Insider
            </span>
            <Link
              href="/insights"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric no-underline hover:underline"
            >
              All guides →
            </Link>
          </div>
          <ul className="mt-2 divide-y divide-rule">
            {(stack.length > 0 ? stack : []).map((a, i) => (
              <li key={a.slug}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex items-start gap-4 py-4 no-underline"
                >
                  <span className="font-mono text-[11px] font-bold text-electric shrink-0 mt-1.5 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {a.heroImage && (
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-paper-soft">
                      <Image
                        src={a.heroImage}
                        alt={a.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm md:text-base font-bold tracking-tight text-ink leading-snug group-hover:text-electric transition">
                      {a.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {topicFromSlug(a.slug)} · {readTime(a.contentMd)} min
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            {stack.length === 0 && (
              <li className="py-4 text-xs text-muted">More guides loading.</li>
            )}
          </ul>
        </aside>
      </div>
    </section>
  );
}
