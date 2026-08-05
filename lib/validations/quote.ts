import { z } from "zod";

/**
 * Demande de devis — schéma partagé par le quiz (client) et l'action
 * serveur. Les listes d'options servent aussi à construire les écrans du
 * quiz : une seule source de vérité pour ce qui est proposé et validé.
 */

export const projectTypes = [
  "Châssis",
  "Portes",
  "Vitrages",
  "Plusieurs de ces solutions",
  "Construction ou rénovation",
] as const;

export const needTypes = [
  "Remplacement de l'existant",
  "Rénovation complète",
  "Construction neuve",
  "Autre / je ne sais pas encore",
] as const;

export const materials = ["PVC", "Aluminium", "Bois", "Je ne sais pas encore"] as const;

export const projectSizes = [
  "1 à 3 ouvertures",
  "4 à 10 ouvertures",
  "Plus de 10 ouvertures",
  "Toute l'habitation",
  "Je ne sais pas encore",
] as const;

export const regions = ["Brabant wallon", "Bruxelles-Capitale", "Autre région"] as const;

export const timelines = [
  "Dès que possible",
  "Dans les 3 mois",
  "Dans les 6 mois",
  "Dans l'année",
  "Je me renseigne",
] as const;

/** Schéma de validation de la demande de devis. */
export const quoteSchema = z.object({
  projectType: z.enum(projectTypes, { message: "Choisissez le type de projet" }),
  needType: z.enum(needTypes, { message: "Précisez la nature du besoin" }),
  /** Non demandé pour les projets sans menuiserie : facultatif. */
  material: z.enum(materials).optional().or(z.literal("")),
  projectSize: z.enum(projectSizes, { message: "Donnez un ordre de grandeur" }),
  region: z.enum(regions, { message: "Indiquez la région du projet" }),
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{4}$/, "Un code postal belge compte quatre chiffres")
    .optional()
    .or(z.literal("")),
  city: z.string().trim().min(2, "Indiquez la commune du projet"),
  timeline: z.enum(timelines, { message: "Indiquez le délai souhaité" }),
  description: z
    .string()
    .trim()
    .max(3000, "La description est trop longue (3000 caractères maximum)")
    .optional()
    .or(z.literal("")),
  firstName: z.string().trim().min(2, "Indiquez votre prénom"),
  lastName: z.string().trim().min(2, "Indiquez votre nom").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(8, "Ce numéro semble incomplet")
    .regex(/^[+0-9 ()./-]+$/, "Ce numéro contient des caractères inattendus"),
  email: z.string().trim().email("Cette adresse e-mail ne semble pas valide"),
  consent: z.literal("on", {
    message: "Nous avons besoin de votre accord pour traiter la demande",
  }),
  /** Honeypot anti-spam : doit rester vide (invisible pour les humains). */
  website: z.literal("").or(z.undefined()),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
  /** Erreurs par champ, réaffichées sur l'écran concerné du quiz. */
  fieldErrors: Partial<Record<string, string>>;
};

export const initialQuoteFormState: QuoteFormState = {
  status: "idle",
  message: null,
  fieldErrors: {},
};
