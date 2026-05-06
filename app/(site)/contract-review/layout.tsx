import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI MCA Contract Review",
  description: "Free AI tool that analyzes your MCA contract for effective APR, red flags, and next-step options.",
};

export default function ContractReviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
