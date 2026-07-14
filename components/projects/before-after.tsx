"use client";

import { useId, useState } from "react";
import Image from "next/image";

type BeforeAfterProps = {
  before: string;
  beforeAlt: string;
  after: string;
  afterAlt: string;
  className?: string;
};

/**
 * Comparateur avant/après piloté par un <input type="range"> :
 * accessible au clavier et au lecteur d'écran, tactile sur mobile.
 */
export function BeforeAfter({ before, beforeAlt, after, afterAlt, className }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] select-none overflow-hidden">
        {/* Après (fond) */}
        <Image src={after} alt={afterAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        {/* Avant (rogné) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image src={before} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        {/* Ligne de séparation */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-bone shadow-[0_0_12px_rgba(0,0,0,0.4)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-bone text-[0.6rem] font-bold tracking-widest text-ink-950">
            ⇔
          </span>
        </div>
        {/* Étiquettes */}
        <span className="absolute left-4 top-4 bg-ink-950/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-bone">
          Avant
        </span>
        <span className="absolute right-4 top-4 bg-accent-600 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
          Après
        </span>
        {/* Curseur accessible par-dessus */}
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Comparer la photo avant et après travaux"
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-ink-500">
        {beforeAlt} / {afterAlt}. Faites glisser pour comparer.
      </figcaption>
    </figure>
  );
}
