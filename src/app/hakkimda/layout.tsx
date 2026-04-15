import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Efehan Yıldız Kimdir?",
  description:
    "Efehan Yıldız kimdir? SEO, dijital pazarlama ve web teknolojileri alanında uzmanlaşmış danışman ve eğitmenin kariyer yolculuğu, uzmanlık alanları ve başarıları.",
  alternates: {
    canonical: "https://www.efehanyildiz.com/hakkimda",
  },
  openGraph: {
    title: "Hakkımda — Efehan Yıldız",
    description:
      "SEO uzmanı ve dijital pazarlama danışmanı Efehan Yıldız'ın kariyer yolculuğu ve uzmanlık alanları.",
    url: "https://www.efehanyildiz.com/hakkimda",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Efehan Yıldız — Hakkımda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Efehan Yıldız Kimdir?",
    description: "SEO, dijital pazarlama ve web teknolojileri alanında uzmanlaşmış danışman ve eğitmenin kariyer yolculuğu.",
    images: ["/og-image.jpg"],
  },
};

export default function HakkimdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
