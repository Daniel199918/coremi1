import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { testimonials, testimonialsDisclaimer } from "@/content/testimonials";
import { siteConfig } from "@/content/site";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="avis-title">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Avis clients"
            title="La confiance de nos clients"
            description="La satisfaction de nos clients est notre meilleure carte de visite."
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={0.06 * i}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs italic text-navy-900/50">{testimonialsDisclaimer}</p>
            <a
              href={siteConfig.social.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-950 underline decoration-accent-600 decoration-2 underline-offset-4 hover:text-accent-600"
            >
              Voir nos avis sur Google
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
