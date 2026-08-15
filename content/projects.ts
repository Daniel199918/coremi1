/**
 * ============================================================
 * Réalisations — photos réelles de chantiers COREMI.
 *
 * `location` et `year` valent `null` tant que COREMI ne les a pas
 * confirmés. Les composants MASQUENT alors la ligne correspondante :
 * un site qui affiche « [COMMUNE] » à ses visiteurs fait plus de dégâts
 * qu'un cartouche à deux lignes au lieu de trois. Ne jamais y remettre
 * un texte entre crochets — renseigner la vraie valeur, ou laisser null.
 *
 * Les descriptions ne mentionnent que ce qui est visible sur les photos.
 * ============================================================
 */

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** `null` tant que la commune n'est pas confirmée par COREMI. */
  location: string | null;
  /** `null` tant que l'année n'est pas confirmée par COREMI. */
  year: string | null;
  /** Matériaux et éléments observables sur les photos. */
  observed: string;
  description: string;
  cover: ProjectImage;
  /** Photos complémentaires du même chantier. */
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "villa-contemporaine",
    index: "01",
    title: "Villa contemporaine, verre et volumes blancs",
    location: null,
    year: null,
    observed:
      "Enduit blanc · menuiseries aluminium · garde-corps en verre · dalles béton · lames composites",
    description:
      "Deux niveaux entièrement vitrés sous une pergola de toiture, garde-corps en verre et enduit blanc. L'allée en dalles de béton posées sur gravier noir mène à une entrée vitrée double hauteur ; à l'arrière, une terrasse en lames composites prolonge le séjour de plain-pied vers le jardin.",
    cover: {
      src: "/images/realisations/villa-jardin-panorama.jpg",
      alt: "Villa contemporaine COREMI côté jardin : deux niveaux vitrés toute hauteur, pergola de toiture et garde-corps en verre.",
    },
    images: [
      {
        src: "/images/realisations/villa-allee-entree.jpg",
        alt: "Allée d'accès de la villa : dalles de béton sur gravier noir entre deux haies de lierre, entrée vitrée double hauteur.",
      },
      {
        src: "/images/realisations/villa-terrasse-angle.jpg",
        alt: "Angle de la villa : rez-de-chaussée vitré toute hauteur et terrasse en lames composites grises.",
      },
    ],
  },
  {
    slug: "maison-bardage-anthracite",
    index: "02",
    title: "Maison au bardage anthracite",
    location: null,
    year: null,
    observed: "Bardage anthracite à joints horizontaux · enduit blanc · châssis noirs · gabions",
    description:
      "Un volume supérieur bardé de panneaux anthracite à joints horizontaux posé sur un socle enduit blanc. Châssis noirs affleurants, murs de soutènement en gabions et haie de lierre côté rue.",
    cover: {
      src: "/images/realisations/maison-bardage-anthracite.jpg",
      alt: "Maison COREMI vue depuis la rue : étage bardé de panneaux anthracite sur socle enduit blanc, châssis noirs.",
    },
    images: [],
  },
  {
    slug: "entree-menuiseries-noires",
    index: "03",
    title: "Entrée et menuiseries noires",
    location: null,
    year: null,
    observed: "Menuiseries aluminium noires · pierre bleue · gabions · enduit blanc",
    description:
      "Entrée vitrée toute hauteur et porte de garage sectionnelle noire alignées sous un même bandeau. Numérotation sur totem béton, emmarchement en pierre bleue et mur de gabions en retour.",
    cover: {
      src: "/images/realisations/entree-chassis-noirs.jpg",
      alt: "Entrée d'une maison COREMI : châssis et porte de garage en aluminium noir sur façade enduite blanche, numéro 27 sur totem béton.",
    },
    images: [],
  },
];
