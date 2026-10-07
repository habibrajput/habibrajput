/* eslint-disable @next/next/no-img-element */
import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BENTO_GRID, SectionHeading, Tile, TileLabel } from "@/components/landing/bento";
import { readingTime } from "@/lib/reading-time";

const D = 0.04;

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  if (!post) {
    return undefined;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: `${DATA.url}${image}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [`${DATA.url}${image}`],
      }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const getSlug = (post: (typeof sortedPosts)[0]) =>
    post._meta.path.replace(/\.mdx$/, "");

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
  }).replace(/</g, "\\u003c");

  const minutes = readingTime(post.content);
  // Suggest posts that aren't already linked as the newer/older post.
  const linked = new Set([slug, previousPost && getSlug(previousPost), nextPost && getSlug(nextPost)]);
  const more = sortedPosts.filter((p) => !linked.has(getSlug(p))).slice(0, 2);

  return (
    <main id="blog" className="mx-auto flex max-w-6xl flex-col gap-3">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdContent }}
      />
      <Link
        href="/blog"
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        All posts
      </Link>

      <header className={BENTO_GRID}>
        <Tile delay={D} className="sm:col-span-2 lg:col-span-3 lg:row-span-2">
          <div className="flex h-full flex-col justify-between gap-6">
            <TileLabel>Blog post</TileLabel>
            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
              <p className="max-w-3xl text-lg text-muted-foreground">{post.summary}</p>
            </div>
          </div>
        </Tile>
        <Tile delay={D * 2}>
          <div className="flex h-full flex-col justify-between gap-3">
            <TileLabel>Published</TileLabel>
            <time dateTime={post.publishedAt} className="font-semibold">{formatDate(post.publishedAt)}</time>
          </div>
        </Tile>
        <Tile delay={D * 3}>
          <div className="flex h-full flex-col justify-between gap-3">
            <TileLabel>Reading time</TileLabel>
            <p className="font-semibold">{minutes} min read</p>
          </div>
        </Tile>
      </header>

      <Tile delay={D * 4}>
        <div className="flex flex-col gap-8 py-4 lg:flex-row lg:gap-12">
          <aside className="flex shrink-0 items-center gap-3 lg:w-48 lg:flex-col lg:items-start lg:self-start lg:sticky lg:top-12">
            <img src={DATA.avatarUrl} alt={DATA.name} className="size-12 rounded-xl object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{DATA.name}</span>
              <span className="text-xs text-muted-foreground">Senior Software Engineer</span>
            </div>
          </aside>
          <article className="prose min-w-0 max-w-3xl flex-1 text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </article>
        </div>
      </Tile>

      {(previousPost || nextPost) && (
        <nav aria-label="Previous and next posts" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {previousPost ? (
            <Tile delay={D * 5}>
              <Link href={`/blog/${getSlug(previousPost)}`} className="group flex h-full flex-col gap-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronLeft className="size-3" aria-hidden /> Newer post
                </span>
                <span className="font-semibold leading-snug">{previousPost.title}</span>
              </Link>
            </Tile>
          ) : (
            <div className="hidden sm:block" />
          )}
          {nextPost && (
            <Tile delay={D * 6}>
              <Link href={`/blog/${getSlug(nextPost)}`} className="group flex h-full flex-col items-end gap-1 text-right">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  Older post <ChevronRight className="size-3" aria-hidden />
                </span>
                <span className="font-semibold leading-snug">{nextPost.title}</span>
              </Link>
            </Tile>
          )}
        </nav>
      )}

      {more.length > 0 && (
        <section aria-labelledby="more-posts" className="mt-9">
          <SectionHeading id="more-posts" eyebrow="Keep reading" title="More posts" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {more.map((p, i) => (
              <Tile key={getSlug(p)} delay={D * (7 + i)}>
                <Link href={`/blog/${getSlug(p)}`} className="group flex h-full flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold leading-snug">{p.title}</span>
                    <span className="line-clamp-2 text-sm text-muted-foreground">{p.summary}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(p.publishedAt)} · {readingTime(p.content)} min read
                  </span>
                </Link>
              </Tile>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
