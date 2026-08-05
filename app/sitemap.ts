import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { zones } from "@/content/zones";

/**
 * Sitemap du site vitrine.
 * Structure prête pour des pages locales par commune : ajouter plus tard
 * des routes /zones/<commune> et les lister ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/solutions", priority: 0.9 },
    { path: "/construction-renovation", priority: 0.9 },
    { path: "/chassis", priority: 0.9 },
    { path: "/solutions/fabricants", priority: 0.8 },
    { path: "/primes", priority: 0.9 },
    { path: "/primes/wallonie", priority: 0.9 },
    { path: "/primes/bruxelles", priority: 0.9 },
    { path: "/primes/flandre", priority: 0.9 },
    { path: "/primes/federal", priority: 0.7 },
    { path: "/primes/methode", priority: 0.6 },
    { path: "/devis", priority: 0.9 },
    { path: "/realisations", priority: 0.8 },
    { path: "/comment-on-travaille", priority: 0.9 },
    { path: "/prix-et-aides", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/avis", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
    { path: "/zones", priority: 0.8 },
    // Une entrée par commune couverte (référencement local).
    ...zones.map((z) => ({ path: `/zones/${z.slug}`, priority: 0.7 })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
