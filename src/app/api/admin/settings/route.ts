import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(settings);
  const map: Record<string, string> = {};
  for (const s of list) {
    map[s.key] = s.value || "";
  }
  return NextResponse.json({ settings: map });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if(!body||Array.isArray(body)||typeof body!=="object")return NextResponse.json({error:"Geçersiz ayarlar"},{status:400});
  const entries=Object.entries(body);if(entries.length>100||entries.some(([k,v])=>k.length>255||typeof v!=="string"||v.length>200000))return NextResponse.json({error:"Geçersiz ayarlar"},{status:400});
  await db.transaction(async tx=>{for(const [key,value] of entries){await tx.insert(settings).values({key,value:value as string}).onConflictDoUpdate({target:settings.key,set:{value:value as string}})}});

  return NextResponse.json({ success: true });
}
