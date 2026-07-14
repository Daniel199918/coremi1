import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Garde d'authentification des routes protégées.
 * Double protection avec le middleware : ce layout fait foi côté serveur.
 */
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
