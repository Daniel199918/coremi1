import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { metiers } from "@/content/metiers";

/**
 * Les métiers en rangées immersives : numérotation de plan, titres
 * imposants, vignette d'élévation qui s'agrandit au survol.
 */
export function MetiersSection() {
  return (
    <section className="border-y border-ink-950/10 bg-bone-deep py-24 sm:py-36" aria-labelledby="metiers">
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Nos métiers"
            title="Quatre métiers, une seule exigence"
            description="Un seul partenaire pour tout le chantier : moins d'intermédiaires, moins de frictions, un résultat cohérent."
          />
        </Reveal>

        <div className="mt-16 border-t border-ink-950/15">
          {metiers.map((metier, i) => (
            <Reveal key={metier.href + metier.index} delay={0.04 * i}>
              <Link
                href={metier.href}
                className="group grid items-center gap-x-8 gap-y-4 border-b border-ink-950/15 py-9 transition-colors hover:bg-bone md:grid-cols-[5rem_1.2fr_1fr_9rem]"
              >
                <span className="annotation text-stone-400 transition-colors group-hover:text-accent-600">
                  {metier.index}
                </span>
                <h3 className="font-display text-3xl font-medium text-ink-950 sm:text-4xl">
                  {metier.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink-600">
                  {metier.description}
                </p>
                <span className="relative hidden h-24 overflow-hidden border border-ink-950/10 md:block">
                  <Image
                    src={metier.image}
                    alt=""
                    fill
                    sizes="9rem"
                    className="object-cover saturate-[0.85] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
                  />
                  <ArrowRight
                    className="absolute bottom-2 right-2 h-4 w-4 text-bone opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
