import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { CtaSection } from "@/components/home/cta-section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Nos services — construction, rénovation, châssis et extérieurs",
  description:
    "Découvrez les services de COREMI : gros œuvre et extensions, rénovation complète, pose de châssis PVC et aluminium, portes et aménagements extérieurs à Bruxelles et en Brabant wallon.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Quatre métiers, une même exigence"
        description="COREMI réunit les compétences nécessaires pour mener votre projet de bout en bout, du gros œuvre aux aménagements extérieurs."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={0.06 * i}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
