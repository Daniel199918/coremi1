/**
 * ============================================================
 * Chiffres clés — DONNÉES TEMPORAIRES À CONFIRMER PAR COREMI.
 * ⚠️ Ne pas publier sans validation : années d'expérience,
 *    nombre de projets et taux de satisfaction doivent être
 *    confirmés (ou ajustés) par l'entreprise.
 * ============================================================
 */

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "15+", label: "années d'expérience" }, // ⚠️ à confirmer
  { value: "250+", label: "projets réalisés" }, // ⚠️ à confirmer
  { value: "98 %", label: "de clients satisfaits" }, // ⚠️ à confirmer
  { value: "BXL & BW", label: "Bruxelles et Brabant wallon" },
];

export const trustPoints = [
  { title: "Travail de qualité", description: "Des matériaux éprouvés et des finitions soignées." },
  { title: "Équipe expérimentée", description: "Un savoir-faire éprouvé sur chantier." },
  { title: "Respect des délais", description: "Un planning clair, communiqué et tenu." },
  { title: "Devis gratuit", description: "Une offre détaillée, sans engagement." },
] as const;

export const processSteps = [
  {
    title: "Premier échange",
    description:
      "Vous nous décrivez votre projet par téléphone ou via le formulaire. Nous cernons ensemble vos besoins et votre budget.",
  },
  {
    title: "Visite et analyse",
    description:
      "Nous nous déplaçons sur place pour prendre les mesures, analyser l'existant et identifier les contraintes techniques.",
  },
  {
    title: "Devis détaillé",
    description:
      "Vous recevez un devis clair, poste par poste, sans frais cachés. Nous le parcourons ensemble et l'ajustons si nécessaire.",
  },
  {
    title: "Réalisation et suivi",
    description:
      "Le chantier démarre au planning convenu, avec un interlocuteur unique et un suivi régulier jusqu'à la réception.",
  },
] as const;
