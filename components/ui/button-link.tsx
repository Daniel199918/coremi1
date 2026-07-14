import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils";

type ButtonLinkVariant = "accent" | "primary" | "outline" | "light";
type ButtonLinkSize = "md" | "lg";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  accent:
    "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm shadow-accent-600/20",
  primary: "bg-navy-950 text-white hover:bg-navy-800 active:bg-navy-900",
  outline:
    "border border-navy-200 bg-white text-navy-950 hover:border-navy-300 hover:bg-navy-50",
  light:
    "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
};

const sizeClasses: Record<ButtonLinkSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/** Lien stylé en bouton (sémantique <a> correcte, jamais de <button> imbriqué). */
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
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
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
