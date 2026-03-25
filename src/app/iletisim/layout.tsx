import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim — SEO Danışmanlık İçin Hemen Ulaşın",
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
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
