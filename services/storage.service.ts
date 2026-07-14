import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import type { ServiceResult } from "@/types";
import { getErrorMessage } from "@/utils";

type Client = SupabaseClient<Database>;

const AVATARS_BUCKET = "avatars";

/**
 * Service de stockage de fichiers (Supabase Storage).
 * Les policies du bucket `avatars` n'autorisent chaque utilisateur
 * qu'à écrire dans son propre dossier (`<user_id>/...`).
 */

/** Upload l'avatar de l'utilisateur et retourne son URL publique. */
export async function uploadAvatar(
  supabase: Client,
  userId: string,
  file: File
): Promise<ServiceResult<string>> {
  const extension = file.name.split(".").pop() ?? "png";
  const path = `${userId}/avatar.${extension}`;

  const { error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(path, file, { upsert: true });

  if (error) {
    return { data: null, error: getErrorMessage(error) };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(path);

  return { data: publicUrl, error: null };
}
