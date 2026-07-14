import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { StatsSection } from "@/components/home/stats-section";
import { AboutSection } from "@/components/home/about-section";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "COREMI — Construction, rénovation et châssis à Bruxelles et en Brabant wallon",
  description:
    "Entreprise générale de construction : gros œuvre, rénovation, pose de châssis PVC et aluminium, extensions et aménagements extérieurs. Devis gratuit à Bruxelles et en Brabant wallon.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <StatsSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
