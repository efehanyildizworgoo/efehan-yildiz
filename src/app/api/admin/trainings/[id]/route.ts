import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trainings } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [training] = await db.select().from(trainings).where(eq(trainings.id, Number(id))).limit(1);
  if (!training) return NextResponse.json({ error: "Eğitim bulunamadı" }, { status: 404 });
  return NextResponse.json({ training });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const [training] = await db
    .update(trainings)
    .set({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.duration !== undefined && { duration: body.duration }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      updatedAt: new Date(),
    })
    .where(eq(trainings.id, Number(id)))
    .returning();

  if (!training) return NextResponse.json({ error: "Eğitim bulunamadı" }, { status: 404 });
  return NextResponse.json({ training });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [deleted] = await db.delete(trainings).where(eq(trainings.id, Number(id))).returning();
  if (!deleted) return NextResponse.json({ error: "Eğitim bulunamadı" }, { status: 404 });
  return NextResponse.json({ success: true });
}
