import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: DATA.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${DATA.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...DATA.projects.map((project) => ({
      url: `${DATA.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...allPosts.map((post) => ({
      url: `${DATA.url}/blog/${post._meta.path.replace(/\.mdx$/, "")}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
