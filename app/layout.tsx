import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Coremi",
    template: "%s · Coremi",
  },
  description: "Application web moderne construite avec Next.js et Supabase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
