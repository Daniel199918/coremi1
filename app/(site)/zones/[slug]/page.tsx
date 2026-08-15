import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GridLines } from "@/components/ui/grid-lines";
import { CtaSection } from "@/components/home/cta-section";
import { metiers } from "@/content/metiers";
import { getZone, getZoneNeighbours, zones } from "@/content/zones";
import { ogImages, siteConfig } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return zones.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZone(slug);
  if (!zone) return {};

  /**
   * Le nom de commune fait varier la longueur : « Ottignies-Louvain-la-Neuve »
   * compte 26 caractères contre 5 pour « Ittre ». Les libellés sont donc
   * calibrés pour que le plus long tienne sous 60 caractères de titre et
   * 155 de description — au-delà, Google tronque et la promesse est coupée
   * en plein milieu.
   */
  /**
   * Le code postal aide au référencement local, mais il ne doit pas
   * pousser le titre au-delà de la coupure de Google. Sur les noms longs
   * (« Ottignies-Louvain-la-Neuve »), on le sacrifie : le nom de commune
   * porte davantage que le code. Le gabarit ajoute « · COREMI ».
   */
  const titreBase = `Rénovation et châssis à ${zone.name}`;
  return {
    title:
      titreBase.length > 44 ? titreBase : `${titreBase} (${zone.postalCodes[0]})`,
    description: `COREMI rénove, transforme et agrandit les habitations à ${zone.name} : châssis, portes et menuiseries extérieures comprises. Un seul interlocuteur.`,
    alternates: { canonical: `/zones/${zone.slug}` },
    openGraph: {
      title: `Rénovation et châssis à ${zone.name} — COREMI`,
      description: `Rénovation, transformation, annexes et châssis à ${zone.name} et dans tout le ${zone.region}.`,
      url: `${siteConfig.url}/zones/${zone.slug}`,
      images: ogImages,
    },
  };
}

export default async function ZonePage({ params }: Props) {
  const { slug } = await params;
  const zone = getZone(slug);
  if (!zone) notFound();

  const neighbours = getZoneNeighbours(zone);
  const isBase = zone.slug === "rixensart";

  /* Données structurées : fil d'Ariane + service local. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Zones d'intervention", item: `${siteConfig.url}/zones` },
          { "@type": "ListItem", position: 3, name: zone.name, item: `${siteConfig.url}/zones/${zone.slug}` },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Rénovation, transformation, annexes et pose de châssis",
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: {
          "@type": "City",
          name: zone.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: zone.name,
            postalCode: zone.postalCodes[0],
            addressCountry: "BE",
          },
        },
        url: `${siteConfig.url}/zones/${zone.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* En-tête local */}
      <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone-deep">
        <GridLines />
        <Container className="relative py-16 sm:py-24">
          <Reveal>
            <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              <Link href="/zones" className="hover:text-accent-700">
                Zones d&apos;intervention
              </Link>
              <span aria-hidden="true">·</span>
              <span className="text-accent-600">{zone.region}</span>
            </nav>

            <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.03] tracking-tight text-ink-950 sm:text-6xl">
              Rénovation, transformation et châssis
              <br className="hidden sm:block" /> à {zone.name}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-600">
              {isBase ? (
                <>
                  {zone.name} ({zone.postalCodes.join(", ")}) est notre commune :
                  c&apos;est ici qu&apos;est établi le siège de COREMI. Autant dire que
                  nous connaissons le terrain, les accès et les habitudes de la
                  commune.
                </>
              ) : (
                <>
                  {zone.name} ({zone.postalCodes.join(", ")}) fait partie de notre zone
                  d&apos;intervention naturelle : environ {zone.fromBase} km séparent la
                  commune de notre siège de Rixensart. Assez proche pour passer sur le
                  chantier sans y consacrer la journée.
                </>
              )}
            </p>

            <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-600" aria-hidden="true" />
                {zone.postalCodes.join(" · ")}
              </li>
              <li>Rénovation + châssis</li>
              <li>{zone.region}</li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/devis"
                className="btn-press group inline-flex items-center justify-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
              >
                Décrire mon projet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href={siteConfig.contact.phoneHref}
                className="btn-press inline-flex items-center justify-center border border-ink-950/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Ce que nous faisons dans la commune */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow={`Ce que nous faisons à ${zone.name}`}
              title="Quatre piliers, une seule entreprise"
              description="C'est le point qui nous distingue localement : les travaux de rénovation et les châssis ne sont pas confiés à deux sociétés différentes. Le raccord entre les deux — là où les chantiers fuient — est notre responsabilité."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {metiers.map((m, i) => (
              <Reveal key={m.index} delay={0.05 * i}>
                <Link href={m.href} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={m.image}
                      alt={m.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-ink-950 group-hover:text-accent-700">
                    {m.title} à {zone.name}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{m.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Repères pratiques locaux */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-bone sm:py-28">
        <GridLines tone="dark" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  index="02"
                  eyebrow="Repères pratiques"
                  title={`Travailler à ${zone.name}`}
                  tone="dark"
                />
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <dl className="border-t border-bone/15">
                {[
                  {
                    t: "Permis d'urbanisme",
                    d: `Extension, changement de châssis en façade, modification de volume : la demande se dépose auprès du service urbanisme de la commune de ${zone.name}, qui applique les règles régionales et son propre règlement communal. Nous préparons les pièces techniques et travaillons avec votre architecte.`,
                  },
                  {
                    t: "Accès et logistique",
                    d: "Nous repérons l'accès avant de chiffrer : largeur de rue, stationnement pour la benne, passage pour l'échafaudage. C'est ce qui fait dérailler les plannings quand personne ne l'a regardé.",
                  },
                  {
                    t: "Suivi du chantier",
                    d: isBase
                      ? "Notre siège est dans la commune : le passage sur chantier ne demande aucun détour."
                      : `Environ ${zone.fromBase} km depuis Rixensart : votre interlocuteur passe sur le chantier sans que cela devienne une expédition.`,
                  },
                ].map((r, i) => (
                  <Reveal key={r.t} delay={0.05 * i}>
                    <div className="grid gap-x-8 gap-y-2 border-b border-bone/15 py-7 sm:grid-cols-[4rem_1fr]">
                      <span className="font-display text-2xl font-medium leading-none text-accent-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <dt className="font-display text-xl text-bone">{r.t}</dt>
                        <dd className="mt-2 leading-relaxed text-stone-200/75">{r.d}</dd>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={0.1}>
                <Link
                  href="/comment-on-travaille"
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-bone hover:text-accent-400"
                >
                  Comment nous travaillons
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Maillage : communes voisines */}
      {neighbours.length > 0 && (
        <section className="py-20 sm:py-24">
          <Container>
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow="À proximité"
                title={`Nous intervenons aussi autour de ${zone.name}`}
              />
            </Reveal>
            <ul className="mt-10 flex flex-wrap gap-3">
              {neighbours.map((n, i) => (
                <Reveal key={n.slug} delay={0.03 * i}>
                  <li>
                    <Link
                      href={`/zones/${n.slug}`}
                      className="inline-flex items-baseline gap-3 border border-ink-950/20 px-5 py-3 text-sm transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                    >
                      <span className="font-semibold">{n.name}</span>
                      <span className="text-xs uppercase tracking-[0.14em] opacity-70">
                        {n.postalCodes[0]}
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1}>
              <Link
                href="/zones"
                className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-accent-600"
              >
                Toutes nos zones d&apos;intervention
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
