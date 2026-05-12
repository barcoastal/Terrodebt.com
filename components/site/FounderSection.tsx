import Image from "next/image";
import { Reveal } from "./Reveal";

export function FounderSection() {
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden surface-card-elevated">
            <Image
              src="/images/founder-scene.png"
              alt="Bar Elezra, founder of TerraDebt"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <span className="inline-flex items-center gap-2 bg-offwhite border border-border text-slate text-[11px] font-medium px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-electric" />
              Built by operators, not lawyers
            </span>
            <span className="block mt-5 font-mono text-xs uppercase tracking-wider text-muted">From the founder</span>
            <blockquote className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate leading-[1.15] border-l-2 border-electric pl-5">
              Business debt is solvable. Most owners just need a coordinated workout, not a sales pitch.
            </blockquote>
            <div className="mt-7 space-y-4 text-slate leading-relaxed">
              <p>
                I started TerraDebt because the relief category looks like 2018 and acts like it too. Scare tactics, single-product pitches, and a sales script that pitches before it listens. Owners deserve better than that.
              </p>
              <p>
                Most owners do not have just one type of debt. A trucking operator might have stacked MCAs, an SBA loan that funded the fleet, and equipment leases on two trailers. A restaurant group might have vendor debt, equipment leases on the kitchen, and a bank LOC with a covenant violation. The right workout is rarely a single move.
              </p>
              <p>
                TerraDebt works across six product categories: MCA debt relief, SBA loan modification, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt. The intake assessment maps every obligation, identifies cross-default and lien exposure, and sequences the work in the order that protects operations and produces leverage with each counterparty.
              </p>
              <p>
                Before TerraDebt I worked at the intersection of small-business lending and operations. I have seen the inside of bad MCA contracts, accelerated SBA loans, and bank workouts that landed in special assets. I built TerraDebt to be the firm I would have wanted on the other end of the phone.
              </p>
            </div>
            <p className="mt-7 font-mono text-sm text-slate">Bar Elezra, Founder</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
