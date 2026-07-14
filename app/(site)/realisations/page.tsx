import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Nos réalisations — extensions, rénovations, châssis et terrasses",
  description:
    "Découvrez les chantiers réalisés par COREMI à Bruxelles et en Brabant wallon : extensions modernes, rénovations complètes, pose de châssis, portes d'entrée, terrasses et façades.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Nos chantiers parlent pour nous"
        description="Un aperçu de projets menés à Bruxelles et en Brabant wallon. Photos et descriptifs à titre d'exemple, remplacés au fil de nos chantiers."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <ProjectsGallery />
          </Reveal>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
