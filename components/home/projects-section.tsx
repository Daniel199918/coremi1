import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { projects } from "@/content/projects";

/**
 * Sélection de réalisations réelles en grille asymétrique :
 * un grand format, deux formats moyens décalés, légendes de plan.
 */
export function ProjectsSection() {
  const [villa, second, third] = projects;
  if (!villa || !second || !third) return null;
  // Le hero montre déjà le panorama : la sélection ouvre sur l'angle terrasse.
  const featuredImage = villa.images[1] ?? villa.cover;

  return (
    <section className="py-24 sm:py-32" aria-labelledby="realisations">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Réalisations"
              title="Le travail parle mieux que nous"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-3 border border-ink-950/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
            >
              Toutes nos réalisations
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Grand format */}
          <Reveal className="lg:col-span-7">
            <Link href={`/realisations#${villa.slug}`} className="group block">
              <Tilt max={5}>
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </Tilt>
              <div className="flex items-baseline justify-between gap-4 py-5">
                <div>
                  <h3 className="font-display text-2xl text-ink-950">{villa.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    Fiche {villa.index} · {villa.location}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Colonne décalée */}
          <div className="flex flex-col gap-10 lg:col-span-5 lg:mt-24">
            {[second, third].map((project, i) => (
              <Reveal key={project.slug} delay={0.08 + i * 0.06}>
                <Link href={`/realisations#${project.slug}`} className="group block">
                  <Tilt max={6}>
                    <div className="relative aspect-[3/2] overflow-hidden bg-stone-100">
                      <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </Tilt>
                  <div className="py-4">
                    <h3 className="font-display text-xl text-ink-950">{project.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      Fiche {project.index} · {project.location}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
