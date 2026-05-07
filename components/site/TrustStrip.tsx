const VALUES = [
  { label: "Free assessment", sub: "60-second qualifier" },
  { label: "Free calculators", sub: "Effective APR + stack analysis" },
  { label: "Pre-default", sub: "Programs before lawsuits land" },
  { label: "50-state coverage", sub: "Coordinated counsel" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-border bg-white">
      <div className="mx-auto max-w-content px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {VALUES.map((v) => (
          <div key={v.label} className="text-center md:text-left">
            <div className="font-mono text-xs uppercase tracking-wider text-electric font-medium">{v.label}</div>
            <div className="text-sm text-muted mt-1">{v.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
