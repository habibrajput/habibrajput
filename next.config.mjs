import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    const cacheImmutable = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];
    const staticSources = [
      "/:path*.svg",
      "/:path*.png",
      "/:path*.jpg",
      "/:path*.jpeg",
      "/:path*.webp",
      "/:path*.avif",
      "/:path*.ico",
      "/:path*.woff",
      "/:path*.woff2",
    ];
    return [
      {
        source: "/_next/static/:path*",
        headers: cacheImmutable,
      },
      ...staticSources.map((source) => ({
        source,
        headers: cacheImmutable,
      })),
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
