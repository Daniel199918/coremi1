"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Pencil,
} from "lucide-react";
import { submitQuoteRequest } from "@/app/(site)/contact/actions";
import {
  initialQuoteFormState,
  materials,
  needTypes,
  projectSizes,
  projectTypes,
  regions,
  timelines,
} from "@/lib/validations/quote";
import { cn } from "@/utils";

/**
 * Demande de devis conversationnelle.
 *
 * Une question par écran, progression visible, retour arrière libre,
 * récapitulatif modifiable avant envoi. Les coordonnées ne sont
 * demandées qu'à la fin : on ne réclame pas un numéro de téléphone à
 * quelqu'un qui n'a encore rien dit de son projet.
 *
 * L'état est conservé dans le navigateur (localStorage) pour survivre à
 * un rechargement — hors coordonnées, qui ne sont jamais persistées.
 *
 * L'envoi passe par l'action serveur existante, qui revalide tout avec
 * le même schéma Zod.
 */

const STORAGE_KEY = "coremi-devis-v1";
/** Réponses transmises par le simulateur de primes, sur action explicite. */
const PRIMES_SHARE_KEY = "coremi-primes-v1";

type Answers = Record<string, string>;

type Step = {
  id: string;
  /** Champ(s) portés par l'écran, pour retrouver les erreurs serveur. */
  fields: string[];
  question: string;
  help?: string;
  /** Écran de choix simple. */
  options?: readonly string[];
  /** Écran libre (texte, coordonnées). */
  kind?: "text" | "contact" | "location";
  optional?: boolean;
  /** Permet de sauter un écran selon les réponses précédentes. */
  skipIf?: (a: Answers) => boolean;
};

const steps: Step[] = [
  {
    id: "projectType",
    fields: ["projectType"],
    question: "Quel est votre projet ?",
    help: "Une réponse approximative suffit, nous préciserons ensemble.",
    options: projectTypes,
  },
  {
    id: "needType",
    fields: ["needType"],
    question: "De quoi s'agit-il exactement ?",
    options: needTypes,
  },
  {
    id: "material",
    fields: ["material"],
    question: "Un matériau vous intéresse-t-il ?",
    help: "Aucune importance si vous hésitez : nous vous conseillerons selon l'exposition, le budget et l'entretien.",
    options: materials,
    // Sans menuiserie, la question n'a pas de sens.
    skipIf: (a) => a.projectType === "Construction ou rénovation",
  },
  {
    id: "projectSize",
    fields: ["projectSize"],
    question: "Quelle est l'ampleur du projet ?",
    options: projectSizes,
  },
  {
    id: "location",
    fields: ["region", "postalCode", "city"],
    question: "Où se situe le chantier ?",
    help: "Cela nous permet de vérifier que nous intervenons chez vous et d'organiser la visite.",
    kind: "location",
  },
  {
    id: "timeline",
    fields: ["timeline"],
    question: "Pour quand ?",
    options: timelines,
  },
  {
    id: "description",
    fields: ["description"],
    question: "Un détail à ajouter ?",
    help: "État actuel, contraintes d'accès, attentes particulières… Vous pouvez aussi passer cette étape.",
    kind: "text",
    optional: true,
  },
  {
    id: "contact",
    fields: ["firstName", "lastName", "phone", "email", "consent"],
    question: "Comment vous joindre ?",
    help: "Dernière étape. Nous n'utilisons ces informations que pour répondre à votre demande.",
    kind: "contact",
  },
];

const inputClasses =
  "w-full border border-ink-950/20 bg-bone px-4 py-3.5 text-base text-ink-950 placeholder:text-stone-400 focus:border-ink-950 focus:outline-none focus:ring-2 focus:ring-accent-600/30";

export function QuoteQuiz() {
  const [state, formAction, isPending] = useActionState(
    submitQuoteRequest,
    initialQuoteFormState
  );
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [review, setReview] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* Écrans réellement affichés, une fois les conditions appliquées. */
  const visible = steps.filter((s) => !s.skipIf?.(answers));
  const current = visible[Math.min(index, visible.length - 1)]!;
  const total = visible.length;

  /* Reprise d'une saisie interrompue (hors coordonnées), puis reprise
     éventuelle des réponses laissées par le simulateur de primes. */
  useEffect(() => {
    let next: Answers = {};
    let didRestore = false;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Answers;
        if (saved && typeof saved === "object" && Object.keys(saved).length > 0) {
          next = { ...saved };
          didRestore = true;
        }
      }
    } catch {
      /* stockage indisponible (navigation privée) : on continue sans */
    }

    /* Le simulateur de primes n'écrit ces valeurs que si le visiteur a
       cliqué explicitement sur « Faire chiffrer mon projet ». */
    try {
      const shared = window.sessionStorage.getItem(PRIMES_SHARE_KEY);
      if (shared) {
        const s = JSON.parse(shared) as {
          region?: string;
          postalCode?: string;
          works?: string;
        };
        if (s.region?.includes("Bruxelles")) next.region ??= "Bruxelles-Capitale";
        else if (s.region?.includes("Wallonie")) next.region ??= "Brabant wallon";
        if (s.postalCode) next.postalCode ??= s.postalCode;
        if (s.works?.includes("chassis")) next.projectType ??= "Châssis";
        else if (s.works?.includes("vitrage")) next.projectType ??= "Vitrages";
        window.sessionStorage.removeItem(PRIMES_SHARE_KEY);
        didRestore = true;
      }
    } catch {
      /* idem */
    }

    if (Object.keys(next).length > 0) {
      setAnswers(next);
      setRestored(didRestore);
    }
  }, []);

  useEffect(() => {
    try {
      const { firstName, lastName, phone, email, consent, ...safe } = answers;
      void firstName;
      void lastName;
      void phone;
      void email;
      void consent;
      if (Object.keys(safe).length > 0) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
      }
    } catch {
      /* idem */
    }
  }, [answers]);

  /* Le lecteur d'écran annonce la nouvelle question à chaque étape. */
  useEffect(() => {
    headingRef.current?.focus();
  }, [index, review]);

  /* Envoi réussi : on efface la reprise. */
  useEffect(() => {
    if (state.status === "success") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* rien à faire */
      }
    }
  }, [state.status]);

  const set = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setLocalError(null);
  };

  /** Vérifie l'écran courant avant d'avancer. */
  const validateCurrent = (): string | null => {
    if (current.optional) return null;
    if (current.options) {
      return answers[current.id] ? null : "Choisissez une réponse pour continuer.";
    }
    if (current.kind === "location") {
      if (!answers.region) return "Indiquez la région du chantier.";
      if (!answers.city || answers.city.trim().length < 2) return "Indiquez la commune.";
      if (answers.postalCode && !/^[0-9]{4}$/.test(answers.postalCode.trim()))
        return "Un code postal belge compte quatre chiffres.";
      return null;
    }
    if (current.kind === "contact") {
      if (!answers.firstName || answers.firstName.trim().length < 2)
        return "Indiquez votre prénom.";
      if (!answers.phone || answers.phone.trim().length < 8)
        return "Indiquez un numéro où vous joindre.";
      if (!answers.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim()))
        return "Cette adresse e-mail ne semble pas valide.";
      if (answers.consent !== "on")
        return "Nous avons besoin de votre accord pour traiter la demande.";
      return null;
    }
    return null;
  };

  const next = () => {
    const err = validateCurrent();
    if (err) {
      setLocalError(err);
      return;
    }
    setLocalError(null);
    if (index >= total - 1) setReview(true);
    else setIndex((i) => i + 1);
  };

  const back = () => {
    setLocalError(null);
    if (review) {
      setReview(false);
      setIndex(total - 1);
      return;
    }
    setIndex((i) => Math.max(0, i - 1));
  };

  const editFrom = (stepId: string) => {
    const i = visible.findIndex((s) => s.id === stepId);
    if (i >= 0) {
      setReview(false);
      setIndex(i);
    }
  };

  /* ---------- Écran de confirmation ---------- */
  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center border border-ink-950/10 bg-bone-deep px-6 py-16 text-center sm:px-10"
      >
        <CheckCircle2 className="h-12 w-12 text-accent-600" aria-hidden="true" />
        <h2 className="mt-6 font-display text-3xl text-ink-950">Demande envoyée</h2>
        <p className="mt-4 max-w-md leading-relaxed text-ink-600">{state.message}</p>
        <Link
          href="/"
          className="btn-press mt-8 bg-ink-950 px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-bone hover:bg-ink-800"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const progress = review ? 100 : Math.round(((index + 1) / (total + 1)) * 100);

  return (
    <div className="border border-ink-950/15 bg-bone">
      {/* Progression */}
      <div className="border-b border-ink-950/10 px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            {review ? "Récapitulatif" : `Étape ${index + 1} sur ${total}`}
          </p>
          <p className="text-xs text-ink-400">2 minutes environ</p>
        </div>
        <div
          className="mt-3 h-1 w-full bg-ink-950/10"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression de la demande"
        >
          <div
            className="h-full bg-accent-600 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="px-5 py-8 sm:px-8 sm:py-10">
        {restored && index === 0 && !review && (
          <p className="mb-6 border-l-2 border-accent-600 bg-bone-deep px-4 py-3 text-sm text-ink-600">
            Nous avons retrouvé vos réponses précédentes. Vous pouvez continuer où vous
            vous étiez arrêté.
          </p>
        )}

        {!review ? (
          /* ---------- Écrans de questions ---------- */
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl leading-snug text-ink-950 outline-none focus-visible:outline-none sm:text-3xl"
            >
              {current.question}
            </h2>
            {current.help && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500">{current.help}</p>
            )}

            <div className="mt-7">
              {/* Choix simples */}
              {current.options && (
                <div
                  role="radiogroup"
                  aria-label={current.question}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {current.options.map((opt) => {
                    const selected = answers[current.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          set(current.id, opt);
                          // Avance douce : on laisse voir la sélection.
                          window.setTimeout(() => {
                            if (index >= total - 1) setReview(true);
                            else setIndex((i) => i + 1);
                          }, 160);
                        }}
                        className={cn(
                          "cursor-pointer border px-5 py-4 text-left text-base transition-colors",
                          selected
                            ? "border-accent-600 bg-accent-600/5 font-semibold text-ink-950"
                            : "border-ink-950/20 text-ink-700 hover:border-ink-950 hover:bg-bone-deep"
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Localisation */}
              {current.kind === "location" && (
                <div className="space-y-6">
                  <div
                    role="radiogroup"
                    aria-label="Région du chantier"
                    className="grid gap-3 sm:grid-cols-3"
                  >
                    {regions.map((r) => {
                      const selected = answers.region === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => set("region", r)}
                          className={cn(
                            "cursor-pointer border px-5 py-4 text-left text-base transition-colors",
                            selected
                              ? "border-accent-600 bg-accent-600/5 font-semibold text-ink-950"
                              : "border-ink-950/20 text-ink-700 hover:border-ink-950 hover:bg-bone-deep"
                          )}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-700">
                        Commune <span className="text-accent-600">*</span>
                      </span>
                      <input
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Ex. : Wavre"
                        value={answers.city ?? ""}
                        onChange={(e) => set("city", e.target.value)}
                        className={inputClasses}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-700">
                        Code postal
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="1300"
                        maxLength={4}
                        value={answers.postalCode ?? ""}
                        onChange={(e) => set("postalCode", e.target.value)}
                        className={inputClasses}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Texte libre */}
              {current.kind === "text" && (
                <label className="block">
                  <span className="sr-only">Précisions sur votre projet</span>
                  <textarea
                    rows={6}
                    placeholder="Par exemple : châssis d'origine en bois, condensation en hiver, façade côté rue…"
                    value={answers.description ?? ""}
                    onChange={(e) => set("description", e.target.value)}
                    className={cn(inputClasses, "resize-y")}
                  />
                </label>
              )}

              {/* Coordonnées */}
              {current.kind === "contact" && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-700">
                        Prénom <span className="text-accent-600">*</span>
                      </span>
                      <input
                        type="text"
                        autoComplete="given-name"
                        value={answers.firstName ?? ""}
                        onChange={(e) => set("firstName", e.target.value)}
                        className={inputClasses}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-700">
                        Nom
                      </span>
                      <input
                        type="text"
                        autoComplete="family-name"
                        value={answers.lastName ?? ""}
                        onChange={(e) => set("lastName", e.target.value)}
                        className={inputClasses}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-700">
                        Téléphone <span className="text-accent-600">*</span>
                      </span>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="0470 00 00 00"
                        value={answers.phone ?? ""}
                        onChange={(e) => set("phone", e.target.value)}
                        className={inputClasses}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-700">
                        E-mail <span className="text-accent-600">*</span>
                      </span>
                      <input
                        type="email"
                        autoComplete="email"
                        value={answers.email ?? ""}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputClasses}
                      />
                    </label>
                  </div>

                  <div className="flex items-start gap-3 border-t border-ink-950/10 pt-5">
                    <input
                      id="quiz-consent"
                      type="checkbox"
                      checked={answers.consent === "on"}
                      onChange={(e) => set("consent", e.target.checked ? "on" : "")}
                      className="mt-1 h-4 w-4 cursor-pointer accent-accent-600"
                    />
                    <label htmlFor="quiz-consent" className="text-sm leading-relaxed text-ink-600">
                      J&apos;accepte que mes données soient utilisées pour traiter cette
                      demande de devis. Elles ne sont ni revendues ni utilisées à
                      d&apos;autres fins — voir la{" "}
                      <Link
                        href="/politique-de-confidentialite"
                        className="font-semibold text-ink-950 underline underline-offset-2"
                      >
                        politique de confidentialité
                      </Link>
                      . <span className="text-accent-600">*</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {localError && (
              <p
                role="alert"
                className="mt-6 flex items-start gap-2 text-sm font-medium text-accent-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {localError}
              </p>
            )}

            {/* Navigation */}
            <div className="mt-9 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={index === 0}
                className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-600 transition-colors hover:text-ink-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Retour
              </button>

              <button
                type="button"
                onClick={next}
                className="btn-press group inline-flex cursor-pointer items-center gap-3 bg-accent-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700"
              >
                {current.optional && !answers[current.id]
                  ? "Passer"
                  : index >= total - 1
                    ? "Vérifier ma demande"
                    : "Continuer"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          /* ---------- Récapitulatif ---------- */
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl leading-snug text-ink-950 outline-none focus-visible:outline-none sm:text-3xl"
            >
              Tout est correct ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Relisez avant d&apos;envoyer. Chaque ligne peut être modifiée.
            </p>

            <dl className="mt-7 border-t border-ink-950/15">
              {visible.map((s) => {
                const value =
                  s.kind === "location"
                    ? [answers.region, answers.city, answers.postalCode]
                        .filter(Boolean)
                        .join(" · ")
                    : s.kind === "contact"
                      ? [
                          [answers.firstName, answers.lastName].filter(Boolean).join(" "),
                          answers.phone,
                          answers.email,
                        ]
                          .filter(Boolean)
                          .join(" · ")
                      : answers[s.id];
                return (
                  <div
                    key={s.id}
                    className="flex items-start justify-between gap-4 border-b border-ink-950/15 py-4"
                  >
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                        {s.question}
                      </dt>
                      <dd className="mt-1 break-words text-ink-950">
                        {value || <span className="text-ink-400">Non renseigné</span>}
                      </dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => editFrom(s.id)}
                      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-600 transition-colors hover:text-accent-600"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      Modifier
                    </button>
                  </div>
                );
              })}
            </dl>

            {state.status === "error" && state.message && (
              <p
                role="alert"
                className="mt-7 flex items-start gap-2 border border-accent-600/40 bg-accent-600/5 px-4 py-3.5 text-sm leading-relaxed text-accent-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {state.message}
              </p>
            )}

            {/* Envoi réel : toutes les réponses en champs cachés */}
            <form action={formAction} className="mt-8">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              {[
                "projectType",
                "needType",
                "material",
                "projectSize",
                "region",
                "postalCode",
                "city",
                "timeline",
                "description",
                "firstName",
                "lastName",
                "phone",
                "email",
                "consent",
              ].map((f) => (
                <input key={f} type="hidden" name={f} value={answers[f] ?? ""} />
              ))}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-600 transition-colors hover:text-ink-950"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Revenir aux questions
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-press inline-flex w-full cursor-pointer items-center justify-center gap-3 bg-accent-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Envoi en cours…
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
