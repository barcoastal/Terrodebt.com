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
  heroImage: "/images/articles/what-is-reverse-consolidation.png",
  author: "Bar Elezra",
  publishedAt: new Date("2026-04-15"),
  createdAt: new Date("2026-04-15"),
  contentMd: "",
};

function topicFromSlug(slug: string): string {
  if (slug.includes("mca")) return "MCA";
  if (slug.includes("sba")) return "SBA";
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
    <section className="bg-offwhite border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10">
        {/* Featured */}
        <div className="md:col-span-7">
          <Link href={`/articles/${featured.slug}`} className="group block no-underline">
            <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
              Featured guide
            </span>
            {featured.heroImage && (
              <div className="mt-4 relative aspect-[16/10] overflow-hidden bg-cream border border-rule">
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </div>
            )}
            <h1 className="mt-5 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.05] group-hover:underline decoration-1 underline-offset-4">
              {featured.title}
            </h1>
            {featured.excerpt && (
              <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>By {featured.author || "Bar Elezra"}</span>
              <span className="text-rule">·</span>
              <span>Updated {formatDate(featured.publishedAt ?? featured.createdAt)}</span>
              <span className="text-rule">·</span>
              <span>{readTime(featured.contentMd)} min read</span>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate border-b border-slate pb-0.5 group-hover:border-electric group-hover:text-electric transition">
              Read the guide
              <span aria-hidden>→</span>
            </div>
          </Link>
        </div>

        {/* Stack */}
        <aside className="md:col-span-5">
          <div className="border-t border-rule pt-3 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              More from TerraDebt
            </span>
            <Link
              href="/articles"
              className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline"
            >
              All guides →
            </Link>
          </div>
          <ul className="mt-2 divide-y divide-rule">
            {(stack.length > 0 ? stack : []).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group flex items-start gap-4 py-4 no-underline"
                >
                  {a.heroImage && (
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-cream border border-rule">
                      <Image
                        src={a.heroImage}
                        alt={a.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm md:text-base font-semibold tracking-tight text-slate leading-snug group-hover:underline decoration-1 underline-offset-4">
                      {a.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
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
