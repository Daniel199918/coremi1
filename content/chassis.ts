/** Contenu de la page Châssis : matériaux, comparaison, prestations. */

export type Material = {
  name: string;
  strapline: string;
  points: { label: string; value: string }[];
  bestFor: string;
};

/**
 * Comparaison des matériaux — formulations prudentes, sans chiffre
 * de performance inventé. ⚠️ Châssis bois : à confirmer par COREMI
 * si ce service est réellement proposé.
 */
export const materials: Material[] = [
  {
    name: "PVC",
    strapline: "Le meilleur rapport isolation / budget",
    points: [
      { label: "Isolation", value: "Très bonne, sans surcoût" },
      { label: "Entretien", value: "Un coup d'éponge suffit" },
      { label: "Budget", value: "Le plus accessible" },
      { label: "Teintes", value: "Blanc, gris, décors bois" },
    ],
    bestFor: "Rénovations, habitations familiales, budgets maîtrisés.",
  },
  {
    name: "Aluminium",
    strapline: "Des profilés fins, de grandes surfaces vitrées",
    points: [
      { label: "Isolation", value: "Excellente avec rupture de pont thermique" },
      { label: "Entretien", value: "Quasi nul, teinte stable" },
      { label: "Budget", value: "Plus élevé, très durable" },
      { label: "Teintes", value: "Toutes teintes RAL, aspect mat ou structuré" },
    ],
    bestFor: "Architecture contemporaine, grandes baies, châssis colorés.",
  },
  {
    name: "Bois",
    strapline: "Le charme du matériau vivant",
    points: [
      { label: "Isolation", value: "Naturellement isolant" },
      { label: "Entretien", value: "Lasure ou peinture à entretenir" },
      { label: "Budget", value: "Variable selon l'essence" },
      { label: "Teintes", value: "Lasures et peintures sur mesure" },
    ],
    bestFor: "Bâtisses de caractère, centres anciens, amoureux du bois.",
  },
];

export const chassisPrestations = [
  {
    title: "Remplacement de châssis",
    description:
      "Dépose des anciens châssis, pose des nouveaux, resserrages et finitions intérieures. La maison reste habitable pendant les travaux.",
  },
  {
    title: "Portes d'entrée",
    description:
      "Portes PVC et aluminium, sécurisées, isolantes, assorties à vos châssis. Nous vous aidons à choisir un modèle qui tient dans le temps.",
  },
  {
    title: "Vitrages",
    description:
      "Double ou triple vitrage, vitrage acoustique ou sécurisé. Remplacement possible sans changer les châssis quand leur état le permet.",
  },
  {
    title: "Prise de mesures & conseil",
    description:
      "Nous mesurons chaque baie sur place et validons les détails qui font la différence : battées, seuils, resserrages, ventilation.",
  },
] as const;
