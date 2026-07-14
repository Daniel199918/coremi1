import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        Bienvenue sur Coremi
      </h1>
      <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Une base solide : Next.js 15, TypeScript, Supabase et déploiement continu sur Vercel.
      </p>
      <div className="flex gap-3">
        <Link href="/register">
          <Button>Commencer</Button>
        </Link>
        <Link href="/login">
          <Button variant="secondary">Connexion</Button>
        </Link>
      </div>
    </section>
  );
}
