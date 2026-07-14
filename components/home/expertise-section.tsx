import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Double focus éditorial : construction/rénovation d'un côté,
 * châssis de l'autre. Mise en page asymétrique croisée.
 */
export function ExpertiseSection() {
  return (
    <section className="overflow-hidden py-24 sm:py-32" aria-label="Construction, rénovation et châssis">
      <Container className="space-y-24 sm:space-y-32">
        {/* Construction & rénovation */}
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <Image
                src="/images/chantier.jpg"
                alt="Gros œuvre en cours sur un chantier COREMI. Photo provisoire à remplacer."
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="mb-5 flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
                <span className="text-accent-600">06</span> Construction &amp; rénovation
              </p>
              <h2 className="font-display text-4xl font-medium leading-tight text-ink-950">
                La structure d&apos;abord. Elle porte tout le reste.
              </h2>
              <p className="mt-6 leading-relaxed text-ink-600">
                Fondations, maçonnerie, extensions, transformations lourdes : le gros
                œuvre décide de la qualité finale d&apos;un projet. Nous l&apos;exécutons
                selon les plans de votre architecte et nous coordonnons la suite du
                chantier jusqu&apos;aux finitions.
              </p>
              <Link
                href="/construction-renovation"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:text-accent-600"
              >
                Construction &amp; rénovation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Châssis — inversé */}
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="mb-5 flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
                <span className="text-accent-600">07</span> Châssis &amp; portes
              </p>
              <h2 className="font-display text-4xl font-medium leading-tight text-ink-950">
                Des châssis posés comme il faut, pas seulement vendus.
              </h2>
              <p className="mt-6 leading-relaxed text-ink-600">
                PVC, aluminium ou bois : le bon matériau dépend de votre maison et de
                votre budget, et nous vous aidons à trancher. La pose fait le reste :
                mesures précises, resserrages propres, finitions intérieures comprises.
              </p>
              <Link
                href="/chassis"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:text-accent-600"
              >
                Découvrir les châssis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <Image
                src="/images/chassis-detail.jpg"
                alt="Détail de pose d'un châssis aluminium. Photo provisoire à remplacer."
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
