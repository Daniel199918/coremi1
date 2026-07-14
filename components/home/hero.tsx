import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

/**
 * Hero v3 « Matériaux & Élévations » : composition asymétrique,
 * typographie monumentale à gauche, élévation nocturne pleine hauteur
 * à droite, annotations techniques, entrée animée en CSS pur.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone">
      <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-12">
        {/* Colonne typographique */}
        <div className="relative flex flex-col justify-between px-5 pb-10 pt-14 sm:px-10 lg:col-span-7 lg:min-h-[86svh] lg:py-16">
          <div>
            <p className="rise rise-1 annotation flex items-center gap-4 text-ink-500">
              <span aria-hidden="true" className="h-px w-12 bg-accent-600" />
              Entreprise générale · Bruxelles &amp; Brabant wallon
            </p>

            <h1 className="rise rise-2 mt-10 font-display text-[clamp(2.9rem,7.2vw,7rem)] font-medium leading-[0.98] tracking-tight text-ink-950">
              Bâtir juste,
              <br />
              du gros œuvre
              <br />
              au <em className="italic text-accent-700">dernier châssis.</em>
            </h1>

            <p className="rise rise-3 mt-9 max-w-md text-lg leading-relaxed text-ink-600">
              COREMI construit, rénove et pose vos châssis avec un devis détaillé,
              un interlocuteur unique et des finitions qui tiennent dans le temps.
            </p>

            <div className="rise rise-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-700"
              >
                Demander un devis
              </Link>
              <Link
                href="/realisations"
                className="border border-ink-950/30 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
              >
                Nos réalisations
              </Link>
            </div>
          </div>

          {/* Indicateur de défilement + repères factuels */}
          <div className="mt-14 hidden items-end justify-between lg:flex">
            <ul className="annotation flex gap-10 text-ink-500">
              <li>Devis détaillé gratuit</li>
              <li>Interlocuteur unique</li>
              <li>Gros œuvre → finitions</li>
            </ul>
            <p className="scroll-cue flex items-center gap-2 text-ink-500" aria-hidden="true">
              <ArrowDown className="h-4 w-4" />
              <span className="annotation">Défiler</span>
            </p>
          </div>
        </div>

        {/* Panneau élévation */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[86svh]">
            <Image
              src="/images/hero.jpg"
              alt="Élévation architecturale d'une habitation contemporaine au crépuscule, fenêtres éclairées. Illustration COREMI."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            {/* Liseré corten */}
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent-600" />
            {/* Annotation verticale */}
            <span
              aria-hidden="true"
              className="annotation absolute bottom-8 right-5 hidden text-stone-300 lg:block"
              style={{ writingMode: "vertical-rl" }}
            >
              COREMI · Construction &amp; Châssis
            </span>
          </div>
        </div>
      </div>

      {/* Repères factuels — mobile/tablette */}
      <div className="border-t border-ink-950/10 lg:hidden">
        <ul className="annotation mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-2 px-5 py-4 text-ink-500 sm:px-10">
          <li>Devis détaillé gratuit</li>
          <li>Interlocuteur unique</li>
          <li>Gros œuvre → finitions</li>
        </ul>
      </div>
    </section>
  );
}
