import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pushSubscriptions, pushNotifications } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpush = require("web-push");

const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY || "";
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY || "";
const VAPID_EMAIL = process.env.SMTP_USER || "me@efehanyildiz.com";

if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, VAPID_PUBLIC, VAPID_PRIVATE);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, body, url, icon } = await req.json();
    if (!title || !body) {
      return NextResponse.json({ error: "Başlık ve içerik gerekli" }, { status: 400 });
    }

    const subs = await db.select().from(pushSubscriptions);
    if (subs.length === 0) {
      return NextResponse.json({ error: "Henüz abone yok" }, { status: 400 });
    }

    const payload = JSON.stringify({ title, body, url: url || "/", icon: icon || "/icon-192.png" });
    let sentCount = 0;
    let failCount = 0;

    const results = await Promise.allSettled(
      subs.map((sub) =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        )
      )
    );

    for (let i = 0; i < results.length; i++) {
      if (results[i].status === "fulfilled") {
        sentCount++;
      } else {
        failCount++;
        const err = (results[i] as PromiseRejectedResult).reason;
        // Remove expired/invalid subscriptions (410 Gone or 404)
        if (err?.statusCode === 410 || err?.statusCode === 404) {
          await db
            .delete(pushSubscriptions)
            .where(eq(pushSubscriptions.endpoint, subs[i].endpoint));
        }
      }
    }

    // Log the notification
    await db.insert(pushNotifications).values({
      title,
      body,
      url: url || null,
      icon: icon || null,
      sentCount,
      failCount,
    });

    return NextResponse.json({ success: true, sentCount, failCount });
  } catch (error) {
    console.error("Push send error:", error);
    return NextResponse.json({ error: "Bildirim gönderilirken hata oluştu" }, { status: 500 });
  }
}
