import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { MetiersSection } from "@/components/home/metiers-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { MarqueeBand } from "@/components/home/marquee-band";
import { EngagementsSection } from "@/components/home/engagements-section";
import { PracticalSection } from "@/components/home/practical-section";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "COREMI — Entreprise de construction, rénovation et châssis en Belgique",
  description:
    "Entreprise générale à Bruxelles et en Brabant wallon : gros œuvre, extensions, rénovation complète, pose de châssis PVC et aluminium. Devis détaillé gratuit, interlocuteur unique.",
  alternates: { canonical: "/" },
};

/** Données structurées FAQPage pour les questions de l'accueil. */
function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <IntroSection />
      <MetiersSection />
      <ProjectsSection />
      <MarqueeBand />
      <EngagementsSection />
      <PracticalSection />
      <ExpertiseSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
