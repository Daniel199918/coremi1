import type { Tables } from "@/types/database.types";

/** Profil utilisateur (table `public.profiles`). */
export type Profile = Tables<"profiles">;

/** Résultat standardisé des Server Actions de formulaire. */
export type FormActionState = {
  error: string | null;
};

/** Résultat standardisé des fonctions de service. */
export type ServiceResult<T> = { data: T; error: null } | { data: null; error: string };
