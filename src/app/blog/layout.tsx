import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — SEO, Dijital Pazarlama & Web Teknolojileri Yazıları",
  description:
    "SEO stratejileri, dijital pazarlama ipuçları, WordPress optimizasyonu ve web teknolojileri hakkında güncel blog yazıları. Efehan Yıldız tarafından yazılmıştır.",
  alternates: {
    canonical: "https://www.efehanyildiz.com/blog",
  },
  openGraph: {
    title: "Blog — Efehan Yıldız",
    description:
      "SEO, dijital pazarlama ve web teknolojileri hakkında güncel yazılar.",
    url: "https://www.efehanyildiz.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
