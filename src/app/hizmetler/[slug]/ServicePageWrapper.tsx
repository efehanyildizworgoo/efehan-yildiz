"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Search,
  Globe,
  BarChart3,
  Megaphone,
  PenTool,
  ShoppingCart,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Users,
  FileText,
  LayoutDashboard,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

interface ServiceData {
  icon: LucideIcon;
  metaTitle: string;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  features: { icon: LucideIcon; title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
}

const services: Record<string, ServiceData> = {
  "seo-danismanligi": {
    icon: Search,
    metaTitle: "SEO Danışmanlığı",
    title: "SEO Danışmanlığı",
    headline: "Google'da Üst Sıralara Çıkın",
    description: "Kapsamlı SEO stratejisi ile organik trafiğinizi artırın.",
    heroDescription:
      "Teknik SEO, içerik optimizasyonu ve link building stratejileri ile web sitenizin Google'da üst sıralara çıkmasını sağlıyorum. Veri odaklı yaklaşım ve aylık raporlama ile sürekli iyileştirme.",
    features: [
      { icon: Search, title: "Anahtar Kelime Analizi", desc: "Sektörünüze özel yüksek potansiyelli anahtar kelimeleri belirliyorum." },
      { icon: LayoutDashboard, title: "Teknik SEO Denetimi", desc: "Site hızı, mobil uyumluluk, crawlability ve indexlenme sorunlarını tespit ediyorum." },
      { icon: FileText, title: "İçerik Stratejisi", desc: "Arama amacına uygun, dönüşüm odaklı içerik planı oluşturuyorum." },
      { icon: Layers, title: "Backlink Stratejisi", desc: "Kaliteli ve doğal backlink profili oluşturma stratejisi geliştiriyorum." },
      { icon: TrendingUp, title: "Rakip Analizi", desc: "Rakiplerinizin SEO stratejilerini analiz edip fırsatları belirliyorum." },
      { icon: BarChart3, title: "Aylık Raporlama", desc: "Detaylı performans raporları ile ilerlemenizi takip ediyorum." },
    ],
    process: [
      { step: "01", title: "SEO Denetimi", desc: "Mevcut sitenizin kapsamlı SEO analizini yapıyorum." },
      { step: "02", title: "Strateji Oluşturma", desc: "Verilere dayalı özelleştirilmiş SEO stratejisi hazırlıyorum." },
      { step: "03", title: "Teknik Optimizasyon", desc: "Site altyapısını SEO'ya uygun hale getiriyorum." },
      { step: "04", title: "İçerik Üretimi", desc: "SEO uyumlu içerikler oluşturuyorum." },
      { step: "05", title: "Takip & İyileştirme", desc: "Sonuçları takip edip sürekli optimizasyon yapıyorum." },
    ],
    benefits: [
      "Organik trafik artışı",
      "Hedef kitleye ulaşma",
      "Marka bilinirliği",
      "Düşük edinme maliyeti",
      "Uzun vadeli sonuçlar",
      "Rekabet avantajı",
    ],
    faq: [
      { q: "SEO sonuçları ne kadar sürede gelir?", a: "SEO uzun vadeli bir süreçtir. İlk sonuçlar genellikle 3-6 ay içinde görülmeye başlar, ancak bu süre sektöre ve rekabete göre değişebilir." },
      { q: "Hangi SEO araçlarını kullanıyorsunuz?", a: "Ahrefs, SEMrush, Google Search Console, Google Analytics, Screaming Frog gibi endüstri standardı araçları kullanıyorum." },
      { q: "Garanti veriyor musunuz?", a: "Google sıralama garantisi vermek etik değildir. Ancak veriye dayalı stratejiler ve sürekli optimizasyon ile en iyi sonuçları hedefliyoruz." },
    ],
  },
  "web-tasarim": {
    icon: Globe,
    metaTitle: "Web Tasarım & Geliştirme",
    title: "Web Tasarım & Geliştirme",
    headline: "Modern & Performanslı Web Siteleri",
    description: "WordPress altyapısıyla hızlı ve SEO uyumlu web siteleri.",
    heroDescription:
      "Markanızın dijital yüzünü oluşturuyorum. Modern tasarım, hızlı yükleme süreleri ve SEO uyumlu altyapı ile ziyaretçilerinizi müşteriye dönüştürün.",
    features: [
      { icon: Globe, title: "Responsive Tasarım", desc: "Tüm cihazlarda mükemmel görünen web siteleri tasarlıyorum." },
      { icon: Zap, title: "Hız Optimizasyonu", desc: "Core Web Vitals odaklı performans optimizasyonu yapıyorum." },
      { icon: Shield, title: "SSL & Güvenlik", desc: "Sitenizin güvenliğini en üst düzeyde tutuyorum." },
      { icon: Search, title: "SEO Uyumlu", desc: "Doğuştan SEO uyumlu altyapı ile tasarlıyorum." },
      { icon: LayoutDashboard, title: "WordPress CMS", desc: "Kolay yönetilebilir WordPress altyapısı kuruyorum." },
      { icon: Target, title: "Dönüşüm Odaklı", desc: "Kullanıcı deneyimi ve dönüşüm optimizasyonu yapıyorum." },
    ],
    process: [
      { step: "01", title: "Keşif & Planlama", desc: "İhtiyaçlarınızı ve hedeflerinizi analiz ediyorum." },
      { step: "02", title: "Tasarım", desc: "Modern ve markanıza uygun UI/UX tasarımı oluşturuyorum." },
      { step: "03", title: "Geliştirme", desc: "WordPress üzerinde hızlı ve güvenli altyapı kuruyorum." },
      { step: "04", title: "Test & Lansman", desc: "Tüm testlerden sonra sitenizi yayına alıyorum." },
    ],
    benefits: [
      "Mobil uyumlu tasarım",
      "Hızlı yükleme süresi",
      "Kolay içerik yönetimi",
      "SEO uyumlu altyapı",
      "7/24 destek",
      "SSL sertifikası",
    ],
    faq: [
      { q: "Web sitesi ne kadar sürede hazır olur?", a: "Projenin kapsamına göre değişmekle birlikte, standart bir kurumsal web sitesi 2-4 hafta içinde tamamlanır." },
      { q: "WordPress dışında çalışıyor musunuz?", a: "Evet, Next.js ve React gibi modern teknolojilerle de proje geliştiriyorum." },
      { q: "Hosting dahil mi?", a: "Hosting ayrı sunulmaktadır ancak uygun hosting önerisi ve kurulumu hizmetin bir parçasıdır." },
    ],
  },
  "dijital-pazarlama": {
    icon: BarChart3,
    metaTitle: "Dijital Pazarlama Stratejisi",
    title: "Dijital Pazarlama Stratejisi",
    headline: "Veriye Dayalı Dijital Büyüme",
    description: "Markanızın dijitalde büyümesi için bütünsel strateji.",
    heroDescription:
      "Markanızın dijital ekosistemini analiz edip, veriye dayalı büyüme stratejileri oluşturuyorum. Hedef kitlenize doğru kanallardan ulaşın.",
    features: [
      { icon: Target, title: "Hedef Kitle Analizi", desc: "İdeal müşteri profilinizi belirliyorum." },
      { icon: BarChart3, title: "Rakip Analizi", desc: "Rakiplerinizin dijital stratejilerini analiz ediyorum." },
      { icon: TrendingUp, title: "Kanal Stratejisi", desc: "En etkili dijital kanalları belirliyorum." },
      { icon: Layers, title: "KPI Belirleme", desc: "Ölçülebilir hedefler ve metrikler oluşturuyorum." },
      { icon: FileText, title: "İçerik Planı", desc: "Kanal bazlı içerik stratejisi hazırlıyorum." },
      { icon: LayoutDashboard, title: "Performans Takibi", desc: "Düzenli raporlama ve optimizasyon yapıyorum." },
    ],
    process: [
      { step: "01", title: "Mevcut Durum Analizi", desc: "Dijital varlığınızı kapsamlı olarak analiz ediyorum." },
      { step: "02", title: "Strateji Geliştirme", desc: "Hedeflerinize uygun strateji oluşturuyorum." },
      { step: "03", title: "Uygulama", desc: "Stratejiyi adım adım hayata geçiriyorum." },
      { step: "04", title: "Ölçümleme", desc: "Sonuçları ölçüp sürekli iyileştiriyorum." },
    ],
    benefits: [
      "Bütünsel strateji",
      "Veri odaklı kararlar",
      "Hedef kitle odağı",
      "ROI optimizasyonu",
      "Ölçülebilir sonuçlar",
      "Rekabet avantajı",
    ],
    faq: [
      { q: "Dijital pazarlama stratejisi neden önemli?", a: "Plansız harcamalar yerine veriye dayalı, hedef odaklı bir strateji ile bütçenizi en verimli şekilde kullanırsınız." },
      { q: "Hangi kanalları kullanıyorsunuz?", a: "SEO, Google Ads, sosyal medya, e-posta pazarlama ve içerik pazarlama kanallarını entegre kullanıyorum." },
      { q: "Ne kadar sürede sonuç alırım?", a: "Kanala göre değişir. PPC ile hızlı sonuç, SEO ile uzun vadeli sürdürülebilir sonuçlar elde edilir." },
    ],
  },
  "google-ads": {
    icon: Megaphone,
    metaTitle: "Google Ads Yönetimi",
    title: "Google Ads Yönetimi",
    headline: "Maksimum Dönüşüm, Minimum Maliyet",
    description: "Doğru hedefleme ile yüksek performanslı reklam kampanyaları.",
    heroDescription:
      "Google Ads kampanyalarınızı profesyonelce yönetiyorum. Hedef kitlenize en uygun maliyetle ulaşarak dönüşüm oranlarınızı maksimize edin.",
    features: [
      { icon: Megaphone, title: "Kampanya Kurulumu", desc: "Hedeflerinize uygun kampanya yapısı oluşturuyorum." },
      { icon: Target, title: "Hedef Kitle", desc: "Doğru kitleye ulaşmak için detaylı hedefleme yapıyorum." },
      { icon: TrendingUp, title: "A/B Testleri", desc: "Sürekli test ile en iyi performansı yakalıyorum." },
      { icon: BarChart3, title: "Dönüşüm Takibi", desc: "Detaylı dönüşüm izleme kuruyorum." },
      { icon: Zap, title: "Bütçe Optimizasyonu", desc: "Reklam bütçenizi en verimli şekilde kullanıyorum." },
      { icon: FileText, title: "Raporlama", desc: "Haftalık ve aylık performans raporları sunuyorum." },
    ],
    process: [
      { step: "01", title: "Hesap Analizi", desc: "Mevcut hesabınızı veya yeni hesap yapısını analiz ediyorum." },
      { step: "02", title: "Kampanya Kurulumu", desc: "Optimize edilmiş kampanya yapısı oluşturuyorum." },
      { step: "03", title: "Optimizasyon", desc: "Günlük takip ve haftalık optimizasyon yapıyorum." },
      { step: "04", title: "Raporlama", desc: "Detaylı performans raporları ve öneriler sunuyorum." },
    ],
    benefits: [
      "Hedefli reklam",
      "Yüksek dönüşüm",
      "Bütçe kontrolü",
      "Detaylı raporlama",
      "A/B test desteği",
      "Hızlı sonuçlar",
    ],
    faq: [
      { q: "Minimum reklam bütçesi ne kadar olmalı?", a: "Sektöre göre değişmekle birlikte, etkili sonuçlar için aylık minimum 3.000-5.000 TL reklam bütçesi öneriyorum." },
      { q: "Google Ads yönetim ücreti ne kadar?", a: "Reklam bütçesine ve kampanya kapsamına göre aylık yönetim ücreti belirlenmektedir. İletişime geçerek teklif alabilirsiniz." },
      { q: "Sonuçları ne zaman görebilirim?", a: "Google Ads ile ilk sonuçlar kampanya başladıktan birkaç gün içinde görülmeye başlar." },
    ],
  },
  "marka-danismanligi": {
    icon: PenTool,
    metaTitle: "Marka Danışmanlığı",
    title: "Marka Danışmanlığı",
    headline: "Dijital Marka Kimliğinizi Oluşturun",
    description: "Markanızın dijital kimliğini stratejik olarak güçlendirin.",
    heroDescription:
      "Markanızın dijital dünyada güçlü ve tutarlı bir kimlik oluşturması için stratejik danışmanlık veriyorum. Konumlandırmadan iletişim diline kadar bütünsel çözümler.",
    features: [
      { icon: PenTool, title: "Marka Konumlandırma", desc: "Markanızı rakiplerden farklılaştıracak strateji belirliyorum." },
      { icon: Globe, title: "Dijital Kimlik", desc: "Online varlığınızın tutarlı olmasını sağlıyorum." },
      { icon: FileText, title: "İçerik Stratejisi", desc: "Marka sesine uygun içerik planı oluşturuyorum." },
      { icon: Users, title: "Sosyal Medya Planı", desc: "Hedef kitlenize uygun sosyal medya stratejisi." },
      { icon: Shield, title: "Kriz Yönetimi", desc: "Dijital kriz senaryoları ve yönetim planı hazırlıyorum." },
      { icon: Target, title: "Hedef Kitle Analizi", desc: "İdeal müşteri profilinizi detaylı belirliyorum." },
    ],
    process: [
      { step: "01", title: "Marka Denetimi", desc: "Mevcut marka algınızı analiz ediyorum." },
      { step: "02", title: "Strateji Geliştirme", desc: "Marka konumlandırma stratejisi oluşturuyorum." },
      { step: "03", title: "Kimlik Oluşturma", desc: "Dijital marka kimliği ve ton of voice belirliyorum." },
      { step: "04", title: "Uygulama & Takip", desc: "Stratejiyi uygulayıp süreçleri takip ediyorum." },
    ],
    benefits: [
      "Güçlü marka algısı",
      "Tutarlı iletişim",
      "Rakiplerden farklılaşma",
      "Müşteri sadakati",
      "Dijital güven",
      "Uzun vadeli değer",
    ],
    faq: [
      { q: "Marka danışmanlığı ne kadar sürer?", a: "Temel marka stratejisi 4-6 haftalık bir süreçtir. Devam eden danışmanlık aylık olarak sunulur." },
      { q: "Küçük işletmeler için uygun mu?", a: "Kesinlikle. Her ölçekteki işletme için özelleştirilmiş çözümler sunuyorum." },
      { q: "Logo tasarımı dahil mi?", a: "Logo tasarımı ayrı bir hizmettir ancak gerektiğinde güvenilir tasarımcılarla işbirliği yapabiliriz." },
    ],
  },
  "e-ticaret": {
    icon: ShoppingCart,
    metaTitle: "E-Ticaret Çözümleri",
    title: "E-Ticaret Çözümleri",
    headline: "Satışa Hazır E-Ticaret Siteleri",
    description: "WooCommerce ile performanslı e-ticaret siteleri.",
    heroDescription:
      "WooCommerce altyapısıyla satışa hazır, hızlı ve güvenli e-ticaret siteleri kuruyorum. Ödeme entegrasyonlarından kargo yönetimine kadar eksiksiz çözümler.",
    features: [
      { icon: ShoppingCart, title: "WooCommerce Kurulumu", desc: "Profesyonel e-ticaret altyapısı kuruyorum." },
      { icon: Shield, title: "Ödeme Entegrasyonları", desc: "İyzico, PayTR gibi ödeme altyapılarını entegre ediyorum." },
      { icon: Layers, title: "Ürün Yönetimi", desc: "Kolay ürün ekleme ve yönetim sistemi kuruyorum." },
      { icon: Search, title: "SEO Optimizasyonu", desc: "Ürün sayfalarını SEO'ya uygun hale getiriyorum." },
      { icon: TrendingUp, title: "Kargo Entegrasyonu", desc: "Aras, Yurtiçi gibi kargo firması entegrasyonu." },
      { icon: BarChart3, title: "Satış Raporlama", desc: "Detaylı satış ve performans raporları." },
    ],
    process: [
      { step: "01", title: "Analiz & Planlama", desc: "Ürün yapınızı ve ihtiyaçlarınızı analiz ediyorum." },
      { step: "02", title: "Tasarım & Geliştirme", desc: "Dönüşüm odaklı e-ticaret sitesi tasarlıyorum." },
      { step: "03", title: "Entegrasyonlar", desc: "Ödeme ve kargo entegrasyonlarını kuruyorum." },
      { step: "04", title: "Test & Lansman", desc: "Tüm testlerden sonra mağazanızı yayına alıyorum." },
    ],
    benefits: [
      "Profesyonel mağaza",
      "Güvenli ödeme",
      "Kolay yönetim",
      "Mobil uyumlu",
      "SEO uyumlu",
      "Hızlı teslimat",
    ],
    faq: [
      { q: "E-ticaret sitesi maliyeti nedir?", a: "Proje kapsamına göre değişir. Temel bir WooCommerce sitesi uygun bütçelerle kurulabilir. Detaylı teklif için iletişime geçin." },
      { q: "Ürün sayısı sınırı var mı?", a: "WooCommerce'de ürün sayısı sınırı yoktur. Doğru hosting ile binlerce ürün yönetilebilir." },
      { q: "Bakım desteği veriyor musunuz?", a: "Evet, aylık bakım ve destek paketleri sunuyorum." },
    ],
  },
};

function FaqItemComponent({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold text-white"
      >
        {q}
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p>
      )}
    </div>
  );
}

export default function ServicePageClient({ slug }: { slug: string }) {
  const service = services[slug];

  useEffect(() => {
    if (service) {
      document.title = `${service.metaTitle} - Efehan Yıldız`;
    }
  }, [service]);

  if (!service) return null;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[180px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <Link href="/hizmetler" className="transition-colors hover:text-primary">Hizmetler</Link>
            <ChevronRight size={14} />
            <span className="text-white">{service.title}</span>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <service.icon size={28} className="text-primary" />
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">{service.headline}</h1>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">{service.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/iletisim" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]">
                  Ücretsiz Teklif Alın
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="https://wa.me/905527328055" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-4 text-sm font-semibold text-muted transition-all hover:border-primary/30 hover:text-white">
                  WhatsApp ile Yazın
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 gap-4">
              {service.benefits.slice(0, 4).map((b) => (
                <div key={b} className="rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/20">
                  <CheckCircle2 size={18} className="mb-2 text-primary" />
                  <p className="text-sm font-medium text-white">{b}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-white">Bu Hizmet Neler İçeriyor?</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-border bg-surface-light p-6 transition-all hover:border-primary/20">
                <f.icon size={22} className="mb-4 text-primary" />
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-white">Çalışma Sürecim</h2>
          </motion.div>
          <div className="space-y-6">
            {service.process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/20">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">{p.step}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-white">Neden Bu Hizmet?</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((b, i) => (
              <motion.div key={b} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 rounded-xl border border-border bg-surface-light p-4 transition-all hover:border-primary/30">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-white">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-white">Sıkça Sorulan Sorular</h2>
          </motion.div>
          <div className="rounded-2xl border border-border bg-surface px-6">
            {service.faq.map((item) => (
              <FaqItemComponent key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-12" style={{ background: "linear-gradient(135deg, #0c1029 0%, #0d1340 50%, #0c1029 100%)" }}>
            <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-[80px]" />
            <h2 className="relative font-heading text-3xl font-bold text-white">Projenizi Konuşalım</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">{service.title} hizmetimiz hakkında detaylı bilgi almak ve size özel teklif almak için hemen iletişime geçin.</p>
            <Link href="/iletisim" className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]">
              İletişime Geçin
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
