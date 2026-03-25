"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="iletisim" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            İletişim
          </p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Birlikte Çalışalım
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Projeniz veya ihtiyacınız hakkında konuşmak için formu doldurun veya
            doğrudan iletişime geçin.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="gradient-border rounded-xl bg-surface p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">E-posta</p>
                  <a
                    href="mailto:me@efehanyildiz.com"
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    me@efehanyildiz.com
                  </a>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-xl bg-surface p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Telefon</p>
                  <a
                    href="tel:+905527328055"
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    +90 552 732 8055
                  </a>
                </div>
              </div>
            </div>

            <div className="gradient-border rounded-xl bg-surface p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Konum</p>
                  <p className="text-sm text-muted">Samsun / Türkiye</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="gradient-border space-y-5 rounded-2xl bg-surface p-8 lg:col-span-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-muted">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-muted">
                  E-posta
                </label>
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted">
                Konu
              </label>
              <input
                type="text"
                placeholder="Nasıl yardımcı olabilirim?"
                className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted">
                Mesajınız
              </label>
              <textarea
                rows={5}
                placeholder="Mesajınızı yazın..."
                className="w-full resize-none rounded-lg border border-border bg-surface-light px-4 py-3 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
            >
              Gönder
              <Send
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
