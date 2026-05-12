import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  heroImage: string | null;
  publishedAt: Date | null;
  author: string;
};

const FALLBACK: Article[] = [
  {
    id: "fallback-1",
    slug: "mca-settlement-vs-restructure",
    title: "MCA settlement vs restructure: how to choose the right workout.",
    excerpt:
      "Two paths, two different sets of trade-offs. A plain look at when settlement is the right move and when restructure preserves more.",
    heroImage: null,
    publishedAt: new Date(),
    author: "Bar Elezra",
  },
  {
    id: "fallback-2",
    slug: "stacked-mca-math",
    title: "The math of a stacked MCA position.",
    excerpt:
      "Effective APR, weighted factor rates, and the cash-flow break point every operator should map before signing the next advance.",
    heroImage: null,
    publishedAt: new Date(),
    author: "Bar Elezra",
  },
  {
    id: "fallback-3",
    slug: "sba-workout-package",
    title: "Inside an SBA hardship workout package.",
    excerpt:
      "What special assets actually reads, what gets cut, and how the math has to land for a modification to clear.",
    heroImage: null,
    publishedAt: new Date(),
    author: "Bar Elezra",
  },
  {
    id: "fallback-4",
    slug: "coj-defense-72-hours",
    title: "The first 72 hours after a confession of judgment.",
    excerpt: "What to do, who to call, and what not to sign.",
    heroImage: null,
    publishedAt: new Date(),
    author: "Bar Elezra",
  },
];

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export async function EditorialHero() {
  let articles: Article[] = [];
  try {
    const rows = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true, publishedAt: true, author: true },
    });
    articles = rows.map((r) => ({ ...r, author: r.author || "Bar Elezra" }));
  } catch {
    articles = [];
  }
  if (articles.length === 0) articles = FALLBACK;

  const featured = articles[0];
  const secondary = articles[1] ?? articles[0];
  const list = articles.slice(2, 5);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 pt-6">
        <div className="flex items-center justify-between border-y border-rule py-3 text-[11px] font-mono uppercase tracking-wider text-muted">
          <span>{today}</span>
          <span className="hidden sm:inline">TerraDebt Research · Vol. 1</span>
          <Link href="/about" className="text-slate no-underline hover:text-electric">About the firm →</Link>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 pt-10 md:pt-14 pb-16 md:pb-20 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left column: featured */}
        <div className="lg:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">Featured guide</span>
          <h1 className="mt-4 font-serif-tight font-bold text-slate text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
            <Link href={`/articles/${featured.slug}`} className="text-slate no-underline hover:text-slate">
              {featured.title}
            </Link>
          </h1>
          {featured.excerpt && (
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              {featured.excerpt}
            </p>
          )}
          <div className="mt-8 flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-muted">
            <span>By {featured.author}</span>
            <span className="text-rule">·</span>
            <span>Founder</span>
            {featured.publishedAt && (
              <>
                <span className="text-rule">·</span>
                <span>Updated {formatDate(featured.publishedAt)}</span>
              </>
            )}
          </div>
          <div className="mt-7">
            <Link
              href={`/articles/${featured.slug}`}
              className="inline-flex items-center gap-2 text-slate text-sm font-medium no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
            >
              Read the guide
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Right column: secondary + list */}
        <div className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-12 space-y-10">
          <article>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Also on the desk</span>
            {secondary.heroImage && (
              <div className="relative aspect-[16/10] mt-3 overflow-hidden bg-cream">
                <Image
                  src={secondary.heroImage}
                  alt={secondary.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            )}
            <h2 className="mt-4 font-serif font-bold text-slate text-2xl md:text-3xl leading-snug">
              <Link href={`/articles/${secondary.slug}`} className="text-slate no-underline hover:text-electric">
                {secondary.title}
              </Link>
            </h2>
            {secondary.excerpt && (
              <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">{secondary.excerpt}</p>
            )}
            <div className="mt-3 text-[11px] font-mono uppercase tracking-wider text-muted">
              By {secondary.author} {secondary.publishedAt && <>· {formatDate(secondary.publishedAt)}</>}
            </div>
          </article>

          {list.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-t border-rule pt-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Latest in research</span>
                <Link href="/articles" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline">
                  All →
                </Link>
              </div>
              <ul className="mt-4 divide-y divide-rule">
                {list.map((item) => (
                  <li key={item.id} className="py-3">
                    <Link href={`/articles/${item.slug}`} className="block no-underline group">
                      <h3 className="font-serif text-base md:text-lg text-slate leading-snug group-hover:text-electric transition">
                        {item.title}
                      </h3>
                      <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted">
                        {item.publishedAt ? formatDate(item.publishedAt) : ""}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
