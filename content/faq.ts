/** Questions fréquentes — rédigées sans promesse invérifiable. */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Pourquoi ne demandez-vous pas d'acompte ?",
    answer:
      "Parce que c'est la première protection d'un client. En Belgique, les services de médiation traitent chaque année des milliers de litiges de chantier, et le conseil le plus répété aux particuliers est justement de limiter les acomptes. Vous ne payez donc rien avant le démarrage des travaux — à une exception près, la commande des châssis, fabriqués sur mesure à vos dimensions et impossibles à revendre.",
  },
  {
    question: "Qui est responsable si le raccord entre le mur et le châssis fuit ?",
    answer:
      "Nous, sans discussion possible. C'est tout l'intérêt de faire le gros œuvre et les châssis dans la même entreprise : quand ces deux lots sont confiés à deux sociétés différentes, une infiltration au niveau du dormant devient un débat entre le maçon et le poseur. Ici, il n'y a personne d'autre à appeler.",
  },
  {
    question: "Êtes-vous assurés, et puis-je le vérifier ?",
    answer:
      "Oui. Depuis la loi du 31 mai 2017, tout entrepreneur intervenant sur la stabilité ou l'étanchéité d'un logement doit couvrir sa responsabilité décennale. Nous sommes assurés et enregistrés, et notre numéro d'entreprise est public : vous pouvez le vérifier à la Banque-Carrefour des Entreprises avant de signer quoi que ce soit.",
  },
  {
    question: "Que se passe-t-il si le chantier prend du retard ?",
    answer:
      "Nous vous prévenons le jour où le problème apparaît, pas à la date de livraison manquée. Un chantier sans le moindre imprévu n'existe pas, surtout en rénovation où l'on découvre l'existant en ouvrant. Ce qui est tenable, c'est de vous annoncer l'imprévu tout de suite, avec sa cause, sa conséquence sur le planning et la solution que nous proposons.",
  },
  {
    question: "Le devis est-il vraiment gratuit et sans engagement ?",
    answer:
      "Oui. La visite sur place et le devis détaillé ne vous coûtent rien et ne vous engagent à rien. Vous signez uniquement si l'offre vous convient.",
  },
  {
    question: "Dans quelles communes intervenez-vous ?",
    answer:
      "Nous travaillons à Bruxelles et dans tout le Brabant wallon : Wavre, Waterloo, Ottignies-Louvain-la-Neuve, Braine-l'Alleud, Nivelles, Jodoigne et les communes voisines. En dehors de cette zone, posez-nous la question, la réponse dépend du chantier.",
  },
  {
    question: "Travaillez-vous avec mon architecte ?",
    answer:
      "Oui, c'est même notre façon habituelle de travailler pour le gros œuvre et les extensions. Nous exécutons les plans de votre architecte et nous coordonnons le chantier avec lui.",
  },
  {
    question: "Combien de temps faut-il pour remplacer des châssis ?",
    answer:
      "Pour une habitation classique, la pose elle-même prend en général quelques jours. Le délai total dépend surtout de la fabrication des châssis, que nous vous communiquons dès la commande.",
  },
  {
    question: "Faut-il un permis pour une extension ?",
    answer:
      "Souvent, oui. Les règles varient selon la commune et la taille du projet. Nous vous orientons dès la première visite et votre architecte se charge des démarches.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "Par tranches, selon l'avancement du chantier, comme prévu au devis. Aucun acompte ne vous est demandé avant le début des travaux, sauf pour la commande des châssis. Le solde est dû à la réception.",
  },
  {
    question: "Puis-je bénéficier d'une TVA réduite ou d'aides ?",
    answer:
      "Les travaux dans une habitation privée suffisamment ancienne peuvent relever d'un taux de TVA réduit, sous conditions liées à l'âge du logement, à son usage et à la nature des travaux : nous vérifions votre cas avant d'établir le devis, et le taux appliqué y figure noir sur blanc. Des aides régionales existent également, mais les dispositifs évoluent souvent — nous regardons avec vous ce qui est réellement en vigueur au moment de vos travaux et nous fournissons les documents nécessaires à votre dossier.",
  },
  {
    question: "Comment suis-je tenu au courant de l'avancement ?",
    answer:
      "Votre interlocuteur unique fait le point avec vous régulièrement, par téléphone ou WhatsApp selon ce qui vous arrange. Vous avez un contact direct, sans passer par un standard.",
  },
];
