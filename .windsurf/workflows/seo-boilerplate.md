---
description: Next.js projesine eksiksiz SEO altyapısı kur (metadata, JSON-LD, sitemap, robots, manifest, alt sayfa layout'ları)
---

# Next.js SEO Boilerplate

Bu workflow, bir Next.js (App Router) projesine production-ready SEO altyapısı kurar.
Kullanıcıdan alınması gereken değişkenler `{{PLACEHOLDER}}` formatında belirtilmiştir.

---

## 1. Root Layout — `src/app/layout.tsx`

Root layout'a şunları ekle:

### 1a. Metadata export

```tsx
import type { Metadata } from "next";

const SITE_URL = "{{SITE_URL}}"; // ör: "https://www.example.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "{{DEFAULT_TITLE}}", // ör: "Dijital Pazarlama Uzmanı - İsim Soyisim"
    template: "%s | {{BRAND_NAME}}",
  },
  description: "{{SITE_DESCRIPTION}}",
  keywords: [
    // Sektöre özel 10-20 anahtar kelime
  ],
  authors: [{ name: "{{AUTHOR_NAME}}", url: SITE_URL }],
  creator: "{{BRAND_NAME}}",
  publisher: "{{BRAND_NAME}}",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "{{BRAND_NAME}}",
    title: "{{DEFAULT_TITLE}}",
    description: "{{OG_DESCRIPTION}}",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "{{OG_IMAGE_ALT}}",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "{{DEFAULT_TITLE}}",
    description: "{{TWITTER_DESCRIPTION}}",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "{{GSC_VERIFICATION_CODE}}",
  },
  category: "{{CATEGORY}}", // ör: "technology"
};
```

### 1b. JSON-LD Structured Data (Schema.org @graph)

Root layout'un `<head>` tagına ekle. Projeye göre aşağıdakilerden uygun olanları seç:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // --- WebSite ---
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "{{BRAND_NAME}}",
      description: "{{SITE_DESCRIPTION}}",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "tr-TR",
      // Opsiyonel: site içi arama varsa
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/arama?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    // --- Person (kişisel site ise) ---
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "{{PERSON_NAME}}",
      url: SITE_URL,
      jobTitle: "{{JOB_TITLE}}",
      description: "{{PERSON_DESCRIPTION}}",
      sameAs: [
        "{{LINKEDIN_URL}}",
        "{{YOUTUBE_URL}}",
        "{{INSTAGRAM_URL}}",
        // ...diğer sosyal medya
      ],
      knowsAbout: [
        // Uzmanlık alanları
      ],
    },
    // --- Organization (şirket/marka sitesi ise) ---
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "{{BRAND_NAME}}",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      // Person varsa:
      founder: { "@id": `${SITE_URL}/#person` },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "{{PHONE}}",
        contactType: "customer service",
        availableLanguage: "Turkish",
      },
    },
  ],
};
```

`<html>` içindeki `<head>`'e ekle:

```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
</head>
```

### 1c. HTML lang attribute

```tsx
<html lang="tr">
```

---

## 2. Sitemap — `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "{{SITE_URL}}";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    // Her statik sayfa için bir entry:
    // { url: `${siteUrl}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // { url: `${siteUrl}/hizmetler`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // { url: `${siteUrl}/iletisim`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  // Dinamik sayfalar varsa (blog, ürünler vs.) buraya ekle:
  // const dynamicPages = posts.map(post => ({
  //   url: `${siteUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));

  return [...staticPages];
}
```

---

## 3. Robots — `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "{{SITE_URL}}";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // AI botlarına özel izin (opsiyonel):
      { userAgent: "GPTBot", allow: ["/llms.txt", "/llms-full.txt", "/"] },
      { userAgent: "ChatGPT-User", allow: ["/llms.txt", "/llms-full.txt", "/"] },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Anthropic-AI", allow: ["/llms.txt", "/llms-full.txt", "/"] },
      { userAgent: "ClaudeBot", allow: ["/llms.txt", "/llms-full.txt", "/"] },
      { userAgent: "PerplexityBot", allow: ["/llms.txt", "/llms-full.txt", "/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

---

## 4. Web App Manifest — `src/app/manifest.ts`

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "{{FULL_APP_NAME}}",
    short_name: "{{SHORT_NAME}}",
    description: "{{APP_DESCRIPTION}}",
    start_url: "/",
    display: "standalone",
    background_color: "{{BG_COLOR}}", // ör: "#0a0a0a"
    theme_color: "{{THEME_COLOR}}",   // ör: "#6d28d9"
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

---

## 5. Alt Sayfa Layout'ları — Sayfa bazlı metadata

Her statik alt sayfa için `src/app/<sayfa>/layout.tsx` oluştur:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "{{PAGE_TITLE}}",
  description: "{{PAGE_DESCRIPTION}}",
  alternates: {
    canonical: "{{SITE_URL}}/{{SLUG}}",
  },
  openGraph: {
    title: "{{OG_PAGE_TITLE}}",
    description: "{{OG_PAGE_DESCRIPTION}}",
    url: "{{SITE_URL}}/{{SLUG}}",
  },
};

export default function {{PageName}}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

---

## 6. 404 Sayfası — `src/app/not-found.tsx`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı.",
  robots: { index: false, follow: true },
};
```

---

## 7. Dinamik Sayfa SEO (Blog / Ürün / Detay)

`generateMetadata` kullanarak dinamik metadata üret:

```tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItemBySlug(slug); // veri kaynağından çek
  if (!item) return { title: "Bulunamadı" };

  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `{{SITE_URL}}/blog/${slug}` },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      url: `{{SITE_URL}}/blog/${slug}`,
      type: "article",
      images: item.thumbnail ? [{ url: item.thumbnail }] : [],
    },
  };
}
```

### Dinamik JSON-LD (Article / BlogPosting)

Sayfa component'inde:

```tsx
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: item.title,
  description: item.excerpt,
  url: `{{SITE_URL}}/blog/${slug}`,
  datePublished: item.publishedAt,
  dateModified: item.updatedAt,
  author: { "@type": "Person", name: "{{AUTHOR_NAME}}" },
  publisher: { "@id": `{{SITE_URL}}/#organization` },
  image: item.thumbnail,
};

// JSX'e ekle:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
```

---

## 8. Hizmet Detay Sayfası — FAQPage Schema

Hizmet/detay sayfalarında FAQ varsa:

```tsx
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};
```

---

## 9. Gerekli Static Dosyalar — `public/`

Aşağıdaki dosyaların `public/` klasöründe bulunduğundan emin ol:

- **`og-image.jpg`** — 1200×630px, site paylaşım görseli
- **`icon-192.png`** — 192×192px, PWA icon
- **`icon-512.png`** — 512×512px, PWA icon
- **`logo.png`** — Schema.org logo
- **`src/app/icon.png`** — favicon (Next.js otomatik /favicon.ico üretir)

---

## 10. Checklist (deploy öncesi)

- [ ] `{{SITE_URL}}` tüm dosyalarda tutarlı (www'lu/www'suz karar ver)
- [ ] `og-image.jpg` mevcut ve 1200×630
- [ ] Google Search Console verification kodu girildi
- [ ] Sitemap'te tüm public sayfalar var
- [ ] Robots.txt'te admin/api disallow edildi
- [ ] Her alt sayfanın canonical URL'i doğru
- [ ] JSON-LD Google Rich Results Test'ten geçiyor
- [ ] 404 sayfası `noindex` ama `follow: true`
- [ ] `<html lang="tr">` set edildi
- [ ] Twitter card ve OG tag'leri doğru (https://cards-dev.twitter.com/validator)
