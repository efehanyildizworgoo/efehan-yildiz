import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [original] = await db.select().from(posts).where(eq(posts.id, Number(id))).limit(1);
  if (!original) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });

  const newSlug = `${original.slug}-kopya-${Date.now().toString(36)}`;

  const [clone] = await db
    .insert(posts)
    .values({
      title: `${original.title} (Kopya)`,
      slug: newSlug,
      content: original.content,
      excerpt: original.excerpt,
      category: original.category,
      status: "draft",
      featured: false,
      featuredImage: original.featuredImage,
      seoTitle: original.seoTitle,
      seoDesc: original.seoDesc,
      readTime: original.readTime,
      author: original.author,
    })
    .returning();

  return NextResponse.json({ post: clone }, { status: 201 });
}
