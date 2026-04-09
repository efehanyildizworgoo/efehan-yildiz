import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Toolkit | Online SEO Aracı & Rehberi",
  description:
    "50+ ücretsiz SEO aracı, AI destekli meta etiket oluşturucu, SERP önizleme, teknik SEO rehberleri, WordPress SEO araçları ve daha fazlası. Efehan Yıldız tarafından hazırlanmıştır.",
  alternates: {
    canonical: "https://www.efehanyildiz.com/seo-toolkit",
  },
  openGraph: {
    title: "SEO Toolkit — Ücretsiz SEO Araçları",
    description:
      "50+ ücretsiz SEO aracı, AI destekli araçlar, rehberler ve kapsamlı SEO kaynakları.",
    url: "https://www.efehanyildiz.com/seo-toolkit",
  },
};

export default function SeoToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
