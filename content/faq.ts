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
      "Nous, sans discussion possible. C'est tout l'intérêt de confier la rénovation et les châssis à la même entreprise : quand ces deux lots sont séparés, une infiltration au niveau du dormant devient un débat entre celui qui a ouvert la baie et celui qui a posé la fenêtre. Ici, il n'y a personne d'autre à appeler.",
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
      "Oui, c'est même notre façon habituelle de travailler sur les transformations et les annexes. Nous exécutons les plans de votre architecte et nous coordonnons le chantier avec lui.",
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
  /* ------------------------------------------------------------------
   * Questions ajoutées après l'analyse de la FAQ publique du principal
   * réseau belge de châssis (août 2026, 65 questions). Ce sont des
   * questions réellement posées par des particuliers, et qui restaient
   * sans réponse sur ce site. Les réponses restent volontairement sans
   * délai chiffré ni durée de garantie : ces valeurs dépendent du
   * fournisseur et du chantier, et figurent au devis.
   * ------------------------------------------------------------------ */
  {
    question: "Le démontage et l'évacuation des anciens châssis sont-ils compris ?",
    answer:
      "Oui, et c'est écrit noir sur blanc dans le devis plutôt que sous-entendu. La dépose des anciens châssis, l'évacuation des menuiseries déposées et le nettoyage de fin de chantier font partie de la prestation. C'est précisément le genre de poste qu'il faut vérifier ligne par ligne quand vous comparez plusieurs offres : un total plus bas cache parfois une évacuation restée à votre charge.",
  },
  {
    question: "Qui pose exactement : vos équipes ou des sous-traitants ?",
    answer:
      "Posez systématiquement cette question, à nous comme aux autres, et demandez la réponse par écrit. Le recours à un sous-traitant n'a rien d'anormal en soi sur certains lots ; ce qui compte, c'est de savoir qui répond en cas de problème et que la réponse ne change pas une fois le chantier commencé. Chez nous, les travaux de rénovation et la pose des châssis relèvent de la même entreprise, ce qui est justement l'objet de notre organisation.",
  },
  {
    question: "Combien de temps mon devis reste-t-il valable ?",
    answer:
      "La durée de validité est indiquée sur le devis lui-même. Elle existe pour une raison concrète : les prix des profilés, du vitrage et des matériaux de construction bougent. Un devis sans date de validité doit vous alerter, quel que soit l'entrepreneur — c'est la porte ouverte à une révision de prix au moment de la commande.",
  },
  {
    question: "Que se passe-t-il si un problème apparaît après la pose ?",
    answer:
      "Vous appelez la même personne que pendant le chantier, pas un service après-vente. Selon la nature du problème, il relève soit de notre intervention directe, soit de la garantie du fabricant sur le produit — nous faisons le lien avec lui, c'est notre rôle et pas le vôtre. Les garanties applicables à votre chantier, celle de la pose comme celle des produits, figurent dans le devis.",
  },
  {
    question: "Faut-il tout remplacer en une fois ?",
    answer:
      "Non, et parfois il vaut mieux ne pas le faire. Remplacer les châssis par étapes se défend si le budget l'impose, à condition de commencer par les façades les plus exposées et de garder la même référence de système pour que l'ensemble reste cohérent. En revanche, remplacer des châssis dans une maison dont la toiture n'est pas isolée revient souvent à investir au mauvais endroit en premier : nous vous le dirons.",
  },
  {
    question: "Faut-il prévoir une ventilation avec de nouveaux châssis ?",
    answer:
      "C'est le point le plus négligé d'un remplacement de châssis, et il mérite d'être posé avant la commande. Des menuiseries neuves sont beaucoup plus étanches que celles qu'elles remplacent : l'humidité produite dans le logement doit pouvoir sortir. Selon votre situation, cela passe par des grilles de ventilation intégrées aux châssis ou par un système existant à conserver. Nous en parlons lors de la visite, parce que la décision se prend au moment de commander, pas après.",
  },
];
