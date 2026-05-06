import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import { LeadForm } from "@/components/lead/LeadForm";

export const metadata = { title: "MCA Savings Calculator", description: "Estimate how much you could save on stacked MCA debt." };

export default function CalculatorPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl font-bold">Estimate your MCA savings</h1>
        <p className="mt-4 text-muted">Move the sliders to see the typical savings range for your debt size and daily debit load.</p>
        <div className="mt-8"><SavingsCalculator /></div>
      </div>
      <LeadForm source="calculator" />
    </section>
  );
}
