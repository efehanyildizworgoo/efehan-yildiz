import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımda — Efehan Yıldız, SEO Uzmanı & Dijital Pazarlama Danışmanı",
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
  },
};

export default function HakkimdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
