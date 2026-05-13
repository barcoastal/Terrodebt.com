import Link from "next/link";
import Image from "next/image";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

export function IndustriesCompact() {
  return (
    <section className="bg-paper-soft border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-14">
        <div className="flex items-end justify-between gap-6 border-b border-ink pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Coverage by industry
            </span>
            <h2 className="mt-1 font-bold tracking-tight text-ink text-2xl md:text-3xl leading-tight">
              How the cases shape up by vertical
            </h2>
          </div>
          <Link
            href="/industries"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric no-underline hover:underline shrink-0"
          >
            All industries →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink border border-ink">
          {VERTICAL_CONTENT.map((v, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={v.slug}
                href={`/industries/${v.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-ink block no-underline"
              >
                <Image
                  src={`/images/industry-${v.slug}.png`}
                  alt={v.name}
                  fill
                  className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden />
                <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1 bg-electric" />
                <span className="absolute top-3 right-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-electric">
                  {num}
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-soft">
                    Industry
                  </span>
                  <span className="mt-1 block text-lg md:text-2xl font-bold tracking-tight text-white leading-tight">
                    {v.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
