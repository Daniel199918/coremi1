/**
 * ============================================================
 * FABRICANTS DE MENUISERIES UTILISÉS PAR COREMI
 * ============================================================
 *
 * RÈGLES :
 * 1. Aucun classement. Les trois fabricants ne sont pas comparables
 *    « en général » : chacun décline plusieurs gammes aux performances
 *    très différentes. On compare des POSITIONNEMENTS et des USAGES
 *    TYPES, jamais « la meilleure marque ».
 * 2. Aucune valeur technique chiffrée (Uw, dB, classe de résistance)
 *    n'est publiée ici : elle dépend de la gamme exacte, de la
 *    configuration, du vitrage et de la pose. Elle figure sur le devis,
 *    pour le produit réellement proposé.
 * 3. Le vocabulaire « partenaire officiel », « agréé » ou « certifié »
 *    n'est pas employé : cette relation n'a pas été documentée. On dit
 *    ce qui est vrai — ce sont des systèmes que l'entreprise met en
 *    œuvre.
 *
 * Positionnements vérifiés le 5 août 2026 sur les sites officiels des
 * fabricants (voir `source` de chaque marque).
 *
 * LOGOS : fichiers récupérés le 5 août 2026 directement sur les sites
 * officiels des fabricants (et non via un moteur de recherche), puis
 * utilisés sans modification — ni recolorisation, ni recadrage, ni
 * redessin. Aliplast ne publie que la version blanche de son logo : elle
 * est donc affichée sur une tuile sombre, comme sur son propre site.
 */

export const BRANDS_LAST_CHECKED = "5 août 2026";

export type Brand = {
  id: string;
  name: string;
  origin: string;
  /** Chemin du logo officiel, `null` s'il n'est pas disponible. */
  logo: string | null;
  logoWidth?: number;
  logoHeight?: number;
  /** Fond de tuile : `dark` pour un logo publié en version blanche. */
  logoTone?: "light" | "dark";
  source: { label: string; href: string };
  positioning: string;
  materials: string[];
  /** Ce que le fabricant met en avant sur son propre site. */
  strengths: string[];
  /** Points à vérifier au cas par cas — pas des défauts. */
  toCheck: string[];
  typicalProjects: string[];
};

export const brands: Brand[] = [
  {
    id: "schuco",
    name: "Schüco",
    origin: "Allemagne",
    logo: "/images/marques/schueco.svg",
    logoWidth: 176,
    logoHeight: 30,
    logoTone: "light",
    source: { label: "schueco.com", href: "https://www.schueco.com/be-fr" },
    positioning:
      "Fabricant allemand de systèmes pour fenêtres, portes et façades, présent aussi bien sur l'habitation que sur des projets de bâtiment complexes. Son site met en avant l'accompagnement sur tout le cycle de vie de la façade, la sécurité incendie et la réduction des émissions liées aux façades.",
    materials: ["Aluminium", "PVC"],
    strengths: [
      "Gamme très large, du logement individuel à la façade de bâtiment tertiaire",
      "Réponses à des exigences techniques complexes (sécurité incendie, grandes portées)",
      "Systèmes disponibles en aluminium et en PVC, ce qui permet de rester sur une même logique de système selon le budget",
    ],
    toCheck: [
      "L'étendue de la gamme rend le nom de la marque peu informatif à lui seul : c'est la référence de système précise qui compte sur un devis",
      "Certaines gammes visent des projets tertiaires et ne se justifient pas sur une maison",
    ],
    typicalProjects: [
      "Rénovation exigeante avec grandes ouvertures",
      "Projets où la sécurité ou la performance de façade sont déterminantes",
      "Chantiers mêlant fenêtres, portes et éléments de façade",
    ],
  },
  {
    id: "aliplast",
    name: "Aliplast",
    origin: "Belgique",
    logo: "/images/marques/aliplast-blanc.png",
    logoWidth: 383,
    logoHeight: 81,
    logoTone: "dark",
    source: { label: "aliplast.com", href: "https://www.aliplast.com/fr" },
    positioning:
      "Fabricant belge de systèmes en aluminium, très orienté habitation. Sa communication insiste sur l'esthétique et le choix des couleurs, les systèmes coulissants et à portes accordéon, les valeurs d'isolation, la protection contre l'effraction et la recyclabilité de l'aluminium.",
    materials: ["Aluminium"],
    strengths: [
      "Fabricant belge : circuits courts, documentation et interlocuteurs adaptés au marché local",
      "Offre étendue de coulissants et de portes accordéon, utile sur les ouvertures larges",
      "Choix de teintes très large, argument central de la marque",
      "Aluminium entièrement recyclable, mis en avant comme argument de durabilité",
    ],
    toCheck: [
      "Uniquement de l'aluminium : si le budget impose du PVC, il faut regarder ailleurs",
      "Comme pour tout aluminium, la performance thermique dépend fortement de la gamme et de la rupture de pont thermique retenue",
    ],
    typicalProjects: [
      "Maisons contemporaines avec grandes baies coulissantes",
      "Rénovations où l'aspect et la finesse des profilés comptent",
      "Projets belges cherchant un fabricant local",
    ],
  },
  {
    id: "aluprof",
    name: "Aluprof",
    origin: "Pologne",
    logo: "/images/marques/aluprof.svg",
    logoWidth: 1303,
    logoHeight: 335,
    logoTone: "light",
    source: { label: "aluprof.eu", href: "https://aluprof.eu/fr" },
    positioning:
      "Fabricant polonais de systèmes en aluminium, avec une gamme couvrant fenêtres, portes, systèmes à profilés fins et systèmes résistants au feu. Son site documente précisément les caractéristiques par système : isolation thermique, perméabilité à l'air, étanchéité à l'eau, résistance à la charge du vent.",
    materials: ["Aluminium"],
    strengths: [
      "Documentation technique par système, facile à vérifier poste par poste",
      "Systèmes à profilés fins, utiles quand on cherche un maximum de clair de vitrage",
      "Gamme incluant des systèmes résistants au feu",
      "Positionnement souvent plus accessible à performance comparable",
    ],
    toCheck: [
      "Marque moins connue du grand public belge : demandez la référence exacte du système et sa fiche technique",
      "Vérifiez la disponibilité des pièces et du service après-vente via votre installateur",
    ],
    typicalProjects: [
      "Projets cherchant un bon rapport performance/budget en aluminium",
      "Ouvertures où la finesse du profilé est prioritaire",
      "Rénovations avec exigences techniques documentées",
    ],
  },
];

/**
 * Axes de comparaison. Les valeurs sont des positionnements relatifs
 * observés sur les sites officiels, pas des mesures. « Selon la gamme »
 * est une réponse honnête et fréquente : c'est le cas pour l'essentiel
 * des performances.
 */
export const brandComparison: {
  axis: string;
  note?: string;
  values: Record<string, string>;
}[] = [
  {
    axis: "Origine",
    values: { schuco: "Allemagne", aliplast: "Belgique", aluprof: "Pologne" },
  },
  {
    axis: "Matériaux proposés",
    values: { schuco: "Aluminium et PVC", aliplast: "Aluminium", aluprof: "Aluminium" },
  },
  {
    axis: "Terrain de prédilection",
    values: {
      schuco: "Habitation et bâtiment, jusqu'aux façades complexes",
      aliplast: "Habitation, forte orientation résidentielle",
      aluprof: "Habitation et bâtiment, gamme technique documentée",
    },
  },
  {
    axis: "Personnalisation esthétique",
    note: "Tous proposent un large choix de teintes ; c'est l'argument le plus mis en avant par Aliplast.",
    values: {
      schuco: "Très large, selon la gamme",
      aliplast: "Choix de couleurs mis en avant comme argument central",
      aluprof: "Large, avec des systèmes à profilés fins",
    },
  },
  {
    axis: "Finesse visuelle des profilés",
    values: {
      schuco: "Selon la gamme",
      aliplast: "Selon la gamme, offre coulissante développée",
      aluprof: "Systèmes à profilés fins explicitement proposés",
    },
  },
  {
    axis: "Isolation thermique",
    note: "Dépend de la gamme, de la rupture de pont thermique et surtout du vitrage et de la pose. Aucun chiffre n'est publié ici : la valeur du produit réellement proposé figure sur le devis.",
    values: { schuco: "Selon la gamme", aliplast: "Selon la gamme", aluprof: "Selon la gamme" },
  },
  {
    axis: "Isolation acoustique",
    note: "Se joue principalement sur le vitrage et l'étanchéité, davantage que sur la marque du profilé.",
    values: { schuco: "Selon la gamme et le vitrage", aliplast: "Selon la gamme et le vitrage", aluprof: "Selon la gamme et le vitrage" },
  },
  {
    axis: "Sécurité anti-effraction",
    note: "Dépend de la quincaillerie, du vitrage et de la pose autant que du système.",
    values: {
      schuco: "Sécurité mise en avant, selon la gamme",
      aliplast: "Protection contre l'effraction mise en avant",
      aluprof: "Selon la gamme",
    },
  },
  {
    axis: "Entretien",
    note: "L'aluminium demande peu d'entretien : un nettoyage régulier suffit dans la plupart des cas.",
    values: { schuco: "Faible", aliplast: "Faible", aluprof: "Faible" },
  },
  {
    axis: "Budget relatif",
    note: "Indication d'ordre de grandeur uniquement. Le prix réel dépend de la gamme, des dimensions, du vitrage et de la pose — pas du nom de la marque.",
    values: {
      schuco: "Plutôt haut de gamme selon la gamme retenue",
      aliplast: "Milieu à haut de gamme",
      aluprof: "Souvent plus accessible à performance comparable",
    },
  },
];
