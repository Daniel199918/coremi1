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
        className="flex flex-wrap gap-2"
      >
        {projectCategories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setFilter(category.value)}
            aria-pressed={filter === category.value}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === category.value
                ? "border-navy-950 bg-navy-950 text-white"
                : "border-navy-200 bg-white text-navy-900/80 hover:border-navy-300 hover:bg-navy-50"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-navy-900/60">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
