"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Globe,
  BarChart3,
  Megaphone,
  PenTool,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "SEO Danışmanlığı",
    slug: "seo-danismanligi",
    description:
      "Google'da üst sıralara çıkmanız için kapsamlı SEO stratejisi, teknik optimizasyon ve içerik planlaması.",
    features: [
      "Anahtar kelime araştırması",
      "Teknik SEO denetimi",
      "İçerik stratejisi",
      "Backlink stratejisi",
      "Aylık raporlama",
    ],
  },
  {
    icon: Globe,
    title: "Web Tasarım & Geliştirme",
    slug: "web-tasarim",
    description:
      "WordPress altyapısıyla modern, hızlı ve SEO uyumlu web siteleri tasarlıyorum.",
    features: [
      "Responsive tasarım",
      "WordPress geliştirme",
      "Hız optimizasyonu",
      "SSL & güvenlik",
      "Bakım ve destek",
    ],
  },
  {
    icon: BarChart3,
    title: "Dijital Pazarlama Stratejisi",
    slug: "dijital-pazarlama",
    description:
      "Markanızın dijitalde büyümesi için bütünsel strateji oluşturuyorum.",
    features: [
      "Rakip analizi",
      "Hedef kitle belirleme",
      "Kanal stratejisi",
      "KPI belirleme",
      "Performans takibi",
    ],
  },
  {
    icon: Megaphone,
    title: "Google Ads Yönetimi",
    slug: "google-ads",
    description:
      "Doğru bütçe, doğru hedefleme ile maksimum dönüşüm sağlayan reklam kampanyaları.",
    features: [
      "Kampanya kurulumu",
      "A/B testleri",
      "Dönüşüm takibi",
      "Bütçe optimizasyonu",
      "Aylık raporlama",
    ],
  },
  {
    icon: PenTool,
    title: "Marka Danışmanlığı",
    slug: "marka-danismanligi",
    description:
      "Markanızın dijital kimliğini oluşturmak ve güçlendirmek için stratejik danışmanlık.",
    features: [
      "Marka konumlandırma",
      "Dijital kimlik",
      "İçerik stratejisi",
      "Sosyal medya planı",
      "Kriz yönetimi",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Ticaret Çözümleri",
    slug: "e-ticaret",
    description:
      "WooCommerce ile satışa hazır, performanslı e-ticaret siteleri kuruyorum.",
    features: [
      "WooCommerce kurulumu",
      "Ödeme entegrasyonları",
      "Ürün yönetimi",
      "SEO optimizasyonu",
      "Kargo entegrasyonu",
    ],
  },
  {
    icon: GraduationCap,
    title: "Web Tasarım Mentörlüğü",
    slug: "/egitimler/web-tasarim",
    description:
      "Birebir mentörlük ile web tasarım becerilerinizi profesyonel seviyeye taşıyın. UI/UX odaklı rehberlik.",
    features: [
      "Birebir canlı dersler",
      "UI/UX prensipleri",
      "Responsive tasarım",
      "Elementor ile uygulama",
      "Portföy oluşturma",
    ],
  },
  {
    icon: GraduationCap,
    title: "SEO Mentörlüğü",
    slug: "/egitimler/seo",
    description:
      "Sitenizin SEO performansını artırmak için kişiselleştirilmiş strateji ve birebir uygulama desteği.",
    features: [
      "Birebir canlı dersler",
      "Teknik SEO denetimi",
      "Anahtar kelime stratejisi",
      "İçerik optimizasyonu",
      "Performans raporlama",
    ],
  },
];

export default function HizmetlerClient() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Hizmetler
            </p>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Dijitalde Büyümeniz İçin{" "}
              <span className="text-primary">Profesyonel Çözümler</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-muted">
              SEO'dan web tasarıma, dijital pazarlamadan marka danışmanlığına kadar
              markanızın ihtiyaç duyduğu tüm dijital hizmetler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={service.slug.startsWith("/") ? service.slug : `/hizmetler/${service.slug}`}
                  className="gradient-border group flex flex-col rounded-2xl bg-surface p-8 transition-all hover:bg-surface-light h-full"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-auto space-y-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <CheckCircle2 size={14} className="flex-shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-primary">
                    Detayları İncele
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white">
            Projeniz İçin Teklif Alın
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            İhtiyaçlarınızı anlatalım, size özel bir strateji ve teklif hazırlayalım.
          </p>
          <Link
            href="/iletisim"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
          >
            İletişime Geçin
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
