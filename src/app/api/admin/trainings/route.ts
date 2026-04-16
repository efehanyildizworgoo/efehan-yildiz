import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trainings } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(trainings).orderBy(asc(trainings.sortOrder));
  return NextResponse.json({ trainings: list });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug } = body;
  if (!title || !slug) return NextResponse.json({ error: "Başlık ve slug gerekli" }, { status: 400 });

  const existing = await db.select().from(trainings).where(eq(trainings.slug, slug)).limit(1);
  if (existing.length > 0) return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });

  const [training] = await db
    .insert(trainings)
    .values({
      title,
      slug,
      description: body.description || "",
      price: body.price || null,
      duration: body.duration || null,
      status: "published",
      sortOrder: 0,
    })
    .returning();

  return NextResponse.json({ training }, { status: 201 });
}
