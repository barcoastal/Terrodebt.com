import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "TerraDebt", template: "%s | TerraDebt" },
  description: "MCA debt relief with a published flat fee.",
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
    <html lang="en" className={inter.variable}>
      <body className="bg-offwhite text-slate font-sans antialiased">{children}</body>
    </html>
  );
}
