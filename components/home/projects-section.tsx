import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";

export function ProjectsSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="realisations-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Réalisations"
              title="Nos derniers chantiers"
              description="Extensions, rénovations, châssis, terrasses : un aperçu de notre travail sur le terrain."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/realisations" variant="outline" className="shrink-0">
              Voir toutes nos réalisations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.slug} delay={0.06 * i}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
