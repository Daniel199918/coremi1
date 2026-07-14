import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <section className="bg-navy-50/50 py-20 sm:py-28" aria-labelledby="services-title">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Nos services"
            title="Un seul partenaire pour tout votre projet"
            description="Du gros œuvre aux finitions extérieures, COREMI couvre l'ensemble des métiers de la construction avec une exigence constante de qualité."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={0.06 * i}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
