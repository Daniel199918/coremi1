import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, HeartHandshake, Ruler, ShieldCheck, Timer } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { StatsSection } from "@/components/home/stats-section";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "À propos — l'entreprise COREMI",
  description:
    "COREMI est une entreprise générale de construction active à Bruxelles et en Brabant wallon : gros œuvre, rénovation et châssis, avec un accompagnement personnalisé et des devis transparents.",
  alternates: { canonical: "/a-propos" },
};

const values = [
  {
    icon: Ruler,
    title: "La précision",
    text: "Chaque chantier est préparé avec rigueur : mesures, planning, choix des matériaux. La qualité des finitions fait la différence.",
  },
  {
    icon: ShieldCheck,
    title: "La transparence",
    text: "Nos devis sont détaillés poste par poste, sans frais cachés. Vous savez exactement ce que vous payez et pourquoi.",
  },
  {
    icon: Timer,
    title: "Le respect des engagements",
    text: "Un planning annoncé est un planning tenu. Nous communiquons immédiatement en cas d'imprévu, avec des solutions.",
  },
  {
    icon: HeartHandshake,
    title: "La proximité",
    text: "Un interlocuteur unique vous accompagne du premier contact à la réception. Vos questions reçoivent des réponses rapides.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="COREMI, l'exigence du travail bien fait"
        description={`Entreprise générale de construction et de châssis, COREMI intervient à ${siteConfig.serviceArea} pour des projets de construction, de rénovation et d'amélioration de l'habitat.`}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Notre histoire"
                title="Un artisanat devenu entreprise"
                description="COREMI est née sur les chantiers, d'un constat simple : les clients cherchent un partenaire fiable, qui écoute, conseille honnêtement et livre un travail soigné."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 leading-relaxed text-navy-900/75">
                <p>
                  Aujourd&apos;hui, notre équipe réunit les métiers du gros œuvre, de la
                  rénovation et du châssis pour offrir un accompagnement complet : un seul
                  partenaire, une seule responsabilité, un seul niveau d&apos;exigence.
                </p>
                <p>
                  Nous restons volontairement une structure à taille humaine. C&apos;est ce
                  qui nous permet d&apos;être présents sur chaque chantier, de connaître
                  chaque client et de garantir le niveau de finition qui fait notre
                  réputation.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12} y={32}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-xl border-2 border-accent-600/60 sm:block"
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
        </Container>
      </section>

      <section className="bg-navy-50/50 py-16 sm:py-24" aria-label="Nos valeurs">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Nos valeurs"
              title="Ce qui guide chacun de nos chantiers"
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={0.06 * i}>
                <div className="flex gap-5 rounded-xl border border-navy-100 bg-white p-7">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-950 text-white">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-950">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{value.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsSection />
      <ProcessSection />

      <section className="py-16 text-center sm:py-20">
        <Container>
          <Reveal>
            <ButtonLink href="/realisations" variant="primary" size="lg">
              Découvrir nos réalisations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
