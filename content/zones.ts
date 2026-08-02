/**
 * Zones d'intervention — une page locale par commune.
 *
 * Donnees factuelles verifiees : les 27 communes de la province du
 * Brabant wallon (liste officielle) et les communes du sud-est
 * bruxellois les plus proches du siege. Codes postaux et coordonnees
 * proviennent de Wikidata ; "fromBase" est la distance a vol d'oiseau
 * depuis Rixensart, arrondie au kilometre, et "nearby" les communes
 * couvertes les plus proches (maillage interne).
 *
 * A ne pas transformer en pages satellites vides : chacune doit garder
 * un contenu utile et une raison d'exister pour le lecteur.
 */

export type Zone = {
  name: string;
  slug: string;
  postalCodes: string[];
  region: string;
  /** Distance a vol d'oiseau depuis Rixensart, en km. */
  fromBase: number;
  nearby: string[];
};

export const zones: Zone[] = [
  {
    name: "Auderghem",
    slug: "auderghem",
    postalCodes: ["1160"],
    region: "Bruxelles-Capitale",
    fromBase: 13,
    nearby: ["woluwe-saint-pierre", "watermael-boitsfort", "woluwe-saint-lambert", "etterbeek", "ixelles", "uccle"],
  },
  {
    name: "Beauvechain",
    slug: "beauvechain",
    postalCodes: ["1320"],
    region: "Brabant wallon",
    fromBase: 18,
    nearby: ["grez-doiceau", "incourt", "jodoigne", "chaumont-gistoux", "wavre", "helecine"],
  },
  {
    name: "Braine-l’Alleud",
    slug: "braine-l-alleud",
    postalCodes: ["1420", "1421", "1428"],
    region: "Brabant wallon",
    fromBase: 12,
    nearby: ["waterloo", "braine-le-chateau", "lasne", "ittre", "genappe", "la-hulpe"],
  },
  {
    name: "Braine-le-Château",
    slug: "braine-le-chateau",
    postalCodes: ["1440"],
    region: "Brabant wallon",
    fromBase: 19,
    nearby: ["ittre", "tubize", "braine-l-alleud", "waterloo", "rebecq", "nivelles"],
  },
  {
    name: "Chastre",
    slug: "chastre",
    postalCodes: ["1450"],
    region: "Brabant wallon",
    fromBase: 15,
    nearby: ["mont-saint-guibert", "walhain", "court-saint-etienne", "villers-la-ville", "ottignies-louvain-la-neuve", "chaumont-gistoux"],
  },
  {
    name: "Chaumont-Gistoux",
    slug: "chaumont-gistoux",
    postalCodes: ["1325"],
    region: "Brabant wallon",
    fromBase: 12,
    nearby: ["walhain", "grez-doiceau", "incourt", "wavre", "ottignies-louvain-la-neuve", "mont-saint-guibert"],
  },
  {
    name: "Court-Saint-Étienne",
    slug: "court-saint-etienne",
    postalCodes: ["1490"],
    region: "Brabant wallon",
    fromBase: 10,
    nearby: ["mont-saint-guibert", "ottignies-louvain-la-neuve", "chastre", "villers-la-ville", "walhain", "lasne"],
  },
  {
    name: "Etterbeek",
    slug: "etterbeek",
    postalCodes: ["1040"],
    region: "Bruxelles-Capitale",
    fromBase: 17,
    nearby: ["ixelles", "woluwe-saint-pierre", "woluwe-saint-lambert", "auderghem", "watermael-boitsfort", "uccle"],
  },
  {
    name: "Genappe",
    slug: "genappe",
    postalCodes: ["1470", "1471", "1472", "1473", "1474", "1476"],
    region: "Brabant wallon",
    fromBase: 13,
    nearby: ["villers-la-ville", "lasne", "court-saint-etienne", "nivelles", "braine-l-alleud", "ottignies-louvain-la-neuve"],
  },
  {
    name: "Grez-Doiceau",
    slug: "grez-doiceau",
    postalCodes: ["1390"],
    region: "Brabant wallon",
    fromBase: 12,
    nearby: ["chaumont-gistoux", "incourt", "beauvechain", "wavre", "walhain", "ottignies-louvain-la-neuve"],
  },
  {
    name: "Hélécine",
    slug: "helecine",
    postalCodes: ["1357"],
    region: "Brabant wallon",
    fromBase: 32,
    nearby: ["orp-jauche", "jodoigne", "ramillies", "incourt", "beauvechain", "perwez"],
  },
  {
    name: "Incourt",
    slug: "incourt",
    postalCodes: ["1315"],
    region: "Brabant wallon",
    fromBase: 18,
    nearby: ["jodoigne", "chaumont-gistoux", "grez-doiceau", "perwez", "beauvechain", "walhain"],
  },
  {
    name: "Ittre",
    slug: "ittre",
    postalCodes: ["1460", "1461"],
    region: "Brabant wallon",
    fromBase: 20,
    nearby: ["braine-le-chateau", "tubize", "nivelles", "braine-l-alleud", "rebecq", "waterloo"],
  },
  {
    name: "Ixelles",
    slug: "ixelles",
    postalCodes: ["1050"],
    region: "Bruxelles-Capitale",
    fromBase: 17,
    nearby: ["etterbeek", "uccle", "woluwe-saint-pierre", "woluwe-saint-lambert", "auderghem", "watermael-boitsfort"],
  },
  {
    name: "Jodoigne",
    slug: "jodoigne",
    postalCodes: ["1370"],
    region: "Brabant wallon",
    fromBase: 23,
    nearby: ["incourt", "orp-jauche", "helecine", "ramillies", "beauvechain", "perwez"],
  },
  {
    name: "La Hulpe",
    slug: "la-hulpe",
    postalCodes: ["1310"],
    region: "Brabant wallon",
    fromBase: 4,
    nearby: ["rixensart", "lasne", "waterloo", "wavre", "watermael-boitsfort", "braine-l-alleud"],
  },
  {
    name: "Lasne",
    slug: "lasne",
    postalCodes: ["1380", "1477", "1481"],
    region: "Brabant wallon",
    fromBase: 5,
    nearby: ["rixensart", "la-hulpe", "ottignies-louvain-la-neuve", "braine-l-alleud", "waterloo", "court-saint-etienne"],
  },
  {
    name: "Mont-Saint-Guibert",
    slug: "mont-saint-guibert",
    postalCodes: ["1435"],
    region: "Brabant wallon",
    fromBase: 11,
    nearby: ["court-saint-etienne", "walhain", "chastre", "ottignies-louvain-la-neuve", "chaumont-gistoux", "villers-la-ville"],
  },
  {
    name: "Nivelles",
    slug: "nivelles",
    postalCodes: ["1400", "1401", "1402", "1404"],
    region: "Brabant wallon",
    fromBase: 20,
    nearby: ["ittre", "genappe", "braine-l-alleud", "braine-le-chateau", "tubize", "waterloo"],
  },
  {
    name: "Orp-Jauche",
    slug: "orp-jauche",
    postalCodes: ["1350"],
    region: "Brabant wallon",
    fromBase: 30,
    nearby: ["ramillies", "jodoigne", "helecine", "perwez", "incourt", "beauvechain"],
  },
  {
    name: "Ottignies-Louvain-la-Neuve",
    slug: "ottignies-louvain-la-neuve",
    postalCodes: ["1340", "1341", "1342", "1348"],
    region: "Brabant wallon",
    fromBase: 7,
    nearby: ["court-saint-etienne", "mont-saint-guibert", "wavre", "walhain", "rixensart", "chaumont-gistoux"],
  },
  {
    name: "Perwez",
    slug: "perwez",
    postalCodes: ["1360"],
    region: "Brabant wallon",
    fromBase: 22,
    nearby: ["ramillies", "incourt", "walhain", "chaumont-gistoux", "jodoigne", "orp-jauche"],
  },
  {
    name: "Ramillies",
    slug: "ramillies",
    postalCodes: ["1367"],
    region: "Brabant wallon",
    fromBase: 28,
    nearby: ["orp-jauche", "perwez", "jodoigne", "incourt", "helecine", "chaumont-gistoux"],
  },
  {
    name: "Rebecq",
    slug: "rebecq",
    postalCodes: ["1430"],
    region: "Brabant wallon",
    fromBase: 29,
    nearby: ["tubize", "ittre", "braine-le-chateau", "nivelles", "braine-l-alleud", "waterloo"],
  },
  {
    name: "Rixensart",
    slug: "rixensart",
    postalCodes: ["1330", "1331", "1332"],
    region: "Brabant wallon",
    fromBase: 0,
    nearby: ["la-hulpe", "wavre", "lasne", "ottignies-louvain-la-neuve", "court-saint-etienne", "waterloo"],
  },
  {
    name: "Tubize",
    slug: "tubize",
    postalCodes: ["1480"],
    region: "Brabant wallon",
    fromBase: 23,
    nearby: ["braine-le-chateau", "ittre", "rebecq", "braine-l-alleud", "waterloo", "nivelles"],
  },
  {
    name: "Uccle",
    slug: "uccle",
    postalCodes: ["1180"],
    region: "Bruxelles-Capitale",
    fromBase: 17,
    nearby: ["ixelles", "etterbeek", "watermael-boitsfort", "auderghem", "woluwe-saint-pierre", "woluwe-saint-lambert"],
  },
  {
    name: "Villers-la-Ville",
    slug: "villers-la-ville",
    postalCodes: ["1495"],
    region: "Brabant wallon",
    fromBase: 15,
    nearby: ["court-saint-etienne", "genappe", "chastre", "mont-saint-guibert", "ottignies-louvain-la-neuve", "walhain"],
  },
  {
    name: "Walhain",
    slug: "walhain",
    postalCodes: ["1457"],
    region: "Brabant wallon",
    fromBase: 13,
    nearby: ["mont-saint-guibert", "chaumont-gistoux", "chastre", "ottignies-louvain-la-neuve", "court-saint-etienne", "wavre"],
  },
  {
    name: "Waterloo",
    slug: "waterloo",
    postalCodes: ["1410"],
    region: "Brabant wallon",
    fromBase: 11,
    nearby: ["braine-l-alleud", "la-hulpe", "lasne", "braine-le-chateau", "watermael-boitsfort", "uccle"],
  },
  {
    name: "Watermael-Boitsfort",
    slug: "watermael-boitsfort",
    postalCodes: ["1170"],
    region: "Bruxelles-Capitale",
    fromBase: 12,
    nearby: ["auderghem", "woluwe-saint-pierre", "etterbeek", "woluwe-saint-lambert", "ixelles", "uccle"],
  },
  {
    name: "Wavre",
    slug: "wavre",
    postalCodes: ["1300", "1301"],
    region: "Brabant wallon",
    fromBase: 5,
    nearby: ["rixensart", "ottignies-louvain-la-neuve", "grez-doiceau", "chaumont-gistoux", "la-hulpe", "lasne"],
  },
  {
    name: "Woluwe-Saint-Lambert",
    slug: "woluwe-saint-lambert",
    postalCodes: ["1200"],
    region: "Bruxelles-Capitale",
    fromBase: 16,
    nearby: ["woluwe-saint-pierre", "etterbeek", "auderghem", "ixelles", "watermael-boitsfort", "uccle"],
  },
  {
    name: "Woluwe-Saint-Pierre",
    slug: "woluwe-saint-pierre",
    postalCodes: ["1150"],
    region: "Bruxelles-Capitale",
    fromBase: 15,
    nearby: ["woluwe-saint-lambert", "auderghem", "etterbeek", "ixelles", "watermael-boitsfort", "uccle"],
  },
];

export function getZone(slug: string): Zone | undefined {
  return zones.find((z) => z.slug === slug);
}

export function zonesByRegion(region: string): Zone[] {
  return zones.filter((z) => z.region === region);
}

/** Communes couvertes les plus proches, pour le maillage interne. */
export function getZoneNeighbours(zone: Zone): Zone[] {
  return zone.nearby
    .map((slug) => getZone(slug))
    .filter((z): z is Zone => Boolean(z));
}
