import Link from "next/link";
import Image from "next/image";

export type RelatedItem = {
  slug: string;
  title: string;
  excerpt?: string | null;
  heroImage?: string | null;
  href?: string;
  topic?: string;
};

function readTimeApprox(): number {
  return 6;
}

export function RelatedShelf({
  items,
  heading,
  eyebrow = "Read next",
  allHref,
  allLabel = "All guides →",
}: {
  items: RelatedItem[];
  heading: string;
  eyebrow?: string;
  allHref?: string;
  allLabel?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="bg-white border-y border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-14">
        <div className="flex items-end justify-between gap-6 border-b border-rule pb-3">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{eyebrow}</span>
            <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
              {heading}
            </h2>
          </div>
          {allHref && (
            <Link
              href={allHref}
              className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline shrink-0"
            >
              {allLabel}
            </Link>
          )}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((it) => {
            const href = it.href ?? `/articles/${it.slug}`;
            return (
              <Link key={`${href}-${it.slug}`} href={href} className="group block no-underline">
                {it.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream border border-rule">
                    <Image
                      src={it.heroImage}
                      alt={it.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                )}
                {it.topic && (
                  <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider text-electric">
                    {it.topic}
                  </span>
                )}
                <h3 className="mt-1 text-base md:text-lg font-semibold tracking-tight text-slate leading-snug group-hover:underline decoration-1 underline-offset-4">
                  {it.title}
                </h3>
                {it.excerpt && (
                  <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">{it.excerpt}</p>
                )}
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {readTimeApprox()} min read
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
