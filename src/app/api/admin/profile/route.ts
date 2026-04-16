import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [dbUser] = await db.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.id, user.id)).limit(1);
  if (!dbUser) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

  return NextResponse.json({ user: dbUser });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, currentPassword, newPassword } = body;

  // Update name/email
  if (name || email) {
    const updates: Record<string, string> = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    await db.update(users).set(updates).where(eq(users.id, user.id));
  }

  // Update password
  if (currentPassword && newPassword) {
    // Verify current password
    const bcrypt = require("bcryptjs");
    const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
    if (!dbUser) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

    const valid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
    if (!valid) return NextResponse.json({ error: "Mevcut şifre hatalı" }, { status: 400 });

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Yeni şifre en az 6 karakter olmalı" }, { status: 400 });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await db.update(users).set({ passwordHash: hash }).where(eq(users.id, user.id));
  }

  return NextResponse.json({ success: true });
}
