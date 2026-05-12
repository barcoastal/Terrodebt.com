import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Research and essays | TerraDebt",
  description:
    "Essays, research notes, and guides on business debt restructure. MCA, SBA, equipment, vendor, bank, and tax debt, written by Bar Elezra.",
};

function readTime(md: string): number {
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function topicFromSlug(slug: string): string {
  if (slug.includes("mca")) return "MCA";
  if (slug.includes("sba")) return "SBA";
  if (slug.includes("equipment")) return "Equipment";
  if (slug.includes("vendor")) return "Vendor";
  if (slug.includes("bank")) return "Bank";
  if (slug.includes("tax")) return "Tax";
  if (slug.includes("coj")) return "Legal";
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
  const rest = articles.slice(1);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <article>
      <section className="bg-offwhite">
        <div className="mx-auto max-w-content px-6 pt-6">
          <div className="flex items-center justify-between border-y border-rule py-3 text-[11px] font-mono uppercase tracking-wider text-muted">
            <span>{today}</span>
            <span>TerraDebt Research</span>
          </div>
        </div>
        <div className="mx-auto max-w-content px-6 pt-12 pb-10">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Research</span>
          <h1 className="mt-3 font-serif-tight font-bold text-slate text-5xl md:text-6xl lg:text-7xl leading-[1.04]">
            Essays and research, on the work.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl leading-relaxed">
            Plain-spoken guides on MCA, SBA, equipment, vendor, bank, and tax debt. Written by operators who have done the workouts themselves.
          </p>
        </div>
      </section>

      {featured && (
        <section className="bg-offwhite">
          <div className="mx-auto max-w-content px-6 pb-14">
            <Link href={`/articles/${featured.slug}`} className="group grid md:grid-cols-12 gap-8 lg:gap-12 items-start no-underline border-t border-rule pt-8">
              <div className="md:col-span-7">
                {featured.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                    <Image
                      src={featured.heroImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-5 md:pt-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-electric">Featured · {topicFromSlug(featured.slug)}</span>
                <h2 className="mt-3 font-serif-tight font-bold text-slate text-3xl md:text-4xl lg:text-5xl leading-tight group-hover:underline decoration-1 underline-offset-4">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">{featured.excerpt}</p>
                )}
                <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {readTime(featured.contentMd)} min read · by {featured.author || "Bar Elezra"}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-offwhite">
          <div className="mx-auto max-w-content px-6 pb-24">
            <div className="border-t border-rule pt-6 pb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">More from the desk</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="group block no-underline">
                  {a.heroImage && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                      <Image
                        src={a.heroImage}
                        alt={a.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-wider text-electric">
                    {topicFromSlug(a.slug)}
                  </span>
                  <h3 className="mt-1.5 font-serif font-bold text-slate text-lg md:text-xl leading-snug group-hover:underline decoration-1 underline-offset-4">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{a.excerpt}</p>
                  )}
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {readTime(a.contentMd)} min read · by {a.author || "Bar Elezra"}
                  </div>
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
    </article>
  );
}
