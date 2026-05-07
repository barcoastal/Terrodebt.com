import Image from "next/image";
import { Reveal } from "./Reveal";

export function FounderSection() {
  return (
    <section className="bg-white border-y border-border">
      <div className="mx-auto max-w-content px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden surface-card-elevated">
            <Image src="/images/founder-scene.png" alt="Bar Elezra, founder of TerraDebt" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">From the founder</span>
            <blockquote className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-slate leading-tight border-l-2 border-electric pl-5">
              Stacked MCAs are not a shameful thing. They are a math problem with a clock on it.
            </blockquote>
            <div className="mt-6 space-y-4 text-slate leading-relaxed">
              <p>I started TerraDebt because the relief category looks like 2018 and acts like it too. Scare tactics and a sales script that pitches before it listens. Owners deserve better than that.</p>
              <p>Our model is built around fit, not a one-size pitch. We give every merchant a free AI contract review on day one so the effective APR is on the table from the start. We work with owners before default, not just after a lawsuit lands. And when legal defense is required, we coordinate licensed attorneys in your state.</p>
              <p>Before TerraDebt I worked at the intersection of small-business lending and operations. I have seen the inside of bad MCA contracts. I have watched what happens when a daily debit eats payroll. I built TerraDebt to be the firm I would have wanted on the other end of the phone.</p>
              <p>If you have stacked MCAs, upload your contract to our free AI tool. You will know your real effective APR in 30 seconds, no email required. From there, we can talk programs.</p>
            </div>
            <p className="mt-6 font-mono text-sm text-slate">Bar Elezra, Founder</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
