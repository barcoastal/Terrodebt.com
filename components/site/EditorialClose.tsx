import Link from "next/link";
import { SubscribeForm } from "./SubscribeForm";

export function EditorialClose() {
  return (
    <section id="subscribe" className="bg-offwhite">
      <div className="mx-auto max-w-content px-6 pb-24 pt-4">
        <div className="grid md:grid-cols-2 gap-px bg-rule border border-rule">
          <div className="bg-cream p-8 md:p-10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">The brief</span>
            <h2 className="mt-2 font-serif-tight font-bold text-slate text-2xl md:text-3xl leading-tight">
              Get the newsletter.
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed max-w-md">
              A short weekly brief on business debt restructure. New essays, research notes, and case anatomies. Written by Bar Elezra. No filler.
            </p>
            <div className="mt-6">
              <SubscribeForm source="homepage" />
            </div>
            <p className="mt-3 text-xs text-muted">No spam. Unsubscribe anytime.</p>
          </div>

          <div className="bg-cream p-8 md:p-10 flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Direct</span>
            <h2 className="mt-2 font-serif-tight font-bold text-slate text-2xl md:text-3xl leading-tight">
              Talk to the team.
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed max-w-md">
              If your situation needs a real conversation, our assessment is free and scoped to your debt mix. Most calls run 20 to 30 minutes.
            </p>
            <div className="mt-auto pt-6">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 text-slate text-sm font-medium no-underline border-b border-slate pb-0.5 hover:border-electric hover:text-electric transition"
              >
                Request an assessment
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
