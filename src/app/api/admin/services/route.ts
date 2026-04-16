import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(services).orderBy(asc(services.sortOrder));
  return NextResponse.json({ services: list });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug } = body;
  if (!title || !slug) return NextResponse.json({ error: "Başlık ve slug gerekli" }, { status: 400 });

  const existing = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  if (existing.length > 0) return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });

  const [service] = await db
    .insert(services)
    .values({ title, slug, blocks: [], status: "published", sortOrder: 0 })
    .returning();

  return NextResponse.json({ service }, { status: 201 });
}
