/**
 * Les quatre piliers COREMI, présentés en liste éditoriale sur l'accueil.
 *
 * ⚠️ POSITIONNEMENT — À RESPECTER DANS TOUT LE SITE
 * COREMI ne fait PAS de gros œuvre au sens classique : ni fondations, ni
 * maison neuve, ni construction complète. L'entreprise intervient sur
 * l'habitation existante : elle la rénove, la transforme, l'agrandit et
 * en remplace les ouvertures.
 *
 * Des travaux de construction sont réalisés, mais toujours DANS LE CADRE
 * d'une annexe, d'une extension ou d'une transformation — jamais comme
 * activité principale.
 *
 * Vocabulaire à ne pas employer : gros œuvre, fondations, construction
 * de A à Z, maison clé en main, de la structure aux finitions,
 * entreprise générale de construction. Sauf nécessité technique réelle
 * pour décrire une annexe précise.
 *
 * Les quatre piliers, dans cet ordre :
 *   Rénovation · Transformation · Annexes · Châssis
 */

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
    title: "Rénovation",
    description:
      "Rénovation complète ou partielle d'une maison ou d'un appartement. Nous partons de ce qui existe, nous disons ce qui mérite d'être gardé, et nous refaisons le reste.",
    href: "/construction-renovation",
    image: "/images/realisations/maison-bardage-anthracite.jpg",
    imageAlt:
      "Maison dont le volume supérieur a été rénové en bardage anthracite, réalisation COREMI",
  },
  {
    index: "02",
    title: "Transformation",
    description:
      "Réagencer les volumes, ouvrir un mur, déplacer une pièce, reprendre une façade. Transformer une habitation demande de comprendre le bâtiment avant de le modifier.",
    href: "/construction-renovation#transformation",
    image: "/images/realisations/villa-terrasse-angle.jpg",
    imageAlt:
      "Rez-de-chaussée entièrement vitré ouvrant sur une terrasse composite, réalisation COREMI",
  },
  {
    index: "03",
    title: "Annexes & extensions",
    description:
      "Agrandir plutôt que déménager. Nous construisons l'annexe et la raccordons à l'existant — c'est cette jonction, plus que le volume neuf, qui décide du résultat.",
    href: "/construction-renovation#extensions",
    image: "/images/realisations/villa-allee-entree.jpg",
    imageAlt:
      "Allée en dalles de béton et haies taillées menant à une entrée vitrée, réalisation COREMI",
  },
  {
    index: "04",
    title: "Châssis & ouvertures",
    description:
      "Notre spécialité. Châssis PVC ou aluminium, portes d'entrée, vitrages et menuiseries extérieures : du choix du profilé à la finition intérieure, pose comprise.",
    href: "/chassis",
    image: "/images/realisations/entree-chassis-noirs.jpg",
    imageAlt:
      "Châssis et porte de garage en aluminium noir sur façade blanche, réalisation COREMI",
  },
];
