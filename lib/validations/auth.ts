import { z } from "zod";

/** Schéma de connexion (email + mot de passe). */
export const loginSchema = z.object({
  email: z.string().trim().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

/** Schéma d'inscription. */
export const registerSchema = z.object({
  email: z.string().trim().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  displayName: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
