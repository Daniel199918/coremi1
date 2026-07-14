import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Conteneur de mise en page standard du site. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</Tag>;
}
