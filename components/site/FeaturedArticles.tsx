import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Reveal } from "./Reveal";

type ArticleCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  heroImage: string | null;
};

export async function FeaturedArticles() {
  let articles: ArticleCard[] = [];
  try {
    articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true },
    });
  } catch {
    articles = [];
  }
  if (articles.length === 0) return null;

  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Knowledge base</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Read the math before you commit.</h2>
              <p className="mt-3 text-muted leading-relaxed">Plain-language explainers on MCA debt, settlements, defense, and lender behavior.</p>
            </div>
            <Link href="/articles" className="font-mono text-xs uppercase tracking-wider text-electric no-underline hover:underline">
              All articles →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <Link
                href={`/articles/${a.slug}`}
                className="group block surface-card overflow-hidden no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] h-full"
              >
                <div className="relative aspect-[16/10] bg-offwhite overflow-hidden">
                  {a.heroImage && (
                    <Image
                      src={a.heroImage}
                      alt={a.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-slate group-hover:text-electric transition leading-snug">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">{a.excerpt}</p>
                  )}
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-electric">
                    Read article →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
