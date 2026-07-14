import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { EngagementsSection } from "@/components/home/engagements-section";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "À propos — l'entreprise COREMI",
  description:
    "COREMI est une entreprise générale de construction et de châssis active à Bruxelles et en Brabant wallon. Une structure à taille humaine, un interlocuteur unique, des devis transparents.",
  alternates: { canonical: "/a-propos" },
};

const values = [
  {
    title: "La précision",
    text: "Un chantier réussi se joue au millimètre : dans les mesures, dans le planning, dans le devis. Nous préférons prendre le temps de bien préparer que de rattraper.",
  },
  {
    title: "La franchise",
    text: "Si une idée coûte trop cher pour ce qu'elle apporte, nous vous le disons. Si un délai n'est pas tenable, aussi. Vous décidez avec les vraies informations.",
  },
  {
    title: "Le respect des lieux",
    text: "Nous travaillons chez vous. Protection des sols, chantier rangé chaque soir, nettoyage final : votre maison reste votre maison, même pendant les travaux.",
  },
  {
    title: "La constance",
    text: "Le même niveau d'exigence pour un vitrage remplacé que pour une extension complète. C'est comme ça qu'on construit une réputation locale.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="À propos"
        title="Une entreprise à taille humaine, présente sur chaque chantier"
        description={`COREMI construit, rénove et pose des châssis à ${siteConfig.serviceArea}. Derrière le nom, des artisans qui suivent votre projet du premier café au dernier coup de balai.`}
      />

      {/* Histoire */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                eyebrow="L'entreprise"
                title="Née sur les chantiers, pas dans un bureau"
              />
              <div className="mt-8 space-y-5 leading-relaxed text-ink-600">
                <p>
                  COREMI vient du terrain. L&apos;entreprise s&apos;est construite chantier
                  après chantier, sur un constat simple : les clients cherchent quelqu&apos;un
                  qui écoute, qui chiffre honnêtement et qui livre ce qu&apos;il a promis.
                </p>
                <p>
                  Nous sommes restés volontairement une structure compacte. C&apos;est ce
                  qui nous permet d&apos;être physiquement présents sur les chantiers, de
                  connaître chaque client par son prénom et de garantir le niveau de
                  finition qui fait qu&apos;on nous recommande.
                </p>
                <p className="text-sm text-ink-500">
                  Années d&apos;activité, équipe et agréments : [ANNÉES D&apos;EXPÉRIENCE] et
                  [CERTIFICATIONS], informations à compléter par COREMI avant publication.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <Image
                src="/images/equipe.jpg"
                alt="L'équipe COREMI sur chantier. Photo provisoire à remplacer."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="border-y border-ink-950/10 bg-bone-deep py-20 sm:py-28" aria-label="Nos valeurs">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Ce qui nous guide" title="Quatre principes, appliqués partout" />
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={0.05 * i}>
                <article className="border-t-2 border-ink-950 pt-6">
                  <h3 className="flex items-baseline gap-4 font-display text-2xl text-ink-950">
                    <span className="text-sm font-sans font-semibold tracking-widest text-accent-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {value.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-600">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSection />
      <EngagementsSection />

      <section className="py-16 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <Link
              href="/realisations"
              className="group inline-flex items-center gap-3 border border-ink-950/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
            >
              Voir nos réalisations
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
