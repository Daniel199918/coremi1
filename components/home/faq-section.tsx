import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Faq } from "@/components/ui/faq";
import { faq } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="border-t border-ink-950/10 bg-bone-deep py-24 sm:py-32" aria-labelledby="faq">
      <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <SectionHeading
            index="08"
            eyebrow="Questions fréquentes"
            title="Vous vous demandez sûrement…"
            description="Les questions qu'on nous pose à chaque premier rendez-vous. La vôtre n'y est pas ? Appelez-nous."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Faq items={faq} />
        </Reveal>
      </Container>
    </section>
  );
}
