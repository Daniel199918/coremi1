"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Délai d'apparition en secondes (pour les cascades). */
  delay?: number;
  className?: string;
};

type RevealState = "idle" | "armed" | "shown";

/**
 * Apparition douce au scroll, robuste par construction :
 * - le HTML serveur est VISIBLE (SEO, lecteurs sans JavaScript) ;
 * - après montage, seuls les éléments encore hors écran sont masqués
 *   puis révélés à l'entrée dans le viewport (IntersectionObserver) ;
 * - `prefers-reduced-motion` désactive tout via CSS (globals.css).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Déjà à l'écran au chargement : rester visible, sans animation.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return;

    setState("armed");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
