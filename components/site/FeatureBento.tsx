import Link from "next/link";
import { Reveal } from "./Reveal";

export function FeatureBento() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 py-20 md:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">What we do</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Four programs. One coordinated team.</h2>
            <p className="mt-4 text-muted leading-relaxed">We match the program to your stack, your timeline, and where you sit relative to default. No single playbook.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-fr">
          {/* Cell 1: Settlement */}
          <Reveal delay={0.05} className="h-full">
            <BentoCell>
              <Eyebrow>Program 01</Eyebrow>
              <CellTitle>Settle stacked MCAs for 40 to 60 percent.</CellTitle>
              <CellBody>Negotiated lender-by-lender. We coordinate counsel where needed, structure the close-outs, and confirm releases in writing before any payment moves.</CellBody>
              <div className="mt-6 rounded-xl border border-border bg-offwhite p-5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Recent close-out</div>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-muted">Owed</span>
                      <span className="font-mono font-semibold text-slate">$425,000</span>
                    </div>
                    <div className="mt-1.5 h-2.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-slate/70" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-muted">Paid</span>
                      <span className="font-mono font-semibold text-electric">$246,000</span>
                    </div>
                    <div className="mt-1.5 h-2.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-electric" style={{ width: "58%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </BentoCell>
          </Reveal>

          {/* Cell 2: Restructure */}
          <Reveal delay={0.1} className="h-full">
            <BentoCell>
              <Eyebrow>Program 02</Eyebrow>
              <CellTitle>Restructure without settling.</CellTitle>
              <CellBody>Pause, extend, or reduce daily debits with the lenders directly. The right move when settlement is premature.</CellBody>
              <div className="mt-6 rounded-xl border border-border bg-offwhite p-4">
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 38, 35, 30, 24, 18, 14, 12, 12, 12].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 1.4}%`, background: i >= 6 ? "var(--color-electric)" : "var(--color-border)" }} />
                  ))}
                </div>
                <div className="mt-2 flex items-baseline justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="text-muted">Daily debit</span>
                  <span className="text-electric">Reduced 60%</span>
                </div>
              </div>
            </BentoCell>
          </Reveal>

          {/* Cell 3: Reverse consolidation defense */}
          <Reveal delay={0.15} className="h-full">
            <BentoCell>
              <Eyebrow>Program 03</Eyebrow>
              <CellTitle>Unwind bad consolidations.</CellTitle>
              <CellBody>Reverse consolidations strip the holdback and stack the term on top. We exit them and rebuild a real plan.</CellBody>
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-offwhite px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="font-mono text-[11px] text-slate">Trap</span>
                </div>
                <span className="text-border">→</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-electric" />
                  <span className="font-mono text-[11px] text-slate">Exit</span>
                </div>
              </div>
            </BentoCell>
          </Reveal>

          {/* Cell 4: Legal defense */}
          <Reveal delay={0.2} className="h-full">
            <BentoCell>
              <Eyebrow>Program 04</Eyebrow>
              <CellTitle>72-hour counsel for COJs and frozen accounts.</CellTitle>
              <CellBody>When a confession of judgment hits or an account gets frozen, hours matter. We have licensed counsel in every state and a defense playbook for the most common MCA filings.</CellBody>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <StatTile value="50" label="States covered" />
                <StatTile value="72 hr" label="Initial response" />
                <StatTile value="24/7" label="Emergency intake" />
              </div>
            </BentoCell>
          </Reveal>

          {/* Cell 5: Free calculators */}
          <Reveal delay={0.25} className="h-full">
            <BentoCell>
              <Eyebrow>Tool</Eyebrow>
              <CellTitle>Effective APR, stack burden, health check.</CellTitle>
              <CellBody>Free calculators that show you the real math before any call. No login required.</CellBody>
              <div className="mt-auto pt-5">
                <Link href="/tools" className="font-mono text-xs uppercase tracking-wider text-electric no-underline hover:underline">
                  Open the toolkit →
                </Link>
              </div>
            </BentoCell>
          </Reveal>

          {/* Cell 6: AI-augmented assessment */}
          <Reveal delay={0.3} className="h-full">
            <BentoCell>
              <Eyebrow>Method</Eyebrow>
              <CellTitle>Math first, pitch second.</CellTitle>
              <CellBody>Our assessment runs the numbers on your stack before anyone gets on a sales call. You see the path before you hear it.</CellBody>
              <div className="mt-auto pt-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Live during your call</span>
              </div>
            </BentoCell>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BentoCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`surface-card p-6 md:p-7 flex flex-col h-full transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-wider text-electric">{children}</span>;
}

function CellTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-slate leading-snug">{children}</h3>;
}

function CellBody({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-muted text-sm leading-relaxed">{children}</p>;
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-offwhite px-3 py-3 text-center">
      <div className="font-mono text-xl font-bold text-slate tracking-tight">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted">{label}</div>
    </div>
  );
}
