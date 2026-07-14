import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";

const commitments = [
  "Un interlocuteur unique du devis à la réception",
  "Des devis détaillés et transparents",
  "Le soin des finitions, jusqu'au moindre détail",
  "Le respect des engagements et des délais convenus",
];

export function AboutSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="apropos-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal y={32}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-xl bg-navy-100 sm:block"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/equipe.jpg"
                alt="L'équipe COREMI sur chantier — photo à remplacer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="À propos de COREMI"
              title="Un savoir-faire belge, une exigence artisanale"
              description="COREMI est une entreprise générale de construction active à Bruxelles et en Brabant wallon. Notre approche : écouter, conseiller, puis réaliser — avec précision et sans mauvaise surprise."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3.5">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-900/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.18}>
            <ButtonLink href="/a-propos" variant="primary" className="mt-9">
              En savoir plus sur COREMI
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
