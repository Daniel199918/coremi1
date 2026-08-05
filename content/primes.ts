/**
 * ============================================================
 * CENTRE DES PRIMES — SOURCE UNIQUE DE VÉRITÉ
 * ============================================================
 *
 * Toutes les informations sensibles sur les aides publiques vivent ici,
 * et nulle part ailleurs. Les composants ne font que les afficher : une
 * mise à jour se fait donc en un seul endroit.
 *
 * RÈGLES DE RÉDACTION — à respecter pour toute modification :
 *
 * 1. AUCUN MONTANT chiffré n'est publié. Les barèmes dépendent des
 *    revenus, du statut du demandeur, du bâtiment et de la date. Un
 *    chiffre affiché ici serait faux pour la majorité des lecteurs et
 *    périmé en quelques mois. On décrit la MÉTHODE de calcul, pas le
 *    résultat.
 * 2. AUCUNE CONDITION n'est présentée comme garantie. On décrit des
 *    mécanismes et on renvoie systématiquement à l'administration.
 * 3. Chaque dispositif porte un STATUT visible et une DATE de
 *    vérification. Si `lastChecked` remonte à plus de trois mois, il
 *    faut revérifier avant de laisser la page en ligne.
 * 4. Les valeurs techniques (valeurs U, seuils, plafonds) ne sont
 *    citées que si elles ont pu être lues sur la source officielle.
 *    À défaut, on reste qualitatif et on renvoie au portail.
 *
 * ÉVOLUTION POSSIBLE : la forme de `schemes` (tableau d'objets plats,
 * typés, sans JSX) est directement transposable vers un CMS ou une
 * table de base de données, sans toucher aux composants.
 */

/* ------------------------------------------------------------------ */
/* Métadonnées générales                                               */
/* ------------------------------------------------------------------ */

/** Date de la dernière vérification complète auprès des portails officiels. */
export const PRIMES_LAST_CHECKED = "5 août 2026";

/** Rappel affiché partout où des aides sont évoquées. */
export const PRIMES_DISCLAIMER =
  "Ce site est un service informatif indépendant. Il n'est pas un site officiel de la Wallonie, de la Région de Bruxelles-Capitale ou de la Flandre, et n'est agréé par aucune administration. Les informations sont données à titre indicatif, les dispositifs évoluent régulièrement, et seule l'administration compétente peut confirmer votre éligibilité.";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type RegionId = "wallonie" | "bruxelles" | "flandre" | "federal";

/**
 * Statut d'un dispositif, affiché sous forme de pastille.
 * - actif       : ouvert aux demandes au moment de la vérification
 * - modifie     : ouvert mais avec une réforme actée ou en cours
 * - suspendu    : temporairement fermé
 * - termine     : clôturé, plus aucune demande possible
 * - a-verifier  : annoncé ou incertain, à confirmer avant de s'y fier
 */
export type SchemeStatus = "actif" | "modifie" | "suspendu" | "termine" | "a-verifier";

export type CategoryId =
  | "chassis"
  | "vitrage"
  | "portes"
  | "isolation"
  | "ventilation"
  | "chauffage"
  | "audit"
  | "renovation";

export type Source = { label: string; href: string };

export type Scheme = {
  id: string;
  /** Nom officiel du dispositif, tel qu'employé par l'administration. */
  name: string;
  regionId: RegionId;
  categories: CategoryId[];
  status: SchemeStatus;
  /** Précision affichée à côté de la pastille de statut. */
  statusNote?: string;
  /** Résumé en langage simple, deux à trois phrases. */
  summary: string;
  startDate?: string;
  endDate?: string;
  works: string[];
  conditions: { title: string; text: string }[];
  /** Méthode de calcul — jamais un montant chiffré. */
  amountMethod: string;
  documents: string[];
  steps: string[];
  /** Erreurs qui font le plus souvent échouer un dossier. */
  mistakes: string[];
  sources: Source[];
  lastChecked: string;
};

export type RegionMeta = {
  id: RegionId;
  name: string;
  shortName: string;
  authority: string;
  /** Portail officiel principal. */
  portal: Source;
  intro: string;
  /** Point d'attention majeur du moment. */
  alert?: { title: string; text: string };
};

/* ------------------------------------------------------------------ */
/* Régions                                                             */
/* ------------------------------------------------------------------ */

export const regionsMeta: RegionMeta[] = [
  {
    id: "wallonie",
    name: "Wallonie",
    shortName: "Wallonie",
    authority: "Service public de Wallonie — Énergie & Logement",
    portal: { label: "energie.wallonie.be", href: "https://energie.wallonie.be/" },
    intro:
      "La Wallonie soutient la rénovation du logement et l'amélioration de ses performances énergétiques, dont le remplacement des menuiseries extérieures et des vitrages. L'accompagnement technique préalable y joue un rôle central : dans plusieurs cas, il conditionne l'accès à l'aide.",
    alert: {
      title: "Changement de régime annoncé au 1er octobre 2026",
      text: "Le régime actuel doit céder la place à un système réorganisé autour du Rénopack et du Rénoprêt, avec des aides directes recentrées sur les ménages aux revenus modestes et sur les logements les moins performants. Si votre chantier est proche, la date de dépôt de votre dossier peut donc tout changer : vérifiez le calendrier exact auprès du SPW avant de vous engager.",
    },
  },
  {
    id: "bruxelles",
    name: "Région de Bruxelles-Capitale",
    shortName: "Bruxelles",
    authority: "Bruxelles Environnement & urban.brussels",
    portal: { label: "renolution.brussels", href: "https://renolution.brussels/fr" },
    intro:
      "Bruxelles a regroupé ses aides à la rénovation dans un guichet unique, RENOLUTION, qui rassemble les anciennes primes énergie, rénovation et embellissement de façade. Le remplacement des châssis et des vitrages fait partie des travaux visés.",
    alert: {
      title: "Dispositifs révisés à plusieurs reprises",
      text: "Le régime a connu des ajustements, des suspensions temporaires et des modifications de périmètre au fil des budgets régionaux, et des formules de prêt complètent aujourd'hui les aides directes. Le périmètre, les délais et les montants doivent être vérifiés au moment précis de votre demande — pas d'après un article trouvé en ligne.",
    },
  },
  {
    id: "flandre",
    name: "Flandre",
    shortName: "Flandre",
    authority: "Vlaamse overheid",
    portal: {
      label: "vlaanderen.be/mijn-verbouwpremie",
      href: "https://www.vlaanderen.be/mijn-verbouwpremie",
    },
    intro:
      "La Flandre réunit ses aides à la rénovation et aux investissements économiseurs d'énergie sous « Mijn VerbouwPremie », complétée par le prêt « Mijn VerbouwLening ». Le remplacement des vitrages et des menuiseries extérieures constitue une catégorie de travaux à part entière.",
    alert: {
      title: "Réforme entrée en vigueur le 1er mars 2026",
      text: "Depuis le 1er mars 2026, le régime a été réformé, avec un impact marqué sur les propriétaires occupants des catégories de revenus les plus élevées et sur les autres investisseurs. D'autres évolutions concernant les bailleurs privés sont annoncées pour 2027 mais ne sont pas définitives.",
    },
  },
  {
    id: "federal",
    name: "Niveau fédéral",
    shortName: "Fédéral",
    authority: "SPF Finances",
    portal: { label: "finances.belgium.be", href: "https://finances.belgium.be/fr" },
    intro:
      "Certains avantages ne dépendent pas de la Région mais du niveau fédéral, en premier lieu le taux de TVA applicable aux travaux de rénovation d'une habitation privée.",
  },
];

export const categoriesMeta: { id: CategoryId; label: string; description: string }[] = [
  { id: "chassis", label: "Châssis & menuiseries", description: "Remplacement des menuiseries extérieures : fenêtres, portes-fenêtres, portails." },
  { id: "vitrage", label: "Vitrage", description: "Remplacement du vitrage par un vitrage à haute performance thermique." },
  { id: "portes", label: "Portes extérieures", description: "Portes d'entrée et portes donnant sur l'extérieur." },
  { id: "isolation", label: "Isolation", description: "Toiture, murs, sols : l'enveloppe du bâtiment." },
  { id: "ventilation", label: "Ventilation", description: "Systèmes de ventilation, souvent imposés en complément d'une étanchéité renforcée." },
  { id: "chauffage", label: "Chauffage & eau chaude", description: "Systèmes de production de chaleur et d'eau chaude sanitaire." },
  { id: "audit", label: "Audit & accompagnement", description: "Audit logement, accompagnement technique préalable aux travaux." },
  { id: "renovation", label: "Rénovation globale", description: "Travaux de rénovation lourde et amélioration de la qualité du logement." },
];

/* ------------------------------------------------------------------ */
/* Dispositifs                                                         */
/* ------------------------------------------------------------------ */

export const schemes: Scheme[] = [
  /* ---------------------------- WALLONIE ---------------------------- */
  {
    id: "wal-primes-habitation",
    name: "Primes Habitation (régime en vigueur)",
    regionId: "wallonie",
    categories: ["chassis", "vitrage", "portes", "isolation", "ventilation", "chauffage", "renovation"],
    status: "modifie",
    statusNote: "Ouvert, mais une réforme est annoncée au 1er octobre 2026",
    summary:
      "Le dispositif wallon de soutien à la rénovation du logement, qui couvre notamment le remplacement des menuiseries extérieures et des vitrages. Le montant est modulé selon les revenus et la composition du ménage, et l'accès dépend le plus souvent d'un accompagnement technique réalisé avant les travaux.",
    endDate: "Fin annoncée du régime actuel : 30 septembre 2026 (à confirmer auprès du SPW)",
    works: [
      "Remplacement de châssis et menuiseries extérieures",
      "Remplacement ou amélioration des vitrages",
      "Isolation du toit, des murs et des sols",
      "Ventilation associée aux travaux d'étanchéité",
      "Systèmes de chauffage et d'eau chaude sanitaire",
      "Travaux de salubrité et de rénovation du bâti",
    ],
    conditions: [
      { title: "Logement existant", text: "L'aide vise les logements existants depuis un certain nombre d'années et destinés à l'habitation. Les seuils précis dépendent du type de travaux." },
      { title: "Audit ou accompagnement préalable", text: "Pour les rénovations importantes, un audit logement par un auditeur agréé — ou un accompagnement équivalent — est en principe requis AVANT le début des travaux." },
      { title: "Exigences techniques", text: "Les vitrages et menuiseries doivent atteindre une performance thermique minimale, exprimée en coefficient de transmission thermique (valeur U). Le seuil exact figure sur le portail officiel ; nous indiquons ces valeurs sur nos devis." },
      { title: "Revenus du ménage", text: "Le montant est modulé par catégories de revenus et par composition de ménage. C'est ce qui fait le plus varier le résultat d'un dossier à l'autre." },
      { title: "Travaux facturés par une entreprise", text: "Une facture détaillée d'entreprise est exigée. Un descriptif trop vague peut bloquer le dossier." },
    ],
    amountMethod:
      "Le montant se construit à partir d'un montant de base par type de travaux, multiplié par un coefficient lié aux revenus et à la composition du ménage, dans la limite d'un plafond. Nous ne publions pas ces valeurs : elles évoluent et dépendent entièrement de votre situation. Le portail officiel propose les barèmes à jour.",
    documents: [
      "Rapport d'audit logement ou document d'accompagnement, lorsqu'il est requis",
      "Devis détaillé mentionnant les performances techniques des matériaux",
      "Factures finales détaillées de l'entreprise",
      "Preuve de propriété ou titre d'occupation",
      "Justificatifs de revenus du ménage",
      "Composition de ménage",
    ],
    steps: [
      "Vérifier son éligibilité sur le portail officiel avant toute chose.",
      "Faire réaliser l'audit ou l'accompagnement requis — avant le début des travaux.",
      "Obtenir un devis détaillé mentionnant les performances des matériaux.",
      "Introduire la demande selon la procédure en vigueur au moment du chantier.",
      "Faire réaliser les travaux et conserver toutes les pièces.",
      "Transmettre les justificatifs finaux dans les délais imposés.",
    ],
    mistakes: [
      "Commencer les travaux avant l'audit ou avant l'introduction du dossier : c'est le motif de refus le plus fréquent.",
      "Accepter un devis qui ne mentionne pas les performances techniques des châssis ou du vitrage.",
      "Faire réaliser une partie des travaux sans facture.",
      "Laisser passer le délai de transmission des pièces finales.",
      "Attendre la dernière minute alors qu'un changement de régime est annoncé.",
    ],
    sources: [
      { label: "Portail Énergie de la Wallonie", href: "https://energie.wallonie.be/" },
      { label: "Wallonie.be — primes pour la rénovation du logement", href: "https://www.wallonie.be/fr/demarches/obtenir-des-primes-pour-la-renovation-de-son-logement" },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },
  {
    id: "wal-renopack-renopret",
    name: "Rénopack & Rénoprêt (régime annoncé)",
    regionId: "wallonie",
    categories: ["renovation", "isolation", "chassis", "chauffage"],
    status: "a-verifier",
    statusNote: "Entrée en vigueur annoncée au 1er octobre 2026 — modalités à confirmer",
    summary:
      "Le régime appelé à succéder aux primes habitation, organisé autour de formules de prêt à taux avantageux complétées d'aides directes ciblées sur les ménages aux revenus modestes et les logements les moins performants.",
    startDate: "Entrée en vigueur annoncée : 1er octobre 2026",
    works: [
      "Rénovation énergétique du logement",
      "Isolation de l'enveloppe",
      "Remplacement des menuiseries extérieures",
      "Systèmes de chauffage performants",
    ],
    conditions: [
      { title: "Modalités non définitives", text: "Les conditions détaillées, les plafonds et les publics visés doivent être confirmés auprès du SPW. Ne prenez aucune décision d'investissement sur la base d'annonces de presse." },
      { title: "Logique de prêt", text: "Le nouveau régime déplace le centre de gravité de l'aide directe vers le prêt à taux avantageux, avec un soutien renforcé pour les revenus les plus modestes." },
      { title: "Performance visée", text: "Le dispositif est annoncé comme priorisant les logements les moins performants et les sauts de classe énergétique significatifs." },
    ],
    amountMethod:
      "Non confirmé à la date de vérification. Les paramètres annoncés portent sur un plafond de prêt relevé et des aides directes ciblées, mais aucune valeur ne peut être publiée ici tant que les textes ne sont pas en vigueur.",
    documents: ["À confirmer auprès du SPW lorsque le régime entrera en vigueur."],
    steps: [
      "Si votre chantier est proche, comparer les deux calendriers : régime actuel jusqu'à sa clôture, nouveau régime ensuite.",
      "Vérifier auprès du SPW la date exacte d'entrée en vigueur et les conditions définitives.",
      "Ne pas retarder ni précipiter un chantier sans avoir cette information écrite.",
    ],
    mistakes: [
      "Supposer que le nouveau régime sera plus avantageux — ou moins — sans avoir lu les conditions officielles.",
      "Décaler un chantier sur la base d'un article de presse plutôt que d'une source administrative.",
    ],
    sources: [
      { label: "Portail Énergie de la Wallonie", href: "https://energie.wallonie.be/" },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },
  {
    id: "wal-audit-logement",
    name: "Audit Logement",
    regionId: "wallonie",
    categories: ["audit"],
    status: "actif",
    summary:
      "L'audit réalisé par un auditeur agréé établit un état des lieux du logement et un ordre de priorité des travaux. En Wallonie, il conditionne l'accès à plusieurs aides et doit précéder le chantier.",
    works: ["Diagnostic complet du logement", "Rapport avec bouquets de travaux hiérarchisés"],
    conditions: [
      { title: "Auditeur agréé", text: "L'audit doit être réalisé par un auditeur figurant sur la liste officielle des agréments." },
      { title: "Avant les travaux", text: "L'audit doit précéder le début du chantier pour ouvrir les droits associés." },
      { title: "Suivi de l'ordre des travaux", text: "Le rapport hiérarchise les travaux ; l'ordre recommandé influence l'accès aux aides des étapes suivantes." },
    ],
    amountMethod: "L'audit lui-même peut faire l'objet d'un soutien financier, modulé selon les revenus. Barème disponible sur le portail officiel.",
    documents: ["Rapport d'audit", "Facture de l'auditeur agréé"],
    steps: [
      "Choisir un auditeur agréé sur la liste officielle.",
      "Faire réaliser l'audit avant tout début de travaux.",
      "Utiliser le rapport pour construire l'ordre du chantier et le dossier d'aides.",
    ],
    mistakes: [
      "Faire appel à un « auditeur » non agréé : le rapport n'ouvre alors aucun droit.",
      "Faire réaliser l'audit après avoir commencé les travaux.",
    ],
    sources: [{ label: "Portail Énergie de la Wallonie", href: "https://energie.wallonie.be/" }],
    lastChecked: PRIMES_LAST_CHECKED,
  },

  /* ---------------------------- BRUXELLES --------------------------- */
  {
    id: "bxl-renolution",
    name: "Primes RENOLUTION",
    regionId: "bruxelles",
    categories: ["chassis", "vitrage", "portes", "isolation", "ventilation", "chauffage", "renovation"],
    status: "modifie",
    statusNote: "Guichet unique en vigueur, périmètre ajusté à plusieurs reprises",
    summary:
      "Le guichet unique bruxellois, qui rassemble depuis 2022 les anciennes primes énergie, rénovation et embellissement de façade. Les aides sont modulées par catégories de revenus, avec un soutien renforcé pour les ménages modestes.",
    startDate: "Guichet unique lancé le 1er juillet 2022",
    works: [
      "Remplacement de châssis et menuiseries extérieures",
      "Remplacement de vitrages par du vitrage performant",
      "Isolation de la toiture, des murs et des sols",
      "Ventilation",
      "Chauffage et eau chaude sanitaire",
      "Travaux de rénovation et de salubrité",
      "Embellissement de façade, selon les conditions en vigueur",
    ],
    conditions: [
      { title: "Bien situé en Région bruxelloise", text: "Le logement doit se trouver sur le territoire d'une des 19 communes." },
      { title: "Qualité du demandeur", text: "Propriétaire occupant, propriétaire bailleur, locataire ou copropriété : la qualité du demandeur conditionne l'accès et le niveau de l'aide." },
      { title: "Catégories de revenus", text: "Les montants sont modulés par catégories de revenus du ménage." },
      { title: "Performances techniques", text: "Les vitrages et menuiseries doivent respecter des exigences de performance thermique minimales, publiées sur le portail." },
      { title: "Calendrier strict", text: "Selon les dispositifs, la demande doit être introduite avant les travaux ou dans un délai précis après la facture finale. Un dossier hors délai est refusé même si les travaux étaient éligibles." },
    ],
    amountMethod:
      "Le montant repose sur un montant de base par poste de travaux, modulé par la catégorie de revenus du ménage, dans la limite de plafonds par poste et par bien. Les barèmes en vigueur sont publiés sur le portail RENOLUTION.",
    documents: [
      "Devis détaillé et facture finale mentionnant les performances des matériaux",
      "Preuve de propriété, bail ou mandat de copropriété",
      "Justificatifs de revenus",
      "Composition de ménage",
      "Photos avant/après pour certains postes",
    ],
    steps: [
      "Consulter le portail RENOLUTION pour identifier les primes ouvertes au moment du projet.",
      "Vérifier l'ordre imposé : demande avant travaux, ou dans le délai suivant la facture.",
      "Rassembler les documents demandés.",
      "Introduire la demande via la procédure officielle en ligne.",
      "Réaliser les travaux avec une entreprise et obtenir une facture conforme.",
      "Transmettre les pièces finales dans le délai imposé.",
    ],
    mistakes: [
      "Introduire le dossier hors délai après la facture finale.",
      "Fournir une facture qui ne détaille pas les matériaux et leurs performances.",
      "Oublier les photos avant travaux, impossibles à reconstituer après.",
      "Se fier à un montant lu dans un article plutôt qu'au barème officiel du moment.",
    ],
    sources: [
      { label: "Portail officiel des primes RENOLUTION", href: "https://renolution.brussels/fr" },
      { label: "Bruxelles Environnement", href: "https://environnement.brussels/" },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },

  /* ----------------------------- FLANDRE ---------------------------- */
  {
    id: "vl-mijn-verbouwpremie",
    name: "Mijn VerbouwPremie",
    regionId: "flandre",
    categories: ["chassis", "vitrage", "portes", "isolation", "ventilation", "chauffage", "renovation"],
    status: "modifie",
    statusNote: "Réforme entrée en vigueur le 1er mars 2026",
    summary:
      "L'aide flamande unique pour la rénovation et les investissements économiseurs d'énergie. Le remplacement du vitrage et des menuiseries extérieures constitue une catégorie de travaux à part entière, soumise à des exigences techniques et à une obligation de ventilation.",
    startDate: "Réforme en vigueur depuis le 1er mars 2026",
    works: [
      "Remplacement des vitrages",
      "Remplacement des menuiseries extérieures : fenêtres, portes, portails",
      "Isolation de la toiture, des murs et des sols",
      "Ventilation",
      "Chauffage et travaux de qualité du logement",
    ],
    conditions: [
      { title: "Ancienneté du logement", text: "Le logement doit avoir un certain nombre d'années d'existence pour ouvrir droit aux catégories de rénovation énergétique." },
      { title: "Travaux réalisés par une entreprise", text: "Les travaux doivent être exécutés et facturés par un entrepreneur ; l'auto-construction n'ouvre pas les mêmes droits." },
      { title: "Performances thermiques minimales", text: "Des valeurs U maximales sont imposées, distinctement pour le vitrage et pour les menuiseries extérieures. Les seuils exacts figurent sur le portail officiel et sur nos devis." },
      { title: "Ventilation obligatoire", text: "Le remplacement de fenêtres s'accompagne d'exigences de ventilation : renforcer l'étanchéité sans prévoir d'air neuf crée un problème d'humidité et de qualité de l'air." },
      { title: "Catégorie de revenus", text: "Depuis la réforme de mars 2026, les catégories de revenus les plus élevées sont orientées en priorité vers la formule de prêt plutôt que vers l'aide directe." },
      { title: "Montant minimum de facture", text: "Un seuil minimum de facture par catégorie de travaux est appliqué." },
    ],
    amountMethod:
      "Un pourcentage de la facture, plafonné, variable selon la catégorie de travaux et la catégorie de revenus. Le simulateur officiel est le seul moyen fiable d'obtenir une estimation adaptée à votre situation.",
    documents: [
      "Factures détaillées mentionnant les valeurs U des vitrages et menuiseries",
      "Preuve de propriété ou droit réel sur le bien",
      "Données de revenus (récupérées par l'administration)",
      "Attestation de ventilation lorsqu'elle est requise",
    ],
    steps: [
      "Utiliser le simulateur officiel pour situer sa catégorie de revenus et les travaux concernés.",
      "Faire établir un devis mentionnant les valeurs U des vitrages et menuiseries.",
      "Introduire la demande via le guichet « Mijn VerbouwLoket ».",
      "Faire réaliser les travaux et rassembler les factures conformes.",
      "Suivre le dossier jusqu'à la décision.",
    ],
    mistakes: [
      "Remplacer les fenêtres sans traiter la ventilation : problème d'humidité, et condition non remplie.",
      "Accepter une facture qui n'indique pas les valeurs U.",
      "Ignorer le seuil minimum de facture par catégorie.",
      "Se baser sur les règles d'avant mars 2026.",
    ],
    sources: [
      { label: "Vlaanderen.be — Mijn VerbouwPremie", href: "https://www.vlaanderen.be/mijn-verbouwpremie" },
      { label: "Guichet Mijn VerbouwPremie", href: "https://www.mijnverbouwpremie.be/" },
    ],
    lastChecked: PRIMES_LAST_CHECKED,
  },
  {
    id: "vl-mijn-verbouwlening",
    name: "Mijn VerbouwLening",
    regionId: "flandre",
    categories: ["renovation", "isolation", "chassis", "chauffage"],
    status: "actif",
    summary:
      "Le prêt à taux avantageux flamand, destiné à financer des rénovations portant à la fois sur la qualité du logement et sur la performance énergétique. Il complète la prime et, depuis la réforme, devient la voie principale pour les revenus les plus élevés.",
    works: ["Rénovation énergétique", "Travaux de qualité du logement", "Remplacement des menuiseries"],
    conditions: [
      { title: "Public visé", text: "Les conditions d'accès et le taux dépendent du profil du demandeur et de la nature des travaux." },
      { title: "Travaux éligibles", text: "Le prêt couvre des catégories de travaux définies, proches de celles de la prime." },
    ],
    amountMethod:
      "Prêt plafonné, à taux réduit variable selon le profil. Le montant maximum et le taux applicable sont publiés sur le portail officiel.",
    documents: ["Devis des travaux envisagés", "Documents de revenus et de propriété"],
    steps: [
      "Vérifier son éligibilité sur le portail officiel.",
      "Constituer le dossier avec les devis.",
      "Introduire la demande via le guichet officiel.",
    ],
    mistakes: ["Confondre prime et prêt : ce sont deux dispositifs distincts, cumulables ou non selon les cas."],
    sources: [{ label: "Vlaanderen.be — Mijn VerbouwPremie", href: "https://www.vlaanderen.be/mijn-verbouwpremie" }],
    lastChecked: PRIMES_LAST_CHECKED,
  },

  /* ----------------------------- FÉDÉRAL ---------------------------- */
  {
    id: "fed-tva-renovation",
    name: "TVA réduite pour la rénovation d'une habitation privée",
    regionId: "federal",
    categories: ["chassis", "vitrage", "portes", "isolation", "renovation"],
    status: "actif",
    summary:
      "Les travaux réalisés dans une habitation privée suffisamment ancienne peuvent relever d'un taux de TVA réduit plutôt que du taux normal. C'est souvent l'avantage financier le plus important d'un chantier de rénovation — et il ne se demande pas : il s'applique directement sur la facture.",
    works: [
      "Remplacement de châssis et vitrages",
      "Travaux d'isolation",
      "Rénovation et transformation du bâti",
    ],
    conditions: [
      { title: "Ancienneté du logement", text: "L'habitation doit avoir atteint un certain âge à la date du fait générateur de la taxe. Le seuil est fixé par la réglementation fédérale." },
      { title: "Usage privé", text: "Le bien doit être affecté, exclusivement ou principalement, au logement privé." },
      { title: "Facturation par un entrepreneur", text: "Les travaux doivent être fournis et facturés par un entrepreneur enregistré ; le taux réduit ne s'applique pas aux matériaux achetés seul." },
      { title: "Attestation du client", text: "Une mention ou une attestation engageant le client sur le respect des conditions est requise. C'est le client qui atteste, l'entrepreneur applique." },
    ],
    amountMethod:
      "Il ne s'agit pas d'une prime mais d'un taux de TVA réduit appliqué directement sur la facture. L'économie dépend donc du montant des travaux et de l'écart entre le taux réduit et le taux normal.",
    documents: ["Attestation du client sur l'affectation et l'ancienneté du logement", "Facture mentionnant le taux appliqué et sa justification"],
    steps: [
      "Signaler l'ancienneté et l'usage du logement dès la demande de devis.",
      "Signer l'attestation demandée par l'entrepreneur.",
      "Vérifier que la facture mentionne le taux appliqué.",
    ],
    mistakes: [
      "Découvrir la question au moment de la facture, alors que le devis avait été établi au taux normal.",
      "Croire que le taux réduit s'applique à tous les travaux ou à tous les logements.",
    ],
    sources: [{ label: "SPF Finances", href: "https://finances.belgium.be/fr" }],
    lastChecked: PRIMES_LAST_CHECKED,
  },
];

/* ------------------------------------------------------------------ */
/* Historique des changements notables                                 */
/* ------------------------------------------------------------------ */

export const primesChangelog: { date: string; region: string; text: string }[] = [
  {
    date: "1er mars 2026",
    region: "Flandre",
    text: "Réforme de Mijn VerbouwPremie : impact principal sur les propriétaires occupants des deux catégories de revenus les plus élevées et sur les autres investisseurs, orientés vers la formule de prêt.",
  },
  {
    date: "1er octobre 2026 (annoncé)",
    region: "Wallonie",
    text: "Bascule annoncée vers un régime organisé autour du Rénopack et du Rénoprêt, avec des aides directes recentrées. Date et modalités à confirmer auprès du SPW.",
  },
  {
    date: "1er juillet 2022",
    region: "Bruxelles",
    text: "Lancement du guichet unique RENOLUTION, fusionnant les anciennes primes énergie, rénovation et embellissement de façade.",
  },
];

/* ------------------------------------------------------------------ */
/* Accès aux données                                                   */
/* ------------------------------------------------------------------ */

export const statusLabels: Record<SchemeStatus, string> = {
  actif: "Actif",
  modifie: "Modifié",
  suspendu: "Suspendu",
  termine: "Terminé",
  "a-verifier": "À vérifier",
};

export function getRegion(id: string): RegionMeta | undefined {
  return regionsMeta.find((r) => r.id === id);
}

export function schemesByRegion(id: RegionId): Scheme[] {
  return schemes.filter((s) => s.regionId === id);
}

export function schemesByCategory(id: CategoryId): Scheme[] {
  return schemes.filter((s) => s.categories.includes(id));
}

export function getScheme(id: string): Scheme | undefined {
  return schemes.find((s) => s.id === id);
}

/**
 * Dispositifs pertinents pour une région donnée, en incluant toujours le
 * niveau fédéral : la TVA réduite s'applique quelle que soit la Région.
 */
export function schemesForRegionWithFederal(id: RegionId): Scheme[] {
  return schemes.filter((s) => s.regionId === id || s.regionId === "federal");
}
