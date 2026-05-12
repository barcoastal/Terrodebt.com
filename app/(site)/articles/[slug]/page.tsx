import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { after } from "next/server";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { SubscribeForm } from "@/components/site/SubscribeForm";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let a: Awaited<ReturnType<typeof db.article.findUnique>> = null;
  try {
    a = await db.article.findUnique({ where: { slug } });
  } catch {}
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt ?? undefined,
    openGraph: a.heroImage ? { images: [{ url: a.heroImage, alt: a.title }] } : undefined,
  };
}

function readTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let a: Awaited<ReturnType<typeof db.article.findUnique>> = null;
  try {
    a = await db.article.findUnique({ where: { slug } });
  } catch {}
  if (!a || !a.published) notFound();

  const articleId = a.id;
  after(async () => {
    try {
      await db.article.update({ where: { id: articleId }, data: { viewCount: { increment: 1 } } });
    } catch {}
  });

  const minutes = readTime(a.contentMd);
  const date = a.publishedAt ?? a.createdAt;

  let recent: { id: string; slug: string; title: string; excerpt: string | null }[] = [];
  try {
    recent = await db.article.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true },
    });
  } catch {}

  return (
    <article>
      <ArticleJsonLd
        article={{
          title: a.title,
          excerpt: a.excerpt,
          slug: a.slug,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
          author: a.author,
        }}
      />

      {a.heroImage && (
        <section className="relative">
          <div className="relative aspect-[21/9] md:aspect-[21/8] w-full overflow-hidden bg-slate">
            <Image
              src={a.heroImage}
              alt={a.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/30 to-transparent" />
          </div>
        </section>
      )}

      <header className="mx-auto max-w-3xl px-6 -mt-20 md:-mt-32 relative z-10">
        <div className="bg-offwhite border border-rule p-8 md:p-10">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted">
            <span>{date.toISOString().slice(0, 10)}</span>
            <span className="text-rule">·</span>
            <span>{minutes} min read</span>
            <span className="text-rule">·</span>
            <span>By {a.author || "Bar Elezra"}</span>
            {a.viewCount > 0 && (
              <>
                <span className="text-rule">·</span>
                <span>{a.viewCount.toLocaleString()} views</span>
              </>
            )}
          </div>
          <h1 className="mt-4 font-bold tracking-tighter text-slate text-3xl md:text-5xl leading-tight">
            {a.title}
          </h1>
          {a.excerpt && <p className="mt-4 text-lg text-muted leading-relaxed">{a.excerpt}</p>}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 prose max-w-none prose-slate prose-headings:tracking-tight prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:font-bold prose-h3:text-lg prose-h3:font-semibold prose-a:text-electric prose-p:leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.contentMd}</ReactMarkdown>
      </div>

      {/* If this was useful */}
      <section className="bg-offwhite border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <div className="bg-cream border border-rule p-8 md:p-10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">If this was useful</span>
            <h2 className="mt-2 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
              Get the next one in your inbox.
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              The TerraDebt newsletter is one short email per week. New articles, working numbers, and case anatomies on business debt restructure.
            </p>
            <div className="mt-5">
              <SubscribeForm source={`article-${slug}`} />
            </div>
            <div className="mt-6 pt-5 border-t border-rule">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 text-slate text-sm font-medium no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
              >
                Talk to the team
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent essays */}
      {recent.length > 0 && (
        <section className="bg-offwhite">
          <div className="mx-auto max-w-content px-6 pb-20">
            <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Recent articles</span>
              <Link href="/articles" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline">
                All articles →
              </Link>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {recent.map((r) => (
                <Link key={r.id} href={`/articles/${r.slug}`} className="group block no-underline">
                  <h3 className="font-semibold tracking-tight text-slate text-lg md:text-xl leading-snug group-hover:underline decoration-1 underline-offset-4">
                    {r.title}
                  </h3>
                  {r.excerpt && (
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{r.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
