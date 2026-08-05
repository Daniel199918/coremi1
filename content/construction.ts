/** Contenu de la page Construction & Rénovation. */

export const constructionPrestations = [
  {
    title: "Gros œuvre",
    description:
      "Terrassement, fondations, maçonnerie porteuse, dalles et mise sous toit. La structure de votre projet, exécutée selon les plans de votre architecte.",
  },
  {
    title: "Extensions & annexes",
    description:
      "Agrandir sans dénaturer. Nous raccordons l'extension à l'existant proprement : niveaux, isolation, étanchéité, jonctions de toiture.",
  },
  {
    title: "Rénovation complète",
    description:
      "Réagencement des espaces, remplacement des sols et cloisons, remise à neuf des pièces d'eau. Un seul chantier, un seul planning.",
  },
  {
    title: "Transformations structurelles",
    description:
      "Ouverture de murs porteurs, pose de poutres, création de baies. Les interventions lourdes, préparées avec l'ingénieur en stabilité.",
  },
  {
    title: "Façades",
    description:
      "Rénovation de façades, isolation par l'extérieur, nouvel enduit ou parement. L'aspect de votre maison change, sa performance aussi.",
  },
  {
    title: "Coordination de chantier",
    description:
      "Nous planifions et coordonnons les corps de métier pour que le chantier avance sans temps morts, et vous tenons informé chaque semaine.",
  },
] as const;

/**
 * ============================================================
 * PARCOURS DE RÉNOVATION — CONTENU PÉDAGOGIQUE
 * ============================================================
 *
 * Objectif : faire comprendre l'ORDRE des travaux et les
 * interactions entre lots, là où se jouent les vrais surcoûts.
 *
 * ⚠️ Aucun délai ni budget chiffré : ils dépendent entièrement de
 * l'existant, de l'accès et du niveau de finition.
 */

export type ProjectPath = {
  id: string;
  label: string;
  summary: string;
  /** Travaux généralement associés, dans l'ordre recommandé. */
  works: string[];
  /** Points d'attention propres à ce type de projet. */
  watchouts: string[];
  /** Aides à vérifier — jamais présentées comme acquises. */
  primes: string;
  /** Ce qu'il faut réunir pour obtenir un devis utile. */
  devisInputs: string[];
};

export const projectPaths: ProjectPath[] = [
  {
    id: "chassis-seuls",
    label: "Je remplace mes châssis",
    summary:
      "Le chantier le plus courant, et celui où l'on oublie le plus souvent une conséquence : un logement nettement plus étanche qu'avant.",
    works: [
      "Relevé des baies et vérification de l'état des appuis et linteaux",
      "Choix du système, du vitrage et du mode d'ouverture",
      "Dépose des anciens châssis et pose des nouveaux",
      "Traitement du raccord entre dormant et maçonnerie",
      "Finitions intérieures : tablettes, plafonnages, peintures de raccord",
      "Mise en place ou vérification de la ventilation",
    ],
    watchouts: [
      "Sans apport d'air neuf, la condensation apparaît dès le premier hiver : la ventilation n'est pas une option.",
      "Si une isolation de façade est envisagée plus tard, la position du châssis dans l'épaisseur du mur doit être décidée maintenant.",
      "Les finitions intérieures font partie du chantier : un devis qui les omet n'est pas comparable.",
    ],
    primes: "Le remplacement de menuiseries et de vitrages est soutenu dans les trois Régions, sous conditions de performance thermique et de calendrier.",
    devisInputs: [
      "Le nombre d'ouvertures et leurs dimensions approximatives",
      "Des photos de l'intérieur et de l'extérieur de quelques baies",
      "L'étage et les conditions d'accès",
      "Votre priorité : budget, lumière, acoustique ou entretien",
    ],
  },
  {
    id: "renovation-energetique",
    label: "Je rénove énergétiquement",
    summary:
      "Châssis, isolation, ventilation et chauffage forment un système. Les traiter séparément coûte plus cher et donne un moins bon résultat.",
    works: [
      "Audit ou état des lieux : par où commencer, dans quel ordre",
      "Isolation de la toiture, généralement le meilleur rapport gain/coût",
      "Isolation des murs, selon la configuration",
      "Remplacement des menuiseries et vitrages",
      "Ventilation, dimensionnée pour l'étanchéité obtenue",
      "Chauffage, redimensionné une fois les besoins réduits",
    ],
    watchouts: [
      "L'ordre compte : remplacer la chaudière avant d'isoler conduit à surdimensionner l'installation, et à payer deux fois.",
      "En Wallonie, l'audit doit précéder les travaux pour ouvrir certains droits.",
      "Chaque renforcement d'étanchéité augmente l'exigence de ventilation.",
      "Les ponts thermiques se déplacent : isoler un mur sans traiter le raccord au châssis crée un point froid.",
    ],
    primes: "C'est le type de projet le plus soutenu, mais aussi le plus encadré : plusieurs démarches doivent précéder le chantier.",
    devisInputs: [
      "L'année de construction approximative",
      "Ce qui a déjà été isolé ou remplacé",
      "Le mode de chauffage actuel",
      "Un audit existant, si vous en avez un",
    ],
  },
  {
    id: "extension",
    label: "J'agrandis ma maison",
    summary:
      "Le point sensible n'est pas l'extension elle-même, c'est sa jonction avec l'existant : niveaux, étanchéité, isolation, raccords de toiture.",
    works: [
      "Vérification des autorisations nécessaires auprès de la commune",
      "Étude de stabilité si l'existant est touché",
      "Terrassement et fondations de l'extension",
      "Élévation, mise sous toit et raccord à la toiture existante",
      "Menuiseries extérieures",
      "Second œuvre et raccords de finition avec l'existant",
    ],
    watchouts: [
      "Une extension modifie presque toujours l'aspect extérieur : le passage par le service urbanisme de la commune est à vérifier en premier.",
      "Le raccord de toiture est l'endroit où les infiltrations apparaissent des années plus tard.",
      "Les niveaux de sol entre existant et extension se décident très tôt, et ne se rattrapent pas.",
    ],
    primes: "Une extension neuve relève de règles différentes de la rénovation : les aides à la rénovation énergétique n'y sont pas automatiquement applicables.",
    devisInputs: [
      "La surface approximative visée",
      "Des photos de la façade et de la zone concernée",
      "Les plans existants, si vous en disposez",
      "Le nom de votre architecte s'il est déjà désigné",
    ],
  },
  {
    id: "renovation-lourde",
    label: "Je rénove entièrement",
    summary:
      "Une rénovation complète est avant tout un problème d'ordonnancement. Ce qui coûte cher, ce sont les reprises dues à un mauvais séquencement.",
    works: [
      "Diagnostic de l'existant : structure, humidité, réseaux",
      "Démolitions et évacuations",
      "Gros œuvre et interventions structurelles",
      "Toiture et étanchéité",
      "Menuiseries extérieures, une fois le bâtiment clos",
      "Techniques : électricité, plomberie, ventilation, chauffage",
      "Isolation, cloisons et plafonnages",
      "Finitions et réception",
    ],
    watchouts: [
      "Le diagnostic conditionne tout : ce qui se cache derrière un mur ne se voit qu'une fois ouvert, et c'est la première source de surcoût.",
      "Les techniques passent avant les finitions : refaire un plafonnage pour un câble oublié est une perte sèche.",
      "Une rénovation lourde mal planifiée immobilise le logement bien plus longtemps que prévu.",
      "Chaque corps de métier dépend du précédent : un retard se propage à toute la chaîne.",
    ],
    primes: "Plusieurs dispositifs peuvent se combiner selon les postes, avec des conditions et des calendriers distincts pour chacun.",
    devisInputs: [
      "L'état actuel du bien et son année de construction",
      "Ce que vous souhaitez conserver",
      "Des photos de chaque pièce concernée",
      "Votre calendrier et vos contraintes d'occupation",
    ],
  },
];

/** Décisions à prendre AVANT le premier coup de pelle. */
export const preDecisions = [
  {
    title: "L'ordre des travaux",
    text: "C'est la décision qui a le plus d'impact financier, et celle à laquelle on réfléchit le moins. Isoler après avoir remplacé la chaudière, ou plafonner avant d'avoir tiré les câbles, se paie deux fois.",
  },
  {
    title: "Le niveau de finition visé",
    text: "Le gros œuvre varie peu d'un devis à l'autre ; les finitions, énormément. Définir le niveau visé dès le départ évite les arbitrages en urgence en fin de chantier.",
  },
  {
    title: "Les autorisations",
    text: "Modification de volume, changement d'aspect en façade, transformation structurelle : le service urbanisme de votre commune est à consulter avant de commander quoi que ce soit.",
  },
  {
    title: "L'occupation pendant les travaux",
    text: "Rester sur place allonge le chantier et impose des protections ; libérer les lieux coûte un hébergement mais raccourcit les délais. Ce choix change le planning et le prix.",
  },
  {
    title: "Le calendrier des aides",
    text: "Plusieurs dispositifs exigent que la demande ou l'audit précède les travaux. Commander trop tôt peut fermer des droits définitivement.",
  },
];

/** Ce qui fait varier le budget et le délai — sans chiffre. */
export const budgetDrivers = [
  { title: "L'état réel de l'existant", text: "La première source d'écart en rénovation, et la seule qui ne se voie pas avant d'ouvrir." },
  { title: "L'accès au chantier", text: "Rue étroite, étage sans ascenseur, absence de zone de dépose : la logistique se paie en heures." },
  { title: "Le niveau de finition", text: "C'est là que se joue l'essentiel de l'écart entre deux devis d'apparence semblable." },
  { title: "Le nombre de corps de métier", text: "Plus il y en a, plus la coordination pèse — et plus un retard se propage." },
  { title: "La saison", text: "Certains travaux extérieurs dépendent de la météo ; un chantier planifié à l'avance coûte moins qu'une urgence à caser." },
];
