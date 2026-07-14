import type { ReactNode } from "react";

/** Message d'erreur de formulaire, annoncé aux lecteurs d'écran. */
export function ErrorAlert({ children }: { children: ReactNode }) {
  if (!children) return null;

  return (
    <p
      role="alert"
      className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
    >
      {children}
    </p>
  );
}
