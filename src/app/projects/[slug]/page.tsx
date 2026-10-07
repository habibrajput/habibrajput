/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { ArrowRight, ArrowUpRight, ChevronLeft, Download, FileText } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { BENTO_GRID, SectionHeading, Tile, TileLabel } from "@/components/landing/bento";
import { ImageSlider } from "@/components/image-slider";
import { JsonLd } from "@/components/json-ld";
import { DATA } from "@/data/resume";

const D = 0.04;

const findProject = (slug: string) => DATA.projects.find((p) => p.slug === slug);

export function generateStaticParams() {
  return DATA.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return undefined;

  const image = project.images[0] && `${DATA.url}${project.images[0].src}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${DATA.url}/projects/${slug}`,
      ...(image && { images: [{ url: image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;
  const index = DATA.projects.indexOf(project);
  const next = DATA.projects[(index + 1) % DATA.projects.length];
  const [name, tagline] = project.title.split(" – ");
  let section = 0;
  const eyebrow = (label: string) => `${String(++section).padStart(2, "0")} — ${label}`;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${DATA.url}/projects/${project.slug}`,
          image: project.images.map((image) => `${DATA.url}${image.src}`),
          keywords: project.technologies.join(", "),
          creator: { "@type": "Person", name: DATA.name, url: DATA.url, jobTitle: project.role },
          ...(project.href && { sameAs: project.href }),
        }}
      />

      {/* ───────────── Hero ───────────── */}
      <section aria-label="Project summary" className="flex flex-col gap-3">
        <BlurFade delay={D}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" aria-hidden />
            All projects
          </Link>
        </BlurFade>
        <div className={`${BENTO_GRID} lg:auto-rows-[minmax(120px,auto)]`}>
          <Tile delay={D * 2} className="sm:col-span-2 lg:row-span-2">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <TileLabel>Project</TileLabel>
                <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{name}</h1>
                {tagline && <p className="text-lg text-muted-foreground">{tagline}</p>}
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
              {(project.href || caseStudy) && (
                <div className="flex flex-wrap gap-2">
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Visit live site <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  )}
                  {caseStudy && (
                    <a
                      href={caseStudy.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <FileText className="size-4" aria-hidden /> Case study (PDF)
                    </a>
                  )}
                </div>
              )}
            </div>
          </Tile>

          {project.images.length > 0 && (
            <Tile delay={D * 3} className="sm:col-span-2 lg:row-span-3 [&>div]:p-3">
              <ImageSlider images={project.images} />
            </Tile>
          )}

          <Tile delay={D * 4}>
            <div className="flex h-full flex-col justify-between gap-3">
              <TileLabel>My role</TileLabel>
              <p className="text-lg font-semibold leading-tight">{project.role}</p>
            </div>
          </Tile>

          <Tile delay={D * 5}>
            <div className="flex h-full flex-col justify-between gap-3">
              <TileLabel>Stack</TileLabel>
              <p className="text-lg font-semibold leading-tight">
                {project.technologies.length}
                <span className="text-sm font-medium text-muted-foreground"> technologies</span>
              </p>
            </div>
          </Tile>

          <Tile delay={D * 6} className="sm:col-span-2 lg:col-span-4">
            <div className="flex flex-col gap-3">
              <TileLabel>Built with</TileLabel>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </section>

      {/* ───────────── Overview ───────────── */}
      <section aria-labelledby="overview">
        <SectionHeading id="overview" eyebrow={eyebrow("Overview")} title="What it is" />
        <Tile delay={D}>
          <div className="prose max-w-none text-pretty leading-relaxed text-muted-foreground dark:prose-invert prose-p:my-2">
            <Markdown>{project.overview}</Markdown>
          </div>
        </Tile>
      </section>

      {caseStudy && (
        <>
          {/* ───────────── Problem ───────────── */}
          <section aria-labelledby="problem">
            <SectionHeading id="problem" eyebrow={eyebrow("Problem")} title="What was missing" />
            <div className={BENTO_GRID}>
              <Tile delay={D} className="sm:col-span-2">
                <p className="leading-relaxed text-muted-foreground">{caseStudy.problem.intro}</p>
              </Tile>
              <Tile delay={D * 2} className="sm:col-span-2">
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {caseStudy.problem.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm">
                      <span className="size-2 shrink-0 rounded-full bg-red-500" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </Tile>
            </div>
          </section>

          {/* ───────────── Approach ───────────── */}
          <section aria-labelledby="approach">
            <SectionHeading id="approach" eyebrow={eyebrow("Approach")} title="How I approached it" />
            <ol className={BENTO_GRID}>
              {caseStudy.approach.map((step, i) => (
                <li key={step.title}>
                  <Tile delay={D * (1 + i)}>
                    <div className="flex h-full flex-col gap-2">
                      <span className="font-mono text-xs font-semibold text-amber-500">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-lg font-semibold">{step.title}</span>
                      <span className="text-sm text-muted-foreground">{step.detail}</span>
                    </div>
                  </Tile>
                </li>
              ))}
            </ol>
          </section>

          {/* ───────────── Build ───────────── */}
          <section aria-labelledby="build">
            <SectionHeading id="build" eyebrow={eyebrow("Build")} title="How it’s built" />
            <div className={BENTO_GRID}>
              <Tile delay={D} className="sm:col-span-2 lg:col-span-4">
                <p className="leading-relaxed text-muted-foreground">{caseStudy.build.intro}</p>
              </Tile>
              {caseStudy.build.paths.map((path, i) => (
                <Tile key={path.title} delay={D * (2 + i)} className="sm:col-span-2">
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">{path.title}</span>
                    <code className="w-fit rounded-md bg-muted px-2 py-1 text-xs">{path.flow}</code>
                    <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                      {path.points.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </Tile>
              ))}
              {caseStudy.build.stack.map((item, i) => (
                <Tile key={item.name} delay={D * (4 + i)}>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.role}</span>
                  </div>
                </Tile>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ───────────── Impact ───────────── */}
      <section aria-labelledby="impact">
        <SectionHeading
          id="impact"
          eyebrow={eyebrow("Impact")}
          title={project.stats ? "Results & impact" : "My impact"}
        />
        <div className="flex flex-col gap-3">
          {project.stats && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.stats.map((stat, i) => (
                <Tile key={stat.label} delay={D * (1 + i)}>
                  <div className="flex h-full flex-col gap-1">
                    <span className="text-5xl font-bold tracking-tighter">{stat.value}</span>
                    <span className="font-semibold">{stat.label}</span>
                    <span className="text-xs text-muted-foreground">{stat.detail}</span>
                  </div>
                </Tile>
              ))}
            </div>
          )}
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.impact.map((point, i) => (
              <li key={point}>
                <Tile delay={D * (1 + i)}>
                  <div className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold tabular-nums text-background">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{point}</span>
                  </div>
                </Tile>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Case study PDF + next project ───────────── */}
      <div className={BENTO_GRID}>
        {caseStudy && (
          <Tile delay={D} className="sm:col-span-2">
            <a
              href={caseStudy.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full items-center justify-between gap-3"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-muted">
                  <FileText className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold">Read the full case study</span>
                  <span className="text-xs text-muted-foreground">PDF · 7 pages</span>
                </span>
              </span>
              <Download className="size-4 text-muted-foreground" aria-hidden />
            </a>
          </Tile>
        )}
        {next && next.slug !== project.slug && (
          <Tile delay={D * 2} className={caseStudy ? "sm:col-span-2" : "sm:col-span-2 lg:col-span-4"}>
            <Link href={`/projects/${next.slug}`} className="group -m-5 flex h-[calc(100%+2.5rem)] overflow-hidden rounded-2xl">
              <div className="flex flex-1 flex-col justify-between gap-2 p-5">
                <TileLabel>Next project</TileLabel>
                <div>
                  <p className="text-lg font-semibold leading-tight">{next.title.split(" – ")[0]}</p>
                  <p className="text-sm text-muted-foreground">{next.title.split(" – ")[1]}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium">
                  View project <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
              {next.images[0] && (
                <img src={next.images[0].src} alt={next.images[0].alt} className="hidden w-2/5 object-cover object-left-top sm:block" />
              )}
            </Link>
          </Tile>
        )}
      </div>
    </main>
  );
}
