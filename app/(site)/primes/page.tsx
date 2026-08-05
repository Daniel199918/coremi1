import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ShieldQuestion } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { PrimeOrientation } from "@/components/primes/prime-orientation";
import {
  categoriesMeta,
  PRIMES_DISCLAIMER,
  PRIMES_LAST_CHECKED,
  regionsMeta,
  schemesByCategory,
  schemesByRegion,
} from "@/content/primes";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Primes & aides 2026 — châssis, vitrage, isolation et rénovation en Belgique",
  description:
    "Centre de référence sur les aides publiques belges pour le remplacement de châssis, le vitrage, l'isolation et la rénovation énergétique : Wallonie, Bruxelles et Flandre, conditions, étapes et sources officielles.",
  alternates: { canonical: "/primes" },
};

export default function PrimesPage() {
  const regions = regionsMeta.filter((r) => r.id !== "federal");
  const federal = regionsMeta.find((r) => r.id === "federal");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Primes & aides", item: `${siteConfig.url}/primes` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        index="04"
        eyebrow="Primes & aides"
        title="Les aides publiques, expliquées sans promesse"
        description="Trois régions, trois systèmes, des règles qui changent souvent. Voici ce qui existe, ce qui conditionne l'accès, ce qui fait échouer un dossier — et où vérifier. Sans montant affiché, parce qu'un chiffre publié ici serait faux pour la plupart des lecteurs."
      />

      {/* Avertissement d'indépendance, avant tout le reste */}
      <section className="border-b border-ink-950/10 bg-bone-deep py-10">
        <Container>
          <div className="flex max-w-3xl items-start gap-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink-950">Service informatif indépendant</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{PRIMES_DISCLAIMER}</p>
              <p className="mt-3 text-sm">
                <strong className="font-semibold text-ink-950">
                  Dernière vérification : {PRIMES_LAST_CHECKED}.
                </strong>{" "}
                <Link
                  href="/primes/methode"
                  className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                >
                  Comment nous vérifions ces informations
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Sélecteur de région */}
      <section className="py-16 sm:py-20" aria-labelledby="regions">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Commencez par votre région"
              title="Les aides dépendent d'abord d'où vous habitez"
              description="Wallonie, Bruxelles et Flandre ont chacune leur système, leur calendrier et leur vocabulaire. Choisissez la vôtre pour voir les dispositifs qui vous concernent."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {regions.map((r, i) => {
              const count = schemesByRegion(r.id).length;
              return (
                <Reveal key={r.id} delay={0.06 * i}>
                  <Link
                    href={`/primes/${r.id}`}
                    className="group flex h-full flex-col border border-ink-950/15 bg-bone p-7 transition-colors hover:border-ink-950 hover:bg-bone-deep"
                  >
                    {/* Repère textuel neutre : pas de logo institutionnel,
                        pour ne jamais suggérer une affiliation officielle. */}
                    <span
                      aria-hidden="true"
                      className="h-1 w-12 bg-accent-600 transition-all group-hover:w-20"
                    />
                    <h3 className="mt-5 font-display text-2xl text-ink-950">{r.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                      {r.authority}
                    </p>
                    <p className="mt-4 flex-1 leading-relaxed text-ink-600">{r.intro}</p>
                    <span className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 group-hover:text-accent-700">
                      {count} dispositif{count > 1 ? "s" : ""} détaillé{count > 1 ? "s" : ""}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {federal && (
            <Reveal delay={0.1}>
              <div className="mt-6 border border-ink-950/15 bg-bone-deep p-7">
                <h3 className="font-display text-xl text-ink-950">{federal.name}</h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-ink-600">{federal.intro}</p>
                <Link
                  href="/primes/federal"
                  className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-accent-600"
                >
                  La TVA réduite en détail
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Simulateur */}
      <section className="bg-bone-deep py-16 sm:py-24" aria-labelledby="orientation">
        <Container>
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Orientation"
              title="Quelles primes pourraient correspondre à mon projet ?"
              description="Neuf questions, aucune coordonnée demandée, aucun montant annoncé. L'outil vous oriente vers les dispositifs pertinents et vous signale ce qui fait le plus souvent échouer un dossier."
            />
          </Reveal>
          <div className="mt-12 max-w-4xl">
            <Reveal delay={0.08}>
              <PrimeOrientation />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Entrée par type de travaux */}
      <section className="py-16 sm:py-24" aria-labelledby="categories">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Par type de travaux"
              title="Vous savez déjà ce que vous voulez faire ?"
            />
          </Reveal>
          <ul className="mt-12 grid gap-px bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-4">
            {categoriesMeta.map((c) => {
              const n = schemesByCategory(c.id).length;
              return (
                <li key={c.id} className="bg-bone p-6">
                  <h3 className="font-display text-lg text-ink-950">{c.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
                    {n} dispositif{n > 1 ? "s" : ""}
                  </p>
                </li>
              );
            })}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-500">
              Les combinaisons de travaux ouvrent souvent plus de droits qu&apos;un poste
              isolé, et l&apos;ordre dans lequel on les réalise compte. C&apos;est une des
              raisons pour lesquelles nous regardons l&apos;ensemble du projet avant de
              chiffrer un seul poste.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Signalement */}
      <section className="bg-ink-950 py-16 text-bone sm:py-20">
        <Container>
          <div className="flex max-w-3xl items-start gap-5">
            <ShieldQuestion className="mt-1 h-6 w-6 shrink-0 text-accent-500" aria-hidden="true" />
            <div>
              <h2 className="font-display text-2xl text-bone">
                Une information vous paraît dépassée ?
              </h2>
              <p className="mt-3 leading-relaxed text-stone-200/80">
                Ces dispositifs bougent vite, et nous préférons être corrigés que laisser
                une erreur en ligne. Si vous constatez qu&apos;une condition a changé ou
                qu&apos;un dispositif a été modifié, écrivez-nous : nous vérifions à la
                source et corrigeons la page.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Signalement — information sur les primes")}`}
                className="btn-press mt-6 inline-flex items-center gap-3 border border-bone/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-bone hover:bg-bone hover:text-ink-950"
              >
                Signaler une information obsolète
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
