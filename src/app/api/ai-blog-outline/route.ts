import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `Sen 10+ yıl deneyimli profesyonel bir SEO içerik stratejistisin. Kullanıcı bir blog yazısı konusu verecek, sen Google'da 1. sayfaya çıkacak kalitede eksiksiz bir yazı taslağı üreteceksin.

ÜRETECEKLERİN:
1. H1: Sayfanın ana başlığı (maks 60 karakter, ana anahtar kelimeyi içermeli)
2. META_TITLE: Google SERP başlığı (50-60 karakter, tıklamayı tetikleyen, yıl veya rakam içerebilir)
3. META_DESC: Google SERP açıklaması (140-160 karakter, merak uyandıran, CTA içeren)
4. OUTLINE: Yazının tam taslak yapısı — aşağıdaki kurallara uy:

OUTLINE KURALLARI:
- Konuyu tanıtan giriş H2'si ile başla (Nedir, Ne Anlama Gelir gibi)
- Ana konuyu kapsayan 4-6 detaylı H2 ekle, her biri konunun farklı bir boyutunu ele alsın
- Önemli H2'lerin altına detay veren H3'ler ekle (en az 2-3 H2'nin altında H3 olmalı)
- Pratik ve uygulanabilir bir H2 ekle (Nasıl Yapılır, Adım Adım, İpuçları gibi)
- Konuyla doğrudan ilişkili ama farklı açıdan bakan 1-2 ek H2 ekle
- Son H2 olarak "Sık Sorulan Sorular (SSS)" bölümü ekle, altına 3-4 adet H3 soru ekle
- En son H2 olarak "Sonuç" veya "Özet" bölümü ekle
- Toplamda en az 12, en fazla 20 satır olmalı

FORMAT KURALLARI (KESİNLİKLE UYULMALI):
- Her satır yeni satırda
- OUTLINE altındaki HER madde "- " ile başlamalı (tire + boşluk)
- Markdown YASAK (**, ##, backtick vb. kullanma)
- Ekstra açıklama, yorum, not EKLEME
- Sadece aşağıdaki formatı üret, başka hiçbir şey yazma

ÖRNEK:

H1: Diş Eti Ameliyatı: Türleri, Süreci ve İyileşme
META_TITLE: Diş Eti Ameliyatı Nedir? Türleri, Riskleri ve İyileşme (2025)
META_DESC: Diş eti ameliyatı mı olacaksınız? Ameliyat türlerini, sürecini, maliyetini ve iyileşme ipuçlarını uzman rehberimizde keşfedin!
OUTLINE:
- H2: Diş Eti Ameliyatı Nedir?
- H3: Diş Eti Ameliyatı Kimlere Uygulanır?
- H2: Diş Eti Ameliyatı Türleri
- H3: Flap Ameliyatı (Cep Küçültme)
- H3: Diş Eti Grefti
- H3: Kemik Grefti ve Rejenerasyon
- H2: Ameliyat Öncesi Hazırlık Süreci
- H2: Ameliyat Nasıl Yapılır? (Adım Adım)
- H2: Ameliyat Sonrası İyileşme Süreci
- H3: İlk 24 Saat Nelere Dikkat Edilmeli?
- H3: Beslenme ve Ağız Bakımı Önerileri
- H2: Diş Eti Ameliyatı Riskleri ve Komplikasyonlar
- H2: Diş Eti Ameliyatı Fiyatları (2025)
- H2: Sık Sorulan Sorular (SSS)
- H3: Diş eti ameliyatı ağrılı mı?
- H3: Ameliyat ne kadar sürer?
- H3: Sigara kullanımı iyileşmeyi etkiler mi?
- H2: Sonuç

Sadece Türkçe yanıt ver.`;

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string") {
      return new Response("Konu/başlık gerekli.", { status: 400 });
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
            parts: [{ text: `Blog yazısı konusu: "${topic}"\n\nBu konu için H1, Meta Title, Meta Description ve alt başlık taslağı oluştur.` }],
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
    console.error("AI Blog Outline error:", err);
    return new Response("Sunucu hatası.", { status: 500 });
  }
}
