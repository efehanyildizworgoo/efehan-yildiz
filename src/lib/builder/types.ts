// ─── Block Types ─────────────────────────────────
export type BlockType =
  | "hero"
  | "text"
  | "features"
  | "cta"
  | "faq"
  | "stats"
  | "process"
  | "image"
  | "testimonials"
  | "pricing"
  | "contact-form"
  | "spacer"
  | "custom-html";

// ─── Block Data Interfaces ───────────────────────

export interface HeroBlockData {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  backgroundImage: string;
  alignment: "left" | "center" | "right";
}

export interface TextBlockData {
  heading: string;
  headingTag: "h1" | "h2" | "h3" | "h4";
  content: string;
  alignment: "left" | "center" | "right";
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesBlockData {
  heading: string;
  subtitle: string;
  columns: 2 | 3 | 4;
  items: FeatureItem[];
}

export interface CtaBlockData {
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  style: "default" | "gradient" | "bordered";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlockData {
  heading: string;
  items: FaqItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsBlockData {
  heading: string;
  items: StatItem[];
  columns: 2 | 3 | 4;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ProcessBlockData {
  heading: string;
  items: ProcessStep[];
}

export interface ImageBlockData {
  src: string;
  alt: string;
  width: "small" | "medium" | "full";
  rounded: boolean;
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface TestimonialsBlockData {
  heading: string;
  items: TestimonialItem[];
}

export interface PricingItem {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonUrl: string;
  highlighted: boolean;
}

export interface PricingBlockData {
  heading: string;
  subtitle: string;
  items: PricingItem[];
}

export interface ContactFormBlockData {
  heading: string;
  description: string;
  fields: ("name" | "email" | "phone" | "subject" | "message")[];
  buttonText: string;
}

export interface SpacerBlockData {
  height: number;
}

export interface CustomHtmlBlockData {
  html: string;
}

// ─── Block Union ─────────────────────────────────
export type BlockData =
  | HeroBlockData
  | TextBlockData
  | FeaturesBlockData
  | CtaBlockData
  | FaqBlockData
  | StatsBlockData
  | ProcessBlockData
  | ImageBlockData
  | TestimonialsBlockData
  | PricingBlockData
  | ContactFormBlockData
  | SpacerBlockData
  | CustomHtmlBlockData;

export interface Block {
  id: string;
  type: BlockType;
  data: BlockData;
}

// ─── Block Registry (metadata for the panel) ────
export interface BlockMeta {
  type: BlockType;
  label: string;
  icon: string;
  description: string;
}

export const BLOCK_REGISTRY: BlockMeta[] = [
  { type: "hero", label: "Hero", icon: "Layout", description: "Başlık, açıklama ve butonlarla hero bölümü" },
  { type: "text", label: "Metin", icon: "Type", description: "Başlık ve paragraf metni" },
  { type: "features", label: "Özellikler", icon: "Grid3x3", description: "İkon kartları ile özellik listesi" },
  { type: "cta", label: "Aksiyon", icon: "MousePointerClick", description: "Aksiyon çağrısı bandı" },
  { type: "faq", label: "SSS", icon: "CircleHelp", description: "Soru-cevap akordeon" },
  { type: "stats", label: "İstatistikler", icon: "BarChart3", description: "Sayı ve etiket kartları" },
  { type: "process", label: "Süreç", icon: "ListOrdered", description: "Adım adım süreç" },
  { type: "image", label: "Görsel", icon: "Image", description: "Tekli görsel" },
  { type: "testimonials", label: "Referanslar", icon: "Quote", description: "Müşteri yorumları" },
  { type: "pricing", label: "Fiyatlandırma", icon: "CreditCard", description: "Fiyat tablosu kartları" },
  { type: "contact-form", label: "İletişim Formu", icon: "Mail", description: "İletişim formu" },
  { type: "spacer", label: "Boşluk", icon: "MoveVertical", description: "Dikey boşluk" },
  { type: "custom-html", label: "HTML", icon: "Code", description: "Özel HTML/embed kodu" },
];

// ─── Default Block Data ──────────────────────────
export function getDefaultBlockData(type: BlockType): BlockData {
  switch (type) {
    case "hero":
      return {
        title: "Başlık",
        subtitle: "Alt Başlık",
        description: "Açıklama metni buraya gelecek.",
        primaryButtonText: "İletişime Geçin",
        primaryButtonUrl: "/iletisim",
        secondaryButtonText: "Daha Fazla",
        secondaryButtonUrl: "#",
        backgroundImage: "",
        alignment: "left",
      };
    case "text":
      return {
        heading: "Başlık",
        headingTag: "h2",
        content: "İçerik metni buraya gelecek.",
        alignment: "left",
      };
    case "features":
      return {
        heading: "Özellikler",
        subtitle: "",
        columns: 3,
        items: [
          { icon: "Zap", title: "Özellik 1", description: "Açıklama" },
          { icon: "Shield", title: "Özellik 2", description: "Açıklama" },
          { icon: "Target", title: "Özellik 3", description: "Açıklama" },
        ],
      };
    case "cta":
      return {
        heading: "Harekete Geçin",
        description: "Açıklama metni",
        buttonText: "İletişime Geçin",
        buttonUrl: "/iletisim",
        style: "default",
      };
    case "faq":
      return {
        heading: "Sıkça Sorulan Sorular",
        items: [
          { question: "Soru 1?", answer: "Cevap 1" },
          { question: "Soru 2?", answer: "Cevap 2" },
        ],
      };
    case "stats":
      return {
        heading: "",
        items: [
          { value: "100+", label: "Proje" },
          { value: "50+", label: "Müşteri" },
          { value: "5+", label: "Yıl Deneyim" },
        ],
        columns: 3,
      };
    case "process":
      return {
        heading: "Çalışma Sürecim",
        items: [
          { step: "01", title: "Analiz", description: "Mevcut durumu analiz ediyorum." },
          { step: "02", title: "Strateji", description: "Strateji oluşturuyorum." },
          { step: "03", title: "Uygulama", description: "Uygulamaya geçiyorum." },
        ],
      };
    case "image":
      return { src: "", alt: "", width: "medium", rounded: true };
    case "testimonials":
      return {
        heading: "Müşteri Yorumları",
        items: [
          { name: "Ad Soyad", role: "Pozisyon", content: "Yorum içeriği", avatar: "" },
        ],
      };
    case "pricing":
      return {
        heading: "Fiyatlandırma",
        subtitle: "",
        items: [
          { title: "Başlangıç", price: "₺5.000", period: "/ay", features: ["Özellik 1", "Özellik 2"], buttonText: "Seç", buttonUrl: "/iletisim", highlighted: false },
          { title: "Profesyonel", price: "₺10.000", period: "/ay", features: ["Özellik 1", "Özellik 2", "Özellik 3"], buttonText: "Seç", buttonUrl: "/iletisim", highlighted: true },
        ],
      };
    case "contact-form":
      return {
        heading: "İletişim",
        description: "Bize ulaşın",
        fields: ["name", "email", "message"],
        buttonText: "Gönder",
      };
    case "spacer":
      return { height: 60 };
    case "custom-html":
      return { html: "<div>Özel HTML</div>" };
  }
}
