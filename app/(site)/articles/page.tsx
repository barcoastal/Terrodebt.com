import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Articles | TerraDebt MCA Debt Education",
  description: "TerraDebt articles on stacked MCA debt: settlement, restructure, COJ defense, effective APR math, and contract reading. Plain-spoken merchant guidance.",
};

export default async function ArticlesIndex() {
  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  try {
    articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {}

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <article>
      <section className="bg-offwhite border-b border-border">
        <div className="mx-auto max-w-content px-6 py-16">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Articles</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tighter">Education on stacked MCA debt.</h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">
            In-depth pieces on settlement vs restructure, COJ defense, effective APR math, and the practical mechanics of getting out of stacked merchant cash advances.
          </p>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-content px-6 py-12">
          <Link
            href={`/articles/${featured.slug}`}
            className="group block surface-card overflow-hidden no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="grid md:grid-cols-2 gap-0 items-stretch">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] bg-offwhite overflow-hidden">
                {featured.heroImage ? (
                  <Image
                    src={featured.heroImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-mesh" />
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-wider text-electric">Featured</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate">{featured.title}</h2>
                {featured.excerpt && (
                  <p className="mt-3 text-muted leading-relaxed">{featured.excerpt}</p>
                )}
                <span className="mt-5 font-mono text-xs uppercase tracking-wider text-electric">
                  Read article →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-content px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="group surface-card overflow-hidden no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="relative aspect-[16/10] bg-offwhite overflow-hidden">
                  {a.heroImage ? (
                    <Image
                      src={a.heroImage}
                      alt={a.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-mesh" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-slate group-hover:text-electric transition">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-sm text-muted line-clamp-3 leading-relaxed">{a.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <section className="mx-auto max-w-content px-6 py-20 text-center text-muted">
          Articles are being prepared.
        </section>
      )}
    </article>
  );
}
