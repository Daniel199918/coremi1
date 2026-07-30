import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Manifeste éditorial : phrase manifeste en très grand corps serif,
 * image d'appui décalée, transition vers les métiers.
 */
export function IntroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36" aria-label="Présentation de COREMI">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="annotation flex items-baseline gap-4 text-ink-500">
              <span className="text-accent-600">01</span> L&apos;entreprise
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-9 font-display text-3xl font-medium leading-[1.15] text-ink-950 sm:text-[2.6rem]">
              Un chantier ne casse presque jamais au milieu d&apos;un mur.
              Il casse à la jonction : là où le gros œuvre s&apos;arrête et
              où le châssis commence.
              <em className="italic text-accent-700"> C&apos;est précisément là que nous ne sous-traitons pas.</em>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 max-w-xl space-y-5 leading-relaxed text-ink-600">
              <p>
                La plupart des entreprises générales confient les châssis à un tiers.
                Les poseurs de châssis, eux, arrivent après le maçon. Entre les deux,
                une zone grise : l&apos;étanchéité, l&apos;isolation du dormant, les
                finitions du raccord — et un responsable difficile à désigner quand
                ça fuit.
              </p>
              <p>
                COREMI fait les deux. Le mur et la fenêtre sortent de la même
                entreprise, donc le joint entre les deux aussi. Vous n&apos;avez
                qu&apos;un seul numéro à appeler, et personne à qui renvoyer la faute.
              </p>
            </div>
            <Link
              href="/a-propos"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:text-accent-600"
            >
              Faire connaissance
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-4 lg:mt-24">
          <figure className="relative">
            <div className="img-drift relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/realisations/villa-allee-entree.jpg"
                alt="Allée d'accès d'une villa réalisée par COREMI : dalles de béton posées sur gravier noir entre deux haies, entrée vitrée en perspective."
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover object-[62%_center]"
              />
            </div>
            <figcaption className="annotation mt-3 flex justify-between text-ink-500">
              <span>Fig. 01 — réalisation COREMI</span>
              <span className="text-accent-600">BXL · BW</span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
