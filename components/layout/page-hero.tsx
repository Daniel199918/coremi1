import { Container } from "@/components/ui/container";
import { GridLines } from "@/components/ui/grid-lines";
import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

/** Bandeau d'introduction éditorial des pages intérieures (fond clair). */
export function PageHero({ index, eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink-950/10 bg-bone-deep">
      <GridLines />
      <Container className="relative py-16 sm:py-24">
        <Reveal>
          {(index || eyebrow) && (
            <p className="mb-6 flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-500">
              {index && <span className="text-accent-600">{index}</span>}
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.03] tracking-tight text-ink-950 sm:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-600">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
