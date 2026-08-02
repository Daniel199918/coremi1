import { siteConfig } from "@/content/site";

/**
 * Données structurées WebSite + Organization.
 * Aide les moteurs à rattacher toutes les pages à une même entité et à
 * afficher le nom du site plutôt que le nom de domaine dans les
 * résultats. Aucune SearchAction déclarée : le site n'a pas de moteur
 * de recherche interne, et en annoncer un qui n'existe pas dessert.
 */
export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "fr-BE",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
