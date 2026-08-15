import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { zones, zonesByRegion } from "@/content/zones";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Zones d'intervention — Brabant wallon et Bruxelles",
  description:
    "COREMI intervient dans les 27 communes du Brabant wallon et le sud-est bruxellois : rénovation, transformation, annexes et châssis. Trouvez votre commune.",
  alternates: { canonical: "/zones" },
};

const groupes = [
  {
    region: "Brabant wallon",
    intro:
      "Notre province. Le siège est à Rixensart, ce qui met la quasi-totalité du Brabant wallon à moins de trente kilomètres — un chantier suivi sans perdre la matinée sur la route.",
  },
  {
    region: "Bruxelles-Capitale",
    intro:
      "Le sud-est bruxellois, immédiatement voisin de notre zone. Les communes plus éloignées de la Région restent possibles : demandez-nous.",
  },
];

export default function ZonesPage() {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="Zones d'intervention"
        title="Où nous intervenons"
        description={`${zones.length} communes couvertes en Brabant wallon et dans le sud-est de Bruxelles. Chaque page indique les codes postaux, la distance depuis notre siège et les communes voisines que nous desservons.`}
      />

      {groupes.map((groupe, gi) => {
        const list = zonesByRegion(groupe.region);
        if (list.length === 0) return null;
        return (
          <section key={groupe.region} className={gi === 0 ? "py-20 sm:py-24" : "bg-bone-deep py-20 sm:py-24"}>
            <Container>
              <Reveal>
                <SectionHeading
                  index={String(gi + 1).padStart(2, "0")}
                  eyebrow={`${list.length} communes`}
                  title={groupe.region}
                  description={groupe.intro}
                />
              </Reveal>

              <ul className="mt-12 grid gap-px bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((zone, i) => (
                  <Reveal key={zone.slug} delay={0.02 * i}>
                    <li className="h-full">
                      <Link
                        href={`/zones/${zone.slug}`}
                        className={`group flex h-full items-baseline justify-between gap-4 p-6 transition-colors ${
                          gi === 0 ? "bg-bone hover:bg-bone-deep" : "bg-bone-deep hover:bg-bone"
                        }`}
                      >
                        <span>
                          <span className="block font-display text-xl text-ink-950 group-hover:text-accent-700">
                            {zone.name}
                          </span>
                          <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                            {zone.postalCodes.join(" · ")}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-accent-600"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      <section className="py-16">
        <Container>
          <Reveal>
            <p className="flex max-w-2xl items-start gap-4 text-ink-600">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
              <span>
                Votre commune n&apos;est pas dans la liste ? {siteConfig.serviceArea} reste
                notre zone naturelle, mais nous étudions les projets un peu au-delà
                selon leur ampleur.{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                >
                  Posez-nous la question
                </Link>
                .
              </span>
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
