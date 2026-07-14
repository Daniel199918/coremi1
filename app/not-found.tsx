import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold">Page introuvable</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/">
        <Button variant="secondary">Retour à l&apos;accueil</Button>
      </Link>
    </section>
  );
}
