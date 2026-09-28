/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";

export default function LinkedInSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">LinkedIn</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recent Posts</h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            What I&apos;ve been building and learning lately.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {DATA.linkedinPosts.map((post) => (
          <article key={post.url} className="flex flex-col gap-3 rounded-xl border border-border p-4">
            <header className="flex items-center gap-3">
              <img
                src={DATA.avatarUrl}
                alt={DATA.name}
                className="size-10 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">{DATA.name}</p>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
              <Icons.linkedin className="size-5 shrink-0 text-[#0A66C2]" aria-hidden />
            </header>
            <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert line-clamp-6 prose-p:my-0 prose-p:mb-2 prose-strong:text-foreground">
              <Markdown>{post.text}</Markdown>
            </div>
            {"image" in post && (
              <img
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
                loading="lazy"
                className="h-auto w-full rounded-lg border border-border"
              />
            )}
            <p className="text-xs text-[#0A66C2]">
              {post.tags.map((tag) => `#${tag}`).join(" ")}
            </p>
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              View on LinkedIn
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
