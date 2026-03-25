"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid pt-20">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:py-24 lg:gap-16">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Efehan Yıldız
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Dijital Pazarlama
            <br />
            <span className="glow-text text-primary">Uzmanı & Eğitmeni</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted md:mx-0 md:text-lg">
            Markanızı dijitalde büyütecek stratejiler, SEO optimizasyonu, web
            tasarım mentörlüğü ve kapsamlı online eğitimlerle yanınızdayım.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <a
              href="#iletisim"
              className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
            >
              İletişime Geç
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#egitimler"
              className="flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-medium text-muted transition-all hover:border-primary/40 hover:text-white"
            >
              <Play size={16} className="text-primary" />
              Eğitimlere Göz At
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex justify-center gap-8 md:justify-start">
            {[
              { value: "50+", label: "Mutlu Müşteri" },
              { value: "10K+", label: "Öğrenci" },
              { value: "5+", label: "Yıl Deneyim" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex-shrink-0"
        >
          <div className="glow-blue relative h-[350px] w-[300px] overflow-hidden rounded-2xl border border-border md:h-[450px] md:w-[380px]">
            <Image
              src="/ey-giris.png"
              alt="Efehan Yıldız"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative floating card */}
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-md">
            <p className="text-xs text-muted">Dijital Pazarlama</p>
            <p className="text-sm font-semibold text-white">Uzman Danışman</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
