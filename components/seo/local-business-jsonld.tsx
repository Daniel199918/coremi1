import { siteConfig } from "@/content/site";

/**
 * Données structurées Schema.org (GeneralContractor) pour le SEO local.
 * ⚠️ Adresse et téléphone à confirmer dans content/site.ts.
 */
export function LocalBusinessJsonLd() {
  const { contact } = siteConfig;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    image: `${siteConfig.url}/images/og-image.jpg`,
    vatID: siteConfig.vatNumber,
    /**
     * Entreprise « à zone de service » : COREMI se déplace chez ses
     * clients et ne reçoit pas au siège. On ne publie donc pas la rue
     * (schéma recommandé par Google pour ce cas), seulement la commune
     * et le pays, complétés par areaServed ci-dessous.
     */
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.city,
      addressRegion: "Brabant wallon",
      addressCountry: "BE",
    },
    areaServed: [
      { "@type": "City", name: "Bruxelles" },
      { "@type": "AdministrativeArea", name: "Brabant wallon" },
    ],
    knowsAbout: [
      "Construction et gros œuvre",
      "Rénovation et transformation",
      "Extensions",
      "Châssis PVC et aluminium",
      "Portes et vitrages",
      "Aménagements extérieurs",
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
