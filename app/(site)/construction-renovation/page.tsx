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
import { constructionPrestations } from "@/content/construction";

export const metadata: Metadata = {
  title: "Construction et rénovation à Bruxelles et en Brabant wallon",
  description:
    "Entrepreneur général pour votre gros œuvre, extension, transformation ou rénovation complète à Bruxelles et en Brabant wallon. Coordination de chantier, devis détaillé gratuit.",
  alternates: { canonical: "/construction-renovation" },
};

export default function ConstructionRenovationPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="Construction & rénovation"
        title="Du terrassement aux finitions, un chantier maîtrisé"
        description="Constructions, extensions, transformations et rénovations complètes. COREMI exécute le gros œuvre selon les plans de votre architecte et coordonne le chantier jusqu'à la réception."
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

      <ProcessSection />
      <CtaSection />
    </>
  );
}
