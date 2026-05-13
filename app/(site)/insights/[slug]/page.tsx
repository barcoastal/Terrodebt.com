import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { after } from "next/server";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { Toc, extractToc } from "@/components/site/Toc";
import { RelatedShelf } from "@/components/site/RelatedShelf";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractText(node: React.ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node && "props" in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props;
    return extractText(props?.children);
  }
  return "";
}

function readTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function topicFromSlug(slug: string): { label: string; href?: string } {
  if (slug.includes("mca") || slug.includes("reverse") || slug.includes("coj") || slug.includes("ucc"))
    return { label: "MCA Debt Relief", href: "/services/mca-debt-relief" };
  if (slug.includes("sba")) return { label: "SBA Loan Modification", href: "/services/sba-loan-modification" };
  if (slug.includes("equipment")) return { label: "Equipment Finance", href: "/services/equipment-finance-restructure" };
  if (slug.includes("vendor")) return { label: "Vendor & Supplier Debt", href: "/services/vendor-supplier-debt" };
  if (slug.includes("bank") || slug.includes("covenant")) return { label: "Bank Loan Workouts", href: "/services/bank-loan-workout" };
  if (slug.includes("tax") || slug.includes("irs")) return { label: "Business Tax Debt", href: "/services/business-tax-debt" };
  return { label: "Guide" };
}

function calculatorForTopic(label: string): { title: string; href: string; desc: string } {
  if (label.startsWith("MCA")) return { title: "Effective APR Calculator", href: "/tools/apr-calculator", desc: "Compute the real annualized cost of your advance." };
  if (label.startsWith("SBA")) return { title: "Debt Health Check", href: "/tools/health-check", desc: "10-question diagnostic across your debt mix." };
  if (label.startsWith("Equipment")) return { title: "MCA Stack Calculator", href: "/tools/stack-calculator", desc: "Map your debits across active advances." };
  return { title: "Debt Health Check", href: "/tools/health-check", desc: "10-question diagnostic across your debt mix." };
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
  const toc = extractToc(a.contentMd);
  const topic = topicFromSlug(a.slug);
  const calc = calculatorForTopic(topic.label);

  let related: { id: string; slug: string; title: string; excerpt: string | null; heroImage: string | null }[] = [];
  let readNext: { id: string; slug: string; title: string; excerpt: string | null; heroImage: string | null }[] = [];
  try {
    related = await db.article.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true },
    });
    readNext = await db.article.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { publishedAt: "desc" },
      take: 8,
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true },
    });
    // Bias readNext toward the same topic
    if (topic.label !== "Guide") {
      const sameTopic = readNext.filter((r) => {
        const t = topicFromSlug(r.slug);
        return t.label === topic.label;
      });
      const others = readNext.filter((r) => {
        const t = topicFromSlug(r.slug);
        return t.label !== topic.label;
      });
      readNext = [...sameTopic, ...others].slice(0, 4);
    } else {
      readNext = readNext.slice(0, 4);
    }
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

      {/* Breadcrumb */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb
            items={[
              { label: "Articles", href: "/insights" },
              ...(topic.href ? [{ label: topic.label, href: topic.href }] : []),
              { label: a.title },
            ]}
          />
        </div>
      </section>

      {/* Hero with contained image */}
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 py-10 md:py-12">
          <div className="max-w-4xl">
            <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
              {topic.label}
            </span>
            <h1 className="mt-3 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.04]">
              {a.title}
            </h1>
            {a.excerpt && (
              <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-3xl">
                {a.excerpt}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>By {a.author || "Bar Elezra"}</span>
              <span className="text-rule">·</span>
              <span>Updated {date.toISOString().slice(0, 10)}</span>
              <span className="text-rule">·</span>
              <span>{minutes} min read</span>
              {a.viewCount > 0 && (
                <>
                  <span className="text-rule">·</span>
                  <span>{a.viewCount.toLocaleString()} views</span>
                </>
              )}
            </div>
          </div>
          {a.heroImage && (
            <div className="mt-8 relative aspect-[16/9] overflow-hidden bg-cream border border-rule max-w-5xl">
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

      {/* 3-col body */}
      <section className="bg-offwhite border-t border-rule">
        <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10">
          {/* Left TOC */}
          <aside className="hidden md:block md:col-span-2">
            <div className="sticky top-32">
              <Toc items={toc} />
            </div>
          </aside>

          {/* Main */}
          <div className="md:col-span-7">
            <div className="prose max-w-none prose-slate prose-headings:tracking-tight prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:font-bold prose-h2:scroll-mt-32 prose-h3:text-lg prose-h3:font-semibold prose-a:text-electric prose-p:leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    const id = slugify(extractText(children));
                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    );
                  },
                }}
              >
                {a.contentMd}
              </ReactMarkdown>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32 space-y-6">
              {related.length > 0 && (
                <div className="border border-rule bg-white p-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Related guides
                  </span>
                  <ul className="mt-3 space-y-3">
                    {related.slice(0, 3).map((r) => (
                      <li key={r.id} className="border-t border-rule pt-3 first:border-t-0 first:pt-0">
                        <Link
                          href={`/insights/${r.slug}`}
                          className="text-sm font-medium text-slate leading-snug hover:text-electric no-underline transition"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border border-rule bg-offwhite p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
                  Use the calculator
                </span>
                <p className="mt-2 text-sm font-semibold text-slate leading-snug">{calc.title}</p>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">{calc.desc}</p>
                <Link
                  href={calc.href}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
                >
                  Open tool
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="border border-rule bg-slate text-white p-5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-electric-soft">
                  Talk to the team
                </span>
                <p className="mt-2 text-sm font-semibold leading-snug">
                  Free assessment scoped to your situation
                </p>
                <p className="mt-1.5 text-xs text-white/70 leading-relaxed">
                  Most calls run 20 to 30 minutes. No pressure, no template pitch.
                </p>
                <Link
                  href="/get-started"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white border-b border-white pb-0.5 hover:border-electric-soft hover:text-electric-soft transition"
                >
                  Request an assessment
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <RelatedShelf
        items={readNext.map((r) => ({
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          heroImage: r.heroImage,
          topic: topicFromSlug(r.slug).label,
        }))}
        heading={topic.label !== "Guide" ? `More guides on ${topic.label}` : "More from TerraDebt"}
        eyebrow="Read next"
        allHref="/insights"
      />

      <NewsletterStrip source={`article-${a.slug}`} />
    </article>
  );
}
