import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export function HeroBeam() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 pt-12 pb-20">
        <Reveal>
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden surface-card-elevated">
            <Image
              src="/images/hero.png"
              alt="A small business owner in their workplace"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate/70 via-slate/50 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex items-center max-w-xl p-8 md:p-12">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/70">For the owner navigating stacked MCAs</span>
                <p className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
                  We tell you the math before we propose a program.
                </p>
                <p className="mt-4 text-white/80 text-sm md:text-base leading-relaxed">
                  Free assessment. Free calculators. No theatrics.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/get-started"
                    className="inline-flex items-center gap-2 bg-electric text-white px-5 py-2.5 rounded-xl text-sm font-semibold no-underline hover:opacity-90 transition"
                  >
                    Open the assessment
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 border border-white/25 text-white px-5 py-2.5 rounded-xl text-sm font-semibold no-underline hover:bg-white/10 transition"
                  >
                    Run the calculators
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
