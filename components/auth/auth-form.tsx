"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorAlert } from "@/components/ui/alert";
import type { FormActionState } from "@/types";

type AuthFormProps = {
  mode: "login" | "register";
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
};

const content = {
  login: {
    title: "Connexion",
    submit: "Se connecter",
    altText: "Pas encore de compte ?",
    altLink: "/register",
    altLabel: "Créer un compte",
  },
  register: {
    title: "Créer un compte",
    submit: "S'inscrire",
    altText: "Déjà un compte ?",
    altLink: "/login",
    altLabel: "Se connecter",
  },
} as const;

/**
 * Formulaire d'authentification partagé (connexion / inscription),
 * branché sur une Server Action via useActionState.
 */
export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, { error: null });
  const { title, submit, altText, altLink, altLabel } = content[mode];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>

      <form action={formAction} className="flex flex-col gap-4">
        {mode === "register" && (
          <Input label="Nom" name="displayName" type="text" autoComplete="name" required />
        )}
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />

        <ErrorAlert>{state.error}</ErrorAlert>

        <Button type="submit" isLoading={isPending}>
          {submit}
        </Button>
      </form>

      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        {altText}{" "}
        <Link href={altLink} className="font-medium text-zinc-900 underline dark:text-zinc-100">
          {altLabel}
        </Link>
      </p>
    </div>
  );
}
