"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Linkedin,
  Youtube,
  Instagram,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 552 732 80 55",
    href: "tel:+905527328055",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "me@efehanyildiz.com",
    href: "mailto:me@efehanyildiz.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "WhatsApp ile yazın",
    href: "https://wa.me/905527328055",
  },
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/efehan-yildiz/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/yldzefehan", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@efehanyildizcom", label: "YouTube" },
];

export default function IletisimPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "SEO Danışmanlığı", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gönderilemedi");
      setSent(true);
      setFormData({ name: "", email: "", subject: "SEO Danışmanlığı", message: "" });
    } catch {
      setError("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              İletişim
            </p>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Birlikte{" "}
              <span className="text-primary">Çalışalım</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-muted">
              Projeniz hakkında konuşmak, teklif almak veya sadece merhaba demek için
              aşağıdaki kanallardan bana ulaşabilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-border bg-surface p-8 lg:p-10"
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Mesaj Gönderin</h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="mb-4 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Mesajınız Gönderildi!</h3>
                  <p className="mt-2 text-sm text-muted">En kısa sürede size dönüş yapacağım.</p>
                  <button onClick={() => setSent(false)} className="mt-6 rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted transition-all hover:text-white">Yeni Mesaj Gönder</button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-muted">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-muted">
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted">
                    Konu
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-muted outline-none transition-colors focus:border-primary">
                    <option>SEO Danışmanlığı</option>
                    <option>Web Tasarım</option>
                    <option>Online Eğitim</option>
                    <option>Marka Danışmanlığı</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted">
                    Mesajınız
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
                    placeholder="Projeniz hakkında kısaca bilgi verin..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)] disabled:opacity-50"
                >
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {sending ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>
              </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Contact cards */}
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-5 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/30 hover:bg-surface-light"
                >
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <info.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      {info.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">{info.value}</p>
                  </div>
                </a>
              ))}

              {/* Social */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  Sosyal Medya
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-light text-muted transition-all hover:border-primary hover:text-primary"
                    >
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-surface p-6">
                <h3 className="text-lg font-bold text-white">
                  Hızlı yanıt mı istiyorsunuz?
                </h3>
                <p className="mt-2 text-sm text-muted">
                  WhatsApp üzerinden anında iletişime geçebilirsiniz.
                </p>
                <a
                  href="https://wa.me/905527328055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
                >
                  <MessageCircle size={16} />
                  WhatsApp ile Yazın
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
