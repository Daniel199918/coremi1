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

export const processSteps = [
  {
    title: "Premier échange",
    description:
      "Vous nous appelez ou remplissez le formulaire. En quelques minutes, nous cernons votre projet, votre budget et vos délais.",
  },
  {
    title: "Visite sur place",
    description:
      "Nous venons mesurer, observer l'existant et repérer les contraintes techniques que les photos ne montrent pas.",
  },
  {
    title: "Devis poste par poste",
    description:
      "Vous recevez un devis détaillé et lisible. Nous le parcourons ensemble et l'ajustons jusqu'à ce qu'il colle à votre projet.",
  },
  {
    title: "Chantier & réception",
    description:
      "Les travaux démarrent à la date convenue. Vous suivez l'avancement avec votre interlocuteur jusqu'à la réception.",
  },
] as const;
