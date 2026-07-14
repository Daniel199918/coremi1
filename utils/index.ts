/** Concatène des classes CSS conditionnelles. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Extrait un message lisible depuis une erreur inconnue. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Une erreur inattendue est survenue";
}

/** Formate une date ISO en français. */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(iso));
}
