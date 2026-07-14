import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { BeforeAfter } from "@/components/projects/before-after";
import { CtaSection } from "@/components/home/cta-section";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Nos réalisations — chantiers de construction, rénovation et châssis",
  description:
    "Chantiers menés par COREMI à Bruxelles et en Brabant wallon : extensions, rénovations complètes, remplacements de châssis, portes, terrasses et façades.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  const withBeforeAfter = projects.find((p) => p.beforeAfter);

  return (
    <>
      <PageHero
        index="03"
        eyebrow="Réalisations"
        title="Des chantiers terminés, pas des promesses"
        description="Une sélection de projets menés à Bruxelles et en Brabant wallon. Les visuels actuels sont provisoires et seront remplacés par les photos des chantiers COREMI."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <ProjectsGallery />
          </Reveal>
        </Container>
      </section>

      {withBeforeAfter?.beforeAfter && (
        <section className="border-t border-ink-950/10 bg-bone-deep py-20 sm:py-28" aria-labelledby="avant-apres">
          <Container className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  eyebrow="Avant / après"
                  title={withBeforeAfter.title}
                  description={withBeforeAfter.description}
                />
                <dl className="mt-8 space-y-3 border-t border-ink-950/10 pt-6 text-sm">
                  <div className="grid grid-cols-[7rem_1fr] gap-3">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-500 leading-5">
                      Lieu
                    </dt>
                    <dd className="text-ink-800">{withBeforeAfter.location}</dd>
                  </div>
                  <div className="grid grid-cols-[7rem_1fr] gap-3">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-500 leading-5">
                      Travaux
                    </dt>
                    <dd className="text-ink-800">{withBeforeAfter.workType}</dd>
                  </div>
                  <div className="grid grid-cols-[7rem_1fr] gap-3">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-500 leading-5">
                      Matériaux
                    </dt>
                    <dd className="text-ink-800">{withBeforeAfter.materials}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <BeforeAfter {...withBeforeAfter.beforeAfter} />
            </Reveal>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
