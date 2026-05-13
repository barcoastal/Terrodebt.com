import { SubscribeForm } from "./SubscribeForm";

export function NewsletterStrip({ source = "homepage-strip" }: { source?: string }) {
  return (
    <section className="bg-cream border-y border-rule">
      <div className="mx-auto max-w-content px-6 py-10 md:py-12 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
            TerraDebt Weekly Brief
          </span>
          <h2 className="mt-2 font-bold tracking-tighter text-slate text-2xl md:text-3xl lg:text-4xl leading-tight">
            Get the weekly business-debt brief.
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted leading-relaxed max-w-xl">
            One email per week. New guides, working numbers, and case anatomies on business debt restructure. No filler.
          </p>
        </div>
        <div className="md:col-span-5">
          <SubscribeForm source={source} />
          <p className="mt-3 text-[11px] font-mono uppercase tracking-wider text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
