import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GridLines } from "@/components/ui/grid-lines";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Prix & aides — comment se construit un devis de chantier",
  description:
    "Comment un devis de rénovation ou de châssis se construit poste par poste, ce qui fait varier un prix, et la TVA réduite pour les logements anciens.",
  alternates: { canonical: "/prix-et-aides" },
};

/** Les postes qui composent réellement un devis. */
const postes = [
  {
    n: "01",
    t: "La main-d'œuvre",
    d: "Le nombre d'heures par corps de métier, au tarif réel. C'est presque toujours le poste principal — et le premier que l'on gonfle ou que l'on rabote quand un devis est trop rond pour être honnête.",
  },
  {
    n: "02",
    t: "Les matériaux",
    d: "Quantités et références précises. Un devis qui écrit « fourniture et pose de châssis » sans dire quel profilé ni quel vitrage ne vous permet pas de comparer quoi que ce soit.",
  },
  {
    n: "03",
    t: "L'accès et la préparation",
    d: "Échafaudage, protection des lieux, évacuation des gravats, container. Invisible sur le résultat fini, bien réel sur la facture — donc annoncé d'avance chez nous.",
  },
  {
    n: "04",
    t: "Les imprévus de l'existant",
    d: "En rénovation, ce qui est derrière le mur ne se voit qu'une fois ouvert. Nous le disons avant, plutôt que de découvrir un supplément après.",
  },
];

/** Ce qui fait vraiment varier un prix, d'un chantier à l'autre. */
const variables = [
  {
    t: "L'état de l'existant",
    d: "Une maçonnerie saine et une maçonnerie qui doit être reprise n'ont pas le même coût, pour un résultat visuel identique.",
  },
  {
    t: "L'accès au chantier",
    d: "Une façade en rue étroite, un étage sans ascenseur ou un jardin sans passage changent la logistique, donc les heures.",
  },
  {
    t: "Le niveau de finition",
    d: "Le poste travaux varie peu d'une offre à l'autre ; les finitions, énormément. C'est là que se joue l'essentiel de l'écart entre deux devis.",
  },
  {
    t: "Le calendrier",
    d: "Un chantier planifié à l'avance coûte moins cher qu'une intervention à caser en urgence entre deux autres.",
  },
];

export default function PrixEtAidesPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Prix & aides"
        title="Comment se construit un prix"
        description="Nous ne publions pas de tarif au mètre carré : ce serait un chiffre faux pour presque tout le monde. En revanche, voici exactement comment un devis se compose et ce qui le fait varier."
      />

      {/* Pourquoi pas de prix affiché */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  index="01"
                  eyebrow="La transparence"
                  title="Pourquoi aucun prix n'est affiché ici"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-600">
                  <p>
                    Un « prix au m² » vendrait bien, mais il ne veut rien dire :
                    le même volume construit peut varier du simple au double selon
                    l&apos;état de l&apos;existant, l&apos;accès et le niveau de finition.
                  </p>
                  <p>
                    Un devis honnête ne peut donc pas précéder la visite. Ce que
                    nous pouvons faire, en revanche, c&apos;est vous montrer d&apos;avance
                    <em className="italic text-ink-950"> comment il sera construit</em>, pour que
                    vous puissiez le lire — et le comparer à celui du voisin — en
                    sachant ce que vous regardez.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Les postes du devis */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-bone sm:py-28" aria-labelledby="postes">
        <GridLines tone="dark" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Le devis"
              title="Les quatre postes qui composent votre prix"
              description="Chacun est chiffré séparément dans le document que vous recevez. Si une ligne vous paraît obscure, elle est mal écrite : demandez-nous de la détailler."
              tone="dark"
            />
          </Reveal>
          <div className="mt-14 border-t border-bone/15">
            {postes.map((p, i) => (
              <Reveal key={p.n} delay={0.05 * i}>
                <div className="grid gap-x-10 gap-y-3 border-b border-bone/15 py-8 sm:grid-cols-[5rem_1fr]">
                  <span className="font-display text-3xl font-medium leading-none text-accent-500">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-bone">{p.t}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-stone-200/75">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Ce qui fait varier */}
      <section className="py-20 sm:py-28" aria-labelledby="variables">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Les écarts"
              title="Pourquoi deux devis ne se ressemblent jamais"
            />
          </Reveal>
          <dl className="mt-14 grid gap-px bg-ink-950/10 sm:grid-cols-2">
            {variables.map((v, i) => (
              <Reveal key={v.t} delay={0.05 * i}>
                <div className="h-full bg-bone p-8 sm:p-10">
                  <dt className="font-display text-xl font-medium text-ink-950">{v.t}</dt>
                  <dd className="mt-3 leading-relaxed text-ink-600">{v.d}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* TVA et aides */}
      <section className="bg-bone-deep py-20 sm:py-28" aria-labelledby="aides">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  index="04"
                  eyebrow="TVA & aides"
                  title="On monte le dossier avec vous"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <div className="max-w-2xl space-y-5 leading-relaxed text-ink-600">
                  <p>
                    <strong className="font-semibold text-ink-950">La TVA réduite.</strong>{" "}
                    En Belgique, les travaux réalisés dans une habitation privée
                    suffisamment ancienne peuvent relever d&apos;un taux de TVA réduit
                    plutôt que du taux normal, sous conditions liées à l&apos;âge du
                    logement, à son usage et à la nature des travaux. Nous vérifions
                    votre situation avant d&apos;établir le devis, et le taux appliqué y
                    figure noir sur blanc.
                  </p>
                  <p>
                    <strong className="font-semibold text-ink-950">Les aides régionales.</strong>{" "}
                    Bruxelles et la Wallonie soutiennent la rénovation, mais les
                    dispositifs changent régulièrement — certains ont été revus,
                    suspendus ou remplacés par des formules de prêt ces dernières
                    années. Nous ne publions donc volontairement aucun montant ici :
                    il serait périmé avant votre chantier.
                  </p>
                  <p>
                    Ce que nous faisons à la place : au moment de votre devis, nous
                    regardons ensemble ce qui existe réellement pour votre commune,
                    vos revenus et vos travaux, et nous fournissons les documents
                    techniques dont votre dossier a besoin — descriptif détaillé,
                    factures conformes, attestations.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-9 border-l-2 border-accent-600 bg-bone p-6">
                  <p className="text-sm leading-relaxed text-ink-600">
                    <strong className="font-semibold text-ink-950">À vérifier au cas par cas.</strong>{" "}
                    Les taux de TVA et les aides dépendent de votre situation
                    personnelle et de la réglementation en vigueur au moment des
                    travaux. Les informations ci-dessus sont générales et ne
                    constituent pas un engagement : seul le devis fait foi.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <Link
                  href="/devis"
                  className="btn-press group mt-9 inline-flex items-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
                >
                  Demander un devis détaillé
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
