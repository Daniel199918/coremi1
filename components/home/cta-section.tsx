import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site";

/** Grande section d'appel à l'action « demande de devis ». */
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24" aria-labelledby="cta-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-600/10 blur-3xl"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 id="cta-title" className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Un projet en tête ? <span className="text-accent-500">Parlons-en.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-navy-100/80">
            Présentez-nous votre projet et recevez une première réponse adaptée à vos
            besoins, sans engagement.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="accent" size="lg">
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 px-4 py-3 font-semibold text-white transition-colors hover:text-accent-400"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
