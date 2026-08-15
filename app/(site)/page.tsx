import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { MetiersSection } from "@/components/home/metiers-section";
import { ConstructionScene } from "@/components/home/construction-scene";
import { ProjectsSection } from "@/components/home/projects-section";
import { MarqueeBand } from "@/components/home/marquee-band";
import { EngagementsSection } from "@/components/home/engagements-section";
import { ToolsSection } from "@/components/home/tools-section";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "COREMI — Rénovation, transformation et châssis en Brabant wallon",
  description:
    "Rénovation, transformation et annexes à Bruxelles et en Brabant wallon, avec une spécialité châssis : PVC, aluminium, portes et vitrages. Un seul interlocuteur, du premier relevé à la réception.",
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
      <ConstructionScene />
      <ProjectsSection />
      <MarqueeBand />
      <EngagementsSection />
      <ToolsSection />
      <ExpertiseSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
