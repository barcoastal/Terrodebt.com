import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-geist", display: "swap" });

export const metadata: Metadata = {
  title: { default: "TerraDebt", template: "%s | TerraDebt" },
  description:
    "TerraDebt restructures business debt across MCA, SBA, equipment, vendor, bank, and tax debt. Coordinated workouts and plain-spoken research.",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
