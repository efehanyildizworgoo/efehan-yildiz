import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [page] = await db
    .select()
    .from(pages)
    .where(eq(pages.id, Number(id)))
    .limit(1);

  if (!page) return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
  return NextResponse.json({ page });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const [page] = await db
    .update(pages)
    .set({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.seoTitle !== undefined && { seoTitle: body.seoTitle }),
      ...(body.seoDesc !== undefined && { seoDesc: body.seoDesc }),
      ...(body.blocks !== undefined && { blocks: body.blocks }),
      ...(body.status !== undefined && { status: body.status }),
      updatedAt: new Date(),
    })
    .where(eq(pages.id, Number(id)))
    .returning();

  if (!page) return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
  return NextResponse.json({ page });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [deleted] = await db
    .delete(pages)
    .where(eq(pages.id, Number(id)))
    .returning();

  if (!deleted) return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
  return NextResponse.json({ success: true });
}
