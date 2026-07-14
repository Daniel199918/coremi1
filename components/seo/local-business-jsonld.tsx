import { siteConfig } from "@/content/site";
import { services } from "@/content/services";

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
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressCountry: "BE",
    },
    areaServed: [
      { "@type": "City", name: "Bruxelles" },
      { "@type": "AdministrativeArea", name: "Brabant wallon" },
    ],
    knowsAbout: services.map((s) => s.title),
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
