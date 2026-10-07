"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvailabilityLine } from "@/components/availability-line";
import { CONTACT_LINKS } from "@/components/contact-links";
import { LANDING_SECTIONS } from "@/components/landing/section-nav";
import { DATA } from "@/data/resume";

// Once the hero scrolls away, the page becomes a narrow fixed profile panel on the
// left (~20%, 220–300px) and the rest is scrolling content (lg+ screens only).
// Measured against the viewport (vw) so the panel and the content offset always match.
const PANEL_WIDTH = "clamp(220px, 20vw, 300px)";
// The content already sits inside the layout's 24px side padding, so offsetting it by
// the panel width leaves a 24px gap between the panel and the content.
const CONTENT_OFFSET = PANEL_WIDTH;

const LG_QUERY = "(min-width: 1024px)";
const subscribeLg = (onChange: () => void) => {
  const mql = window.matchMedia(LG_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

// One smooth ease-out curve and duration shared by the panel and the content.
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.6;

const panelVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: DURATION, ease: EASE, staggerChildren: 0.06, delayChildren: 0.2 },
  },
  exit: { x: "-100%", opacity: 0, transition: { duration: DURATION * 0.75, ease: EASE } },
};

// Panel blocks fade up one after another once the panel has slid in.
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function SplitLayout({ children }: { children: React.ReactNode }) {
  const [split, setSplit] = useState(false);
  const reduceMotion = useReducedMotion();
  // The panel only shows on lg+ screens, so only offset the content there.
  const isLg = useSyncExternalStore(subscribeLg, () => window.matchMedia(LG_QUERY).matches, () => false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setSplit(!entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {split && (
          <motion.aside
            aria-label="Profile and contact details"
            variants={reduceMotion ? undefined : panelVariants}
            initial={reduceMotion ? { opacity: 0 } : "hidden"}
            animate={reduceMotion ? { opacity: 1 } : "visible"}
            exit={reduceMotion ? { opacity: 0 } : "exit"}
            style={{ width: PANEL_WIDTH, willChange: "transform, opacity" }}
            className="fixed inset-y-0 left-0 z-40 hidden flex-col justify-center gap-5 overflow-y-auto border-r border-border bg-card px-5 py-8 shadow-xl lg:flex"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-4">
              <Avatar className="size-16 rounded-2xl border shadow">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback className="rounded-2xl">{DATA.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold leading-tight tracking-tight">{DATA.name}</p>
                <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
              </div>
              <AvailabilityLine className="text-xs" />
            </motion.div>

            <motion.ul variants={itemVariants} className="flex flex-col gap-0.5">
              {CONTACT_LINKS.map(({ label, href, icon: Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.a
              variants={itemVariants}
              href={DATA.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <FileText className="size-4" aria-hidden /> View CV
            </motion.a>

            <motion.nav
              variants={itemVariants}
              aria-label="Jump to section"
              className="flex flex-wrap gap-1.5 border-t border-border pt-5"
            >
              {LANDING_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content slides right to make room for the panel (lg+ only), on the same curve as the panel. */}
      <div
        style={{
          paddingLeft: split && isLg ? CONTENT_OFFSET : 0,
          transition: reduceMotion ? "none" : `padding ${DURATION}s cubic-bezier(${EASE.join(",")})`,
        }}
      >
        {children}
      </div>
    </>
  );
}
