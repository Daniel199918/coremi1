import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { CtaSection } from "@/components/home/cta-section";
import { testimonials, testimonialsDisclaimer } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Avis clients",
  description:
    "Ce que les clients de COREMI pensent de nos chantiers de construction, rénovation et pose de châssis à Bruxelles et en Brabant wallon.",
  alternates: { canonical: "/avis" },
};

export default function AvisPage() {
  return (
    <>
      <PageHero
        eyebrow="Avis clients"
        title="Votre confiance, notre priorité"
        description="La satisfaction de nos clients guide notre façon de travailler, du premier rendez-vous à la réception du chantier."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <p className="mb-8 rounded-lg border border-navy-100 bg-navy-50/60 px-5 py-4 text-sm italic text-navy-900/60">
              {testimonialsDisclaimer}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={0.05 * i}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-xl bg-navy-950 p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl font-bold text-white">
                Vous avez travaillé avec COREMI ?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-navy-100/75">
                Votre retour aide d&apos;autres familles à choisir un partenaire de confiance
                pour leur projet. Merci de partager votre expérience !
              </p>
              <a
                href={siteConfig.social.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-700"
              >
                Laisser un avis sur Google
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
