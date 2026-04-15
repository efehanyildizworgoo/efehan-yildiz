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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Efehan Yıldız — Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — SEO, Dijital Pazarlama & Web Teknolojileri",
    description: "SEO stratejileri, dijital pazarlama ipuçları ve web teknolojileri hakkında güncel yazılar.",
    images: ["/og-image.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
