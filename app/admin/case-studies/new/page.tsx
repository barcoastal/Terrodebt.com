import { createCaseStudy } from "../actions";

export default function NewCaseStudy() {
  return (
    <div>
      <h1 className="text-2xl font-bold">New Case Study</h1>
      <form action={createCaseStudy} className="mt-6 space-y-4 max-w-3xl">
        <Field label="Slug"><input name="slug" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Industry"><input name="industry" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Debt amount"><input name="debtAmount" type="number" step="1" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Savings %"><input name="savingsPct" type="number" step="0.1" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Months"><input name="months" type="number" step="1" required className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Hero image (URL)"><input name="heroImage" className="w-full border border-border rounded-md px-3 py-2" /></Field>
        <Field label="Story (Markdown)"><textarea name="storyMd" rows={20} className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm" /></Field>
        <label className="flex items-center gap-2"><input name="published" type="checkbox" /> Published</label>
        <button type="submit" className="bg-electric text-white px-4 py-2 rounded-md">Create</button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-sm font-medium mb-1">{label}</label>{children}</div>;
}
