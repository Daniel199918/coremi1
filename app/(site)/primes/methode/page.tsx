import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import {
  PRIMES_DISCLAIMER,
  PRIMES_LAST_CHECKED,
  primesChangelog,
  regionsMeta,
  statusLabels,
} from "@/content/primes";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Comment nous vérifions les informations sur les primes",
  description:
    "Notre méthode de vérification des aides publiques belges : sources officielles utilisées, règles de rédaction, signification des statuts, date de dernière vérification et historique des changements.",
  alternates: { canonical: "/primes/methode" },
};

const regles = [
  {
    title: "Aucun montant chiffré n'est publié",
    text: "Les barèmes dépendent des revenus, du statut du demandeur, du bâtiment et de la date. Un chiffre affiché ici serait faux pour la majorité des lecteurs et périmé en quelques mois. Nous décrivons la méthode de calcul, jamais le résultat.",
  },
  {
    title: "Aucune condition n'est présentée comme garantie",
    text: "Nous décrivons des mécanismes et renvoyons systématiquement à l'administration compétente, seule habilitée à confirmer une éligibilité.",
  },
  {
    title: "Seules les sources officielles font référence",
    text: "Portails régionaux de l'énergie et du logement, guichets officiels, administrations. Les articles de presse et les sites commerciaux peuvent signaler un changement, mais ne servent jamais de source à ce qui est publié ici.",
  },
  {
    title: "Les valeurs techniques ne sont citées que si elles sont vérifiées",
    text: "Lorsqu'une valeur (seuil, valeur U, plafond) n'a pas pu être lue sur la source officielle au moment de la vérification, nous restons qualitatifs et renvoyons au portail plutôt que de recopier un chiffre trouvé ailleurs.",
  },
  {
    title: "Chaque dispositif porte un statut et une date",
    text: "Le statut indique si le dispositif est ouvert, en cours de réforme, suspendu, clôturé ou incertain. La date de vérification permet de juger de la fraîcheur de l'information.",
  },
  {
    title: "Les informations vivent en un seul endroit",
    text: "Toutes les données sensibles sont centralisées dans un fichier unique du projet, pas dispersées dans les pages. Une mise à jour se fait donc une seule fois, et se répercute partout — y compris dans l'outil d'orientation.",
  },
];

export default function MethodePrimesPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Primes & aides"
        title="Comment nous vérifions ces informations"
        description="Publier des informations sur les aides publiques engage : mal informé, un lecteur peut perdre plusieurs milliers d'euros. Voici donc précisément d'où viennent nos informations et ce que nous nous interdisons."
      />

      {/* Date + avertissement */}
      <section className="border-b border-ink-950/10 bg-bone-deep py-10">
        <Container>
          <div className="max-w-3xl">
            <p className="font-display text-2xl text-ink-950">
              Dernière vérification complète : {PRIMES_LAST_CHECKED}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{PRIMES_DISCLAIMER}</p>
          </div>
        </Container>
      </section>

      {/* Règles de rédaction */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Nos règles"
              title="Ce que nous nous interdisons"
            />
          </Reveal>
          <dl className="mt-12 grid gap-px bg-ink-950/10 sm:grid-cols-2">
            {regles.map((r) => (
              <div key={r.title} className="bg-bone p-7">
                <dt className="font-display text-xl text-ink-950">{r.title}</dt>
                <dd className="mt-3 leading-relaxed text-ink-600">{r.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Signification des statuts */}
      <section className="bg-bone-deep py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading index="02" eyebrow="Lecture des fiches" title="Ce que signifient les statuts" />
          </Reveal>
          <dl className="mt-10 max-w-3xl border-t border-ink-950/15">
            {(
              [
                ["actif", "Le dispositif était ouvert aux demandes au moment de la vérification."],
                ["modifie", "Ouvert, mais une réforme est actée ou en cours : les conditions vont changer."],
                ["suspendu", "Temporairement fermé aux nouvelles demandes."],
                ["termine", "Clôturé, plus aucune demande possible."],
                ["a-verifier", "Annoncé ou incertain : à confirmer auprès de l'administration avant de s'y fier."],
              ] as const
            ).map(([key, text]) => (
              <div key={key} className="grid gap-x-8 gap-y-1 border-b border-ink-950/15 py-4 sm:grid-cols-[9rem_1fr]">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
                  {statusLabels[key]}
                </dt>
                <dd className="leading-relaxed text-ink-600">{text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Sources */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="03" eyebrow="Sources" title="Les portails que nous consultons" />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {regionsMeta.map((r) => (
              <li key={r.id} className="border border-ink-950/15 p-6">
                <h3 className="font-display text-xl text-ink-950">{r.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                  {r.authority}
                </p>
                <a
                  href={r.portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                >
                  {r.portal.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Historique */}
      <section className="bg-ink-950 py-16 text-bone sm:py-20">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Historique"
            title="Changements importants suivis"
            tone="dark"
          />
          <ol className="mt-10 max-w-3xl border-t border-bone/15">
            {primesChangelog.map((c) => (
              <li key={c.date + c.region} className="grid gap-x-8 gap-y-2 border-b border-bone/15 py-5 sm:grid-cols-[12rem_1fr]">
                <div>
                  <p className="font-semibold text-accent-500">{c.date}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-400">{c.region}</p>
                </div>
                <p className="leading-relaxed text-stone-200/85">{c.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 max-w-3xl border-t border-bone/15 pt-8">
            <h3 className="font-display text-2xl text-bone">Vous constatez une erreur ?</h3>
            <p className="mt-3 leading-relaxed text-stone-200/80">
              Nous préférons être corrigés que laisser une information dépassée en ligne.
              Signalez-la, nous vérifions à la source et mettons la page à jour.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Signalement — information sur les primes")}`}
              className="btn-press mt-6 inline-flex items-center gap-3 border border-bone/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-bone hover:bg-bone hover:text-ink-950"
            >
              Signaler une information obsolète
            </a>
            <p className="mt-6">
              <Link
                href="/primes"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-500 hover:text-accent-400"
              >
                ← Retour au centre des primes
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
