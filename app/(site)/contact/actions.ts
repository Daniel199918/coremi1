"use server";

import { quoteSchema, type QuoteFormState } from "@/lib/validations/quote";

/**
 * Traite la demande de devis.
 *
 * 🔌 CONNEXION DE L'ENVOI D'E-MAIL (à faire quand COREMI aura choisi
 *    son prestataire — Resend recommandé) :
 *    1. `npm install resend`
 *    2. Ajouter RESEND_API_KEY dans .env.local et sur Vercel
 *       (jamais dans le code — voir .env.example)
 *    3. Décommenter le bloc "Envoi Resend" ci-dessous.
 *
 * 📎 Les photos jointes côté client ne sont pas encore transférées :
 *    à brancher en même temps que l'envoi d'e-mail (pièces jointes
 *    Resend ou upload Supabase Storage).
 */
export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  // Anti-spam 1 : honeypot — un humain ne remplit jamais ce champ caché.
  if (formData.get("website")) {
    // On simule un succès pour ne pas donner d'indice au robot.
    return { status: "success", message: "Merci, votre demande a bien été envoyée.", fieldErrors: {} };
  }

  const parsed = quoteSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    description: formData.get("description"),
    consent: formData.get("consent") ?? undefined,
    website: (formData.get("website") as string) || "",
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Certains champs doivent être corrigés avant l'envoi.",
      fieldErrors,
    };
  }

  const quote = parsed.data;

  try {
    /* ---- Envoi Resend (à décommenter une fois la clé configurée) ----
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Site COREMI <devis@coremi.be>", // ⚠️ domaine à vérifier dans Resend
      to: ["info@coremi.be"], // ⚠️ à confirmer
      replyTo: quote.email,
      subject: `Demande de devis — ${quote.projectType} à ${quote.city}`,
      text: [
        `Nom : ${quote.firstName} ${quote.lastName}`,
        `Téléphone : ${quote.phone}`,
        `E-mail : ${quote.email}`,
        `Commune : ${quote.city}`,
        `Type de projet : ${quote.projectType}`,
        `Budget estimé : ${quote.budget || "Non précisé"}`,
        `Délai souhaité : ${quote.timeline}`,
        "",
        quote.description,
      ].join("\n"),
    });
    ------------------------------------------------------------------ */

    // Trace serveur temporaire (visible dans les logs Vercel) tant que
    // l'envoi d'e-mail n'est pas branché — aucune donnée sensible loggée.
    console.info(
      `[devis] Nouvelle demande : ${quote.projectType} à ${quote.city} (${quote.email})`
    );

    return {
      status: "success",
      message:
        "Merci ! Votre demande a bien été envoyée. Nous vous recontactons dans les plus brefs délais.",
      fieldErrors: {},
    };
  } catch {
    return {
      status: "error",
      message:
        "Une erreur est survenue lors de l'envoi. Réessayez ou contactez-nous par téléphone.",
      fieldErrors: {},
    };
  }
}
