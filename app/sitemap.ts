import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

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
    { path: "/construction-renovation", priority: 0.9 },
    { path: "/chassis", priority: 0.9 },
    { path: "/realisations", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/avis", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
