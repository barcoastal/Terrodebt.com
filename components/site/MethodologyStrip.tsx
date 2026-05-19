import Image from "next/image";
import Link from "next/link";

export function MethodologyStrip() {
  return (
    <section className="bg-paper border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <Image
              src="/images/founder-scene.png"
              alt="Business Debt Insider founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
        <div className="md:col-span-7 relative pl-6 md:pl-8">
          <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1.5 bg-electric" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric font-bold">
            About Business Debt Insider
          </span>
          <h2 className="mt-2 font-bold tracking-tight text-ink text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            How we research debt restructure
          </h2>
          <ul className="mt-6 space-y-5 text-ink leading-relaxed max-w-2xl">
            <li className="flex gap-4">
              <span className="font-mono text-base font-bold text-electric shrink-0 mt-0.5">01</span>
              <p>We work cases across five categories: MCA, equipment, vendor, bank, and tax debt. Our guides reflect what actually closes, not generic relief copy.</p>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-base font-bold text-electric shrink-0 mt-0.5">02</span>
              <p>Programs are coordinated with state-licensed counsel where legal defense is required. We are not a law firm.</p>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-base font-bold text-electric shrink-0 mt-0.5">03</span>
              <p>Numbers in our case studies reflect aggregated outcomes across active programs. Past results do not predict future outcomes.</p>
            </li>
          </ul>
          <div className="mt-7 pt-5 border-t border-ink">
            <p className="text-sm text-ink font-bold">Business Debt Insider</p>
            <p className="text-xs text-muted font-mono uppercase tracking-[0.18em] mt-1">
              GRL Recovery LLC · Strategic financial consulting
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
            <span>Fort Lauderdale, FL</span>
            <span className="text-rule">·</span>
            <span>Founded 2026</span>
            <span className="text-rule">·</span>
            <span>GRL Recovery LLC</span>
          </div>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink no-underline border-b border-ink pb-0.5 hover:border-electric hover:text-electric transition"
            >
              Read the full About page
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
