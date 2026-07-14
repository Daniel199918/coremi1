import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GridLines } from "@/components/ui/grid-lines";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site";

/** Appel à l'action final, typographie surdimensionnée. */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-28 sm:py-36" aria-labelledby="cta-final">
      <GridLines tone="dark" />
      <Container className="relative">
        <Reveal>
          <h2
            id="cta-final"
            className="max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-bone sm:text-6xl"
          >
            Un projet en tête ?
            <br />
            <em className="italic text-stone-300">Parlons-en autour d&apos;un plan.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-200/85">
            Décrivez-nous votre projet. Nous revenons vers vous rapidement avec une
            première réponse claire, puis un devis détaillé si vous souhaitez avancer.
            Sans engagement.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-700"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={siteConfig.contact.phoneHref}
              className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:text-stone-300"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
