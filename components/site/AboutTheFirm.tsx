import Image from "next/image";
import Link from "next/link";

export function AboutTheFirm() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24 grid md:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            <Image
              src="/images/founder-scene.png"
              alt="Bar Elezra, founder of TerraDebt"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Masthead</span>
          <h2 className="mt-2 font-serif-tight font-bold text-slate text-3xl md:text-4xl lg:text-5xl leading-tight">
            About the firm.
          </h2>
          <div className="mt-7 space-y-5 text-slate leading-relaxed max-w-2xl">
            <p>
              TerraDebt was built to be the firm we wished existed when we were on the operating side. The relief category looks like 2018 and acts like it: scare tactics, single-product pitches, and a sales script that pitches before it listens. We do the work differently.
            </p>
            <p>
              Most owners do not have just one type of debt. A trucking operator might have stacked MCAs, an SBA loan that funded the fleet, and equipment leases on two trailers. A restaurant group might have vendor debt, equipment leases on the kitchen, and a bank line of credit with a covenant violation. The right workout is rarely a single move.
            </p>
            <p>
              We work across six product categories: MCA debt relief, SBA loan modification, equipment finance restructure, vendor and supplier debt, bank loan workouts, and business tax debt. The intake assessment maps every obligation, identifies cross-default and lien exposure, and sequences the work in the order that protects operations and produces real leverage with each counterparty.
            </p>
          </div>

          <div className="mt-8 border-t border-rule pt-5 flex items-center justify-between gap-6 flex-wrap">
            <div className="font-mono text-sm text-slate">
              Bar Elezra <span className="text-muted">· Founder, TerraDebt</span>
            </div>
            <Link
              href="/about"
              className="font-mono text-[11px] uppercase tracking-wider text-electric no-underline hover:underline"
            >
              Read more about our approach →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
