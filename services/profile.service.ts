import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import type { Profile, ServiceResult } from "@/types";
import type { TablesUpdate } from "@/types/database.types";
import { getErrorMessage } from "@/utils";

type Client = SupabaseClient<Database>;

/**
 * Service d'accès aux profils utilisateurs.
 *
 * Le client Supabase est injecté en paramètre : les mêmes fonctions
 * sont utilisables côté serveur (`lib/supabase/server`) et côté
 * navigateur (`lib/supabase/client`).
 */

/** Récupère le profil d'un utilisateur par son id. */
export async function getProfile(supabase: Client, userId: string): Promise<ServiceResult<Profile>> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

  if (error) {
    return { data: null, error: getErrorMessage(error) };
  }
  return { data, error: null };
}

/** Met à jour le profil de l'utilisateur (protégé par RLS : uniquement le sien). */
export async function updateProfile(
  supabase: Client,
  userId: string,
  updates: Pick<TablesUpdate<"profiles">, "display_name" | "avatar_url">
): Promise<ServiceResult<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    return { data: null, error: getErrorMessage(error) };
  }
  return { data, error: null };
}
