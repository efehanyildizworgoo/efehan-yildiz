import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `Sen Efehan Yıldız'ın SEO Toolkit platformundaki AI asistanısın. Türkçe yanıt ver.
Uzmanlık alanların: SEO, dijital pazarlama, teknik SEO, içerik stratejisi, anahtar kelime araştırması, backlink stratejisi, WordPress SEO, Google Analytics, Google Search Console.
Kısa, net ve uygulanabilir cevaplar ver. Gerektiğinde adım adım açıkla.
Cevaplarını markdown formatında verme, düz metin olarak yaz. Maddeler için - kullan.

ÖNEMLİ KURAL: Cevabının en sonuna mutlaka ilgili araç sayfalarını ekle. Format kesinlikle şu şekilde olmalı:
[[link:/seo-toolkit/analiz-olcum|Analiz & Ölçüm Araçları]]
Her yanıtın sonunda en az 1, en fazla 3 ilgili sayfa linki MUTLAKA olmalı. Bu formatı asla atla.

Mevcut sayfalar:
- /seo-toolkit/analiz-olcum — Analiz & Ölçüm Araçları (SEO, GA4, GTM, site denetim araçları)
- /seo-toolkit/anahtar-kelime — Anahtar Kelime Araçları (kelime araştırma, SERP analizi, arama hacmi)
- /seo-toolkit/teknik-seo — Teknik SEO Araçları (robots.txt, sitemap, schema, teknik araçlar)
- /seo-toolkit/icerik-meta — İçerik & Meta Araçları (meta başlıklar, SERP önizleme, SEO yazı araçları)
- /seo-toolkit/local-seo — Local SEO & Schema Araçları (GMB, yerel listeler, FAQ/How-to schema)
- /seo-toolkit/backlink — Backlink & Off-Page SEO (backlink analizi, disavow, sosyal sinyaller)
- /seo-toolkit/otomasyon — SEO Otomasyon ve Script'ler (ChatGPT promptları, Python/Sheets araçları)
- /seo-toolkit/wordpress-seo — WordPress SEO Araçları (eklenti karşılaştırma, hız, güvenlik)
- /seo-toolkit/kaynaklar — Kaynaklar & Rehberler (e-kitaplar, checklist'ler, SEO sözlüğü)
- /seo-toolkit/mini-uygulamalar — Mini SEO Uygulamaları (dönüşüm, meta, schema, makale oluşturma)`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response("Mesaj gerekli.", { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return new Response("API anahtarı yapılandırılmamış.", { status: 500 });
    }

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return new Response("AI servisinde hata oluştu.", { status: 502 });
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return new Response("Stream okunamadı.", { status: 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              } catch {
                // skip malformed JSON chunks
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("AI Chat error:", err);
    return new Response("Sunucu hatası.", { status: 500 });
  }
}
