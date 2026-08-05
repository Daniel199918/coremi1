import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GridLines } from "@/components/ui/grid-lines";
import { CtaSection } from "@/components/home/cta-section";
import { getGuide, guides } from "@/content/guides";
import { siteConfig } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.excerpt,
    alternates: { canonical: `/conseils/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.excerpt,
      url: `${siteConfig.url}/conseils/${g.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  /* Sommaire construit depuis les titres du guide. */
  const headings = g.body
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ text: b.text, id: b.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Conseils", item: `${siteConfig.url}/conseils` },
          { "@type": "ListItem", position: 3, name: g.title, item: `${siteConfig.url}/conseils/${g.slug}` },
        ],
      },
      {
        "@type": "Article",
        headline: g.title,
        description: g.excerpt,
        dateModified: "2026-08-05",
        author: { "@type": "Organization", name: siteConfig.name },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        mainEntityOfPage: `${siteConfig.url}/conseils/${g.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone-deep">
        <GridLines />
        <Container className="relative py-14 sm:py-20">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500"
          >
            <Link href="/conseils" className="hover:text-accent-700">
              Conseils
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-accent-600">{g.category}</span>
          </nav>

          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.06] tracking-tight text-ink-950 sm:text-5xl">
            {g.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{g.excerpt}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
            {g.readingTime} de lecture · mis à jour le {g.updated}
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sommaire */}
            {headings.length > 1 && (
              <aside className="lg:col-span-4 lg:order-2">
                <nav aria-label="Sommaire du guide" className="lg:sticky lg:top-28">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Sommaire
                  </h2>
                  <ul className="mt-4 space-y-2.5 border-l border-ink-950/15 pl-5">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-sm leading-relaxed text-ink-600 hover:text-accent-700"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}

            {/* Corps */}
            <article className={headings.length > 1 ? "lg:col-span-8 lg:order-1" : "lg:col-span-9"}>
              <div className="max-w-2xl">
                {g.body.map((b, i) => {
                  if (b.type === "h2") {
                    const id = b.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                    return (
                      <h2
                        key={i}
                        id={id}
                        className="mt-12 scroll-mt-28 font-display text-2xl font-medium leading-snug text-ink-950 sm:text-3xl"
                      >
                        {b.text}
                      </h2>
                    );
                  }
                  if (b.type === "p") {
                    return (
                      <p key={i} className="mt-5 text-lg leading-relaxed text-ink-600">
                        {b.text}
                      </p>
                    );
                  }
                  if (b.type === "ul") {
                    return (
                      <ul key={i} className="mt-5 space-y-3">
                        {b.items.map((it) => (
                          <li key={it} className="flex gap-4 text-lg leading-relaxed text-ink-600">
                            <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 bg-accent-600" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (b.type === "ol") {
                    return (
                      <ol key={i} className="mt-5 space-y-4">
                        {b.items.map((it, n) => (
                          <li key={it} className="flex gap-4 text-lg leading-relaxed text-ink-600">
                            <span className="font-display text-base font-medium leading-7 text-accent-600">
                              {String(n + 1).padStart(2, "0")}
                            </span>
                            {it}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="mt-8 flex gap-4 border-l-2 border-accent-600 bg-bone-deep p-5 leading-relaxed text-ink-600"
                    >
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                      <span>{b.text}</span>
                    </p>
                  );
                })}
              </div>

              {/* Maillage interne */}
              <div className="mt-14 max-w-2xl border-t border-ink-950/15 pt-8">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  À lire ensuite
                </h2>
                <ul className="mt-5 space-y-3">
                  {g.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group inline-flex items-center gap-3 font-semibold text-ink-950 hover:text-accent-700"
                      >
                        {r.label}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-500">
                Ce guide est informatif. Les règles relatives aux aides publiques évoluent :
                pour toute démarche, vérifiez auprès de l&apos;administration compétente.{" "}
                <Link
                  href="/primes/methode"
                  className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4"
                >
                  Notre méthode de vérification
                </Link>
              </p>
            </article>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
