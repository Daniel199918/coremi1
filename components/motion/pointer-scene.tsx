"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scène à parallaxe de pointeur : expose --px / --py (-1 à 1) en
 * variables CSS sur son conteneur, consommées par les utilitaires
 * .parallax-far / .parallax-near (globals.css). Aucun re-render
 * React au mouvement ; désactivé sans souris et en mouvement réduit.
 */
export function PointerScene({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--px": 0, "--py": 0 } as CSSProperties}>
      {children}
    </div>
  );
}
