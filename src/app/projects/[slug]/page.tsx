import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { ArrowUpRight, ChevronLeft, Download, FileText } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { ImageSlider } from "@/components/image-slider";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

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

  return (
    <main className="flex flex-col gap-10">
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
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4" aria-hidden />
          All projects
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance">{project.title}</h1>
          <p className="text-muted-foreground">{project.role}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-[11px] font-medium">
                {tech}
              </Badge>
            ))}
          </div>
          {project.href && (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Visit live site
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          )}
        </header>
      </BlurFade>

      {project.images.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <ImageSlider images={project.images} />
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Overview</h2>
          <div className="prose max-w-full text-pretty leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{project.overview}</Markdown>
          </div>
        </section>
      </BlurFade>

      {caseStudy && (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold">The problem</h2>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.problem.intro}</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {caseStudy.problem.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                    <span className="size-2 shrink-0 rounded-full bg-red-500" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold">Approach</h2>
              <ol className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                {caseStudy.approach.map((step, i) => (
                  <li key={step.title} className="flex flex-col gap-1 rounded-xl border border-border p-3">
                    <span className="text-xs font-semibold tabular-nums text-amber-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold">{step.title}</span>
                    <span className="text-xs text-muted-foreground">{step.detail}</span>
                  </li>
                ))}
              </ol>
            </section>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-bold">How it&apos;s built</h2>
              <p className="text-muted-foreground leading-relaxed">{caseStudy.build.intro}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {caseStudy.build.paths.map((path) => (
                  <div key={path.title} className="flex flex-col gap-2 rounded-xl border border-border p-4">
                    <span className="font-semibold">{path.title}</span>
                    <code className="w-fit rounded-md bg-muted px-2 py-1 text-xs">{path.flow}</code>
                    <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                      {path.points.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {caseStudy.build.stack.map((item) => (
                  <div key={item.name} className="flex flex-col gap-0.5 rounded-lg border border-border p-3">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.role}</span>
                  </div>
                ))}
              </div>
            </section>
          </BlurFade>
        </>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 8}>
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{project.stats ? "Results & impact" : "My impact"}</h2>
          {project.stats && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 rounded-xl border border-border bg-muted/40 p-4">
                  <span className="text-4xl font-bold tracking-tighter">{stat.value}</span>
                  <span className="font-semibold">{stat.label}</span>
                  <span className="text-xs text-muted-foreground">{stat.detail}</span>
                </div>
              ))}
            </div>
          )}
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.impact.map((point, i) => (
              <li
                key={point}
                className="group relative flex gap-3 overflow-hidden rounded-xl border border-border p-4 transition-colors hover:bg-muted/40"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-emerald-400 to-sky-500" aria-hidden />
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold tabular-nums text-background">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                  {point}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </BlurFade>

      {caseStudy && (
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <a
            href={caseStudy.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-muted-foreground" aria-hidden />
              <div className="flex flex-col">
                <span className="font-semibold">Read the full case study</span>
                <span className="text-xs text-muted-foreground">PDF · 7 pages</span>
              </div>
            </div>
            <Download className="size-4 text-muted-foreground" aria-hidden />
          </a>
        </BlurFade>
      )}

      {next && next.slug !== project.slug && (
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-3 rounded-xl border border-border p-4 hover:bg-muted transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">Next project</span>
              <span className="font-semibold">{next.title}</span>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground" aria-hidden />
          </Link>
        </BlurFade>
      )}
    </main>
  );
}
