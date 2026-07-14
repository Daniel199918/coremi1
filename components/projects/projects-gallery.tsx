"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { projectCategories, projects, type ProjectCategory } from "@/content/projects";
import { cn } from "@/utils";

/** Galerie de réalisations avec filtres par catégorie. */
export function ProjectsGallery() {
  const [filter, setFilter] = useState<ProjectCategory | "tous">("tous");

  const filtered = filter === "tous" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrer les réalisations par catégorie"
        className="flex flex-wrap gap-x-6 gap-y-3 border-b border-ink-950/10 pb-5"
      >
        {projectCategories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setFilter(category.value)}
            aria-pressed={filter === category.value}
            className={cn(
              "cursor-pointer pb-1 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
              filter === category.value
                ? "border-b-2 border-accent-600 text-ink-950"
                : "text-ink-500 hover:text-ink-950"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-ink-500">Aucun projet dans cette catégorie pour le moment.</p>
      )}
    </div>
  );
}
