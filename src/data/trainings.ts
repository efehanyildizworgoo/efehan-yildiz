import { Globe, Search, PenTool, type LucideIcon } from "lucide-react";

export interface CurriculumModule {
  title: string;
  description: string;
  topics: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Training {
  slug: string;
  icon: LucideIcon;
  metaTitle: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  duration: string;
  students: string;
  format: string;
  level: string;
  features: string[];
  curriculum: CurriculumModule[];
  targetAudience: string[];
  faq: FAQ[];
  color: string;
  bgColor: string;
  borderColor: string;
  gradientColor: string;
  lottieUrl: string;
}

export const trainings: Training[] = [
  {
    slug: "wordpress",
    icon: Globe,
    metaTitle: "Online, Birebir WordPress Eğitimi",
    title: "Online WordPress Eğitimi",
    shortTitle: "WordPress",
    description:
      "Sıfırdan profesyonel WordPress sitesi kurmayı öğrenin. Tema seçimi, eklenti yönetimi, hız optimizasyonu ve SEO uyumlu site geliştirme.",
    longDescription:
      "Bu eğitimde WordPress'i sıfırdan öğrenerek profesyonel düzeyde web siteleri oluşturmayı, yönetmeyi ve optimize etmeyi öğreneceksiniz. Birebir mentörlük eşliğinde gerçek projeler üzerinde çalışarak, eğitim sonunda kendi başınıza profesyonel siteler kurabilecek seviyeye geleceksiniz.",
    duration: "20+ Saat",
    students: "500+",
    format: "Online / Birebir",
    level: "Başlangıç → İleri",
    features: [
      "WordPress kurulumu ve ayarları",
      "Tema ve eklenti yönetimi",
      "WooCommerce e-ticaret",
      "Hız ve performans optimizasyonu",
      "SEO temel ayarları",
      "Güvenlik ve yedekleme",
    ],
    curriculum: [
      {
        title: "Hosting & Domain",
        description: "Doğru hosting seçimi, nameserver yönlendirme, ücretsiz SSL kurulumu.",
        topics: [
          "Shared, VPS ve Cloud hosting farkları",
          "Doğru hosting firması seçim kriterleri",
          "Domain satın alma ve nameserver yönlendirme",
          "cPanel temel kullanımı",
          "Ücretsiz SSL kurulumu ve HTTPS geçişi",
        ],
      },
      {
        title: "WordPress Temelleri",
        description: "Dashboard ayarları, kullanıcı rolleri, güvenlik ve yedekleme rutini.",
        topics: [
          "WordPress kurulumu (tek tıkla ve manuel)",
          "Dashboard ve yönetim paneli tanıtımı",
          "Kullanıcı rolleri ve yetki yönetimi",
          "Kalıcı bağlantı (permalink) ayarları",
          "Güvenlik temelleri ve yedekleme rutini oluşturma",
        ],
      },
      {
        title: "WordPress Temaları",
        description: "Tema inceleme kriterleri, lisans kurulumu, child-theme oluşturma.",
        topics: [
          "Ücretsiz vs. premium tema karşılaştırması",
          "Tema inceleme ve seçim kriterleri",
          "Tema lisansı satın alma ve kurulum",
          "Child-theme oluşturma ve özelleştirme",
          "Tema güncelleme ve versiyon yönetimi",
        ],
      },
      {
        title: "Sayfa Düzenleyiciler",
        description: "Gutenberg vs. Elementor; blok mantığı, responsive düzenleme.",
        topics: [
          "Gutenberg blok editör temelleri",
          "Elementor kurulumu ve arayüz tanıtımı",
          "Section, column ve widget mantığı",
          "Responsive düzenleme ve mobil uyumluluk",
          "Şablon ve global widget oluşturma",
        ],
      },
      {
        title: "İleri Seviye Tasarım",
        description: "Global stil kütüphanesi, animasyon & motion ekleme, A/B tasarım ipuçları.",
        topics: [
          "Global renk ve tipografi sistemi kurma",
          "Stil kütüphanesi (Design System) oluşturma",
          "Animasyon ve motion efektleri ekleme",
          "A/B tasarım testleri ve ipuçları",
          "Header, footer ve popup tasarımı",
        ],
      },
      {
        title: "Hız & SEO Başlangıcı",
        description: "LiteSpeed Cache, temel site hızı ayarları, SEO eklentisi kurulumu.",
        topics: [
          "LiteSpeed Cache kurulumu ve yapılandırması",
          "Görsel optimizasyonu (WebP, lazy load)",
          "Core Web Vitals temel iyileştirmeler",
          "SEO eklentisi (Rank Math) kurulumu",
          "Temel on-page SEO ayarları ve site haritası",
        ],
      },
    ],
    targetAudience: [
      "Kendi web sitesini kurmak isteyen girişimciler",
      "Freelance web geliştirici olmak isteyenler",
      "Mevcut sitesini daha iyi yönetmek isteyen işletme sahipleri",
      "Dijital pazarlama alanında kariyer yapmak isteyenler",
      "E-ticaret sitesi kurmak isteyenler",
    ],
    faq: [
      {
        question: "Eğitim için teknik bilgi gerekli mi?",
        answer:
          "Hayır, eğitim sıfırdan başlıyor. Bilgisayar kullanabiliyorsanız yeterli. Her konuyu adım adım birlikte işliyoruz.",
      },
      {
        question: "Eğitim süresi ne kadar?",
        answer:
          "Toplam 20+ saat birebir eğitim. Haftada 2-3 seans şeklinde, sizin programınıza uygun planlanır.",
      },
      {
        question: "Eğitim sonrası destek var mı?",
        answer:
          "Evet, eğitim sonrası 3 ay boyunca WhatsApp üzerinden sınırsız soru sorabilirsiniz.",
      },
      {
        question: "Kendi sitem üzerinde mi çalışıyoruz?",
        answer:
          "Evet, eğitim boyunca kendi gerçek projeniz üzerinde çalışırsınız. Eğitim bittiğinde elinizde yayına hazır bir site olur.",
      },
    ],
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    gradientColor: "from-blue-500/20 to-primary/5",
    lottieUrl: "/lottie/coding.json",
  },
  {
    slug: "seo",
    icon: Search,
    metaTitle: "Online, Birebir SEO Eğitimi",
    title: "Online SEO Eğitimi",
    shortTitle: "SEO",
    description:
      "SEO'nun temellerinden ileri seviye tekniklere kadar. Google'da üst sıralara çıkmanız için gereken tüm bilgiler.",
    longDescription:
      "Google'da üst sıralara çıkmanın yollarını birebir eğitimle öğrenin. Anahtar kelime araştırmasından teknik SEO'ya, içerik stratejisinden link building'e kadar SEO'nun tüm boyutlarını gerçek projeler üzerinde uygulayarak öğreneceksiniz.",
    duration: "15+ Saat",
    students: "300+",
    format: "Online / Birebir",
    level: "Başlangıç → İleri",
    features: [
      "SEO temelleri ve terminoloji",
      "Anahtar kelime araştırması",
      "On-page ve off-page SEO",
      "Teknik SEO",
      "İçerik stratejisi",
      "Google Search Console & Analytics",
    ],
    curriculum: [
      {
        title: "SEO Temelleri",
        description: "SERP anatomisi, ranking sinyalleri ve arama intent'ini anlama.",
        topics: [
          "Arama motorları nasıl çalışır? (Crawl, Index, Rank)",
          "SERP anatomisi ve sonuç tipleri",
          "Google ranking sinyalleri ve algoritma güncellemeleri",
          "Arama niyeti (search intent) türleri ve analizi",
          "SEO araçlarına giriş ve workspace kurulumu",
        ],
      },
      {
        title: "Anahtar Kelime",
        description: "Hacim, KD, fırsat boşluğu; Ahrefs & Semrush canlı demo.",
        topics: [
          "Anahtar kelime türleri (short-tail, long-tail, LSI)",
          "Arama hacmi, KD ve tıklama potansiyeli analizi",
          "Ahrefs ile anahtar kelime araştırması (canlı demo)",
          "Semrush ile rakip anahtar kelime analizi",
          "Fırsat boşluğu (content gap) tespiti ve haritalama",
        ],
      },
      {
        title: "Teknik SEO",
        description: "Crawl bütçesi, mobil uyum, Core Web Vitals, schema kurulumu.",
        topics: [
          "Crawl bütçesi optimizasyonu ve log analizi",
          "XML sitemap ve robots.txt yapılandırması",
          "Mobil uyumluluk ve mobile-first indexing",
          "Core Web Vitals (LCP, INP, CLS) iyileştirme",
          "Schema markup kurulumu ve zengin sonuçlar",
        ],
      },
      {
        title: "On-Page Optimizasyon",
        description: "Başlık, meta, heading hiyerarşisi; entity & NLP odaklı içerik.",
        topics: [
          "Title tag ve meta description optimizasyonu",
          "Heading hiyerarşisi (H1-H6) ve içerik yapısı",
          "URL yapısı ve iç linkleme stratejisi",
          "Entity-based SEO ve NLP odaklı içerik yazımı",
          "Görsel optimizasyonu (alt tag, dosya adı, boyut)",
        ],
      },
      {
        title: "Off-Page & Backlink",
        description: "Dijital PR, otorite inşası, risk analizi, link detox.",
        topics: [
          "Backlink temelleri ve link profili analizi",
          "Dijital PR ile doğal link kazanımı",
          "Guest posting ve broken link building",
          "Otorite inşası ve marka sinyalleri",
          "Risk analizi, toxic link tespiti ve link detox",
        ],
      },
      {
        title: "Analiz & Raporlama",
        description: "GA4, Search Console, Data Studio dashboard ile KPI takibi.",
        topics: [
          "Google Search Console detaylı kullanımı",
          "Google Analytics 4 kurulumu ve raporları",
          "Looker Studio (Data Studio) ile SEO dashboard",
          "KPI belirleme ve performans takibi",
          "Aylık SEO raporu hazırlama ve sunum",
        ],
      },
    ],
    targetAudience: [
      "Web sitesi sahipleri ve yöneticileri",
      "Dijital pazarlama uzmanı olmak isteyenler",
      "İçerik üreticileri ve blog yazarları",
      "E-ticaret site sahipleri",
      "Freelance SEO uzmanı olmak isteyenler",
    ],
    faq: [
      {
        question: "SEO eğitimi için ön koşul var mı?",
        answer:
          "Bir web sitesine sahip olmanız veya üzerinde çalışacağınız bir projeniz olması yeterli. Teknik bilgi gerekmez.",
      },
      {
        question: "Hangi SEO araçlarını kullanacağız?",
        answer:
          "Google Search Console, Google Analytics 4, Ahrefs/SEMrush, Screaming Frog ve daha birçok profesyonel araç.",
      },
      {
        question: "Sonuçları ne zaman görürüm?",
        answer:
          "SEO uzun vadeli bir yatırımdır. İlk iyileşmeleri 2-3 ay içinde, belirgin sonuçları 4-6 ay içinde görmeye başlarsınız.",
      },
      {
        question: "Eğitim sonrası destek var mı?",
        answer:
          "Evet, eğitim sonrası 3 ay boyunca WhatsApp üzerinden sorularınıza destek veriyorum.",
      },
    ],
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
    gradientColor: "from-emerald-500/20 to-primary/5",
    lottieUrl: "/lottie/search.json",
  },
  {
    slug: "web-tasarim",
    icon: PenTool,
    metaTitle: "Online, Birebir Web Tasarım Eğitimi",
    title: "Web Tasarım Eğitimi",
    shortTitle: "Web Tasarım",
    description:
      "Modern web tasarım prensipleri, UI/UX temelleri ve WordPress ile profesyonel site tasarımı.",
    longDescription:
      "Görsel olarak etkileyici ve kullanıcı dostu web siteleri tasarlamayı öğrenin. UI/UX temelleri, renk teorisi, tipografi ve WordPress page builder'lar ile profesyonel düzeyde web tasarım becerisi kazanın.",
    duration: "18+ Saat",
    students: "200+",
    format: "Online / Birebir",
    level: "Başlangıç → Orta",
    features: [
      "UI/UX temelleri",
      "Responsive tasarım",
      "WordPress page builder'lar",
      "Renk ve tipografi",
      "Dönüşüm odaklı tasarım",
      "Portföy oluşturma",
    ],
    curriculum: [
      {
        title: "Tasarım Temelleri",
        description: "Renk teorisi, tipografi seçimi, görsel hiyerarşi ve beyaz alan kullanımı.",
        topics: [
          "Renk teorisi ve uyumlu palet oluşturma",
          "Tipografi seçimi ve font eşleştirme kuralları",
          "Görsel hiyerarşi ve okuma akışı tasarımı",
          "Beyaz alan (whitespace) kullanım stratejileri",
          "Mood board ve stil rehberi hazırlama",
        ],
      },
      {
        title: "UI/UX Prensipleri",
        description: "Wireframe oluşturma, kullanıcı akışları, erişilebilirlik standartları.",
        topics: [
          "UX tasarım süreci ve kullanıcı araştırması",
          "Wireframe ve low-fidelity prototip oluşturma",
          "Kullanıcı akışları (user flow) haritalama",
          "Erişilebilirlik (WCAG) standartları ve uygulaması",
          "Figma ile temel prototipleme",
        ],
      },
      {
        title: "Responsive Tasarım",
        description: "Mobile-first yaklaşım, breakpoint stratejisi, çoklu cihaz testleri.",
        topics: [
          "Mobile-first tasarım felsefesi",
          "Breakpoint stratejisi ve grid sistemi",
          "Fluid tipografi ve esnek görseller",
          "Tablet ve masaüstü adaptasyonu",
          "Çoklu cihaz ve tarayıcı testleri",
        ],
      },
      {
        title: "Page Builder Uygulama",
        description: "Elementor Pro ile section tasarımı, global stil yönetimi, template sistemi.",
        topics: [
          "Elementor Pro arayüzü ve widget kütüphanesi",
          "Section ve column ile layout tasarımı",
          "Global renk, font ve stil yönetimi",
          "Template ve theme builder kullanımı",
          "Özel CSS ile ince ayar ve animasyonlar",
        ],
      },
      {
        title: "Dönüşüm Odaklı Tasarım",
        description: "CTA yerleşimi, A/B test mantığı, landing page optimizasyonu.",
        topics: [
          "Dönüşüm hunisi ve kullanıcı psikolojisi",
          "Etkili CTA (Call-to-Action) yerleşimi",
          "Landing page tasarım prensipleri",
          "A/B test mantığı ve uygulama ipuçları",
          "Form tasarımı ve dönüşüm optimizasyonu",
        ],
      },
      {
        title: "Portföy & Freelance",
        description: "Kişisel portföy sitesi oluşturma, case study yazımı, müşteri süreci.",
        topics: [
          "Kişisel portföy sitesi tasarımı ve yayınlama",
          "Case study yazımı ve proje sunumu",
          "Freelance tasarımcı olarak konumlanma",
          "Müşteri brief alma ve teklif hazırlama",
          "Tasarım teslim süreci ve revizyon yönetimi",
        ],
      },
    ],
    targetAudience: [
      "Web tasarımcı olmak isteyenler",
      "Kendi sitesini profesyonel görünümlü yapmak isteyenler",
      "WordPress ile çalışan geliştiriciler",
      "Grafik tasarımcılar (web'e geçiş)",
      "Freelance çalışmak isteyen dijital profesyoneller",
    ],
    faq: [
      {
        question: "Tasarım programı bilmem gerekiyor mu?",
        answer:
          "Hayır, eğitimde ihtiyacınız olan tüm araçları birlikte öğreniyoruz. Figma gibi ücretsiz araçlarla başlıyoruz.",
      },
      {
        question: "Eğitim sonunda portföyüm olacak mı?",
        answer:
          "Evet, eğitim boyunca en az 3 proje üzerinde çalışacak ve eğitim sonunda hazır bir portföy siteniz olacak.",
      },
      {
        question: "Kodlama bilmem gerekiyor mu?",
        answer:
          "Hayır, WordPress page builder'lar ile kodsuz tasarım yapacağız. Ama temel CSS bilgisi eğitim içinde öğretilecek.",
      },
      {
        question: "Eğitim programı esnek mi?",
        answer:
          "Evet, birebir eğitim olduğu için tamamen sizin programınıza göre planlanır. Hafta içi veya hafta sonu seçenekleri mevcuttur.",
      },
    ],
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
    gradientColor: "from-purple-500/20 to-primary/5",
    lottieUrl: "/lottie/design.json",
  },
];

export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return trainings.map((t) => t.slug);
}
