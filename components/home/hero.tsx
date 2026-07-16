import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero « La maison se construit » : l'accueil s'ouvre sur la séquence
 * photographique de construction. Le titre et les CTA restent en
 * place pendant que, au défilement, les six vues du même terrain se
 * fondent l'une dans l'autre — des fondations à la maison finie.
 * Scroll-driven animations CSS pures ; repli (mobile, tablette,
 * prefers-reduced-motion, navigateurs non compatibles) : les six vues
 * empilées en story-board sous le titre.
 *
 * Les images illustrent les étapes d'une construction (mention
 * affichée) — ce n'est pas un chantier COREMI précis. Les vraies
 * réalisations sont dans la page Réalisations.
 */

const frames = [
  { src: "/images/construction/chantier-01.webp", n: "01", title: "Les fondations", sub: "Tout commence par des bases solides." },
  { src: "/images/construction/chantier-02.webp", n: "02", title: "La structure", sub: "Une construction pensée pour durer." },
  { src: "/images/construction/chantier-03.webp", n: "03", title: "Le gros œuvre", sub: "Maîtrisé dans chaque détail." },
  { src: "/images/construction/chantier-04.webp", n: "04", title: "La toiture", sub: "Une protection durable." },
  { src: "/images/construction/chantier-05.webp", n: "05", title: "Les châssis", sub: "Performants, posés avec précision." },
  { src: "/images/construction/chantier-06.webp", n: "06", title: "Votre projet devient réalité", sub: "Livré, propre, prêt à être vécu." },
];

export function Hero() {
  return (
    <section className="chantier relative bg-ink-950 text-bone" aria-label="COREMI — entreprise générale de construction et de châssis">
      <div className="chantier-stage flex flex-col justify-center overflow-clip py-10 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Titre + CTA (restent en place pendant la construction) */}
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="max-w-3xl">
              <p className="rise rise-1 annotation flex items-center gap-4 text-stone-300">
                <span aria-hidden="true" className="h-px w-12 bg-accent-500" />
                Entreprise générale · Bruxelles &amp; Brabant wallon
              </p>
              <h1 className="rise rise-2 mt-6 font-display text-[clamp(2.5rem,5.4vw,5.2rem)] font-medium leading-[1.02] tracking-tight text-bone [text-shadow:0_2px_28px_rgb(15_14_12/0.5)]">
                Bâtir juste, du gros œuvre
                <br className="hidden sm:block" /> au{" "}
                <em className="italic text-accent-400">dernier châssis.</em>
              </h1>
            </div>

            <div className="rise rise-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="btn-press group flex items-center justify-center gap-3 bg-accent-600 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-500"
              >
                Demander un devis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/realisations"
                className="btn-press border border-bone/40 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-bone hover:border-bone hover:bg-bone hover:text-ink-950"
              >
                Nos réalisations
              </Link>
            </div>
          </div>

          {/* Cadre photographique en fondu (mode animé) */}
          <div className="chantier-anim relative mt-8 w-full overflow-clip lg:mt-10">
            <div className="relative aspect-[1306/230] w-full sm:aspect-[1306/188]">
              {frames.map((f, i) => (
                <Image
                  key={f.src}
                  src={f.src}
                  alt={`Étape ${f.n} — ${f.title}. Illustration.`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className={`chantier-f chantier-f${i + 1} object-cover`}
                  priority={i === 0}
                />
              ))}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
              />
            </div>

            {/* Légendes d'étape superposées */}
            <div className="chantier-caps pointer-events-none absolute inset-x-0 bottom-0">
              {frames.map((f, i) => (
                <div key={f.n} className={`chantier-cap chantier-cap${i + 1} px-5 pb-5 sm:px-8 sm:pb-6`}>
                  <div className="flex items-end gap-5">
                    <span className="font-display text-5xl font-medium leading-none text-accent-500 sm:text-7xl">
                      {f.n}
                    </span>
                    <div className="pb-1">
                      <p className="annotation text-stone-300">Étape {f.n}</p>
                      <h2 className="font-display text-2xl font-medium text-bone sm:text-3xl">{f.title}</h2>
                      <p className="mt-1 hidden text-sm text-stone-300 sm:block">{f.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rail de progression */}
            <div aria-hidden="true" className="chantier-rail">
              <span className="chantier-rail-fill" />
            </div>
          </div>

          <p className="annotation mt-4 text-stone-400">
            Illustration des étapes d&apos;une construction · COREMI construit, rénove et pose vos châssis
          </p>

          {/* Repli : story-board empilé (mobile, tablette, reduced-motion) */}
          <ol className="chantier-fallback mt-6 space-y-6">
            {frames.map((f) => (
              <li key={f.n}>
                <div className="relative aspect-[1306/230] w-full overflow-clip sm:aspect-[1306/188]">
                  <Image
                    src={f.src}
                    alt={`Étape ${f.n} — ${f.title}. Illustration des étapes d'une construction.`}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover"
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 px-5 pb-4">
                    <span className="font-display text-4xl font-medium leading-none text-accent-500">{f.n}</span>
                    <div className="pb-0.5">
                      <h2 className="font-display text-xl font-medium text-bone">{f.title}</h2>
                      <p className="mt-0.5 text-sm text-stone-300">{f.sub}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
