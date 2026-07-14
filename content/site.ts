/**
 * ============================================================
 * Informations de l'entreprise — SOURCE UNIQUE DE VÉRITÉ.
 * ⚠️ DONNÉES TEMPORAIRES À CONFIRMER PAR COREMI avant mise en ligne :
 *    téléphone, e-mail, adresse, horaires, numéro d'entreprise,
 *    liens réseaux sociaux et lien des avis Google.
 * ============================================================
 */

export const siteConfig = {
  name: "COREMI",
  legalName: "COREMI SPRL", // ⚠️ à confirmer (forme juridique exacte)
  tagline: "Construction & Châssis",
  description:
    "Entreprise générale de construction en Belgique : construction, rénovation, châssis et portes, extensions et aménagements extérieurs à Bruxelles et en Brabant wallon.",
  /** URL canonique du site (surchargée par NEXT_PUBLIC_SITE_URL si définie). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://coremi1.vercel.app",

  contact: {
    phone: "0470 12 34 56", // ⚠️ à confirmer
    phoneHref: "tel:+32470123456", // ⚠️ à confirmer
    whatsappHref: "https://wa.me/32470123456", // ⚠️ à confirmer
    email: "info@coremi.be", // ⚠️ à confirmer
    address: {
      street: "Rue de l'Exemple 1", // ⚠️ à confirmer
      postalCode: "1300", // ⚠️ à confirmer
      city: "Wavre", // ⚠️ à confirmer
      country: "Belgique",
    },
    hours: [
      { days: "Lundi – Vendredi", hours: "8h00 – 18h00" }, // ⚠️ à confirmer
      { days: "Samedi", hours: "Sur rendez-vous" }, // ⚠️ à confirmer
    ],
  },

  serviceArea: "Bruxelles et Brabant wallon",
  serviceAreaDetail:
    "Nous intervenons à Bruxelles et dans tout le Brabant wallon : Wavre, Ottignies-Louvain-la-Neuve, Waterloo, Braine-l'Alleud, Nivelles, Jodoigne et leurs environs.",

  /** ⚠️ Liens à confirmer / créer par COREMI. */
  social: {
    facebook: "https://www.facebook.com/", // ⚠️ à confirmer
    instagram: "https://www.instagram.com/", // ⚠️ à confirmer
    googleReviews: "https://g.page/", // ⚠️ lien des avis Google à confirmer
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Avis", href: "/avis" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServiceLinks = [
  { label: "Construction & gros œuvre", href: "/services/construction-gros-oeuvre" },
  { label: "Rénovation", href: "/services/renovation" },
  { label: "Châssis & portes", href: "/services/chassis-portes" },
  { label: "Aménagement extérieur", href: "/services/amenagement-exterieur" },
] as const;
