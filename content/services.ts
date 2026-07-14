import { Building2, Hammer, AppWindow, TreePine, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  excerpt: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  keywords: string[];
};

/**
 * Les 4 grandes catégories de services COREMI.
 * Contenus rédigés pour le SEO local (Bruxelles / Brabant wallon),
 * sans promesse invérifiable.
 */
export const services: Service[] = [
  {
    slug: "construction-gros-oeuvre",
    title: "Construction & gros œuvre",
    shortTitle: "Gros œuvre",
    icon: Building2,
    excerpt:
      "Construction, extensions, maçonnerie, fondations et transformations structurelles.",
    description:
      "Du terrassement à la mise sous toit, COREMI prend en charge le gros œuvre de votre projet : fondations, maçonnerie, dalles, extensions et transformations structurelles. Nous travaillons avec des matériaux éprouvés et un suivi de chantier rigoureux, en coordination avec votre architecte.",
    image: "/images/projects/extension-moderne.jpg",
    imageAlt: "Extension moderne en maçonnerie avec grandes baies vitrées",
    features: [
      "Fondations et terrassement",
      "Maçonnerie porteuse et parachèvements",
      "Extensions et annexes",
      "Ouvertures de murs et poutres",
      "Transformations structurelles",
      "Coordination avec votre architecte",
    ],
    keywords: ["entreprise de construction Bruxelles", "extension de maison Bruxelles", "gros œuvre Brabant wallon"],
  },
  {
    slug: "renovation",
    title: "Rénovation",
    shortTitle: "Rénovation",
    icon: Hammer,
    excerpt: "Rénovation intérieure et extérieure, remise à neuf et transformation complète.",
    description:
      "COREMI rénove votre habitation de A à Z : réagencement des espaces, remise à neuf complète, rénovation de façades et modernisation énergétique. Chaque chantier commence par une analyse précise de l'existant pour un devis clair et un planning réaliste.",
    image: "/images/projects/renovation-complete.jpg",
    imageAlt: "Intérieur rénové lumineux avec finitions soignées",
    features: [
      "Rénovation complète d'habitations",
      "Rénovation de façades",
      "Réagencement intérieur",
      "Remplacement de sols et cloisons",
      "Amélioration énergétique",
      "Finitions haut de gamme",
    ],
    keywords: ["entreprise de rénovation Bruxelles", "rénovation Brabant wallon", "rénovation de façade"],
  },
  {
    slug: "chassis-portes",
    title: "Châssis & portes",
    shortTitle: "Châssis & portes",
    icon: AppWindow,
    excerpt: "Pose et remplacement de fenêtres, portes et châssis PVC, aluminium et bois.",
    description:
      "Spécialiste du châssis, COREMI pose et remplace vos fenêtres et portes en PVC, aluminium ou bois. Nous vous conseillons sur le meilleur rapport isolation / esthétique / budget, avec des profilés de marques reconnues et une pose dans les règles de l'art.",
    image: "/images/projects/pose-chassis.jpg",
    imageAlt: "Châssis aluminium noir posé sur une façade contemporaine blanche",
    features: [
      "Châssis PVC, aluminium et bois",
      "Portes d'entrée et portes-fenêtres",
      "Double et triple vitrage",
      "Amélioration acoustique et thermique",
      "Volets et protections solaires",
      "Finitions intérieures comprises",
    ],
    keywords: ["pose de châssis Bruxelles", "châssis PVC Bruxelles", "châssis aluminium Bruxelles", "remplacement de châssis"],
  },
  {
    slug: "amenagement-exterieur",
    title: "Aménagement extérieur",
    shortTitle: "Extérieur",
    icon: TreePine,
    excerpt: "Terrasses, pavage, clôtures, abords, allées et aménagements extérieurs.",
    description:
      "Prolongez votre habitation vers l'extérieur : terrasses, allées, pavage, clôtures et abords. COREMI conçoit et réalise des aménagements extérieurs durables, pensés pour l'usage quotidien et l'esthétique de votre propriété.",
    image: "/images/projects/terrasse.jpg",
    imageAlt: "Terrasse contemporaine en pavage avec plantations",
    features: [
      "Terrasses en pavage ou céramique",
      "Allées et accès carrossables",
      "Clôtures et portails",
      "Murets et abords",
      "Évacuation des eaux",
      "Préparation des plantations",
    ],
    keywords: ["aménagement extérieur Brabant wallon", "terrasse Bruxelles", "pavage"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
