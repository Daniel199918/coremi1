/**
 * ============================================================
 * Informations de l'entreprise — SOURCE UNIQUE DE VÉRITÉ.
 *
 * ✅ CONFIRMÉ : e-mail.
 * ⚠️ À CONFIRMER PAR COREMI : le TÉLÉPHONE (aucun numéro affiché pour
 *    l'instant — voir plus bas), le NUMÉRO D'ENTREPRISE, les horaires,
 *    les réseaux sociaux et le lien des avis Google.
 * ============================================================
 */

export const siteConfig = {
  name: "COREMI",
  legalName: "COREMI SPRL", // ⚠️ à confirmer (SPRL ou SRL depuis la réforme 2019)

  /**
   * ⚠️ Numéro d'entreprise / TVA — À TRANCHER AVANT PUBLICATION.
   * La BCE renvoie 0839.628.733 pour « COREMI SPRL » à Rixensart
   * (Avenue Winston Churchill 8, 1330 — constituée le 26/09/2011),
   * ce qui ne correspond PAS au 0584806948 communiqué. Tant que le bon
   * numéro n'est pas confirmé, rien n'est affiché : mentionner un
   * numéro d'entreprise erroné sur un site commercial n'est pas neutre.
   */
  enterpriseNumber: null as string | null,
  vatNumber: null as string | null,
  tagline: "Construction & Châssis",
  description:
    "COREMI construit, rénove et pose des châssis à Bruxelles et en Brabant wallon. Gros œuvre, extensions, rénovations complètes, châssis PVC et aluminium : un seul interlocuteur, un devis détaillé.",
  /** URL canonique du site (surchargée par NEXT_PUBLIC_SITE_URL si définie). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.coremi.be",

  contact: {
    /**
     * ⚠️ TÉLÉPHONE MANQUANT — volontairement vide.
     * L'ancien « 0470 12 34 56 » était un placeholder qui ressemblait à
     * un vrai numéro belge : un visiteur pouvait appeler un inconnu.
     * Le 0584806948 communiqué n'est pas un format de téléphone belge
     * valide (aucun indicatif ne commence par 05 sur 10 chiffres).
     * Tant qu'il n'est pas confirmé, aucun numéro n'est affiché et les
     * appels à l'action basculent sur l'e-mail.
     */
    phone: "" as string,
    phoneHref: "" as string,
    whatsappHref: "" as string, // ⚠️ à confirmer (dépend du numéro mobile)
    email: "coremi.mietek@gmail.com", // ✅ confirmé
    address: {
      street: "Avenue Winston Churchill 8", // ⚠️ siège BCE — à confirmer si affichable
      postalCode: "1330", // ⚠️ à confirmer
      city: "Rixensart", // ⚠️ à confirmer
      country: "Belgique",
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
