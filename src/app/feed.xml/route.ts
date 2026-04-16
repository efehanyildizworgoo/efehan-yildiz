import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

const SITE_URL = "https://www.efehanyildiz.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.createdAt))
    .limit(50);

  const items = allPosts
    .map((post) => {
      const pubDate = new Date(post.createdAt).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || "")}</description>
      <category>${escapeXml(post.category || "Genel")}</category>
      <pubDate>${pubDate}</pubDate>
      <author>info@efehanyildiz.com (Efehan Yıldız)</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Efehan Yıldız - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>SEO, dijital pazarlama ve web geliştirme hakkında yazılar.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
