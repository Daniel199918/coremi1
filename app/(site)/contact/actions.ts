"use server";

import { quoteSchema, type QuoteFormState } from "@/lib/validations/quote";
import { siteConfig } from "@/content/site";

/**
 * Traite la demande de devis.
 *
 * ⚠️ ÉTAT ACTUEL : AUCUN ENVOI RÉEL N'EST BRANCHÉ.
 *
 * Tant que `RESEND_API_KEY` n'est pas configurée, la demande n'est
 * transmise à personne. L'action le dit explicitement au visiteur et
 * l'invite à écrire ou à appeler : afficher « Merci, c'est envoyé »
 * alors que rien ne part reviendrait à faire perdre des clients sans
 * que personne ne s'en rende compte.
 *
 * 🔌 POUR ACTIVER L'ENVOI :
 *    1. `npm install resend`
 *    2. Vérifier le domaine d'envoi dans Resend (SPF/DKIM sur coremi.be)
 *    3. Ajouter RESEND_API_KEY dans les variables d'environnement Vercel
 *       (jamais dans le code — voir .env.example)
 *    4. Décommenter le bloc « Envoi Resend » ci-dessous.
 *    À partir de là, le chemin nominal renvoie un vrai succès.
 *
 * 📎 Pièces jointes : le quiz ne transmet pas encore de photos. À
 *    brancher en même temps que l'e-mail (pièces jointes Resend ou
 *    upload Supabase Storage), avec limite de taille et de type.
 */
export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  // Anti-spam : honeypot — un humain ne remplit jamais ce champ caché.
  // On renvoie un succès neutre pour ne pas renseigner le robot.
  if (formData.get("website")) {
    return {
      status: "success",
      message: "Merci, votre demande a bien été enregistrée.",
      fieldErrors: {},
    };
  }

  const parsed = quoteSchema.safeParse({
    projectType: formData.get("projectType"),
    needType: formData.get("needType"),
    material: formData.get("material") ?? "",
    projectSize: formData.get("projectSize"),
    region: formData.get("region"),
    postalCode: formData.get("postalCode") ?? "",
    city: formData.get("city"),
    timeline: formData.get("timeline"),
    description: formData.get("description") ?? "",
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName") ?? "",
    phone: formData.get("phone"),
    email: formData.get("email"),
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
      message: "Quelques réponses doivent être complétées avant l'envoi.",
      fieldErrors,
    };
  }

  const quote = parsed.data;

  const body = [
    `Type de projet : ${quote.projectType}`,
    `Nature du besoin : ${quote.needType}`,
    `Matériau : ${quote.material || "Non précisé"}`,
    `Ampleur : ${quote.projectSize}`,
    `Région : ${quote.region}`,
    `Commune : ${quote.city}${quote.postalCode ? ` (${quote.postalCode})` : ""}`,
    `Délai souhaité : ${quote.timeline}`,
    "",
    `Nom : ${quote.firstName} ${quote.lastName || ""}`.trim(),
    `Téléphone : ${quote.phone}`,
    `E-mail : ${quote.email}`,
    "",
    quote.description || "(aucune précision ajoutée)",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Trace serveur : la demande apparaît au moins dans les logs Vercel.
    console.warn("[devis] Demande reçue mais AUCUN envoi configuré :\n" + body);
    return {
      status: "error",
      message:
        `L'envoi automatique n'est pas encore activé sur ce site : votre demande n'a donc pas été transmise. ` +
        `Écrivez-nous à ${siteConfig.contact.email} ou appelez le ${siteConfig.contact.phone} — nous répondons directement.`,
      fieldErrors: {},
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      /**
       * Tant que coremi.be n'est pas vérifié dans Resend, seul le domaine
       * de test `resend.dev` est autorisé — et uniquement vers l'adresse
       * du titulaire du compte. Une fois le domaine vérifié, définir
       * RESEND_FROM sur « COREMI <devis@coremi.be> ».
       */
      from: process.env.RESEND_FROM ?? "COREMI <onboarding@resend.dev>",
      to: [siteConfig.contact.email],
      // Répondre à l'e-mail suffit à recontacter le client.
      replyTo: quote.email,
      subject: `Demande de devis — ${quote.projectType} à ${quote.city}`,
      text: body,
    });

    if (error) {
      // On ne laisse jamais croire à un envoi réussi qui n'a pas eu lieu.
      console.error("[devis] Échec de l'envoi Resend :", error, "\n" + body);
      return {
        status: "error",
        message: `L'envoi a échoué. Réessayez, ou écrivez-nous directement à ${siteConfig.contact.email}.`,
        fieldErrors: {},
      };
    }

    return {
      status: "success",
      message:
        "Merci ! Votre demande est bien arrivée. Nous revenons vers vous rapidement, en général sous deux jours ouvrables.",
      fieldErrors: {},
    };
  } catch (e) {
    console.error("[devis] Exception à l'envoi :", e, "\n" + body);
    return {
      status: "error",
      message: `L'envoi a échoué. Réessayez, ou écrivez-nous directement à ${siteConfig.contact.email}.`,
      fieldErrors: {},
    };
  }
}
