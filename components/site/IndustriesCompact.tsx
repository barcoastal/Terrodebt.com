import Link from "next/link";
import Image from "next/image";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";

export function IndustriesCompact() {
  return (
    <section className="bg-offwhite border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-14">
        <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Coverage by industry
            </span>
            <h2 className="mt-1 font-bold tracking-tighter text-slate text-2xl md:text-3xl leading-tight">
              How the cases shape up by vertical
            </h2>
          </div>
          <Link
            href="/industries"
            className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline shrink-0"
          >
            All industries →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule">
          {VERTICAL_CONTENT.map((v) => (
            <Link
              key={v.slug}
              href={`/industries/${v.slug}`}
              className="group relative aspect-[4/3] overflow-hidden bg-slate block no-underline"
            >
              <Image
                src={`/images/industry-${v.slug}.png`}
                alt={v.name}
                fill
                className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/40 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <span className="font-mono text-[10px] uppercase tracking-wider text-electric-soft">
                  Industry
                </span>
                <span className="mt-1 text-base md:text-lg font-semibold tracking-tight text-white leading-tight">
                  {v.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
