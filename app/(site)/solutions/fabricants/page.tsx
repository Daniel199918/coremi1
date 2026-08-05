import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CtaSection } from "@/components/home/cta-section";
import { brandComparison, brands, BRANDS_LAST_CHECKED } from "@/content/brands";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Schüco, Aliplast et Aluprof — comparatif des systèmes de menuiserie",
  description:
    "Comparatif honnête des trois fabricants de menuiseries que nous mettons en œuvre : positionnement, matériaux, esthétique, performances et budget relatif. Sans classement ni chiffres inventés.",
  alternates: { canonical: "/solutions/fabricants" },
};

export default function FabricantsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
      { "@type": "ListItem", position: 3, name: "Fabricants", item: `${siteConfig.url}/solutions/fabricants` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        index="02"
        eyebrow="Les solutions que nous utilisons"
        title="Schüco, Aliplast, Aluprof"
        description="Trois fabricants dont nous mettons les systèmes en œuvre. Aucun n'est « le meilleur » : chacun décline des gammes très différentes, et ce qui décide vraiment du résultat, c'est la gamme retenue, le vitrage et la qualité de la pose."
      />

      {/* Mise au point honnête */}
      <section className="border-b border-ink-950/10 bg-bone-deep py-10">
        <Container>
          <div className="flex max-w-3xl items-start gap-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink-950">Comment lire cette page</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Nous ne publions ici <strong className="font-semibold text-ink-950">aucune
                valeur technique chiffrée</strong> (Uw, décibels, classe de résistance) : elle
                dépend de la gamme exacte, de la configuration, du vitrage et de la pose. Elle
                figure sur votre devis, pour le produit réellement proposé. Nous ne présentons
                pas non plus ces fabricants comme des « partenaires officiels » : ce sont des
                systèmes que nous mettons en œuvre. Positionnements vérifiés le{" "}
                {BRANDS_LAST_CHECKED} sur les sites officiels des fabricants.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Les trois marques */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {brands.map((b, i) => (
              <Reveal key={b.id} delay={0.06 * i}>
                <article id={b.id} className="flex h-full flex-col border border-ink-950/15 bg-bone p-7">
                  <BrandLogo
                    name={b.name}
                    src={b.logo}
                    width={b.logoWidth}
                    height={b.logoHeight}
                    tone={b.logoTone}
                  />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                    {b.origin} · {b.materials.join(" & ")}
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-600">{b.positioning}</p>

                  <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Ce que la marque met en avant
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {b.strengths.map((s) => (
                      <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent-600" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    À vérifier au cas par cas
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {b.toCheck.map((s) => (
                      <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-ink-950/40" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Projets où ça se justifie
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {b.typicalProjects.map((s) => (
                      <li key={s} className="text-sm leading-relaxed text-ink-600">
                        {s}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={b.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                  >
                    Site officiel : {b.source.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparatif */}
      <section className="bg-bone-deep py-16 sm:py-24" aria-labelledby="comparatif">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Comparatif"
              title="Ce qui les distingue vraiment"
              description="« Selon la gamme » revient souvent, et c'est la réponse honnête : comparer deux marques entières sur une seule performance n'aurait aucun sens."
            />
          </Reveal>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Comparatif des positionnements de Schüco, Aliplast et Aluprof
              </caption>
              <thead>
                <tr className="border-b border-ink-950/20">
                  <th scope="col" className="py-4 pr-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                    Critère
                  </th>
                  {brands.map((b) => (
                    <th
                      key={b.id}
                      scope="col"
                      className="py-4 pr-6 font-display text-lg font-medium text-ink-950"
                    >
                      {b.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brandComparison.map((row) => (
                  <tr key={row.axis} className="border-b border-ink-950/10 align-top">
                    <th scope="row" className="py-5 pr-6 font-semibold text-ink-950">
                      {row.axis}
                      {row.note && (
                        <span className="mt-1.5 block text-xs font-normal leading-relaxed text-ink-500">
                          {row.note}
                        </span>
                      )}
                    </th>
                    {brands.map((b) => (
                      <td key={b.id} className="py-5 pr-6 text-sm leading-relaxed text-ink-600">
                        {row.values[b.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl border-l-2 border-accent-600 bg-bone p-5 text-sm leading-relaxed text-ink-600">
              Le facteur le plus déterminant n&apos;apparaît dans aucune colonne : c&apos;est
              la <strong className="font-semibold text-ink-950">pose</strong>. Un système
              haut de gamme mal raccordé au gros œuvre isole moins bien qu&apos;un système
              courant posé correctement. C&apos;est précisément pour cela que nous réalisons
              le mur et la fenêtre.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <Link
              href="/devis"
              className="btn-press group mt-8 inline-flex items-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
            >
              Faire chiffrer mon projet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
