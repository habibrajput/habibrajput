"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const LANDING_SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "linkedin", label: "Posts" },
  { id: "gallery", label: "Life" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Sticky bar listing every landing-page section, so the whole structure is
 * visible on first load; highlights the section currently in view.
 */
export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = LANDING_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      return el?.closest("section") ?? el;
    }).filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (!hit) return;
        const match = LANDING_SECTIONS.find(
          ({ id }) => hit.target.id === id || hit.target.querySelector(`#${id}`),
        );
        if (match) setActive(match.id);
      },
      // A section counts as "current" while it crosses the middle of the screen.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="sticky top-3 z-30">
      <ul className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl border border-border bg-card/85 p-1 shadow-sm backdrop-blur-xl [scrollbar-width:none]">
        {LANDING_SECTIONS.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "block rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
