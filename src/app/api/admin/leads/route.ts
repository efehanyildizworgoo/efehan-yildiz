import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { desc } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(leads).orderBy(desc(leads.createdAt));
  return NextResponse.json({ leads: list });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name) {
    return NextResponse.json({ error: "İsim gerekli" }, { status: 400 });
  }

  const [lead] = await db
    .insert(leads)
    .values({
      name,
      email: email || null,
      phone: phone || null,
      source: body.source || "manual",
      subject: subject || null,
      message: message || null,
      pipelineStage: body.pipelineStage || "new",
    })
    .returning();

  return NextResponse.json({ success: true, lead }, { status: 201 });
}
