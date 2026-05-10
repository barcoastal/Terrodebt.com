import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { after } from "next/server";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { LeadForm } from "@/components/lead/LeadForm";
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
        <div className="surface-card-elevated p-8 md:p-10">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted">
            <span>{date.toISOString().slice(0, 10)}</span>
            <span>·</span>
            <span>{minutes} min read</span>
            {a.viewCount > 0 && (
              <>
                <span>·</span>
                <span>{a.viewCount.toLocaleString()} views</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate leading-tight">
            {a.title}
          </h1>
          {a.excerpt && <p className="mt-4 text-lg text-muted leading-relaxed">{a.excerpt}</p>}
        </div>
      </header>

      <div className="mx-auto max-w-content px-6 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 prose max-w-none prose-slate prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-lg prose-a:text-electric">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.contentMd}</ReactMarkdown>
        </div>
        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <LeadForm source={`article-${slug}`} />
          <div className="surface-card p-5">
            <h4 className="text-sm font-mono uppercase tracking-wider text-muted">More to read</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/articles" className="text-slate hover:text-electric text-sm no-underline">
                  All articles →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
