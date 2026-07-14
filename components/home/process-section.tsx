import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/content/facts";

/** Le déroulement d'un projet, sur une ligne de chantier horizontale. */
export function ProcessSection() {
  return (
    <section className="border-b border-ink-950/10 py-24 sm:py-32" aria-labelledby="processus">
      <Container>
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="La méthode"
            title="Votre projet en quatre étapes"
            description="Le même déroulement pour chaque chantier. Vous savez toujours où vous en êtes, et ce qui vient ensuite."
          />
        </Reveal>
        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={0.07 * i}>
              <li className="relative border-t-2 border-ink-950 pt-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 h-2 w-2 bg-accent-600"
                />
                <p className="font-display text-5xl text-stone-300" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl text-ink-950">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
