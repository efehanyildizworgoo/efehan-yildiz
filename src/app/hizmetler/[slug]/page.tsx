"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
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
    metaTitle: "SEO Danışmanlığı | SEO Hizmeti",
    title: "SEO Danışmanlığı",
    headline: "Google'da Üst Sıralara Çıkın",
    description: "Kapsamlı SEO stratejisi, teknik optimizasyon ve içerik planlaması ile markanızı dijitalde zirveye taşıyorum.",
    heroDescription:
      "Organik arama trafiğinizi artırmak, rakiplerinizin önüne geçmek ve sürdürülebilir bir dijital büyüme sağlamak için uçtan uca SEO danışmanlığı hizmeti sunuyorum. Teknik altyapıdan içerik stratejisine, backlink çalışmalarından aylık raporlamaya kadar tüm süreçleri yönetiyorum.",
    features: [
      { icon: Search, title: "Anahtar Kelime Araştırması", desc: "Sektörünüze özel yüksek potansiyelli anahtar kelimeleri tespit ediyorum." },
      { icon: FileText, title: "İçerik Stratejisi", desc: "SEO uyumlu, kullanıcı odaklı içerik planı ve editorial takvim oluşturuyorum." },
      { icon: Zap, title: "Teknik SEO Denetimi", desc: "Site hızı, crawlability, indexing sorunlarını tespit edip çözüyorum." },
      { icon: TrendingUp, title: "Backlink Stratejisi", desc: "Kaliteli ve doğal backlink profili oluşturmak için strateji geliştiriyorum." },
      { icon: LayoutDashboard, title: "Aylık Raporlama", desc: "Detaylı performans raporları ile ilerlemenizi şeffaf şekilde takip edin." },
      { icon: Target, title: "Rakip Analizi", desc: "Rakiplerinizin SEO stratejilerini analiz edip fırsatları belirliyorum." },
    ],
    process: [
      { step: "01", title: "SEO Audit", desc: "Mevcut sitenizi teknik ve içerik açısından kapsamlı şekilde analiz ediyorum." },
      { step: "02", title: "Strateji Oluşturma", desc: "Hedeflerinize özel bir SEO yol haritası ve aksiyon planı hazırlıyorum." },
      { step: "03", title: "Uygulama", desc: "Teknik düzeltmeler, içerik optimizasyonu ve backlink çalışmalarını başlatıyorum." },
      { step: "04", title: "İzleme & Optimizasyon", desc: "Performansı sürekli takip ediyor, stratejileri güncel tutuyorum." },
    ],
    benefits: [
      "Organik trafikte sürdürülebilir artış",
      "Google'da üst sıra konumlandırma",
      "Dönüşüm oranlarında iyileşme",
      "Rakiplerin önünde kalma",
      "Marka bilinirliğinde artış",
      "Uzun vadeli dijital yatırım",
    ],
    faq: [
      { q: "SEO çalışmalarının sonuç vermesi ne kadar sürer?", a: "SEO uzun vadeli bir stratejidir. İlk sonuçlar genellikle 3-6 ay içinde görülmeye başlar, ancak sürdürülebilir sonuçlar 6-12 ay arasında elde edilir." },
      { q: "Hangi sektörlerde SEO danışmanlığı veriyorsunuz?", a: "E-ticaret, hizmet sektörü, sağlık, gayrimenkul, eğitim ve daha birçok sektörde deneyimim var." },
      { q: "SEO garantisi veriyor musunuz?", a: "Google sıralamaları algoritmaya bağlıdır, kimse kesin garanti veremez. Ancak doğru strateji ve sürekli çalışma ile organik büyüme sağlanır." },
      { q: "Aylık raporlama nasıl yapılıyor?", a: "Her ay detaylı bir performans raporu paylaşıyorum: sıralama değişimleri, trafik analizi, yapılan çalışmalar ve sonraki adımlar." },
    ],
  },
  "web-tasarim": {
    icon: Globe,
    metaTitle: "Web Tasarım | Kurumsal Web Tasarım",
    title: "Web Tasarım & Geliştirme",
    headline: "Modern, Hızlı ve SEO Uyumlu Web Siteleri",
    description: "WordPress altyapısıyla modern, hızlı ve SEO uyumlu web siteleri tasarlıyorum.",
    heroDescription:
      "İşletmenizin dijital vitrini olan web sitenizi, kullanıcı deneyimi odaklı, SEO uyumlu ve performanslı bir şekilde tasarlıyorum. WordPress altyapısı ile yönetimi kolay, güvenli ve ölçeklenebilir siteler kuruyorum.",
    features: [
      { icon: Globe, title: "Responsive Tasarım", desc: "Tüm cihazlarda mükemmel görünen, mobil öncelikli tasarım." },
      { icon: Zap, title: "Hız Optimizasyonu", desc: "3 saniyenin altında yüklenen, performans odaklı siteler." },
      { icon: Shield, title: "SSL & Güvenlik", desc: "Güvenlik sertifikası, firewall ve düzenli yedekleme." },
      { icon: Search, title: "SEO Uyumlu Altyapı", desc: "Arama motorlarına uygun kod yapısı ve site mimarisi." },
      { icon: Layers, title: "WordPress Geliştirme", desc: "Özel tema, eklenti ve WooCommerce entegrasyonları." },
      { icon: LayoutDashboard, title: "Bakım ve Destek", desc: "Lansman sonrası teknik destek ve düzenli güncelleme." },
    ],
    process: [
      { step: "01", title: "İhtiyaç Analizi", desc: "Projenizin kapsamını, hedef kitlenizi ve beklentilerinizi birlikte belirliyoruz." },
      { step: "02", title: "Tasarım", desc: "Markanıza özel, modern ve dönüşüm odaklı tasarım hazırlıyorum." },
      { step: "03", title: "Geliştirme", desc: "WordPress üzerinde hızlı, güvenli ve SEO uyumlu siteyi kodluyorum." },
      { step: "04", title: "Lansman & Destek", desc: "Siteyi yayına alıyor, eğitim veriyor ve destek sağlıyorum." },
    ],
    benefits: [
      "Profesyonel dijital görünüm",
      "Mobil uyumlu tasarım",
      "Yüksek sayfa hızı",
      "Kolay içerik yönetimi",
      "SEO dostu altyapı",
      "Güvenli ve ölçeklenebilir",
    ],
    faq: [
      { q: "Web sitesi ne kadar sürede hazır olur?", a: "Projenin kapsamına göre değişmekle birlikte, standart bir kurumsal site 2-4 hafta, e-ticaret siteleri 4-8 hafta sürmektedir." },
      { q: "WordPress dışında başka altyapı kullanıyor musunuz?", a: "Ağırlıklı olarak WordPress tercih ediyorum çünkü esnekliği, SEO uyumu ve geniş eklenti ekosistemi en ideal çözümü sunar." },
      { q: "Site tesliminden sonra destek sağlıyor musunuz?", a: "Evet, teslim sonrası belirli bir süre ücretsiz destek veriyorum. Aylık bakım paketleri de mevcuttur." },
    ],
  },
  "dijital-pazarlama": {
    icon: BarChart3,
    metaTitle: "Dijital Pazarlama Danışmanlığı",
    title: "Dijital Pazarlama Stratejisi",
    headline: "Markanızı Dijitalde Büyütün",
    description: "Markanızın dijitalde büyümesi için bütünsel strateji oluşturuyorum.",
    heroDescription:
      "Dijital pazarlama stratejisi, markanızın online varlığını güçlendirmek ve hedef kitlenize en etkili şekilde ulaşmak için kapsamlı bir yol haritası oluşturmaktır. Rakip analizi, hedef kitle belirleme, kanal stratejisi ve performans takibi ile büyümenizi hızlandırıyorum.",
    features: [
      { icon: Target, title: "Rakip Analizi", desc: "Sektörünüzdeki rekabet ortamını detaylı şekilde analiz ediyorum." },
      { icon: Users, title: "Hedef Kitle Belirleme", desc: "Doğru kitleye, doğru mesajla ulaşmanız için persona çalışması yapıyorum." },
      { icon: Layers, title: "Kanal Stratejisi", desc: "SEO, reklam, sosyal medya — en uygun kanalları belirliyorum." },
      { icon: TrendingUp, title: "KPI Belirleme", desc: "Ölçülebilir hedefler ve metrikler tanımlıyorum." },
      { icon: LayoutDashboard, title: "Performans Takibi", desc: "Kampanya performansını sürekli izliyor, optimize ediyorum." },
      { icon: FileText, title: "Raporlama", desc: "Detaylı analizler ve aksiyon önerileri ile ilerlemenizi takip edin." },
    ],
    process: [
      { step: "01", title: "Durum Analizi", desc: "Mevcut dijital varlığınızı ve rakiplerinizi analiz ediyorum." },
      { step: "02", title: "Strateji Tasarımı", desc: "Hedeflerinize uygun 360° dijital pazarlama stratejisi oluşturuyorum." },
      { step: "03", title: "Uygulama", desc: "Belirlenen stratejileri kanal bazlı hayata geçiriyorum." },
      { step: "04", title: "Optimizasyon", desc: "Veriye dayalı kararlarla stratejileri sürekli iyileştiriyorum." },
    ],
    benefits: [
      "Bütünsel dijital strateji",
      "Veriye dayalı karar alma",
      "ROI odaklı kampanyalar",
      "Marka bilinirliğinde artış",
      "Hedef kitleye doğru ulaşım",
      "Sürekli optimizasyon",
    ],
    faq: [
      { q: "Dijital pazarlama danışmanlığı neleri kapsar?", a: "SEO, Google Ads, sosyal medya, içerik pazarlama ve analitik gibi tüm dijital kanalları kapsayan bütünsel bir strateji sunuyorum." },
      { q: "Hangi bütçe ile başlanabilir?", a: "Bütçe projenin kapsamına göre değişir. Ücretsiz ön görüşme ile ihtiyaçlarınızı belirleyip size özel teklif hazırlıyorum." },
    ],
  },
  "google-ads": {
    icon: Megaphone,
    metaTitle: "Google Ads Danışmanlığı | Google Ads Reklam Yönetimi",
    title: "Google Ads Yönetimi",
    headline: "Doğru Hedefleme, Maksimum Dönüşüm",
    description: "Doğru bütçe, doğru hedefleme ile maksimum dönüşüm sağlayan reklam kampanyaları.",
    heroDescription:
      "Google Ads ile doğru zamanda, doğru kitleye, doğru mesajla ulaşın. Kampanya kurulumundan optimizasyona, A/B testlerinden dönüşüm takibine kadar tüm reklam sürecinizi profesyonel şekilde yönetiyorum.",
    features: [
      { icon: Target, title: "Kampanya Kurulumu", desc: "Hedefinize uygun Search, Display, Shopping kampanyaları oluşturuyorum." },
      { icon: Layers, title: "A/B Testleri", desc: "Reklam metinleri ve landing page'ler için sürekli test yapıyorum." },
      { icon: TrendingUp, title: "Dönüşüm Takibi", desc: "Tüm dönüşüm noktalarını izleyerek gerçek ROI'nizi ölçüyorum." },
      { icon: LayoutDashboard, title: "Bütçe Optimizasyonu", desc: "Harcamalarınızı en verimli şekilde yönlendiriyorum." },
      { icon: FileText, title: "Aylık Raporlama", desc: "Detaylı kampanya performans raporları paylaşıyorum." },
      { icon: Zap, title: "Remarketing", desc: "Sitenizi ziyaret edenlere yeniden ulaşarak dönüşümü artırıyorum." },
    ],
    process: [
      { step: "01", title: "Hesap Analizi", desc: "Mevcut hesabınızı inceliyor veya sıfırdan kurulum yapıyorum." },
      { step: "02", title: "Kampanya Planlama", desc: "Hedef kitle, bütçe ve strateji belirliyorum." },
      { step: "03", title: "Yayın & Test", desc: "Kampanyaları yayına alıyor, A/B testleri başlatıyorum." },
      { step: "04", title: "Optimizasyon", desc: "Performans verilerine göre sürekli iyileştirme yapıyorum." },
    ],
    benefits: [
      "Anında görünürlük",
      "Hedefli trafik",
      "Ölçülebilir sonuçlar",
      "Esnek bütçe yönetimi",
      "Yüksek dönüşüm oranı",
      "Detaylı raporlama",
    ],
    faq: [
      { q: "Google Ads'e minimum ne kadar bütçe ayırmalıyım?", a: "Sektörünüze ve rekabet ortamına bağlıdır. Genellikle aylık 5.000 TL ve üzeri bütçelerle etkili sonuçlar alınabilir." },
      { q: "Google Ads ve SEO birlikte mi yapılmalı?", a: "Kesinlikle evet. Google Ads kısa vadede sonuç verirken, SEO uzun vadeli organik büyüme sağlar. İkisini birlikte kullanmak en ideal stratejidir." },
    ],
  },
  "marka-danismanligi": {
    icon: PenTool,
    metaTitle: "360° Marka Danışmanlığı | Dijital Marka Danışmanlığı",
    title: "Marka Danışmanlığı",
    headline: "Dijital Kimliğinizi Güçlendirin",
    description: "Markanızın dijital kimliğini oluşturmak ve güçlendirmek için stratejik danışmanlık.",
    heroDescription:
      "Markanızın dijital dünyada güçlü bir kimlik oluşturması, doğru konumlandırma ve tutarlı iletişim stratejisi ile mümkündür. Marka konumlandırma, dijital kimlik oluşturma ve kriz yönetimi ile markanızı geleceğe taşıyorum.",
    features: [
      { icon: Target, title: "Marka Konumlandırma", desc: "Sektörde benzersiz yerinizi belirliyorum." },
      { icon: PenTool, title: "Dijital Kimlik", desc: "Logo, renk paleti, tipografi ve görsel dil oluşturuyorum." },
      { icon: FileText, title: "İçerik Stratejisi", desc: "Marka sesinize uygun içerik planı hazırlıyorum." },
      { icon: Users, title: "Sosyal Medya Planı", desc: "Platform bazlı strateji ve içerik takvimi oluşturuyorum." },
      { icon: Shield, title: "Kriz Yönetimi", desc: "Dijital kriz senaryoları ve çözüm planları hazırlıyorum." },
      { icon: TrendingUp, title: "Marka Takibi", desc: "Online itibarınızı sürekli izliyor ve raporluyorum." },
    ],
    process: [
      { step: "01", title: "Marka Analizi", desc: "Mevcut marka algınızı ve rakiplerinizi analiz ediyorum." },
      { step: "02", title: "Strateji", desc: "Konumlandırma, mesaj ve iletişim stratejisi belirliyorum." },
      { step: "03", title: "Uygulama", desc: "Dijital kimlik ve içerik çalışmalarını hayata geçiriyorum." },
      { step: "04", title: "Takip", desc: "Marka algısını izliyor, stratejileri güncelliyorum." },
    ],
    benefits: [
      "Güçlü marka algısı",
      "Tutarlı dijital iletişim",
      "Sadık müşteri kitlesi",
      "Rekabet avantajı",
      "Profesyonel görünüm",
      "Kriz dayanıklılığı",
    ],
    faq: [
      { q: "Marka danışmanlığı sadece büyük firmalar için mi?", a: "Hayır. Küçük işletmeler ve bireysel markalar da profesyonel marka danışmanlığından büyük fayda sağlar." },
      { q: "Mevcut markamı yenileyebilir misiniz?", a: "Evet, mevcut markanızı analiz edip rebranding çalışması yapabiliriz." },
    ],
  },
  "e-ticaret": {
    icon: ShoppingCart,
    metaTitle: "E-Ticaret Danışmanlığı | A'dan Z'ye Danışmanlık",
    title: "E-Ticaret Çözümleri",
    headline: "Online Satışa Hemen Başlayın",
    description: "WooCommerce ile satışa hazır, performanslı e-ticaret siteleri kuruyorum.",
    heroDescription:
      "WooCommerce altyapısı ile profesyonel, güvenli ve performanslı e-ticaret siteleri kuruyorum. Ürün yönetiminden ödeme entegrasyonlarına, kargo çözümlerinden SEO optimizasyonuna kadar tüm süreçleri yönetiyorum.",
    features: [
      { icon: ShoppingCart, title: "WooCommerce Kurulumu", desc: "Tam fonksiyonlu e-ticaret altyapısı kuruyorum." },
      { icon: Shield, title: "Ödeme Entegrasyonları", desc: "İyzico, PayTR, Stripe gibi ödeme sistemlerini entegre ediyorum." },
      { icon: Layers, title: "Ürün Yönetimi", desc: "Toplu ürün ekleme, varyasyon ve stok yönetimi." },
      { icon: Search, title: "SEO Optimizasyonu", desc: "Ürün sayfaları ve kategori yapısını SEO'ya uygun şekilde optimize ediyorum." },
      { icon: Zap, title: "Kargo Entegrasyonu", desc: "Yurtiçi Kargo, Aras, MNG gibi kargo firmalarını entegre ediyorum." },
      { icon: LayoutDashboard, title: "Analitik & Raporlama", desc: "Satış, stok ve müşteri verilerini analiz ediyorum." },
    ],
    process: [
      { step: "01", title: "İhtiyaç Belirleme", desc: "Ürün yapısı, hedef kitle ve beklentilerinizi anlıyorum." },
      { step: "02", title: "Tasarım & Kurulum", desc: "Dönüşüm odaklı e-ticaret sitesi tasarlıyor ve kuruyorum." },
      { step: "03", title: "Entegrasyon", desc: "Ödeme, kargo ve ERP entegrasyonlarını tamamlıyorum." },
      { step: "04", title: "Lansman", desc: "Siteyi yayına alıyor, eğitim veriyor ve destek sağlıyorum." },
    ],
    benefits: [
      "Hızlı satışa başlama",
      "Güvenli ödeme altyapısı",
      "Kolay ürün yönetimi",
      "Mobil uyumlu mağaza",
      "SEO dostu yapı",
      "Ölçeklenebilir altyapı",
    ],
    faq: [
      { q: "WooCommerce ile kaç ürün satılabilir?", a: "WooCommerce teknik olarak sınırsız ürünü destekler. Doğru hosting altyapısı ile binlerce ürünü sorunsuz yönetebilirsiniz." },
      { q: "Mevcut e-ticaret sitemi WooCommerce'e taşıyabilir misiniz?", a: "Evet, ürün, kategori ve müşteri verilerinizi sorunsuz şekilde taşıyabilirim." },
    ],
  },
};

const slugMap: Record<string, string> = {
  "seo-danismanligi": "seo-danismanligi",
  "web-tasarim": "web-tasarim",
  "dijital-pazarlama": "dijital-pazarlama",
  "google-ads": "google-ads",
  "marka-danismanligi": "marka-danismanligi",
  "e-ticaret": "e-ticaret",
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-[15px] font-semibold text-white">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p>
      )}
    </div>
  );
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services[slug];

  useEffect(() => {
    if (service) {
      document.title = `${service.metaTitle} - Efehan Yıldız`;
    }
  }, [service]);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
          <p className="mb-6 text-muted">Bu hizmet sayfası bulunamadı.</p>
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            Hizmetlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[180px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2 text-sm text-muted"
          >
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
              <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
                {service.headline}
              </h1>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                {service.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/iletisim"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
                >
                  Ücretsiz Teklif Alın
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://wa.me/905527328055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-4 text-sm font-semibold text-muted transition-all hover:border-primary/30 hover:text-white"
                >
                  WhatsApp ile Yazın
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {service.benefits.slice(0, 4).map((b, i) => (
                <div
                  key={b}
                  className="rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/20"
                >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Bu Hizmet Neler İçeriyor?
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-surface-light p-6 transition-all hover:border-primary/20"
              >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Çalışma Sürecim
            </h2>
          </motion.div>

          <div className="space-y-6">
            {service.process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/20"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
                  {p.step}
                </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Neden Bu Hizmet?
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-light p-4 transition-all hover:border-primary/30"
              >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white">
              Sıkça Sorulan Sorular
            </h2>
          </motion.div>

          <div className="rounded-2xl border border-border bg-surface px-6">
            {service.faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-12" style={{ background: "linear-gradient(135deg, #0c1029 0%, #0d1340 50%, #0c1029 100%)" }}>
            <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-[80px]" />
            <h2 className="relative font-heading text-3xl font-bold text-white">
              Projenizi Konuşalım
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">
              {service.title} hizmetimiz hakkında detaylı bilgi almak ve size özel teklif almak için hemen iletişime geçin.
            </p>
            <Link
              href="/iletisim"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_30px_rgba(29,71,240,0.4)]"
            >
              İletişime Geçin
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
