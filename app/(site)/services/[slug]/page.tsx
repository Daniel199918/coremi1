import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { CtaSection } from "@/components/home/cta-section";
import { getService, services } from "@/content/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} à Bruxelles et en Brabant wallon`,
    description: `${service.excerpt} COREMI intervient à Bruxelles et en Brabant wallon. Devis gratuit et détaillé.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero eyebrow="Nos services" title={service.title} description={service.excerpt} />

      <section className="py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-navy-900/80">{service.description}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-10 font-display text-2xl font-bold text-navy-950">
                Nos prestations
              </h2>
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-navy-900/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <ButtonLink href="/contact" variant="accent" size="lg" className="mt-10">
                Demander un devis gratuit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.12} y={32}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-navy-950/10">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-navy-50/50 py-16 sm:py-20" aria-label="Autres services">
        <Container>
          <h2 className="font-display text-2xl font-bold text-navy-950">
            Nos autres services
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {otherServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
