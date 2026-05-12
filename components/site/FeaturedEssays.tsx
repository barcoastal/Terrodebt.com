import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  heroImage: string | null;
  publishedAt: Date | null;
  contentMd: string;
  author: string;
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

export async function FeaturedEssays() {
  let articles: Article[] = [];
  try {
    const rows = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 7, // skip the first 4 used in EditorialHero, fall back to all if smaller
      select: { id: true, slug: true, title: true, excerpt: true, heroImage: true, publishedAt: true, contentMd: true, author: true },
    });
    // After hero takes 4, start from index 4 if there are more; otherwise show all
    articles = rows.length >= 10 ? rows.slice(4, 10) : rows.slice(0, 6);
    articles = articles.map((a) => ({ ...a, author: a.author || "Bar Elezra" }));
  } catch {
    articles = [];
  }
  if (articles.length === 0) return null;

  const big = articles[0];
  const top = articles.slice(1, 3);
  const bottom = articles.slice(3, 6);

  return (
    <section className="bg-white border-y border-rule">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-rule pb-5">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Articles</span>
            <h2 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight">
              Recent articles
            </h2>
          </div>
          <Link href="/articles" className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline whitespace-nowrap">
            All articles →
          </Link>
        </div>

        {/* Top row: big + two medium */}
        <div className="mt-10 grid lg:grid-cols-5 gap-10">
          <BigCard a={big} />
          <div className="lg:col-span-2 flex flex-col divide-y divide-rule">
            {top.map((a) => (
              <MediumCard key={a.id} a={a} />
            ))}
          </div>
        </div>

        {/* Bottom row: 3 equal */}
        {bottom.length > 0 && (
          <div className="mt-12 pt-10 border-t border-rule grid md:grid-cols-3 gap-10">
            {bottom.map((a) => (
              <SmallCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BigCard({ a }: { a: Article }) {
  const mins = readTime(a.contentMd);
  return (
    <Link href={`/articles/${a.slug}`} className="lg:col-span-3 group block no-underline">
      {a.heroImage && (
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          <Image
            src={a.heroImage}
            alt={a.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      )}
      <span className="mt-5 inline-block font-mono text-[10px] uppercase tracking-wider text-electric">
        {topicFromSlug(a.slug)}
      </span>
      <h3 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl leading-tight group-hover:underline decoration-1 underline-offset-4">
        {a.title}
      </h3>
      {a.excerpt && <p className="mt-3 text-base text-muted leading-relaxed">{a.excerpt}</p>}
      <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted">
        {mins} min read
      </div>
    </Link>
  );
}

function MediumCard({ a }: { a: Article }) {
  const mins = readTime(a.contentMd);
  return (
    <Link href={`/articles/${a.slug}`} className="group block no-underline py-5 first:pt-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-wider text-electric">{topicFromSlug(a.slug)}</span>
      <h3 className="mt-1.5 font-semibold tracking-tight text-slate text-xl md:text-2xl leading-snug group-hover:underline decoration-1 underline-offset-4">
        {a.title}
      </h3>
      {a.excerpt && <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>}
      <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
        {mins} min read
      </div>
    </Link>
  );
}

function SmallCard({ a }: { a: Article }) {
  const mins = readTime(a.contentMd);
  return (
    <Link href={`/articles/${a.slug}`} className="group block no-underline">
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
      <h3 className="mt-1.5 font-semibold tracking-tight text-slate text-lg md:text-xl leading-snug group-hover:underline decoration-1 underline-offset-4">
        {a.title}
      </h3>
      {a.excerpt && <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>}
      <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted">
        {mins} min read
      </div>
    </Link>
  );
}
