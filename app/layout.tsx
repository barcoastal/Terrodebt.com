import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Business Debt Restructure & MCA Relief Consulting | Business Debt Insider",
    template: "%s | Business Debt Insider",
  },
  description:
    "Business Debt Insider restructures stacked MCA, equipment, vendor, bank, and tax debt for small and mid-sized businesses. Forensic financial auditing and creditor negotiation. Fort Lauderdale, FL.",
  keywords: [
    "MCA debt relief",
    "merchant cash advance debt help",
    "stacked MCA debt",
    "business debt restructure",
    "business debt consulting",
    "creditor negotiation",
    "small business debt restructuring",
    "forensic financial audit",
    "liquidity engineering",
    "Fort Lauderdale debt consulting",
  ],
  metadataBase: new URL("https://businessdebtinsider.com"),
  openGraph: {
    siteName: "Business Debt Insider",
    type: "website",
    locale: "en_US",
    title: "Business Debt Restructure & MCA Relief Consulting | Business Debt Insider",
    description:
      "Strategic financial consulting for SMEs with stacked merchant cash advance, equipment, vendor, bank, and tax debt. Fort Lauderdale, FL.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Business Debt Insider" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Debt Restructure & MCA Relief Consulting | Business Debt Insider",
    description:
      "Strategic financial consulting for businesses with stacked debt. Forensic audit, liquidity engineering, creditor negotiation. Fort Lauderdale, FL.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
