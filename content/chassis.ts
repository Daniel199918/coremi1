/**
 * ============================================================
 * CONTENU PÉDAGOGIQUE — CHÂSSIS, VITRAGE ET POSE
 * ============================================================
 *
 * Objectif : aider un propriétaire à DÉCIDER, pas lui vendre.
 *
 * RÈGLES :
 * 1. Aucune valeur chiffrée de performance (Uw, dB, classe RC). Elle
 *    dépend de la gamme, du vitrage, des dimensions et de la pose, et
 *    figure sur le devis pour le produit réellement proposé.
 * 2. Aucun superlatif invérifiable : ni « meilleure qualité », ni
 *    « solution parfaite ». On décrit des compromis.
 * 3. Aucun prix. Les facteurs de prix sont expliqués, pas chiffrés.
 *
 * ⚠️ Châssis bois : à confirmer par COREMI si ce matériau est réellement
 *    proposé, ou s'il n'est mentionné qu'à titre d'information.
 */

export type Material = {
  id: "pvc" | "aluminium" | "bois";
  name: string;
  short: string;
  strengths: string[];
  limits: string[];
  bestFor: string[];
  maintenance: string;
  lifespan: string;
};

export const materials: Material[] = [
  {
    id: "pvc",
    name: "PVC",
    short:
      "Le choix le plus courant en rénovation résidentielle. Bon rapport isolation/budget, mais des profilés plus larges qui réduisent la surface vitrée.",
    strengths: [
      "Très bon comportement thermique pour un budget contenu : la matière isole naturellement",
      "Aucun entretien de finition : pas de peinture ni de lasure à refaire",
      "Large disponibilité et délais généralement plus courts",
    ],
    limits: [
      "Profilés plus épais que l'aluminium : à ouverture égale, il entre un peu moins de lumière",
      "Grandes dimensions plus délicates : au-delà d'une certaine taille il faut des renforts, et le résultat s'alourdit visuellement",
      "Les teintes foncées chauffent davantage au soleil et vieillissent moins bien que sur l'aluminium",
    ],
    bestFor: [
      "Remplacement de fenêtres de dimensions courantes",
      "Projets où le budget prime sur la finesse visuelle",
      "Chambres, salles de bains, façades peu exposées au regard",
    ],
    maintenance: "Nettoyage à l'eau savonneuse et graissage occasionnel de la quincaillerie.",
    lifespan:
      "Plusieurs décennies pour un profilé de qualité correctement posé. Ce sont souvent les joints et la quincaillerie qui demandent une intervention avant le profilé lui-même.",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    short:
      "Profilés fins, grandes dimensions possibles, teintes stables. Plus cher, et l'isolation dépend entièrement de la rupture de pont thermique.",
    strengths: [
      "Profilés nettement plus fins : plus de clair de vitrage pour la même ouverture",
      "Permet de grandes baies et des coulissants que le PVC ne peut pas tenir",
      "Teintes thermolaquées très stables dans le temps, choix de couleurs très large",
      "Matériau recyclable, argument mis en avant par les fabricants",
    ],
    limits: [
      "Budget plus élevé à performance comparable",
      "L'aluminium conduit la chaleur : la performance dépend entièrement de la qualité de la rupture de pont thermique du système — c'est LE point à vérifier sur le devis",
      "Un aluminium bas de gamme peut isoler moins bien qu'un bon PVC : la matière seule ne dit rien",
    ],
    bestFor: [
      "Grandes baies vitrées et coulissants",
      "Architecture contemporaine où la finesse du profilé compte",
      "Projets cherchant une teinte précise et durable",
    ],
    maintenance: "Nettoyage régulier, en particulier en bord de route ou en atmosphère saline.",
    lifespan:
      "Très longue durée de vie du profilé ; le laquage conserve son aspect longtemps s'il est entretenu.",
  },
  {
    id: "bois",
    name: "Bois",
    short:
      "Le plus chaleureux visuellement et naturellement isolant, mais le seul qui demande un entretien régulier de finition.",
    strengths: [
      "Isolation naturelle du matériau, sans dispositif technique particulier",
      "Aspect et chaleur visuelle qu'aucun autre matériau ne reproduit vraiment",
      "Réparable localement : une zone abîmée se traite sans remplacer l'ensemble",
      "Souvent attendu, voire imposé, en zone patrimoniale",
    ],
    limits: [
      "Entretien de finition à reprendre périodiquement, davantage sur les façades exposées",
      "Budget généralement élevé, surtout en essences stables",
      "Sensible à l'exposition : une façade plein sud ou très pluvieuse demande plus de suivi",
    ],
    bestFor: [
      "Bâtiments anciens et zones où l'aspect est encadré",
      "Projets recherchant un caractère chaleureux",
      "Propriétaires prêts à assumer l'entretien",
    ],
    maintenance:
      "Reprise de la finition à intervalle régulier, variable selon l'exposition et le produit appliqué.",
    lifespan: "Très longue si l'entretien est suivi ; nettement réduite s'il ne l'est pas.",
  },
];

/** Les quatre éléments qui font réellement la performance d'un châssis. */
export const components = [
  {
    n: "01",
    title: "Le profilé",
    text: "C'est le cadre. Sa performance dépend du nombre de chambres isolantes en PVC, ou de la qualité de la rupture de pont thermique en aluminium. Deux profilés du même matériau peuvent avoir des performances très différentes : c'est la référence exacte du système qui compte, pas le nom de la marque.",
    check: "Demandez la référence précise du système, pas seulement la marque.",
  },
  {
    n: "02",
    title: "Le vitrage",
    text: "Il occupe la plus grande surface, donc il pèse le plus sur la performance thermique et acoustique de l'ensemble. Double ou triple vitrage, gaz de remplissage, couche à faible émissivité, intercalaire : ces choix comptent souvent plus que le matériau du cadre.",
    check: "Le devis doit indiquer la composition du vitrage, pas seulement « double vitrage ».",
  },
  {
    n: "03",
    title: "Les joints et la quincaillerie",
    text: "L'étanchéité à l'air et à l'eau se joue sur les joints ; la sécurité et la longévité, sur la quincaillerie. Ce sont les pièces qui s'usent en premier et qui décident du confort réel : une fenêtre qui ferme mal laisse passer l'air même avec un excellent vitrage.",
    check: "Demandez si les joints et la quincaillerie sont remplaçables sans changer le châssis.",
  },
  {
    n: "04",
    title: "La pose",
    text: "L'élément le plus déterminant, et le seul qui n'apparaît sur aucune fiche technique. Un raccord mal traité entre le dormant et la maçonnerie annule une partie de la performance annoncée et crée les infiltrations et condensations que l'on retrouve des années plus tard.",
    check: "Demandez comment le raccord à la maçonnerie sera traité, et qui en est responsable.",
  },
];

/** Critères de choix, avec le compromis associé. */
export const criteria = [
  {
    title: "Performance thermique",
    text: "Elle s'exprime par un coefficient de transmission thermique, distinct pour le vitrage et pour la fenêtre complète. C'est cette seconde valeur qui compte pour votre confort — et c'est elle que les dispositifs d'aide exigent. Nous l'indiquons sur nos devis.",
  },
  {
    title: "Isolation acoustique",
    text: "Elle dépend d'abord du vitrage — épaisseurs différentes entre les deux verres, feuilletage acoustique — puis de l'étanchéité. Le matériau du cadre y joue un rôle secondaire. Si vous êtes exposé au bruit, investissez sur le vitrage plutôt que sur le profilé.",
  },
  {
    title: "Sécurité",
    text: "Elle se construit avec trois éléments : la quincaillerie à points de verrouillage, le vitrage feuilleté, et la solidité de la fixation dans le mur. Un très bon châssis mal fixé n'apporte aucune sécurité supplémentaire.",
  },
  {
    title: "Lumière et esthétique",
    text: "À ouverture identique, un profilé fin laisse entrer plus de lumière : c'est l'argument principal de l'aluminium. Sur une façade visible, la largeur du cadre change la perception de la maison plus qu'on ne l'imagine.",
  },
  {
    title: "Ventilation",
    text: "Remplacer ses châssis rend le logement bien plus étanche. Sans apport d'air neuf, l'humidité produite au quotidien ne s'évacue plus : condensation, puis moisissures. C'est le problème le plus fréquent après un remplacement, et il se prévoit à la conception.",
  },
];

/** Ce qui fait varier le prix — sans chiffre. */
export const priceFactors = [
  { title: "Les dimensions et le nombre d'ouvrants", text: "Une baie fixe coûte moins qu'une fenêtre à deux ouvrants de même surface : c'est la quincaillerie et la complexité qui pèsent." },
  { title: "Le type d'ouverture", text: "Fixe, battant, oscillo-battant, coulissant, accordéon : la complexité mécanique augmente le coût." },
  { title: "Le vitrage", text: "Triple vitrage, feuilletage acoustique ou de sécurité, contrôle solaire : chaque option se paie." },
  { title: "La teinte et la finition", text: "Les teintes standard sont moins chères ; un laquage particulier ou une bicoloration intérieur/extérieur augmente le prix." },
  { title: "L'état de la baie existante", text: "Une pose en rénovation sur dormant conservé ne coûte pas la même chose qu'une dépose totale avec reprise de maçonnerie et de finitions." },
  { title: "L'accès", text: "Un étage sans accès facile, une façade en rue étroite ou un échafaudage nécessaire changent la logistique, donc les heures." },
];

/** Erreurs que nous voyons régulièrement. */
export const mistakes = [
  "Comparer deux devis sur le seul prix, sans vérifier la référence du système ni la composition du vitrage — ce sont deux produits différents.",
  "Choisir un matériau avant d'avoir défini ses priorités : lumière, budget, acoustique et entretien ne mènent pas au même choix.",
  "Remplacer les châssis sans traiter la ventilation, et découvrir la condensation l'hiver suivant.",
  "Accepter un devis qui ne mentionne pas les performances thermiques, alors qu'elles sont exigées par les dispositifs d'aide.",
  "Négliger la finition intérieure : tablettes, plafonnages et raccords font partie du chantier, pas de l'après.",
  "Commander avant d'avoir vérifié les démarches d'aide, dont plusieurs doivent précéder les travaux.",
];

/** Questions à poser avant de signer, quel que soit l'installateur. */
export const questionsToAsk = [
  "Quelle est la référence exacte du système de profilé proposé ?",
  "Quelle est la performance thermique de la fenêtre complète, pas seulement du vitrage ?",
  "De quoi est composé le vitrage : épaisseurs, gaz, couche à faible émissivité, feuilletage ?",
  "Comment le raccord entre le châssis et la maçonnerie sera-t-il traité ?",
  "Les finitions intérieures et extérieures sont-elles comprises dans le prix ?",
  "Quelle solution de ventilation est prévue après l'étanchéité renforcée ?",
  "Les joints et la quincaillerie sont-ils remplaçables séparément ?",
  "Qui intervient si une infiltration apparaît au raccord : le poseur ou le maçon ?",
  "Quel est le délai de fabrication, et qu'est-ce qui déclenche la commande ?",
  "Le devis contient-il tout ce qu'il faut pour un dossier de prime ?",
];

export const chassisPrestations = [
  {
    title: "Remplacement de châssis",
    description:
      "Dépose des anciens châssis, pose des nouveaux, resserrages et finitions intérieures. La maison reste habitable pendant les travaux.",
  },
  {
    title: "Portes d'entrée",
    description:
      "Portes PVC et aluminium, sécurisées, isolantes, assorties à vos châssis. Nous vous aidons à choisir un modèle qui tient dans le temps.",
  },
  {
    title: "Vitrages",
    description:
      "Double ou triple vitrage, vitrage acoustique ou sécurisé. Remplacement possible sans changer les châssis quand leur état le permet.",
  },
  {
    title: "Prise de mesures & conseil",
    description:
      "Nous mesurons chaque baie sur place et validons les détails qui font la différence : battées, seuils, resserrages, ventilation.",
  },
] as const;
