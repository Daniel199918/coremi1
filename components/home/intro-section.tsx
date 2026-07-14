import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GridLines, PlusMark } from "@/components/ui/grid-lines";
import { Reveal } from "@/components/motion/reveal";

/** Présentation courte, ton direct, grande typographie éditoriale. */
export function IntroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-label="Présentation de COREMI">
      <GridLines />
      <PlusMark className="absolute left-8 top-10" />
      <PlusMark className="absolute bottom-10 right-8" />
      <Container className="relative grid gap-10 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
            <span className="text-accent-600">01</span> L&apos;entreprise
          </p>
        </Reveal>
        <div>
          <Reveal>
            <p className="font-display text-3xl font-medium leading-snug text-ink-950 sm:text-4xl">
              COREMI est une entreprise générale belge. Nous prenons un projet dans son
              ensemble, des fondations aux châssis, et nous le menons avec le même
              soin qu&apos;un chantier pour notre propre maison.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl leading-relaxed text-ink-600">
              Une structure à taille humaine, présente sur chaque chantier. Vous parlez
              à la personne qui suit vos travaux, pas à un standard. Le devis dit tout,
              le planning est tenu, la maison est rendue propre.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/a-propos"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:text-accent-600"
            >
              Faire connaissance
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
