import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sendMail, newLeadEmailHtml } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "İsim gerekli" }, { status: 400 });
    }

    // Basic honeypot check
    if (body._hp) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const [lead] = await db
      .insert(leads)
      .values({
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        source: "form",
        subject: subject?.trim() || null,
        message: message?.trim() || null,
        pipelineStage: "new",
      })
      .returning();

    // Send email notification (fire-and-forget)
    sendMail({
      subject: `Yeni İletişim: ${name.trim()}${subject ? ` — ${subject.trim()}` : ""}`,
      html: newLeadEmailHtml({
        name: name.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        subject: subject?.trim(),
        message: message?.trim(),
      }),
    }).catch(() => {});

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
