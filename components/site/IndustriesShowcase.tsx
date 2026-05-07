import Link from "next/link";
import Image from "next/image";
import { VERTICAL_CONTENT } from "@/lib/vertical-content";
import { Reveal } from "./Reveal";

export function IndustriesShowcase() {
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Who we serve</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Built for stacked-MCA debt across these industries.</h2>
            <p className="mt-4 text-lg text-muted">Each industry has a different shape of cash flow and a different mix of lenders. Our programs adapt to yours.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VERTICAL_CONTENT.map((v, i) => (
            <Reveal key={v.slug} delay={i * 0.04}>
              <Link href={`/industries/${v.slug}`} className="group block surface-card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] no-underline">
                <div className="relative aspect-[4/3] bg-offwhite overflow-hidden">
                  <Image src={`/images/industry-${v.slug}.png`} alt={v.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <span className="text-base font-semibold">{v.name}</span>
                    <span className="font-mono text-xs uppercase tracking-wider opacity-80">View →</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted line-clamp-2">{v.subline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <Link href="/industries" className="text-electric font-medium no-underline hover:underline">See all industries we serve →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
