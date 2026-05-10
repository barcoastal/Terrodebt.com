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
              Stacked MCAs are not a shameful thing. They are a math problem with a clock on it.
            </blockquote>
            <div className="mt-7 space-y-4 text-slate leading-relaxed">
              <p>
                I started TerraDebt because the relief category looks like 2018 and acts like it too. Scare tactics and a sales script that pitches before it listens. Owners deserve better than that.
              </p>
              <p>
                Our model is built around fit, not a one-size pitch. We give every merchant free calculators on day one so the math is clear before any consultation. We work with owners before default, not just after a lawsuit lands. And when legal defense is required, we coordinate licensed attorneys in your state.
              </p>
              <p>
                Before TerraDebt I worked at the intersection of small-business lending and operations. I have seen the inside of bad MCA contracts. I have watched what happens when a daily debit eats payroll. I built TerraDebt to be the firm I would have wanted on the other end of the phone.
              </p>
              <p>
                If you have stacked MCAs, run our calculators first. Get your effective APR, total daily debit burden, and a quick health check. From there, we can talk programs.
              </p>
            </div>
            <p className="mt-7 font-mono text-sm text-slate">Bar Elezra, Founder</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
