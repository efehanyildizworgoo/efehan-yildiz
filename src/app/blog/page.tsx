import type { Metadata } from "next";
import { db } from "@/lib/db";
import { posts as postsTable } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Efehan Yıldız - SEO & Dijital Pazarlama",
  description: "SEO, dijital pazarlama ve web teknolojileri hakkında güncel rehberler, stratejiler ve pratik ipuçları.",
  openGraph: {
    title: "Blog | Efehan Yıldız",
    description: "SEO, dijital pazarlama ve web teknolojileri hakkında güncel rehberler.",
    url: "https://www.efehanyildiz.com/blog",
  },
};

export default async function BlogPage() {
  const allPosts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.status, "published"))
    .orderBy(desc(postsTable.createdAt));

  const serialized = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category || "",
    author: p.author || "Efehan Yıldız",
    date: p.createdAt.toISOString(),
    readTime: p.readTime || "5 dk",
    featured: p.featured || false,
    featuredImage: p.featuredImage || null,
  }));

  return <BlogPageClient posts={serialized} />;
}
