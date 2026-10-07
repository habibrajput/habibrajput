import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

// "Open to work" status shown as a quiet line of text with a shimmer sweeping across it.
export function AvailabilityLine({ className }: { className?: string }) {
  const { availability } = DATA;
  if (!availability.open) return null;

  return (
    <a
      href={`mailto:${DATA.contact.email}?subject=${encodeURIComponent(availability.emailSubject)}`}
      className={cn("inline-flex w-fit items-center gap-2 text-sm font-medium", className)}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
      <span className="animate-shimmer bg-[linear-gradient(110deg,var(--color-emerald-600)_40%,var(--color-emerald-300)_50%,var(--color-emerald-600)_60%)] bg-size-[250%_100%] bg-clip-text text-transparent motion-reduce:animate-none dark:bg-[linear-gradient(110deg,var(--color-emerald-400)_40%,var(--color-emerald-100)_50%,var(--color-emerald-400)_60%)]">
        {availability.label}
      </span>
    </a>
  );
}
