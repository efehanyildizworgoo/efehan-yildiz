import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişime Geçin",
  description:
    "SEO danışmanlığı, dijital pazarlama hizmeti veya eğitim talepleriniz için Efehan Yıldız ile iletişime geçin. WhatsApp, e-posta veya form ile ulaşabilirsiniz.",
  alternates: {
    canonical: "https://www.efehanyildiz.com/iletisim",
  },
  openGraph: {
    title: "İletişim — Efehan Yıldız",
    description:
      "SEO danışmanlığı ve dijital pazarlama hizmetleri için iletişime geçin.",
    url: "https://www.efehanyildiz.com/iletisim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Efehan Yıldız — İletişim" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişime Geçin",
    description: "SEO danışmanlığı, dijital pazarlama hizmeti veya eğitim talepleriniz için iletişime geçin.",
    images: ["/og-image.jpg"],
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
