import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/services/profile.service";
import { formatDate } from "@/utils";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Le layout (protected) garantit qu'un utilisateur est connecté.
  if (!user) return null;

  const { data: profile } = await getProfile(supabase, user.id);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        Bonjour{profile?.display_name ? `, ${profile.display_name}` : ""} 👋
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Vous êtes connecté avec <span className="font-medium">{user.email}</span>.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Profil</h2>
          <p className="mt-1 text-lg font-semibold">
            {profile?.display_name ?? "Non renseigné"}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Membre depuis</h2>
          <p className="mt-1 text-lg font-semibold">
            {profile ? formatDate(profile.created_at) : "—"}
          </p>
        </div>
      </div>
    </section>
  );
}
