"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Users,
  Video,
  BarChart3,
  ChevronDown,
  BookOpen,
  Target,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { getTrainingBySlug, trainings } from "@/data/trainings";

export default function TrainingDetailClient({ slug }: { slug: string }) {
  const training = getTrainingBySlug(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number>(0);

  if (!training) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Eğitim Bulunamadı</h1>
          <p className="mt-2 text-muted">Aradığınız eğitim mevcut değil.</p>
          <Link
            href="/egitimler"
            className="mt-6 inline-flex items-center gap-2 text-primary hover:text-primary-light"
          >
            <ArrowLeft size={16} />
            Eğitimlere Dön
          </Link>
        </div>
      </div>
    );
  }

  const Icon = training.icon;

  // Get other trainings for "Diğer Eğitimler" section
  const otherTrainings = trainings.filter((t) => t.slug !== slug);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2 text-sm text-muted">
              <Link href="/" className="hover:text-white transition-colors">
                Ana Sayfa
              </Link>
              <span>/</span>
              <Link
                href="/egitimler"
                className="hover:text-white transition-colors"
              >
                Eğitimler
              </Link>
              <span>/</span>
              <span className="text-white">{training.shortTitle}</span>
            </div>

            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              {/* Left - Info */}
              <div className="max-w-2xl">
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${training.bgColor}`}
                >
                  <Icon size={28} className={training.color} />
                </div>
                <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
                  {training.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  {training.longDescription}
                </p>

                {/* Meta badges */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-light px-4 py-2.5 text-sm text-muted">
                    <Clock size={16} className="text-primary" />
                    {training.duration}
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-light px-4 py-2.5 text-sm text-muted">
                    <Users size={16} className="text-primary" />
                    {training.students} Öğrenci
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-light px-4 py-2.5 text-sm text-muted">
                    <Video size={16} className="text-primary" />
                    {training.format}
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-light px-4 py-2.5 text-sm text-muted">
                    <BarChart3 size={16} className="text-primary" />
                    {training.level}
                  </div>
                </div>
              </div>

              {/* Right - CTA Card */}
              <div className="w-full lg:w-96 shrink-0">
                <div className="gradient-border rounded-2xl bg-surface-light p-8">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Eğitime Başla
                  </h3>
                  <p className="mb-6 text-sm text-muted">
                    Birebir online eğitim ile hedefinize ulaşın
                  </p>

                  <ul className="mb-8 space-y-3">
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-primary"
                      />
                      Birebir canlı dersler
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-primary"
                      />
                      Esnek program
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-primary"
                      />
                      Gerçek proje üzerinde uygulama
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-primary"
                      />
                      3 ay sonrası destek
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-primary"
                      />
                      Sertifika
                    </li>
                  </ul>

                  <Link
                    href="/iletisim"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
                  >
                    Ücretsiz Ön Görüşme
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <p className="mt-4 text-center text-xs text-muted">
                    Ön görüşme tamamen ücretsiz ve bağlayıcı değildir.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={20} className="text-primary" />
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Müfredat
              </p>
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">
              Eğitim İçeriği
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              {training.curriculum.length} modül, {training.duration} birebir
              eğitim. Her modül uygulamalı projelerle pekiştirilir.
            </p>
          </motion.div>

          <div className="space-y-4">
            {training.curriculum.map((module, i) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="gradient-border overflow-hidden rounded-2xl bg-surface-light"
              >
                <button
                  onClick={() =>
                    setOpenModule(openModule === i ? -1 : i)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${training.bgColor} text-sm font-bold ${training.color}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {module.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-muted transition-transform ${
                      openModule === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openModule === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-border px-6 pb-6 pt-4"
                  >
                    <ul className="space-y-3">
                      {module.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-center gap-3 text-sm text-muted"
                        >
                          <CheckCircle2
                            size={14}
                            className={`shrink-0 ${training.color}`}
                          />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="flex items-center gap-3 mb-3">
                <Target size={20} className="text-primary" />
                <p className="text-sm font-medium uppercase tracking-widest text-primary">
                  Hedef Kitle
                </p>
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">
                Bu Eğitim Kimin İçin?
              </h2>
              <p className="mt-3 text-muted">
                Aşağıdaki profillerden birine uyuyorsanız, bu eğitim tam size
                göre.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:w-1/2"
            >
              <div className="space-y-4">
                {training.targetAudience.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-xl border border-border bg-surface-light p-5 transition-colors hover:border-primary/30"
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${training.bgColor}`}
                    >
                      <CheckCircle2 size={16} className={training.color} />
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <MessageCircle size={20} className="text-primary" />
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                SSS
              </p>
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">
              Sıkça Sorulan Sorular
            </h2>
          </motion.div>

          <div className="space-y-4">
            {training.faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="gradient-border overflow-hidden rounded-2xl bg-surface-light"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="pr-4 font-semibold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-border px-6 pb-6 pt-4"
                  >
                    <p className="text-sm leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Trainings */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Diğer Eğitimler
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              İlgi alanınıza göre diğer eğitim programlarımızı da inceleyin.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {otherTrainings.map((t, i) => {
              const OtherIcon = t.icon;
              return (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/egitimler/${t.slug}`}
                    className="gradient-border group flex items-start gap-5 rounded-2xl bg-surface-light p-6 transition-all hover:translate-y-[-2px] hover:shadow-[0_15px_40px_rgba(29,71,240,0.1)]"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${t.bgColor}`}
                    >
                      <OtherIcon size={22} className={t.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold text-white">
                        {t.title}
                      </h3>
                      <p className="mb-3 text-sm text-muted line-clamp-2">
                        {t.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                        Detayları İncele
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white">
            {training.shortTitle} Eğitimine Başlamaya Hazır mısınız?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Ücretsiz ön görüşme ile hedeflerinizi ve eğitim planınızı birlikte
            belirleyelim.
          </p>
          <Link
            href="/iletisim"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
          >
            Ücretsiz Ön Görüşme
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
