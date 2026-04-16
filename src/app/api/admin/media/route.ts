import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(media).orderBy(desc(media.createdAt));
  return NextResponse.json({ media: list });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Dosya gerekli" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const ext = path.extname(file.name);
  const baseName = path.basename(file.name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
  const uniqueName = `${baseName}-${Date.now()}${ext}`;

  // Save to public/uploads
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, uniqueName), buffer);

  const url = `/uploads/${uniqueName}`;

  const [item] = await db
    .insert(media)
    .values({
      filename: file.name,
      url,
      size: file.size,
      mimeType: file.type,
    })
    .returning();

  return NextResponse.json({ media: item }, { status: 201 });
}
