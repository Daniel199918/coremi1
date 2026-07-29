import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { GridLines } from "@/components/ui/grid-lines";
import { engagements } from "@/content/facts";

/** Réassurance sur fond anthracite : engagements concrets, aucun chiffre inventé. */
export function EngagementsSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32" aria-labelledby="engagements">
      <GridLines tone="dark" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Nos engagements"
            title="Ce que nous vous devons, noir sur blanc"
            tone="dark"
          />
        </Reveal>
        <dl className="mt-16 grid gap-px bg-bone/10 sm:grid-cols-2">
          {engagements.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <div className="h-full bg-ink-950 p-8 sm:p-10">
                <dt className="flex items-baseline gap-4 font-display text-2xl text-bone">
                  <span className="text-sm font-sans font-semibold tracking-widest text-accent-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </dt>
                <dd className="mt-4 leading-relaxed text-stone-200/80">{item.description}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
