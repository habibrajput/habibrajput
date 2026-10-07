"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CONTACT_LINKS } from "@/components/contact-links";
import { AvailabilityLine } from "@/components/availability-line";
import { DATA } from "@/data/resume";

// Shows a compact profile card on the left once the hero (photo + contacts) scrolls out of view.
export default function ProfileSidebar() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-label="Profile and contact details"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -48, filter: reduceMotion ? "none" : "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: reduceMotion ? 0 : -48, filter: reduceMotion ? "none" : "blur(6px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          style={{ left: "max(1.5rem, calc(50% - 21rem - 17rem))" }}
          className="fixed top-1/2 z-20 hidden w-60 -translate-y-1/2 flex-col gap-4 rounded-2xl border border-border bg-card/90 p-5 shadow-lg backdrop-blur-xl xl:flex"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-20 border shadow ring-4 ring-muted">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="font-semibold leading-tight">{DATA.name}</p>
              <p className="text-xs text-muted-foreground">Senior Software Engineer</p>
            </div>
            <AvailabilityLine className="text-xs" />
          </div>
          <ul className="flex flex-col gap-1.5">
            {CONTACT_LINKS.map(({ label, href, icon: Icon, external }, i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
              >
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
