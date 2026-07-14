import { z } from "zod";

/**
 * Validation des variables d'environnement au démarrage (fail-fast).
 *
 * Les variables `NEXT_PUBLIC_*` sont exposées au navigateur : n'y mettre
 * AUCUN secret. La clé publishable Supabase est conçue pour être publique —
 * la sécurité des données repose sur les Row Level Security (RLS).
 *
 * Les variables doivent être référencées explicitement (`process.env.X`)
 * pour que Next.js puisse les inliner côté client.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL doit être une URL valide (https://xxx.supabase.co)"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY est requise"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
