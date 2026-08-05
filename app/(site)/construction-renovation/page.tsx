import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { GridLines } from "@/components/ui/grid-lines";
import { ProjectPathExplorer } from "@/components/construction/project-path";
import { budgetDrivers, constructionPrestations, preDecisions } from "@/content/construction";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Construction et rénovation — ordre des travaux, budget et autorisations",
  description:
    "Comment se déroule une rénovation : l'ordre logique des travaux, les décisions à prendre avant le chantier, les interactions entre châssis, isolation, ventilation et chauffage, et ce qui fait varier le budget.",
  alternates: { canonical: "/construction-renovation" },
};

export default function ConstructionRenovationPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Construction & rénovation"
        title="Rénover dans le bon ordre"
        description="La plupart des surcoûts d'une rénovation ne viennent pas du prix des matériaux, mais de l'ordre dans lequel les travaux ont été faits. Voici comment un chantier s'enchaîne, ce qui se décide avant le premier coup de pelle, et ce qui fait vraiment bouger le budget."
      />

      {/* Prestations */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {constructionPrestations.map((prestation, i) => {
              const anchors: Record<number, string> = { 1: "extensions", 2: "renovation" };
              return (
                <Reveal key={prestation.title} delay={0.05 * (i % 3)}>
                  <article
                    id={anchors[i]}
                    className="border-t-2 border-ink-950 pt-6 scroll-mt-28"
                  >
                    <p className="font-display text-4xl text-stone-300" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 font-display text-2xl text-ink-950">{prestation.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {prestation.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Ce qui inspire confiance, sans promesse creuse */}
      <section className="border-y border-ink-950/10 bg-bone-deep py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="img-drift relative aspect-[4/3] overflow-hidden bg-stone-100">
              <Image
                src="/images/realisations/villa-terrasse-angle.jpg"
                alt="Villa réalisée par COREMI : rez-de-chaussée vitré toute hauteur ouvert sur une terrasse en lames composites."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Notre façon de travailler"
                title="Un chantier lourd se gagne dans la préparation"
              />
              <div className="mt-8 space-y-5 leading-relaxed text-ink-600">
                <p>
                  Avant de commencer, nous étudions les plans, vérifions l&apos;existant
                  et posons les questions qui fâchent : accès, stabilité, évacuations,
                  raccordements. C&apos;est ce travail invisible qui évite les mauvaises
                  surprises en cours de route.
                </p>
                <p>
                  Pendant les travaux, votre interlocuteur COREMI suit le chantier,
                  coordonne les corps de métier et vous informe chaque semaine. Les
                  décisions se prennent avec vous, pas dans votre dos.
                </p>
              </div>
              <Link
                href="/realisations"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:text-accent-600"
              >
                Voir des chantiers terminés
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>


      {/* Parcours interactif */}
      <section className="scroll-mt-24 bg-bone-deep py-16 sm:py-24" id="parcours">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Votre projet"
              title="Quel chantier envisagez-vous ?"
              description="Choisissez votre situation : vous verrez les travaux généralement associés dans l'ordre recommandé, les points d'attention, les aides à vérifier et ce qu'il faut réunir pour obtenir un devis utile."
            />
          </Reveal>
          <div className="mt-12">
            <ProjectPathExplorer />
          </div>
        </Container>
      </section>

      {/* Les systèmes se parlent */}
      <section className="relative overflow-hidden bg-ink-950 py-16 text-bone sm:py-24">
        <GridLines tone="dark" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  index="03"
                  eyebrow="Le point que tout le monde sous-estime"
                  title="Châssis, isolation, ventilation et chauffage forment un système"
                  tone="dark"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-stone-200/85">
                  <p>
                    Chaque fois que vous rendez le bâtiment plus étanche — de nouveaux
                    châssis, une façade isolée — vous supprimez les fuites d&apos;air qui
                    évacuaient l&apos;humidité du quotidien. Sans apport d&apos;air neuf,
                    elle se dépose sur les surfaces froides : condensation, puis
                    moisissures.
                  </p>
                  <p>
                    Dans l&apos;autre sens, isoler réduit fortement les besoins de
                    chauffage. Remplacer la chaudière <em className="italic">avant</em>{" "}
                    d&apos;isoler conduit à surdimensionner l&apos;installation, et à payer
                    deux fois.
                  </p>
                  <p className="text-bone">
                    C&apos;est pour cela que nous regardons l&apos;ensemble du projet avant
                    de chiffrer un seul poste, même quand vous ne nous demandez que des
                    châssis.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Décisions préalables */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Avant le chantier"
              title="Cinq décisions à prendre en amont"
              description="Elles ne coûtent rien à ce stade, et très cher si on les tranche en cours de chantier."
            />
          </Reveal>
          <dl className="mt-12 grid gap-px bg-ink-950/10 sm:grid-cols-2">
            {preDecisions.map((d) => (
              <div key={d.title} className="bg-bone p-7">
                <dt className="font-display text-xl font-medium text-ink-950">{d.title}</dt>
                <dd className="mt-3 leading-relaxed text-ink-600">{d.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Budget et délai */}
      <section className="bg-bone-deep py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Budget & délai"
              title="Ce qui fait vraiment varier un chantier"
              description="Nous ne publions ni prix ni durée type : sur deux maisons voisines, l'écart peut aller du simple au double. Voici les cinq facteurs qui l'expliquent."
            />
          </Reveal>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {budgetDrivers.map((b) => (
              <div key={b.title}>
                <dt className="font-semibold text-ink-950">{b.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-600">{b.text}</dd>
              </div>
            ))}
          </dl>
          <Reveal delay={0.1}>
            <Link
              href="/prix-et-aides"
              className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-accent-600"
            >
              Comment se construit un devis, poste par poste
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <ProcessSection />
      <CtaSection />
    </>
  );
}
