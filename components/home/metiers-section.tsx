import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { metiers } from "@/content/metiers";

/**
 * Les métiers en liste éditoriale : rangées pleines largeur,
 * photo révélée au survol, numérotation de plan.
 */
export function MetiersSection() {
  return (
    <section className="border-y border-ink-950/10 bg-bone-deep py-24 sm:py-32" aria-labelledby="metiers">
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Nos métiers"
            title="Quatre métiers, une seule exigence"
            description="Un seul partenaire pour tout le chantier : moins d'intermédiaires, moins de frictions, un résultat cohérent."
          />
        </Reveal>

        <div className="mt-16 border-t border-ink-950/10">
          {metiers.map((metier, i) => (
            <Reveal key={metier.href + metier.index} delay={0.05 * i}>
              <Link
                href={metier.href}
                className="group grid items-center gap-6 border-b border-ink-950/10 py-8 transition-colors hover:bg-bone md:grid-cols-[4rem_1fr_2fr_10rem_3rem] md:gap-8"
              >
                <span className="font-display text-2xl text-stone-400 transition-colors group-hover:text-accent-600">
                  {metier.index}
                </span>
                <h3 className="font-display text-2xl font-medium text-ink-950 sm:text-3xl">
                  {metier.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink-600">
                  {metier.description}
                </p>
                <span className="relative hidden h-20 overflow-hidden md:block">
                  <Image
                    src={metier.image}
                    alt=""
                    fill
                    sizes="10rem"
                    className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </span>
                <ArrowRight
                  className="hidden h-5 w-5 justify-self-end text-ink-950 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent-600 md:block"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
