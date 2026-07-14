import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "COREMI — Entreprise de construction, rénovation et châssis en Belgique",
    template: "%s · COREMI",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: siteConfig.name,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "COREMI — Construction & Châssis" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
