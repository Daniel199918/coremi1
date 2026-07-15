"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils";

/**
 * Carte 3D : s'incline vers le curseur (perspective réelle) avec un
 * reflet qui suit le pointeur. Variables CSS uniquement (aucun
 * re-render), transform/opacity seulement, inactif au tactile et en
 * mouvement réduit. Styles associés : .tilt-card / .tilt-glare.
 */
export function Tilt({
  className,
  children,
  max = 6,
  glare = true,
}: {
  className?: string;
  children: ReactNode;
  /** Inclinaison maximale en degrés. */
  max?: number;
  /** Reflet radial suivant le curseur. */
  glare?: boolean;
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
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--ry", ((x - 0.5) * 2 * max).toFixed(2));
        el.style.setProperty("--rx", ((0.5 - y) * 2 * max).toFixed(2));
        el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0");
      el.style.setProperty("--ry", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div className="tilt-scene">
      <div
        ref={ref}
        className={cn("tilt-card", glare && "tilt-glare", className)}
        style={{ "--rx": 0, "--ry": 0 } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
