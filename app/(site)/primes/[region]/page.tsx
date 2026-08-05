import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GridLines } from "@/components/ui/grid-lines";
import { CtaSection } from "@/components/home/cta-section";
import { SchemeCard } from "@/components/primes/scheme-card";
import {
  getRegion,
  PRIMES_DISCLAIMER,
  PRIMES_LAST_CHECKED,
  regionsMeta,
  schemesByRegion,
  type RegionId,
} from "@/content/primes";
import { siteConfig } from "@/content/site";

type Props = { params: Promise<{ region: string }> };

export function generateStaticParams() {
  return regionsMeta.map((r) => ({ region: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) return {};
  return {
    title: `Primes et aides ${r.name} — châssis, vitrage, isolation et rénovation`,
    description: `Les aides publiques en ${r.shortName} pour le remplacement de châssis, le vitrage, l'isolation et la rénovation énergétique : dispositifs, conditions, documents, étapes et sources officielles. Vérifié le ${PRIMES_LAST_CHECKED}.`,
    alternates: { canonical: `/primes/${r.id}` },
  };
}

export default async function RegionPrimesPage({ params }: Props) {
  const { region } = await params;
  const r = getRegion(region);
  if (!r) notFound();

  const list = schemesByRegion(r.id as RegionId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Primes & aides", item: `${siteConfig.url}/primes` },
      { "@type": "ListItem", position: 3, name: r.name, item: `${siteConfig.url}/primes/${r.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* En-tête régional */}
      <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone-deep">
        <GridLines />
        <Container className="relative py-14 sm:py-20">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500"
          >
            <Link href="/primes" className="hover:text-accent-700">
              Primes &amp; aides
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-accent-600">{r.shortName}</span>
          </nav>

          <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-5xl">
            Primes et aides en {r.shortName}
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
            {r.authority}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{r.intro}</p>

          <a
            href={r.portal.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press mt-8 inline-flex items-center gap-3 border border-ink-950/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
          >
            Portail officiel : {r.portal.label}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </Container>
      </section>

      {/* Alerte régionale */}
      {r.alert && (
        <section className="border-b border-ink-950/10 bg-accent-600/5 py-8">
          <Container>
            <div className="flex max-w-3xl items-start gap-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink-950">{r.alert.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{r.alert.text}</p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Dispositifs */}
      <section className="py-16 sm:py-24" aria-labelledby="dispositifs">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow={`${list.length} dispositif${list.length > 1 ? "s" : ""}`}
              title="Les dispositifs en détail"
              description="Chaque fiche indique son statut, ses conditions, les documents à réunir, les étapes, les erreurs fréquentes et sa source officielle."
            />
          </Reveal>

          <div className="mt-12 space-y-6">
            {list.map((s, i) => (
              <Reveal key={s.id} delay={0.04 * i}>
                <SchemeCard scheme={s} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl border-l-2 border-accent-600 bg-bone-deep p-5 text-sm leading-relaxed text-ink-600">
              {PRIMES_DISCLAIMER}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Autres régions */}
      <section className="bg-bone-deep py-14">
        <Container>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            Autres régions
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {regionsMeta
              .filter((o) => o.id !== r.id)
              .map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/primes/${o.id}`}
                    className="inline-flex items-center gap-3 border border-ink-950/20 px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                  >
                    {o.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
