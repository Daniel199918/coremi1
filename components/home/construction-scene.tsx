import Image from "next/image";
import { Container } from "@/components/ui/container";

/**
 * « Une annexe prend forme » — séquence photographique au défilement.
 * Six vues du même chantier au coucher du soleil ; elles se fondent
 * l'une dans l'autre pendant que la section reste épinglée, avec grand
 * numéro, légende et rail. Scroll-driven animations CSS pures. Repli
 * (mobile, tablette, prefers-reduced-motion, navigateurs non
 * compatibles) : les six vues empilées et légendées, en story-board.
 *
 * ⚠️ POSITIONNEMENT — la séquence décrit la construction d'une ANNEXE,
 * pas d'une maison neuve : c'est le seul cadre dans lequel COREMI
 * réalise des travaux de construction. Les légendes doivent le refléter
 * explicitement, sinon la section laisse croire à une activité de
 * constructeur. Le mot « fondations » n'est employé qu'ici, parce qu'il
 * décrit réellement le premier poste d'une annexe.
 *
 * Ces images sont une ILLUSTRATION des étapes d'un chantier — pas la
 * documentation d'un chantier COREMI précis (mention affichée).
 */

const frames = [
  { src: "/images/construction/chantier-01.webp", n: "01", title: "Les fondations de l'annexe", sub: "Dimensionnées d'après le sol réellement rencontré." },
  { src: "/images/construction/chantier-02.webp", n: "02", title: "Le volume sort de terre", sub: "Aligné sur la maison existante, pas à côté d'elle." },
  { src: "/images/construction/chantier-03.webp", n: "03", title: "La jonction avec l'existant", sub: "Le point qui décide de tout le reste." },
  { src: "/images/construction/chantier-04.webp", n: "04", title: "La toiture et l'étanchéité", sub: "Raccordée à la couverture d'origine." },
  { src: "/images/construction/chantier-05.webp", n: "05", title: "Les châssis", sub: "Posés et raccordés par nos équipes." },
  { src: "/images/construction/chantier-06.webp", n: "06", title: "La pièce en plus", sub: "Livrée, propre, prête à être vécue." },
];

export function ConstructionScene() {
  return (
    <section
      className="chantier relative bg-ink-950 text-bone"
      aria-labelledby="chantier-titre"
    >
      <div className="chantier-stage flex flex-col justify-center overflow-clip py-16 sm:py-20">
        <Container>
          {/* En-tête */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
            <div>
              <p className="annotation flex items-center gap-4 text-stone-300">
                <span className="h-px w-12 bg-accent-500" />
                03 · Agrandir plutôt que déménager
              </p>
              <h2
                id="chantier-titre"
                className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-bone sm:text-5xl"
              >
                Une annexe se construit,
                <br className="hidden sm:block" /> étape par étape.
              </h2>
            </div>
            <p className="annotation max-w-[16rem] text-right text-stone-400">
              Illustration des étapes d&apos;une annexe
            </p>
          </div>

          {/* Cadre photographique en fondu (mode animé) */}
          <div className="chantier-anim relative w-full overflow-clip">
            <div className="relative aspect-[1306/220] w-full sm:aspect-[1306/172]">
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
              {/* Voile bas pour asseoir la légende */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
              />
            </div>

            {/* Légendes superposées (une par étape) */}
            <div className="chantier-caps pointer-events-none absolute inset-x-0 bottom-0">
              {frames.map((f, i) => (
                <div
                  key={f.n}
                  className={`chantier-cap chantier-cap${i + 1} px-5 pb-6 sm:px-8 sm:pb-8`}
                >
                  <div className="flex items-end gap-5">
                    <span className="font-display text-5xl font-medium leading-none text-accent-500 sm:text-7xl">
                      {f.n}
                    </span>
                    <div className="pb-1">
                      <h3 className="font-display text-2xl font-medium text-bone sm:text-3xl">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm text-stone-300 sm:text-base">{f.sub}</p>
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

          {/* Repli : story-board empilé (mobile, tablette, reduced-motion) */}
          <ol className="chantier-fallback mt-4 space-y-8">
            {frames.map((f) => (
              <li key={f.n}>
                <div className="relative aspect-[1306/220] w-full overflow-clip sm:aspect-[1306/172]">
                  <Image
                    src={f.src}
                    alt={`Étape ${f.n} — ${f.title}. Illustration des étapes d'une construction.`}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 px-5 pb-4">
                    <span className="font-display text-4xl font-medium leading-none text-accent-500">
                      {f.n}
                    </span>
                    <div className="pb-0.5">
                      <h3 className="font-display text-xl font-medium text-bone">{f.title}</h3>
                      <p className="mt-0.5 text-sm text-stone-300">{f.sub}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
