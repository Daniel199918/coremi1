import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { metiers } from "@/content/metiers";

export const metadata: Metadata = {
  title: "Nos solutions — châssis, rénovation et annexes",
  description:
    "Châssis PVC et aluminium, portes, vitrages, rénovation complète, transformation et annexes. La même entreprise pour les travaux et les ouvertures.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Solutions"
        title="Ce que nous réalisons"
        description="Quatre piliers menés par la même entreprise. C'est ce qui nous distingue : là où la rénovation s'arrête et où le châssis commence, il n'y a pas deux sociétés qui se renvoient la responsabilité."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {metiers.map((m, i) => (
              <Reveal key={m.index} delay={0.06 * i}>
                <article>
                  <Link href={m.href} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={m.image}
                        alt={m.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 45vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-6 flex items-baseline gap-4">
                      <span className="annotation text-accent-600">{m.index}</span>
                      <h2 className="font-display text-2xl text-ink-950 group-hover:text-accent-700">
                        {m.title}
                      </h2>
                    </div>
                    <p className="mt-3 leading-relaxed text-ink-600">{m.description}</p>
                    <span className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 group-hover:text-accent-600">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
