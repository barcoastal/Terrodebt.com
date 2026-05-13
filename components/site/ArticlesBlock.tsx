import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

type ArticleRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  heroImage: string | null;
  author: string;
  publishedAt: Date | null;
};

async function fetchArticles(): Promise<ArticleRow[]> {
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
      },
    });
    return rows;
  } catch {
    return [];
  }
}

function formatDate(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function readMinutes(excerpt: string | null): string {
  const wordCount = (excerpt ?? "").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(4, Math.round(wordCount / 50));
  return `${mins} min read`;
}

export async function ArticlesBlock() {
  const articles = await fetchArticles();

  if (articles.length === 0) {
    return (
      <section className="bg-offwhite border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-24 md:py-32">
          <div className="flex items-baseline justify-between border-b border-rule pb-5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Reading room
            </div>
          </div>
          <div className="mt-10 border border-rule p-12 text-center">
            <p className="text-muted text-sm">Articles coming soon.</p>
          </div>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = articles;
  const sidebar = rest.slice(0, 4);

  return (
    <section className="bg-offwhite border-t border-rule">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="flex items-baseline justify-between border-b border-rule pb-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Reading room
          </div>
          <Link
            href="/articles"
            className="font-mono text-[11px] uppercase tracking-wider text-slate no-underline hover:text-electric transition"
          >
            All articles →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Featured */}
          <Link
            href={`/articles/${featured.slug}`}
            className="md:col-span-7 group no-underline"
          >
            <div className="relative aspect-[16/10] border border-rule overflow-hidden">
              {featured.heroImage ? (
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="absolute inset-0 bg-cream" />
              )}
            </div>
            <div className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>Featured</span>
              {featured.publishedAt && (
                <>
                  <span className="text-rule">·</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                </>
              )}
              <span className="text-rule">·</span>
              <span>{readMinutes(featured.excerpt)}</span>
            </div>
            <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate leading-tight group-hover:text-electric transition-colors">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="mt-3 text-base text-muted leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>
            )}
            <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate">
              By {featured.author}
            </div>
          </Link>

          {/* Sidebar list */}
          <div className="md:col-span-5 divide-y divide-rule border-t border-rule">
            {sidebar.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group flex gap-4 py-5 no-underline"
              >
                <div className="relative w-24 h-24 flex-shrink-0 border border-rule overflow-hidden">
                  {a.heroImage ? (
                    <Image
                      src={a.heroImage}
                      alt={a.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-cream" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold tracking-tight text-slate leading-snug group-hover:text-electric transition-colors">
                    {a.title}
                  </h4>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {readMinutes(a.excerpt)}
                    {a.publishedAt && (
                      <>
                        <span className="mx-2 text-rule">·</span>
                        {formatDate(a.publishedAt)}
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
