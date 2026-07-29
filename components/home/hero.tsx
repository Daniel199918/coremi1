import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PointerScene } from "@/components/motion/pointer-scene";

/**
 * Hero v6 « visite du chantier » : l'écran reste épinglé pendant le
 * défilement et la caméra voyage dans la réalisation — élévation
 * jardin, puis allée d'accès, puis terrasse — avec zoom continu,
 * légendes synchronisées et rail de progression. Scroll-driven
 * animations CSS pures (@supports) ; repli : hero statique identique
 * à la v5 pour les navigateurs non compatibles, le tactile sans
 * scroll-timeline et prefers-reduced-motion.
 */
export function Hero() {
  return (
    <section className="scrolly relative bg-ink-950" aria-label="COREMI — entreprise générale de construction et de châssis">
      <PointerScene className="scrolly-stage relative flex min-h-[92svh] flex-col overflow-hidden bg-ink-950">
        {/* Vue 01 — élévation jardin (plan lointain, parallaxe pointeur) */}
        <div className="scrolly-a parallax-far absolute inset-0">
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
        </div>

        {/* Vue 02 — l'allée d'accès (on s'avance vers l'entrée) */}
        <div className="scrolly-b absolute inset-0">
          <Image
            src="/images/realisations/villa-allee-entree.jpg"
            alt="Allée d'accès de la villa : dalles de béton sur gravier noir entre deux haies, entrée vitrée double hauteur."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Vue 03 — la terrasse côté séjour */}
        <div className="scrolly-c absolute inset-0">
          <Image
            src="/images/realisations/villa-terrasse-angle.jpg"
            alt="Angle de la villa : rez-de-chaussée vitré toute hauteur ouvert sur la terrasse en lames composites."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Scrims + grain, au-dessus des trois vues */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/25 sm:from-ink-950/90 sm:via-ink-950/30 sm:to-ink-950/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink-950/55 to-transparent lg:block"
        />
        <span aria-hidden="true" className="grain" />

        {/* Composition typographique — s'efface quand la visite commence */}
        <div className="scrolly-copy parallax-near relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-9 pt-24 sm:px-8 lg:pb-12">
          <p className="rise rise-1 annotation flex items-center gap-4 text-stone-200">
            <span aria-hidden="true" className="h-px w-12 bg-accent-500" />
            Entreprise générale · Bruxelles &amp; Brabant wallon
          </p>

          <h1 className="rise rise-2 mt-7 max-w-4xl font-display text-[clamp(2.7rem,6.4vw,6.2rem)] font-medium leading-[1.02] tracking-tight text-bone [text-shadow:0_2px_28px_rgb(18_16_12/0.45)]">
            Bâtir juste, du gros œuvre
            <br className="hidden sm:block" /> au{" "}
            <em className="italic text-accent-400">dernier châssis.</em>
          </h1>

          <p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-stone-200/90">
            COREMI construit, rénove et pose vos châssis avec un devis détaillé,
            un interlocuteur unique et des finitions qui tiennent dans le temps.
          </p>

          <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-press group flex items-center justify-center gap-3 bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-500"
            >
              Demander un devis
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/realisations"
              className="btn-press border border-bone/40 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-bone hover:border-bone hover:bg-bone hover:text-ink-950"
            >
              Nos réalisations
            </Link>
          </div>

          {/* Cartouche : repères factuels + légende de la première vue */}
          <div className="rise rise-4 mt-10 hidden items-end justify-between border-t border-bone/20 pt-5 lg:flex">
            <ul className="annotation flex gap-10 text-stone-300">
              <li>Devis détaillé gratuit</li>
              <li>Interlocuteur unique</li>
              <li>Gros œuvre → finitions</li>
            </ul>
            <p className="annotation flex items-center gap-6 text-stone-300">
              <span>01 — Réalisation COREMI, vue du jardin · [COMMUNE]</span>
              <span className="scroll-cue flex items-center gap-2" aria-hidden="true">
                <ArrowDown className="h-4 w-4" />
                Visiter
              </span>
            </p>
          </div>
          <p className="rise rise-4 annotation mt-8 text-stone-300 lg:hidden">
            01 — Réalisation COREMI, vue du jardin · [COMMUNE]
          </p>
        </div>

        {/* Légendes de la visite (vues 02 et 03) */}
        <div
          aria-hidden="true"
          className="scrolly-cap scrolly-cap-b absolute inset-x-0 bottom-0 z-10"
        >
          <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
            <p className="annotation flex items-center gap-4 text-stone-200">
              <span className="h-px w-12 bg-accent-500" />
              02 — L&apos;allée d&apos;accès
            </p>
            <p className="mt-4 max-w-md font-display text-2xl leading-snug text-bone sm:text-3xl">
              Dalles de béton posées sur gravier, haies taillées :
              l&apos;arrivée fait déjà partie du chantier.
            </p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="scrolly-cap scrolly-cap-c absolute inset-x-0 bottom-0 z-10"
        >
          <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
            <p className="annotation flex items-center gap-4 text-stone-200">
              <span className="h-px w-12 bg-accent-500" />
              03 — La terrasse côté séjour
            </p>
            <p className="mt-4 max-w-md font-display text-2xl leading-snug text-bone sm:text-3xl">
              Le rez vitré toute hauteur s&apos;ouvre de plain-pied
              sur les lames composites.
            </p>
          </div>
        </div>

        {/* Rail de progression de la visite */}
        <div aria-hidden="true" className="scrolly-rail">
          <span className="scrolly-rail-fill" />
        </div>
      </PointerScene>
    </section>
  );
}
