import Image from "next/image";
import Link from "next/link";

export function MethodologyStrip() {
  return (
    <section className="bg-white border-b border-rule">
      <div className="mx-auto max-w-content px-6 py-12 md:py-16 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream border border-rule">
            <Image
              src="/images/founder-scene.png"
              alt="TerraDebt founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
        <div className="md:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
            About TerraDebt
          </span>
          <h2 className="mt-2 font-bold tracking-tighter text-slate text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
            How we research debt restructure
          </h2>
          <ul className="mt-6 space-y-4 text-slate leading-relaxed max-w-2xl">
            <li className="flex gap-3">
              <span className="font-mono text-[11px] text-muted shrink-0 mt-1">01</span>
              <p>We work cases across six categories: MCA, SBA, equipment, vendor, bank, and tax debt. Our guides reflect what actually closes, not generic relief copy.</p>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[11px] text-muted shrink-0 mt-1">02</span>
              <p>Programs are coordinated with state-licensed counsel where legal defense is required. We are not a law firm.</p>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[11px] text-muted shrink-0 mt-1">03</span>
              <p>Numbers in our case studies reflect aggregated outcomes across active programs. Past results do not predict future outcomes.</p>
            </li>
          </ul>
          <div className="mt-7 pt-5 border-t border-rule">
            <p className="text-sm text-slate font-medium">Bar Elezra</p>
            <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">
              Founder · GRL Recovery LLC dba TerraDebt
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-muted">
            <span>Fort Lauderdale, FL</span>
            <span className="text-rule">·</span>
            <span>Founded 2026</span>
            <span className="text-rule">·</span>
            <span>GRL Recovery LLC</span>
          </div>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
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
