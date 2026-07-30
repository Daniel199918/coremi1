import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet, CalendarClock, Link2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GridLines } from "@/components/ui/grid-lines";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Comment on travaille — responsabilité unique, aucun acompte",
  description:
    "Gros œuvre et châssis par la même entreprise : une seule responsabilité sur le joint. Aucun acompte avant le début des travaux, paiement à l'avancement, devis détaillé poste par poste.",
  alternates: { canonical: "/comment-on-travaille" },
};

/** Les quatre piliers de la méthode, du plus différenciant au plus attendu. */
const piliers = [
  {
    icon: Link2,
    kicker: "Responsabilité",
    title: "Le mur et la fenêtre sortent de la même entreprise",
    text: "Une entreprise générale sous-traite presque toujours les châssis ; un poseur de châssis, lui, arrive après le maçon. Entre les deux, une zone grise : étanchéité, isolation du dormant, finition du raccord. Chez nous, il n'y a pas de zone grise, parce qu'il n'y a pas deux entreprises.",
  },
  {
    icon: Wallet,
    kicker: "Argent",
    title: "Aucun acompte avant le premier coup de pelle",
    text: "Vous ne payez rien tant que le chantier n'a pas commencé — seule exception, la commande des châssis, qui se fabriquent sur mesure. Ensuite, vous payez par tranches, selon ce qui est réellement réalisé, et le solde à la réception.",
  },
  {
    icon: ShieldCheck,
    kicker: "Protection",
    title: "Assuré, enregistré, vérifiable",
    text: "Depuis la loi du 31 mai 2017, tout entrepreneur qui touche à la stabilité ou à l'étanchéité d'un logement doit couvrir sa responsabilité décennale. Nous le sommes, et notre numéro d'entreprise est public : vous pouvez nous vérifier avant de signer.",
  },
  {
    icon: CalendarClock,
    kicker: "Délais",
    title: "Un planning annoncé, et prévenu s'il bouge",
    text: "Nous fixons les dates avec vous avant de commencer. Un chantier sans aucun imprévu n'existe pas ; ce qui existe, c'est un imprévu annoncé le jour où il apparaît, avec une solution et une nouvelle date — pas trois semaines plus tard.",
  },
];

/** Ce que l'on refuse de faire : la franchise comme preuve. */
const refus = [
  {
    title: "Nous ne démarrons pas sans devis signé",
    text: "Ni « on verra en cours de route », ni accord verbal. Le devis détaillé est le contrat : ce qui n'y figure pas n'est pas dû, et ce qui y figure ne bouge pas sans votre accord écrit.",
  },
  {
    title: "Nous ne travaillons pas sans facture",
    text: "Pas d'arrangement « au noir ». C'est votre protection autant que la nôtre : sans facture, vous n'avez ni garantie, ni recours, ni accès à la TVA réduite ou aux aides.",
  },
  {
    title: "Nous ne prenons pas un chantier que nous ne pouvons pas tenir",
    text: "Si notre planning ne permet pas de vous livrer dans le délai que vous visez, nous vous le disons au premier rendez-vous. Un chantier accepté trop vite est un chantier qui traîne.",
  },
];

export default function CommentOnTravaillePage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Comment on travaille"
        title="Une seule main, donc une seule responsabilité"
        description="Ce que vous signez, ce que vous payez, qui répond quand ça coince. Sans zone grise : c'est la partie du métier que la plupart des entreprises préfèrent laisser floue."
      />

      {/* Les quatre piliers */}
      <section className="py-20 sm:py-28" aria-labelledby="piliers">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Notre méthode"
              title="Quatre engagements, pas des adjectifs"
              description="« Sérieux », « à l'écoute », « professionnel » : tout le monde l'écrit. Voici plutôt ce que nous faisons, concrètement, et que vous pouvez vérifier."
            />
          </Reveal>

          <div className="mt-16 grid gap-px bg-ink-950/10 sm:grid-cols-2">
            {piliers.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={0.06 * i}>
                  <article className="flex h-full flex-col bg-bone p-8 sm:p-10">
                    <div className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-accent-600" aria-hidden="true" />
                      <span className="annotation text-ink-500">{p.kicker}</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-medium leading-snug text-ink-950">
                      {p.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ink-600">{p.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* L'échéancier de paiement, en clair */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-bone sm:py-28" aria-labelledby="paiement">
        <GridLines tone="dark" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  index="02"
                  eyebrow="L'argent"
                  title="Quand exactement vous payez"
                  tone="dark"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-md leading-relaxed text-stone-200/80">
                  C&apos;est la question que tout le monde se pose et que peu de
                  sites osent traiter. La réponse tient en une ligne : vous payez
                  ce qui est fait, après que ce soit fait.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ol className="border-t border-bone/15">
                {[
                  {
                    n: "01",
                    t: "À la signature du devis",
                    d: "Rien. Le devis vous engage sur un prix, pas sur un versement.",
                  },
                  {
                    n: "02",
                    t: "À la commande des châssis",
                    d: "Un acompte, uniquement si votre chantier comprend des châssis : ils sont fabriqués sur mesure à vos dimensions et ne peuvent pas être revendus.",
                  },
                  {
                    n: "03",
                    t: "Pendant le chantier",
                    d: "Des tranches liées à l'avancement réel, annoncées dans le devis. Vous voyez ce que vous payez sur place.",
                  },
                  {
                    n: "04",
                    t: "À la réception",
                    d: "Le solde, une fois que nous avons fait le tour du chantier ensemble et corrigé ce qui devait l'être.",
                  },
                ].map((s, i) => (
                  <Reveal key={s.n} delay={0.05 * i}>
                    <li className="grid gap-x-8 gap-y-2 border-b border-bone/15 py-7 sm:grid-cols-[5rem_1fr]">
                      <span className="font-display text-3xl font-medium leading-none text-accent-500">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-bone">{s.t}</h3>
                        <p className="mt-2 leading-relaxed text-stone-200/75">{s.d}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={0.1}>
                <p className="mt-6 text-sm leading-relaxed text-stone-400">
                  Cette règle existe pour une raison : en Belgique, les services de
                  médiation traitent chaque année des milliers de litiges de chantier,
                  et le conseil le plus répété aux particuliers est de limiter les
                  acomptes. Nous préférons l&apos;appliquer avant qu&apos;on nous le demande.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Ce que nous ne faisons pas */}
      <section className="py-20 sm:py-28" aria-labelledby="refus">
        <Container>
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Nos limites"
              title="Ce que nous refusons de faire"
              description="On juge mieux une entreprise à ce qu'elle refuse qu'à ce qu'elle promet."
            />
          </Reveal>
          <div className="mt-14 border-t border-ink-950/15">
            {refus.map((r, i) => (
              <Reveal key={r.title} delay={0.06 * i}>
                <div className="grid gap-x-10 gap-y-3 border-b border-ink-950/15 py-8 sm:grid-cols-[3rem_1fr]">
                  <span className="annotation text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-ink-950">{r.title}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link
                href="/prix-et-aides"
                className="btn-press group inline-flex items-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
              >
                Comment se construit un prix
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <p className="text-sm text-ink-500">
                Entreprise active à {siteConfig.serviceArea}.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Le déroulé d'un chantier (réutilise les 6 étapes) */}
      <ProcessSection />

      <CtaSection />
    </>
  );
}
