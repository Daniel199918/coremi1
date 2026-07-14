/**
 * ============================================================
 * Réalisations — CONTENUS DE DÉMONSTRATION.
 * ⚠️ À remplacer par les vrais projets et photos de COREMI :
 *    1. Déposer les photos dans /public/images/projects/
 *    2. Mettre à jour les entrées ci-dessous (titre, lieu, photo, description)
 * ============================================================
 */

export type ProjectCategory =
  | "extension"
  | "renovation"
  | "chassis"
  | "porte"
  | "terrasse"
  | "facade";

export const projectCategories: { value: ProjectCategory | "tous"; label: string }[] = [
  { value: "tous", label: "Tous les projets" },
  { value: "extension", label: "Extensions" },
  { value: "renovation", label: "Rénovations" },
  { value: "chassis", label: "Châssis" },
  { value: "porte", label: "Portes" },
  { value: "terrasse", label: "Terrasses" },
  { value: "facade", label: "Façades" },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  workType: string;
  image: string;
  imageAlt: string;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "extension-moderne-waterloo",
    title: "Extension moderne d'une habitation",
    location: "Waterloo",
    category: "extension",
    workType: "Gros œuvre · Extension",
    image: "/images/projects/extension-moderne.jpg",
    imageAlt: "Extension moderne avec toiture plate et grandes baies vitrées",
    description:
      "Extension en maçonnerie avec toiture plate, grandes baies vitrées et liaison harmonieuse avec le bâtiment existant.",
  },
  {
    slug: "renovation-complete-ixelles",
    title: "Rénovation complète d'une maison de maître",
    location: "Ixelles",
    category: "renovation",
    workType: "Rénovation intérieure complète",
    image: "/images/projects/renovation-complete.jpg",
    imageAlt: "Séjour rénové avec parquet et moulures restaurées",
    description:
      "Remise à neuf complète : réagencement des espaces, nouvelles techniques, finitions soignées dans le respect du caractère d'origine.",
  },
  {
    slug: "chassis-aluminium-wavre",
    title: "Remplacement de châssis en aluminium",
    location: "Wavre",
    category: "chassis",
    workType: "Châssis aluminium · Double vitrage",
    image: "/images/projects/pose-chassis.jpg",
    imageAlt: "Châssis aluminium noir sur façade enduite blanche",
    description:
      "Remplacement complet des châssis par des profilés aluminium à haute performance thermique, finitions intérieures comprises.",
  },
  {
    slug: "porte-entree-uccle",
    title: "Nouvelle porte d'entrée design",
    location: "Uccle",
    category: "porte",
    workType: "Porte d'entrée aluminium",
    image: "/images/projects/porte-entree.jpg",
    imageAlt: "Porte d'entrée contemporaine en aluminium anthracite",
    description:
      "Pose d'une porte d'entrée contemporaine sécurisée, alliant isolation, design épuré et quincaillerie de qualité.",
  },
  {
    slug: "terrasse-lasne",
    title: "Aménagement d'une terrasse et des abords",
    location: "Lasne",
    category: "terrasse",
    workType: "Aménagement extérieur",
    image: "/images/projects/terrasse.jpg",
    imageAlt: "Terrasse en pavage céramique avec bordures plantées",
    description:
      "Création d'une terrasse en dalles céramiques avec gestion des niveaux, évacuation des eaux et abords plantés.",
  },
  {
    slug: "renovation-facade-nivelles",
    title: "Rénovation de façade",
    location: "Nivelles",
    category: "facade",
    workType: "Façade · Isolation",
    image: "/images/projects/renovation-facade.jpg",
    imageAlt: "Façade rénovée avec enduit clair et soubassement en pierre",
    description:
      "Rénovation complète de la façade avec isolation par l'extérieur, nouvel enduit et remise en valeur du soubassement.",
  },
];
