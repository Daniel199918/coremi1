import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { stats } from "@/content/stats";

/** Chiffres clés — ⚠️ valeurs temporaires à confirmer (voir content/stats.ts). */
export function StatsSection() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20" aria-label="Chiffres clés">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.07 * i}>
              <div className="border-l-2 border-accent-600 pl-5">
                <dd className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm text-navy-100/70">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
