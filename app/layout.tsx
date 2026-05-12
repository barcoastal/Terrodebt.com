import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: { default: "TerraDebt", template: "%s | TerraDebt" },
  description:
    "TerraDebt is the editorial-grade authority on business debt restructure. Plain-spoken essays and research on MCA, SBA, equipment, vendor, bank, and tax debt.",
  metadataBase: new URL("https://terradebt.com"),
  openGraph: {
    siteName: "TerraDebt",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "TerraDebt" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable} ${serif.variable}`}>
      <body className="bg-offwhite text-slate font-sans antialiased">{children}</body>
    </html>
  );
}
