import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pushSubscriptions, pushNotifications } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { count, desc } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [subCount] = await db.select({ count: count() }).from(pushSubscriptions);
  const history = await db
    .select()
    .from(pushNotifications)
    .orderBy(desc(pushNotifications.createdAt))
    .limit(20);

  return NextResponse.json({
    subscriberCount: subCount.count,
    history,
  });
}
