import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { unlink } from "fs/promises";
import path from "path";
import { uploadDir,safeUploadName } from "@/lib/uploads";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [item] = await db.select().from(media).where(eq(media.id, Number(id))).limit(1);
  if (!item) return NextResponse.json({ error: "Medya bulunamadı" }, { status: 404 });

  // Delete file from disk
  try {
    const name=item.url.startsWith("/uploads/")?item.url.slice(9):"";
    if(safeUploadName(name))await unlink(path.join(uploadDir,name));
  } catch {
    // File may not exist, continue
  }

  await db.delete(media).where(eq(media.id, Number(id)));
  return NextResponse.json({ success: true });
}
