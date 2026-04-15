import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const SITE_URL = "https://www.efehanyildiz.com";
/* Canonical domain: www.efehanyildiz.com — non-www redirects here via CapRover */
const GTM_ID = "GTM-PPG82CS3";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dijital Pazarlama Uzmanı & Eğitmeni - Efehan Yıldız",
    template: "%s - Efehan Yıldız",
  },
  description:
    "Efehan Yıldız ile SEO, dijital pazarlama, teknik SEO danışmanlığı ve uygulamalı eğitimler. Veriye dayalı stratejilerle organik trafiğinizi büyütün.",
  keywords: [
    "SEO uzmanı",
    "dijital pazarlama danışmanı",
    "SEO eğitimi",
    "teknik SEO",
    "Efehan Yıldız",
    "SEO danışmanlık",
    "WordPress SEO",
    "anahtar kelime araştırma",
    "backlink stratejisi",
    "Google SEO",
    "SEO araçları",
    "organik trafik",
  ],
  authors: [{ name: "Efehan Yıldız", url: SITE_URL }],
  creator: "Efehan Yıldız",
  publisher: "Efehan Yıldız",
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
    siteName: "Efehan Yıldız",
    title: "Dijital Pazarlama Uzmanı & Eğitmeni - Efehan Yıldız",
    description:
      "SEO, dijital pazarlama, teknik SEO danışmanlığı ve uygulamalı eğitimler. Veriye dayalı stratejilerle organik trafiğinizi büyütün.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Efehan Yıldız — SEO Uzmanı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Pazarlama Uzmanı & Eğitmeni - Efehan Yıldız",
    description:
      "SEO, dijital pazarlama danışmanlığı ve uygulamalı eğitimler.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "ojO7x1neGLaSt-JFk-TnBXdGSTBivtc6Hs4Pxc7rOq0",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Efehan Yıldız",
      description: "SEO Uzmanı & Dijital Pazarlama Danışmanı",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "tr-TR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/seo-toolkit?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Efehan Yıldız",
      url: SITE_URL,
      jobTitle: "SEO Uzmanı & Dijital Pazarlama Danışmanı",
      description:
        "SEO, teknik SEO, dijital pazarlama ve WordPress optimizasyonu alanlarında uzman danışman ve eğitmen.",
      sameAs: [
        "https://www.linkedin.com/in/efehan-yildiz/",
        "https://www.youtube.com/@efehanyildizcom",
        "https://www.instagram.com/yldzefehan",
        "https://wa.me/905527328055",
      ],
      knowsAbout: [
        "SEO",
        "Teknik SEO",
        "Dijital Pazarlama",
        "WordPress",
        "Google Analytics",
        "Google Search Console",
        "Anahtar Kelime Araştırma",
        "İçerik Stratejisi",
        "Backlink Stratejisi",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Efehan Yıldız",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      founder: { "@id": `${SITE_URL}/#person` },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+90-552-732-8055",
        contactType: "customer service",
        availableLanguage: ["Turkish", "English"],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Efehan Yıldız — SEO Danışmanlığı",
      url: SITE_URL,
      description:
        "SEO danışmanlığı, teknik SEO denetimi, dijital pazarlama stratejisi ve WordPress optimizasyonu hizmetleri.",
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: {
        "@type": "Country",
        name: "Türkiye",
      },
      serviceType: [
        "SEO Danışmanlığı",
        "Teknik SEO Denetimi",
        "Dijital Pazarlama Stratejisi",
        "WordPress Optimizasyonu",
        "SEO Eğitimi",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${SITE_URL}/hizmetler` },
        { "@type": "ListItem", position: 3, name: "Eğitimler", item: `${SITE_URL}/egitimler` },
        { "@type": "ListItem", position: 4, name: "SEO Toolkit", item: `${SITE_URL}/seo-toolkit` },
        { "@type": "ListItem", position: 5, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 6, name: "İletişim", item: `${SITE_URL}/iletisim` },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
