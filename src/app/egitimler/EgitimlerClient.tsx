"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Video,
} from "lucide-react";
import { trainings } from "@/data/trainings";

export default function EgitimlerClient() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Eğitimler
            </p>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Birebir Online{" "}
              <span className="text-primary">Eğitimler</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-muted">
              Dijital pazarlama, SEO ve WordPress alanlarında birebir online eğitimlerle
              kariyer hedefinize ulaşın. Teoriden pratiğe, her şeyi birlikte öğreniyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trainings */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-8">
            {trainings.map((training, i) => (
              <motion.div
                key={training.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`gradient-border overflow-hidden rounded-3xl bg-surface`}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1 p-8 lg:p-10">
                    <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${training.bgColor}`}>
                      <training.icon size={24} className={training.color} />
                    </div>
                    <h2 className="mb-3 text-2xl font-bold text-white">{training.title}</h2>
                    <p className="mb-6 text-sm leading-relaxed text-muted">{training.description}</p>
                    <div className="mb-6 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock size={14} className="text-primary" />
                        {training.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Users size={14} className="text-primary" />
                        {training.students} Öğrenci
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Video size={14} className="text-primary" />
                        {training.format}
                      </div>
                    </div>
                    <Link
                      href={`/egitimler/${training.slug}`}
                      className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
                    >
                      Detayları İncele
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className="border-t border-border bg-surface-light p-8 lg:w-96 lg:border-l lg:border-t-0 lg:p-10">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Eğitim İçeriği</h3>
                    <ul className="space-y-3">
                      {training.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted">
                          <CheckCircle2 size={14} className={`flex-shrink-0 ${training.color}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white">
            Hangi Eğitim Size Uygun?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Hedeflerinize en uygun eğitimi birlikte belirleyelim. Ücretsiz ön görüşme
            için hemen iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
          >
            Ücretsiz Ön Görüşme
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
