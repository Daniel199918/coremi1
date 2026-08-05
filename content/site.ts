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

  /**
   * Profils officiels. `null` = pas encore fourni : rien n'est affiché
   * et rien n'est déclaré aux moteurs. Ne jamais remettre une URL
   * générique (« https://g.page/ ») en attendant — cela produit un lien
   * mort sur le site et un mauvais signal pour le référencement.
   *
   * googleBusiness : lien court de la fiche Google Business Profile
   * (« Coremi SPRL »). Il relie officiellement le site à la fiche via
   * sameAs — c'est ce qui aide Google à considérer les deux comme une
   * seule et même entreprise.
   * googleReviewLink : lien « Rédiger un avis » de cette même fiche.
   */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    googleBusiness: null as string | null, // ⚠️ à fournir
    googleReviews: null as string | null, // ⚠️ à fournir
  },
} as const;

/**
 * Navigation principale — 5 entrées + le bouton « Demander un devis ».
 *
 * Les pages secondaires ne disparaissent pas : elles sont regroupées
 * sous « Solutions » (les métiers) et « À propos » (l'entreprise, la
 * méthode, les prix, les avis, les zones). Une barre courte se lit ;
 * une barre à huit onglets ne se lit pas et écrase le logo.
 *
 * `description` alimente les sous-menus, sur desktop comme sur mobile.
 */
export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Châssis & portes",
        href: "/chassis",
        description: "PVC, aluminium et bois, portes d'entrée, pose et finitions.",
      },
      {
        label: "Construction & rénovation",
        href: "/construction-renovation",
        description: "Gros œuvre, extensions, transformations, rénovation complète.",
      },
      {
        label: "Schüco, Aliplast, Aluprof",
        href: "/solutions/fabricants",
        description: "Les systèmes que nous mettons en œuvre, comparés sans classement.",
      },
    ],
  },
  { label: "Réalisations", href: "/realisations" },
  { label: "Primes", href: "/primes" },
  { label: "Conseils", href: "/conseils" },
  {
    label: "À propos",
    href: "/a-propos",
    children: [
      {
        label: "L'entreprise",
        href: "/a-propos",
        description: "Qui nous sommes et comment nous travaillons au quotidien.",
      },
      {
        label: "Comment on travaille",
        href: "/comment-on-travaille",
        description: "Responsabilité unique, aucun acompte, échéancier clair.",
      },
      {
        label: "Comment se construit un prix",
        href: "/prix-et-aides",
        description: "La composition d'un devis, poste par poste.",
      },
      {
        label: "Avis clients",
        href: "/avis",
        description: "Les retours publiés sur notre fiche Google.",
      },
      {
        label: "Zones d'intervention",
        href: "/zones",
        description: "Brabant wallon et sud-est bruxellois, commune par commune.",
      },
    ],
  },
] as const;

/** Appel à l'action principal, isolé du reste de la navigation. */
export const primaryCta = { label: "Demander un devis", href: "/devis" } as const;

export const footerServiceLinks = [
  { label: "Châssis PVC & aluminium", href: "/chassis" },
  { label: "Portes & vitrages", href: "/chassis#portes" },
  { label: "Construction & gros œuvre", href: "/construction-renovation" },
  { label: "Rénovation & transformation", href: "/construction-renovation#renovation" },
  { label: "Primes & aides", href: "/primes" },
  { label: "Comment on travaille", href: "/comment-on-travaille" },
] as const;
