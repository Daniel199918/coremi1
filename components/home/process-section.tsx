import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/content/stats";

export function ProcessSection() {
  return (
    <section className="bg-navy-50/50 py-20 sm:py-28" aria-labelledby="processus-title">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Notre méthode"
            title="Votre projet en quatre étapes"
            description="Un déroulement simple et transparent, pensé pour que vous sachiez toujours où en est votre projet."
            align="center"
          />
        </Reveal>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={0.08 * i}>
              <li className="relative rounded-xl border border-navy-100 bg-white p-7">
                <span
                  className="font-display text-5xl font-bold text-navy-100"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-950">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-900/70">
                  {step.description}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-0 h-1 w-10 rounded-b bg-accent-600"
                />
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
