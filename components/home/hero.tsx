import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

/**
 * Hero v4 : photo réelle de chantier COREMI en plein écran,
 * composition asymétrique ancrée en bas à gauche, légende de
 * réalisation en cartouche, entrée animée en CSS pur.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col overflow-hidden bg-ink-950">
      {/* Photo plein écran — cadrage dédié par écran */}
      <div className="absolute inset-0">
        <Image
          src="/images/realisations/villa-jardin-panorama.jpg"
          alt="Villa contemporaine réalisée par COREMI : deux niveaux vitrés toute hauteur sous une pergola de toiture, jardin au premier plan."
          fill
          priority
          sizes="100vw"
          className="hidden object-cover sm:block"
        />
        <Image
          src="/images/realisations/villa-jardin-mobile.jpg"
          alt="Villa contemporaine réalisée par COREMI, élévation vitrée côté jardin."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%] sm:hidden"
        />
        {/* Scrim : lisibilité du texte sans éteindre la photo (plus dense sur mobile) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/25 sm:from-ink-950/90 sm:via-ink-950/30 sm:to-ink-950/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink-950/55 to-transparent lg:block"
        />
        <span aria-hidden="true" className="grain" />
      </div>

      {/* Composition typographique ancrée en bas */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-9 pt-24 sm:px-8 lg:pb-12">
        <p className="rise rise-1 annotation flex items-center gap-4 text-stone-200">
          <span aria-hidden="true" className="h-px w-12 bg-accent-500" />
          Entreprise générale · Bruxelles &amp; Brabant wallon
        </p>

        <h1 className="rise rise-2 mt-7 max-w-4xl font-display text-[clamp(2.7rem,6.4vw,6.2rem)] font-medium leading-[1.02] tracking-tight text-bone [text-shadow:0_2px_28px_rgb(18_16_12/0.45)]">
          Bâtir juste, du gros œuvre
          <br className="hidden sm:block" /> au{" "}
          <em className="italic text-stone-200">dernier châssis.</em>
        </h1>

        <p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-stone-200/90">
          COREMI construit, rénove et pose vos châssis avec un devis détaillé,
          un interlocuteur unique et des finitions qui tiennent dans le temps.
        </p>

        <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="btn-press bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-500"
          >
            Demander un devis
          </Link>
          <Link
            href="/realisations"
            className="btn-press border border-bone/40 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-bone hover:border-bone hover:bg-bone hover:text-ink-950"
          >
            Nos réalisations
          </Link>
        </div>

        {/* Cartouche : repères factuels + légende de la photo */}
        <div className="rise rise-4 mt-10 hidden items-end justify-between border-t border-bone/20 pt-5 lg:flex">
          <ul className="annotation flex gap-10 text-stone-300">
            <li>Devis détaillé gratuit</li>
            <li>Interlocuteur unique</li>
            <li>Gros œuvre → finitions</li>
          </ul>
          <p className="annotation flex items-center gap-6 text-stone-300">
            <span>Réalisation COREMI — villa contemporaine · [COMMUNE]</span>
            <span className="scroll-cue flex items-center gap-2" aria-hidden="true">
              <ArrowDown className="h-4 w-4" />
              Défiler
            </span>
          </p>
        </div>
        <p className="rise rise-4 annotation mt-8 text-stone-300 lg:hidden">
          Réalisation COREMI — villa contemporaine · [COMMUNE]
        </p>
      </div>
    </section>
  );
}
