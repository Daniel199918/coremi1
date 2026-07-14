import { Star } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`Note : ${rating} étoiles sur 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={
            i < rating ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-navy-200"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-7">
      <Stars rating={testimonial.rating} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-900/80">
        « {testimonial.text} »
      </blockquote>
      <figcaption className="mt-5 border-t border-navy-100 pt-4">
        <p className="font-semibold text-navy-950">{testimonial.name}</p>
        <p className="mt-0.5 text-xs text-navy-900/60">
          {testimonial.projectType} · {testimonial.location}
        </p>
      </figcaption>
    </figure>
  );
}
