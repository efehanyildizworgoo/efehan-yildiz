"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send,
  BookOpen,
  Download,
  FileText,
  Code2,
  Globe,
  Search,
  Shield,
  Zap,
  Copy,
  CheckCircle2,
  Lock,
  FileCode,
  Heading,
  PenTool,
  BookMarked,
  MapPin,
  Link2,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

/* ─── Mini SEO Uygulamaları Tab Data ─── */
interface MiniField {
  label: string;
  placeholder: string;
  maxLen?: number;
  textarea?: boolean;
}

const miniAppTabs: { id: string; label: string; fields: MiniField[]; aiPrompt?: string }[] = [
  {
    id: "serp",
    label: "SERP Snippet Önizleme",
    fields: [
      { label: "URL", placeholder: "https://www.efehanyildiz.com/blog/seo-nedir" },
      { label: "Meta Title", placeholder: "SEO Nedir ve Nasıl Yapılır?", maxLen: 60 },
      { label: "Meta Description", placeholder: "SEO hakkında bilmeniz gerekenler...", maxLen: 160, textarea: true },
    ],
  },
  {
    id: "ai-meta",
    label: "✨ AI Meta Etiket Oluşturucu",
    aiPrompt: "Aşağıdaki bilgilere göre SEO uyumlu meta title (max 60 karakter) ve meta description (max 160 karakter) oluştur. Türkçe yaz, anahtar kelimeyi doğal şekilde başa yakın yerleştir.\n\nKonu: {konu}\nAnahtar Kelime: {anahtar_kelime}\n\nÇıktı formatı:\nMeta Title: ...\nMeta Description: ...",
    fields: [
      { label: "Sayfa Konusu", placeholder: "Sayfanızın konusunu kısaca yazın..." },
      { label: "Anahtar Kelime", placeholder: "Ana hedef anahtar kelime" },
    ],
  },
  {
    id: "ai-icerik",
    label: "✨ AI İçerik Fikri Üretici",
    aiPrompt: "Aşağıdaki sektör ve hedef kitle bilgisine göre SEO uyumlu 5 adet blog yazısı fikri üret. Her fikir için başlık önerisi ve kısa açıklama yaz. Türkçe yaz.\n\nSektör: {sektor}\nHedef Kitle: {hedef_kitle}\n\nÇıktı formatı:\n1. Başlık: ... — Açıklama: ...\n2. ...",
    fields: [
      { label: "Sektör", placeholder: "E-ticaret, sağlık, teknoloji..." },
      { label: "Hedef Kitle", placeholder: "Girişimciler, öğrenciler..." },
    ],
  },
  {
    id: "ai-regex",
    label: "✨ AI Regex & .htaccess",
    aiPrompt: "Aşağıdaki ihtiyaca göre Apache .htaccess kuralı veya regex pattern'i oluştur. Kuralı açıkla ve örnek URL ile test sonucunu göster. Türkçe yaz.\n\nİhtiyaç: {ihtiyac}\nÖrnek URL: {ornek_url}\n\nÇıktı formatı:\nKural:\n...\nAçıklama: ...\nTest: ...",
    fields: [
      { label: "İhtiyaç", placeholder: "301 yönlendirme, URL rewrite, trailing slash..." },
      { label: "Örnek URL (opsiyonel)", placeholder: "https://www.ornek.com/eski-sayfa" },
    ],
  },
  {
    id: "robots",
    label: "Robots.txt Oluşturucu",
    fields: [
      { label: "Site URL", placeholder: "https://www.ornek.com" },
      { label: "İzin verilmeyen yollar", placeholder: "/wp-admin/\n/cart/\n/checkout/", textarea: true },
    ],
  },
  {
    id: "sitemap",
    label: "Sitemap.xml Oluşturucu",
    fields: [
      { label: "Site URL", placeholder: "https://www.ornek.com" },
    ],
  },
  {
    id: "article-schema",
    label: "Article Schema Oluşturucu",
    fields: [
      { label: "Başlık", placeholder: "Makale başlığı" },
      { label: "Yazar", placeholder: "Yazar adı" },
      { label: "Yayın Tarihi", placeholder: "2025-01-01" },
    ],
  },
  {
    id: "redirect-checker",
    label: "Redirect Checker",
    fields: [
      { label: "URL", placeholder: "https://www.ornek.com/eski-sayfa" },
    ],
  },
  {
    id: "canonical-checker",
    label: "Canonical Checker",
    fields: [
      { label: "URL", placeholder: "https://www.ornek.com/sayfa" },
    ],
  },
];

/* ─── Category Data ─── */
interface CategoryItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  links?: { label: string; href: string }[];
  highlighted?: boolean;
  highlightLabel?: string;
  highlightCta?: string;
  highlightCtaHref?: string;
  codeSnippet?: string;
  codeTabs?: { label: string; code: string }[];
  downloads?: { label: string; href: string }[];
}

interface CategoryData {
  title: string;
  description: string;
  type?: "mini-apps" | "teknik-seo" | "icerik-meta" | "local-seo" | "backlink" | "seo-otomasyon" | "wordpress-seo" | "default";
  items: CategoryItem[];
}

const categoryData: Record<string, CategoryData> = {
  "mini-uygulamalar": {
    title: "Mini SEO Uygulamaları",
    description: "Sık kullandığınız SEO araçları ve AI destekli yardımcılar tek bir sayfada.",
    type: "mini-apps",
    items: [],
  },
  "kaynaklar": {
    title: "Kaynaklar & Rehberler",
    description: "SEO dünyasını takip etmek, bilginizi tazelemek ve terimleri öğretmek için en iyi kaynaklar.",
    items: [
      {
        title: "SEO'yu Uzmanından Öğrenin",
        description: "Efehan Yıldız'ın detaylı SEO eğitimi ve mentörlük programlarıyla teorik bilgiyi, uygulama bilgisine dönüştürün.",
        highlighted: true,
        highlightLabel: "Eğitim",
        highlightCta: "Eğitimleri İncele →",
        highlightCtaHref: "/egitimler",
      },
      {
        title: "En İyi SEO Blogları",
        description: "Sektörün en güvenilir ve güncel SEO kaynaklarını takip edin. Algoritma güncellemeleri, vaka çalışmaları ve stratejik içeriklerle bilginizi sürekli güncel tutun.",
        icon: BookOpen,
        links: [
          { label: "Moz Blog", href: "https://moz.com/blog" },
          { label: "Ahrefs Blog", href: "https://ahrefs.com/blog" },
          { label: "Neil Patel", href: "https://neilpatel.com/blog/" },
          { label: "Search Engine Journal", href: "https://searchenginejournal.com" },
          { label: "Ayhan Karaman", href: "https://ayhankaraman.com" },
        ],
      },
      {
        title: "Profesyonel Desteğe mi İhtiyacınız Var?",
        description: "SEO sürecinizde uzman desteğine ihtiyaç duyuyorsanız, WhatsApp üzerinden hemen iletişime geçebilirsiniz.",
        highlighted: true,
        highlightLabel: "",
        highlightCta: "WhatsApp ile İletişime Geç →",
        highlightCtaHref: "https://wa.me/905527328055",
      },
      {
        title: "Google SEO Başlangıç Rehberi",
        description: "Doğrudan Google tarafından hazırlanan resmi başlangıç rehberi. SEO'ya ilk adımınızı atarken temel kavramları ve en iyi uygulamaları öğrenin.",
        icon: Search,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/kaynaklar/google-seo-baslangic-rehberi" }],
      },
      {
        title: "SEO Terminoloji Sözlüğü",
        description: "Backlink'ten canonical'e, crawl budget'tan SERP'e kadar tüm SEO terimlerinin Türkçe açıklamalarını tek bir sayfada bulun.",
        icon: FileText,
        links: [{ label: "Sözlüğe Git →", href: "/seo-toolkit/kaynaklar/seo-terminoloji-sozlugu" }],
      },
      {
        title: "Ücretsiz E-Kitaplar & PDF Rehberleri",
        description: "İndirilebilir Efehan Yıldız & Worgoo sosyal medya kaynakları.",
        icon: Download,
        downloads: [
          { label: "Temel SEO Terminolojileri.pdf", href: "#" },
          { label: "open_Sitemap E-Kitap.pdf", href: "#" },
        ],
      },
    ],
  },
  "analiz-olcum": {
    title: "Analiz & Ölçüm Araçları",
    description: "Sitenizin mevcut durumunu analiz etmek ve SEO performansınızı ölçmek için gereken tüm kaynaklar.",
    items: [
      {
        title: "Sitenizin SEO Sağlığını Merak mı Ediyorsunuz?",
        description: "Worgoo'nun uzman ekibi tarafından hazırlanan kapsamlı ve ücretsiz temel SEO analizi hizmetini hemen keşfedin.",
        highlighted: true,
        highlightLabel: "Önerilen",
        highlightCta: "Ücretsiz Analiz İste →",
        highlightCtaHref: "https://wa.me/905527328055?text=Merhaba%2C%20ücretsiz%20SEO%20analizi%20hizmetinizden%20yararlanmak%20istiyorum.",
      },
      {
        title: "Google Search Console Kılavuzu",
        description: "Organik performansınızı ölçmek için GSC'yi etkili kullanmanın rehberi.",
        icon: Search,
        links: [{ label: "Kılavuzu Oku →", href: "/seo-toolkit/analiz-olcum/gsc-kilavuzu" }],
      },
      {
        title: "GA4 SEO Metrikleri",
        description: "Google Analytics 4'te izlemeniz gereken önemli SEO metrikleri.",
        icon: FileText,
        links: [{ label: "Kılavuzu Oku →", href: "/seo-toolkit/analiz-olcum/ga4-seo-metrikleri" }],
      },
      {
        title: "SEO Site Denetimi Checklist",
        description: "Sitenizin SEO sağlığını adım adım kontrol edin. İnteraktif checklist ile ilerlemenizi takip edin.",
        icon: FileText,
        highlighted: true,
        highlightLabel: "Checklist",
        highlightCta: "Checklist'i Başlat →",
        highlightCtaHref: "/seo-toolkit/analiz-olcum/seo-site-denetimi-checklist",
      },
      {
        title: "Core Web Vitals & Hız Testi Araçları",
        description: "Sayfa hızı ve kullanıcı deneyimi metrikleri için kullanılabilecek ücretsiz araçlar.",
        icon: Zap,
        links: [
          { label: "PageSpeed Insights", href: "https://pagespeed.web.dev" },
          { label: "GTmetrix", href: "https://gtmetrix.com" },
          { label: "WebPageTest", href: "https://webpagetest.org" },
        ],
      },
      {
        title: "Ücretsiz Analiz Araçları",
        description: "Rakip analizinden backlink kontrolüne kadar kullanabileceğiniz ücretsiz araçlar.",
        icon: Globe,
        links: [
          { label: "Ahrefs Webmaster", href: "https://ahrefs.com/webmaster-tools" },
          { label: "Semrush Free", href: "https://semrush.com" },
          { label: "Screaming Frog", href: "https://screamingfrog.co.uk" },
        ],
      },
    ],
  },
  "anahtar-kelime": {
    title: "Anahtar Kelime Araçları",
    description: "Doğru anahtar kelimeleri bulmak, hedef kitlenize ulaşmak ve organik trafiğinizi artırmak için ihtiyacınız olan araçlar ve stratejiler.",
    items: [
      {
        title: "Google Keyword Planner Kılavuzu",
        description: "Kampanyalarınız ve içeriğiniz için doğru anahtar kelimeleri analiz edin.",
        icon: Search,
        links: [{ label: "Kılavuzu Oku →", href: "/seo-toolkit/anahtar-kelime/google-keyword-planner-kilavuzu" }],
      },
      {
        title: "Google Trends",
        description: "Arama trendlerini ve mevsimsel ilgi değişimlerini, çeşitli göstergeleri karşılaştırın.",
        icon: Zap,
        links: [{ label: "Google Trends'e Git →", href: "https://trends.google.com/trends/" }],
      },
      {
        title: "Soru & Konu Boşluğu Araçları",
        description: "Kullanıcıların ne sorduğunu, aradığını ve beklentilerini keşfedin.",
        icon: Search,
        links: [
          { label: "AnswerThePublic", href: "https://answerthepublic.com" },
          { label: "AlsoAsked", href: "https://alsoasked.com" },
          { label: "KeywordTool.io", href: "https://keywordtool.io" },
        ],
      },
      {
        title: "Rakip Anahtar Kelime Analizi Metodu",
        description: "Rakiplerinizin hangi kelimelerle trafik aldığını analiz etme yöntemleri.",
        icon: FileText,
        links: [{ label: "Kılavuzu Oku →", href: "/seo-toolkit/anahtar-kelime/rakip-anahtar-kelime-analizi" }],
      },
      {
        title: "Long-Tail (Uzun Kuyruk) Stratejisi",
        description: "Düşük rekabetle yüksek dönüşüm sağlamak için uzun kuyruk anahtar kelime stratejileri.",
        icon: FileText,
        links: [{ label: "Kılavuzu Oku →", href: "/seo-toolkit/anahtar-kelime/long-tail-stratejisi" }],
      },
      {
        title: "Anahtar Kelime Havuzu Şablonu",
        description: "Kapsamlı araştırmalarınızı yönetmek için Excel/Sheets şablonu.",
        highlighted: true,
        highlightLabel: "Şablon",
        highlightCta: "Şablonu İndir →",
        highlightCtaHref: "/templates/anahtar-kelime-havuzu-sablonu.csv",
      },
    ],
  },
  "teknik-seo": {
    title: "Teknik SEO Araçları",
    description: "Sitenizin altyapısını güçlendirmek ve Google'ın etkili şekilde taramasını sağlamak için teknik araçlar ve rehberler.",
    type: "teknik-seo",
    items: [
      {
        title: "Canonical (URL) Etiketi Kullanım Rehberi",
        description: "Duplicate içerik sorunlarını çözmek ve doğru URL'yi Google'a bildirmek için canonical etiketi rehberi.",
        icon: FileText,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/teknik-seo/canonical-url-rehberi" }],
      },
      {
        title: "Hız & Mobil Uyumluluk Araçları",
        description: "Core Web Vitals, sayfa hızı ve mobil deneyim metrikleri için temel araçlar.",
        icon: Zap,
        links: [
          { label: "Google Mobil Uyumluluk Testi", href: "https://search.google.com/test/mobile-friendly" },
          { label: "PageSpeed Insights", href: "https://pagespeed.web.dev/" },
          { label: "GTmetrix", href: "https://gtmetrix.com/" },
          { label: "Web.dev (Lighthouse)", href: "https://web.dev/measure/" },
        ],
      },
      {
        title: "Gelişmiş Yapılandırma Araçları",
        description: "Daha detaylı Schema, Sitemap ve Robots.txt için harici araçlar.",
        icon: Code2,
        links: [
          { label: "TechnicalSEO Schema Generator", href: "https://technicalseo.com/tools/schema-markup-generator/" },
          { label: "Merkle Schema Generator (Çoklu Tip)", href: "https://technicalseo.com/tools/schema-markup-generator/" },
          { label: "Sitemap.xml Oluşturucu (Crawler)", href: "https://www.xml-sitemaps.com/" },
          { label: "Robots.txt Oluşturucu (Gelişmiş)", href: "https://en.ryte.com/free-tools/robots-txt-generator/" },
        ],
      },
      {
        title: "WordPress Teknik SEO Kontrol Listesi",
        description: "WordPress siteniz için atlamamamız gereken teknik ayarlar (PDF).",
        highlighted: true,
        highlightLabel: "Kontrol Listesi",
        highlightCta: "Listeyi İncele",
        highlightCtaHref: "/seo-toolkit/teknik-seo/wordpress-teknik-seo-kontrol-listesi",
      },
    ],
  },
  "icerik-meta": {
    title: "İçerik & Meta Araçları",
    description: "Tıklanma oranınızı (CTR) artıracak meta etiketler oluşturun ve içerik kalitenizi en üst seviyeye taşıyın.",
    type: "icerik-meta",
    items: [
      {
        title: "Heading (Başlık) Yapısı Örnekleri",
        description: "İçeriklerinizin H1-H6 ve SEO uyumlu başlık yapıları.",
        icon: Heading,
        codeSnippet: "<h1>Ana Başlık (Sayfa Konusu, Anahtar Kelime)</h1>\n  <h2>Alt Başlık (Konunun Bir Alt Başlığı)</h2>\n    <h3>Detay Konu (Alt Başlığın Detayı)</h3>\n  <h2>Başka Bir Alt Başlık</h2>\n    <h3>Detaylı Detay Konusu</h3>\n  <h2>Sonuç veya Özet Başlığı</h2>",
      },
      {
        title: "İçerik Okunabilirlik Araçları",
        description: "Metinlerinizin kolay okunduğunu analiz edin.",
        icon: BookMarked,
        links: [
          { label: "Hemingway App (İngilizce)", href: "https://hemingwayapp.com/" },
          { label: "Türkçe Okunabilirlik Ölçer", href: "https://www.turkceokunabirlikollceri.com/" },
        ],
      },
      {
        title: "SEO Uyumlu Yazı Şablonu Rehberi",
        description: "İçeriklerinizi yapılandırmanız için Google'ı Tatli'yı sevecek yapı: mutfakta rehberi.",
        highlighted: true,
        highlightLabel: "Rehber",
        highlightCta: "Rehberi İncele",
        highlightCtaHref: "/seo-toolkit/icerik-meta/seo-uyumlu-yazi-sablonu",
      },
    ],
  },
  "local-seo": {
    title: "Local SEO & Schema Araçları",
    description: "İşletmenizi haritalarda ön plana taşıyın ve yerel aramalarda rakiplerinizin önüne geçerek potansiyel müşterilerinize ulaşın.",
    type: "local-seo",
    items: [
      {
        title: "Haritalarda Görünürlüğünüzü Artırın",
        description: "Worgoo'nun yerel SEO uzmanları ile Google Haritalar'da üst sıralara çıkın, müşteri yorumlarını yönetin ve dönüşümlerinizi artırın.",
        highlighted: true,
        highlightLabel: "Önerilen",
        highlightCta: "Yerel SEO Desteği →",
        highlightCtaHref: "https://www.worgoo.com",
      },
      {
        title: "Google Business Profile Optimizasyon Rehberi",
        description: "Profil bilgilerinizi A'dan Z'ye optimizasyon için kapsamlı rehber.",
        icon: MapPin,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/local-seo/google-business-profile-optimizasyon-rehberi" }],
      },
      {
        title: "NAP Tutarlılığı Kontrol Listesi",
        description: "İsim, Adres, Telefon bilgilerinizin tüm platformlarda tutarlı olduğunu kontrol edin.",
        icon: Shield,
        highlighted: true,
        highlightLabel: "Checklist",
        highlightCta: "Listeyi Başlat →",
        highlightCtaHref: "/seo-toolkit/local-seo/nap-tutarliligi-kontrol-listesi",
      },
      {
        title: "Yerel SEO İçin Görsel Optimizasyon Rehberi",
        description: "Görsellerinizi yerel aramalar ve GBP'ye özel olarak optimize edin.",
        icon: FileText,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/local-seo/yerel-seo-gorsel-optimizasyon-rehberi" }],
      },
    ],
  },
  "backlink": {
    title: "Backlink & Off-Page SEO",
    description: "Sitenizin otoritesini artırın ve kaliteli geri bağlantılar (backlink) ile Google'da yükselin.",
    type: "backlink",
    items: [
      {
        title: "Otoriter Sitelerden Tanıtım Yazısı Alın",
        description: "Worgoo'nun geniş medya ağı ile Türkiye'nin en büyük haber sitelerinden ve web sitesi büyüklüklerinin tanıtım yazısı olarak sitenizi etkili ve sürdürülebilir olun.",
        highlighted: true,
        highlightLabel: "Medya Planlama",
        highlightCta: "Listeyi İncele →",
        highlightCtaHref: "https://www.worgoo.com",
      },
      {
        title: "Backlink Analiz Araçları",
        description: "Hem kendi sitenizin hem de rakiplerinizin backlink profilini incelemek için araç listesi.",
        icon: Link2,
        links: [
          { label: "Ahrefs", href: "https://ahrefs.com/backlink-checker" },
          { label: "Ubersuggest", href: "https://neilpatel.com/backlinks/" },
          { label: "OpenLink Profiler (Ücretsiz)", href: "https://openlinkprofiler.org/" },
        ],
      },
      {
        title: "Google Disavow (Reddetme) Aracı Rehberi",
        description: "Zararlı veya spam linklerinizi tespit edip Google'a reddettirmeye yönelik kapsamlı rehber.",
        icon: Shield,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/backlink/google-disavow-araci-rehberi" }],
      },
      {
        title: "Doğal Backlink Kazanma Yolları",
        description: "Kontroller, doğal ve kaliteli backlink kazanma konusunda kapsamlı bir rehber (PDF).",
        icon: FileText,
        highlighted: true,
        highlightLabel: "",
        highlightCta: "Rehbere Git",
        highlightCtaHref: "/seo-toolkit/backlink/dogal-backlink-kazanma-yollari",
      },
      {
        title: "Outreach E-posta Şablonları",
        description: "Etkili backlink talebi için kullanıma hazır e-posta şablonları (DOCX).",
        icon: FileText,
        highlighted: true,
        highlightLabel: "",
        highlightCta: "Şablonları İncele",
        highlightCtaHref: "/seo-toolkit/backlink/outreach-e-posta-sablonlari",
      },
      {
        title: "Tanıtım Yazısı (Advertorial) Süreci",
        description: "Etkili tanıtım (advertorial) süreci, doğru planlama, içerik standardı ve yayıncı süreç takibini içerir.",
        icon: FileText,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/backlink/tanitim-yazisi-advertorial-sureci" }],
      },
      {
        title: "Sosyal İmleme Siteleri Listesi",
        description: "İçeriklerinizi tanıtmak ve link sinyalleri almak için popüler sosyal imleme siteleri.",
        icon: Globe,
        links: [
          { label: "Reddit", href: "https://reddit.com" },
          { label: "Medium", href: "https://medium.com" },
          { label: "Pocket", href: "https://getpocket.com" },
          { label: "Scoopit", href: "https://www.scoop.it" },
          { label: "Pinterest", href: "https://pinterest.com" },
          { label: "Quora", href: "https://quora.com" },
          { label: "Troogit", href: "https://troogit.com" },
          { label: "Dixit", href: "https://dixit.com" },
          { label: "Tumblr", href: "https://tumblr.com" },
          { label: "Flipboard", href: "https://flipboard.com" },
          { label: "Folkd", href: "https://www.folkd.com" },
          { label: "...ve daha fazlası", href: "#" },
        ],
      },
    ],
  },
  "otomasyon": {
    title: "SEO Otomasyon & Script'ler",
    description: "Rutin görevleri otomatize ederek zaman kazanın. ChatGPT promptları, scriptler ve mini araçlarla SEO süreçlerinizi hızlandırın.",
    type: "seo-otomasyon",
    items: [
      {
        title: "Screaming Frog + Excel ile Otomatik Raporlama",
        description: "Site tarama verilerinizi otomatik olarak anlamlı Excel raporlarına dönüştürün.",
        icon: FileText,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/otomasyon/screaming-frog-excel-otomatik-raporlama" }],
      },
    ],
  },
  "wordpress-seo": {
    title: "WordPress SEO Araçları",
    description: "WordPress sitenizi SEO açısından güçlendirin. Eklenti karşılaştırmaları, schema eklentileri, functions.php snippet'leri ve kontrol listeleri.",
    type: "wordpress-seo",
    items: [
      {
        title: "Schema Eklentileri",
        description: "Sektöre özel hazır schema eklentileri — indirip WordPress sitenize yükleyin.",
        icon: Code2,
        highlighted: true,
        highlightLabel: "İndir",
        downloads: [
          { label: "Güzellik Merkezi Schema", href: "/downloads/schema-eklentileri/guzellik-merkezi-schema.zip" },
          { label: "Ayakkabı Dükkanı Schema", href: "/downloads/schema-eklentileri/ayakkabi-dukkani-schema.zip" },
          { label: "Kombi Servis Schema", href: "/downloads/schema-eklentileri/kombi-servis-schema.zip" },
          { label: "Kardiyolog Schema", href: "/downloads/schema-eklentileri/kardiyolog-schema.zip" },
          { label: "Bungalov Kiralama Schema", href: "/downloads/schema-eklentileri/bungalov-kiralama-schema.zip" },
          { label: "Medikal Ürün Schema", href: "/downloads/schema-eklentileri/medikal-urun-schema.zip" },
          { label: "Avukat Schema", href: "/downloads/schema-eklentileri/avukat-schema-eklentisi.zip" },
          { label: "Petciler Schema", href: "/downloads/schema-eklentileri/petciler-schema.php.zip" },
          { label: "Yayınevi Schema", href: "/downloads/schema-eklentileri/yayinevi-schema.zip" },
          { label: "SAP Hizmet Schema", href: "/downloads/schema-eklentileri/sap-hizmet-schema.zip" },
        ],
      },
      {
        title: "Yoast SEO vs Rank Math SEO",
        description: "İki popüler WordPress SEO eklentisinin detaylı karşılaştırması ve konfigürasyon rehberi.",
        icon: Search,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/wordpress-seo/yoast-seo-vs-rank-math" }],
      },
      {
        title: "wp_head Optimizasyon Rehberi",
        description: "WordPress wp_head çıktısını temizleyerek sayfa hızını ve SEO performansını artırın.",
        icon: Code2,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/wordpress-seo/wp-head-optimizasyon-rehberi" }],
      },
      {
        title: "XML Sitemap Custom Yapılandırma Rehberi",
        description: "WordPress sitemap'inizi özelleştirin, gereksiz URL'leri hariç tutun ve Google'a doğru sinyaller gönderin.",
        icon: FileCode,
        links: [{ label: "Rehberi Oku →", href: "/seo-toolkit/wordpress-seo/xml-sitemap-custom-yapilandirma" }],
      },
      {
        title: "Temel SEO Eklentileri",
        description: "WordPress SEO için olmazsa olmaz eklentiler.",
        icon: Zap,
        links: [
          { label: "Redirection", href: "https://wordpress.org/plugins/redirection/" },
          { label: "Broken Link Checker", href: "https://tr.wordpress.org/plugins/broken-link-checker/" },
          { label: "XML Sitemaps + Google News", href: "https://wordpress.org/plugins/xml-sitemap-feed/" },
        ],
      },
      {
        title: "WordPress SEO Kontrol Listesi",
        description: "WordPress siteniz için eksiksiz SEO kontrol listesi — adım adım takip edin.",
        icon: BookMarked,
        highlighted: true,
        highlightLabel: "Checklist",
        highlightCta: "Kontrol Listesine Git",
        highlightCtaHref: "/seo-toolkit/wordpress-seo/wordpress-seo-kontrol-listesi",
      },
    ],
  },
};

const defaultCategory: CategoryData = {
  title: "SEO Toolkit",
  description: "Bu kategori için içerik hazırlanıyor.",
  items: [
    {
      title: "İçerik Hazırlanıyor",
      description: "Bu bölüm yakında detaylı araçlar ve rehberlerle güncellenecektir.",
    },
  ],
};

/* ─── Code Block Component ─── */
/* ─── Teknik SEO Mini Tools ─── */
function JsonLdGenerator() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [output, setOutput] = useState('{\n  "Lütfen bilgileri girip \'Oluştur\' butonuna basın."\n}');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title || "Makale Başlığı",
      author: { "@type": "Person", name: author || "Yazar Adı" },
      publisher: {
        "@type": "Organization",
        name: publisher || "Yayıncı Adı",
      },
      ...(imageUrl ? { image: imageUrl } : {}),
      datePublished: new Date().toISOString().split("T")[0],
    };
    setOutput(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Code2 size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Mini JSON-LD Oluşturucu (Article Schema)</h3>
          <p className="text-xs text-muted">Makaleleriniz için hızlıca schema kodu oluşturun.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Makale Başlığı</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Örn: SEO Nedir?" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Yazar Adı</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Örn: Efehan Yıldız" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Yayıncı (Site) Adı</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Örn: Efehan Yıldız SEO" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Öne Çıkan Görsel URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://.../gorsel.jpg" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
      </div>
      <button onClick={generate} className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light">
        JSON-LD Oluştur
      </button>
      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-medium text-muted">Oluşturulan Kod:</label>
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#0a0e1a]">
          <button
            onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
          >
            {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
          <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80"><code>{output}</code></pre>
        </div>
      </div>
    </div>
  );
}

function RobotsTxtGenerator() {
  const [userAgent, setUserAgent] = useState("*");
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/wp-login.php");
  const [output, setOutput] = useState("# Lütfen bilgileri girip 'Oluştur' butonuna basın.");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const lines = [`User-agent: ${userAgent || "*"}`, ""];
    const paths = disallowPaths.split("\n").filter((p) => p.trim());
    paths.forEach((p) => lines.push(`Disallow: ${p.trim()}`));
    lines.push("");
    if (sitemapUrl.trim()) lines.push(`Sitemap: ${sitemapUrl.trim()}`);
    setOutput(lines.join("\n"));
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Lock size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Basit Robots.txt Oluşturucu</h3>
          <p className="text-xs text-muted">Temel robots.txt kurallarınızı hızlıca oluşturun.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">User-agent</label>
          <input type="text" value={userAgent} onChange={(e) => setUserAgent(e.target.value)} placeholder="*" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Sitemap URL (Tam Adres)</label>
          <input type="text" value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} placeholder="https://.../sitemap.xml" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-muted">Engellenecek Yollar (Her biri yeni satırda)</label>
        <textarea value={disallowPaths} onChange={(e) => setDisallowPaths(e.target.value)} rows={4} placeholder="/admin/&#10;/wp-login.php" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
      </div>
      <button onClick={generate} className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light">
        Robots.txt Oluştur
      </button>
      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-medium text-muted">Oluşturulan Kod:</label>
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#0a0e1a]">
          <button
            onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
          >
            {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
          <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80"><code>{output}</code></pre>
        </div>
      </div>
    </div>
  );
}

function SitemapXmlGenerator() {
  const [urls, setUrls] = useState("https://.../anasayfa\nhttps://.../hakkimda\nhttps://.../iletisim");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const urlList = urls.split("\n").filter((u) => u.trim());
    const today = new Date().toISOString().split("T")[0];
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    urlList.forEach((u) => {
      xml += `  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
    });
    xml += "</urlset>";
    setOutput(xml);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FileCode size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Basit Sitemap.xml Oluşturucu</h3>
          <p className="text-xs text-muted">URL listenizi XML formatına dönüştürün.</p>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">URL Listesi (Her biri yeni satırda)</label>
        <textarea value={urls} onChange={(e) => setUrls(e.target.value)} rows={5} placeholder="https://.../anasayfa&#10;https://.../hakkimda" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
      </div>
      <button onClick={generate} className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light">
        Sitemap.xml Oluştur
      </button>
      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-medium text-muted">Oluşturulan Kod:</label>
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#0a0e1a]">
          <button
            onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
          >
            {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
          <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80"><code>{output || ""}</code></pre>
        </div>
      </div>
    </div>
  );
}

/* ─── İçerik & Meta Mini Tools ─── */
function SerpSnippetPreview() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const displayUrl = url || "www.example.com/sayfa-adresiniz";
  const displayTitle = title || "Etkileyici Meta Başlığınız";
  const displayDesc = desc || "Merak uyandıran meta açıklamanız...";

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Search size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">SERP Snippet Önizleme & Karakter Sayacı</h3>
          <p className="text-xs text-muted">Meta etiketlerinizin Google&apos;da nasıl görüneceğini test edin.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Link</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.example.com/sayfa-adresiniz" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
              <span>Meta Title</span>
              <span className={`${title.length > 60 ? "text-red-400" : "text-muted/50"}`}>{title.length} / 60</span>
            </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Etkileyici Meta Başlığınız" className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
              <span>Meta Description</span>
              <span className={`${desc.length > 160 ? "text-red-400" : "text-muted/50"}`}>{desc.length} / 160</span>
            </label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Merak uyandıran meta açıklamanız..." className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-xs font-medium text-muted">Canlı SERP Önizlemesi:</label>
        <div className="rounded-xl border border-border bg-surface-light p-4">
          <p className="text-xs text-emerald-400 truncate">{displayUrl}</p>
          <p className="mt-1 text-base font-semibold text-[#8ab4f8] line-clamp-1">{displayTitle}</p>
          <p className="mt-1 text-xs text-muted line-clamp-2">{displayDesc}</p>
        </div>
      </div>
    </div>
  );
}

function AiBlogOutlineGenerator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [rawOutput, setRawOutput] = useState("");
  const [h1, setH1] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [outline, setOutline] = useState<string[]>([]);

  const parseOutput = (text: string) => {
    const lines = text.split(/\r?\n/);
    let foundOutline = false;
    const outlineItems: string[] = [];
    let parsedH1 = "";
    let parsedTitle = "";
    let parsedDesc = "";

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.match(/^H1:\s*/i)) {
        parsedH1 = trimmed.replace(/^H1:\s*/i, "").trim();
      } else if (trimmed.match(/^META[_ ]?TITLE:\s*/i)) {
        parsedTitle = trimmed.replace(/^META[_ ]?TITLE:\s*/i, "").trim();
      } else if (trimmed.match(/^META[_ ]?DESC(RIPTION)?:\s*/i)) {
        parsedDesc = trimmed.replace(/^META[_ ]?DESC(RIPTION)?:\s*/i, "").trim();
      } else if (trimmed.match(/^OUTLINE:/i)) {
        foundOutline = true;
      } else if (foundOutline) {
        // Match various formats: "- H2: text", "- H3: text", "H2: text", "H3: text", "* H2: text"
        const outlineMatch = trimmed.match(/^[-*•]?\s*H([23]):\s*(.+)/i);
        if (outlineMatch) {
          outlineItems.push(`H${outlineMatch[1]}: ${outlineMatch[2].trim()}`);
        }
      }
    }

    if (parsedH1) setH1(parsedH1);
    if (parsedTitle) setMetaTitle(parsedTitle);
    if (parsedDesc) setMetaDesc(parsedDesc);
    if (outlineItems.length > 0) setOutline(outlineItems);
  };

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setRawOutput("");
    setH1("");
    setMetaTitle("");
    setMetaDesc("");
    setOutline([]);

    try {
      const res = await fetch("/api/ai-blog-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!res.ok) {
        setRawOutput("Hata oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setRawOutput("Yanıt okunamadı.");
        setLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setRawOutput(fullText);
        parseOutput(fullText);
      }

      parseOutput(fullText);
    } catch {
      setRawOutput("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    const text = `H1: ${h1}\nMeta Title: ${metaTitle}\nMeta Description: ${metaDesc}\n\nAlt Başlıklar:\n${outline.join("\n")}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <PenTool size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Destekli Blog Taslağı Oluşturucu</h3>
          <p className="text-xs text-muted">Anahtar kelimenizi girin, yapay zeka ile SEO uyumlu bir yazı taslağı hazırlansın.</p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted">Blog Yazısı Konusu / Anahtar Kelime</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="Örn: WordPress site hızlandırma yöntemleri"
            className="flex-1 rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none focus:border-primary"
          />
          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Oluşturuluyor...
              </span>
            ) : (
              <>
                <Sparkles size={14} />
                Taslak Oluştur
              </>
            )}
          </button>
        </div>
      </div>

      {(h1 || metaTitle || metaDesc || outline.length > 0 || loading) && (
        <div className="mt-6 space-y-4">
          {/* Loading indicator */}
          {loading && !h1 && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-[#0a0e1a] p-4">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <span className="text-sm text-muted">AI taslak oluşturuyor...</span>
            </div>
          )}

          {/* H1 */}
          {h1 && (
            <div className="rounded-xl border border-border bg-[#0a0e1a] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">H1 Etiketi</span>
                <span className={`text-[11px] ${h1.length > 60 ? "text-red-400" : "text-muted/50"}`}>{h1.length}/60</span>
              </div>
              <p className="text-sm text-white">{h1}</p>
            </div>
          )}

          {/* Meta Title */}
          {metaTitle && (
            <div className="rounded-xl border border-border bg-[#0a0e1a] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Meta Başlık</span>
                <span className={`text-[11px] ${metaTitle.length > 60 ? "text-red-400" : "text-muted/50"}`}>{metaTitle.length}/60</span>
              </div>
              <p className="text-sm text-[#8ab4f8]">{metaTitle}</p>
            </div>
          )}

          {/* Meta Desc */}
          {metaDesc && (
            <div className="rounded-xl border border-border bg-[#0a0e1a] p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Meta Açıklama</span>
                <span className={`text-[11px] ${metaDesc.length > 160 ? "text-red-400" : "text-muted/50"}`}>{metaDesc.length}/160</span>
              </div>
              <p className="text-sm text-muted">{metaDesc}</p>
            </div>
          )}

          {/* Outline */}
          {outline.length > 0 && (
            <div className="rounded-xl border border-border bg-[#0a0e1a] p-4">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-wider text-violet-400">Taslak Alt Başlıklar</span>
              <div className="space-y-1.5">
                {outline.map((item, i) => {
                  const isH3 = item.startsWith("H3:");
                  const text = item.replace(/^H[23]:\s*/, "");
                  return (
                    <div key={i} className={`flex items-start gap-2 ${isH3 ? "ml-6" : ""}`}>
                      <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${isH3 ? "bg-violet-500/20 text-violet-300" : "bg-primary/20 text-primary"}`}>
                        {isH3 ? "H3" : "H2"}
                      </span>
                      <span className="text-sm text-white">{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Streaming indicator */}
          {loading && h1 && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              Oluşturuluyor...
            </div>
          )}

          {/* Copy all button */}
          {!loading && h1 && (
            <button
              onClick={copyAll}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface-light px-4 py-2.5 text-xs font-medium text-muted transition-all hover:border-primary/30 hover:text-white"
            >
              <Copy size={12} />
              Tümünü Kopyala
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Local SEO Mini Tools ─── */
function LocalBusinessSchema() {
  const [copied, setCopied] = useState(false);
  const schemaCode = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "İşletme Adınız",
  "image": "https://www.isletmeniz.com/logo.png",
  "url": "https://www.isletmeniz.com",
  "@id": "https://www.isletmeniz.com/#localbusiness",
  "telephone": "+90 312 123 45 67",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Örnek Cad. No: 123",
    "addressLocality": "Ankara",
    "addressRegion": "Ankara",
    "postalCode": "06000",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.925533,
    "longitude": 32.866287
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/isletmeniz",
    "https://www.instagram.com/isletmeniz"
  ],
  "priceRange": "₺₺"
}`;

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Code2 size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Yerel İşletme (LocalBusiness) Schema Örneği</h3>
          <p className="text-sm text-muted">Kendi bilgilerinizle düzenleyip sitenize ekleyin.</p>
        </div>
      </div>
      <p className="mb-3 text-xs font-medium text-muted">Örnek Schema Kodu:</p>
      <div className="relative overflow-hidden rounded-xl bg-[#0a0e1a] border border-border">
        <button
          onClick={() => {
            navigator.clipboard.writeText(schemaCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
        >
          {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
        <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80">
          <code>{schemaCode}</code>
        </pre>
      </div>
    </div>
  );
}

function GoogleMapsEmbed() {
  const [copied, setCopied] = useState(false);
  const embedCode = `<!-- Google Maps Embed -->
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.1!2d32.86!3d39.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzA3LjkiTiAzMsKwNTEnMzYuMCJF!5e0!3m2!1str!2str!4v1234567890"
  width="100%"
  height="300"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>

<!-- UTM Takipli Google Maps Bağlantısı -->
<a href="https://www.google.com/maps/place/İşletme+Adınız/@39.92,32.86,17z?utm_source=website&utm_medium=maps_embed&utm_campaign=local_seo"
   target="_blank" rel="noopener noreferrer">
  Google Haritalar'da Görüntüle →
</a>`;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-400/10">
          <MapPin size={18} className="text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Google Maps Embed & UTM Takip Örneği</h3>
          <p className="text-sm text-muted">Haritanızı sitenize ekleyin ve UTM ile takip edin.</p>
        </div>
      </div>
      <p className="mb-3 text-xs font-medium text-muted">Örnek Embed Kodu:</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.1!2d32.86!3d39.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f190a9cea8f%3A0xc2d67e1c8c1a3b8!2sAnkara!5e0!3m2!1str!2str!4v1700000000000"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        />
      </div>
      <div className="relative overflow-hidden rounded-xl bg-[#0a0e1a] border border-border">
        <button
          onClick={() => {
            navigator.clipboard.writeText(embedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
        >
          {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
        <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80">
          <code>{embedCode}</code>
        </pre>
      </div>
    </div>
  );
}

/* ─── SEO Otomasyon Mini Tools ─── */
const aiModelTabs = [
  { id: "chatgpt", label: "ChatGPT" },
  { id: "gemini", label: "Gemini" },
  { id: "deepseek", label: "DeepSeek" },
  { id: "claude", label: "Claude" },
];

const promptTypes = [
  { value: "meta-aciklama", label: "Meta Açıklama Yaz" },
  { value: "baslik-onerisi", label: "Başlık Önerisi" },
  { value: "icerik-taslak", label: "İçerik Taslağı" },
  { value: "sss-olustur", label: "SSS Oluştur" },
  { value: "schema-uret", label: "Schema Markup Üret" },
  { value: "alt-text", label: "ALT Text Yaz" },
];

function AiPromptGenerator() {
  const [activeModel, setActiveModel] = useState("chatgpt");
  const [selectedType, setSelectedType] = useState("meta-aciklama");
  const [keyword, setKeyword] = useState("");
  const [extra, setExtra] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const typeLabel = promptTypes.find(p => p.value === selectedType)?.label || selectedType;
    const modelHint: Record<string, string> = {
      chatgpt: 'Sen deneyimli bir SEO uzmanısın.',
      gemini: 'Sen deneyimli bir SEO uzmanısın.',
      deepseek: 'Sen deneyimli bir SEO uzmanısın. Adım adım düşün.',
      claude: 'Sen deneyimli bir SEO uzmanısın. Detaylı ve yapılandırılmış yanıt ver.',
    };

    const prompts: Record<string, string> = {
      "meta-aciklama": `${modelHint[activeModel]}\n\n"${keyword || '[Anahtar Kelime]'}" konusu için SEO uyumlu bir meta açıklama yaz.\n\nKurallar:\n- 140-160 karakter arası\n- Ana anahtar kelimeyi içersin\n- Tıklamayı teşvik eden CTA ekle\n- Merak uyandırıcı olsun${extra ? `\n- Ek not: ${extra}` : ''}`,
      "baslik-onerisi": `${modelHint[activeModel]}\n\n"${keyword || '[Anahtar Kelime]'}" konusu için 5 farklı SEO uyumlu blog başlığı (H1) öner.\n\nKurallar:\n- Her biri 50-60 karakter arası\n- Ana anahtar kelimeyi başa yakın yerleştir\n- Rakam veya yıl içerebilir\n- Merak uyandırıcı ve tıklanabilir olsun${extra ? `\n- Ek not: ${extra}` : ''}`,
      "icerik-taslak": `${modelHint[activeModel]}\n\n"${keyword || '[Anahtar Kelime]'}" konusu için kapsamlı bir blog yazısı taslağı oluştur.\n\nKurallar:\n- H1, H2, H3 hiyerarşisi kullan\n- Giriş, ana bölümler, SSS ve sonuç içersin\n- En az 8-12 alt başlık olsun\n- SEO uyumlu ve kullanıcı odaklı yapı${extra ? `\n- Ek not: ${extra}` : ''}`,
      "sss-olustur": `${modelHint[activeModel]}\n\n"${keyword || '[Anahtar Kelime]'}" konusu için Google'da "İnsanlar şunu da sordu" bölümüne uygun 5 SSS (Sık Sorulan Soru) ve kısa cevapları yaz.\n\nKurallar:\n- Her cevap 40-60 kelime arası\n- Doğal ve konuşma diline yakın\n- FAQ Schema'ya uygun format${extra ? `\n- Ek not: ${extra}` : ''}`,
      "schema-uret": `${modelHint[activeModel]}\n\n"${keyword || '[Anahtar Kelime]'}" konusu için uygun JSON-LD Schema markup kodu üret.\n\nKurallar:\n- Schema.org standartlarına uy\n- Sadece geçerli JSON-LD çıktı ver\n- Konuya en uygun schema türünü seç (Article, FAQ, HowTo vb.)\n- Google Rich Results Test'ten geçecek şekilde${extra ? `\n- Ek not: ${extra}` : ''}`,
      "alt-text": `${modelHint[activeModel]}\n\n"${keyword || '[Anahtar Kelime]'}" konusuyla ilgili bir görsel için SEO uyumlu ALT text yaz.\n\nKurallar:\n- 80-125 karakter arası\n- Açıklayıcı ve doğal dilde\n- Anahtar kelimeyi içersin ama spam olmasın\n- Görselin ne gösterdiğini tanımlasın${extra ? `\n- Ek not: ${extra}` : ''}`,
    };

    return prompts[selectedType] || '';
  };

  const prompt = generatePrompt();

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Prompt Oluşturucu</h3>
          <p className="text-sm text-muted">SEO görevleriniz için seçtiğiniz AI modeline özel prompt oluşturun.</p>
        </div>
      </div>

      {/* Model Tabs */}
      <div className="mb-5 flex gap-1 rounded-xl bg-[#0a0e1a] p-1">
        {aiModelTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveModel(tab.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activeModel === tab.id ? "bg-primary text-white" : "text-muted hover:text-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          {/* Prompt Type */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Prompt Tipi</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full appearance-none rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary"
              style={{ colorScheme: "dark" }}
            >
              {promptTypes.map(pt => (
                <option key={pt.value} value={pt.value} className="bg-[#0f1629] text-white">{pt.label}</option>
              ))}
            </select>
          </div>

          {/* Keyword */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Anahtar Kelime / Konu</label>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Örn: 'SEO Optimizasyonu'"
              className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none transition-colors focus:border-primary"
            />
          </div>

          {/* Extra */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Ek Bilgi (Opsiyonel)</label>
            <input
              type="text"
              value={extra}
              onChange={e => setExtra(e.target.value)}
              placeholder="Örn: 'Sağlık sektörüne özel olsun'"
              className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none transition-colors focus:border-primary"
            />
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(prompt);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
          >
            {copied ? "Kopyalandı!" : "Prompt Oluştur"}
          </button>
        </div>

        {/* Output */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Oluşturulan Prompt</label>
          <div className="relative min-h-[200px] rounded-xl border border-border bg-[#0a0e1a] p-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(prompt);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
            >
              {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
              {copied ? "Kopyalandı" : "Kopyala"}
            </button>
            <pre className="whitespace-pre-wrap text-[12px] leading-relaxed text-emerald-400/80">{prompt}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function PythonSeoScript() {
  const [copied, setCopied] = useState(false);
  const pythonCode = `import requests
from bs4 import BeautifulSoup

def get_title(url):
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Hata varsa yakala

        soup = BeautifulSoup(response.text, "html.parser")

        if soup.title and soup.title.string:
            return soup.title.string.strip()
        else:
            return "Title etiketi bulunamadı."

    except requests.exceptions.RequestException as e:
        return f"Hata: {e}"

# Kullanım
url_to_check = "https://www.efehanyildiz.com"
print(f"URL: {url_to_check}")
print(f"Title: {get_title(url_to_check)}")`;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
          <Code2 size={18} className="text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Python SEO Script Örneği (Title Çekme)</h3>
          <p className="text-sm text-muted">Bir URL&apos;nin title etiketini çeken basit Python script.</p>
        </div>
      </div>
      <p className="mb-3 text-xs font-medium text-muted">Örnek Python Kodu (Requests ve BeautifulSoup):</p>
      <div className="relative overflow-hidden rounded-xl bg-[#0a0e1a] border border-border">
        <button
          onClick={() => {
            navigator.clipboard.writeText(pythonCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
        >
          {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
        <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80">
          <code>{pythonCode}</code>
        </pre>
      </div>
    </div>
  );
}

function UrlParser() {
  const [url, setUrl] = useState("");
  const [parsed, setParsed] = useState<{ protocol: string; hostname: string; pathname: string; search: string; hash: string; port: string; params: [string, string][] } | null>(null);

  const parseUrl = () => {
    try {
      const u = new URL(url);
      const params: [string, string][] = [];
      u.searchParams.forEach((value, key) => {
        params.push([key, value]);
      });
      setParsed({
        protocol: u.protocol,
        hostname: u.hostname,
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        port: u.port,
        params,
      });
    } catch {
      setParsed(null);
    }
  };

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10">
          <Globe size={18} className="text-violet-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white">Mini Araç</span>
            <h3 className="text-lg font-bold text-white">URL Ayrıştırıcı (Parser)</h3>
          </div>
          <p className="text-sm text-muted">Bir URL&apos;yi protocol, domain, path ve parametrelere ayrıştırın.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Analiz Edilecek URL</label>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.ornek.com/sayfa?q=seo&page=1"
            className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none transition-colors focus:border-primary"
            onKeyDown={e => e.key === "Enter" && parseUrl()}
          />
        </div>

        <button
          onClick={parseUrl}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light"
        >
          URL&apos;yi Ayrıştır
        </button>

        {parsed && (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Sonuç:</p>
            <div className="overflow-hidden rounded-xl border border-border bg-[#0a0e1a]">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Protokol", parsed.protocol],
                    ["Domain", parsed.hostname],
                    ["Port", parsed.port || "(varsayılan)"],
                    ["Path", parsed.pathname],
                    ["Query String", parsed.search || "(yok)"],
                    ["Hash", parsed.hash || "(yok)"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-2.5 text-xs font-medium text-muted">{label}</td>
                      <td className="px-4 py-2.5 text-xs text-emerald-400">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsed.params.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Parametreler:</p>
                <div className="overflow-hidden rounded-xl border border-border bg-[#0a0e1a]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted">Anahtar</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted">Değer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsed.params.map(([key, val], i) => (
                        <tr key={i} className="border-b border-border/50 last:border-0">
                          <td className="px-4 py-2 text-xs text-violet-400">{key}</td>
                          <td className="px-4 py-2 text-xs text-emerald-400">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── WordPress functions.php Snippet Arşivi ─── */
const wpSnippets = [
  {
    title: "1. Gelişmiş ALT Etiketi (Özel Alan + Öne Çıkan Görsel)",
    code: `// functions.php — Gelişmiş ALT Etiketi
add_filter('wp_get_attachment_image_attributes', function($attr, $attachment) {
    if (empty($attr['alt'])) {
        $custom_alt = get_post_meta($attachment->ID, '_wp_attachment_image_alt_custom', true);
        if ($custom_alt) {
            $attr['alt'] = esc_attr($custom_alt);
        } else {
            $attr['alt'] = esc_attr(get_the_title($attachment->ID));
        }
    }
    return $attr;
}, 10, 2);`,
  },
  {
    title: "2. Eski Slug → 301 Yönlendirme (Otomatik)",
    code: `// functions.php — Eski Slug 301 Redirect
add_action('template_redirect', function() {
    if (is_404()) {
        global $wpdb;
        $request = basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        $post_id = $wpdb->get_var($wpdb->prepare(
            "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_wp_old_slug' AND meta_value = %s LIMIT 1",
            $request
        ));
        if ($post_id) {
            wp_redirect(get_permalink($post_id), 301);
            exit;
        }
    }
});`,
  },
  {
    title: "3. Kanonik (Canonical) Etiketi Güvenli Biçimde Ekle",
    code: `// functions.php — Canonical Tag
add_action('wp_head', function() {
    if (is_singular()) {
        echo '<link rel="canonical" href="' . esc_url(get_permalink()) . '" />' . "\\n";
    } elseif (is_home() || is_front_page()) {
        echo '<link rel="canonical" href="' . esc_url(home_url('/')) . '" />' . "\\n";
    } elseif (is_category() || is_tag() || is_tax()) {
        $term = get_queried_object();
        echo '<link rel="canonical" href="' . esc_url(get_term_link($term)) . '" />' . "\\n";
    }
}, 1);`,
  },
  {
    title: "4. İnce İçerik: Attachment Sayfalarını Ana İçeriğe Yönlendir",
    code: `// functions.php — Attachment Redirect
add_action('template_redirect', function() {
    if (is_attachment()) {
        global $post;
        if ($post && $post->post_parent) {
            wp_redirect(get_permalink($post->post_parent), 301);
        } else {
            wp_redirect(home_url('/'), 301);
        }
        exit;
    }
});`,
  },
  {
    title: "5. ?replytocom Parametresini Temizle",
    code: `// functions.php — replytocom Parametresini Kaldır
add_filter('comment_reply_link', function($link) {
    return preg_replace('/href=\\'(.*)(\\?replytocom=(\\d+)#)/','href=\\'$1#', $link);
});

add_action('template_redirect', function() {
    if (isset($_GET['replytocom'])) {
        $url = remove_query_arg('replytocom');
        wp_redirect($url, 301);
        exit;
    }
});`,
  },
  {
    title: "6. Noindex Kuralları (Arama, 404, Sayfalama)",
    code: `// functions.php — Noindex Kuralları
add_action('wp_head', function() {
    if (is_search() || is_404() || is_paged()) {
        echo '<meta name="robots" content="noindex, follow" />' . "\\n";
    }
});

// Opsiyonel: Tag sayfalarını da noindex yap
add_action('wp_head', function() {
    if (is_tag()) {
        echo '<meta name="robots" content="noindex, follow" />' . "\\n";
    }
});`,
  },
  {
    title: "7. Son Düzenleme Zamanını <head> Alanına Yaz",
    code: `// functions.php — Last Modified Meta Tag
add_action('wp_head', function() {
    if (is_singular()) {
        $modified = get_the_modified_time('c');
        echo '<meta property="article:modified_time" content="' . esc_attr($modified) . '" />' . "\\n";
    }
});`,
  },
  {
    title: "8. İlk Görsele Performans İpuçları (LCP)",
    code: `// functions.php — LCP Performans İpuçları
add_action('wp_head', function() {
    if (is_singular()) {
        $post_id = get_the_ID();
        $thumb_id = get_post_thumbnail_id($post_id);
        if ($thumb_id) {
            $img_url = wp_get_attachment_image_url($thumb_id, 'large');
            if ($img_url) {
                echo '<link rel="preload" as="image" href="' . esc_url($img_url) . '" fetchpriority="high" />' . "\\n";
            }
        }
    }
}, 1);`,
  },
  {
    title: "9. Trailing Slash (Sonda / İşareti) Tutarlılığı",
    code: `// functions.php — Trailing Slash Tutarlılığı
add_action('template_redirect', function() {
    if (is_feed() || is_admin()) return;

    $uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($uri, PHP_URL_PATH);

    // Ana sayfa hariç, slash ile bitmiyorsa ekle
    if ($path !== '/' && !preg_match('/\\.[a-zA-Z0-9]+$/', $path) && substr($path, -1) !== '/') {
        $query = parse_url($uri, PHP_URL_QUERY);
        $redirect = $path . '/' . ($query ? '?' . $query : '');
        wp_redirect(home_url($redirect), 301);
        exit;
    }
});`,
  },
  {
    title: "10. İç Link \"İlgili Yazılar\" Bloğu (Shortcode)",
    code: `// functions.php — İlgili Yazılar Shortcode
add_shortcode('ilgili_yazilar', function($atts) {
    $atts = shortcode_atts(['sayi' => 3], $atts);
    $tags = wp_get_post_tags(get_the_ID());
    if (!$tags) return '';

    $tag_ids = array_map(function($t) { return $t->term_id; }, $tags);
    $query = new WP_Query([
        'tag__in'        => $tag_ids,
        'post__not_in'   => [get_the_ID()],
        'posts_per_page' => intval($atts['sayi']),
        'orderby'        => 'rand',
    ]);

    if (!$query->have_posts()) return '';

    $html = '<div class="ilgili-yazilar"><h3>İlgili Yazılar</h3><ul>';
    while ($query->have_posts()) {
        $query->the_post();
        $html .= '<li><a href="' . get_permalink() . '">' . get_the_title() . '</a></li>';
    }
    $html .= '</ul></div>';
    wp_reset_postdata();
    return $html;
});
// Kullanım: [ilgili_yazilar sayi="5"]`,
  },
];

function FunctionsPhpSnippets() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
          <FileCode size={18} className="text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">functions.php Snippet Arşivi</h3>
          <p className="text-sm text-muted">WordPress SEO için hazır PHP snippet&apos;leri — kopyalayıp functions.php dosyanıza ekleyin.</p>
        </div>
      </div>

      <div className="space-y-2">
        {wpSnippets.map((snippet, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-[#0a0e1a]">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-surface-light"
            >
              <span>{snippet.title}</span>
              <ChevronRight size={14} className={`text-muted transition-transform ${openIndex === i ? "rotate-90" : ""}`} />
            </button>
            {openIndex === i && (
              <div className="relative border-t border-border">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(snippet.code);
                    setCopiedIdx(i);
                    setTimeout(() => setCopiedIdx(null), 2000);
                  }}
                  className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
                >
                  {copiedIdx === i ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                  {copiedIdx === i ? "Kopyalandı" : "Kopyala"}
                </button>
                <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-emerald-400/80">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-4 overflow-hidden rounded-xl bg-[#0a0e1a] border border-border">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
      >
        {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
        {copied ? "Kopyalandı" : "Kopyala"}
      </button>
      <pre className="overflow-x-auto p-5 text-[12px] leading-relaxed text-emerald-400/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ─── Main Component ─── */
export default function CategoryPage() {
  const params = useParams();
  const slug = params.category as string;
  const data = categoryData[slug] || defaultCategory;
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(miniAppTabs[0].id);
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [miniFields, setMiniFields] = useState<Record<string, string>>({});
  const [miniOutput, setMiniOutput] = useState("");
  const [miniLoading, setMiniLoading] = useState(false);
  const [miniCopied, setMiniCopied] = useState(false);

  const handleAiChat = async () => {
    if (!query.trim() || aiLoading) return;
    setAiLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      if (!res.ok || !res.body) { setAiResponse("Hata oluştu."); setAiLoading(false); return; }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setAiResponse(result);
      }
    } catch { setAiResponse("AI yanıt veremedi. Lütfen tekrar deneyin."); }
    setAiLoading(false);
  };

  const currentMiniTab = miniAppTabs.find((t) => t.id === activeTab);

  const handleMiniFieldChange = (label: string, value: string) => {
    setMiniFields((prev) => ({ ...prev, [`${activeTab}-${label}`]: value }));
  };
  const getMiniField = (label: string) => miniFields[`${activeTab}-${label}`] || "";

  const generateMiniOutput = async () => {
    if (!currentMiniTab) return;
    setMiniLoading(true);
    setMiniOutput("");

    const tab = currentMiniTab;

    // AI-powered tabs
    if (tab.aiPrompt) {
      let prompt = tab.aiPrompt;
      if (tab.id === "ai-meta") {
        prompt = prompt.replace("{konu}", getMiniField("Sayfa Konusu")).replace("{anahtar_kelime}", getMiniField("Anahtar Kelime"));
      } else if (tab.id === "ai-icerik") {
        prompt = prompt.replace("{sektor}", getMiniField("Sektör")).replace("{hedef_kitle}", getMiniField("Hedef Kitle"));
      } else if (tab.id === "ai-regex") {
        prompt = prompt.replace("{ihtiyac}", getMiniField("İhtiyaç")).replace("{ornek_url}", getMiniField("Örnek URL (opsiyonel)"));
      }
      try {
        const res = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt }),
        });
        if (!res.ok || !res.body) { setMiniOutput("Hata oluştu."); setMiniLoading(false); return; }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let result = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          setMiniOutput(result);
        }
      } catch { setMiniOutput("AI yanıt veremedi. Lütfen tekrar deneyin."); }
      setMiniLoading(false);
      return;
    }

    // Robots.txt generator
    if (tab.id === "robots") {
      const siteUrl = getMiniField("Site URL") || "https://www.ornek.com";
      const disallow = getMiniField("İzin verilmeyen yollar").split("\n").filter(Boolean).map((p) => `Disallow: ${p.trim()}`).join("\n");
      setMiniOutput(`User-agent: *\n${disallow || "Disallow:"}\n\nSitemap: ${siteUrl}/sitemap.xml`);
      setMiniLoading(false);
      return;
    }

    // Sitemap.xml generator
    if (tab.id === "sitemap") {
      const siteUrl = getMiniField("Site URL") || "https://www.ornek.com";
      setMiniOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${siteUrl}/hakkimda</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`);
      setMiniLoading(false);
      return;
    }

    // Article Schema generator
    if (tab.id === "article-schema") {
      const title = getMiniField("Başlık") || "Örnek Makale";
      const author = getMiniField("Yazar") || "Efehan Yıldız";
      const date = getMiniField("Yayın Tarihi") || new Date().toISOString().split("T")[0];
      setMiniOutput(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "author": { "@type": "Person", "name": author },
        "datePublished": date,
        "dateModified": date,
        "publisher": { "@type": "Organization", "name": author },
      }, null, 2));
      setMiniLoading(false);
      return;
    }

    // Redirect Checker
    if (tab.id === "redirect-checker") {
      const url = getMiniField("URL");
      if (!url) { setMiniOutput("Lütfen bir URL girin."); setMiniLoading(false); return; }
      try {
        const res = await fetch(url, { method: "HEAD", redirect: "manual" });
        const status = res.status;
        const location = res.headers.get("location");
        if (status >= 300 && status < 400 && location) {
          setMiniOutput(`✅ Yönlendirme tespit edildi!\n\nDurum Kodu: ${status}\nHedef URL: ${location}`);
        } else {
          setMiniOutput(`ℹ️ Yönlendirme yok.\n\nDurum Kodu: ${status}\nURL doğrudan erişilebilir.`);
        }
      } catch {
        setMiniOutput("⚠️ URL'ye erişilemedi. CORS kısıtlaması olabilir.\n\nİpucu: Tarayıcı güvenlik politikası nedeniyle bazı URL'ler kontrol edilemeyebilir. Bunun yerine Google Search Console veya Screaming Frog kullanabilirsiniz.");
      }
      setMiniLoading(false);
      return;
    }

    // Canonical Checker
    if (tab.id === "canonical-checker") {
      const url = getMiniField("URL");
      if (!url) { setMiniOutput("Lütfen bir URL girin."); setMiniLoading(false); return; }
      try {
        const res = await fetch(url);
        const html = await res.text();
        const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
        if (match) {
          const canonical = match[1];
          const isSame = canonical === url || canonical === url.replace(/\/$/, "");
          setMiniOutput(`✅ Canonical etiketi bulundu!\n\nCanonical URL: ${canonical}\n\n${isSame ? "✅ Canonical URL, sayfa URL'siyle eşleşiyor." : "⚠️ Canonical URL, sayfa URL'sinden farklı! Self-referencing canonical olup olmadığını kontrol edin."}`);
        } else {
          setMiniOutput("⚠️ Bu sayfada canonical etiketi bulunamadı.\n\nÖneri: Her sayfada self-referencing canonical etiketi bulunmalıdır.");
        }
      } catch {
        setMiniOutput("⚠️ URL'ye erişilemedi. CORS kısıtlaması olabilir.\n\nİpucu: Tarayıcı güvenlik politikası nedeniyle bazı URL'ler kontrol edilemeyebilir.");
      }
      setMiniLoading(false);
      return;
    }

    setMiniLoading(false);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center gap-2 text-sm text-muted"
        >
          <Link href="/seo-toolkit" className="transition-colors hover:text-primary">
            SEO Toolkit
          </Link>
          <ChevronRight size={14} />
          <span className="text-white">{data.title}</span>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {data.title}
          </h1>
          <p className="mt-4 max-w-2xl text-muted">{data.description}</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
            <Sparkles size={16} className={`flex-shrink-0 ${aiLoading ? "animate-spin text-primary" : "text-primary"}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiChat()}
              placeholder={`Hangi araçlara ihtiyacınız var? AI ile sorun...`}
              className="w-full bg-transparent text-sm text-white placeholder-muted/50 outline-none"
            />
            <button
              onClick={handleAiChat}
              disabled={aiLoading || !query.trim()}
              className="rounded-lg bg-primary p-2 text-white transition-all hover:bg-primary-light disabled:opacity-50"
            >
              <Send size={14} />
            </button>
          </div>

          {/* AI Response */}
          {(aiResponse || aiLoading) && (
            <div className="mt-4 rounded-xl border border-border bg-surface p-5">
              {aiLoading && !aiResponse && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Sparkles size={14} className="animate-spin text-primary" /> AI düşünüyor...
                </div>
              )}
              {aiResponse && (
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                  {aiResponse.split("[[link:").map((part, idx) => {
                    if (idx === 0) return <span key={idx}>{part}</span>;
                    const linkMatch = part.match(/^([^\]]+)\|([^\]]+)\]\]([\s\S]*)/);
                    if (linkMatch) {
                      return (
                        <span key={idx}>
                          <Link href={linkMatch[1]} className="inline-flex items-center gap-1 text-primary hover:underline">
                            {linkMatch[2]}
                          </Link>
                          {linkMatch[3]}
                        </span>
                      );
                    }
                    return <span key={idx}>{part}</span>;
                  })}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* ─── Mini SEO Uygulamaları ─── */}
        {data.type === "mini-apps" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            {/* Tabs */}
            <div className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-2">
              {miniAppTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMiniOutput(""); }}
                  className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "border-primary bg-primary text-white"
                      : "border-border text-muted hover:border-primary/30 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Form */}
            {currentMiniTab && (
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="mb-6 text-lg font-bold text-white">
                  {currentMiniTab.label.replace("✨ ", "")}
                </h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    {currentMiniTab.fields.map((field) => (
                      <div key={field.label}>
                        <label className="mb-1.5 block text-xs font-medium text-muted">
                          {field.label}
                          {field.maxLen && (
                            <span className="ml-2 text-muted/50">{getMiniField(field.label).length}/{field.maxLen}</span>
                          )}
                        </label>
                        {field.textarea ? (
                          <textarea
                            placeholder={field.placeholder}
                            rows={3}
                            value={getMiniField(field.label)}
                            onChange={(e) => handleMiniFieldChange(field.label, e.target.value)}
                            className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none transition-colors focus:border-primary"
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={getMiniField(field.label)}
                            onChange={(e) => handleMiniFieldChange(field.label, e.target.value)}
                            className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/40 outline-none transition-colors focus:border-primary"
                          />
                        )}
                      </div>
                    ))}
                    {activeTab !== "serp" && (
                      <button
                        onClick={generateMiniOutput}
                        disabled={miniLoading}
                        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:opacity-50"
                      >
                        {miniLoading ? (
                          <><Sparkles size={14} className="animate-spin" /> Oluşturuluyor...</>
                        ) : currentMiniTab.aiPrompt ? (
                          <><Sparkles size={14} /> AI ile Oluştur</>
                        ) : (
                          <><Zap size={14} /> Oluştur</>
                        )}
                      </button>
                    )}
                  </div>
                  {/* Preview / Output area */}
                  <div>
                    {activeTab === "serp" ? (
                      <>
                        <label className="mb-1.5 block text-xs font-medium text-muted">SERP Önizleme</label>
                        <div className="rounded-xl border border-border bg-white p-4">
                          <p className="text-xs text-emerald-700 truncate">{getMiniField("URL") || "https://www.efehanyildiz.com › blog › seo-nedir"}</p>
                          <p className="mt-1 text-base font-semibold text-[#1a0dab] truncate">
                            {getMiniField("Meta Title") || "SEO Nedir ve Nasıl Yapılır?"}
                          </p>
                          <p className="mt-1 text-xs text-[#545454] line-clamp-2">
                            {getMiniField("Meta Description") || "SEO hakkında bilmeniz gerekenleri burada bulabilirsiniz..."}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <label className="mb-1.5 block text-xs font-medium text-muted">Çıktı</label>
                        <div className="relative rounded-xl border border-border bg-[#0a0e1a] p-4 min-h-[200px]">
                          {miniOutput ? (
                            <>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(miniOutput);
                                  setMiniCopied(true);
                                  setTimeout(() => setMiniCopied(false), 2000);
                                }}
                                className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-surface-light px-2.5 py-1.5 text-[11px] text-muted transition-all hover:text-white"
                              >
                                {miniCopied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                                {miniCopied ? "Kopyalandı" : "Kopyala"}
                              </button>
                              <pre className="whitespace-pre-wrap text-[12px] leading-relaxed text-emerald-400/80 pr-20">
                                {miniOutput}
                              </pre>
                            </>
                          ) : miniLoading ? (
                            <div className="flex items-center gap-2 text-sm text-muted">
                              <Sparkles size={14} className="animate-spin text-primary" /> AI çalışıyor...
                            </div>
                          ) : (
                            <p className="text-sm text-muted/40">Çıktı burada görünecek...</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── Teknik SEO Layout ─── */}
        {data.type === "teknik-seo" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            <JsonLdGenerator />
            <RobotsTxtGenerator />
            <SitemapXmlGenerator />

            {/* Standard Items below tools */}
            <div className="mt-8 space-y-4">
              {data.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`rounded-2xl border p-6 transition-all ${
                    item.highlighted
                      ? "border-primary/30 bg-gradient-to-r from-primary/10 to-surface"
                      : "border-border bg-surface hover:bg-surface-light"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-1 items-start gap-4">
                      {item.icon && (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                          <item.icon size={18} className="text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {item.highlightLabel && (
                            <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                              {item.highlightLabel}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm text-muted">{item.description}</p>

                        {item.links && (
                          <div className="mt-3 flex flex-col gap-1">
                            {item.links.map((link) =>
                              link.href.startsWith("/") ? (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light"
                                >
                                  {link.label}
                                </Link>
                              ) : (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light"
                                >
                                  {link.label} <ExternalLink size={12} />
                                </a>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {item.highlightCta && (
                      item.highlightCtaHref?.startsWith("/") ? (
                        <Link
                          href={item.highlightCtaHref}
                          className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                        >
                          {item.highlightCta}
                        </Link>
                      ) : (
                        <a
                          href={item.highlightCtaHref || "#"}
                          className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                        >
                          {item.highlightCta}
                        </a>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── İçerik & Meta Layout ─── */}
        {data.type === "icerik-meta" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            <SerpSnippetPreview />
            <AiBlogOutlineGenerator />

            {/* Standard Items below tools */}
            <div className="space-y-4">
              {data.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`rounded-2xl border p-6 transition-all ${
                    item.highlighted
                      ? "border-primary/30 bg-gradient-to-r from-primary/10 to-surface"
                      : "border-border bg-surface hover:bg-surface-light"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-1 items-start gap-4">
                      {item.icon && (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                          <item.icon size={18} className="text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {item.highlightLabel && (
                            <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                              {item.highlightLabel}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm text-muted">{item.description}</p>

                        {item.links && (
                          <div className="mt-3 flex flex-col gap-1">
                            {item.links.map((link) =>
                              link.href.startsWith("/") ? (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light"
                                >
                                  {link.label}
                                </Link>
                              ) : (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light"
                                >
                                  {link.label} <ExternalLink size={12} />
                                </a>
                              )
                            )}
                          </div>
                        )}

                        {item.codeSnippet && <CodeBlock code={item.codeSnippet} />}
                      </div>
                    </div>

                    {item.highlightCta && (
                      item.highlightCtaHref?.startsWith("/") ? (
                        <Link
                          href={item.highlightCtaHref}
                          className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                        >
                          {item.highlightCta}
                        </Link>
                      ) : (
                        <a
                          href={item.highlightCtaHref || "#"}
                          className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                        >
                          {item.highlightCta}
                        </a>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Local SEO Layout ─── */}
        {data.type === "local-seo" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            {/* Highlighted CTA first */}
            {data.items.filter(item => item.highlighted).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-surface p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {item.highlightLabel && (
                        <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                          {item.highlightLabel}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </div>
                  {item.highlightCta && (
                    item.highlightCtaHref?.startsWith("/") ? (
                      <Link href={item.highlightCtaHref} className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                        {item.highlightCta}
                      </Link>
                    ) : (
                      <a href={item.highlightCtaHref || "#"} className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                        {item.highlightCta}
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            ))}

            {/* Non-highlighted standard items (rehber links) */}
            {data.items.filter(item => !item.highlighted).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-all hover:bg-surface-light"
              >
                <div className="flex items-start gap-4">
                  {item.icon && (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                      <item.icon size={18} className="text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    {item.links && (
                      <div className="mt-3 flex flex-col gap-1">
                        {item.links.map((link) =>
                          link.href.startsWith("/") ? (
                            <Link key={link.label} href={link.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light">
                              {link.label}
                            </Link>
                          ) : (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light">
                              {link.label} <ExternalLink size={12} />
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Mini tools */}
            <LocalBusinessSchema />
            <GoogleMapsEmbed />
          </motion.div>
        )}

        {/* ─── Backlink Layout ─── */}
        {data.type === "backlink" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            {/* Highlighted CTA first */}
            {data.items.filter(item => item.highlighted).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-surface p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {item.icon && (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                        <item.icon size={18} className="text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {item.highlightLabel && (
                          <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                            {item.highlightLabel}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>
                    </div>
                  </div>
                  {item.highlightCta && (
                    item.highlightCtaHref?.startsWith("/") ? (
                      <Link href={item.highlightCtaHref} className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                        {item.highlightCta}
                      </Link>
                    ) : (
                      <a href={item.highlightCtaHref || "#"} className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                        {item.highlightCta}
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            ))}

            {/* Non-highlighted items */}
            {data.items.filter(item => !item.highlighted).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-all hover:bg-surface-light"
              >
                <div className="flex items-start gap-4">
                  {item.icon && (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                      <item.icon size={18} className="text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    {item.links && (
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {item.links.map((link) =>
                          link.href.startsWith("/") ? (
                            <Link key={link.label} href={link.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light">
                              {link.label}
                            </Link>
                          ) : (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light">
                              {link.label} <ExternalLink size={12} />
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── WordPress SEO Layout ─── */}
        {data.type === "wordpress-seo" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            {/* Schema Downloads Card */}
            {data.items.filter(item => item.downloads).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-surface p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  {item.icon && (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon size={18} className="text-primary" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      {item.highlightLabel && (
                        <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">{item.highlightLabel}</span>
                      )}
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {item.downloads!.map((dl) => (
                    <a
                      key={dl.label}
                      href={dl.href}
                      download
                      className="flex items-center gap-2 rounded-xl border border-border bg-[#0a0e1a] px-4 py-3 text-sm text-white transition-all hover:border-primary/40 hover:bg-surface-light"
                    >
                      <Download size={14} className="text-primary" />
                      {dl.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Highlighted CTA items (Checklist etc.) */}
            {data.items.filter(item => item.highlighted && !item.downloads).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-surface p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {item.icon && (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon size={18} className="text-primary" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        {item.highlightLabel && (
                          <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">{item.highlightLabel}</span>
                        )}
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>
                    </div>
                  </div>
                  {item.highlightCta && (
                    item.highlightCtaHref?.startsWith("/") ? (
                      <Link href={item.highlightCtaHref} className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                        {item.highlightCta}
                      </Link>
                    ) : (
                      <a href={item.highlightCtaHref || "#"} className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
                        {item.highlightCta}
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            ))}

            {/* Standard items (rehber links, plugins) */}
            {data.items.filter(item => !item.highlighted && !item.downloads).map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-all hover:bg-surface-light"
              >
                <div className="flex items-start gap-4">
                  {item.icon && (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                      <item.icon size={18} className="text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    {item.links && (
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {item.links.map((link) =>
                          link.href.startsWith("/") ? (
                            <Link key={link.label} href={link.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light">
                              {link.label}
                            </Link>
                          ) : (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light">
                              {link.label} <ExternalLink size={12} />
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* functions.php Snippet Arşivi */}
            <FunctionsPhpSnippets />
          </motion.div>
        )}

        {/* ─── SEO Otomasyon Layout ─── */}
        {data.type === "seo-otomasyon" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 space-y-6"
          >
            <AiPromptGenerator />

            {/* Standard Items (rehber links) */}
            {data.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-2xl border border-border bg-surface p-6 transition-all hover:bg-surface-light"
              >
                <div className="flex items-start gap-4">
                  {item.icon && (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                      <item.icon size={18} className="text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    {item.links && (
                      <div className="mt-3 flex flex-col gap-1">
                        {item.links.map((link) =>
                          link.href.startsWith("/") ? (
                            <Link key={link.label} href={link.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light">
                              {link.label}
                            </Link>
                          ) : (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light">
                              {link.label} <ExternalLink size={12} />
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <PythonSeoScript />
            <UrlParser />
          </motion.div>
        )}

        {/* ─── Standard Items ─── */}
        {data.type !== "mini-apps" && data.type !== "teknik-seo" && data.type !== "icerik-meta" && data.type !== "local-seo" && data.type !== "backlink" && data.type !== "wordpress-seo" && data.type !== "seo-otomasyon" && (
          <div className="mt-12 space-y-4">
            {data.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={`rounded-2xl border p-6 transition-all ${
                  item.highlighted
                    ? "border-primary/30 bg-gradient-to-r from-primary/10 to-surface"
                    : "border-border bg-surface hover:bg-surface-light"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-1 items-start gap-4">
                    {item.icon && (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-light">
                        <item.icon size={18} className="text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {item.highlightLabel && (
                          <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-bold text-white">
                            {item.highlightLabel}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>

                      {item.links && (
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                          {item.links.map((link) =>
                            link.href.startsWith("/") ? (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light"
                              >
                                {link.label}
                              </Link>
                            ) : (
                              <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light"
                              >
                                {link.label} <ExternalLink size={12} />
                              </a>
                            )
                          )}
                        </div>
                      )}

                      {item.downloads && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {item.downloads.map((d) => (
                            <a
                              key={d.label}
                              href={d.href}
                              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-light px-4 py-2 text-xs font-medium text-muted transition-all hover:border-primary/30 hover:text-white"
                            >
                              <Download size={12} />
                              {d.label}
                            </a>
                          ))}
                        </div>
                      )}

                      {item.codeTabs && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {item.codeTabs.map((ct, idx) => (
                              <button
                                key={ct.label}
                                onClick={() => setActiveCodeTab(idx)}
                                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all ${
                                  activeCodeTab === idx
                                    ? "border-primary bg-primary text-white"
                                    : "border-border text-muted hover:border-primary/30"
                                }`}
                              >
                                {ct.label}
                              </button>
                            ))}
                          </div>
                          <CodeBlock code={item.codeTabs[activeCodeTab]?.code || ""} />
                        </div>
                      )}

                      {item.codeSnippet && <CodeBlock code={item.codeSnippet} />}
                    </div>
                  </div>

                  {item.highlightCta && (
                    item.highlightCtaHref?.startsWith("/") ? (
                      <Link
                        href={item.highlightCtaHref}
                        className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        {item.highlightCta}
                      </Link>
                    ) : (
                      <a
                        href={item.highlightCtaHref || "#"}
                        target={item.highlightCtaHref?.startsWith("http") ? "_blank" : undefined}
                        rel={item.highlightCtaHref?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex-shrink-0 rounded-xl border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                      >
                        {item.highlightCta}
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/seo-toolkit"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Tüm Araçlara Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
