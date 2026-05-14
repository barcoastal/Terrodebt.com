import { LeadForm } from "@/components/lead/LeadForm";

export const metadata = {
  title: "Contact Freshline Advisory | Free MCA Debt Assessment",
  description: "Request a free assessment for stacked MCA debt. A Freshline Advisory advisor will respond within one business hour. Free calculators available without contact.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-content px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-4 text-muted">Fill out the form and a Freshline Advisory advisor will reach out within one business hour.</p>

        <div className="mt-8 space-y-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-muted">Email</div>
            <div className="mt-1 text-lg text-slate">hello@freshlineadvisory.com</div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-muted">Office</div>
            <p className="mt-1 text-sm text-slate leading-relaxed">
              <strong>GRL Recovery LLC</strong><br />
              6301 NW 5th Way 5100<br />
              Fort Lauderdale, FL 33309
            </p>
            <p className="mt-3 text-xs text-muted">Freshline Advisory is a trade name of GRL Recovery LLC.</p>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-muted">Hours</div>
            <p className="mt-1 text-sm text-slate leading-relaxed">
              We are responsive Monday through Friday from 8 AM to 8 PM Eastern, and Saturdays from 10 AM to 4 PM Eastern. For urgent legal defense matters, including COJ filings or frozen accounts, submit the form and note the urgency in the business name field, and we will return the call within one business hour during business days.
            </p>
          </div>
        </div>
      </div>
      <LeadForm source="contact" />
    </section>
  );
}
