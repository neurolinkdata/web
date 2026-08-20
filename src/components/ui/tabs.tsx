"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex gap-2", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "rounded-md px-4 py-2 text-sm font-bold transition-colors border border-border text-text-secondary",
        "data-[state=active]:bg-brand-red data-[state=active]:text-white data-[state=active]:border-transparent",
        className
      )}
      {...props}
    />
  );
}

export const TabsContent = TabsPrimitive.Content;
