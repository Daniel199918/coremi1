/**
 * ============================================================
 * Réalisations — CONTENUS PROVISOIRES clairement identifiés.
 * ⚠️ À remplacer par les vrais projets et photos de COREMI :
 *    1. Déposer les photos dans /public/images/projects/
 *    2. Mettre à jour les entrées ci-dessous
 *    Les visuels actuels sont des placeholders générés, marqués
 *    « photo à remplacer » directement dans l'image.
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
  { value: "tous", label: "Tous" },
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
  materials: string;
  image: string;
  imageAlt: string;
  description: string;
  /** Paire avant/après optionnelle. */
  beforeAfter?: {
    before: string;
    beforeAlt: string;
    after: string;
    afterAlt: string;
  };
};

export const projects: Project[] = [
  {
    slug: "extension-moderne-waterloo",
    title: "Extension contemporaine sur jardin",
    location: "Waterloo",
    category: "extension",
    workType: "Gros œuvre, extension",
    materials: "Maçonnerie, toiture plate, châssis aluminium",
    image: "/images/projects/extension-moderne.jpg",
    imageAlt: "Extension contemporaine à toiture plate ouverte sur le jardin",
    description:
      "Une extension à toiture plate qui double l'espace de vie et ouvre la maison sur le jardin. Raccord propre à l'existant, baies toute hauteur.",
  },
  {
    slug: "renovation-complete-ixelles",
    title: "Maison de maître remise à neuf",
    location: "Ixelles",
    category: "renovation",
    workType: "Rénovation complète",
    materials: "Parquet, plafonnage, menuiseries intérieures",
    image: "/images/projects/renovation-complete.jpg",
    imageAlt: "Séjour de maison de maître rénové, moulures conservées",
    description:
      "Réagencement complet d'une maison de maître en préservant son caractère : moulures restaurées, techniques neuves, finitions au cordeau.",
  },
  {
    slug: "chassis-aluminium-wavre",
    title: "Remplacement complet des châssis",
    location: "Wavre",
    category: "chassis",
    workType: "Châssis aluminium, double vitrage",
    materials: "Aluminium thermolaqué, double vitrage",
    image: "/images/projects/pose-chassis.jpg",
    imageAlt: "Châssis aluminium anthracite posés sur façade enduite claire",
    description:
      "Tous les châssis remplacés par des profilés aluminium fins, teinte anthracite. Pose en quelques jours, finitions intérieures comprises.",
  },
  {
    slug: "porte-entree-uccle",
    title: "Porte d'entrée sur mesure",
    location: "Uccle",
    category: "porte",
    workType: "Porte d'entrée aluminium",
    materials: "Aluminium, vitrage sécurisé",
    image: "/images/projects/porte-entree.jpg",
    imageAlt: "Porte d'entrée contemporaine en aluminium anthracite",
    description:
      "Une porte d'entrée dessinée pour la façade, sécurisée et isolante. La quincaillerie et les teintes ont été choisies avec les propriétaires.",
  },
  {
    slug: "terrasse-lasne",
    title: "Terrasse et abords redessinés",
    location: "Lasne",
    category: "terrasse",
    workType: "Aménagement extérieur",
    materials: "Dalles céramiques, bordures acier",
    image: "/images/projects/terrasse.jpg",
    imageAlt: "Terrasse en dalles céramiques et bordures plantées",
    description:
      "Gestion des niveaux, évacuation des eaux, dalles céramiques posées au millimètre. Les abords plantés terminent l'ensemble.",
  },
  {
    slug: "renovation-facade-nivelles",
    title: "Façade isolée et ré-enduite",
    location: "Nivelles",
    category: "facade",
    workType: "Façade, isolation par l'extérieur",
    materials: "Isolant rigide, enduit minéral",
    image: "/images/projects/renovation-facade.jpg",
    imageAlt: "Façade rénovée avec enduit clair et soubassement en pierre",
    description:
      "Isolation par l'extérieur puis nouvel enduit minéral. La maison gagne en confort l'hiver et la façade retrouve une ligne nette.",
    beforeAfter: {
      before: "/images/projects/facade-avant.jpg",
      beforeAlt: "Façade avant travaux, enduit fatigué",
      after: "/images/projects/facade-apres.jpg",
      afterAlt: "Façade après travaux, enduit minéral neuf",
    },
  },
];
