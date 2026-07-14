import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/** Bandeau d'introduction des pages intérieures. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 119px, white 119px 120px)",
        }}
      />
      <Container className="relative py-16 sm:py-20">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-500">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/80">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
