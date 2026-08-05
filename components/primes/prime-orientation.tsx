"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, RotateCcw } from "lucide-react";
import {
  getRegion,
  schemesForRegionWithFederal,
  statusLabels,
  type CategoryId,
  type RegionId,
  type Scheme,
} from "@/content/primes";
import { cn } from "@/utils";

/**
 * « Quelles primes pourraient correspondre à mon projet ? »
 *
 * Outil d'ORIENTATION, pas de simulation : il ne calcule aucun montant,
 * ne promet rien, et présente toujours son résultat comme une piste à
 * confirmer auprès de l'administration.
 *
 * Aucune coordonnée n'est demandée avant l'affichage des résultats, et
 * aucune donnée ne quitte le navigateur. Les réponses sont conservées en
 * mémoire de session pour pouvoir être reprises par la demande de devis,
 * avec l'accord explicite du visiteur.
 */

const SHARE_KEY = "coremi-primes-v1";

type Answers = Record<string, string>;

type Question = {
  id: string;
  label: string;
  help?: string;
  kind?: "choice" | "postal";
  multiple?: boolean;
  options?: { value: string; label: string }[];
  /** Question posée seulement dans certains cas. */
  skipIf?: (a: Answers) => boolean;
};

const questions: Question[] = [
  {
    id: "region",
    label: "Où se situe le logement ?",
    help: "Les aides sont régionales : c'est ce qui détermine l'ensemble des dispositifs applicables.",
    options: [
      { value: "wallonie", label: "En Wallonie" },
      { value: "bruxelles", label: "En Région de Bruxelles-Capitale" },
      { value: "flandre", label: "En Flandre" },
    ],
  },
  {
    id: "postalCode",
    label: "Quel est le code postal ?",
    help: "Facultatif. Certaines communes ajoutent leurs propres aides à celles de la Région.",
    kind: "postal",
  },
  {
    id: "housing",
    label: "De quel type de logement s'agit-il ?",
    options: [
      { value: "maison", label: "Une maison" },
      { value: "appartement", label: "Un appartement" },
      { value: "immeuble", label: "Un immeuble ou une copropriété" },
      { value: "autre", label: "Autre / je ne sais pas" },
    ],
  },
  {
    id: "profile",
    label: "Quelle est votre situation ?",
    options: [
      { value: "occupant", label: "Propriétaire occupant" },
      { value: "bailleur", label: "Propriétaire bailleur" },
      { value: "locataire", label: "Locataire" },
      { value: "copro", label: "Copropriété / syndic" },
      { value: "acquisition", label: "En cours d'acquisition" },
    ],
  },
  {
    id: "age",
    label: "Quel âge a approximativement le bâtiment ?",
    help: "L'ancienneté conditionne l'accès à plusieurs dispositifs, ainsi qu'au taux de TVA réduit.",
    options: [
      { value: "moins10", label: "Moins de 10 ans" },
      { value: "10a15", label: "Entre 10 et 15 ans" },
      { value: "plus15", label: "Plus de 15 ans" },
      { value: "inconnu", label: "Je ne sais pas" },
    ],
  },
  {
    id: "works",
    label: "Quels travaux envisagez-vous ?",
    help: "Plusieurs réponses possibles — les combinaisons ouvrent souvent plus de droits qu'un poste isolé.",
    multiple: true,
    options: [
      { value: "chassis", label: "Châssis / menuiseries" },
      { value: "vitrage", label: "Vitrage" },
      { value: "portes", label: "Portes extérieures" },
      { value: "isolation", label: "Isolation" },
      { value: "ventilation", label: "Ventilation" },
      { value: "chauffage", label: "Chauffage" },
      { value: "renovation", label: "Rénovation plus large" },
    ],
  },
  {
    id: "stage",
    label: "Où en est votre projet ?",
    help: "C'est déterminant : plusieurs aides exigent que la démarche précède le chantier.",
    options: [
      { value: "reflexion", label: "En réflexion" },
      { value: "devis", label: "J'ai reçu un ou plusieurs devis" },
      { value: "commande", label: "Les travaux sont commandés" },
      { value: "commence", label: "Les travaux ont commencé" },
    ],
  },
  {
    id: "audit",
    label: "Un audit énergétique a-t-il été réalisé ?",
    help: "En Wallonie notamment, l'audit conditionne l'accès à plusieurs aides et doit précéder les travaux.",
    options: [
      { value: "oui", label: "Oui, par un auditeur agréé" },
      { value: "non", label: "Non" },
      { value: "prevu", label: "C'est prévu" },
      { value: "inconnu", label: "Je ne sais pas" },
    ],
  },
  {
    id: "income",
    label: "Dans quelle tranche de revenus vous situez-vous ?",
    help: "Question posée uniquement parce que le montant des aides en dépend directement. Réponse approximative, conservée dans votre navigateur, jamais transmise.",
    options: [
      { value: "modeste", label: "Revenus modestes" },
      { value: "moyen", label: "Revenus intermédiaires" },
      { value: "eleve", label: "Revenus plus élevés" },
      { value: "prefere-pas", label: "Je préfère ne pas répondre" },
    ],
  },
];

export function PrimeOrientation() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [postal, setPostal] = useState("");

  const visible = questions.filter((q) => !q.skipIf?.(answers));
  const done = step >= visible.length;
  const current = visible[Math.min(step, visible.length - 1)]!;

  const selectedWorks = (answers.works ?? "").split(",").filter(Boolean) as CategoryId[];

  const setAnswer = (id: string, value: string) => setAnswers((a) => ({ ...a, [id]: value }));

  const toggleMulti = (id: string, value: string) => {
    const cur = (answers[id] ?? "").split(",").filter(Boolean);
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    setAnswers((a) => ({ ...a, [id]: next.join(",") }));
  };

  const advance = () => setStep((s) => s + 1);

  const reset = () => {
    setAnswers({});
    setPostal("");
    setStep(0);
  };

  const regionId = answers.region as RegionId | undefined;
  const region = regionId ? getRegion(regionId) : undefined;

  /* Dispositifs pertinents : région choisie + fédéral, filtrés par travaux. */
  let relevant: Scheme[] = regionId ? schemesForRegionWithFederal(regionId) : [];
  if (selectedWorks.length > 0) {
    relevant = relevant.filter((s) => s.categories.some((c) => selectedWorks.includes(c)));
  }
  relevant = relevant.filter((s) => s.status !== "termine");

  /* Points à vérifier, déduits des réponses — jamais un montant. */
  const checks: { title: string; text: string }[] = [];
  if (answers.stage === "commence" || answers.stage === "commande") {
    checks.push({
      title: "Vérifiez d'urgence l'ordre des démarches",
      text: "Plusieurs dispositifs exigent que la demande, l'audit ou l'accompagnement précèdent le début du chantier. Comme vos travaux sont déjà engagés, contactez l'administration avant d'aller plus loin : c'est le motif de refus le plus fréquent.",
    });
  }
  if (answers.audit === "non" && regionId === "wallonie") {
    checks.push({
      title: "L'audit conditionne plusieurs aides wallonnes",
      text: "Sans audit réalisé par un auditeur agréé, et réalisé avant les travaux, l'accès à certaines aides peut être fermé. Vérifiez si votre projet en relève.",
    });
  }
  if (answers.age === "moins10") {
    checks.push({
      title: "Logement récent : plusieurs dispositifs sont fermés",
      text: "La plupart des aides à la rénovation, ainsi que le taux de TVA réduit, visent des logements ayant atteint un certain âge. Un bâtiment de moins de dix ans en est souvent exclu.",
    });
  }
  if (answers.profile === "locataire") {
    checks.push({
      title: "Locataire : l'accord du propriétaire est central",
      text: "Certaines aides s'adressent au propriétaire, d'autres restent ouvertes au locataire sous conditions. Le point doit être clarifié avec le bailleur avant d'engager quoi que ce soit.",
    });
  }
  if (answers.profile === "bailleur") {
    checks.push({
      title: "Bailleur : conditions spécifiques",
      text: "Les propriétaires bailleurs relèvent souvent de règles distinctes, parfois liées à un plafond de loyer ou à une mise en location encadrée. En Flandre, des évolutions les concernant sont annoncées pour 2027.",
    });
  }
  if (answers.profile === "copro" || answers.housing === "immeuble") {
    checks.push({
      title: "Copropriété : procédure et calendrier propres",
      text: "Les travaux sur parties communes suivent en général une procédure distincte, à engager via le syndic, avec des délais plus longs.",
    });
  }
  if (selectedWorks.includes("chassis") || selectedWorks.includes("vitrage")) {
    checks.push({
      title: "Exigences techniques sur les menuiseries",
      text: "Les dispositifs imposent des performances thermiques minimales (valeurs U), distinctes pour le vitrage et pour le châssis. Nos devis les mentionnent systématiquement, ce qui évite un refus pour pièce incomplète.",
    });
  }
  if (selectedWorks.includes("chassis") && !selectedWorks.includes("ventilation")) {
    checks.push({
      title: "Pensez la ventilation en même temps",
      text: "Remplacer des châssis rend le logement nettement plus étanche. Sans apport d'air neuf, le risque de condensation et de moisissures augmente — et en Flandre, la ventilation est explicitement liée à l'aide sur les menuiseries.",
    });
  }
  if (answers.income === "eleve" && regionId === "flandre") {
    checks.push({
      title: "Revenus élevés en Flandre : orientation vers le prêt",
      text: "Depuis la réforme de mars 2026, les catégories de revenus les plus hautes sont orientées en priorité vers Mijn VerbouwLening plutôt que vers l'aide directe.",
    });
  }

  const progress = Math.round((Math.min(step, visible.length) / visible.length) * 100);

  /* Partage des réponses vers la demande de devis, sur action explicite. */
  const shareToQuote = () => {
    try {
      window.sessionStorage.setItem(
        SHARE_KEY,
        JSON.stringify({
          region: region?.name ?? "",
          postalCode: postal,
          works: selectedWorks.join(","),
        })
      );
    } catch {
      /* stockage indisponible : le devis repartira de zéro, sans conséquence */
    }
  };

  return (
    <div className="border border-ink-950/15 bg-bone">
      {/* Progression */}
      <div className="border-b border-ink-950/10 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            {done ? "Résultat" : `Question ${step + 1} sur ${visible.length}`}
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
          aria-label="Progression"
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

            {/* Code postal */}
            {current.kind === "postal" ? (
              <div className="mt-7 max-w-xs">
                <label className="block">
                  <span className="sr-only">Code postal</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="1300"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value.replace(/\D/g, ""))}
                    className="w-full border border-ink-950/20 bg-bone px-4 py-3.5 text-base text-ink-950 focus:border-ink-950 focus:outline-none focus:ring-2 focus:ring-accent-600/30"
                  />
                </label>
                <button
                  type="button"
                  onClick={advance}
                  className="btn-press group mt-5 inline-flex cursor-pointer items-center gap-3 bg-accent-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
                >
                  {postal ? "Continuer" : "Passer"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {current.options!.map((opt) => {
                    const selected = current.multiple
                      ? (answers[current.id] ?? "").split(",").includes(opt.value)
                      : answers[current.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={current.multiple ? selected : undefined}
                        onClick={() => {
                          if (current.multiple) {
                            toggleMulti(current.id, opt.value);
                          } else {
                            setAnswer(current.id, opt.value);
                            window.setTimeout(advance, 160);
                          }
                        }}
                        className={cn(
                          "cursor-pointer border px-5 py-4 text-left text-base transition-colors",
                          selected
                            ? "border-accent-600 bg-accent-600/5 font-semibold text-ink-950"
                            : "border-ink-950/20 text-ink-700 hover:border-ink-950 hover:bg-bone-deep"
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {current.multiple && (
                  <button
                    type="button"
                    onClick={advance}
                    className="btn-press group mt-6 inline-flex cursor-pointer items-center gap-3 bg-accent-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                )}
              </>
            )}

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
          /* ------------------------- Résultat ------------------------- */
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-600">
              Pistes à explorer — aucune garantie d&apos;éligibilité
            </p>
            <h3 className="mt-4 font-display text-2xl leading-snug text-ink-950 sm:text-3xl">
              {region
                ? `Dispositifs susceptibles de concerner votre projet en ${region.shortName}`
                : "Dispositifs susceptibles de concerner votre projet"}
            </h3>

            {relevant.length > 0 ? (
              <ul className="mt-7 space-y-4">
                {relevant.map((s) => (
                  <li key={s.id} className="border border-ink-950/15 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h4 className="font-display text-xl text-ink-950">{s.name}</h4>
                      <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-500">
                        {statusLabels[s.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.summary}</p>
                    <p className="mt-3 text-xs text-ink-500">
                      Pourquoi c&apos;est proposé : ce dispositif couvre au moins un des
                      travaux que vous avez indiqués, dans votre région.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {s.sources.map((src) => (
                        <a
                          key={src.href}
                          href={src.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                        >
                          {src.label}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 leading-relaxed text-ink-600">
                Aucun dispositif ne ressort avec les réponses données. Cela ne signifie
                pas qu&apos;il n&apos;existe rien : consultez le portail officiel de votre
                région.
              </p>
            )}

            {checks.length > 0 && (
              <div className="mt-10">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Conditions restant à vérifier dans votre cas
                </h4>
                <ul className="mt-4 space-y-4">
                  {checks.map((c) => (
                    <li key={c.title} className="border-t border-ink-950/10 pt-4">
                      <p className="font-semibold text-ink-950">{c.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{c.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 border-t border-ink-950/10 pt-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                Prochaines étapes
              </h4>
              <ol className="mt-4 space-y-3 text-ink-600">
                <li className="flex gap-4">
                  <span className="font-display text-base font-medium leading-6 text-accent-600">01</span>
                  Vérifier votre éligibilité sur le portail officiel de votre région — c&apos;est
                  la seule source qui fasse foi.
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-base font-medium leading-6 text-accent-600">02</span>
                  Faire établir un devis détaillé mentionnant les performances techniques
                  des matériaux, indispensable au dossier.
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-base font-medium leading-6 text-accent-600">03</span>
                  Respecter l&apos;ordre imposé : dans plusieurs cas, la démarche doit
                  précéder le chantier.
                </li>
              </ol>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-ink-500">
              Ce résultat est une orientation, pas une confirmation d&apos;éligibilité, et
              ne constitue ni un conseil juridique ni une décision administrative.
              Informations vérifiées le {relevant[0]?.lastChecked ?? "—"}.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/devis"
                onClick={shareToQuote}
                className="btn-press group inline-flex items-center justify-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
              >
                Faire chiffrer mon projet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              {region && (
                <Link
                  href={`/primes/${region.id}`}
                  className="btn-press inline-flex items-center justify-center border border-ink-950/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                >
                  Tout savoir sur les aides en {region.shortName}
                </Link>
              )}
            </div>
            <p className="mt-3 text-xs text-ink-500">
              En cliquant sur « Faire chiffrer mon projet », votre région, votre code
              postal et les travaux sélectionnés sont repris dans le formulaire pour
              vous éviter de les ressaisir. Rien d&apos;autre n&apos;est transmis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
