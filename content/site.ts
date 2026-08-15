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
  tagline: "Rénovation & Châssis", // ⚠️ le fichier du logo porte encore « Construction & Châssis » : image à refaire
  description:
    "COREMI rénove, transforme et agrandit les habitations à Bruxelles et en Brabant wallon, avec une spécialité : les châssis, portes et menuiseries extérieures. Un seul interlocuteur, un devis détaillé.",
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

/**
 * Navigation principale — six entrées, trois menus déroulants.
 *
 * Deux corrections issues du benchmark belge d'août 2026 :
 *
 * 1. « Châssis & portes » remonte au premier niveau. C'est la page qui
 *    porte la demande ; elle était enfouie sous un libellé « Solutions »
 *    qui n'évoque rien pour un particulier. Les deux principaux acteurs
 *    belges donnent au contraire un accès direct à chaque famille de
 *    produit depuis l'en-tête.
 * 2. « Comment se construit un prix » sort de « À propos ». Le prix est
 *    l'une des premières questions d'un visiteur : elle n'a rien à faire
 *    sous un onglet qui parle de l'entreprise. Elle rejoint les primes,
 *    avec lesquelles elle forme un seul vrai sujet — le budget.
 *
 * « Accueil » est retiré : le logo remplit déjà ce rôle, et la place
 * libérée sert à une entrée utile.
 *
 * ⚠️ LONGUEUR DES LIBELLÉS — contrainte mesurée, pas théorique.
 * Avec « Châssis & portes », « Construction & rénovation » et
 * « L'entreprise », la barre dépassait la largeur de la fenêtre à 1024,
 * 1280 et 1440 px : le bouton « Demander un devis » se retrouvait hors
 * écran. Ces libellés sont donc volontairement courts. Avant d'en
 * rallonger un, vérifier le rendu à 1280 px.
 */
export const navigation: NavItem[] = [
  {
    label: "Châssis",
    href: "/chassis",
    children: [
      {
        label: "Matériaux et pose",
        href: "/chassis",
        description: "PVC, aluminium et bois : ce que chacun règle, et ce qu'il coûte ailleurs.",
      },
      {
        label: "Couleurs & finitions",
        href: "/chassis/couleurs",
        description: "Quelle teinte selon votre façade, bicoloration, tenue dans le temps.",
      },
      {
        label: "Schüco, Aliplast, Aluprof",
        href: "/solutions/fabricants",
        description: "Les systèmes que nous mettons en œuvre, comparés sans classement.",
      },
      {
        label: "Quiz : quel châssis ?",
        href: "/chassis/quiz",
        description: "Onze questions pour dégager le matériau qui tient dans votre cas.",
      },
    ],
  },
  { label: "Rénovation", href: "/construction-renovation" },
  { label: "Réalisations", href: "/realisations" },
  {
    label: "Primes & prix",
    href: "/primes",
    children: [
      {
        label: "Primes par région",
        href: "/primes",
        description: "Wallonie, Bruxelles et Flandre, avec sources officielles et dates.",
      },
      {
        label: "Comment se construit un prix",
        href: "/prix-et-aides",
        description: "La composition d'un devis, poste par poste.",
      },
      {
        label: "Comment nous vérifions",
        href: "/primes/methode",
        description: "D'où viennent ces informations et quand elles ont été contrôlées.",
      },
    ],
  },
  { label: "Conseils", href: "/conseils" },
  {
    label: "Entreprise",
    href: "/a-propos",
    children: [
      {
        label: "Qui nous sommes",
        href: "/a-propos",
        description: "L'entreprise et sa façon de travailler au quotidien.",
      },
      {
        label: "Comment on travaille",
        href: "/comment-on-travaille",
        description: "Le déroulé d'un chantier, de la visite à la réception.",
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

/**
 * Image sociale par défaut (Open Graph / Twitter).
 *
 * ⚠️ Next.js ne fusionne PAS l'objet `openGraph` : dès qu'une page en
 * déclare un, celui du layout racine est intégralement remplacé — image
 * comprise. Toute page qui définit `openGraph` doit donc réinjecter
 * `images: ogImages` explicitement, sinon son partage sur les réseaux
 * sociaux et dans les messageries s'affiche sans visuel.
 */
export const ogImages = [
  {
    url: "/images/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "COREMI — rénovation, transformation et châssis",
  },
];

/** Appel à l'action principal, isolé du reste de la navigation. */
export const primaryCta = { label: "Demander un devis", href: "/devis" } as const;

/**
 * Le pied de page rattrape ce que la navigation ne porte plus :
 * « Toutes nos solutions » et les couleurs restent atteignables sans
 * passer par un menu déroulant, ce qui compte surtout sur mobile.
 */
export const footerServiceLinks = [
  { label: "Châssis PVC & aluminium", href: "/chassis" },
  { label: "Couleurs & finitions", href: "/chassis/couleurs" },
  { label: "Portes & vitrages", href: "/chassis#portes" },
  { label: "Annexes & extensions", href: "/construction-renovation#extensions" },
  { label: "Toutes nos solutions", href: "/solutions" },
  { label: "Primes & aides", href: "/primes" },
  { label: "Comment se construit un prix", href: "/prix-et-aides" },
] as const;
