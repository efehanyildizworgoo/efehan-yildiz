import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.id, Number(id))).limit(1);
  if (!post) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const [post] = await db
    .update(posts)
    .set({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.featuredImage !== undefined && { featuredImage: body.featuredImage }),
      ...(body.seoTitle !== undefined && { seoTitle: body.seoTitle }),
      ...(body.seoDesc !== undefined && { seoDesc: body.seoDesc }),
      ...(body.readTime !== undefined && { readTime: body.readTime }),
      updatedAt: new Date(),
    })
    .where(eq(posts.id, Number(id)))
    .returning();

  if (!post) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [deleted] = await db.delete(posts).where(eq(posts.id, Number(id))).returning();
  if (!deleted) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
  return NextResponse.json({ success: true });
}
