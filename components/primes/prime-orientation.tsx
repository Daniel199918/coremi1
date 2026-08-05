"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, RotateCcw } from "lucide-react";
import { primeRegions } from "@/content/primes";
import { cn } from "@/utils";

/**
 * « Quelles primes pourraient correspondre à mon projet ? »
 *
 * Outil d'ORIENTATION, pas de simulation : il ne calcule rien, ne promet
 * rien et n'annonce aucun montant. À partir de quelques réponses, il
 * renvoie vers le bon dispositif régional et vers les sources
 * officielles, en signalant les points qui méritent attention (audit
 * préalable, calendrier, catégorie de revenus).
 *
 * Aucune donnée n'est transmise : tout reste dans le navigateur.
 */

type Question = {
  id: string;
  label: string;
  help?: string;
  options: { value: string; label: string; hint?: string }[];
};

const questions: Question[] = [
  {
    id: "region",
    label: "Où se situe le logement ?",
    help: "Les aides sont régionales : c'est la première chose qui détermine le dispositif applicable.",
    options: [
      { value: "wallonie", label: "En Wallonie" },
      { value: "bruxelles", label: "En Région de Bruxelles-Capitale" },
      { value: "flandre", label: "En Flandre" },
    ],
  },
  {
    id: "building",
    label: "De quel type de bâtiment s'agit-il ?",
    options: [
      { value: "maison", label: "Une maison" },
      { value: "appartement", label: "Un appartement" },
      { value: "immeuble", label: "Un immeuble ou une copropriété" },
      { value: "autre", label: "Autre / je ne sais pas" },
    ],
  },
  {
    id: "works",
    label: "Quels travaux envisagez-vous ?",
    options: [
      { value: "chassis", label: "Remplacer des châssis ou menuiseries" },
      { value: "vitrage", label: "Remplacer uniquement des vitrages" },
      { value: "global", label: "Une rénovation plus large" },
      { value: "indecis", label: "Je me renseigne encore" },
    ],
  },
  {
    id: "profile",
    label: "Quelle est votre situation ?",
    help: "Le statut du demandeur conditionne l'accès à la plupart des dispositifs.",
    options: [
      { value: "occupant", label: "Propriétaire et j'habite le logement" },
      { value: "bailleur", label: "Propriétaire et je le mets en location" },
      { value: "locataire", label: "Locataire" },
      { value: "acquisition", label: "En cours d'acquisition" },
    ],
  },
  {
    id: "timing",
    label: "Quand les travaux sont-ils prévus ?",
    help: "Le calendrier est décisif : certaines démarches doivent impérativement précéder le chantier.",
    options: [
      { value: "encours", label: "Les travaux ont déjà commencé" },
      { value: "bientot", label: "Dans les prochains mois" },
      { value: "plustard", label: "Dans plus de six mois" },
      { value: "inconnu", label: "Pas encore décidé" },
    ],
  },
];

export function PrimeOrientation() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= questions.length;

  const select = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const region = primeRegions.find((r) => r.id === answers.region);

  /* Points d'attention déduits des réponses — jamais un montant. */
  const flags: { title: string; text: string }[] = [];
  if (answers.timing === "encours") {
    flags.push({
      title: "Travaux déjà commencés : vérifiez d'urgence",
      text: "Plusieurs dispositifs exigent que la demande, l'audit ou l'accompagnement précèdent le début du chantier. Contactez l'administration avant d'aller plus loin — c'est le motif de refus le plus fréquent.",
    });
  }
  if (answers.timing === "plustard" || answers.timing === "inconnu") {
    flags.push({
      title: "Revérifiez au moment de vous lancer",
      text: "Les régimes d'aide évoluent d'une année à l'autre. Ce qui est valable aujourd'hui peut ne plus l'être au moment de votre chantier.",
    });
  }
  if (answers.profile === "locataire") {
    flags.push({
      title: "Locataire : l'accord du propriétaire est central",
      text: "Certaines aides s'adressent au propriétaire, d'autres restent ouvertes au locataire sous conditions. Le point doit être clarifié avec le bailleur avant d'engager quoi que ce soit.",
    });
  }
  if (answers.profile === "bailleur") {
    flags.push({
      title: "Bailleur : conditions spécifiques",
      text: "Les propriétaires bailleurs relèvent souvent de règles distinctes, parfois liées à un plafond de loyer ou à une mise en location encadrée.",
    });
  }
  if (answers.building === "immeuble") {
    flags.push({
      title: "Copropriété : procédure à part",
      text: "Les travaux portant sur les parties communes suivent en général une procédure et un calendrier propres, à engager via le syndic.",
    });
  }
  if (answers.works === "chassis" || answers.works === "vitrage") {
    flags.push({
      title: "Exigences techniques sur les vitrages",
      text: "Les dispositifs imposent des performances thermiques minimales (valeur U). Nous indiquons systématiquement ces valeurs sur nos devis, ce qui vous évite un refus pour pièce incomplète.",
    });
  }

  const progress = Math.round((Math.min(step, questions.length) / questions.length) * 100);

  return (
    <div className="border border-ink-950/15 bg-bone">
      {/* Progression */}
      <div className="border-b border-ink-950/10 px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            {done ? "Résultat" : `Question ${step + 1} sur ${questions.length}`}
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
          aria-label="Progression de l'orientation"
        >
          <div
            className="h-full bg-accent-600 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-8 sm:py-10">
        {!done ? (
          <fieldset>
            <legend className="font-display text-2xl leading-snug text-ink-950 sm:text-3xl">
              {questions[step]!.label}
            </legend>
            {questions[step]!.help && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
                {questions[step]!.help}
              </p>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {questions[step]!.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => select(questions[step]!.id, opt.value)}
                  className={cn(
                    "cursor-pointer border px-5 py-4 text-left text-sm transition-colors",
                    answers[questions[step]!.id] === opt.value
                      ? "border-accent-600 bg-accent-600/5 text-ink-950"
                      : "border-ink-950/20 text-ink-700 hover:border-ink-950 hover:bg-bone-deep"
                  )}
                >
                  <span className="font-semibold text-ink-950">{opt.label}</span>
                  {opt.hint && <span className="mt-1 block text-xs text-ink-500">{opt.hint}</span>}
                </button>
              ))}
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-600">
              Piste à explorer — aucune garantie
            </p>
            <h3 className="mt-4 font-display text-2xl leading-snug text-ink-950 sm:text-3xl">
              {region
                ? `Votre projet relève des dispositifs applicables en ${region.region}.`
                : "Votre projet relève d'un dispositif régional."}
            </h3>

            {region && (
              <>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-600">{region.summary}</p>

                {region.alert && (
                  <div className="mt-6 border-l-2 border-accent-600 bg-bone-deep p-5">
                    <p className="font-semibold text-ink-950">{region.alert.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{region.alert.text}</p>
                  </div>
                )}
              </>
            )}

            {flags.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  À vérifier dans votre cas
                </h4>
                <ul className="mt-4 space-y-4">
                  {flags.map((f) => (
                    <li key={f.title} className="border-t border-ink-950/10 pt-4">
                      <p className="font-semibold text-ink-950">{f.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{f.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {region && (
              <div className="mt-8 border-t border-ink-950/10 pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Sources officielles à consulter
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {region.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-950 underline decoration-accent-600 underline-offset-4 hover:text-accent-700"
                      >
                        {s.label}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-8 text-sm leading-relaxed text-ink-500">
              Cette orientation ne constitue ni une simulation, ni un engagement, ni une
              garantie d&apos;éligibilité. Seule l&apos;administration compétente peut
              confirmer vos droits.
            </p>

            <Link
              href="/devis"
              className="btn-press group mt-7 inline-flex items-center gap-3 bg-accent-600 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
            >
              Faire chiffrer mon projet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
