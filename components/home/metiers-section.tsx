"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { metiers } from "@/content/metiers";

/**
 * Les métiers en liste typographique pure : au survol d'une ligne,
 * la photo du métier flotte et suit le curseur (fenêtre volante,
 * variables CSS + rAF, aucun re-render au mouvement). Inactif au
 * tactile et en mouvement réduit ; la liste reste complète sans JS.
 */
export function MetiersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const float = floatRef.current;
    if (!section || !float) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      const cx = event.clientX;
      const cy = event.clientY;
      raf = requestAnimationFrame(() => {
        float.style.setProperty("--fx", `${cx}px`);
        float.style.setProperty("--fy", `${cy}px`);
      });
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-ink-950/10 bg-bone-deep py-24 sm:py-36"
      aria-labelledby="metiers"
    >
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Ce que nous faisons"
            title="Rénovation, transformation, annexes, châssis"
            description="Quatre piliers, une seule entreprise. Nous travaillons sur des habitations qui existent déjà : les améliorer demande de les comprendre avant de les modifier."
          />
        </Reveal>

        <div className="mt-16 border-t border-ink-950/15">
          {metiers.map((metier, i) => (
            <Reveal key={metier.href + metier.index} delay={0.04 * i}>
              <Link
                href={metier.href}
                data-cursor="Découvrir"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                className="group grid items-center gap-x-8 gap-y-4 border-b border-ink-950/15 py-10 transition-colors hover:bg-bone md:grid-cols-[5rem_1.3fr_1fr_4rem]"
              >
                <span className="annotation text-stone-400 transition-colors group-hover:text-accent-600">
                  {metier.index}
                </span>
                <h3 className="font-display text-3xl font-medium text-ink-950 transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                  {metier.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink-600">
                  {metier.description}
                </p>
                <ArrowRight
                  className="hidden h-5 w-5 justify-self-end text-stone-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-600 md:block"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Fenêtre volante : la photo du métier survolé suit le curseur */}
      <div
        ref={floatRef}
        aria-hidden="true"
        data-show={active !== null || undefined}
        className="metier-float"
        style={{ "--fx": "-999px", "--fy": "-999px" } as CSSProperties}
      >
        {metiers.map((metier, i) => (
          <Image
            key={metier.image + metier.index}
            src={metier.image}
            alt=""
            fill
            sizes="320px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </section>
  );
}
