import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dijital Pazarlama Hizmetleri",
  description:
    "SEO danışmanlığı, teknik SEO denetimi, dijital pazarlama stratejisi, WordPress optimizasyonu ve web tasarım hizmetleri. İşletmenizi organik aramalarda üst sıralara taşıyın.",
  alternates: {
    canonical: "https://www.efehanyildiz.com/hizmetler",
  },
  openGraph: {
    title: "Hizmetler — Efehan Yıldız",
    description:
      "SEO danışmanlığı, teknik SEO, dijital pazarlama ve WordPress optimizasyonu hizmetleri.",
    url: "https://www.efehanyildiz.com/hizmetler",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Efehan Yıldız — Hizmetler" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dijital Pazarlama Hizmetleri",
    description: "SEO danışmanlığı, teknik SEO denetimi, dijital pazarlama stratejisi ve WordPress optimizasyonu.",
    images: ["/og-image.jpg"],
  },
};

export default function HizmetlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
