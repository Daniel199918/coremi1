import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site";

/**
 * Hero éditorial plein écran : photo immersive, titre serif surdimensionné,
 * deux actions. Le mot accentué est en italique serif, souligné de rouge.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-ink-950 text-bone">
      {/* Photo plein cadre */}
      <Image
        src="/images/hero.jpg"
        alt="Chantier COREMI, habitation en cours de finition. Photo provisoire à remplacer."
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      {/* Voile de lisibilité */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/20"
      />
      {/* Hairlines de plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 calc(100%/6 - 1px), rgba(251,250,247,0.07) calc(100%/6 - 1px) calc(100%/6))",
        }}
      />

      <Container className="relative pb-16 pt-40 sm:pb-24">
        <Reveal>
          <p className="mb-8 flex min-w-0 items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-200 sm:text-xs sm:tracking-[0.3em]">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent-600" />
            Entreprise générale · {siteConfig.serviceArea}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl xl:text-[5.5rem]">
            Bâtir juste,
            <br />
            du gros œuvre au{" "}
            <em className="italic text-stone-200">
              dernier châssis
              <span aria-hidden="true" className="mt-1 block h-1 w-full max-w-[8ch] bg-accent-600 sm:h-1.5" />
            </em>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-100/90">
            COREMI construit, rénove et pose vos châssis avec un devis détaillé, un
            interlocuteur unique et des finitions qui tiennent dans le temps.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-700"
            >
              Demander un devis
            </Link>
            <Link
              href="/realisations"
              className="border border-bone/30 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-bone hover:text-ink-950"
            >
              Découvrir nos réalisations
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* Règle de pied : trois repères factuels */}
      <div className="relative border-t border-bone/15 bg-ink-950/60 backdrop-blur-sm">
        <Container>
          <ul className="grid grid-cols-1 divide-y divide-bone/10 text-sm text-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              "Devis détaillé gratuit",
              "Un interlocuteur unique",
              "Gros œuvre, rénovation, châssis",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 px-1 py-4 sm:justify-center sm:px-6">
                <span aria-hidden="true" className="h-1 w-1 bg-accent-500" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
