"use client";

import Image from "next/image";
import Link from "next/link";
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
  CheckCircle2,
} from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    year: "Lise Yılları",
    title: "WordPress ile Tanışma",
    desc: "Lise yıllarında WordPress altyapısını öğrenmeye ve siteler yapmaya başladım. Bu işler çok profesyonel olmasa da yaparken öğrenmek kesinlikle en verimlisi.",
  },
  {
    icon: Briefcase,
    year: "18 Yaşında",
    title: "Site Destek & Dopinggo",
    desc: "Stajyerlikle başlayan bu serüvende Site Destek ve Dopinggo firmalarında SEO takım yöneticiliği ve web tasarım takım yöneticiliği yaptım.",
  },
  {
    icon: Rocket,
    year: "Şu An",
    title: "Worgoo — CEO & Kurucu",
    desc: "Kendi projem olan Worgoo Dijital Performans ajansını kurdum. Şu anda Worgoo'da CEO olarak görev almaktayım. Aynı zamanda Online SEO ve WordPress Eğitimleri vermekteyim.",
  },
];

const skills = [
  "SEO Stratejisi",
  "WordPress Geliştirme",
  "Web Tasarım",
  "Google Ads",
  "İçerik Pazarlama",
  "Dijital Strateji",
  "E-Ticaret",
  "Analitik & Raporlama",
  "Marka Danışmanlığı",
  "Eğitim & Mentorluk",
];

const stats = [
  { icon: Users, value: "Yüzlerce", label: "WordPress Sitesi" },
  { icon: BookOpen, value: "Binlerce", label: "Eğitim Alan Kişi" },
  { icon: Award, value: "Onlarca", label: "Farklı Sektör" },
  { icon: Briefcase, value: "2001", label: "Doğum Yılı" },
];

export default function HakkimdaPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative flex-shrink-0"
            >
              <div className="glow-blue relative h-[480px] w-[380px] overflow-hidden rounded-3xl border border-border lg:h-[560px] lg:w-[440px]">
                <Image
                  src="/ey-giris.png"
                  alt="Efehan Yıldız"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-primary/20 bg-background/80 p-5 backdrop-blur-lg">
                <Quote size={20} className="mb-2 text-primary" />
                <p className="text-sm font-medium italic leading-relaxed text-white">
                  &ldquo;Sürekli genç kal, sürekli öğren ve öğret!&rdquo;
                </p>
                <p className="mt-2 text-xs text-primary">— Efehan Yıldız</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1"
            >
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
                Hakkımda
              </p>
              <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Dijitalin Efe&apos;si
              </h1>

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
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
                  Onlarca farklı sektörden yüzlerce farklı marka ile çalışma imkanı
                  bulduğunuzda olay bambaşka boyutlara taşınıyor. Markalar değiştikçe
                  bilgilerinizin artık yeterli gelmediğinizi fark ediyorsunuz ve sürekli
                  daha fazlasını öğrenmeye başlıyorsunuz.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gradient-border rounded-2xl bg-surface p-6 text-center"
              >
                <s.icon size={22} className="mx-auto mb-3 text-primary" />
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Kariyer Yolculuğum
            </h2>
          </motion.div>

          <div className="relative space-y-8 border-l-2 border-primary/20 pl-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="absolute -left-[41px] flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-surface">
                  <item.icon size={18} className="text-primary" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.year}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Uzmanlık Alanlarım
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted transition-colors hover:border-primary/30 hover:text-white"
              >
                <CheckCircle2 size={14} className="flex-shrink-0 text-primary" />
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-surface-light p-8 text-center">
            <p className="text-sm leading-relaxed text-muted">
              <span className="text-white">Yeni insan ve markalarla tanışma</span>
              {" → "}
              <span className="text-white">Yeni düşünceler ve sorunlarla tanışma</span>
              {" → "}
              <span className="text-white">Araştırma</span>
              {" → "}
              <span className="text-white">Aksiyon alma</span>
              {" = "}
              <span className="font-bold text-primary">Sürekli öğrenmek ve dinamik kalmak.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-white">
            Birlikte Çalışalım
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Dijital pazarlama stratejinizi güçlendirmek, SEO performansınızı artırmak
            veya eğitim almak için hemen iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
          >
            İletişime Geçin
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
