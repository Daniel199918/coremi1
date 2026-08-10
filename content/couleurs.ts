/**
 * ============================================================
 * COULEURS ET FINITIONS DES CHÂSSIS
 * ============================================================
 *
 * POURQUOI CETTE PAGE EXISTE
 * Analyse de la FAQ publique du principal réseau belge de châssis
 * (août 2026, 65 questions) : la rubrique la plus fournie n'est ni
 * l'isolation ni le prix, c'est la COULEUR — sept questions distinctes
 * (teinte selon la façade, bicoloration, tenue dans le temps, tendances).
 * Le sujet était totalement absent du site.
 *
 * RÈGLES DE RÉDACTION (identiques à content/chassis.ts)
 * 1. Aucune valeur chiffrée invérifiable : pas de durée de garantie du
 *    laquage, pas de température de surface, pas de pourcentage de
 *    dilatation. Ces valeurs dépendent du système, du fournisseur et de
 *    l'exposition ; elles figurent sur la fiche technique du produit
 *    réellement proposé.
 * 2. Aucun classement esthétique. On donne des repères de lecture d'une
 *    façade, pas un avis sur le bon goût du client.
 * 3. Les contraintes techniques réelles (teintes sombres, plein sud,
 *    grandes dimensions) sont dites, y compris quand elles dérangent.
 * 4. Les labels cités (RAL, Qualicoat, Qualanod) sont des référentiels
 *    publics existants. Ne jamais présenter COREMI comme certifié par
 *    l'un d'eux : ce n'est pas documenté.
 */

import type { FaqItem } from "./faq";

export const COULEURS_LAST_UPDATED = "10 août 2026";

/** Comment la teinte est réellement obtenue, matériau par matériau. */
export const finitions = [
  {
    id: "pvc",
    material: "PVC",
    title: "Masse teintée, film ou coextrusion",
    how: "Le PVC blanc est teinté dans la masse : la couleur traverse le profilé. Les autres teintes sont obtenues par un film collé en surface (plaxage) ou par une couche colorée coextrudée avec le profilé.",
    consequences: [
      "Une rayure profonde sur un profilé coloré laisse apparaître le blanc en dessous : c'est le principal point faible du film.",
      "Les films modernes sont formulés pour résister aux UV, mais leur tenue dépend directement de la qualité du film retenu. Demandez la référence du film, pas seulement le nom de la couleur.",
      "Une teinte sombre chauffe davantage au soleil. Sur du PVC, cette dilatation est une contrainte réelle : certains fabricants imposent un renfort, limitent les dimensions ou déconseillent la teinte en plein sud.",
    ],
    ask: "Quel film exactement, et le fabricant pose-t-il une limite de dimension ou d'exposition pour cette teinte ?",
  },
  {
    id: "aluminium",
    material: "Aluminium",
    title: "Thermolaquage",
    how: "Une poudre de peinture est projetée sur le profilé puis cuite au four, ce qui forme une couche dure liée au métal. C'est la finition de référence sur l'aluminium de menuiserie.",
    consequences: [
      "La teinte fait corps avec le profilé : une rayure ne révèle pas une autre couleur en dessous, contrairement à un film.",
      "Deux référentiels publics encadrent la qualité de cette opération : Qualicoat pour le laquage, Qualanod pour l'anodisation. Ils portent sur le traitement, pas sur l'entreprise qui pose.",
      "La dilatation existe aussi sur l'aluminium, mais le matériau la supporte mieux : les teintes sombres y sont nettement moins contraignantes que sur du PVC.",
    ],
    ask: "Le laquage relève-t-il d'un référentiel de qualité, et quelle est la garantie du fournisseur sur la finition ?",
  },
  {
    id: "bois",
    material: "Bois",
    title: "Lasure ou peinture",
    how: "La lasure laisse voir le veinage et se recharge sans décapage. La peinture couvre entièrement le bois et donne un aspect plus proche du PVC ou de l'aluminium laqué.",
    consequences: [
      "C'est la seule finition qui se refait entièrement : une couleur ratée ou démodée n'est pas définitive.",
      "C'est aussi la seule qui impose un entretien périodique, dont la fréquence dépend de l'essence et surtout de l'exposition de la façade.",
      "Une façade très exposée à la pluie et au soleil use la finition plus vite qu'une façade abritée par un débord de toiture.",
    ],
    ask: "Quelle essence, quelle finition, et à quelle fréquence prévoir la remise en état sur ma façade ?",
  },
] as const;

/** Repères de teinte selon la façade — des principes, pas des prescriptions. */
export const facades = [
  {
    id: "brique-rouge",
    facade: "Brique rouge ou orangée",
    principle:
      "La brique rouge est déjà une couleur chaude et saturée. Une teinte de châssis également chaude entre en concurrence avec elle ; une teinte neutre ou franchement froide la laisse s'exprimer.",
    common: [
      "Les gris neutres et les anthracites, qui tranchent sans jurer",
      "Le blanc cassé et les tons crème, lecture plus traditionnelle",
      "Le brun foncé et le vert sombre, courants sur le bâti ancien",
    ],
    caution:
      "Les gris à sous-ton violet ou bleu peuvent virer curieusement au contact d'une brique très rouge. C'est le cas type où il faut voir l'échantillon devant la façade.",
  },
  {
    id: "enduit-clair",
    facade: "Enduit clair, blanc ou beige",
    principle:
      "Une façade claire et unie se comporte comme une page blanche : le châssis y devient un trait de dessin. Plus la teinte est foncée, plus le graphisme des ouvertures ressort.",
    common: [
      "L'anthracite, qui souligne franchement les ouvertures",
      "Le noir, plus radical, souvent associé aux profilés fins",
      "Un ton sur ton clair, qui efface au contraire la menuiserie",
    ],
    caution:
      "Sur une façade claire, une teinte foncée ne pardonne rien : les défauts d'alignement et les jeux de pose se voient. La qualité de la pose compte autant que le choix de la couleur.",
  },
  {
    id: "rustique",
    facade: "Fermette, bâti rural ou pierre",
    principle:
      "Le bâti ancien a des ouvertures souvent plus petites et des matériaux irréguliers. Une menuiserie très contemporaine peut y créer un écart visuel volontaire — ou malvenu, selon l'intention.",
    common: [
      "Les bruns et les tons bois, cohérents avec l'existant",
      "Les verts sombres et les gris ardoise, fréquents en Wallonie",
      "Le blanc cassé plutôt que le blanc pur, moins dur sur de la pierre",
    ],
    caution:
      "En zone protégée ou sur un bien classé, la teinte et parfois le matériau peuvent être imposés. Cette question se vérifie auprès de la commune avant de choisir, pas après.",
  },
  {
    id: "contemporain",
    facade: "Architecture contemporaine",
    principle:
      "Sur une construction récente, la menuiserie fait partie du dessin d'origine. Le sujet devient moins « quelle couleur » que « quelle largeur de profilé, et quelle continuité avec les autres éléments ».",
    common: [
      "Les anthracites et les noirs, très répandus",
      "Les teintes structurées ou sablées, qui accrochent la lumière sans briller",
      "Les finitions aspect acier, associées aux profilés fins",
    ],
    caution:
      "Pensez la teinte avec les gouttières, la porte de garage, les seuils et la porte d'entrée. Une couleur juste sur le châssis seul peut se retrouver isolée une fois la façade complète.",
  },
] as const;

/** Questions récurrentes, traitées franchement. */
export const couleurQuestions: FaqItem[] = [
  {
    question: "Puis-je avoir une couleur différente à l'intérieur et à l'extérieur ?",
    answer:
      "Oui, c'est courant, et c'est même l'un des arguments de la menuiserie moderne. En aluminium, la rupture de pont thermique sépare physiquement les deux faces du profilé, qui peuvent donc être laquées différemment. En PVC, la bicoloration se fait par film sur une face ou sur les deux. Le cas le plus fréquent : extérieur foncé pour l'aspect, intérieur blanc ou clair pour ne pas assombrir les pièces.",
  },
  {
    question: "Une couleur foncée pose-t-elle vraiment problème ?",
    answer:
      "Sur du PVC, la question est réelle et mérite d'être posée à votre installateur. Une surface foncée monte plus haut en température au soleil, donc se dilate davantage ; selon le système, le fabricant peut imposer un renfort, limiter les dimensions ou déconseiller la teinte sur une façade plein sud. Sur de l'aluminium, la contrainte existe mais reste beaucoup moins limitante. C'est l'un des rares cas où le matériau se choisit en partie pour une raison esthétique.",
  },
  {
    question: "Le PVC coloré se décolore-t-il avec le temps ?",
    answer:
      "Les films utilisés aujourd'hui sont formulés pour résister aux UV, et le résultat dépend beaucoup plus de la qualité du film que du matériau lui-même. La bonne question n'est donc pas « le PVC tient-il ? » mais « quel film, de quel fournisseur, avec quelle garantie ? ». Une façade plein sud vieillira toujours plus vite qu'une façade nord, quel que soit le produit.",
  },
  {
    question: "Et l'aluminium laqué ?",
    answer:
      "Un thermolaquage de qualité tient longtemps. Avec les années, un laquage peut perdre un peu de son brillant — le phénomène est connu — et l'ampleur dépend de la classe de poudre utilisée et de l'exposition. Les référentiels Qualicoat et Qualanod existent précisément pour encadrer ce point : demandez si le laquage s'y réfère.",
  },
  {
    question: "Une couleur foncée assombrit-elle la pièce ?",
    answer:
      "Marginalement, et souvent moins qu'on ne le croit. Ce qui compte pour la lumière, c'est la surface vitrée, donc la finesse du profilé — pas sa teinte. Un profilé fin et foncé laisse passer plus de lumière qu'un profilé épais et blanc. Visuellement, un cadre foncé paraît d'ailleurs plus mince qu'un cadre clair de même dimension.",
  },
  {
    question: "Comment être sûr de mon choix avant de signer ?",
    answer:
      "En ne décidant jamais sur un nuancier imprimé ni sur un écran. Demandez un échantillon du profilé dans la teinte exacte, et regardez-le dehors, contre votre façade, à deux moments différents de la journée. Une couleur change complètement entre un showroom éclairé au néon et une façade nord un jour couvert. C'est cinq minutes qui évitent un regret de vingt ans.",
  },
];

/** Ce qu'il faut avoir décidé avant de demander un devis. */
export const couleurChecklist = [
  "La teinte extérieure, et si vous voulez une teinte intérieure différente",
  "La référence exacte de la couleur, en général une référence RAL — « gris anthracite » recouvre plusieurs teintes distinctes",
  "L'aspect de surface : lisse, satiné, structuré ou sablé",
  "La cohérence avec la porte d'entrée, la porte de garage et les gouttières",
  "La teinte des seuils et des couvre-joints, souvent oubliée et pourtant visible",
  "L'existence d'une contrainte communale ou urbanistique sur votre façade",
] as const;
