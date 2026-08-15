import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Faq } from "@/components/ui/faq";
import { CtaSection } from "@/components/home/cta-section";
import {
  couleurChecklist,
  couleurQuestions,
  COULEURS_LAST_UPDATED,
  facades,
  finitions,
} from "@/content/couleurs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Couleur de châssis : comment choisir selon votre façade",
  description:
    "Quelle couleur de châssis selon votre façade : brique rouge, enduit clair, fermette. Bicoloration, tenue des teintes foncées, finitions par matériau.",
  alternates: { canonical: "/chassis/couleurs" },
};

export default function CouleursPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Châssis & portes", item: `${siteConfig.url}/chassis` },
          { "@type": "ListItem", position: 3, name: "Couleurs & finitions", item: `${siteConfig.url}/chassis/couleurs` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: couleurQuestions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        index="03"
        eyebrow="Châssis & portes"
        title="La couleur, décidée pour vingt ans"
        description="C'est la question la plus posée avant de signer, et la plus rarement traitée sérieusement. Voici de quoi la trancher : ce qui se joue selon votre façade, ce que la technique autorise, et ce qu'il faut avoir vu de vos yeux avant de commander."
      />

      {/* Mise au point */}
      <section className="border-b border-ink-950/10 bg-bone-deep py-10">
        <Container>
          <div className="flex max-w-3xl items-start gap-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink-950">Ce que cette page ne fait pas</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Elle ne vous dira pas quelle couleur est belle : ce n&apos;est ni notre
                rôle ni notre métier. Elle donne des repères de lecture d&apos;une façade
                et signale les contraintes techniques réelles — celles qui limitent
                vraiment le choix. Aucune durée de tenue ni garantie chiffrée n&apos;est
                avancée ici : elle dépend du film ou du laquage retenu et figure sur la
                fiche du produit proposé. Page mise à jour le {COULEURS_LAST_UPDATED}.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Repères par type de façade */}
      <section className="py-16 sm:py-24" aria-labelledby="facades">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Lire sa façade"
              title="Quatre situations, quatre logiques"
              description="La bonne teinte dépend moins de la mode que de ce qui existe déjà : la couleur des murs, la taille des ouvertures et l'époque du bâti."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {facades.map((f, i) => (
              <Reveal key={f.id} delay={0.06 * i}>
                <article id={f.id} className="flex h-full flex-col border border-ink-950/15 bg-bone p-7">
                  <h3 className="font-display text-2xl font-medium text-ink-950">{f.facade}</h3>
                  <p className="mt-4 leading-relaxed text-ink-600">{f.principle}</p>

                  <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Teintes fréquemment retenues
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {f.common.map((c) => (
                      <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent-600" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto border-l-2 border-ink-950/25 pl-4 pt-6 text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-950">Le piège : </span>
                    {f.caution}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comment la teinte est obtenue */}
      <section className="bg-bone-deep py-16 sm:py-24" aria-labelledby="finitions">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="La technique"
              title="D'où vient la couleur, matériau par matériau"
              description="Comprendre comment la teinte est appliquée explique presque tout le reste : ce qui se raye, ce qui se refait, et pourquoi une teinte foncée n'est pas neutre sur du PVC."
            />
          </Reveal>

          <div className="mt-14 space-y-8">
            {finitions.map((f, i) => (
              <Reveal key={f.id} delay={0.06 * i}>
                <article className="grid gap-6 border border-ink-950/15 bg-bone p-7 lg:grid-cols-[14rem_1fr] lg:gap-10">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                      {f.material}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-medium text-ink-950">
                      {f.title}
                    </h3>
                  </div>
                  <div>
                    <p className="leading-relaxed text-ink-600">{f.how}</p>
                    <ul className="mt-5 space-y-2.5">
                      {f.consequences.map((c) => (
                        <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent-600" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-l-2 border-accent-600 pl-4 text-sm leading-relaxed text-ink-950">
                      <span className="font-semibold">À demander : </span>
                      {f.ask}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Questions récurrentes */}
      <section className="py-16 sm:py-24" aria-labelledby="questions-couleur">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading
                  index="03"
                  eyebrow="Questions fréquentes"
                  title="Ce qu'on nous demande vraiment"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Faq items={couleurQuestions} />
            </div>
          </div>
        </Container>
      </section>

      {/* Checklist avant devis */}
      <section className="bg-ink-950 py-16 text-bone sm:py-24" aria-labelledby="checklist-couleur">
        <Container>
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Avant le devis"
              title="Six points à avoir tranchés"
              description="Un devis châssis chiffré sans ces réponses est un devis qui bougera. Autant les fixer maintenant."
              tone="dark"
            />
          </Reveal>
          <ol className="mt-12 grid gap-px bg-bone/10 sm:grid-cols-2">
            {couleurChecklist.map((c, i) => (
              <Reveal key={c} delay={0.05 * i}>
                <li className="flex h-full gap-5 bg-ink-950 p-7">
                  <span className="text-sm font-semibold tracking-widest text-accent-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-stone-200/85">{c}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/chassis/quiz"
                className="btn-press group inline-flex items-center justify-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-500"
              >
                Trouver mon matériau
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/chassis"
                className="btn-press inline-flex items-center justify-center border border-bone/30 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-bone hover:bg-bone hover:text-ink-950"
              >
                Revenir aux châssis
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
