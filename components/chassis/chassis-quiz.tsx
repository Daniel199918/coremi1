"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brands } from "@/content/brands";
import { cn } from "@/utils";

/**
 * « Quelle solution de châssis choisir ? »
 *
 * Onze questions, puis une orientation MOTIVÉE : le résultat explique
 * toujours POURQUOI il propose ce matériau, et énonce le compromis
 * accepté en échange.
 *
 * Aucune marque n'est poussée pour des raisons commerciales. Les
 * fabricants ne sont cités que lorsqu'ils correspondent réellement aux
 * réponses (ex. : de l'aluminium n'appelle pas un fabricant qui n'en
 * fait pas), et toujours au pluriel quand plusieurs conviennent.
 *
 * Les réponses restent dans le navigateur ; elles ne sont transmises à
 * la demande de devis que si le visiteur clique explicitement.
 */

const SHARE_KEY = "coremi-chassis-v1";

type Answers = Record<string, string>;

type Question = {
  id: string;
  label: string;
  help?: string;
  options: { value: string; label: string }[];
};

const questions: Question[] = [
  {
    id: "context",
    label: "Rénovation ou construction neuve ?",
    options: [
      { value: "renovation", label: "Rénovation" },
      { value: "neuf", label: "Construction neuve" },
      { value: "extension", label: "Extension d'un bâtiment existant" },
    ],
  },
  {
    id: "building",
    label: "Quel type de bâtiment ?",
    options: [
      { value: "maison", label: "Maison" },
      { value: "appartement", label: "Appartement" },
      { value: "commerce", label: "Commerce ou bureau" },
      { value: "autre", label: "Autre" },
    ],
  },
  {
    id: "priority",
    label: "Quelle est votre priorité principale ?",
    help: "Une seule réponse : c'est ce choix qui oriente le plus fortement le résultat.",
    options: [
      { value: "isolation", label: "L'isolation thermique" },
      { value: "design", label: "Le design et la finesse" },
      { value: "lumiere", label: "Faire entrer la lumière" },
      { value: "securite", label: "La sécurité" },
      { value: "acoustique", label: "Le calme, l'acoustique" },
      { value: "entretien", label: "Le minimum d'entretien" },
      { value: "budget", label: "Le budget" },
    ],
  },
  {
    id: "material",
    label: "Un matériau vous attire-t-il déjà ?",
    options: [
      { value: "pvc", label: "PVC" },
      { value: "aluminium", label: "Aluminium" },
      { value: "bois", label: "Bois" },
      { value: "indecis", label: "Je n'ai pas d'idée arrêtée" },
    ],
  },
  {
    id: "style",
    label: "Quel style visez-vous ?",
    options: [
      { value: "classique", label: "Classique" },
      { value: "moderne", label: "Moderne" },
      { value: "minimaliste", label: "Minimaliste" },
      { value: "industriel", label: "Industriel" },
    ],
  },
  {
    id: "size",
    label: "Quelles dimensions font vos ouvertures ?",
    options: [
      { value: "standard", label: "Dimensions courantes" },
      { value: "grandes", label: "Plutôt grandes" },
      { value: "tresgrandes", label: "Très grandes, hors normes" },
      { value: "variees", label: "Très variées" },
    ],
  },
  {
    id: "baies",
    label: "Y a-t-il de grandes baies vitrées ou des coulissants ?",
    options: [
      { value: "oui", label: "Oui, c'est un élément important" },
      { value: "peut-etre", label: "Peut-être, à étudier" },
      { value: "non", label: "Non" },
    ],
  },
  {
    id: "bruit",
    label: "Le logement est-il exposé au bruit ?",
    options: [
      { value: "fort", label: "Oui, fortement — axe passant, voie ferrée, aéroport" },
      { value: "modere", label: "Modérément" },
      { value: "non", label: "Non, environnement calme" },
    ],
  },
  {
    id: "securite",
    label: "Quel niveau de sécurité souhaitez-vous ?",
    options: [
      { value: "renforce", label: "Renforcé" },
      { value: "standard", label: "Standard" },
      { value: "inconnu", label: "Je ne sais pas encore" },
    ],
  },
  {
    id: "budget",
    label: "Où situez-vous votre budget ?",
    help: "Indication relative uniquement — aucun montant ne vous est demandé.",
    options: [
      { value: "serre", label: "Serré, je cherche le meilleur rapport" },
      { value: "equilibre", label: "Équilibré" },
      { value: "confortable", label: "Confortable, la qualité prime" },
    ],
  },
  {
    id: "region",
    label: "Où se situe le projet ?",
    options: [
      { value: "brabant", label: "Brabant wallon" },
      { value: "bruxelles", label: "Bruxelles" },
      { value: "autre", label: "Autre région" },
    ],
  },
];

type Reco = {
  material: "PVC" | "Aluminium" | "Bois" | "PVC ou aluminium";
  reasons: string[];
  tradeoffs: string[];
  brandIds: string[];
  visitQuestions: string[];
};

/** Logique d'orientation — explicite, et justifiée point par point. */
function recommend(a: Answers): Reco {
  const reasons: string[] = [];
  const tradeoffs: string[] = [];

  const wantsBigGlass = a.baies === "oui" || a.size === "tresgrandes";
  const wantsThin = a.priority === "design" || a.priority === "lumiere" || a.style === "minimaliste";
  const tightBudget = a.budget === "serre" || a.priority === "budget";

  let material: Reco["material"] = "PVC ou aluminium";

  if (a.material === "bois") {
    material = "Bois";
    reasons.push("Vous avez indiqué une préférence pour le bois : nous partons de là.");
    tradeoffs.push("Le bois demande une reprise régulière de sa finition, surtout sur les façades exposées.");
  } else if (wantsBigGlass || wantsThin) {
    material = "Aluminium";
    if (wantsBigGlass)
      reasons.push("Vos ouvertures sont grandes ou comportent des coulissants : au-delà d'une certaine taille, l'aluminium tient là où le PVC devient lourd et moins stable.");
    if (wantsThin)
      reasons.push("Vous privilégiez la finesse et la lumière : à ouverture égale, un profilé aluminium laisse entrer plus de clair de vitrage.");
    if (tightBudget)
      tradeoffs.push("L'aluminium reste plus cher que le PVC à performance comparable : c'est le compromis principal de cette orientation.");
    tradeoffs.push("La performance thermique de l'aluminium dépend entièrement de la rupture de pont thermique du système : c'est le point à vérifier ligne par ligne sur le devis.");
  } else if (tightBudget || a.material === "pvc") {
    material = "PVC";
    if (tightBudget)
      reasons.push("Votre priorité est le budget : à performance thermique comparable, le PVC reste l'option la plus accessible.");
    if (a.material === "pvc") reasons.push("Vous penchez déjà vers le PVC, et rien dans vos réponses ne le contredit.");
    tradeoffs.push("Les profilés PVC sont plus épais : à ouverture identique, vous perdez un peu de surface vitrée.");
  } else if (a.priority === "isolation") {
    material = "PVC ou aluminium";
    reasons.push("Votre priorité est l'isolation : les deux matériaux peuvent y répondre, mais pas dans n'importe quelle gamme. C'est la référence du système et le vitrage qui décideront, pas le matériau.");
    tradeoffs.push("Comparer « PVC » et « aluminium » ne suffira pas : il faudra comparer deux références précises.");
  } else if (a.priority === "entretien") {
    material = "PVC ou aluminium";
    reasons.push("Vous voulez le minimum d'entretien : PVC et aluminium se contentent tous deux d'un nettoyage, contrairement au bois.");
  }

  /* Ajustements liés au bruit et à la sécurité — indépendants du cadre. */
  if (a.bruit === "fort") {
    reasons.push("Vous êtes fortement exposé au bruit : l'essentiel se jouera sur le vitrage (épaisseurs différentes, feuilletage acoustique) et sur l'étanchéité, davantage que sur le matériau du cadre.");
    tradeoffs.push("Un vitrage acoustique performant augmente le budget et le poids : la quincaillerie doit être dimensionnée en conséquence.");
  }
  if (a.securite === "renforce") {
    reasons.push("Vous demandez une sécurité renforcée : elle se construit avec la quincaillerie à points de verrouillage, un vitrage feuilleté et une fixation solide dans le mur.");
  }
  if (a.context === "renovation") {
    reasons.push("En rénovation, l'état de la baie existante pèse autant que le châssis lui-même : la reprise des finitions fait partie du chantier.");
  }
  if (a.building === "appartement") {
    tradeoffs.push("En appartement, l'aspect extérieur est souvent encadré par la copropriété : vérifiez teinte et division avant de commander.");
  }
  if (a.style === "classique" && material === "Aluminium") {
    tradeoffs.push("Un style classique s'accommode mal de profilés très fins : la division des vantaux devra compenser.");
  }

  /* Marques cohérentes avec le matériau — jamais un classement. */
  let brandIds: string[] = [];
  if (material === "Aluminium") brandIds = ["schuco", "aliplast", "aluprof"];
  else if (material === "PVC") brandIds = ["schuco"];
  else if (material === "PVC ou aluminium") brandIds = ["schuco", "aliplast", "aluprof"];
  else brandIds = [];

  const visitQuestions = [
    "L'état réel de vos baies et des appuis, qui ne se voit qu'une fois sur place.",
    "La possibilité de conserver ou non le dormant existant.",
    "La solution de ventilation à prévoir après l'étanchéité renforcée.",
    "La division des vantaux, qui change l'aspect autant que la teinte.",
    ...(wantsBigGlass ? ["Le mode de manœuvre du coulissant et la reprise de charge au-dessus de la baie."] : []),
    ...(a.bruit === "fort" ? ["La composition exacte du vitrage acoustique adaptée à votre exposition."] : []),
  ];

  return { material, reasons, tradeoffs, brandIds, visitQuestions };
}

export function ChassisQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= questions.length;
  const current = questions[Math.min(step, questions.length - 1)]!;

  const select = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    window.setTimeout(() => setStep((s) => s + 1), 160);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const reco = done ? recommend(answers) : null;
  const progress = Math.round((Math.min(step, questions.length) / questions.length) * 100);

  const shareToQuote = () => {
    try {
      window.sessionStorage.setItem(
        SHARE_KEY,
        JSON.stringify({
          material: reco?.material ?? "",
          region: answers.region ?? "",
          context: answers.context ?? "",
        })
      );
    } catch {
      /* stockage indisponible : le devis repartira de zéro */
    }
  };

  return (
    <div className="border border-ink-950/15 bg-bone">
      <div className="border-b border-ink-950/10 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            {done ? "Votre orientation" : `Question ${step + 1} sur ${questions.length}`}
          </p>
          {(step > 0 || done) && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 transition-colors hover:text-accent-600"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Recommencer
            </button>
          )}
        </div>
        <div
          className="mt-3 h-1 w-full bg-ink-950/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression du quiz"
        >
          <div className="h-full bg-accent-600 transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-8 sm:py-10">
        {!done ? (
          <fieldset>
            <legend className="font-display text-2xl leading-snug text-ink-950 sm:text-3xl">
              {current.label}
            </legend>
            {current.help && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500">{current.help}</p>
            )}
            <div role="radiogroup" aria-label={current.label} className="mt-7 grid gap-3 sm:grid-cols-2">
              {current.options.map((o) => {
                const selected = answers[current.id] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => select(current.id, o.value)}
                    className={cn(
                      "cursor-pointer border px-5 py-4 text-left text-base transition-colors",
                      selected
                        ? "border-accent-600 bg-accent-600/5 font-semibold text-ink-950"
                        : "border-ink-950/20 text-ink-700 hover:border-ink-950 hover:bg-bone-deep"
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-7 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-600 transition-colors hover:text-ink-950"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Question précédente
              </button>
            )}
          </fieldset>
        ) : (
          reco && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-600">
                Orientation, à confirmer lors d&apos;une visite technique
              </p>
              <h3 className="mt-4 font-display text-3xl leading-snug text-ink-950 sm:text-4xl">
                {reco.material}
              </h3>

              <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                Pourquoi cette orientation
              </h4>
              <ul className="mt-4 space-y-3">
                {reco.reasons.map((r) => (
                  <li key={r} className="flex gap-3 leading-relaxed text-ink-600">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-accent-600" />
                    {r}
                  </li>
                ))}
              </ul>

              {reco.tradeoffs.length > 0 && (
                <>
                  <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Les compromis à connaître
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {reco.tradeoffs.map((t) => (
                      <li key={t} className="flex gap-3 leading-relaxed text-ink-600">
                        <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-ink-950/40" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {reco.brandIds.length > 0 && (
                <>
                  <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                    Fabricants cohérents avec ce choix
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Cités parce qu&apos;ils proposent ce matériau, sans classement ni
                    priorité commerciale. C&apos;est la gamme précise qui décidera, pas
                    la marque.
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {brands
                      .filter((b) => reco.brandIds.includes(b.id))
                      .map((b) => (
                        <div key={b.id}>
                          <BrandLogo name={b.name} src={b.logo} width={b.logoWidth} height={b.logoHeight} tone={b.logoTone} />
                          <p className="mt-2 text-xs leading-relaxed text-ink-500">
                            {b.origin} · {b.materials.join(" & ")}
                          </p>
                        </div>
                      ))}
                  </div>
                  <Link
                    href="/solutions/fabricants"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-accent-600"
                  >
                    Comparatif détaillé
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </>
              )}

              <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                À confirmer lors de la visite technique
              </h4>
              <ul className="mt-4 space-y-3">
                {reco.visitQuestions.map((q) => (
                  <li key={q} className="flex gap-3 leading-relaxed text-ink-600">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 bg-ink-950/40" />
                    {q}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-2 border-accent-600 bg-bone-deep p-5">
                <p className="font-semibold text-ink-950">Les primes liées à ce projet</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Le remplacement de menuiseries et de vitrages est soutenu dans les trois
                  Régions, sous conditions de performance et de calendrier — plusieurs
                  démarches doivent précéder le chantier.
                </p>
                <Link
                  href="/primes"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-accent-600"
                >
                  Voir les primes par région
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-ink-500">
                Ce résultat est une orientation fondée sur vos réponses, pas un devis ni
                une préconisation technique définitive. Seule une visite sur place permet
                de valider une solution.
              </p>

              <Link
                href="/devis"
                onClick={shareToQuote}
                className="btn-press group mt-7 inline-flex items-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
              >
                Transformer en demande de devis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
