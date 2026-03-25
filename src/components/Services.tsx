"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor, Search, PenTool, BarChart3, Megaphone, ArrowRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Online WordPress Eğitimi",
    description:
      "WordPress ile profesyonel web siteleri oluşturmayı sıfırdan öğrenin. Tema, eklenti ve yönetim paneli eğitimi.",
    icon: Monitor,
    href: "/egitimler/wordpress",
  },
  {
    num: "02",
    title: "Online SEO Eğitimi",
    description:
      "Arama motorlarında üst sıralara çıkmak için gereken tüm SEO tekniklerini pratik örneklerle öğrenin.",
    icon: Search,
    href: "/egitimler/seo",
  },
  {
    num: "03",
    title: "Web Tasarım Mentörlüğü",
    description:
      "Birebir mentörlük ile web tasarım projelerinizi profesyonel seviyeye taşıyın. UX/UI odaklı rehberlik.",
    icon: PenTool,
    href: "/hizmetler/web-tasarim",
  },
  {
    num: "04",
    title: "SEO Mentörlüğü",
    description:
      "Sitenizin SEO performansını artırmak için kişiselleştirilmiş strateji ve uygulama desteği.",
    icon: BarChart3,
    href: "/hizmetler/seo-danismanligi",
  },
  {
    num: "05",
    title: "Marka Danışmanlığı",
    description:
      "Dijital marka stratejinizi oluşturun, hedef kitlenize doğru mesajlarla ulaşın.",
    icon: Megaphone,
    href: "/hizmetler/marka-danismanligi",
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Hizmetler
          </p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Neler Yapıyorum?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Dijital dünyada markanızı büyütmek için ihtiyacınız olan tüm
            hizmetleri sunuyorum.
          </p>
        </motion.div>

        <div className="space-y-3">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className="gradient-border group flex cursor-pointer flex-col items-start gap-4 rounded-xl bg-surface p-6 transition-all hover:bg-surface-light sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-primary">
                    {service.num}
                  </span>
                  <service.icon
                    size={20}
                    className="text-muted transition-colors group-hover:text-primary"
                  />
                  <h3 className="text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 sm:max-w-md">
                  <p className="text-sm text-muted">{service.description}</p>
                  <ArrowRight
                    size={18}
                    className="hidden flex-shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-primary sm:block"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(29,71,240,0.4)]"
          >
            Tümünü Gör
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
