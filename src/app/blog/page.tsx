import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ArrowRight, Clock, NotebookPen } from "lucide-react";
import { BENTO_GRID, Tile, TileLabel } from "@/components/landing/bento";
import { formatDate } from "@/lib/utils";
import { readingTime } from "@/lib/reading-time";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

const PAGE_SIZE = 6;
const D = 0.04;

const slugOf = (post: (typeof allPosts)[number]) => post._meta.path.replace(/\.mdx$/, "");

function PostMeta({ post }: { post: (typeof allPosts)[number] }) {
  return (
    <span className="flex items-center gap-2 text-xs text-muted-foreground">
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span className="flex items-center gap-1">
        <Clock className="size-3" aria-hidden />
        {readingTime(post.content)} min read
      </span>
    </span>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const sortedPosts = [...allPosts].sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1,
  );
  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: posts, pagination } = paginate(sortedPosts, { page: currentPage, pageSize: PAGE_SIZE });
  const [featured, ...rest] = posts;
  const showFeatured = pagination.page === 1 && featured;

  return (
    <main id="blog" className="mx-auto flex max-w-6xl flex-col gap-3">
      <div className={BENTO_GRID}>
        <Tile delay={D} className="sm:col-span-2 lg:col-span-3">
          <div className="flex h-full flex-col justify-between gap-4">
            <TileLabel>Writing</TileLabel>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Notes from building production software — architecture, realtime systems, offline-first apps and migrations.
              </p>
            </div>
          </div>
        </Tile>
        <Tile delay={D * 2}>
          <div className="flex h-full flex-col justify-between gap-4">
            <NotebookPen className="size-5 text-muted-foreground" aria-hidden />
            <p className="text-5xl font-bold tracking-tighter">
              {sortedPosts.length}
              <span className="text-lg font-medium text-muted-foreground"> posts</span>
            </p>
          </div>
        </Tile>
      </div>

      {posts.length === 0 ? (
        <Tile delay={D * 3}>
          <p className="py-8 text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
        </Tile>
      ) : (
        <div className={BENTO_GRID}>
          {showFeatured && (
            <Tile delay={D * 3} className="sm:col-span-2 lg:row-span-2">
              <Link href={`/blog/${slugOf(featured)}`} className="group flex h-full flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <TileLabel>Latest post</TileLabel>
                  <h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{featured.title}</h2>
                  <p className="text-muted-foreground">{featured.summary}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <PostMeta post={featured} />
                  <span className="flex items-center gap-1 text-sm font-medium">
                    Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Tile>
          )}
          {(showFeatured ? rest : posts).map((post, i, list) => {
            // Posts beside the featured tile fill two slots; any odd one out spans the full row.
            const flowing = showFeatured ? list.length - 2 : list.length;
            const isLoneLast = i === list.length - 1 && flowing > 0 && flowing % 2 === 1;
            return (
            <Tile key={slugOf(post)} delay={D * (4 + i)} className={isLoneLast ? "sm:col-span-2 lg:col-span-4" : "sm:col-span-2"}>
              <Link href={`/blog/${slugOf(post)}`} className="group flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight">{post.title}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <PostMeta post={post} />
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                </div>
              </Link>
            </Tile>
            );
          })}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <Tile delay={D * 10}>
          <nav aria-label="Blog pages" className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <div className="flex gap-2">
              {pagination.hasPreviousPage ? (
                <Link href={`/blog?page=${pagination.page - 1}`} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">
                  Previous
                </Link>
              ) : (
                <span className="cursor-not-allowed rounded-lg border border-border px-3 py-1.5 text-sm opacity-50">Previous</span>
              )}
              {pagination.hasNextPage ? (
                <Link href={`/blog?page=${pagination.page + 1}`} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">
                  Next
                </Link>
              ) : (
                <span className="cursor-not-allowed rounded-lg border border-border px-3 py-1.5 text-sm opacity-50">Next</span>
              )}
            </div>
          </nav>
        </Tile>
      )}
    </main>
  );
}
