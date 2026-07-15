"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur d'accent : un point rouge COREMI suit le pointeur avec une
 * légère inertie et s'ouvre en pastille étiquetée au survol des
 * éléments portant `data-cursor="…"`. Décoratif (le curseur natif
 * reste visible), inactif au tactile et en mouvement réduit.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    dot.style.display = "grid";
    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const loop = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.("[data-cursor]");
      const value = target?.getAttribute("data-cursor");
      if (value) {
        dot.dataset.active = "true";
        if (labelRef.current) labelRef.current.textContent = value;
      } else {
        delete dot.dataset.active;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} aria-hidden="true" className="cursor-dot" style={{ display: "none" }}>
      <span ref={labelRef} className="cursor-dot-label" />
    </div>
  );
}
