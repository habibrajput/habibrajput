import BlurFade from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

export const BENTO_GRID = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4";

/** A single bento tile with a subtle lift on hover. */
export function Tile({
  className,
  delay = 0,
  compact = false,
  children,
}: {
  className?: string;
  delay?: number;
  /** Tighter padding, used where vertical space is precious (the hero). */
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <BlurFade delay={delay} className={cn("h-full", className)}>
      <div className={cn("h-full rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg", compact ? "p-4" : "p-5")}>
        {children}
      </div>
    </BlurFade>
  );
}

/** Small uppercase label used at the top of a tile. */
export function TileLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</p>;
}

/** Heading that introduces each landing-page section. */
export function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="mb-3 flex scroll-mt-24 items-end justify-between gap-4 px-1">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      </div>
    </div>
  );
}
