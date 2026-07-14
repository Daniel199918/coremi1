import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils";

type ButtonLinkVariant = "accent" | "ink" | "outline" | "light";
type ButtonLinkSize = "md" | "lg";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  accent: "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800",
  ink: "bg-ink-950 text-bone hover:bg-ink-800",
  outline: "border border-ink-900/25 text-ink-950 hover:border-ink-900 hover:bg-ink-950 hover:text-bone",
  light: "border border-bone/30 text-bone hover:bg-bone hover:text-ink-950",
};

const sizeClasses: Record<ButtonLinkSize, string> = {
  md: "px-6 py-3 text-[0.8rem]",
  lg: "px-8 py-4 text-sm",
};

/** Lien stylé en bouton, esthétique éditoriale (angles vifs, capitales espacées). */
export function ButtonLink({
  variant = "accent",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-3 font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
