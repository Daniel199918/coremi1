import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, className, ...props }: InputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900",
          "placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-zinc-300",
          className
        )}
        {...props}
      />
    </div>
  );
}
