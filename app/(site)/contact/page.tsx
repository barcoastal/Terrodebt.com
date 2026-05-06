import { LeadForm } from "@/components/lead/LeadForm";

export const metadata = {
  title: "Contact TerraDebt",
  description: "Reach TerraDebt by phone, email, or request a free assessment.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-4 text-muted">Two ways to reach us. Pick whichever is easier.</p>

        <div className="mt-8 space-y-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-muted">Phone</div>
            <div className="mt-1 text-2xl font-bold text-slate">1-800-TERRA-00</div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-muted">Email</div>
            <div className="mt-1 text-lg text-slate">hello@terradebt.com</div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-muted">Hours</div>
            <p className="mt-1 text-sm text-slate leading-relaxed">
              We answer the phone Monday through Friday from 8 AM to 8 PM Eastern, and Saturdays from 10 AM to 4 PM Eastern. For urgent legal defense matters, including COJ filings or frozen accounts, leave a voicemail anytime and we will return the call within one business hour during business days.
            </p>
          </div>
        </div>
      </div>
      <LeadForm source="contact" />
    </section>
  );
}
