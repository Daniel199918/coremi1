import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GridLines } from "@/components/ui/grid-lines";
import { OpeningSchemas } from "@/components/chassis/opening-schemas";
import { CtaSection } from "@/components/home/cta-section";
import {
  chassisPrestations,
  components,
  criteria,
  materials,
  mistakes,
  priceFactors,
  questionsToAsk,
} from "@/content/chassis";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Châssis PVC, aluminium ou bois — comment choisir",
  description:
    "Différences réelles entre PVC, aluminium et bois, rôle du vitrage et de la pose, ce qui fait varier le prix, et les questions à poser avant de signer.",
  alternates: { canonical: "/chassis" },
};

const sommaire = [
  { href: "#materiaux", label: "PVC, aluminium ou bois ?" },
  { href: "#composants", label: "Ce qui fait la performance" },
  { href: "#criteres", label: "Thermique, acoustique, sécurité" },
  { href: "#ouvertures", label: "Types d'ouverture" },
  { href: "#prix", label: "Ce qui fait varier le prix" },
  { href: "#erreurs", label: "Erreurs fréquentes" },
  { href: "#questions", label: "Questions avant de signer" },
  { href: "#primes", label: "Primes liées aux châssis" },
];

export default function ChassisPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
      { "@type": "ListItem", position: 3, name: "Châssis & portes", item: `${siteConfig.url}/chassis` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        index="02"
        eyebrow="Châssis, portes & vitrages"
        title="Choisir ses châssis sans se tromper"
        description="Cette page n'est pas un argumentaire : c'est ce que nous expliquons avant qu'un client signe, chez nous ou ailleurs. Les compromis réels, ce qui compte vraiment, et les questions qui séparent deux devis en apparence identiques."
      />

      {/* Sommaire + accès au quiz */}
      <section className="border-b border-ink-950/10 bg-bone-deep py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <nav aria-label="Sommaire" className="lg:col-span-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                Sur cette page
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {sommaire.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      className="text-sm text-ink-700 underline decoration-ink-950/25 underline-offset-4 hover:text-accent-700 hover:decoration-accent-600"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="lg:col-span-5">
              <Link
                href="/chassis/quiz"
                className="group flex items-center justify-between gap-4 border border-ink-950/20 bg-bone p-5 transition-colors hover:border-ink-950"
              >
                <span>
                  <span className="block font-display text-lg text-ink-950">
                    Pas envie de tout lire ?
                  </span>
                  <span className="mt-1 block text-sm text-ink-600">
                    Onze questions pour cerner la solution qui vous convient.
                  </span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-accent-600 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Matériaux */}
      <section id="materiaux" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Le matériau"
              title="PVC, aluminium ou bois ?"
              description="Aucun n'est meilleur dans l'absolu. Chacun règle un problème et en crée un ailleurs. Le bon choix dépend de ce que vous placez en premier : le budget, la lumière, l'entretien ou l'aspect."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {materials.map((m, i) => (
              <Reveal key={m.id} delay={0.06 * i}>
                <article className="flex h-full flex-col border border-ink-950/15 bg-bone p-7">
                  <h3 className="font-display text-3xl text-ink-950">{m.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{m.short}</p>

                  <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Ce que ça vous apporte
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {m.strengths.map((s) => (
                      <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent-600" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Ce que ça vous coûte
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {m.limits.map((s) => (
                      <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-ink-950/40" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 space-y-3 border-t border-ink-950/10 pt-5 text-sm">
                    <div>
                      <dt className="font-semibold text-ink-950">Entretien</dt>
                      <dd className="mt-1 leading-relaxed text-ink-600">{m.maintenance}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-950">Durée de vie</dt>
                      <dd className="mt-1 leading-relaxed text-ink-600">{m.lifespan}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink-950">Où ça se justifie</dt>
                      <dd className="mt-1 leading-relaxed text-ink-600">{m.bestFor.join(" · ")}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl border-l-2 border-accent-600 bg-bone-deep p-5 text-sm leading-relaxed text-ink-600">
              Le matériau est ce dont on parle le plus, et rarement le plus déterminant.
              Un aluminium d&apos;entrée de gamme peut isoler moins bien qu&apos;un bon
              PVC, et les deux perdront une partie de leur performance si la pose est
              mauvaise.{" "}
              <Link
                href="/solutions/fabricants"
                className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4"
              >
                Comparer Schüco, Aliplast et Aluprof
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Composants */}
      <section
        id="composants"
        className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-16 text-bone sm:py-24"
      >
        <GridLines tone="dark" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Ce qui fait la performance"
              title="Quatre éléments, pas seulement le cadre"
              description="Un châssis n'est pas un produit unique, c'est un assemblage. Chacune de ces quatre pièces peut ruiner le travail des trois autres."
              tone="dark"
            />
          </Reveal>

          <div className="mt-14 border-t border-bone/15">
            {components.map((c, i) => (
              <Reveal key={c.n} delay={0.05 * i}>
                <div className="grid gap-x-10 gap-y-3 border-b border-bone/15 py-8 sm:grid-cols-[5rem_1fr]">
                  <span className="font-display text-3xl font-medium leading-none text-accent-500">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-bone">{c.title}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-stone-200/75">{c.text}</p>
                    <p className="mt-3 flex items-start gap-2 text-sm text-accent-400">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {c.check}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Critères */}
      <section id="criteres" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Les critères"
              title="Thermique, acoustique, sécurité, lumière"
              description="Ces exigences ne se règlent pas au même endroit. Savoir laquelle compte le plus pour vous évite de payer ce qui ne changera rien à votre confort."
            />
          </Reveal>
          <dl className="mt-14 grid gap-px bg-ink-950/10 sm:grid-cols-2">
            {criteria.map((c) => (
              <div key={c.title} className="bg-bone p-7 sm:p-8">
                <dt className="font-display text-xl font-medium text-ink-950">{c.title}</dt>
                <dd className="mt-3 leading-relaxed text-ink-600">{c.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Types d'ouverture */}
      <section id="ouvertures" className="scroll-mt-24 bg-bone-deep py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="Types d'ouverture"
              title="Fixe, battant, oscillo-battant ou coulissant"
              description="Le type d'ouverture influence le prix, la ventilation possible et l'entretien. Les pointillés convergent vers le côté des charnières, comme sur un plan de menuisier."
            />
          </Reveal>
          <div className="mt-12">
            <OpeningSchemas />
          </div>

          {/* Passerelle vers la couleur : c'est la question la plus posée
              avant de signer, elle mérite mieux qu'un lien de pied de page. */}
          <Reveal delay={0.1}>
            <Link
              href="/chassis/couleurs"
              className="group mt-14 flex flex-col gap-4 border border-ink-950/15 bg-bone p-7 transition-colors hover:border-ink-950/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  L&apos;autre décision
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-ink-950">
                  Et la couleur ?
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
                  Quelle teinte selon votre façade, une couleur différente à
                  l&apos;intérieur, et pourquoi une teinte foncée n&apos;est pas
                  anodine sur du PVC.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4">
                Couleurs &amp; finitions
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Prix */}
      <section id="prix" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Le budget"
              title="Ce qui fait varier le prix"
              description="Nous n'affichons pas de prix au châssis : le même mot recouvre des produits qui vont du simple au triple. Voici en revanche ce qui déplace réellement le curseur."
            />
          </Reveal>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {priceFactors.map((p) => (
              <div key={p.title}>
                <dt className="font-semibold text-ink-950">{p.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-600">{p.text}</dd>
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

      {/* Erreurs */}
      <section id="erreurs" className="scroll-mt-24 bg-bone-deep py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="06" eyebrow="À éviter" title="Les erreurs que nous voyons le plus" />
          </Reveal>
          <ul className="mt-12 max-w-3xl border-t border-ink-950/15">
            {mistakes.map((m, i) => (
              <Reveal key={m} delay={0.04 * i}>
                <li className="flex gap-5 border-b border-ink-950/15 py-5">
                  <span className="font-display text-lg font-medium text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-ink-600">{m}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Questions */}
      <section id="questions" className="scroll-mt-24 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="07"
              eyebrow="Avant de signer"
              title="Dix questions à poser à votre installateur"
              description="Posez-les à tous vos devis, y compris au nôtre. Un installateur sérieux répond sans hésiter ; un devis qui reste vague sur ces points mérite d'être creusé."
            />
          </Reveal>
          <ol className="mt-12 grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
            {questionsToAsk.map((q, i) => (
              <li key={q} className="flex gap-4 border-b border-ink-950/10 pb-4">
                <span className="font-display text-base font-medium leading-6 text-accent-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-ink-700">{q}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Nos prestations */}
      <section className="bg-bone-deep py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="08" eyebrow="Concrètement" title="Ce que nous réalisons" />
          </Reveal>
          <dl className="mt-12 grid gap-px bg-ink-950/10 sm:grid-cols-2">
            {chassisPrestations.map((p) => (
              <div key={p.title} className="bg-bone p-7">
                <dt className="font-display text-xl text-ink-950">{p.title}</dt>
                <dd className="mt-3 leading-relaxed text-ink-600">{p.description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Primes */}
      <section id="primes" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading index="09" eyebrow="Aides" title="Les primes liées aux châssis" />
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-2xl leading-relaxed text-ink-600">
                Les trois Régions soutiennent le remplacement des menuiseries et des
                vitrages, avec des exigences de performance thermique minimales et des
                calendriers stricts : plusieurs démarches doivent précéder le chantier.
                Nous mentionnons systématiquement les performances sur nos devis, ce qui
                évite un refus pour pièce incomplète.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/primes"
                  className="btn-press group inline-flex items-center justify-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
                >
                  Voir les primes par région
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/chassis/quiz"
                  className="btn-press inline-flex items-center justify-center border border-ink-950/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                >
                  Faire le quiz châssis
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
