/**
 * ============================================================
 * Informations de l'entreprise — SOURCE UNIQUE DE VÉRITÉ.
 *
 * ✅ CONFIRMÉ : téléphone, e-mail, numéro d'entreprise / TVA, adresse.
 * ⚠️ RESTE À CONFIRMER : horaires, réseaux sociaux, lien des avis Google.
 * ============================================================
 */

export const siteConfig = {
  name: "COREMI",
  legalName: "COREMI SPRL", // ⚠️ SPRL ou SRL depuis la réforme 2019 — à confirmer
  enterpriseNumber: "0839.628.733", // ✅ confirmé (BCE)
  vatNumber: "BE 0839.628.733", // ✅ confirmé (BCE)
  tagline: "Construction & Châssis",
  description:
    "COREMI construit, rénove et pose des châssis à Bruxelles et en Brabant wallon. Gros œuvre, extensions, rénovations complètes, châssis PVC et aluminium : un seul interlocuteur, un devis détaillé.",
  /** URL canonique du site (surchargée par NEXT_PUBLIC_SITE_URL si définie). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coremi.be",

  contact: {
    phone: "0484 80 69 48" as string, // ✅ confirmé
    phoneHref: "tel:+32484806948" as string, // ✅ confirmé
    whatsappHref: "https://wa.me/32484806948" as string, // ✅ confirmé
    email: "coremi.mietek@gmail.com", // ✅ confirmé

    /**
     * Siège social. `showPublicly: false` — COREMI intervient chez ses
     * clients et ne reçoit pas à cette adresse : elle est donc masquée
     * des pages commerciales (footer, contact) au profit de la zone
     * d'intervention.
     *
     * ⚠️ Elle reste affichée sur /mentions-legales : le droit belge
     * (livre XII du Code de droit économique, transposant la directive
     * 2000/31/CE) impose de rendre accessible l'adresse géographique
     * d'établissement du prestataire. La masquer partout exposerait
     * l'entreprise.
     */
    address: {
      street: "Avenue Winston Churchill 8",
      postalCode: "1330",
      city: "Rixensart",
      country: "Belgique",
      showPublicly: false,
    },
    hours: [
      { days: "Lundi à vendredi", hours: "8 h – 18 h" }, // ⚠️ à confirmer
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

/**
 * Navigation principale. `short` est le libellé utilisé dans la barre du
 * haut, où la place est comptée ; `label` sert au menu mobile, au footer
 * et partout où la ligne peut respirer.
 */
export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Construction & Rénovation", short: "Construction", href: "/construction-renovation" },
  { label: "Châssis", href: "/chassis" },
  { label: "Nos chantiers", href: "/realisations" },
  { label: "Comment on travaille", short: "Notre méthode", href: "/comment-on-travaille" },
  { label: "Prix & aides", href: "/prix-et-aides" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerServiceLinks = [
  { label: "Construction & gros œuvre", href: "/construction-renovation" },
  { label: "Rénovation & transformation", href: "/construction-renovation#renovation" },
  { label: "Châssis PVC & aluminium", href: "/chassis" },
  { label: "Portes & vitrages", href: "/chassis#portes" },
  { label: "Comment on travaille", href: "/comment-on-travaille" },
  { label: "Prix & aides", href: "/prix-et-aides" },
] as const;
