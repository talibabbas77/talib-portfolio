import { cn } from "@/lib/utils";

export function EditorialKicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] text-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function EditorialHairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} aria-hidden />;
}

export function EditorialByline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium tracking-wide text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
