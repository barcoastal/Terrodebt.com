import Link from "next/link";
import Image from "next/image";

// Map slug -> image filename in /public/images
const INDUSTRY_IMAGE: Record<string, string> = {
  trucking: "/images/industry-trucking.png",
  restaurants: "/images/industry-restaurants.png",
  construction: "/images/industry-construction.png",
  healthcare: "/images/industry-healthcare.png",
  retail: "/images/industry-retail.png",
  ecommerce: "/images/industry-ecommerce.png",
  salons: "/images/industry-salons.png",
  auto: "/images/industry-auto.png",
};

// Asymmetric grid layout — top row 7/5, middle row 4/4/4, bottom row 4/4/4
const TILES: { slug: string; name: string; span: string; aspect: string }[] = [
  { slug: "trucking", name: "Trucking", span: "md:col-span-7", aspect: "aspect-[16/10]" },
  { slug: "restaurants", name: "Restaurants", span: "md:col-span-5", aspect: "aspect-[16/10]" },
  { slug: "construction", name: "Construction", span: "md:col-span-4", aspect: "aspect-[5/4]" },
  { slug: "healthcare", name: "Healthcare", span: "md:col-span-4", aspect: "aspect-[5/4]" },
  { slug: "retail", name: "Retail", span: "md:col-span-4", aspect: "aspect-[5/4]" },
  { slug: "ecommerce", name: "E-commerce", span: "md:col-span-4", aspect: "aspect-[5/4]" },
  { slug: "salons", name: "Salons & Spas", span: "md:col-span-4", aspect: "aspect-[5/4]" },
  { slug: "auto", name: "Auto Repair", span: "md:col-span-4", aspect: "aspect-[5/4]" },
];

export function IndustryGrid() {
  return (
    <section className="bg-offwhite border-t border-rule">
      <div className="mx-auto max-w-content px-6 py-24 md:py-32">
        <div className="flex items-baseline justify-between border-b border-rule pb-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Who we work with
          </div>
          <Link
            href="/industries"
            className="font-mono text-[11px] uppercase tracking-wider text-slate no-underline hover:text-electric transition"
          >
            All industries →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {TILES.map((tile) => (
            <Link
              key={tile.slug}
              href={`/industries/${tile.slug}`}
              className={`group relative ${tile.span} ${tile.aspect} overflow-hidden border border-rule no-underline`}
            >
              <Image
                src={INDUSTRY_IMAGE[tile.slug]}
                alt={`${tile.name} business owner`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Bottom gradient for readability */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate/85 via-slate/40 to-transparent"
              />
              {/* Left green edge marker */}
              <div aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-electric" />
              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                  {tile.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 pb-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
