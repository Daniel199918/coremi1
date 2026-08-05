/**
 * ============================================================
 * GUIDES — CONTENU ÉDITORIAL
 * ============================================================
 *
 * Ces guides répondent à des questions que les visiteurs posent
 * réellement avant de commander des travaux. Ils ne sont pas là pour
 * capter du trafic : chacun doit rester utile même à quelqu'un qui ne
 * deviendra jamais client.
 *
 * RÈGLES :
 * 1. Aucun montant de prime ni valeur technique chiffrée. Pour les
 *    aides, on renvoie au centre des primes, mis à jour en un endroit.
 * 2. Aucun prix.
 * 3. Chaque guide porte une date de mise à jour.
 * 4. Les blocs `body` sont du texte : pas de HTML, pas de JSX, pour
 *    rester transposables vers un CMS.
 */

export const GUIDES_LAST_UPDATED = "5 août 2026";

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export type Guide = {
  slug: string;
  title: string;
  /** Question telle qu'un visiteur la formulerait. */
  question: string;
  excerpt: string;
  category: "Primes" | "Châssis" | "Rénovation";
  readingTime: string;
  updated: string;
  body: GuideBlock[];
  /** Maillage : pages du site réellement pertinentes ici. */
  related: { label: string; href: string }[];
};

export const guides: Guide[] = [
  {
    slug: "prime-avant-ou-apres-les-travaux",
    title: "Faut-il demander la prime avant ou après les travaux ?",
    question: "Peut-on commencer les travaux avant d'introduire le dossier ?",
    excerpt:
      "C'est la question qui fait perdre le plus d'argent aux propriétaires belges. La réponse dépend de la Région et du dispositif — et se tromper est souvent définitif.",
    category: "Primes",
    readingTime: "4 min",
    updated: GUIDES_LAST_UPDATED,
    body: [
      {
        type: "p",
        text: "C'est de loin le motif de refus le plus fréquent, et le plus frustrant : les travaux étaient éligibles, l'entreprise était en règle, les factures étaient correctes — mais la démarche a été faite dans le mauvais ordre. Contrairement à une pièce manquante, cela ne se rattrape presque jamais.",
      },
      { type: "h2", text: "La règle générale : la démarche précède souvent le chantier" },
      {
        type: "p",
        text: "Plusieurs dispositifs belges exigent qu'une étape administrative soit accomplie avant le premier coup de pelle. Selon les cas, il s'agit de l'introduction de la demande elle-même, d'un audit réalisé par un professionnel agréé, ou d'un accompagnement technique. Tant que cette étape n'est pas franchie, les travaux réalisés ne comptent pas.",
      },
      {
        type: "p",
        text: "D'autres dispositifs fonctionnent à l'inverse : la demande s'introduit après la facture finale, mais dans un délai strict. Un dossier envoyé hors délai est refusé, même parfaitement constitué.",
      },
      { type: "h2", text: "Ce qui change d'une Région à l'autre" },
      {
        type: "ul",
        items: [
          "En Wallonie, l'audit logement par un auditeur agréé conditionne l'accès à plusieurs aides pour les rénovations importantes, et doit précéder les travaux. Un régime réorganisé autour du Rénopack et du Rénoprêt est par ailleurs annoncé : le calendrier de votre dossier peut donc tout changer.",
          "À Bruxelles, l'ordre dépend du dispositif : certaines primes s'introduisent avant, d'autres dans un délai suivant la facture finale. C'est le point à vérifier en premier sur le portail RENOLUTION.",
          "En Flandre, la demande passe par un guichet unique après réalisation, avec des exigences techniques et un montant minimum de facture par catégorie de travaux.",
        ],
      },
      { type: "h2", text: "Que faire concrètement" },
      {
        type: "ol",
        items: [
          "Avant de signer quoi que ce soit, identifiez les dispositifs applicables à votre projet et à votre Région.",
          "Pour chacun, notez une seule information : la demande doit-elle précéder les travaux, ou les suivre dans un délai ?",
          "Si un audit ou un accompagnement est requis, faites-le réaliser avant de commander.",
          "Demandez un devis suffisamment détaillé pour être joint au dossier.",
          "Ne laissez pas un délai de livraison vous pousser à commencer avant d'avoir vérifié ce point.",
        ],
      },
      {
        type: "note",
        text: "Si vos travaux ont déjà commencé, ne renoncez pas pour autant : contactez l'administration compétente pour savoir ce qui reste possible. Certaines situations se rattrapent, d'autres non, mais seule l'administration peut le dire.",
      },
    ],
    related: [
      { label: "Le centre des primes, par région", href: "/primes" },
      { label: "Comment nous vérifions ces informations", href: "/primes/methode" },
      { label: "Quels documents conserver", href: "/conseils/documents-a-conserver-pour-une-prime" },
    ],
  },
  {
    slug: "pvc-ou-aluminium",
    title: "PVC ou aluminium : que choisir pour ses châssis ?",
    question: "Lequel est le meilleur des deux ?",
    excerpt:
      "Aucun des deux n'est meilleur dans l'absolu. Le bon choix dépend de la taille de vos ouvertures, de votre priorité et de votre budget — pas d'un classement.",
    category: "Châssis",
    readingTime: "5 min",
    updated: GUIDES_LAST_UPDATED,
    body: [
      {
        type: "p",
        text: "C'est la question la plus posée, et celle dont la réponse est la plus mal formulée. « Lequel est le meilleur ? » n'a pas de réponse, parce que les deux matériaux ne résolvent pas le même problème. Un aluminium d'entrée de gamme peut d'ailleurs isoler moins bien qu'un bon PVC.",
      },
      { type: "h2", text: "Ce que le PVC fait mieux" },
      {
        type: "ul",
        items: [
          "Le rapport isolation/budget : la matière isole naturellement, sans dispositif technique particulier.",
          "L'entretien : un nettoyage suffit, il n'y a aucune finition à reprendre.",
          "La disponibilité et les délais, généralement plus courts.",
        ],
      },
      { type: "h2", text: "Ce que l'aluminium fait mieux" },
      {
        type: "ul",
        items: [
          "La finesse : à ouverture identique, un profilé aluminium laisse entrer plus de lumière.",
          "Les grandes dimensions : au-delà d'une certaine taille, le PVC exige des renforts et devient visuellement lourd, là où l'aluminium tient.",
          "La stabilité des teintes, notamment en couleurs foncées, qui vieillissent moins bien en PVC.",
        ],
      },
      { type: "h2", text: "Le point que les comparatifs oublient" },
      {
        type: "p",
        text: "En aluminium, la performance thermique dépend entièrement de la qualité de la rupture de pont thermique du système. C'est un élément interne du profilé, invisible une fois posé, et qui varie énormément d'une gamme à l'autre. Comparer « du PVC » et « de l'aluminium » n'a donc aucun sens : il faut comparer deux références précises de systèmes.",
      },
      { type: "h2", text: "Comment trancher en pratique" },
      {
        type: "ol",
        items: [
          "Listez vos ouvertures et repérez celles qui sont grandes ou qui comportent un coulissant.",
          "Décidez de votre priorité n°1 : budget, lumière, acoustique ou entretien. Une seule.",
          "Si vous avez de grandes baies ou que la finesse compte, orientez-vous vers l'aluminium.",
          "Si le budget prime et que les dimensions sont courantes, le PVC est cohérent.",
          "Dans les deux cas, demandez la référence exacte du système et la performance de la fenêtre complète, pas seulement du vitrage.",
        ],
      },
      {
        type: "note",
        text: "Rien n'oblige à choisir un seul matériau pour toute la maison. Il est fréquent de mettre de l'aluminium sur une grande baie de séjour et du PVC sur les chambres.",
      },
    ],
    related: [
      { label: "Le guide complet des châssis", href: "/chassis" },
      { label: "Quiz : quelle solution de châssis ?", href: "/chassis/quiz" },
      { label: "Comparatif Schüco, Aliplast, Aluprof", href: "/solutions/fabricants" },
    ],
  },
  {
    slug: "quel-vitrage-choisir",
    title: "Quel vitrage choisir avec de nouveaux châssis ?",
    question: "Double ou triple vitrage ?",
    excerpt:
      "Le vitrage occupe la plus grande surface de votre fenêtre : c'est souvent lui, et non le cadre, qui décide de votre confort thermique et acoustique.",
    category: "Châssis",
    readingTime: "4 min",
    updated: GUIDES_LAST_UPDATED,
    body: [
      {
        type: "p",
        text: "On choisit d'abord un matériau de cadre, puis on prend « le vitrage qui va avec ». C'est l'inverse qu'il faudrait faire : le vitrage représente la majeure partie de la surface, donc la majeure partie des échanges thermiques et acoustiques.",
      },
      { type: "h2", text: "Ce qui compose un vitrage" },
      {
        type: "ul",
        items: [
          "Le nombre de verres : double ou triple, ce qui détermine le nombre de lames d'air isolantes.",
          "Le gaz de remplissage entre les verres, plus isolant que l'air.",
          "La couche à faible émissivité, quasi invisible, qui renvoie la chaleur vers l'intérieur.",
          "L'intercalaire, la pièce périphérique qui sépare les verres : un intercalaire performant limite le pont thermique en bordure.",
          "Le feuilletage éventuel, pour l'acoustique ou la sécurité.",
        ],
      },
      { type: "h2", text: "Double ou triple ?" },
      {
        type: "p",
        text: "Le triple vitrage isole davantage, mais il est plus lourd — ce qui impose une quincaillerie dimensionnée en conséquence — et laisse passer un peu moins de lumière et d'apports solaires gratuits. Sur une façade nord d'un logement bien isolé, il se défend. Sur une maison dont la toiture n'est pas isolée, l'investissement sera plus utile ailleurs.",
      },
      { type: "h2", text: "Si votre problème est le bruit" },
      {
        type: "p",
        text: "Ajouter un troisième verre n'est pas la meilleure réponse. L'acoustique s'améliore surtout avec des épaisseurs de verre différentes entre les deux faces et un feuilletage acoustique, puis avec l'étanchéité de l'ensemble. Un vitrage acoustique bien conçu en double vitrage fera mieux qu'un triple vitrage symétrique.",
      },
      {
        type: "note",
        text: "Sur un devis, « double vitrage » ne veut rien dire à lui seul. Exigez la composition : épaisseurs, gaz, couche à faible émissivité, feuilletage éventuel. C'est aussi ce que demandent les dossiers de primes.",
      },
    ],
    related: [
      { label: "Le guide complet des châssis", href: "/chassis" },
      { label: "Coordonner châssis, isolation et ventilation", href: "/conseils/coordonner-chassis-isolation-ventilation" },
      { label: "Les primes liées aux châssis", href: "/primes" },
    ],
  },
  {
    slug: "documents-a-conserver-pour-une-prime",
    title: "Quels documents conserver pour demander une prime ?",
    question: "Que faut-il garder, et à quel moment ?",
    excerpt:
      "Un dossier se perd rarement sur le fond, souvent sur une pièce impossible à reconstituer après coup — une photo avant travaux, par exemple.",
    category: "Primes",
    readingTime: "3 min",
    updated: GUIDES_LAST_UPDATED,
    body: [
      {
        type: "p",
        text: "La plupart des refus ne portent pas sur l'éligibilité des travaux, mais sur une pièce manquante. Certaines se redemandent ; d'autres, comme une photo de l'état initial, deviennent définitivement impossibles à produire une fois le chantier terminé.",
      },
      { type: "h2", text: "Avant les travaux" },
      {
        type: "ul",
        items: [
          "Des photos datées de l'état existant, intérieur et extérieur, pour chaque zone concernée.",
          "Le devis détaillé, mentionnant les matériaux et leurs performances techniques.",
          "Le rapport d'audit ou le document d'accompagnement, lorsqu'il est requis.",
          "La preuve de propriété ou le titre d'occupation.",
        ],
      },
      { type: "h2", text: "Pendant et après" },
      {
        type: "ul",
        items: [
          "Les factures détaillées de l'entreprise, avec le descriptif des travaux réellement exécutés.",
          "Les preuves de paiement.",
          "Les fiches techniques des produits posés, notamment les performances thermiques.",
          "Les attestations que l'entrepreneur peut délivrer.",
          "Des photos après travaux, prises depuis les mêmes points de vue qu'avant.",
        ],
      },
      { type: "h2", text: "La règle qui évite l'essentiel des problèmes" },
      {
        type: "p",
        text: "Une facture qui indique « fourniture et pose de châssis » sans autre précision ne permet à personne de vérifier que les exigences techniques sont respectées. Demandez que le descriptif mentionne les références des systèmes, la composition du vitrage et les performances. Un entrepreneur habitué aux dossiers d'aides le fait spontanément.",
      },
      {
        type: "note",
        text: "Conservez tout dans un dossier unique, numérique de préférence, dès la première visite. Reconstituer des pièces deux ans plus tard, lors d'un contrôle ou d'une revente, est nettement plus pénible.",
      },
    ],
    related: [
      { label: "Le centre des primes, par région", href: "/primes" },
      { label: "Prime avant ou après les travaux ?", href: "/conseils/prime-avant-ou-apres-les-travaux" },
      { label: "Comment se construit un devis", href: "/prix-et-aides" },
    ],
  },
  {
    slug: "coordonner-chassis-isolation-ventilation",
    title: "Comment coordonner châssis, isolation et ventilation ?",
    question: "Dans quel ordre faire les travaux ?",
    excerpt:
      "Ces trois postes forment un système. Les traiter séparément, dans le désordre, coûte plus cher et donne un moins bon résultat — parfois avec de la condensation à la clé.",
    category: "Rénovation",
    readingTime: "5 min",
    updated: GUIDES_LAST_UPDATED,
    body: [
      {
        type: "p",
        text: "C'est le sujet sur lequel nous voyons le plus de mauvaises surprises, et presque toujours chez des gens qui ont pourtant bien fait les choses — mais dans le désordre.",
      },
      { type: "h2", text: "Pourquoi de nouveaux châssis peuvent créer de l'humidité" },
      {
        type: "p",
        text: "Une maison ancienne respire par ses défauts d'étanchéité. L'humidité produite au quotidien — douches, cuisine, respiration, séchage du linge — s'évacue par ces fuites d'air. En remplaçant les châssis, vous supprimez ces fuites d'un coup. L'humidité reste alors à l'intérieur et se dépose sur les surfaces les plus froides : angles de murs, embrasures, parfois le nouveau vitrage lui-même.",
      },
      {
        type: "p",
        text: "Ce n'est pas un défaut des nouveaux châssis. C'est une conséquence mécanique de l'étanchéité, et elle se prévoit à la conception : il faut réintroduire un apport d'air neuf maîtrisé.",
      },
      { type: "h2", text: "L'ordre qui a du sens" },
      {
        type: "ol",
        items: [
          "Faire le point sur l'existant : ce qui est déjà isolé, l'état de la toiture, le mode de chauffage.",
          "Isoler la toiture en priorité, c'est généralement le meilleur rapport gain/coût.",
          "Traiter les murs si la configuration s'y prête.",
          "Remplacer les menuiseries, en décidant de leur position dans l'épaisseur du mur si une isolation de façade est prévue.",
          "Mettre en place la ventilation, dimensionnée pour l'étanchéité réellement obtenue.",
          "Redimensionner le chauffage en dernier, une fois les besoins réduits.",
        ],
      },
      { type: "h2", text: "L'erreur la plus coûteuse" },
      {
        type: "p",
        text: "Remplacer la chaudière avant d'isoler. Une installation dimensionnée sur les besoins d'une maison non isolée sera surdimensionnée après travaux : elle coûtera plus cher à l'achat, fonctionnera moins efficacement, et devra parfois être remplacée à nouveau. C'est deux fois la même dépense.",
      },
      { type: "h2", text: "Le détail qui décide de la performance réelle" },
      {
        type: "p",
        text: "Le raccord entre le châssis et la maçonnerie. C'est là que se rejoignent deux corps de métier, et là que se créent les ponts thermiques, les infiltrations et les condensations. Quand ces deux lots sont confiés à deux entreprises différentes, ce point devient un débat plutôt qu'une responsabilité.",
      },
      {
        type: "note",
        text: "Vous n'êtes pas obligé de tout faire en même temps. Mais il faut décider de l'ordre au départ : certaines options se ferment définitivement selon ce qui est fait en premier.",
      },
    ],
    related: [
      { label: "Rénover dans le bon ordre", href: "/construction-renovation" },
      { label: "Quel vitrage choisir", href: "/conseils/quel-vitrage-choisir" },
      { label: "Comment on travaille", href: "/comment-on-travaille" },
    ],
  },
  {
    slug: "comparer-deux-devis-de-chassis",
    title: "Comment comparer deux devis de châssis ?",
    question: "Pourquoi un devis est-il deux fois plus cher que l'autre ?",
    excerpt:
      "Deux devis de châssis affichant un écart important décrivent presque toujours deux produits différents. Voici les lignes à comparer pour le voir.",
    category: "Châssis",
    readingTime: "4 min",
    updated: GUIDES_LAST_UPDATED,
    body: [
      {
        type: "p",
        text: "Quand deux devis pour « le remplacement de huit châssis » affichent un écart considérable, l'explication est rarement la marge de l'entreprise. Le plus souvent, ils ne décrivent tout simplement pas la même chose — et le devis le moins cher omet ce qui apparaîtra plus tard en supplément.",
      },
      { type: "h2", text: "Les six lignes à comparer" },
      {
        type: "ul",
        items: [
          "La référence exacte du système de profilé, pas seulement la marque : un même fabricant décline des gammes très différentes.",
          "La performance thermique de la fenêtre complète, et pas uniquement celle du vitrage.",
          "La composition du vitrage : épaisseurs, gaz, couche à faible émissivité, feuilletage.",
          "Le traitement du raccord entre le châssis et la maçonnerie.",
          "Les finitions intérieures et extérieures : tablettes, plafonnages, peintures de raccord, rejets d'eau.",
          "La solution de ventilation prévue après l'étanchéité renforcée.",
        ],
      },
      { type: "h2", text: "Ce que cachent souvent les devis les moins chers" },
      {
        type: "ul",
        items: [
          "Les finitions intérieures, renvoyées à « la charge du client ».",
          "L'évacuation des anciens châssis.",
          "La ventilation, absente du chiffrage.",
          "Une gamme d'entrée de gamme désignée par le seul nom de la marque.",
          "Un acompte élevé demandé à la signature.",
        ],
      },
      { type: "h2", text: "La question qui révèle tout" },
      {
        type: "p",
        text: "« Qu'est-ce qui n'est pas compris dans ce prix ? » Un installateur sérieux répond immédiatement et précisément. Une réponse vague sur cette question est le meilleur indicateur qu'il y a des suppléments à venir.",
      },
      {
        type: "note",
        text: "Comparez aussi les modalités de paiement. Un acompte important demandé avant tout début de travaux est un risque réel : le conseil le plus répété aux particuliers en Belgique est de limiter les acomptes.",
      },
    ],
    related: [
      { label: "Le guide complet des châssis", href: "/chassis" },
      { label: "Comment se construit un devis", href: "/prix-et-aides" },
      { label: "Comment on travaille", href: "/comment-on-travaille" },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guideCategories = ["Primes", "Châssis", "Rénovation"] as const;
