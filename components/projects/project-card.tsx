import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Project } from "@/content/projects";

/** Carte réalisation avec zoom photo discret au survol. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-950/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-md bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {project.workType}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-navy-950">{project.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-navy-900/60">
          <MapPin className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
          {project.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy-900/70">{project.description}</p>
      </div>
    </article>
  );
}
