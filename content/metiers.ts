/** Les quatre métiers COREMI, présentés en liste éditoriale sur l'accueil. */

export type Metier = {
  index: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const metiers: Metier[] = [
  {
    index: "01",
    title: "Gros œuvre & construction",
    description:
      "Fondations, maçonnerie, dalles, mise sous toit. Nous menons le gros œuvre de votre projet en coordination avec votre architecte, du terrassement à la réception.",
    href: "/construction-renovation",
    image: "/images/projects/extension-moderne.jpg",
    imageAlt: "Extension en maçonnerie avec grandes baies vitrées",
  },
  {
    index: "02",
    title: "Rénovation & transformation",
    description:
      "Remise à neuf complète, réagencement des espaces, rénovation de façades. Chaque chantier part d'une analyse honnête de l'existant.",
    href: "/construction-renovation#renovation",
    image: "/images/projects/renovation-complete.jpg",
    imageAlt: "Intérieur rénové, finitions soignées",
  },
  {
    index: "03",
    title: "Châssis & portes",
    description:
      "Pose et remplacement de châssis PVC, aluminium ou bois, portes d'entrée, vitrages. Prise de mesures, conseil sur les profilés, finitions intérieures comprises.",
    href: "/chassis",
    image: "/images/projects/pose-chassis.jpg",
    imageAlt: "Châssis aluminium anthracite sur façade claire",
  },
  {
    index: "04",
    title: "Extensions & extérieurs",
    description:
      "Annexes, extensions, terrasses et abords. Nous prolongeons votre habitation avec les mêmes exigences que pour le bâti principal.",
    href: "/construction-renovation#extensions",
    image: "/images/projects/terrasse.jpg",
    imageAlt: "Terrasse en dalles céramiques avec abords plantés",
  },
];
