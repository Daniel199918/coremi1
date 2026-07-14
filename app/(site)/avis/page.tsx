import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Avis clients",
  description:
    "Les avis clients de COREMI, entreprise de construction, rénovation et châssis à Bruxelles et en Brabant wallon.",
  alternates: { canonical: "/avis" },
};

/**
 * Page volontairement honnête : aucun faux avis. Elle renvoie vers les
 * avis Google réels et sera enrichie quand COREMI fournira des retours
 * clients authentiques (avec leur accord).
 */
export default function AvisPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Avis clients"
        title="Ce que nos clients disent de nous"
        description="Nous ne publions aucun avis inventé. Les retours de nos clients se trouvent sur notre fiche Google, écrits par eux, sans filtre."
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col border border-ink-950/10 bg-bone-deep p-10">
              <h2 className="font-display text-3xl text-ink-950">Lire les avis</h2>
              <p className="mt-4 flex-1 leading-relaxed text-ink-600">
                Nos avis clients sont publiés sur Google, où nous ne pouvons ni les
                trier ni les retoucher. C&apos;est la photo la plus fidèle de notre
                travail, chantier après chantier.
              </p>
              <a
                href={siteConfig.social.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-3 bg-ink-950 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-ink-800"
              >
                Voir nos avis Google
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col border border-ink-950/10 p-10">
              <h2 className="font-display text-3xl text-ink-950">Vous avez travaillé avec nous ?</h2>
              <p className="mt-4 flex-1 leading-relaxed text-ink-600">
                Deux minutes de votre temps aident une autre famille à choisir son
                entrepreneur en confiance. Racontez votre chantier tel qu&apos;il
                s&apos;est passé, c&apos;est tout ce que nous demandons.
              </p>
              <a
                href={siteConfig.social.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-3 bg-accent-600 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-700"
              >
                Laisser un avis
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
