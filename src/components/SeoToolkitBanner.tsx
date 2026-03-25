"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Search, BarChart3, Code2 } from "lucide-react";

export default function SeoToolkitBanner() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-primary/20"
          style={{
            background:
              "linear-gradient(135deg, #0c1029 0%, #0d1340 50%, #0c1029 100%)",
            boxShadow:
              "0 0 60px rgba(29, 71, 240, 0.08), 0 0 120px rgba(29, 71, 240, 0.04)",
          }}
        >
          {/* Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-16 right-20 h-52 w-52 rounded-full bg-primary/5 blur-[80px]" />

          <div className="relative flex flex-col items-center gap-10 p-10 md:flex-row md:p-16">
            {/* Icons grid */}
            <div className="flex flex-shrink-0 gap-3">
              {[Search, BarChart3, Code2].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10"
                >
                  <Icon size={24} className="text-primary" />
                </motion.div>
              ))}
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs font-semibold text-primary">
                  Tamamen Ücretsiz
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                SEO Toolkit
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                SEO sürecinizi hızlandıracak ücretsiz araçlar, rehberler ve
                yapay zeka asistanı tek bir platformda. Analiz araçlarından
                teknik SEO&apos;ya, anahtar kelime araştırmasından içerik
                optimizasyonuna kadar ihtiyacınız olan her şey burada.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                <Link
                  href="/seo-toolkit"
                  className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
                >
                  Toolkit&apos;i Keşfet
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
