import Image from "next/image";
import Link from "next/link";
import { Linkedin, Youtube, Instagram, MessageCircle, Globe } from "lucide-react";

const footerLinks = {
  hizmetler: [
    { label: "Online WordPress Eğitimi", href: "/egitimler/wordpress" },
    { label: "Online SEO Eğitimi", href: "/egitimler/seo" },
    { label: "Web Tasarım Mentörlüğü", href: "/egitimler/web-tasarim" },
    { label: "SEO Mentörlüğü", href: "/hizmetler/seo-mentorlugu" },
    { label: "Marka Danışmanlığı", href: "/hizmetler/marka-danismanligi" },
  ],
  kurumsal: [
    { label: "Hakkımda", href: "/hakkimda" },
    { label: "İletişim", href: "/iletisim" },
    { label: "SEO Toolkit", href: "/seo-toolkit" },
  ],
};

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/efehan-yildiz/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/yldzefehan", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@efehanyildizcom", label: "YouTube" },
  { icon: MessageCircle, href: "https://wa.me/905527328055", label: "WhatsApp" },
  { icon: Globe, href: "https://www.worgoo.com/", label: "Worgoo" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image src="/logo.svg" alt="Efehan Yıldız" width={140} height={32} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Dijital pazarlama alanında uzmanlaşmış bir profesyonelim. Markaların
              dijitalde büyümesine yardımcı oluyorum. Eğitimler, danışmanlık ve
              stratejik çözümlerle yanınızdayım.
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Hizmetler
            </h3>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kurumsal
            </h3>
            <ul className="space-y-3">
              {footerLinks.kurumsal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+905527328055" className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
                  <span>📞</span> +90 552 732 80 55
                </a>
              </li>
              <li>
                <a href="mailto:me@efehanyildiz.com" className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
                  <span>✉️</span> me@efehanyildiz.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted">
                <span>📍</span>
                <span>Nilüfer, Bursa / Türkiye</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-light text-muted transition-all hover:border-primary hover:text-primary"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted">
            Copyright © {new Date().getFullYear()} | Dijital Pazarlama Uzmanı - Efehan Yıldız | Tüm Hakları Saklıdır.
          </p>
          <a
            href="https://www.worgoo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image src="/worgoo-logo-beyaz.svg" alt="Worgoo" width={80} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
