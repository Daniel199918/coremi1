import { z } from "zod";

export const projectTypes = [
  "Construction",
  "Rénovation",
  "Châssis",
  "Portes",
  "Extension",
  "Aménagement extérieur",
  "Autre",
] as const;

export const timelines = [
  "Dès que possible",
  "Dans les 3 mois",
  "Dans les 6 mois",
  "Dans l'année",
  "Je me renseigne",
] as const;

/** Schéma de validation du formulaire de demande de devis. */
export const quoteSchema = z.object({
  firstName: z.string().trim().min(2, "Veuillez indiquer votre prénom"),
  lastName: z.string().trim().min(2, "Veuillez indiquer votre nom"),
  phone: z
    .string()
    .trim()
    .min(8, "Veuillez indiquer un numéro de téléphone valide")
    .regex(/^[+0-9 ()./-]+$/, "Ce numéro contient des caractères non valides"),
  email: z.string().trim().email("Veuillez indiquer une adresse e-mail valide"),
  city: z.string().trim().min(2, "Veuillez indiquer votre commune"),
  projectType: z.enum(projectTypes, { message: "Veuillez choisir un type de projet" }),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  timeline: z.enum(timelines, { message: "Veuillez indiquer le délai souhaité" }),
  description: z
    .string()
    .trim()
    .min(20, "Décrivez votre projet en quelques phrases (20 caractères minimum)")
    .max(3000, "La description est trop longue (3000 caractères maximum)"),
  consent: z.literal("on", {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  /** Honeypot anti-spam : doit rester vide (invisible pour les humains). */
  website: z.literal("").or(z.undefined()),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
  /** Erreurs par champ, affichées sous chaque input. */
  fieldErrors: Partial<Record<string, string>>;
};

export const initialQuoteFormState: QuoteFormState = {
  status: "idle",
  message: null,
  fieldErrors: {},
};
