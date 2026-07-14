import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/content/facts";

/**
 * La méthode en « coupe de chantier » : six strates de matériaux
 * empilées, cotées comme un dessin technique. Chaque strate est
 * une phase, de la rencontre à la réception.
 */
export function ProcessSection() {
  const strata = [
    "bg-bone",
    "bg-bone-deep",
    "bg-stone-100",
    "bg-stone-100",
    "bg-bone-deep",
    "bg-bone",
  ];

  return (
    <section className="border-y border-ink-950/10 bg-bone py-24 sm:py-32" aria-labelledby="processus">
      <Container>
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="La méthode"
            title="Votre projet, en six couches"
            description="Comme une coupe de chantier : chaque phase s'appuie sur la précédente. Vous savez toujours où vous en êtes, et ce qui vient ensuite."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Ligne de cote verticale */}
          <span
            aria-hidden="true"
            className="absolute -left-1 top-0 hidden h-full w-px bg-ink-950/25 lg:block"
          />
          <ol className="border border-ink-950/15">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={0.04 * i}>
                <li
                  className={`relative grid gap-3 border-b border-ink-950/15 px-6 py-7 last:border-b-0 sm:px-10 lg:grid-cols-[7rem_16rem_1fr] lg:items-baseline lg:gap-8 ${strata[i]}`}
                >
                  {/* Tiret de cote */}
                  <span aria-hidden="true" className="absolute -left-1 top-1/2 hidden h-px w-3 bg-ink-950/40 lg:block" />
                  <span className="annotation text-accent-700">
                    Phase {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-ink-950">
                    <span className="sr-only">Étape {i + 1} : </span>
                    {step.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-600">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="annotation mt-3 text-right text-ink-500">
            Coupe de principe · de la rencontre à la réception
          </p>
        </div>
      </Container>
    </section>
  );
}
