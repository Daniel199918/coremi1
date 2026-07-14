import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/**
 * FAQ accessible en HTML natif (<details>/<summary>) : fonctionne
 * sans JavaScript, navigable au clavier, zéro dépendance.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink-950/10 border-y border-ink-950/10">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-xl text-ink-950 transition-colors hover:text-ink-600">
            {item.question}
            <Plus
              className="h-5 w-5 shrink-0 text-accent-600 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-3xl pb-7 leading-relaxed text-ink-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
