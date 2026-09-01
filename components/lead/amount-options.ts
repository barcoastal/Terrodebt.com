// Shared debt-amount choices for all lead forms.
// "qualifies: false" options show a polite decline instead of advancing.
export type AmountOption = { label: string; value: number; qualifies: boolean };

export const AMOUNT_OPTIONS: AmountOption[] = [
  { label: "Under $20,000", value: 10_000, qualifies: false },
  { label: "$20,000 - $50,000", value: 35_000, qualifies: true },
  { label: "$50,000 - $100,000", value: 75_000, qualifies: true },
  { label: "$100,000 - $500,000", value: 300_000, qualifies: true },
  { label: "$500,000 - $1,000,000", value: 750_000, qualifies: true },
  { label: "$1,000,000+", value: 1_000_000, qualifies: true },
];
