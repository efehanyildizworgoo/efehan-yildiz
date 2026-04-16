import type { Metadata } from "next";
import EgitimlerClient from "./EgitimlerClient";

export const metadata: Metadata = {
  title: "Eğitimler - Efehan Yıldız",
  description: "Dijital pazarlama, SEO ve web tasarım alanlarında birebir online eğitimler. Kariyer hedefinize ulaşın.",
  openGraph: {
    title: "Eğitimler - Efehan Yıldız",
    description: "Birebir online eğitimlerle dijital dünyada uzmanlaşın.",
    url: "https://www.efehanyildiz.com/egitimler",
  },
};

export default function EgitimlerPage() {
  return <EgitimlerClient />;
}
