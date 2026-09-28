import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { ArrowUpRight, CheckCircle2, ChevronLeft } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { ImageSlider } from "@/components/image-slider";
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

  const index = DATA.projects.indexOf(project);
  const next = DATA.projects[(index + 1) % DATA.projects.length];

  return (
    <main className="flex flex-col gap-10">
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

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">My impact</h2>
          <ul className="flex flex-col gap-3">
            {project.impact.map((point) => (
              <li key={point} className="flex gap-3 rounded-xl border border-border p-4 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </BlurFade>

      {next && next.slug !== project.slug && (
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
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
