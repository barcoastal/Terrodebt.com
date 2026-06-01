import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { NewsletterStrip } from "@/components/site/NewsletterStrip";

export const metadata: Metadata = {
  title: "Business Debt Insights & Guides",
  description: "Plain-language guides on business debt relief, COJ defense, effective APR math, and creditor negotiation. Written for SME operators.",
};

export const dynamic = "force-dynamic";

function readTime(md: string): number {
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function topicFromSlug(slug: string): string {
  if (slug.includes("mca") || slug.includes("reverse") || slug.includes("coj") || slug.includes("ucc")) return "Debt Relief";
  if (slug.includes("equipment")) return "Equipment";
  if (slug.includes("vendor")) return "Vendor";
  if (slug.includes("bank") || slug.includes("covenant")) return "Bank";
  if (slug.includes("tax") || slug.includes("irs")) return "Tax";
  return "Guide";
}

export default async function ArticlesIndex() {
  let articles: Awaited<ReturnType<typeof db.article.findMany>> = [];
  try {
    articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {}

  const featured = articles[0];
  const second = articles.slice(1, 3);
  const rest = articles.slice(3);

  return (
    <article>
      {/* Breadcrumb + heading */}
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 py-4">
          <Breadcrumb items={[{ label: "Articles" }]} />
        </div>
      </section>
      <section className="bg-offwhite border-b border-rule">
        <div className="mx-auto max-w-content px-6 pt-10 pb-8">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
            Insights archive
          </span>
          <h1 className="mt-3 font-bold tracking-tighter text-slate text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            All guides on business debt restructure
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-3xl leading-relaxed">
            Plain-spoken guides on MCA, equipment, vendor, bank, and tax debt. Written by operators who have run the workouts.
          </p>
        </div>
      </section>

      {/* Featured + secondaries */}
      {featured && (
        <section className="bg-offwhite border-b border-rule">
          <div className="mx-auto max-w-content px-6 py-10 md:py-12 grid md:grid-cols-12 gap-8">
            <Link href={`/insights/${featured.slug}`} className="group md:col-span-8 block no-underline">
              {featured.heroImage && (
                <div className="relative aspect-[16/9] overflow-hidden bg-cream border border-rule">
                  <Image
                    src={featured.heroImage}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
              )}
              <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-wider text-electric">
                Featured · {topicFromSlug(featured.slug)}
              </span>
              <h2 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl lg:text-5xl leading-tight group-hover:underline decoration-1 underline-offset-4">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-3 text-base md:text-lg text-muted leading-relaxed">{featured.excerpt}</p>
              )}
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                By {featured.author || "Business Debt Insider"} · {readTime(featured.contentMd)} min read
              </p>
            </Link>

            <div className="md:col-span-4 flex flex-col gap-6">
              {second.map((a) => (
                <Link key={a.id} href={`/insights/${a.slug}`} className="group block no-underline">
                  {a.heroImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-cream border border-rule">
                      <Image
                        src={a.heroImage}
                        alt={a.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider text-electric">
                    {topicFromSlug(a.slug)}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate leading-snug group-hover:underline decoration-1 underline-offset-4">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {readTime(a.contentMd)} min read
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-offwhite">
          <div className="mx-auto max-w-content px-6 pb-16 pt-2">
            <div className="border-t border-rule pt-5 pb-6">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">More guides</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {rest.map((a) => (
                <Link key={a.id} href={`/insights/${a.slug}`} className="group block no-underline">
                  {a.heroImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-cream border border-rule">
                      <Image
                        src={a.heroImage}
                        alt={a.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider text-electric">
                    {topicFromSlug(a.slug)}
                  </span>
                  <h3 className="mt-1 text-base md:text-lg font-semibold tracking-tight text-slate leading-snug group-hover:underline decoration-1 underline-offset-4">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>
                  )}
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {readTime(a.contentMd)} min read
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <section className="mx-auto max-w-content px-6 py-20 text-center text-muted">
          Articles are being prepared.
        </section>
      )}

      <NewsletterStrip source="articles-index" />
    </article>
  );
}
