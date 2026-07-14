import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import type { Database } from "@/types/database.types";

/**
 * Client Supabase pour les Server Components, Server Actions et Route Handlers.
 * Crée un nouveau client par requête (obligatoire : les cookies sont liés à la requête).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component : les cookies sont en lecture seule.
            // Le middleware (updateSession) se charge du rafraîchissement de session.
          }
        },
      },
    }
  );
}
