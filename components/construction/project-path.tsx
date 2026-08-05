"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectPaths } from "@/content/construction";
import { cn } from "@/utils";

/**
 * Parcours interactif : le visiteur choisit son type de projet et voit
 * les travaux généralement associés dans l'ordre recommandé, les points
 * d'attention, les aides à vérifier et ce qu'il faut réunir pour obtenir
 * un devis utile.
 *
 * Volontairement sans délai ni budget chiffré : ils dépendent de
 * l'existant, de l'accès et du niveau de finition.
 */
export function ProjectPathExplorer() {
  const [activeId, setActiveId] = useState(projectPaths[0]!.id);
  const active = projectPaths.find((p) => p.id === activeId)!;

  return (
    <div>
      {/* Sélecteur */}
      <div role="tablist" aria-label="Type de projet" className="flex flex-wrap gap-3">
        {projectPaths.map((p) => {
          const selected = p.id === activeId;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panneau-${p.id}`}
              id={`onglet-${p.id}`}
              onClick={() => setActiveId(p.id)}
              className={cn(
                "cursor-pointer border px-5 py-3 text-sm font-semibold transition-colors",
                selected
                  ? "border-accent-600 bg-accent-600 text-white"
                  : "border-ink-950/20 text-ink-700 hover:border-ink-950 hover:bg-bone-deep"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panneau-${active.id}`}
        aria-labelledby={`onglet-${active.id}`}
        className="mt-8 border border-ink-950/15 bg-bone p-7 sm:p-9"
      >
        <p className="max-w-3xl text-lg leading-relaxed text-ink-700">{active.summary}</p>

        <div className="mt-9 grid gap-10 lg:grid-cols-2">
          {/* Ordre des travaux */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Ordre recommandé des travaux
            </h3>
            <ol className="mt-4 border-t border-ink-950/10">
              {active.works.map((w, i) => (
                <li key={w} className="flex gap-4 border-b border-ink-950/10 py-3.5">
                  <span className="font-display text-base font-medium leading-6 text-accent-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-ink-600">{w}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Points d'attention */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Points d&apos;attention
            </h3>
            <ul className="mt-4 space-y-3">
              {active.watchouts.map((w) => (
                <li key={w} className="flex gap-3 leading-relaxed text-ink-600">
                  <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-ink-950/40" />
                  {w}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Aides à vérifier
            </h3>
            <p className="mt-3 leading-relaxed text-ink-600">{active.primes}</p>
            <Link
              href="/primes"
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-accent-600"
            >
              Voir les primes par région
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Préparer le devis */}
        <div className="mt-10 border-t border-ink-950/10 pt-7">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            Pour obtenir un devis utile, réunissez
          </h3>
          <ul className="mt-4 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {active.devisInputs.map((d) => (
              <li key={d} className="flex gap-3 leading-relaxed text-ink-600">
                <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-accent-600" />
                {d}
              </li>
            ))}
          </ul>
          <Link
            href="/devis"
            className="btn-press group mt-7 inline-flex items-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
          >
            Demander un devis pour ce projet
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
