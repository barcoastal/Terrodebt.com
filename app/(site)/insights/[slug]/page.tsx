import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";

function readTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

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
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let a: Awaited<ReturnType<typeof db.article.findUnique>> = null;
  try {
    a = await db.article.findUnique({ where: { slug } });
  } catch (e) {
    console.error("article fetch failed", e);
  }
  if (!a || !a.published) notFound();

  const date = a.publishedAt ?? a.createdAt;
  const minutes = readTime(a.contentMd);

  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-content px-6 py-4 border-b border-hairline">
        <Link href="/insights" className="font-mono text-[11px] uppercase tracking-[0.18em] text-pine no-underline hover:text-ink transition">
          ← All insights
        </Link>
      </div>

      <section className="mx-auto max-w-content px-6 py-12 md:py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
            {a.title}
          </h1>
          {a.excerpt && (
            <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">{a.excerpt}</p>
          )}
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            By {a.author || "Business Debt Insider"} · Updated {date.toISOString().slice(0, 10)} · {minutes} min read
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 pb-16">
        <div className="max-w-3xl prose prose-slate prose-headings:tracking-tight prose-h2:mt-10 prose-h2:font-bold prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-lg prose-h3:font-semibold prose-p:leading-relaxed prose-a:text-pine">
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "1rem", lineHeight: 1.7 }}>{a.contentMd}</pre>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 pb-20 border-t border-hairline pt-10">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-pine text-paper px-6 py-4 text-sm font-mono uppercase tracking-[0.18em] no-underline hover:bg-ink transition"
        >
          Schedule an initial review →
        </Link>
      </section>
    </article>
  );
}
