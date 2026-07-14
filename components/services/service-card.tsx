import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";

/** Carte service uniforme (accueil + page services). */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group relative flex flex-col rounded-xl border border-navy-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-950/5">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950 text-white transition-colors duration-300 group-hover:bg-accent-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
        <Link href={`/services/${service.slug}`} className="focus:outline-none">
          {/* Étend la zone cliquable à toute la carte */}
          <span className="absolute inset-0" aria-hidden="true" />
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-900/70">{service.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
        Découvrir le service
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </article>
  );
}
