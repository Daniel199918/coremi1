import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GridLines } from "@/components/ui/grid-lines";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site";

/**
 * Conclusion visuelle : grande composition sombre, message manifeste,
 * coordonnées essentielles en bloc technique, transition vers le footer.
 */
export function CtaSection() {
  const { contact } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-ink-950" aria-labelledby="cta-final">
      <GridLines tone="dark" />
      {/* Bandeau image : réalisation réelle en fond de conclusion */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <Image
          src="/images/realisations/villa-jardin-panorama.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/50" />
        <span className="grain" />
      </div>

      <Container className="relative grid gap-14 py-28 sm:py-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="annotation flex items-center gap-4 text-stone-300">
              <span aria-hidden="true" className="h-px w-12 bg-accent-600" />
              Parlons de votre projet
            </p>
            <h2
              id="cta-final"
              className="mt-8 font-display text-[clamp(2.6rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-tight text-bone"
            >
              Un projet en tête ?
              <br />
              <em className="italic text-stone-300">Posons-le sur plan.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-stone-200/85">
              Décrivez votre projet en trois minutes. Nous revenons vers vous avec une
              première réponse claire, puis un devis détaillé si vous souhaitez avancer.
              Sans engagement.
            </p>
            <Link
              href="/contact"
              className="btn-press group mt-10 inline-flex items-center gap-3 bg-accent-600 px-9 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-500"
            >
              Demander un devis gratuit
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>

        {/* Bloc coordonnées, style cartouche de plan */}
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-bone/15 border border-bone/20">
            <div className="px-6 py-5">
              <dt className="annotation text-stone-400">Téléphone</dt>
              <dd className="mt-1.5">
                <a href={contact.phoneHref} className="font-display text-2xl text-bone transition-colors hover:text-accent-400">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div className="px-6 py-5">
              <dt className="annotation text-stone-400">E-mail</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${contact.email}`} className="font-display text-2xl text-bone transition-colors hover:text-accent-400">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="px-6 py-5">
              <dt className="annotation text-stone-400">Zone d&apos;intervention</dt>
              <dd className="mt-1.5 text-stone-200">{siteConfig.serviceArea}</dd>
            </div>
          </dl>
          <p className="annotation mt-3 text-right text-stone-400/80">
            Cartouche · COREMI SPRL
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
