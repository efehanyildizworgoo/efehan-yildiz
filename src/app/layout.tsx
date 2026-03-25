import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const SITE_URL = "https://www.efehanyildiz.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dijital Pazarlama Uzmanı & Eğitmeni - Efehan Yıldız",
    template: "%s | Efehan Yıldız",
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
    google: "GOOGLE_SITE_VERIFICATION_CODE",
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
        "https://www.linkedin.com/in/efehanyildiz/",
        "https://www.youtube.com/@efehanyildizcom",
        "https://www.instagram.com/efehanyildizcom/",
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
        availableLanguage: "Turkish",
      },
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
