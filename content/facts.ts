/**
 * Réassurance factuelle — uniquement des engagements vérifiables,
 * aucun chiffre inventé. Quand COREMI fournira ses données réelles
 * (années d'expérience, nombre de chantiers), les ajouter ici.
 * Placeholders disponibles : [ANNÉES D'EXPÉRIENCE], [CERTIFICATIONS].
 *
 * ⚠️ RÈGLE DE RÉPÉTITION (benchmark belge, août 2026)
 * Les deux principaux acteurs châssis du marché répètent « devis gratuit
 * sans engagement » et « pourquoi nous choisir » sur chacune de leurs
 * pages. À force, l'argument ne se lit plus. On ne reproduit pas ça.
 *
 * Un argument commercial (gratuité, absence d'acompte, délai de réponse)
 * n'apparaît QU'À L'ENDROIT OÙ IL RÉPOND À UNE INQUIÉTUDE RÉELLE :
 *   - l'acompte      → /comment-on-travaille + la FAQ, nulle part ailleurs ;
 *   - la gratuité    → à proximité immédiate du formulaire de devis ;
 *   - les aides      → /primes et /prix-et-aides.
 * Ces engagements-ci décrivent la manière de travailler, pas les
 * conditions commerciales : c'est ce qui les rend lisibles.
 */

export const engagements = [
  {
    title: "Les raccords appartiennent à quelqu'un",
    description:
      "Une rénovation fait intervenir plusieurs métiers, et ce sont les points de jonction qui lâchent : le châssis et son isolation, l'annexe et la maison, la façade et la toiture. Quand chaque lot vient d'une entreprise différente, ces raccords n'appartiennent à personne. Ici, ils sont à nous.",
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
