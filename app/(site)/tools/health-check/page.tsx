import type { Metadata } from "next";
import { HealthCheck } from "@/components/tools/HealthCheck";

export const metadata: Metadata = {
  title: "MCA Health Check | TerraDebt Self-Assessment",
  description: "Five-question self-assessment for stacked MCA debt. Get a risk score and program recommendation in 60 seconds. Free, no email required.",
};

export default function HealthCheckPage() {
  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <header className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Free self-assessment</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">MCA Health Check</h1>
        <p className="mt-4 text-lg text-muted">Five questions. The score returns a risk tier and a likely program fit. The output is a starting point for a conversation, not a guarantee of eligibility.</p>
      </header>
      <div className="mt-12">
        <HealthCheck />
      </div>
    </article>
  );
}
