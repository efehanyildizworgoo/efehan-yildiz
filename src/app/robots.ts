import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://www.efehanyildiz.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/llms.txt", "/llms-full.txt", "/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/llms.txt", "/llms-full.txt", "/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Anthropic-AI",
        allow: ["/llms.txt", "/llms-full.txt", "/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/llms.txt", "/llms-full.txt", "/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/llms.txt", "/llms-full.txt", "/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
