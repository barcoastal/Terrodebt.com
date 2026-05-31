import type { Metadata } from "next";
import { AprCalculator } from "@/components/tools/AprCalculator";

export const metadata: Metadata = {
  title: "MCA Effective APR Calculator",
  description: "Convert factor rate and term length to the real annualized rate on your merchant cash advance. Free, no email required.",
};

export default function AprCalculatorPage() {
  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <header className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Free tool</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Effective APR Calculator</h1>
        <p className="mt-4 text-lg text-muted">Factor rates obscure the real cost of a merchant cash advance. Enter your funded amount, total payback, and term length to see the annualized rate.</p>
      </header>
      <div className="mt-12">
        <AprCalculator />
      </div>
    </article>
  );
}
