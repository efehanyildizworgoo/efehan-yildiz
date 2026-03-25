"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Users,
  BookOpen,
  Briefcase,
  Rocket,
  GraduationCap,
  Quote,
} from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    year: "Lise Yılları",
    title: "WordPress ile Tanışma",
    desc: "Lise yıllarında WordPress altyapısını öğrenmeye ve siteler yapmaya başladım.",
  },
  {
    icon: Briefcase,
    year: "18 Yaşında",
    title: "Site Destek & Dopinggo",
    desc: "Stajyerlikle başlayan serüven — SEO takım yöneticiliği ve web tasarım takım yöneticiliği.",
  },
  {
    icon: Rocket,
    year: "Şu An",
    title: "Worgoo — CEO",
    desc: "Kendi projem Worgoo Dijital Performans ajansını kurdum. CEO olarak görev alıyorum.",
  },
];

const stats = [
  { icon: Users, value: "Yüzlerce", label: "WordPress Sitesi" },
  { icon: BookOpen, value: "Binlerce", label: "Eğitim Alan Kişi" },
  { icon: Award, value: "Onlarca", label: "Farklı Sektör" },
  { icon: Briefcase, value: "2001", label: "Doğum Yılı" },
];

export default function About() {
  return (
    <section id="hakkimda" className="relative py-12 md:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Hakkımda
          </p>
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Dijitalin Efe&apos;si
          </h2>
        </motion.div>

        {/* Main content: Image + Intro */}
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex-shrink-0"
          >
            <div className="relative">
              <div className="glow-blue relative h-[480px] w-[380px] overflow-hidden rounded-3xl border border-border lg:h-[560px] lg:w-[440px]">
                <Image
                  src="/ey-giris.png"
                  alt="Efehan Yıldız"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Quote overlay on image */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-primary/20 bg-background/80 p-5 backdrop-blur-lg">
                <Quote size={20} className="mb-2 text-primary" />
                <p className="text-sm font-medium italic leading-relaxed text-white">
                  &ldquo;Sürekli genç kal, sürekli öğren ve öğret!&rdquo;
                </p>
                <p className="mt-2 text-xs text-primary">— Efehan Yıldız</p>
              </div>

              {/* Decorative shapes */}
              <div className="absolute -right-5 -top-5 h-32 w-32 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-2xl border border-primary/10 bg-gradient-to-tr from-primary/8 to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1"
          >
            <div className="space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                <span className="font-semibold text-white">Efelerin Efesi</span> sözünü
                mutlaka duymuşsunuzdur. Ben bu sözü biraz değiştirip{" "}
                <span className="font-bold text-primary">&ldquo;Dijitalin Efe&apos;si&rdquo;</span>{" "}
                sözü ile yola çıktım. İddialı bir söz olduğunun farkındayım ama iddialı
                olmadan da başarı olmaz.
              </p>
              <p>
                2001 doğumlu olarak belki de sektörün en genç üyelerinden biriyim.
                Sürekli markalar ve marka sahipleriyle çalıştığım bu sektörde sonsuz
                enerjiye sahip olunması gerektiğini düşünüyorum. Yaşımın avantajını da
                sanırım en çok bu alanda hissettim:{" "}
                <span className="text-white">Gencim ve bildiklerimi öğretmek için enerjiyim.</span>
              </p>
              <p>
                Milenyum kuşağı olarak, dijitali sonradan öğrenen değil,{" "}
                <span className="text-white">dijitale doğan bir nesiliz.</span> Ama bu
                şansa sahip sadece ben değilim — milyonlarca kişi var. Bunun farkına
                erken vardığım için sektöre de erken atıldım.
              </p>
              <p>
                Daha lise yıllarımda WordPress altyapısını öğrenmeye başlamıştım.
                18 yaşımda <span className="text-white">Site Destek</span> ile tanıştım.
                Stajyerlikle başlayan bu serüvende SEO takım yöneticiliği ve web tasarım
                takım yöneticiliği yaptım. Sonrasında kendi projem olan{" "}
                <span className="font-semibold text-primary">Worgoo Dijital Performans</span>{" "}
                ajansını kurdum.
              </p>
            </div>

            {/* Career Timeline */}
            <div className="mt-10 space-y-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-surface-light">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">{item.year}</p>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="gradient-border rounded-2xl bg-surface p-6 text-center"
            >
              <s.icon size={22} className="mx-auto mb-3 text-primary" />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Flow description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-surface p-8 text-center"
        >
          <p className="text-sm leading-relaxed text-muted">
            <span className="text-white">Yeni insan ve markalarla tanışma</span>
            {" → "}
            <span className="text-white">Yeni düşünceler ve daha önce karşılaşmadığınız sorunlarla tanışma</span>
            {" → "}
            <span className="text-white">Araştırma</span>
            {" → "}
            <span className="text-white">Aksiyon alma</span>
            {" = "}
            <span className="font-bold text-primary">Sürekli öğrenmek ve dinamik kalmak.</span>
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#iletisim"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
          >
            Benimle İletişime Geçin
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
