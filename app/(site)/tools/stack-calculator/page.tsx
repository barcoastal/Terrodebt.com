import type { Metadata } from "next";
import { StackCalculator } from "@/components/tools/StackCalculator";

export const metadata: Metadata = {
  title: "Stacked MCA Calculator | Freshline Advisory",
  description: "Calculate total daily debit burden and weighted APR across all your active merchant cash advances. Free, no email required.",
};

export default function StackCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <header className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Free tool</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Stacked MCA Calculator</h1>
        <p className="mt-4 text-lg text-muted">List every active advance. The calculator returns total daily debit, remaining balance at current pace, and a weighted effective APR across the stack.</p>
      </header>
      <div className="mt-12">
        <StackCalculator />
      </div>
    </article>
  );
}
