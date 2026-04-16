import type { Metadata } from "next";
import HizmetlerClient from "./HizmetlerClient";

export const metadata: Metadata = {
  title: "Hizmetler - Efehan Yıldız",
  description: "SEO danışmanlığı, web tasarım, dijital pazarlama, Google Ads yönetimi ve marka danışmanlığı hizmetleri.",
  openGraph: {
    title: "Hizmetler - Efehan Yıldız",
    description: "Dijitalde büyümeniz için profesyonel çözümler.",
    url: "https://www.efehanyildiz.com/hizmetler",
  },
};

export default function HizmetlerPage() {
  return <HizmetlerClient />;
}
