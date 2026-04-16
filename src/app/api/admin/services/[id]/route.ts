import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [service] = await db.select().from(services).where(eq(services.id, Number(id))).limit(1);
  if (!service) return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });
  return NextResponse.json({ service });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const [service] = await db
    .update(services)
    .set({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.blocks !== undefined && { blocks: body.blocks }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      updatedAt: new Date(),
    })
    .where(eq(services.id, Number(id)))
    .returning();

  if (!service) return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });
  return NextResponse.json({ service });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [deleted] = await db.delete(services).where(eq(services.id, Number(id))).returning();
  if (!deleted) return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });
  return NextResponse.json({ success: true });
}
