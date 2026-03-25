"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trainings } from "@/data/trainings";

export default function Trainings() {
  return (
    <section id="egitimler" className="relative bg-surface py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Eğitimler
          </p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Birebir Eğitimler
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Dijital dünyada uzmanlaşmak için birebir mentörlük eşliğinde
            kapsamlı eğitim programları.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {trainings.map((training, i) => (
            <motion.a
              key={training.title}
              href={`/egitimler/${training.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="gradient-border group relative overflow-hidden rounded-2xl bg-surface-light p-8 transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(29,71,240,0.15)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${training.gradientColor} opacity-0 transition-opacity group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                  <training.icon
                    size={24}
                    className="text-primary"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {training.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted">
                  {training.description}
                </p>
                <ul className="mb-8 space-y-2">
                  {training.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                  Detaylı Bilgi
                  <ArrowRight size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
