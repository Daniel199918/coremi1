"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitQuoteRequest } from "@/app/(site)/contact/actions";
import {
  initialQuoteFormState,
  projectTypes,
  timelines,
} from "@/lib/validations/quote";
import { cn } from "@/utils";

const inputClasses =
  "w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-950/10";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy?: string }) => React.ReactNode;
};

/** Champ de formulaire avec label, erreur accessible et astérisque requis. */
function Field({ label, error, required, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-950">
        {label}
        {required && (
          <span className="text-accent-600" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children({ id, describedBy: error ? errorId : undefined })}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-accent-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulaire de demande de devis.
 * Validé côté serveur (Zod), honeypot anti-spam, prêt à brancher sur Resend.
 */
export function QuoteForm() {
  const [state, formAction, isPending] = useActionState(
    submitQuoteRequest,
    initialQuoteFormState
  );
  const errors = state.fieldErrors;

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-xl border border-green-200 bg-green-50 px-8 py-14 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
          Demande envoyée !
        </h3>
        <p className="mt-3 max-w-md text-navy-900/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {/* Honeypot anti-spam : invisible pour les humains, rempli par les robots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Prénom" name="firstName" error={errors.firstName} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.firstName && "border-accent-600")}
            />
          )}
        </Field>
        <Field label="Nom" name="lastName" error={errors.lastName} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              aria-invalid={!!errors.lastName}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.lastName && "border-accent-600")}
            />
          )}
        </Field>
        <Field label="Téléphone" name="phone" error={errors.phone} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="0470 12 34 56"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.phone && "border-accent-600")}
            />
          )}
        </Field>
        <Field label="Adresse e-mail" name="email" error={errors.email} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.email && "border-accent-600")}
            />
          )}
        </Field>
        <Field label="Commune" name="city" error={errors.city} required>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="Ex. : Wavre"
              required
              aria-invalid={!!errors.city}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.city && "border-accent-600")}
            />
          )}
        </Field>
        <Field label="Type de projet" name="projectType" error={errors.projectType} required>
          {({ id, describedBy }) => (
            <select
              id={id}
              name="projectType"
              required
              defaultValue=""
              aria-invalid={!!errors.projectType}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.projectType && "border-accent-600")}
            >
              <option value="" disabled>
                Choisissez…
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Budget estimé (facultatif)" name="budget" error={errors.budget}>
          {({ id, describedBy }) => (
            <input
              id={id}
              name="budget"
              type="text"
              placeholder="Ex. : 25 000 €"
              aria-describedby={describedBy}
              className={inputClasses}
            />
          )}
        </Field>
        <Field label="Délai souhaité" name="timeline" error={errors.timeline} required>
          {({ id, describedBy }) => (
            <select
              id={id}
              name="timeline"
              required
              defaultValue=""
              aria-invalid={!!errors.timeline}
              aria-describedby={describedBy}
              className={cn(inputClasses, errors.timeline && "border-accent-600")}
            >
              <option value="" disabled>
                Choisissez…
              </option>
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field label="Décrivez votre projet" name="description" error={errors.description} required>
        {({ id, describedBy }) => (
          <textarea
            id={id}
            name="description"
            rows={6}
            required
            placeholder="Type de travaux, surface approximative, état actuel, attentes particulières…"
            aria-invalid={!!errors.description}
            aria-describedby={describedBy}
            className={cn(inputClasses, "resize-y", errors.description && "border-accent-600")}
          />
        )}
      </Field>

      <Field label="Photos (facultatif)" name="photos" error={errors.photos}>
        {({ id }) => (
          <input
            id={id}
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="w-full rounded-lg border border-dashed border-navy-200 bg-navy-50/50 px-4 py-3 text-sm text-navy-900/70 file:mr-4 file:rounded-md file:border-0 file:bg-navy-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-navy-800"
          />
        )}
      </Field>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 h-4 w-4 rounded border-navy-300 accent-accent-600"
        />
        <label htmlFor="consent" className="text-sm text-navy-900/75">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande,
          conformément à la{" "}
          <Link href="/politique-de-confidentialite" className="font-semibold underline">
            politique de confidentialité
          </Link>
          . <span className="text-accent-600" aria-hidden="true">*</span>
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" role="alert" className="text-sm text-accent-700">
          {errors.consent}
        </p>
      )}

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-800">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Envoyer ma demande de devis
          </>
        )}
      </button>
    </form>
  );
}
