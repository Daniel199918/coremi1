/**
 * ============================================================
 * Avis clients — CONTENUS DE DÉMONSTRATION.
 * ⚠️ Ces avis sont des EXEMPLES rédactionnels destinés à montrer
 *    la mise en page. Ils ne sont PAS de vrais avis Google et sont
 *    signalés comme tels dans l'interface. À remplacer par les
 *    véritables avis clients de COREMI (avec leur accord).
 * ============================================================
 */

export type Testimonial = {
  name: string;
  location: string;
  projectType: string;
  rating: number;
  text: string;
};

/** Affiché dans l'interface tant que les vrais avis ne sont pas fournis. */
export const testimonialsDisclaimer =
  "Avis présentés à titre d'exemple en attendant la publication de nos avis clients vérifiés.";

export const testimonials: Testimonial[] = [
  {
    name: "Marie D.",
    location: "Waterloo",
    projectType: "Extension",
    rating: 5,
    text: "Un accompagnement sérieux du premier rendez-vous à la réception du chantier. Le planning annoncé a été respecté et les finitions sont impeccables.",
  },
  {
    name: "Thomas V.",
    location: "Wavre",
    projectType: "Remplacement de châssis",
    rating: 5,
    text: "Remplacement de tous nos châssis en une semaine, chantier propre et équipe très professionnelle. La différence de confort est immédiate.",
  },
  {
    name: "Sophie L.",
    location: "Ixelles",
    projectType: "Rénovation complète",
    rating: 5,
    text: "Devis clair et détaillé, communication facile pendant toute la rénovation. Nous savions toujours où en était le chantier.",
  },
  {
    name: "Karim B.",
    location: "Nivelles",
    projectType: "Terrasse",
    rating: 5,
    text: "Très satisfait de notre nouvelle terrasse. Conseils pertinents sur les matériaux et un résultat à la hauteur de nos attentes.",
  },
];
