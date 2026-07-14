import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { trustPoints } from "@/content/stats";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* Lignes verticales architecturales, très subtiles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 119px, white 119px 120px)",
        }}
      />

      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy-100">
              Entreprise générale — Bruxelles &amp; Brabant wallon
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Construire.
              <br />
              Rénover.
              <br />
              <span className="text-accent-500">Améliorer.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/80">
              COREMI accompagne vos projets de construction, de rénovation et de pose de
              châssis avec une approche sur mesure, un suivi rigoureux et des finitions
              durables.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent" size="lg">
                Demander un devis gratuit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/realisations" variant="light" size="lg">
                Découvrir nos réalisations
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={32}>
          <div className="relative">
            {/* Cadre décoratif rouge, décalé */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-xl border-2 border-accent-600/70 sm:block"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl shadow-navy-950/60">
              <Image
                src="/images/hero.jpg"
                alt="Habitation moderne réalisée par COREMI — photo à remplacer par un chantier réel"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Barre de confiance */}
      <div className="relative border-t border-white/10 bg-white/[0.03]">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4">
            {trustPoints.map((point, i) => (
              <Reveal key={point.title} delay={0.05 * i}>
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">{point.title}</p>
                    <p className="mt-0.5 hidden text-xs text-navy-100/60 sm:block">
                      {point.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
