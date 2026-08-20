import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-text-primary outline-none",
        "focus-visible:border-brand-cyan",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
