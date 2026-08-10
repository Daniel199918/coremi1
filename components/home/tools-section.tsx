import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site";

/**
 * Aides à la décision — remplace l'ancien second bloc d'arguments
 * commerciaux, qui répétait mot pour mot les engagements affichés juste
 * au-dessus (devis gratuit, interlocuteur unique).
 *
 * Le benchmark belge d'août 2026 est net sur ce point : les deux
 * principaux acteurs châssis proposent tous les deux un centre d'outils
 * (estimation de budget, recherche de primes, calcul énergétique). Un
 * visiteur qui a répondu à ses propres questions demande un devis de
 * lui-même ; un visiteur à qui on répète qu'on est le meilleur, non.
 *
 * Chaque entrée renvoie vers un outil qui existe réellement. On n'annonce
 * pas ici une estimation chiffrée : elle exigerait les fourchettes de
 * prix réelles de COREMI, qui n'ont pas été fournies.
 */

const tools = [
  {
    step: "01",
    label: "Matériau",
    title: "Quel châssis pour votre maison ?",
    description:
      "Onze questions sur votre logement, vos priorités et vos contraintes. En sortie : le matériau qui tient debout dans votre cas, et pourquoi les autres ont été écartés.",
    href: "/chassis/quiz",
    cta: "Faire le point",
  },
  {
    step: "02",
    label: "Aspect",
    title: "Quelle couleur, quelle finition ?",
    description:
      "La question la plus posée avant de signer, et la plus rarement traitée. Teintes selon la façade, bicoloration intérieur/extérieur, tenue dans le temps du PVC et de l'aluminium.",
    href: "/chassis/couleurs",
    cta: "Voir les repères",
  },
  {
    step: "03",
    label: "Aides",
    title: "À quelles primes pouvez-vous prétendre ?",
    description:
      "Wallonie, Bruxelles et Flandre n'ont ni les mêmes dispositifs ni le même calendrier. Neuf questions pour savoir lesquels regarder, avec les sources officielles et leur date de vérification.",
    href: "/primes",
    cta: "Vérifier ma région",
  },
  {
    step: "04",
    label: "Budget",
    title: "Comment se construit un prix",
    description:
      "Ce que contient réellement un devis, poste par poste, et les huit facteurs qui font varier le montant du simple au double à surface égale. De quoi comparer deux offres sur autre chose que le total.",
    href: "/prix-et-aides",
    cta: "Décomposer un devis",
  },
] as const;

export function ToolsSection() {
  const { contact } = siteConfig;

  return (
    <section className="py-24 sm:py-32" aria-labelledby="outils">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                index="06"
                eyebrow="Avant de nous appeler"
                title="Décidez d'abord, demandez ensuite"
                description="Quatre outils pour répondre vous-même aux questions qui précèdent un devis. Aucun ne demande vos coordonnées."
              />
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 border-t border-ink-950/10 pt-8">
                <p className="text-sm leading-relaxed text-ink-600">
                  Une question à laquelle aucun de ces outils ne répond ? Le plus
                  simple reste un mot direct.
                </p>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press mt-5 inline-flex items-center justify-center gap-3 border border-ink-950/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Écrire sur WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-ink-950/15">
              {tools.map((tool, i) => (
                <Reveal key={tool.href} delay={0.05 * i}>
                  <Link
                    href={tool.href}
                    className="group grid gap-x-8 gap-y-3 border-b border-ink-950/15 py-8 transition-colors hover:bg-bone-deep sm:grid-cols-[8rem_1fr]"
                  >
                    <div>
                      <span className="annotation text-accent-600">{tool.step}</span>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                        {tool.label}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-medium text-ink-950">
                        {tool.title}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-ink-600">
                        {tool.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4">
                        {tool.cta}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
