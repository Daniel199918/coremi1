import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/utils";

/** Carte réalisation éditoriale : grande photo, légende de plan. */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn("group", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-4 border-b border-ink-950/10 py-4">
        <div>
          <h3 className="font-display text-xl text-ink-950">{project.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            {project.workType}
          </p>
        </div>
        <p className="shrink-0 text-sm text-ink-500">{project.location}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{project.description}</p>
    </article>
  );
}
