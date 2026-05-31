import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";

function readTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function topicFromSlug(slug: string): { label: string; href?: string } {
  if (slug.includes("mca") || slug.includes("reverse") || slug.includes("coj") || slug.includes("ucc"))
    return { label: "MCA Debt Relief", href: "/services/creditor-liaison" };
  if (slug.includes("equipment")) return { label: "Equipment Finance", href: "/services/creditor-liaison" };
  if (slug.includes("vendor")) return { label: "Vendor & Supplier Debt", href: "/services/creditor-liaison" };
  if (slug.includes("bank") || slug.includes("covenant")) return { label: "Bank Loan Workouts", href: "/services/creditor-liaison" };
  if (slug.includes("tax") || slug.includes("irs")) return { label: "Business Tax Debt", href: "/services/creditor-liaison" };
  return { label: "Insight" };
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
    openGraph: a.heroImage ? { images: [{ url: a.heroImage, alt: a.title }] } : undefined,
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
  const topic = topicFromSlug(a.slug);

  return (
    <article className="bg-paper">
      <ArticleJsonLd
        article={{
          title: a.title,
          excerpt: a.excerpt,
          slug: a.slug,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
          author: a.author,
          heroImage: a.heroImage,
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Insights", href: "/insights" },
              ...(topic.href ? [{ label: topic.label, href: topic.href }] : []),
              { label: a.title },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
              {topic.label}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.04]">
              {a.title}
            </h1>
            {a.excerpt && (
              <p className="mt-5 text-lg md:text-xl text-ink leading-relaxed">{a.excerpt}</p>
            )}
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              By {a.author || "Business Debt Insider"}
              <span className="text-hairline"> · </span>
              Updated {date.toISOString().slice(0, 10)}
              <span className="text-hairline"> · </span>
              {minutes} min read
            </p>
          </div>
          {a.heroImage && (
            <div className="mt-10 relative aspect-[16/9] overflow-hidden bg-paper-mute border border-hairline max-w-5xl">
              <Image
                src={a.heroImage}
                alt={a.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section>
        <div className="mx-auto max-w-content px-6 py-12 md:py-16">
          <div
            className="
              max-w-3xl text-ink
              prose-article
              [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink
              [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-ink
              [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-base md:[&_p]:text-lg [&_p]:text-ink
              [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2
              [&_ol]:my-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2
              [&_li]:leading-relaxed [&_li]:text-base md:[&_li]:text-lg [&_li]:text-ink
              [&_a]:text-pine [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-ink
              [&_strong]:font-semibold [&_strong]:text-ink
              [&_hr]:my-10 [&_hr]:border-hairline
              [&_blockquote]:border-l-2 [&_blockquote]:border-pine [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-muted
              [&_code]:bg-paper-mute [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-sm [&_code]:font-mono
              [&_pre]:bg-paper-mute [&_pre]:border [&_pre]:border-hairline [&_pre]:p-4 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:text-sm
              [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
              [&_th]:border [&_th]:border-hairline [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-paper-mute
              [&_td]:border [&_td]:border-hairline [&_td]:px-3 [&_td]:py-2
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.contentMd}</ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-paper-mute border-t border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 md:py-16 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-pine">
              Initial review
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-ink leading-tight">
              Walk through your situation in thirty minutes.
            </h2>
            <p className="mt-3 max-w-2xl text-base md:text-lg text-ink leading-relaxed">
              The initial review is a working call. Free, confidential, scoped to your specific debt position.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center bg-pine text-paper px-6 py-4 text-sm font-mono uppercase tracking-[0.18em] no-underline hover:bg-ink transition"
            >
              Schedule review →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
