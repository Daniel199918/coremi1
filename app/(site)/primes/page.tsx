import type { Metadata } from "next";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { PrimeOrientation } from "@/components/primes/prime-orientation";
import { primeRegions, PRIMES_LAST_CHECKED } from "@/content/primes";

export const metadata: Metadata = {
  title: "Primes et aides pour châssis, vitrages et rénovation en Belgique",
  description:
    "Les aides publiques pour le remplacement de châssis, de vitrages et la rénovation énergétique en Wallonie, à Bruxelles et en Flandre : travaux concernés, conditions principales, étapes et liens vers les sources officielles.",
  alternates: { canonical: "/primes" },
};

export default function PrimesPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Primes & aides"
        title="Les aides publiques, expliquées sans promesse"
        description="Trois régions, trois systèmes, et des règles qui changent souvent. Voici ce qui existe, ce qui conditionne l'accès, et où vérifier — sans montant affiché, parce qu'un chiffre publié ici serait faux pour la plupart des lecteurs."
      />

      {/* Avertissement, avant tout le reste */}
      <section className="border-b border-ink-950/10 bg-bone-deep py-10">
        <Container>
          <div className="flex max-w-3xl items-start gap-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink-950">
                Information donnée à titre indicatif
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Les dispositifs d&apos;aide évoluent régulièrement : montants, conditions,
                périmètre et délais peuvent être modifiés, suspendus ou remplacés. Votre
                éligibilité dépend de votre situation personnelle et doit être confirmée
                auprès de l&apos;administration compétente. Cette page ne constitue ni un
                conseil juridique, ni une garantie d&apos;obtention.{" "}
                <strong className="font-semibold text-ink-950">
                  Dernière vérification auprès des sources officielles : {PRIMES_LAST_CHECKED}.
                </strong>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Outil d'orientation */}
      <section className="py-20 sm:py-24" aria-labelledby="orientation">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Orientation"
              title="Quelles primes pourraient correspondre à mon projet ?"
              description="Cinq questions, aucune donnée transmise, aucun montant annoncé. L'outil vous oriente vers le bon dispositif régional et vous signale les points qui font le plus souvent échouer un dossier."
            />
          </Reveal>
          <div className="mt-12 max-w-4xl">
            <Reveal delay={0.08}>
              <PrimeOrientation />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Une section par région */}
      {primeRegions.map((r, i) => (
        <section
          key={r.id}
          id={r.id}
          className={i % 2 === 0 ? "bg-bone-deep py-20 sm:py-28" : "py-20 sm:py-28"}
          aria-labelledby={`${r.id}-titre`}
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionHeading
                    index={String(i + 2).padStart(2, "0")}
                    eyebrow={r.authority}
                    title={r.region}
                    description={r.summary}
                  />
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-8 border-t border-ink-950/15 pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                      Sources officielles
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {r.sources.map((s) => (
                        <li key={s.href}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                          >
                            {s.label}
                            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-xs text-ink-500">
                      Vérifié le {r.lastChecked}.
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-8">
                {r.alert && (
                  <Reveal>
                    <div className="mb-10 border-l-2 border-accent-600 bg-accent-600/5 p-6">
                      <p className="font-semibold text-ink-950">{r.alert.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{r.alert.text}</p>
                    </div>
                  </Reveal>
                )}

                {/* Travaux concernés */}
                <Reveal delay={0.05}>
                  <h3 id={`${r.id}-titre`} className="font-display text-xl font-medium text-ink-950">
                    Travaux potentiellement concernés
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {r.works.map((w) => (
                      <li
                        key={w}
                        className="border border-ink-950/20 px-4 py-2 text-sm text-ink-700"
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Conditions */}
                <Reveal delay={0.08}>
                  <h3 className="mt-12 font-display text-xl font-medium text-ink-950">
                    Principales conditions
                  </h3>
                  <dl className="mt-4 border-t border-ink-950/15">
                    {r.conditions.map((c) => (
                      <div key={c.title} className="border-b border-ink-950/15 py-5">
                        <dt className="font-semibold text-ink-950">{c.title}</dt>
                        <dd className="mt-1.5 leading-relaxed text-ink-600">{c.text}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                {/* Étapes */}
                <Reveal delay={0.1}>
                  <h3 className="mt-12 font-display text-xl font-medium text-ink-950">
                    Les grandes étapes d&apos;une demande
                  </h3>
                  <ol className="mt-4 space-y-4">
                    {r.steps.map((s, si) => (
                      <li key={s} className="flex gap-4">
                        <span className="font-display text-lg font-medium leading-none text-accent-600">
                          {String(si + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-relaxed text-ink-600">{s}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Ce que nous faisons concrètement */}
      <section className="bg-ink-950 py-20 text-bone sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index="05"
                eyebrow="Notre rôle"
                title="Ce que nous prenons en charge"
                tone="dark"
              />
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-2xl leading-relaxed text-stone-200/80">
                Nous ne montons pas votre dossier à votre place et nous ne promettons
                aucune prime : ce serait vous mentir. En revanche, un dossier échoue
                souvent sur un détail technique, et c&apos;est là que nous sommes utiles.
              </p>
              <ul className="mt-8 border-t border-bone/15">
                {[
                  "Un devis détaillé poste par poste, exploitable tel quel par l'administration.",
                  "Les performances thermiques (valeurs U) des vitrages et menuiseries indiquées noir sur blanc.",
                  "Des factures conformes, avec le descriptif des travaux réellement exécutés.",
                  "Les attestations que nous sommes en mesure de délivrer en tant qu'entreprise.",
                ].map((t) => (
                  <li key={t} className="border-b border-bone/15 py-4 leading-relaxed text-stone-200/85">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
