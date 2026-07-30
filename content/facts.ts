/**
 * Réassurance factuelle — uniquement des engagements vérifiables,
 * aucun chiffre inventé. Quand COREMI fournira ses données réelles
 * (années d'expérience, nombre de chantiers), les ajouter ici.
 * Placeholders disponibles : [ANNÉES D'EXPÉRIENCE], [CERTIFICATIONS].
 */

export const engagements = [
  {
    title: "Un devis détaillé, gratuit",
    description:
      "Chaque poste est chiffré noir sur blanc avant le premier coup de pelle. Vous savez ce que vous payez, et pourquoi.",
  },
  {
    title: "Un interlocuteur unique",
    description:
      "La même personne vous répond du premier appel à la réception du chantier. Pas de standard, pas de dossier qui se perd.",
  },
  {
    title: "Un planning annoncé, tenu",
    description:
      "Nous fixons les dates ensemble et nous vous prévenons immédiatement si un imprévu les menace, avec une solution.",
  },
  {
    title: "Le chantier rendu propre",
    description:
      "Protection des lieux, évacuation des gravats, nettoyage de fin de chantier. Vous récupérez votre maison, pas un terrain vague.",
  },
] as const;

/**
 * Modalités pratiques — réassurance commerciale honnête, sans chiffre
 * inventé. ⚠️ Volontairement AUCUN montant ni nom de dispositif d'aide
 * n'est cité : les régimes régionaux (Bruxelles, Wallonie) ont été
 * revus, suspendus ou remplacés par des formules de prêt à plusieurs
 * reprises et se périment vite. On vend l'accompagnement, pas le
 * dispositif. Voir /prix-et-aides pour le détail de cette position.
 */
export const modalites = [
  {
    kicker: "Devis",
    title: "Détaillé, gratuit, sans engagement",
    description:
      "Visite sur place, puis un devis chiffré poste par poste. Il ne vous coûte rien et ne vous engage à rien : vous signez seulement s'il vous convient.",
  },
  {
    kicker: "Paiement",
    title: "Échelonné, jamais d'avance à découvert",
    description:
      "Aucun acompte avant le début des travaux, sauf pour la commande des châssis. Vous payez par tranches, selon l'avancement, et le solde à la réception.",
  },
  {
    kicker: "Suivi",
    title: "Un interlocuteur unique, joignable",
    description:
      "La même personne suit votre chantier du premier appel à la réception. Un point régulier par téléphone ou WhatsApp, sans standard ni dossier qui se perd.",
  },
  {
    kicker: "Aides",
    title: "TVA réduite et aides : on monte le dossier",
    description:
      "Une habitation privée suffisamment ancienne peut relever d'un taux de TVA réduit, sous conditions. Les aides régionales, elles, changent souvent : au moment du devis, nous regardons ensemble ce qui existe réellement pour votre commune et vos travaux, et nous fournissons les documents dont votre dossier a besoin.",
  },
] as const;

export const processSteps = [
  {
    title: "Rencontre",
    description:
      "Vous nous appelez ou remplissez le formulaire. En quelques minutes, nous cernons votre projet, votre budget et vos délais.",
  },
  {
    title: "Analyse technique",
    description:
      "Nous venons mesurer, observer l'existant et repérer les contraintes que les photos ne montrent pas : accès, stabilité, raccords.",
  },
  {
    title: "Devis poste par poste",
    description:
      "Vous recevez un devis détaillé et lisible. Nous le parcourons ensemble et l'ajustons jusqu'à ce qu'il colle à votre projet.",
  },
  {
    title: "Préparation",
    description:
      "Commandes des matériaux et des châssis, planning des corps de métier, protection des lieux. Le chantier démarre prêt.",
  },
  {
    title: "Réalisation",
    description:
      "Les travaux avancent au planning convenu. Votre interlocuteur suit le chantier et vous informe chaque semaine.",
  },
  {
    title: "Contrôle & finitions",
    description:
      "Nous vérifions chaque poste avec vous, corrigeons ce qui doit l'être et rendons la maison propre. La réception clôt le chantier.",
  },
] as const;
