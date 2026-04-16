import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(posts).orderBy(desc(posts.updatedAt));
  return NextResponse.json({ posts: list });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Başlık ve slug gerekli" }, { status: 400 });
  }

  const existing = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }

  const [post] = await db
    .insert(posts)
    .values({
      title,
      slug,
      content: "",
      excerpt: "",
      category: body.category || null,
      status: "draft",
      featured: false,
      author: "Efehan Yıldız",
    })
    .returning();

  return NextResponse.json({ post }, { status: 201 });
}
