/** Questions fréquentes — rédigées sans promesse invérifiable. */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
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
      "Par tranches, selon l'avancement du chantier, comme prévu au devis. Aucun paiement intégral ne vous sera demandé avant travaux.",
  },
];
