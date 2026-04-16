import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, leadNotes } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [lead] = await db.select().from(leads).where(eq(leads.id, Number(id))).limit(1);
  if (!lead) return NextResponse.json({ error: "Lead bulunamadı" }, { status: 404 });

  const notes = await db.select().from(leadNotes).where(eq(leadNotes.leadId, Number(id))).orderBy(desc(leadNotes.createdAt));

  return NextResponse.json({ lead, notes });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  // Add note
  if (body.noteContent) {
    const [note] = await db
      .insert(leadNotes)
      .values({ leadId: Number(id), content: body.noteContent })
      .returning();
    return NextResponse.json({ note });
  }

  // Update lead
  const [lead] = await db
    .update(leads)
    .set({
      ...(body.pipelineStage !== undefined && { pipelineStage: body.pipelineStage }),
      ...(body.value !== undefined && { value: body.value }),
      ...(body.name !== undefined && { name: body.name }),
      ...(body.email !== undefined && { email: body.email }),
      ...(body.phone !== undefined && { phone: body.phone }),
      updatedAt: new Date(),
    })
    .where(eq(leads.id, Number(id)))
    .returning();

  if (!lead) return NextResponse.json({ error: "Lead bulunamadı" }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [deleted] = await db.delete(leads).where(eq(leads.id, Number(id))).returning();
  if (!deleted) return NextResponse.json({ error: "Lead bulunamadı" }, { status: 404 });
  return NextResponse.json({ success: true });
}
