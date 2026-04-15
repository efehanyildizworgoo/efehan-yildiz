import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Eğitimleri — Uygulamalı SEO & Dijital Pazarlama Kursları",
  description:
    "Efehan Yıldız'ın uygulamalı SEO eğitimleri, dijital pazarlama kursları ve mentörlük programları. Başlangıçtan ileri seviyeye kadar kapsamlı eğitim içerikleri.",
  alternates: {
    canonical: "https://www.efehanyildiz.com/egitimler",
  },
  openGraph: {
    title: "SEO Eğitimleri — Efehan Yıldız",
    description:
      "Uygulamalı SEO eğitimleri, dijital pazarlama kursları ve mentörlük programları.",
    url: "https://www.efehanyildiz.com/egitimler",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Efehan Yıldız — Eğitimler" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Eğitimleri — Uygulamalı SEO & Dijital Pazarlama Kursları",
    description: "Uygulamalı SEO eğitimleri, dijital pazarlama kursları ve mentörlük programları.",
    images: ["/og-image.jpg"],
  },
};

export default function EgitimlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
