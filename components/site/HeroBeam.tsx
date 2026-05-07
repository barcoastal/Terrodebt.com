import Image from "next/image";
import { Reveal } from "./Reveal";

export function HeroBeam() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 pt-12 pb-20">
        <Reveal>
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden surface-card-elevated">
            <Image src="/images/hero.png" alt="A small business owner in their workplace" fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 1152px" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate/70 via-slate/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex items-center max-w-md p-10">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-white/70">For the owner navigating stacked MCAs</span>
                <p className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white">A modern path out, scoped to your situation.</p>
                <p className="mt-3 text-white/80 text-sm">Free assessment. Free AI contract review. Programs that match where you are.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
