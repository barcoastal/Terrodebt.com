import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Freshline Advisory", template: "%s | Freshline Advisory" },
  description:
    "GRL Recovery LLC, doing business as Freshline Advisory. Strategic financial consulting for small and mid-sized enterprises facing stacked short-term debt. Fort Lauderdale, FL.",
  metadataBase: new URL("https://freshlineadvisory.com"),
  openGraph: {
    siteName: "Freshline Advisory",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Freshline Advisory" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
