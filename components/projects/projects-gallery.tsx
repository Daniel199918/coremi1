import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { projects, type Project } from "@/content/projects";

/** Cartouche de fiche projet, style légende de plan. */
function ProjectCartouche({ project }: { project: Project }) {
  return (
    <dl className="divide-y divide-ink-950/10 border-y border-ink-950/10 text-sm">
      {/* Lieu et année ne s'affichent que s'ils sont confirmés. */}
      {project.location && (
        <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
          <dt className="annotation leading-5 text-ink-500">Lieu</dt>
          <dd className="text-ink-800">{project.location}</dd>
        </div>
      )}
      {project.year && (
        <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
          <dt className="annotation leading-5 text-ink-500">Année</dt>
          <dd className="text-ink-800">{project.year}</dd>
        </div>
      )}
      <div className="grid grid-cols-[7rem_1fr] gap-3 py-3">
        <dt className="annotation leading-5 text-ink-500">Sur la photo</dt>
        <dd className="text-ink-800">{project.observed}</dd>
      </div>
    </dl>
  );
}

/**
 * Galerie éditoriale : chaque chantier est une fiche à part entière,
 * avec ses photos réelles, son cartouche et sa description factuelle.
 * Pas de grille uniforme : la mise en page suit les images.
 */
export function ProjectsGallery() {
  const [villa, anthracite, entree] = projects;
  if (!villa || !anthracite || !entree) return null;

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Fiche 01 — villa contemporaine, trois photos */}
      <article id={villa.slug} className="scroll-mt-28" aria-labelledby={`titre-${villa.slug}`}>
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="annotation flex items-center gap-4 text-ink-500">
                <span className="text-accent-600">Fiche {villa.index}</span>
                Réalisation COREMI
              </p>
              <h2
                id={`titre-${villa.slug}`}
                className="mt-4 max-w-2xl font-display text-3xl font-medium text-ink-950 sm:text-4xl"
              >
                {villa.title}
              </h2>
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.08}>
          <Tilt max={3} className="mt-10">
            <div className="img-drift frame relative aspect-[2/1] overflow-hidden bg-stone-100">
              <Image
                src={villa.cover.src}
                alt={villa.cover.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </Tilt>
          <p className="annotation mt-3 text-ink-500">
            Élévation jardin — baies toute hauteur sur deux niveaux
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {villa.images.map((image, i) => (
            <Reveal key={image.src} delay={0.06 * (i + 1)} className="lg:col-span-4">
              <Tilt max={6}>
                <div className="img-drift relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className="object-cover"
                  />
                </div>
              </Tilt>
              <p className="annotation mt-3 text-ink-500">
                {i === 0 ? "Allée d'accès — dalles béton sur gravier" : "Angle sud — terrasse composite"}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="leading-relaxed text-ink-600">{villa.description}</p>
            <div className="mt-8">
              <ProjectCartouche project={villa} />
            </div>
          </Reveal>
        </div>
      </article>

      {/* Fiche 02 — maison bardage anthracite */}
      <article
        id={anthracite.slug}
        className="scroll-mt-28 border-t border-ink-950/10 pt-20 sm:pt-24"
        aria-labelledby={`titre-${anthracite.slug}`}
      >
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Tilt max={5}>
              <div className="img-drift relative aspect-[3/2] overflow-hidden bg-stone-100">
                <Image
                  src={anthracite.cover.src}
                  alt={anthracite.cover.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </Tilt>
            <p className="annotation mt-3 text-ink-500">Vue depuis la rue</p>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="annotation flex items-center gap-4 text-ink-500">
                <span className="text-accent-600">Fiche {anthracite.index}</span>
                Réalisation COREMI
              </p>
              <h2
                id={`titre-${anthracite.slug}`}
                className="mt-4 font-display text-3xl font-medium text-ink-950 sm:text-4xl"
              >
                {anthracite.title}
              </h2>
              <p className="mt-6 leading-relaxed text-ink-600">{anthracite.description}</p>
              <div className="mt-8">
                <ProjectCartouche project={anthracite} />
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* Fiche 03 — entrée et menuiseries noires, inversée */}
      <article
        id={entree.slug}
        className="scroll-mt-28 border-t border-ink-950/10 pt-20 sm:pt-24"
        aria-labelledby={`titre-${entree.slug}`}
      >
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="annotation flex items-center gap-4 text-ink-500">
                <span className="text-accent-600">Fiche {entree.index}</span>
                Réalisation COREMI
              </p>
              <h2
                id={`titre-${entree.slug}`}
                className="mt-4 font-display text-3xl font-medium text-ink-950 sm:text-4xl"
              >
                {entree.title}
              </h2>
              <p className="mt-6 leading-relaxed text-ink-600">{entree.description}</p>
              <div className="mt-8">
                <ProjectCartouche project={entree} />
              </div>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2 lg:col-span-7">
            <Tilt max={5}>
              <div className="img-drift relative aspect-[4/3] overflow-hidden bg-stone-100 lg:aspect-[3/2]">
                <Image
                  src={entree.cover.src}
                  alt={entree.cover.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </Tilt>
            <p className="annotation mt-3 text-ink-500">Entrée et porte de garage alignées</p>
          </Reveal>
        </div>
      </article>

      {/* Note de documentation honnête */}
      <Reveal>
        <p className="border-t border-ink-950/10 pt-8 text-sm leading-relaxed text-ink-500">
          D&apos;autres chantiers COREMI sont en cours de documentation photographique.
          Les communes et années indiquées entre crochets seront précisées fiche par fiche.
        </p>
      </Reveal>
    </div>
  );
}
