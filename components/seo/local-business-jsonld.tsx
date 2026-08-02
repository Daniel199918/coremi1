import { siteConfig } from "@/content/site";
import { zones } from "@/content/zones";

/**
 * Données structurées Schema.org (GeneralContractor) pour le SEO local :
 * identité, contact, TVA, métiers et liste complète des communes
 * desservies. Profil « entreprise à zone de service » — la rue du siège
 * n'est volontairement pas publiée (voir content/site.ts).
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
    // Nom tel qu'enregistré et tel qu'affiché sur la fiche Google : la
    // cohérence entre les deux aide Google à rattacher site et fiche.
    alternateName: siteConfig.legalName,
    /**
     * sameAs relie le site à ses profils officiels — en premier lieu la
     * fiche Google Business Profile. Sans ce lien, Google traite le site
     * et la fiche comme deux entités séparées.
     */
    ...(() => {
      const profiles = [
        siteConfig.social.googleBusiness,
        siteConfig.social.facebook,
        siteConfig.social.instagram,
      ].filter((u): u is string => Boolean(u));
      return profiles.length > 0 ? { sameAs: profiles } : {};
    })(),
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
    // Toutes les communes réellement couvertes, pour le référencement local.
    areaServed: [
      { "@type": "AdministrativeArea", name: "Brabant wallon" },
      { "@type": "AdministrativeArea", name: "Région de Bruxelles-Capitale" },
      ...zones.map((z) => ({
        "@type": "City" as const,
        name: z.name,
        address: {
          "@type": "PostalAddress" as const,
          addressLocality: z.name,
          postalCode: z.postalCodes[0],
          addressCountry: "BE",
        },
      })),
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
