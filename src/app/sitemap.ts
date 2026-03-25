import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.efehanyildiz.com";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/hakkimda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hizmetler`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/egitimler`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/seo-toolkit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const seoToolkitCategories = [
    "analiz-olcum",
    "anahtar-kelime",
    "teknik-seo",
    "icerik-meta",
    "local-seo",
    "backlink",
    "otomasyon",
    "wordpress-seo",
    "kaynaklar",
    "mini-uygulamalar",
  ];

  const categoryPages: MetadataRoute.Sitemap = seoToolkitCategories.map(
    (cat) => ({
      url: `${siteUrl}/seo-toolkit/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const guidePages: MetadataRoute.Sitemap = [
    // Analiz & Ölçüm
    "analiz-olcum/gsc-kilavuzu",
    "analiz-olcum/ga4-seo-metrikleri",
    // Anahtar Kelime
    "anahtar-kelime/anahtar-kelime-arastirma-rehberi",
    "anahtar-kelime/serp-analizi-rehberi",
    // Teknik SEO
    "teknik-seo/robots-txt-rehberi",
    "teknik-seo/sitemap-xml-rehberi",
    "teknik-seo/core-web-vitals-rehberi",
    "teknik-seo/schema-markup-rehberi",
    // İçerik & Meta
    "icerik-meta/meta-title-desc-rehberi",
    "icerik-meta/icerik-optimizasyonu-rehberi",
    // Local SEO
    "local-seo/google-business-profile-rehberi",
    "local-seo/local-seo-stratejileri",
    // Backlink
    "backlink/backlink-analiz-rehberi",
    "backlink/disavow-rehberi",
    // Otomasyon
    "otomasyon/chatgpt-seo-promptlari",
    "otomasyon/python-seo-otomasyonu",
    // WordPress SEO
    "wordpress-seo/yoast-seo-vs-rank-math",
    "wordpress-seo/wp-head-optimizasyon-rehberi",
    "wordpress-seo/xml-sitemap-custom-yapilandirma",
    "wordpress-seo/wordpress-seo-kontrol-listesi",
    // Kaynaklar
    "kaynaklar/google-seo-baslangic-rehberi",
    "kaynaklar/seo-terminoloji-sozlugu",
  ].map((path) => ({
    url: `${siteUrl}/seo-toolkit/${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...guidePages];
}
