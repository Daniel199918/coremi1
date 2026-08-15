import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Nos réalisations — rénovation et châssis",
  description:
    "Chantiers réels menés par COREMI à Bruxelles et en Brabant wallon : villa contemporaine vitrée, maison au bardage anthracite, menuiseries aluminium noires.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Réalisations"
        title="Des chantiers terminés, pas des promesses"
        description="Chaque fiche montre un chantier réel de COREMI, photographié tel quel. Les informations de lieu et d'année sont précisées au fur et à mesure de la documentation."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <ProjectsGallery />
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
