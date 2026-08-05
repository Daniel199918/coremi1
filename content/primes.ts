/**
 * ============================================================
 * AIDES PUBLIQUES — INFORMATION D'ORIENTATION, PAS DE PROMESSE
 * ============================================================
 *
 * Règles de rédaction, à respecter pour toute mise à jour :
 *
 * 1. AUCUN MONTANT n'est publié. Les barèmes dépendent des revenus, du
 *    type de demandeur et du bâtiment, et changent régulièrement : un
 *    chiffre affiché ici serait faux pour la majorité des lecteurs et
 *    périmé en quelques mois.
 * 2. AUCUNE CONDITION n'est présentée comme garantie. On décrit des
 *    mécanismes, on renvoie systématiquement à l'administration.
 * 3. Chaque région porte la DATE de dernière vérification et les LIENS
 *    officiels. Si `lastChecked` date de plus de trois mois, il faut
 *    revérifier avant de laisser la page en ligne.
 *
 * Vérifié le 5 août 2026 auprès des portails régionaux officiels
 * (energie.wallonie.be, renolution.brussels, vlaanderen.be).
 */

export const PRIMES_LAST_CHECKED = "5 août 2026";

export type PrimeSource = {
  label: string;
  href: string;
};

export type PrimeRegion = {
  id: string;
  region: string;
  authority: string;
  /** Résumé du mécanisme en vigueur, sans montant. */
  summary: string;
  /** Point d'attention majeur du moment (réforme, échéance…). */
  alert?: { title: string; text: string };
  works: string[];
  conditions: { title: string; text: string }[];
  steps: string[];
  sources: PrimeSource[];
  lastChecked: string;
};

export const primeRegions: PrimeRegion[] = [
  {
    id: "wallonie",
    region: "Wallonie",
    authority: "Service public de Wallonie — Énergie & Logement",
    summary:
      "La Wallonie soutient la rénovation énergétique du logement, notamment le remplacement des menuiseries extérieures et des vitrages. Le soutien combine, selon les cas, une aide directe et des formules de prêt à taux avantageux, avec un accompagnement technique préalable.",
    alert: {
      title: "Régime en cours de réforme — échéance annoncée au 30 septembre 2026",
      text: "Le régime actuel des primes habitation doit céder la place, à partir du 1er octobre 2026, à un système réorganisé autour du Rénopack et du Rénoprêt, avec des aides directes recentrées sur les ménages aux revenus les plus modestes et sur les logements les moins performants. Si votre chantier est proche, le calendrier de dépôt de votre dossier peut donc changer beaucoup de choses : vérifiez la date exacte d'entrée en vigueur auprès du SPW avant de vous engager.",
    },
    works: [
      "Remplacement de châssis et de menuiseries extérieures",
      "Remplacement ou amélioration des vitrages",
      "Isolation du toit, des murs et des sols",
      "Systèmes de chauffage et d'eau chaude plus performants",
      "Ventilation associée aux travaux d'étanchéité",
    ],
    conditions: [
      {
        title: "Âge et usage du logement",
        text: "Les aides visent en principe les logements existants depuis un certain nombre d'années et destinés à l'habitation. Les seuils exacts dépendent du dispositif.",
      },
      {
        title: "Audit ou accompagnement préalable",
        text: "Pour les rénovations importantes, un audit logement réalisé par un auditeur agréé — ou un accompagnement équivalent — est généralement requis avant le début des travaux. Commencer le chantier trop tôt peut faire perdre le bénéfice de l'aide.",
      },
      {
        title: "Exigences techniques",
        text: "Les vitrages et menuiseries doivent atteindre des performances thermiques minimales, exprimées en coefficient de transmission thermique (valeur U). Nous indiquons ces valeurs sur le devis.",
      },
      {
        title: "Revenus du ménage",
        text: "Le montant de l'aide est modulé selon les revenus et la composition du ménage. C'est le facteur qui fait le plus varier le résultat d'un dossier à l'autre.",
      },
      {
        title: "Entrepreneur enregistré",
        text: "Les travaux doivent être facturés par une entreprise, avec un descriptif suffisamment détaillé. Une facture trop vague peut bloquer un dossier.",
      },
    ],
    steps: [
      "Vérifier son éligibilité et faire réaliser l'audit ou l'accompagnement requis, avant tout début de travaux.",
      "Demander un devis détaillé mentionnant les performances techniques des matériaux.",
      "Introduire la demande auprès de l'administration selon la procédure en vigueur au moment du chantier.",
      "Faire réaliser les travaux et conserver factures et attestations.",
      "Transmettre les pièces justificatives dans les délais imposés.",
    ],
    sources: [
      { label: "Portail Énergie de la Wallonie", href: "https://energie.wallonie.be/" },
      {
        label: "Wallonie.be — primes pour la rénovation du logement",
        href: "https://www.wallonie.be/fr/demarches/obtenir-des-primes-pour-la-renovation-de-son-logement",
      },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },
  {
    id: "bruxelles",
    region: "Région de Bruxelles-Capitale",
    authority: "Bruxelles Environnement & urban.brussels — primes RENOLUTION",
    summary:
      "Bruxelles regroupe ses aides à la rénovation dans un guichet unique, RENOLUTION, qui rassemble les anciennes primes énergie, rénovation et embellissement de façade. Le remplacement des châssis et des vitrages y figure parmi les travaux visés.",
    alert: {
      title: "Dispositifs révisés à plusieurs reprises",
      text: "Le régime RENOLUTION a connu des ajustements, suspensions temporaires et modifications de périmètre au fil des budgets régionaux, et des formules de prêt complètent aujourd'hui les aides directes. Le montant, les travaux couverts et les délais d'introduction doivent donc être vérifiés au moment précis de votre demande, et non d'après un article ou une page trouvée en ligne.",
    },
    works: [
      "Remplacement de châssis et de menuiseries extérieures",
      "Remplacement de vitrages par du vitrage performant",
      "Isolation de la toiture, des murs et des sols",
      "Travaux liés à la salubrité et à la rénovation du bâti",
      "Embellissement de façade, selon les conditions en vigueur",
    ],
    conditions: [
      {
        title: "Bien situé dans une des 19 communes",
        text: "Le logement doit se trouver sur le territoire de la Région de Bruxelles-Capitale.",
      },
      {
        title: "Qualité de demandeur",
        text: "Propriétaire occupant, propriétaire bailleur, locataire ou copropriété : la qualité du demandeur influence l'accès et le niveau de l'aide.",
      },
      {
        title: "Revenus du ménage",
        text: "Les aides sont modulées par catégories de revenus, avec un soutien renforcé pour les ménages les plus modestes.",
      },
      {
        title: "Performances techniques",
        text: "Les vitrages et menuiseries posés doivent respecter des exigences de performance thermique minimales.",
      },
      {
        title: "Ordre des démarches",
        text: "Le calendrier compte : selon les dispositifs, la demande doit être introduite avant les travaux ou dans un délai strict après la facture finale. Un dossier hors délai est refusé, même si les travaux étaient éligibles.",
      },
    ],
    steps: [
      "Consulter le portail RENOLUTION pour identifier les primes ouvertes au moment de votre projet.",
      "Rassembler les documents demandés : preuve de propriété ou bail, revenus, devis détaillé.",
      "Introduire la demande via la procédure officielle en ligne.",
      "Réaliser les travaux avec une entreprise et obtenir une facture conforme.",
      "Transmettre les pièces finales dans le délai imposé.",
    ],
    sources: [
      { label: "Portail officiel des primes RENOLUTION", href: "https://renolution.brussels/fr" },
      { label: "Bruxelles Environnement", href: "https://environnement.brussels/" },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },
  {
    id: "flandre",
    region: "Flandre",
    authority: "Vlaamse overheid — Mijn VerbouwPremie",
    summary:
      "La Flandre réunit ses aides à la rénovation et aux investissements économiseurs d'énergie sous « Mijn VerbouwPremie », complétée par le prêt « Mijn VerbouwLening ». Le remplacement des vitrages et des menuiseries extérieures fait partie des catégories de travaux prévues.",
    alert: {
      title: "Réforme entrée en vigueur le 1er mars 2026",
      text: "Depuis le 1er mars 2026, le régime a été réformé, avec un impact particulier sur les propriétaires occupants des catégories de revenus les plus élevées et sur les autres investisseurs. Des évolutions supplémentaires concernant les bailleurs privés sont annoncées pour 2027 mais ne sont pas définitives. Vérifiez votre situation avec le simulateur officiel.",
    },
    works: [
      "Remplacement des vitrages",
      "Remplacement des menuiseries extérieures : fenêtres, portes et portails",
      "Isolation de la toiture, des murs, des sols",
      "Ventilation, obligatoire en accompagnement de certains travaux d'étanchéité",
      "Chauffage et travaux liés à la qualité du logement",
    ],
    conditions: [
      {
        title: "Ancienneté du logement",
        text: "Le logement doit avoir un certain nombre d'années d'existence pour ouvrir le droit aux catégories de rénovation énergétique.",
      },
      {
        title: "Travaux réalisés par une entreprise",
        text: "Les travaux doivent être exécutés et facturés par un entrepreneur ; l'auto-construction n'ouvre pas les mêmes droits.",
      },
      {
        title: "Performances thermiques minimales",
        text: "Des valeurs U maximales sont imposées, distinctement pour le vitrage et pour les menuiseries extérieures. Ces valeurs figurent sur nos devis et nos factures.",
      },
      {
        title: "Ventilation associée",
        text: "Le remplacement de fenêtres ou de menuiseries s'accompagne d'exigences de ventilation : rendre un logement plus étanche sans prévoir l'air neuf pose un problème d'humidité et de qualité de l'air.",
      },
      {
        title: "Catégorie de revenus",
        text: "L'accès et le niveau de l'aide dépendent de la catégorie de revenus. Depuis la réforme, les revenus les plus élevés sont orientés en priorité vers la formule de prêt plutôt que vers l'aide directe.",
      },
      {
        title: "Montant minimum de facture",
        text: "Un seuil minimum de facture par catégorie de travaux est appliqué.",
      },
    ],
    steps: [
      "Utiliser le simulateur officiel pour situer sa catégorie de revenus et les travaux concernés.",
      "Faire établir un devis détaillé mentionnant les valeurs U des vitrages et menuiseries.",
      "Introduire la demande via le guichet « Mijn VerbouwLoket ».",
      "Faire réaliser les travaux et rassembler les factures conformes.",
      "Suivre le dossier jusqu'à la décision.",
    ],
    sources: [
      {
        label: "Vlaanderen.be — Mijn VerbouwPremie",
        href: "https://www.vlaanderen.be/mijn-verbouwpremie",
      },
      { label: "Guichet Mijn VerbouwPremie", href: "https://www.mijnverbouwpremie.be/" },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },
];
