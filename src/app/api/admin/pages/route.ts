import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(pages).orderBy(desc(pages.updatedAt));
  return NextResponse.json({ pages: list });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "Başlık ve slug gerekli" }, { status: 400 });
  }

  const existing = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }

  const [page] = await db
    .insert(pages)
    .values({ title, slug, blocks: [], status: "draft" })
    .returning();

  return NextResponse.json({ page }, { status: 201 });
}
