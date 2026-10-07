/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import { ArrowRight, ArrowUpRight, FileText, Mail, MapPin, Sparkles } from "lucide-react";
import { DATA } from "@/data/resume";
import { AvailabilityLine } from "@/components/availability-line";
import { CONTACT_LINKS } from "@/components/contact-links";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BENTO_GRID, SectionHeading, Tile, TileLabel } from "@/components/landing/bento";
import WorkSection from "@/components/section/work-section";
import GitHubSection from "@/components/section/github-section";
import LinkedInSection from "@/components/section/linkedin-section";
import GallerySection from "@/components/section/gallery-section";

const D = 0.04;
const CORE_STACK = DATA.skills.slice(0, 12);
const CURRENT = DATA.projects.find((p) => p.slug === "tabletab") ?? DATA.projects[0];

// `placement` keeps the hero and footer copies distinct: identical element trees
// get deduplicated during server rendering, which dropped an icon from the hero.
function ContactIcons({ placement }: { placement: "hero" | "contact" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {CONTACT_LINKS.map(({ name, label, href, icon: Icon, external }) => (
        <li key={href}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                aria-label={`${name}: ${label}`}
                data-placement={placement}
                className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {label}
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}

function LogoDot({ src, alt }: { src?: string; alt: string }) {
  return src ? (
    <img src={src} alt={alt} className="size-10 shrink-0 rounded-full border border-border bg-white object-contain p-1" />
  ) : (
    <div className="size-10 shrink-0 rounded-full border border-border bg-muted" />
  );
}

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${DATA.url}/#person`,
              name: DATA.name,
              alternateName: "Habib Rajput",
              jobTitle: "Senior Software Engineer",
              description: DATA.description,
              url: DATA.url,
              image: `${DATA.url}${DATA.avatarUrl}`,
              email: `mailto:${DATA.contact.email}`,
              address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Superior University Lahore" },
              knowsAbout: DATA.skills.map((skill) => skill.name),
              sameAs: [DATA.contact.social.GitHub.url, DATA.contact.social.LinkedIn.url],
            },
            {
              "@type": "WebSite",
              "@id": `${DATA.url}/#website`,
              url: DATA.url,
              name: DATA.name,
              inLanguage: "en",
              publisher: { "@id": `${DATA.url}/#person` },
            },
          ],
        }}
      />

      {/* ───────────── Hero ───────────── */}
      <section id="hero" aria-label="Introduction" className={`${BENTO_GRID} lg:auto-rows-[minmax(120px,auto)]`}>
        <Tile delay={D} className="sm:col-span-2 lg:row-span-2">
          <div className="flex h-full flex-col justify-between gap-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-14 rounded-2xl border shadow">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback className="rounded-2xl">{DATA.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold leading-tight">{DATA.name}</p>
                <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
              </div>
            </div>
            <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              I build multi-tenant SaaS, e-commerce and POS platforms that hold up in production.
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <AvailabilityLine />
              <div className="flex flex-wrap items-center gap-2">
                <ContactIcons placement="hero" />
                <a
                  href={DATA.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <FileText className="size-4" aria-hidden /> View CV
                </a>
              </div>
            </div>
          </div>
        </Tile>

        <Tile delay={D * 2}>
          <div className="flex h-full flex-col justify-between gap-4">
            <TileLabel>Experience</TileLabel>
            <p className="text-5xl font-bold tracking-tighter">
              6+<span className="text-lg font-medium text-muted-foreground"> yrs</span>
            </p>
          </div>
        </Tile>

        <Tile delay={D * 3}>
          <div className="flex h-full flex-col justify-between gap-4">
            <TileLabel>Projects shipped</TileLabel>
            <p className="text-5xl font-bold tracking-tighter">10+</p>
          </div>
        </Tile>

        <Tile delay={D * 4} className="sm:col-span-2">
          <div className="flex h-full flex-col gap-4">
            <TileLabel>Core stack</TileLabel>
            <div className="flex flex-wrap gap-2">
              {CORE_STACK.map((skill) => (
                <span key={skill.name} className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium">
                  <skill.icon className="size-3.5" aria-hidden />
                  {skill.name}
                </span>
              ))}
              <a href="#skills" className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                +{DATA.skills.length - CORE_STACK.length} more
              </a>
            </div>
          </div>
        </Tile>

        <Tile delay={D * 5} className="sm:col-span-2">
          <Link href={`/projects/${CURRENT.slug}`} className="group -m-5 flex h-[calc(100%+2.5rem)] overflow-hidden rounded-2xl">
            <div className="flex flex-1 flex-col justify-between gap-3 p-5">
              <div>
                <TileLabel>Now</TileLabel>
                <p className="mt-2 text-lg font-semibold">{CURRENT.title.split(" – ")[0]}</p>
                <p className="text-sm text-muted-foreground">{CURRENT.title.split(" – ")[1]}</p>
                <p className="mt-1 text-xs text-muted-foreground">{CURRENT.technologies.slice(0, 3).join(" · ")}</p>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium">
                View project <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
            <img src={CURRENT.images[0].src} alt={CURRENT.images[0].alt} className="hidden w-1/2 object-cover object-left-top sm:block" />
          </Link>
        </Tile>

        <Tile delay={D * 6}>
          <a href={DATA.locationLink} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col justify-between gap-4">
            <MapPin className="size-5 text-muted-foreground" aria-hidden />
            <div>
              <p className="font-semibold">Lahore, Pakistan</p>
              <p className="text-sm text-muted-foreground">Worked in Riyadh, KSA</p>
            </div>
          </a>
        </Tile>

        <ContactTile />

        <Tile delay={D * 8} className="sm:col-span-2 lg:col-span-4">
          <div className="flex flex-col gap-4">
            <TileLabel>Companies I&apos;ve built for</TileLabel>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {DATA.work.map((work) => (
                <span key={work.company} className="flex items-center gap-2">
                  <img src={work.logoUrl} alt="" className="size-8 shrink-0 rounded-full border border-border bg-white object-contain p-0.5" />
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-muted-foreground">{work.company}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                      <MapPin className="size-3" aria-hidden />
                      {work.location}
                    </span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Tile>
      </section>

      {/* ───────────── About + achievements ───────────── */}
      <section aria-labelledby="about">
        <SectionHeading id="about" eyebrow="01 — About" title="Who I am" />
        <div className={BENTO_GRID}>
          <Tile delay={D} className="sm:col-span-2 lg:row-span-3">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="prose prose-sm max-w-full text-pretty leading-relaxed text-muted-foreground dark:prose-invert prose-strong:text-foreground">
                <Markdown>{DATA.summary}</Markdown>
              </div>
              <div className="flex flex-wrap gap-2">
                {DATA.domains.map((domain) => (
                  <span key={domain} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </Tile>
          {DATA.achievements.map((achievement, i) => (
            <Tile key={achievement.title} delay={D * (2 + i)}>
              <div className="flex h-full flex-col gap-2">
                <Sparkles className="size-4 text-amber-500" aria-hidden />
                <h3 className="text-sm font-semibold leading-tight">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </Tile>
          ))}
        </div>
      </section>

      {/* ───────────── Experience / education / certifications ───────────── */}
      <section aria-labelledby="work">
        <SectionHeading id="work" eyebrow="02 — Career" title="Experience & education" />
        <div className={BENTO_GRID}>
          <Tile delay={D} className="sm:col-span-2 lg:row-span-2">
            <div className="flex flex-col gap-4">
              <TileLabel>Work experience</TileLabel>
              <WorkSection />
            </div>
          </Tile>
          <Tile delay={D * 2} className="sm:col-span-2">
            <div className="flex flex-col gap-4">
              <TileLabel>Education</TileLabel>
              {DATA.education.map((education) => (
                <div key={education.degree} className="flex items-center gap-3">
                  <LogoDot src={education.logoUrl} alt={education.school} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{education.school}</p>
                    <p className="text-sm text-muted-foreground">{education.degree}</p>
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {education.start} – {education.end}
                  </span>
                </div>
              ))}
            </div>
          </Tile>
          <Tile delay={D * 3} className="sm:col-span-2">
            <div className="flex flex-col gap-4">
              <TileLabel>Certifications</TileLabel>
              {DATA.certifications.map((cert) => {
                const body = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-white p-2">
                      <cert.icon className="size-full text-neutral-700" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1 font-semibold leading-tight">
                        {cert.title}
                        {cert.href && <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />}
                      </p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{cert.date}</span>
                  </>
                );
                return cert.href ? (
                  <a key={cert.title} href={cert.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80">
                    {body}
                  </a>
                ) : (
                  <div key={cert.title} className="flex items-center gap-3">
                    {body}
                  </div>
                );
              })}
            </div>
          </Tile>
        </div>
      </section>

      {/* ───────────── Projects ───────────── */}
      <section aria-labelledby="projects">
        <SectionHeading id="projects" eyebrow="03 — Work" title="Selected projects" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DATA.projects.map((project, i) => (
            <Tile key={project.slug} delay={D * (1 + i)} className={`[&>div]:p-0 ${i === 0 || i === 5 ? "lg:col-span-2" : ""}`}>
              <ProjectCard
                href={`/projects/${project.slug}`}
                title={project.title}
                description={project.description}
                subtitle={project.role}
                tags={project.technologies}
                image={project.images[0]?.src}
                className="border-0 hover:ring-0"
              />
            </Tile>
          ))}
        </div>
      </section>

      {/* ───────────── Skills + GitHub ───────────── */}
      <section aria-labelledby="skills">
        <SectionHeading id="skills" eyebrow="04 — Toolbox" title="Skills & activity" />
        <div className={BENTO_GRID}>
          <Tile delay={D} className="sm:col-span-2 lg:col-span-4">
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill) => (
                <span key={skill.name} className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium">
                  <skill.icon className="size-3.5" aria-hidden />
                  {skill.name}
                </span>
              ))}
            </div>
          </Tile>
          <Tile delay={D * 2} className="sm:col-span-2 lg:col-span-4">
            <GitHubSection />
          </Tile>
        </div>
      </section>

      {/* ───────────── LinkedIn ───────────── */}
      <section aria-labelledby="linkedin">
        <SectionHeading id="linkedin" eyebrow="05 — Writing" title="Recent posts" />
        <LinkedInSection showHeader={false} />
      </section>

      {/* ───────────── Gallery ───────────── */}
      <section aria-labelledby="gallery">
        <SectionHeading id="gallery" eyebrow="06 — Life" title="Where I’ve lived & worked" />
        <Tile delay={D}>
          <GallerySection showHeader={false} />
        </Tile>
      </section>

      {/* ───────────── Contact ───────────── */}
      <section id="contact" aria-label="Contact">
        <Tile delay={D}>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2">
              <AvailabilityLine />
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Let&apos;s build something together.</h2>
              <p className="max-w-xl text-muted-foreground">
                Hiring, or have a project in mind? Email me and I&apos;ll get back to you.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:items-end">
              <a
                href={`mailto:${DATA.contact.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Mail className="size-4" aria-hidden /> {DATA.contact.email}
              </a>
              <div className="flex flex-wrap items-center gap-2">
                <ContactIcons placement="contact" />
                <a
                  href={DATA.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <FileText className="size-4" aria-hidden /> View CV
                </a>
              </div>
            </div>
          </div>
        </Tile>
      </section>
    </main>
  );
}

function ContactTile() {
  return (
    <Tile delay={D * 7} className="[&>div]:border-foreground [&>div]:bg-foreground [&>div]:text-background">
      <a href={`mailto:${DATA.contact.email}`} className="flex h-full flex-col justify-between gap-4">
        <Mail className="size-5" aria-hidden />
        <div>
          <p className="font-semibold">Let&apos;s talk</p>
          <p className="break-all text-sm opacity-70">{DATA.contact.email}</p>
        </div>
      </a>
    </Tile>
  );
}
