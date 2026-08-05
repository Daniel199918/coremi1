import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { guideCategories, guides, GUIDES_LAST_UPDATED } from "@/content/guides";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Conseils — guides pratiques châssis, primes et rénovation",
  description:
    "Des réponses concrètes aux questions qu'on se pose avant de commander des travaux : prime avant ou après le chantier, PVC ou aluminium, quel vitrage, quels documents conserver, dans quel ordre rénover.",
  alternates: { canonical: "/conseils" },
};

export default function ConseilsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Conseils", item: `${siteConfig.url}/conseils` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        index="05"
        eyebrow="Conseils"
        title="Ce qu'il vaut mieux savoir avant de commander"
        description="Des guides écrits pour être utiles même à quelqu'un qui ne fera jamais appel à nous. Ce sont les questions qu'on nous pose en visite, avec les réponses que nous donnons sur place."
      />

      <section className="py-16 sm:py-24">
        <Container>
          {guideCategories.map((cat, ci) => {
            const list = guides.filter((g) => g.category === cat);
            if (list.length === 0) return null;
            return (
              <div key={cat} className={ci > 0 ? "mt-20" : ""}>
                <Reveal>
                  <SectionHeading
                    index={String(ci + 1).padStart(2, "0")}
                    eyebrow={`${list.length} guide${list.length > 1 ? "s" : ""}`}
                    title={cat}
                  />
                </Reveal>
                <ul className="mt-10 grid gap-6 lg:grid-cols-2">
                  {list.map((g, i) => (
                    <Reveal key={g.slug} delay={0.05 * i}>
                      <li className="h-full">
                        <Link
                          href={`/conseils/${g.slug}`}
                          className="group flex h-full flex-col border border-ink-950/15 bg-bone p-7 transition-colors hover:border-ink-950 hover:bg-bone-deep"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600">
                            {g.readingTime} de lecture
                          </p>
                          <h3 className="mt-3 font-display text-2xl leading-snug text-ink-950">
                            {g.title}
                          </h3>
                          <p className="mt-3 flex-1 leading-relaxed text-ink-600">{g.excerpt}</p>
                          <span className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 group-hover:text-accent-700">
                            Lire le guide
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}

          <Reveal delay={0.1}>
            <p className="mt-16 max-w-2xl text-sm leading-relaxed text-ink-500">
              Guides mis à jour le {GUIDES_LAST_UPDATED}. Pour tout ce qui concerne les
              aides publiques, les informations détaillées et datées se trouvent dans{" "}
              <Link
                href="/primes"
                className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4"
              >
                le centre des primes
              </Link>
              , mis à jour en un seul endroit.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
