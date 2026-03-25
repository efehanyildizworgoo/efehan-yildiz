"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  Play,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  Send,
  List,
} from "lucide-react";
import { useRef, useState } from "react";

/* ─── Types ─── */
interface VideoItem {
  title: string;
  thumbnail: string;
  youtubeId: string;
}

interface ContentSection {
  heading: string;
  body: string[];
  level?: number;
  tips?: string[];
  warnings?: string[];
  image?: string;
  imageAlt?: string;
  imagePlaceholder?: string;
}

interface GuideTab {
  label: string;
  sections: ContentSection[];
}

interface ChecklistCategory {
  title: string;
  items: string[];
}

interface GuideData {
  category: string;
  categorySlug: string;
  title: string;
  subtitle: string;
  type?: "guide" | "checklist" | "tabbed";
  videos: VideoItem[];
  sections: ContentSection[];
  tabs?: GuideTab[];
  checklist?: ChecklistCategory[];
  pdfFileName: string;
}

/* ─── Guide Content Database ─── */
const guides: Record<string, Record<string, GuideData>> = {
  "analiz-olcum": {
    "gsc-kilavuzu": {
      category: "Analiz & Ölçüm Araçları",
      categorySlug: "analiz-olcum",
      title: "Kapsamlı Google Search Console Kılavuzu",
      subtitle:
        "Google Search Console'u etkili kullanarak sitenizin organik performansını ölçün, sorunları tespit edin ve sıralamanızı yükseltin.",
      videos: [
        {
          title: "Google Search Console Kurulumu ve Kullanımı — Başlangıç Rehberi",
          thumbnail: "https://img.youtube.com/vi/0UGsSTnmGXA/maxresdefault.jpg",
          youtubeId: "0UGsSTnmGXA",
        },
        {
          title: "Google Search Console'da Kullanıcı Arayüzünü Keşfet",
          thumbnail: "https://img.youtube.com/vi/jaJRBO6gJKs/maxresdefault.jpg",
          youtubeId: "jaJRBO6gJKs",
        },
      ],
      sections: [
        {
          heading: "Google Search Console Nedir? Ne İşe Yarar?",
          body: [
            "Google Search Console (GSC), Google'ın web yöneticilerine sunduğu ücretsiz bir araçtır. Sitenizin Google arama sonuçlarındaki performansını izlemenize, dizine ekleme durumunu kontrol etmenize ve olası sorunları tespit etmenize yardımcı olur.",
            "GSC ile şunları yapabilirsiniz:",
          ],
          tips: [
            "Hangi anahtar kelimelerde sıralandığınızı görebilirsiniz",
            "Tıklama oranı (CTR), gösterim ve ortalama pozisyon verilerini analiz edebilirsiniz",
            "Dizine ekleme hatalarını tespit edip çözebilirsiniz",
            "Sitemap gönderimi ve URL denetimleri yapabilirsiniz",
            "Mobil uyumluluk sorunlarını belirleyebilirsiniz",
            "Core Web Vitals metriklerini takip edebilirsiniz",
          ],
        },
        {
          heading: "Search Console Kurulumu (Adım Adım)",
          body: [
            "Google Search Console'u kullanmaya başlamak için öncelikle sitenizi doğrulamanız gerekir. Aşağıdaki adımları izleyerek kurulumu tamamlayabilirsiniz:",
          ],
          tips: [
            "search.google.com/search-console adresine gidin",
            "Google hesabınızla giriş yapın",
            "\"Mülk Ekle\" butonuna tıklayın",
            "\"Alan\" veya \"URL Öneki\" doğrulama yöntemini seçin (Alan yöntemi önerilir)",
            "DNS kaydı ile doğrulama yapın (en güvenilir yöntem)",
            "Doğrulama tamamlandıktan sonra verilerin gelmesi 24-48 saat sürebilir",
          ],
          warnings: [
            "Alan doğrulaması, hem www hem de www olmayan sürümleri kapsar. Mümkünse bu yöntemi tercih edin.",
          ],
        },
        {
          heading: "Temel Raporlar ve Anlamları",
          body: [
            "Search Console'daki raporlar, sitenizin Google'daki performansını anlamanız için kritik veriler sunar. Her raporu doğru okumak, SEO stratejinizi şekillendirir.",
          ],
        },
        {
          heading: "1. Performans Raporu",
          level: 3,
          body: [
            "Performans raporu, sitenizin Google aramalarındaki en önemli metriklerini gösterir. Bu raporda dört temel metriği inceleyebilirsiniz:",
          ],
          tips: [
            "Toplam Tıklama: Kullanıcıların arama sonuçlarından sitenize kaç kez tıkladığı",
            "Toplam Gösterim: Sitenizin arama sonuçlarında kaç kez gösterildiği",
            "Ortalama TO (CTR): Gösterimlerin tıklamaya dönüşme oranı",
            "Ortalama Pozisyon: Sorgulamalar için ortalama sıralama konumunuz",
          ],
          warnings: [
            "CTR'ın düşük olması, title ve meta description'larınızı optimize etmeniz gerektiğine işaret edebilir.",
          ],
        },
        {
          heading: "2. Dizin Kapsamı Raporu",
          level: 3,
          body: [
            "Bu rapor, Google'ın sitenizin sayfalarını nasıl dizine aldığını gösterir. Hangi sayfaların dizinde olduğunu, hangilerinin hariç tutulduğunu ve olası hataları buradan takip edebilirsiniz.",
          ],
          tips: [
            "\"Geçerli\" sayfalar: Google tarafından başarıyla dizine eklenmiş sayfalar",
            "\"Uyarılı\" sayfalar: Dizine alınmış ancak potansiyel sorunları olan sayfalar",
            "\"Hariç tutulan\" sayfalar: Çeşitli nedenlerle dizine alınmamış sayfalar",
            "\"Hata\" sayfalar: Dizine eklenmesinde ciddi sorunlar olan sayfalar",
          ],
        },
        {
          heading: "3. Önemli Web Verileri (Core Web Vitals)",
          level: 3,
          body: [
            "Core Web Vitals, Google'ın kullanıcı deneyimini değerlendirmek için kullandığı metriklerdir. Bu metrikler doğrudan sıralama faktörü olarak kabul edilir.",
          ],
          tips: [
            "LCP (Largest Contentful Paint): En büyük içerik öğesinin yüklenme süresi. 2.5 saniyenin altında olmalı",
            "INP (Interaction to Next Paint): Kullanıcı etkileşimlerinin yanıt süresi. 200ms altında olmalı",
            "CLS (Cumulative Layout Shift): Görsel kararlılık. 0.1'in altında olmalı",
          ],
          warnings: [
            "Kötü Core Web Vitals değerleri, mobil sıralamanızı doğrudan olumsuz etkiler.",
          ],
        },
        {
          heading: "Search Console ile Rapor Oluşturma",
          body: [
            "GSC verilerini düzenli olarak raporlamak, SEO stratejinizi veri odaklı hale getirir. Performans raporlarını tarih aralıklarına, sayfalara, sorgulamalara ve ülkelere göre filtreleyerek detaylı analizler yapabilirsiniz.",
            "Rapor oluştururken dikkat edilmesi gerekenler:",
          ],
          tips: [
            "Haftalık veya aylık karşılaştırma yaparak trendleri takip edin",
            "En çok tıklanan ve gösterilen anahtar kelimeleri listeleyin",
            "CTR'ı düşük olan yüksek gösterimli sayfaları optimize edin",
            "Pozisyon değişimlerini düzenli olarak kontrol edin",
            "Verileri Google Sheets veya Looker Studio'ya aktararak görselleştirin",
          ],
        },
      ],
      pdfFileName: "google-search-console-kilavuzu.pdf",
    },
    "ga4-seo-metrikleri": {
      category: "Analiz & Ölçüm Araçları",
      categorySlug: "analiz-olcum",
      title: "GA4 ve SEO: Organik Performans Metrikleri Kılavuzu",
      subtitle:
        "Google Analytics 4'ü SEO perspektifinden kullanarak organik trafik performansınızı ölçün ve stratejinizi veriye dayalı şekillendirin.",
      videos: [
        {
          title: "GA4 ile SEO Analizi — Temel Metrikler",
          thumbnail: "https://img.youtube.com/vi/WnbMOFl_Jxg/maxresdefault.jpg",
          youtubeId: "WnbMOFl_Jxg",
        },
        {
          title: "GA4 SEO Raporları Oluşturma",
          thumbnail: "https://img.youtube.com/vi/XPxBsm_mPVg/maxresdefault.jpg",
          youtubeId: "XPxBsm_mPVg",
        },
      ],
      sections: [
        {
          heading: "GA4, SEO İçin Neden Önemli?",
          body: [
            "Google Analytics 4 (GA4), web sitenizin kullanıcı davranışlarını ve trafik kaynaklarını analiz etmeniz için Google'ın sunduğu en güncel analitik platformudur. SEO çalışmalarınızın etkisini doğru ölçebilmek için GA4 verilerini anlamak kritik öneme sahiptir.",
            "GA4, Universal Analytics'ten farklı olarak olay tabanlı bir veri modeli kullanır. Bu sayede kullanıcı etkileşimlerini çok daha detaylı takip edebilirsiniz.",
          ],
          tips: [
            "Organik trafiğinizin toplam trafiğe oranını anlık görebilirsiniz",
            "Hangi sayfaların organik aramadan en çok trafik aldığını belirleyebilirsiniz",
            "Kullanıcıların sitenizde ne kadar süre kaldığını, hangi sayfaları ziyaret ettiğini izleyebilirsiniz",
            "SEO çalışmalarınızın dönüşüme etkisini ölçebilirsiniz",
          ],
        },
        {
          heading: "Başlangıç: GA4 ve Search Console Bağlantısı",
          body: [
            "GA4'ün SEO verilerinden tam verim alabilmek için Google Search Console ile bağlantı kurmanız şiddetle önerilir. Bu entegrasyon, GA4 içinde organik arama sorgularını ve tıklama verilerini görmenizi sağlar.",
          ],
          tips: [
            "GA4 Yönetici panelinden \"Ürün Bağlantıları\" bölümüne gidin",
            "\"Search Console Bağlantısı\" seçeneğini tıklayın ve GSC mülkünüzü bağlayın",
            "Bağlantıdan sonra \"Raporlar > Search Console\" altında organik veriler görünür",
            "Veri akışı başlaması 24-48 saat sürebilir",
          ],
          warnings: [
            "Bağlantı yapılmazsa GA4'te organik anahtar kelime verileri görünmez. Search Console entegrasyonu mutlaka yapılmalıdır.",
          ],
        },
        {
          heading: "SEO İçin İzlenmesi Gereken Temel GA4 Raporları",
          body: [
            "GA4'te SEO performansınızı ölçmek için birkaç temel raporu düzenli olarak takip etmelisiniz. Bu raporlar, organik trafiğinizin kalitesini ve etkisini anlamanıza yardımcı olur.",
          ],
        },
        {
          heading: "1. Kullanıcı Edinme (User Acquisition) Raporu",
          level: 3,
          body: [
            "Bu rapor, sitenize gelen kullanıcıların hangi kanallardan geldiğini gösterir. \"Organic Search\" filtresini uygulayarak yalnızca SEO kaynaklı trafiği inceleyebilirsiniz.",
          ],
          tips: [
            "Raporlar > Edinme > Kullanıcı Edinme yolunu izleyin",
            "\"İlk kullanıcı ortamı\" boyutunda \"Organic Search\" filtreleyin",
            "Yeni kullanıcı sayısı, etkileşim oranı ve dönüşüm metriklerini takip edin",
          ],
        },
        {
          heading: "2. Trafik Edinme (Traffic Acquisition) Raporu",
          level: 3,
          body: [
            "Kullanıcı edinmeden farklı olarak, bu rapor her oturumun kaynağını gösterir. Bir kullanıcı ilk kez reklamdan gelse bile, sonraki organik ziyaretleri burada görünür.",
          ],
          tips: [
            "Raporlar > Edinme > Trafik Edinme yolunu izleyin",
            "Oturum bazlı organik trafik verilerini inceleyin",
            "Kanal gruplarına göre karşılaştırma yapın",
          ],
        },
        {
          heading: "3. Search Console Raporları (GA4 İçi Entegrasyon)",
          level: 3,
          body: [
            "Search Console bağlantısı yapıldıktan sonra GA4 içinde doğrudan organik arama sorgularını ve landing page performansını görebilirsiniz.",
          ],
          tips: [
            "Raporlar > Search Console > Sorgular: Hangi anahtar kelimelerle trafik aldığınızı gösterir",
            "Raporlar > Search Console > Google Organik Arama Trafiği: Hangi sayfaların en çok organik tıklama aldığını gösterir",
          ],
        },
        {
          heading: "4. Sayfa/Ekran (Landing Page) Raporu",
          level: 3,
          body: [
            "Bu rapor, kullanıcıların sitenize hangi sayfadan giriş yaptığını gösterir. Organik filtreyle birleştirildiğinde, SEO'dan en çok trafik alan sayfalarınızı belirlersiniz.",
          ],
          tips: [
            "Raporlar > Etkileşim > Açılış Sayfası yolunu izleyin",
            "\"Oturum kaynak/ortam\" ikincil boyutunu ekleyin ve \"google / organic\" filtreleyin",
            "Sayfa başına oturum süresi, hemen çıkma oranı ve dönüşüm verilerini kontrol edin",
          ],
        },
        {
          heading: "Hangi Metrik Ne Anlama Geliyor? (SEO Stratejisi)",
          body: [
            "GA4'teki metrikleri doğru yorumlamak, SEO stratejinizi şekillendirmenin temelidir.",
          ],
          tips: [
            "Etkileşim Oranı (Engagement Rate): Kullanıcıların sitenizde anlamlı bir etkileşimde bulunma oranı. Yüksek olması içerik kalitesinin iyi olduğunu gösterir",
            "Ortalama Etkileşim Süresi: Kullanıcıların sayfada aktif olarak geçirdiği süre. Uzun süre = değerli içerik",
            "Dönüşümler: SEO trafiğinin iş hedeflerinize katkısını ölçer (form, satın alma, kayıt vb.)",
          ],
        },
        {
          heading: "Organik Kullanıcılar ve Organik Oturumlar",
          body: [
            "\"Kullanıcılar\" tekil ziyaretçileri, \"Oturumlar\" ise toplam ziyaret sayısını ifade eder. Bir kullanıcı birden fazla oturum açabilir. SEO raporlarında her ikisini de takip etmek önemlidir.",
          ],
          tips: [
            "Kullanıcı sayısı artıyorsa: SEO ile yeni kitleye ulaşıyorsunuz demektir",
            "Oturum/Kullanıcı oranı yüksekse: Mevcut organik kullanıcılar tekrar geliyor, bu sadakat göstergesidir",
          ],
        },
        {
          heading: "Organik Trafikten Gelen Dönüşümler (Conversions)",
          body: [
            "SEO'nun gerçek değerini ölçmenin en iyi yolu, organik trafikten gelen dönüşümleri takip etmektir. GA4'te dönüşüm olayları tanımlayarak SEO'nun ROI'sini hesaplayabilirsiniz.",
          ],
          tips: [
            "GA4 Yönetici > Olaylar bölümünden önemli olayları \"dönüşüm\" olarak işaretleyin",
            "Form gönderimi, satın alma, kayıt gibi hedeflerinizi tanımlayın",
            "Edinme raporlarında \"Organic Search\" kanalının dönüşüm sayısını ve değerini kontrol edin",
          ],
          warnings: [
            "Dönüşüm tanımlamadan GA4 kullanmak, SEO çalışmalarınızın iş etkisini ölçememenize neden olur.",
          ],
        },
      ],
      pdfFileName: "ga4-seo-metrikleri-kilavuzu.pdf",
    },
    "seo-site-denetimi-checklist": {
      category: "Analiz & Ölçüm Araçları",
      categorySlug: "analiz-olcum",
      title: "Kapsamlı SEO Site Denetimi Checklist",
      subtitle:
        "Sitenizin SEO sağlığını adım adım kontrol edin. Maddeleri tamamladıkça ilerlemenizi takip edin.",
      type: "checklist",
      videos: [],
      sections: [],
      checklist: [
        {
          title: "1. Temel Kontroller",
          items: [
            "Google Search Console kurulumu ve mülk doğrulaması yapıldı.",
            "Google Analytics 4 (GA4) kurulumu yapıldı ve GSC bağlantısı kuruldu.",
            "Sitenin 'site:alanadi.com' komutu ile dizine ekleme durumu kontrol edildi.",
            "Manuel spam cezası olup olmadığı GSC'den kontrol edildi.",
            "Tercih edilen alan adı (www ve www olmayan) yönlendirmesi yapıldı.",
          ],
        },
        {
          title: "2. Teknik SEO",
          items: [
            "Robots.txt dosyası mevcut ve önemli sayfalar engellenmemiş.",
            "XML Sitemap oluşturuldu, güncel ve GSC'ye gönderildi.",
            "Site HTTPS (SSL) kullanıyor ve HTTP'den HTTPS'ye yönlendirme mevcut.",
            "Core Web Vitals (LCP, FID, CLS) değerleri GSC'de 'İyi' durumda.",
            "Mobil uyumluluk testi yapıldı, site mobil dostu.",
            "Kırık linkler (404 hataları) kontrol edildi.",
            "Canonical etiketleri doğru şekilde kullanılıyor.",
            "Structured Data (Schema Markup) uygulandı ve test edildi.",
          ],
        },
        {
          title: "3. İçerik Denetimi",
          items: [
            "Anahtar kelime araştırması ve haritalama yapıldı (keyword mapping).",
            "Tüm önemli sayfaların Meta Title ve Description'ı optimize edildi.",
            "Başlık hiyerarşisi (H1, H2, H3) mantıklı ve düzgün kullanılıyor.",
            "İçerikler özgün, değerli ve kullanıcı niyetine uygun.",
            "Görseller sıkıştırıldı (WebP/AVIF) ve ALT etiketleri eklendi.",
            "İç bağlantılar (internal linking) stratejik olarak kuruldu.",
          ],
        },
        {
          title: "4. Off-Page SEO",
          items: [
            "Mevcut backlink profili (Ahrefs, Semrush vb.) analiz edildi.",
            "Zararlı veya spam backlinkler tespit edildi ve Disavow aracı değerlendirildi.",
            "Rakiplerin backlink stratejileri incelendi.",
            "Google İşletme Profili (Local SEO) optimize edildi.",
            "Sosyal medya profilleri ve marka bilinirliği kontrol edildi.",
          ],
        },
      ],
      pdfFileName: "seo-site-denetimi-checklist.pdf",
    },
  },
  "anahtar-kelime": {
    "google-keyword-planner-kilavuzu": {
      category: "Anahtar Kelime Araçları",
      categorySlug: "anahtar-kelime",
      title: "Google Keyword Planner (Anahtar Kelime Planlayıcı) Kılavuzu",
      subtitle:
        "SEO ve içerik stratejinizi güçlendirmek için Google'ın ücretsiz anahtar kelime araştırma aracını etkili kullanmanın rehberi.",
      videos: [
        {
          title: "Google Keyword Planner Kullanımı — Baştan Sona",
          thumbnail: "https://img.youtube.com/vi/qlxmLiLKaBQ/maxresdefault.jpg",
          youtubeId: "qlxmLiLKaBQ",
        },
      ],
      sections: [
        {
          heading: "Keyword Planner Nedir? Neden Kullanmalıyız?",
          body: [
            "Google Keyword Planner (Anahtar Kelime Planlayıcı), Google Ads platformunun içinde yer alan ücretsiz ve güçlü bir anahtar kelime araştırma aracıdır. Her ne kadar birincil amacı reklam kampanyaları için kelime bulmak olsa da, SEO uzmanları ve içerik üreticileri tarafından organik anahtar kelime stratejisi oluşturmak için de yaygın şekilde kullanılır.",
            "Bu aracı kullanarak şunları yapabilirsiniz:",
          ],
          tips: [
            "Belirli bir konu veya ürün etrafında yüzlerce yeni anahtar kelime fikri keşfedin",
            "Her anahtar kelimenin aylık ortalama arama hacmini, rekabet seviyesini ve önerilen CPC (tıklama başı maliyet) değerini görün",
            "\"Yeni Anahtar Kelimeler Keşfet\" ve \"Arama Hacmi ve Tahminler\" olmak üzere iki ana özelliği bulunur",
            "Hedef kitlenizi ve onların arama alışkanlıklarını anlayarak içerik ve SEO stratejinizi veriye dayalı şekillendirin",
          ],
        },
        {
          heading: "Keyword Planner'a Nasıl Erişilir?",
          body: [
            "Keyword Planner'ı kullanmak için bir Google Ads hesabınızın olması yeterlidir, aktif reklam kampanyanız olmasına gerek yoktur. Ücretsiz bir hesap oluşturarak araca erişebilirsiniz:",
          ],
          tips: [
            "https://ads.google.com adresine gidin ve Google hesabınızla oturum açın",
            "Sol üst menüden \"Araçlar\" → \"Planlama\" → \"Anahtar Kelime Planlayıcısı\" yolunu izleyin",
            "İlk kez giriş yapıyorsanız, kampanya oluşturma adımını atlamak için \"Uzman Modu\"na geçin",
            "Kampanya oluşturmadan doğrudan Keyword Planner'a yönlendirileceksiniz",
          ],
        },
        {
          heading: "Adım Adım Anahtar Kelime Araştırması",
          body: [
            "Ana ekranda iki seçenek göreceksiniz. SEO için en çok kullandığımız \"Yeni anahtar kelimeler keşfedin\" seçeneğidir.",
          ],
          imagePlaceholder: "Keyword Planner Giriş Ekranı",
        },
        {
          heading: "1. \"Anahtar Kelimelerle Başlayın\"",
          level: 3,
          body: [
            "Bu seçenekte, işiniz veya içeriğinizle ilgili 1-10 adet tohum kelime (seed keyword) girersiniz. Örneğin: \"SEO danışmanlık\", \"anahtar kelime araştırması\". Keyword Planner bu kelimelere dayalı olarak yüzlerce ilgili öneri sunar. Sonuçları konum (Türkiye, İstanbul vb.) ve dil (Türkçe) ile filtreleyerek yerel verilere odaklanabilirsiniz.",
          ],
        },
        {
          heading: "2. \"Bir Web Sitesiyle Başlayın\"",
          level: 3,
          body: [
            "Bir web sitesi URL'si girerek o sitenin içeriğine uygun anahtar kelime önerileri alabilirsiniz. Kendi sitenizi veya bir rakibin sitesini analiz etmek için kullanışlıdır. Google sayfanın içeriğini tarar ve ilgili anahtar kelimeleri önerir. Bu özellik rakip analizi için de oldukça faydalıdır.",
          ],
        },
        {
          heading: "Metrikler Nasıl Yorumlanır?",
          body: [
            "Anahtar kelime sonuçlarında birkaç önemli metrik göreceksiniz. Bu metrikleri doğru yorumlamak, SEO stratejiniz için kritiktir:",
          ],
        },
        {
          heading: "Ort. Aylık Arama Sayısı (Avg. Monthly Searches)",
          level: 3,
          body: [
            "Bu metrik, bir anahtar kelimenin seçtiğiniz konum ve zaman diliminde aylık ortalama kaç kez arandığını gösterir. Aktif reklam kampanyanız yoksa Google bu değeri aralık olarak gösterir (ör: 1K-10K). Yüksek hacim her zaman en iyisi demek değildir — rekabeti ve arama amacını da değerlendirmelisiniz.",
          ],
          warnings: [
            "Aktif reklam vermiyorsanız veriler aralık olarak gösterilir. Daha kesin veriler için düşük bütçeli bir deneme kampanyası başlatabilirsiniz.",
          ],
        },
        {
          heading: "Rekabet (Competition)",
          level: 3,
          body: [
            "Rekabet sütunu \"Düşük\", \"Orta\" veya \"Yüksek\" olarak gösterilir. Bu metrik aslında reklam verenlerin rekabet seviyesini gösterir, organik SEO rekabetini değil. Ancak yine de faydalı bir göstergedir — reklam verenlerin ilgilendiği kelimeler genellikle ticari değer taşır.",
          ],
        },
        {
          heading: "Yıllık Değişim (YoY Change)",
          level: 3,
          body: [
            "Bu metrik, anahtar kelimenin arama hacminin bir önceki yıla göre nasıl değiştiğini gösterir. Yükselen trendleri yakalamak için önemlidir. Artış gösteren kelimeler, büyüyen bir pazarı veya artan ilgiyi işaret eder ve erken pozisyon almanız için fırsat sunar.",
          ],
        },
        {
          heading: "SEO Stratejisi İçin İpuçları",
          body: [
            "Keyword Planner verilerini SEO stratejinize entegre etmek için şu yaklaşımları uygulayın:",
          ],
          tips: [
            "Yüksek Hacim + Düşük Rekabet Kombinasyonu: Bu altın dengeyi yakalayan kelimeleri önceliklendirin. Özellikle yeni siteler için düşük rekabetli ama makul hacimli kelimeler idealdir",
            "Arama Amacını Belirleyin: Her anahtar kelime için kullanıcının amacını anlayın — bilgi mi arıyor, ürün mü karşılaştırıyor, yoksa satın almaya mı hazır? İçeriğinizi buna göre şekillendirin",
            "Long-tail Varyasyonlarını Not Alın: Keyword Planner'daki uzun kuyruk önerileri, düşük rekabetli ve yüksek dönüşümlü fırsatlardır. Bunları ayrı bir listede toplayarak içerik takvimi oluşturun",
          ],
          warnings: [
            "Keyword Planner verileri reklam odaklıdır. SEO için Ahrefs, Semrush gibi araçlarla çapraz kontrol yapmanız önerilir.",
          ],
        },
      ],
      pdfFileName: "google-keyword-planner-kilavuzu.pdf",
    },
    "rakip-anahtar-kelime-analizi": {
      category: "Anahtar Kelime Araçları",
      categorySlug: "anahtar-kelime",
      title: "Rakip Analizi Metodları",
      subtitle:
        "Ahrefs, Semrush ve Ubersuggest ile tanıyın, rakiplerinizin SEO stratejilerini deşifre edin.",
      type: "tabbed",
      videos: [
        {
          title: "Rakip SEO Analizi Nasıl Yapılır?",
          thumbnail: "https://img.youtube.com/vi/v1I57-_Rsvo/maxresdefault.jpg",
          youtubeId: "v1I57-_Rsvo",
        },
      ],
      sections: [],
      tabs: [
        {
          label: "Ahrefs",
          sections: [
            {
              heading: "Rakip Analizi Nedir?",
              body: [
                "Rakip anahtar kelime analizi, sektörünüzdeki rakiplerin hangi anahtar kelimelerle organik trafik aldığını, hangi sayfalarda sıralandığını ve hangi fırsatları kaçırdığını tespit etme sürecidir. Ahrefs, bu analiz için en kapsamlı veritabanına sahip araçlardan biridir. Bu rehberde Ahrefs ile adım adım rakip analizi yapmayı öğreneceksiniz.",
              ],
            },
            {
              heading: "Adım 1: Rakiplerinizi Belirleme",
              body: [
                "İlk adım olarak SEO rakiplerinizi belirleyin. Ahrefs'te \"Site Explorer\" aracını açın ve kendi alan adınızı girin. Sol menüden \"Competing Domains\" (Rakip Alan Adları) raporuna tıklayın. Bu rapor, sizinle en çok ortak anahtar kelimeye sahip siteleri listeler.",
              ],
              imagePlaceholder: "Ahrefs - Competing Domains Raporu",
            },
            {
              heading: "Adım 2: İçerik Boşluğu (Content Gap) Analizi",
              body: [
                "Rakiplerinizi belirledikten sonra Ahrefs'in \"Content Gap\" aracını kullanın. Bu araç, rakiplerinizin sıralandığı ama sizin sıralanmadığınız anahtar kelimeleri bulmanızı sağlar. Site Explorer'da kendi alan adınızı girin, sol menüden \"Content Gap\" seçeneğine tıklayın ve 2-3 rakip alan adını girin.",
                "Bu analiz, \"rakiplerinizin tümü sıralanıyor ama siz sıralanmıyorsunuz\" mantığıyla çalışır. Ortaya çıkan kelimeler en büyük fırsatlarınızdır.",
              ],
              imagePlaceholder: "Ahrefs - Content Gap Aracı",
            },
            {
              heading: "Adım 3: Rakiplerin En Güçlü Sayfalarını İnceleme (Top Pages)",
              body: [
                "Site Explorer'da rakibin alan adını girin ve \"Top Pages\" (En İyi Sayfalar) raporuna gidin. Bu rapor, rakibin en çok organik trafik alan sayfalarını ve bu sayfalara trafik getiren anahtar kelimeleri gösterir.",
              ],
              tips: [
                "Bu sayfalardaki içerik yapısını, uzunluğunu ve kalitesini analiz edin. Sizin de aynı veya daha iyi içerik üretebileceğiniz sayfaları belirleyin",
                "Top pages raporunu trafik değerine göre sıralayarak en yüksek potansiyelli fırsatları önceliklendirin",
                "Her hedef sayfa için bir \"içerik notu\" oluşturun: Neleri daha iyi yapabilirsiniz? Hangi bilgiler eksik?",
              ],
            },
            {
              heading: "Adım 4: Ek Kaynaklar ve İpuçları",
              body: [
                "Rakip analizi sonuçlarınızı daha etkin kullanmak için şu kaynakları da değerlendirin:",
              ],
              tips: [
                "Ahrefs Keyword'ü (Yeni Anahtar Kelimeler): Rakibin son 30 günde trafik almaya başladığı yeni kelimeleri takip edin. Bu sayede yeni trendleri erken yakalayabilirsiniz",
                "Backlink Profili (Site Explorer → Backlinks): Rakibin en güçlü backlinklerini inceleyerek link building stratejinize yön verin",
                "Referring Domains (Site Explorer → Referring Domains): Hangi sitelerden link aldığını görün ve benzer fırsatları değerlendirin",
              ],
            },
          ],
        },
        {
          label: "Semrush",
          sections: [
            {
              heading: "Semrush ile Rakip Analizi",
              body: [
                "Semrush, rakip analizi için güçlü ve kapsamlı araçlar sunan bir SEO platformudur. Özellikle \"Domain Overview\" ve \"Organic Research\" araçları ile rakiplerinizin SEO stratejilerini detaylı şekilde analiz edebilirsiniz.",
              ],
            },
            {
              heading: "Adım 1: Domain Overview ile Genel Bakış",
              body: [
                "Semrush ana sayfasında rakibin alan adını girin. Domain Overview raporu, rakibin organik trafik tahmini, toplam anahtar kelime sayısı, backlink profili ve en büyük rakipleri hakkında genel bir bakış sunar.",
              ],
              imagePlaceholder: "Semrush - Domain Overview Ekranı",
            },
            {
              heading: "Adım 2: Organic Research — Anahtar Kelimeler",
              body: [
                "Sol menüden \"Organic Research\" → \"Positions\" raporuna gidin. Bu rapor, rakibin sıralandığı tüm organik anahtar kelimeleri, pozisyonlarını ve tahmini trafik değerlerini gösterir. Filtreleri kullanarak belirli pozisyon aralıklarına (ör: 4-10 arası) veya belirli arama hacmi eşiklerine odaklanabilirsiniz.",
              ],
              tips: [
                "\"Position Changes\" sekmesi ile rakibin son dönemde kazandığı ve kaybettiği kelimeleri takip edin",
                "\"Competitors\" sekmesi ile rakibin SEO rakiplerini de keşfedin",
              ],
            },
            {
              heading: "Adım 3: Keyword Gap Analizi",
              body: [
                "Semrush'ın \"Keyword Gap\" aracı, birden fazla alan adını karşılaştırarak ortak ve benzersiz anahtar kelimeleri bulmanızı sağlar. Kendi alan adınızı ve 2-4 rakibi girin. \"Missing\" filtresi ile rakiplerin sıralandığı ama sizin hiç sıralanmadığınız kelimeleri görün.",
              ],
              imagePlaceholder: "Semrush - Keyword Gap Aracı",
            },
            {
              heading: "Adım 4: İpuçları",
              body: [
                "Semrush verilerini en verimli şekilde kullanmak için:",
              ],
              tips: [
                "\"Pages\" raporu ile rakibin en çok trafik alan sayfalarını inceleyin",
                "Position Tracking ile belirlediğiniz kelimelerde rakibinizi düzenli olarak izleyin",
                "Content Analyzer ile rakip içeriklerinin performansını değerlendirin",
              ],
            },
          ],
        },
        {
          label: "Ubersuggest",
          sections: [
            {
              heading: "Ubersuggest ile Ücretsiz Rakip Analizi",
              body: [
                "Ubersuggest, Neil Patel tarafından geliştirilen ve sınırlı sayıda ücretsiz sorgu sunan bir SEO aracıdır. Bütçesi kısıtlı olanlar veya hızlı bir genel bakış isteyenler için idealdir. Temel rakip analizi özellikleri ücretsiz planda da kullanılabilir.",
              ],
            },
            {
              heading: "Adım 1: Rakip Alan Adını Analiz Etme",
              body: [
                "Ubersuggest ana sayfasında rakibin alan adını girin ve \"Ara\" butonuna tıklayın. Genel bakış sayfasında organik aylık trafik tahmini, alan adı otoritesi (DA), backlink sayısı ve sıralandığı anahtar kelime sayısını görebilirsiniz.",
              ],
              imagePlaceholder: "Ubersuggest - Domain Analizi",
            },
            {
              heading: "Adım 2: Top SEO Pages (En İyi Sayfalar)",
              body: [
                "Sol menüden \"Top SEO Pages\" raporuna gidin. Bu rapor, rakibin en çok organik trafik alan sayfalarını ve bu sayfalara hangi anahtar kelimelerden trafik geldiğini gösterir. Kendi içerik stratejiniz için ilham kaynağı olarak kullanabilirsiniz.",
              ],
              tips: [
                "Her sayfanın tahmini trafik değerini ve backlink sayısını kontrol edin",
                "Yüksek trafikli ama düşük backlink'li sayfalar, sizin için kolay hedeflerdir",
              ],
            },
            {
              heading: "Adım 3: Keyword Ideas ile Fırsatları Keşfetme",
              body: [
                "\"Keyword Ideas\" sekmesinde rakibin sıralandığı kelimeleri görebilirsiniz. Bu listeyi arama hacmi, SEO zorluk puanı ve CPC'ye göre sıralayarak en uygun hedefleri belirleyin.",
              ],
              tips: [
                "SD (SEO Difficulty) değeri 30'un altındaki kelimeler genellikle daha kolay sıralanabilir",
                "Ücretsiz planda günlük 3 sorgu hakkınız vardır — en önemli rakiplerinize öncelik verin",
                "Sonuçları CSV olarak dışa aktarıp Anahtar Kelime Havuzu Şablonuna ekleyin",
              ],
            },
          ],
        },
      ],
      pdfFileName: "rakip-anahtar-kelime-analizi.pdf",
    },
    "long-tail-stratejisi": {
      category: "Anahtar Kelime Araçları",
      categorySlug: "anahtar-kelime",
      title: "Long-Tail (Uzun Kuyruk) Anahtar Kelime Stratejisi",
      subtitle:
        "Düşük rekabetle yüksek dönüşüm sağlamak için uzun kuyruk anahtar kelime stratejileri ve uygulama yöntemleri.",
      videos: [
        {
          title: "Long-Tail Anahtar Kelime Stratejisi Rehberi",
          thumbnail: "https://img.youtube.com/vi/a6FixER-pFg/maxresdefault.jpg",
          youtubeId: "a6FixER-pFg",
        },
      ],
      sections: [
        {
          heading: "Long-Tail (Uzun Kuyruk) Anahtar Kelime Nedir?",
          body: [
            "Long-tail (uzun kuyruk) anahtar kelimeler, genellikle 3 veya daha fazla kelimeden oluşan, daha spesifik ve düşük arama hacmine sahip arama sorgularıdır. Örneğin \"SEO\" kısa kuyruk iken, \"küçük işletmeler için SEO nasıl yapılır\" bir long-tail anahtar kelimedir.",
          ],
          tips: [
            "Tüm Google aramalarının yaklaşık %70'i long-tail sorgulardır",
            "Long-tail kelimeler genellikle daha düşük rekabete sahiptir, bu da yeni sitelerin bile hızla sıralama almasını kolaylaştırır",
          ],
        },
        {
          heading: "Neden Uzun Kuyruk Stratejisi Kullanmalıyız?",
          body: [
            "SEO stratejinizde uzun kuyruk anahtar kelimelere odaklanmanın birçok önemli avantajı vardır:",
          ],
          tips: [
            "Düşük Rekabet: \"SEO\" gibi genel bir terimde rekabet çok yoğunken, \"istanbul'da küçük işletmeler için SEO danışmanlık\" gibi uzun kuyruk bir kelimede rekabet oldukça düşüktür",
            "Yüksek Dönüşüm Oranı: Uzun kuyruk kelimelerle gelen kullanıcılar ne aradığını bilir. \"Kırmızı Nike Air Max 90 fiyat\" arayan biri, \"ayakkabı\" arayana göre satın almaya çok daha yakındır",
            "Kullanıcı Niyetini Anlama: Uzun kuyruk kelimeler, kullanıcının tam olarak neyi aradığını daha net ortaya koyar — bu da doğru içerik üretmenizi sağlar",
            "Sesli Arama Uyumu: Sesli aramaların büyük çoğunluğu doğal dilde, uzun cümlelerle yapılır. Long-tail stratejisi sizi sesli arama çağına da hazırlar",
            "Toplamda Büyük Trafik Potansiyeli: Tek başına küçük hacimli olsalar da, yüzlerce long-tail kelime toplamda devasa bir organik trafik oluşturabilir",
          ],
        },
        {
          heading: "Uzun Kuyruk Anahtar Kelime Fırsatları Nasıl Bulunur?",
          body: [
            "Doğru long-tail kelimeleri bulmak için çeşitli yöntem ve araçları kullanabilirsiniz:",
          ],
        },
        {
          heading: "1. Google Otomatik Tamamlama (Autocomplete)",
          level: 3,
          body: [
            "Google'ın arama çubuğuna yazmaya başladığınızda otomatik olarak önerdiği tamamlamalar, en popüler long-tail sorgulardır. Bu öneriler gerçek kullanıcı aramalarına dayanır ve mükemmel bir long-tail kaynağıdır. \"X nedir\", \"X nasıl yapılır\" gibi kalıplarla başlayarak sistematik şekilde fikirleri toplayabilirsiniz.",
          ],
          imagePlaceholder: "Google Autocomplete Örneği",
        },
        {
          heading: "2. \"Kullanıcılar Bunları Da Sordu\" (PAA) Kutuları",
          level: 3,
          body: [
            "Google arama sonuçlarında görünen \"People Also Ask\" (İnsanlar Şunu da Soruyor) kutuları, kullanıcıların sıkça sorduğu ilgili soruları listeler. Her soru bir long-tail anahtar kelime fırsatıdır ve bunları hedefleyerek FAQ tarzında içerikler oluşturabilirsiniz.",
          ],
        },
        {
          heading: "3. Google Search Console Performans Raporu",
          level: 3,
          body: [
            "Sitenizin zaten hangi long-tail kelimelerle gösterim ve tıklama aldığını GSC'den görebilirsiniz. \"Performans\" raporundaki sorguları kelime sayısına göre filtreleyerek 3+ kelimeli sorguları keşfedin. Düşük CTR'lı ama yüksek gösterimli sorgular için mevcut sayfalarınızı optimize edebilirsiniz.",
          ],
        },
        {
          heading: "4. Rakip Analizi (Ahrefs/Semrush)",
          level: 3,
          body: [
            "Rakiplerinizin hangi long-tail kelimelerle trafik aldığını Ahrefs veya Semrush gibi araçlarla analiz edebilirsiniz. \"Organic Keywords\" raporunda kelime sayısına göre filtreleme yaparak rakibin long-tail stratejisini görebilir ve fırsat alanlarını tespit edebilirsiniz.",
          ],
        },
        {
          heading: "5. Özel Araçlar (AnswerThePublic, AlsoAsked)",
          level: 3,
          body: [
            "AnswerThePublic bir ana kelime etrafındaki tüm soruları görselleştirir. AlsoAsked ise \"İnsanlar Şunu da Soruyor\" verilerini hiyerarşik olarak sunar. Bu araçlar özellikle soru bazlı long-tail kelimeleri bulmak için çok etkilidir ve içerik planlamanıza yön verir.",
          ],
        },
        {
          heading: "Stratejiyi Uygulamaya: İçerik Oluşturma",
          body: [
            "Bulduğunuz long-tail kelimeleri etkili bir içerik stratejisine dönüştürmek için şu adımları izleyin:",
          ],
          tips: [
            "Blog Yazıları ve Kılavuzlar: \"Nasıl yapılır?\", \"Nedir?\" gibi bilgi amaçlı long-tail kelimeler için kapsamlı, detaylı blog yazıları oluşturun",
            "SSS (FAQ) Bölümleri: Mevcut sayfalarınıza FAQ bölümleri ekleyerek birden fazla long-tail kelimeyi tek bir sayfada hedefleyin. Bu aynı zamanda \"Featured Snippet\" almanızı da kolaylaştırır",
            "Ürün/Hizmet Sayfalarını Detaylandırma: \"İstanbul'da kurumsal SEO danışmanlık\" gibi long-tail kelimeler için özel alt sayfalar veya içerikler oluşturun",
          ],
        },
      ],
      pdfFileName: "long-tail-stratejisi.pdf",
    },
  },
  "teknik-seo": {
    "canonical-url-rehberi": {
      category: "Teknik SEO Araçları",
      categorySlug: "teknik-seo",
      title: "Canonical (URL) Etiketi Kullanım Rehberi",
      subtitle:
        "Duplicate içerik sorunlarını çözmek, doğru URL'yi Google'a bildirmek ve SEO otoritenizi korumak için canonical etiketini doğru kullanmanın kapsamlı rehberi.",
      videos: [
        {
          title: "Canonical Etiketi Nedir? Nasıl Kullanılır?",
          thumbnail: "https://img.youtube.com/vi/8j_hxBw5B4E/maxresdefault.jpg",
          youtubeId: "8j_hxBw5B4E",
        },
      ],
      sections: [
        {
          heading: "Canonical Etiketi Nedir?",
          body: [
            "Canonical etiketi (rel=\"canonical\"), bir sayfanın tercih edilen (orijinal) URL'sini arama motorlarına bildiren bir HTML meta etiketidir. Aynı veya çok benzer içeriğe sahip birden fazla URL olduğunda, Google'a \"asıl sayfa bu\" demenin yoludur.",
            "Bu etiket <head> bölümüne şu şekilde eklenir:",
          ],
          tips: [
            "<link rel=\"canonical\" href=\"https://www.ornek.com/sayfa\" /> formatında kullanılır",
            "Google, canonical etiketi sayesinde duplicate içerik sorunlarını çözer ve SEO otoritesini doğru sayfada toplar",
          ],
        },
        {
          heading: "Neden Canonical Etiketi Kullanmalıyız?",
          body: [
            "Web sitelerinde aynı içeriğe farklı URL'lerden erişilebilir. Bu durum Google için karışıklık yaratır ve SEO gücünüzü böler. Canonical etiketi bu sorunu çözer:",
          ],
          tips: [
            "URL Parametreleri: ?utm_source=..., ?ref=... gibi parametreler aynı sayfanın farklı URL'lerde görünmesine neden olur",
            "HTTP vs HTTPS / www vs non-www: Aynı içerik farklı protokol veya alt alan adıyla erişilebilir",
            "Büyük/Küçük Harf Farklılıkları: /Sayfa ve /sayfa farklı URL olarak algılanabilir",
            "Sayfalama (Pagination): Ürün listelerinde veya blog arşivlerinde sayfa numaralı URL'ler",
            "Mobil Ayrı URL (m.ornek.com): Masaüstü ve mobil sürümlerin ayrı URL'lerde olması",
          ],
          warnings: [
            "Canonical etiketi kullanmadan bırakılan duplicate sayfalar, Google'ın SEO otoritenizi bölmesine ve sıralama kaybına yol açar.",
          ],
        },
        {
          heading: "Canonical Etiketi Nasıl Eklenir?",
          body: [
            "Canonical etiketi eklemenin birkaç yolu vardır. En yaygın yöntem HTML <head> etiketine eklemektir:",
          ],
        },
        {
          heading: "1. HTML Head Etiketi ile",
          level: 3,
          body: [
            "Sayfanızın <head> bölümüne şu kodu ekleyin: <link rel=\"canonical\" href=\"https://www.ornek.com/orijinal-sayfa\" />. href değeri, o sayfanın tercih edilen (orijinal) tam URL'si olmalıdır. Her sayfada yalnızca bir canonical etiketi bulunmalıdır.",
          ],
        },
        {
          heading: "2. HTTP Header ile (Sayfa Dışı İçerikler)",
          level: 3,
          body: [
            "PDF, resim veya HTML olmayan içerikler için HTTP yanıt başlığında canonical belirtebilirsiniz: Link: <https://www.ornek.com/belge.pdf>; rel=\"canonical\". Bu yöntem özellikle indirilebilir dosyalar ve API yanıtları için kullanışlıdır.",
          ],
        },
        {
          heading: "3. WordPress'te Canonical Etiketi",
          level: 3,
          body: [
            "WordPress kullanıyorsanız, Yoast SEO veya Rank Math gibi SEO eklentileri canonical etiketini otomatik olarak ekler. Sayfa düzenleme ekranında \"Advanced\" veya \"Gelişmiş\" sekmesinden canonical URL'yi manuel olarak da değiştirebilirsiniz. Özellikle syndicated (başka siteden alınmış) içerikler için orijinal kaynağa canonical vermeyi unutmayın.",
          ],
        },
        {
          heading: "Self-Referencing Canonical Nedir?",
          body: [
            "Self-referencing (kendine referans veren) canonical, bir sayfanın kendi URL'sini canonical olarak göstermesidir. Bu Google tarafından önerilen bir best practice'tir.",
            "Örneğin https://www.ornek.com/blog/seo-nedir sayfasında: <link rel=\"canonical\" href=\"https://www.ornek.com/blog/seo-nedir\" /> etiketi bulunmalıdır. Böylece URL parametreleri veya farklı erişim yollarıyla oluşabilecek duplicate sorunları önlenir.",
          ],
          tips: [
            "Her sayfa kendi self-referencing canonical etiketine sahip olmalıdır — bu bir zorunluluk değil ama Google'ın güçlü bir şekilde önerdiği bir uygulamadır",
          ],
        },
        {
          heading: "Canonical vs 301 Yönlendirme: Hangisini Kullanmalı?",
          body: [
            "Canonical etiketi ve 301 yönlendirme benzer amaçlara hizmet eder ancak kullanım alanları farklıdır:",
          ],
          tips: [
            "301 Yönlendirme: Eski URL artık kullanılmayacaksa, kullanıcıyı ve arama motorunu kalıcı olarak yeni URL'ye yönlendirir. Kullanıcı eski URL'yi ziyaret edemez",
            "Canonical Etiketi: Her iki URL de erişilebilir kalır, ancak Google'a \"asıl sayfa şu\" denir. Kullanıcı her iki URL'yi de ziyaret edebilir",
            "Kural: Kullanıcının eski sayfayı görmesini istemiyorsanız → 301. Her iki sayfanın da erişilebilir kalmasını istiyorsanız → Canonical",
          ],
        },
        {
          heading: "Sık Yapılan Canonical Hataları",
          body: [
            "Canonical etiketi güçlü bir araçtır ancak yanlış kullanıldığında ciddi SEO sorunlarına yol açabilir:",
          ],
          warnings: [
            "Bir sayfada birden fazla canonical etiketi: Google hangisini seçeceğini bilemez ve tümünü görmezden gelebilir",
            "Noindex + Canonical çelişkisi: Bir sayfayı hem noindex yapıp hem canonical vermek çelişkili sinyallerdir. Google canonical'ı görmezden gelir",
            "Zincirleme canonical'lar: A → B → C şeklinde canonical zincirleri oluşturmayın. Doğrudan nihai hedef URL'ye canonical verin",
            "Canonical URL'de hatalı protokol veya trailing slash: https://ornek.com/sayfa ile https://ornek.com/sayfa/ farklı URL'lerdir. Tutarlı olun",
            "Farklı içerikli sayfalar arası canonical: Tamamen farklı içeriğe sahip sayfalar arasında canonical kullanmak Google tarafından görmezden gelinir",
          ],
        },
        {
          heading: "Canonical Etiketini Kontrol Etme",
          body: [
            "Sitenizde canonical etiketlerinin doğru çalışıp çalışmadığını kontrol etmek için şu yöntemleri kullanabilirsiniz:",
          ],
          tips: [
            "Google Search Console → URL Denetim Aracı: Bir URL girin ve \"Sayfa Kullanılabilirliği\" bölümünde Google'ın canonical olarak hangi URL'yi seçtiğini görün",
            "Tarayıcıda Kaynak Kodu: Sayfaya sağ tıklayıp \"Sayfa Kaynağını Görüntüle\" yapın ve rel=\"canonical\" araması yapın",
            "Screaming Frog: Site genelinde tüm canonical etiketlerini toplu olarak kontrol edin",
            "Ahrefs Site Audit: Canonical sorunlarını otomatik olarak tespit eder ve raporlar",
          ],
        },
      ],
      pdfFileName: "canonical-url-rehberi.pdf",
    },
    "wordpress-teknik-seo-kontrol-listesi": {
      category: "Teknik SEO Araçları",
      categorySlug: "teknik-seo",
      title: "WordPress Teknik SEO Kontrol Listesi",
      subtitle:
        "WordPress siteniz için atlamayanız gereken tüm teknik SEO ayarlarını adım adım kontrol edin.",
      type: "checklist",
      videos: [],
      sections: [],
      checklist: [
        {
          title: "Temel Ayarlar",
          items: [
            "SSL sertifikası aktif ve tüm sayfalar HTTPS üzerinden yükleniyor",
            "\"Arama motorlarını engelle\" seçeneği kapalı (Ayarlar → Okuma)",
            "Kalıcı bağlantı yapısı SEO dostu ayarlandı (Ayarlar → Kalıcı Bağlantılar → Yazı Adı)",
            "Site adresi www/non-www tutarlılığı sağlandı",
            "WordPress, tema ve tüm eklentiler güncel sürümde",
            "Kullanılmayan tema ve eklentiler kaldırıldı",
          ],
        },
        {
          title: "SEO Eklentisi Yapılandırması",
          items: [
            "Yoast SEO veya Rank Math eklentisi kurulu ve aktif",
            "XML Sitemap otomatik oluşturulmuş ve Google Search Console'a gönderilmiş",
            "Breadcrumbs (İçerik haritası) aktif edilmiş",
            "Open Graph ve Twitter Card meta etiketleri aktif",
            "Gereksiz arşiv sayfaları (yazar, tarih, etiket) noindex yapılmış",
            "Canonical etiketler otomatik olarak ekleniyor",
          ],
        },
        {
          title: "Sayfa Hızı & Performans",
          items: [
            "Önbellekleme (caching) eklentisi kurulu ve yapılandırılmış (WP Rocket, LiteSpeed Cache vb.)",
            "Görseller sıkıştırılmış ve WebP formatına dönüştürülmüş",
            "Lazy loading (tembel yükleme) görseller ve iframe'ler için aktif",
            "CSS ve JavaScript dosyaları küçültülmüş (minify) ve birleştirilmiş",
            "Kullanılmayan CSS/JS dosyaları devre dışı bırakılmış",
            "CDN (içerik dağıtım ağı) kullanılıyor",
            "Core Web Vitals (LCP, FID/INP, CLS) değerleri yeşil seviyede",
            "GZIP veya Brotli sıkıştırma aktif",
          ],
        },
        {
          title: "Taranabilirlik & Dizinleme",
          items: [
            "robots.txt dosyası oluşturulmuş ve doğru yapılandırılmış",
            "XML Sitemap tüm önemli sayfaları içeriyor ve hatalı URL yok",
            "Google Search Console'da \"Sayfalar\" raporunda kritik hata yok",
            "Önemli sayfalar Google tarafından dizinlenmiş (site:alanadi.com kontrolü)",
            "404 hata sayfası özelleştirilmiş ve kullanıcı dostu",
            "Kırık linkler (broken links) taranmış ve düzeltilmiş",
            "Yönlendirme zincirleri (redirect chains) temizlenmiş",
            "Orphan pages (bağlantısız sayfalar) tespit edilmiş ve iç linklenmiş",
          ],
        },
        {
          title: "Yapısal Veri (Schema Markup)",
          items: [
            "Organization veya LocalBusiness schema eklendi",
            "Article schema blog yazıları için aktif",
            "Breadcrumb schema aktif",
            "FAQ schema uygun sayfalarda eklendi",
            "Schema doğrulama aracı ile test edildi (Google Rich Results Test)",
          ],
        },
        {
          title: "Mobil Uyumluluk",
          items: [
            "Responsive tasarım tüm cihazlarda düzgün görünüyor",
            "Google Mobil Uyumluluk Testi başarılı",
            "Dokunma hedefleri (butonlar, linkler) yeterince büyük",
            "Metin mobilde okunabilir boyutta (16px minimum)",
            "Yatay kaydırma sorunu yok",
            "Pop-up ve interstitial'lar mobilde kullanıcıyı engellemiyor",
          ],
        },
        {
          title: "Güvenlik",
          items: [
            "wp-login.php URL'si değiştirilmiş veya korunmuş",
            "İki faktörlü kimlik doğrulama (2FA) aktif",
            "Dosya düzenleme devre dışı bırakılmış (wp-config.php → DISALLOW_FILE_EDIT)",
            "Güvenlik eklentisi kurulu (Wordfence, Sucuri vb.)",
            "Düzenli yedekleme planı aktif (UpdraftPlus vb.)",
            "PHP sürümü güncel (8.0+)",
            "wp-config.php dosyasına erişim kısıtlanmış",
          ],
        },
        {
          title: "İç Linkleme & Navigasyon",
          items: [
            "Ana menü mantıklı bir hiyerarşi ile yapılandırılmış",
            "Önemli sayfalar en fazla 3 tıkla erişilebilir",
            "İlgili yazılar bölümü blog altında aktif",
            "Breadcrumbs tüm sayfalarda görünüyor",
            "Footer'da önemli sayfalara linkler var",
            "Yetim sayfa (orphan page) kalmamış — her sayfa en az bir iç linkle bağlı",
          ],
        },
      ],
      pdfFileName: "wordpress-teknik-seo-kontrol-listesi.pdf",
    },
  },
  "icerik-meta": {
    "seo-uyumlu-yazi-sablonu": {
      category: "İçerik & Meta Araçları",
      categorySlug: "icerik-meta",
      title: "SEO Uyumlu Yazı Şablonu Rehberi",
      subtitle:
        "Google'ın sevdiği, kullanıcının okuduğu ve dönüşüm sağlayan içerik yapısını adım adım öğrenin. Bu şablonu her blog yazınıza uygulayın.",
      videos: [],
      sections: [
        {
          heading: "SEO Uyumlu Yazı Neden Önemli?",
          body: [
            "Google, kullanıcı niyetine en iyi cevap veren içerikleri üst sıralarda gösterir. SEO uyumlu bir yazı sadece anahtar kelime yoğunluğu değil; doğru yapı, okunabilirlik, kullanıcı deneyimi ve teknik optimizasyonun birleşimidir.",
            "Bu rehberdeki şablonu uygulayarak içeriklerinizin hem arama motorları hem de okuyucular tarafından tercih edilmesini sağlayabilirsiniz.",
          ],
          tips: [
            "İyi yapılandırılmış içerikler ortalama %36 daha yüksek CTR alır",
            "Başlık hiyerarşisi doğru olan sayfalar daha hızlı dizinlenir",
            "Okunabilirlik skoru yüksek içerikler daha düşük bounce rate'e sahiptir",
          ],
        },
        {
          heading: "1. H1 Etiketi (Ana Başlık)",
          body: [
            "Her sayfada yalnızca bir adet H1 etiketi olmalıdır. H1, sayfanın ana konusunu net şekilde ifade etmelidir.",
          ],
          tips: [
            "Ana anahtar kelimeyi mümkünse başa yakın yerleştirin",
            "60 karakteri aşmaması önerilir",
            "Merak uyandırıcı veya fayda odaklı olsun",
            "Örnek: \"Diş Eti Ameliyatı: Türleri, Süreci ve İyileşme Rehberi\"",
          ],
        },
        {
          heading: "2. Meta Title (Başlık Etiketi)",
          body: [
            "Meta title, Google arama sonuçlarında görünen başlıktır. CTR'yi doğrudan etkiler.",
          ],
          tips: [
            "50-60 karakter arasında tutun",
            "Anahtar kelimeyi başta kullanın",
            "Yıl, rakam veya parantez içi bilgi ekleyerek dikkat çekin",
            "Örnek: \"Diş Eti Ameliyatı Nedir? Türleri ve Maliyeti (2025)\"",
          ],
        },
        {
          heading: "3. Meta Description (Meta Açıklama)",
          body: [
            "Meta description, arama sonuçlarında başlığın altında görünen açıklama metnidir. Tıklamayı teşvik eden bir CTA içermelidir.",
          ],
          tips: [
            "140-160 karakter arasında tutun",
            "Anahtar kelimeyi doğal şekilde ekleyin",
            "Soru sorma veya merak uyandırma tekniklerini kullanın",
            "Sonuna bir eylem çağrısı (CTA) ekleyin: \"Hemen öğrenin!\", \"Rehberi okuyun!\"",
          ],
        },
        {
          heading: "4. Giriş Paragrafı (İlk 100 Kelime)",
          body: [
            "Giriş paragrafı hem okuyucuyu hem de Google'ı ikna etmelidir. İlk 100 kelime içinde ana anahtar kelime geçmelidir.",
          ],
          tips: [
            "Sorun → Çözüm → Vaat yapısını kullanın",
            "Okuyucunun neden bu yazıyı okuması gerektiğini belirtin",
            "Kısa ve net cümleler tercih edin (maks 20 kelime/cümle)",
            "Örnek: \"Diş eti ameliyatı mı olacaksınız? Bu rehberde ameliyat türlerini, sürecini ve iyileşme ipuçlarını adım adım öğreneceksiniz.\"",
          ],
        },
        {
          heading: "5. Alt Başlık Yapısı (H2-H3-H4)",
          body: [
            "İçeriğinizi mantıklı bir hiyerarşi ile bölümlere ayırın. Her H2, konunun farklı bir yönünü ele almalıdır.",
          ],
          tips: [
            "H2: Ana bölüm başlıkları (en az 4-6 adet)",
            "H3: H2 altındaki detay başlıkları",
            "H4: Nadiren, çok detaylı alt bölümler için",
            "Alt başlıklarda long-tail anahtar kelimeleri kullanın",
            "Soru formatında başlıklar Featured Snippet şansını artırır",
          ],
        },
        {
          heading: "6. İçerik Gövdesi Yazım Kuralları",
          body: [
            "Her bölüm kendi içinde tutarlı ve değerli bilgi sunmalıdır.",
          ],
          tips: [
            "Paragrafları kısa tutun (maks 3-4 cümle)",
            "Madde işaretleri ve numaralı listeler kullanın",
            "Görseller, tablolar ve infografiklerle destekleyin",
            "İç link ve dış link ekleyin (her 500 kelimede en az 1 iç link)",
            "LSI (ilişkili) anahtar kelimeleri doğal şekilde serpiştirin",
            "\"Biliyor muydunuz?\" kutuları veya öne çıkan bilgi blokları ekleyin",
          ],
        },
        {
          heading: "7. Görsel Optimizasyonu",
          body: [
            "Görseller hem içeriği zenginleştirir hem de Google Görsel Arama'dan trafik getirir.",
          ],
          tips: [
            "Her görsele açıklayıcı ALT etiketi yazın (anahtar kelime içerebilir)",
            "Dosya adlarını anlamlı yapın: dis-eti-ameliyati-turleri.webp",
            "WebP formatı tercih edin, boyutu 100KB altında tutun",
            "Her görselin altına açıklayıcı bir figcaption ekleyin",
          ],
        },
        {
          heading: "8. SSS (Sık Sorulan Sorular) Bölümü",
          body: [
            "Yazının sonuna bir SSS bölümü eklemek hem kullanıcı deneyimini artırır hem de FAQ Schema ile Google'da zengin sonuç elde etmenizi sağlar.",
          ],
          tips: [
            "3-5 adet sık sorulan soru ekleyin",
            "Soruları H3 olarak işaretleyin",
            "Cevapları kısa ve net tutun (40-60 kelime)",
            "\"İnsanlar Şunu da Sordu\" (PAA) kutusundan ilham alın",
            "FAQ Schema markup eklemeyi unutmayın",
          ],
        },
        {
          heading: "9. Sonuç Bölümü ve CTA",
          body: [
            "Sonuç bölümü yazının ana mesajını özetlemeli ve okuyucuyu bir sonraki adıma yönlendirmelidir.",
          ],
          tips: [
            "Ana anahtar kelimeyi bir kez daha kullanın",
            "Yazıdan çıkarılacak 2-3 temel noktayı özetleyin",
            "Net bir CTA ekleyin: iletişim formu, ilgili yazı, ürün sayfası vb.",
            "\"Sonuç\" veya \"Özet\" yerine daha ilgi çekici bir H2 kullanabilirsiniz",
          ],
        },
        {
          heading: "10. Yayın Sonrası Kontroller",
          body: [
            "Yazıyı yayınladıktan sonra yapmanız gereken teknik ve SEO kontrolleri:",
          ],
          tips: [
            "Google Search Console'dan URL denetimi yapın ve dizinleme isteyin",
            "İç linklerle bu yazıyı diğer ilgili yazılara bağlayın",
            "Sosyal medyada paylaşın",
            "1 hafta sonra Search Console'dan performansı kontrol edin",
            "3 ay sonra güncelleyerek \"freshness\" sinyali verin",
          ],
        },
      ],
      pdfFileName: "seo-uyumlu-yazi-sablonu-rehberi.pdf",
    },
  },
  "local-seo": {
    "google-business-profile-optimizasyon-rehberi": {
      category: "Local SEO & Schema Araçları",
      categorySlug: "local-seo",
      title: "Google Business Profile Optimizasyon Rehberi",
      subtitle:
        "Google Haritalar'da üst sıralarda yer almak ve yerel aramalardan trafik çekmek için Google İşletme Profilinizi eksiksiz optimize edin.",
      videos: [],
      sections: [
        {
          heading: "Google Business Profile (GBP) Nedir?",
          body: [
            "Google Business Profile (eski adıyla Google My Business), işletmenizin Google Arama ve Google Haritalar'da görünmesini sağlayan ücretsiz bir araçtır.",
            "Doğru yapılandırılmış bir GBP profili, yerel aramalarda 3'lü paket (Local Pack) içinde görünmenizi ve potansiyel müşterilerinize doğrudan ulaşmanızı sağlar.",
          ],
          tips: [
            "Yerel aramaların %46'sı yerel niyet taşır",
            "GBP'de tam profili olan işletmeler 7 kat daha fazla tıklama alır",
            "Google Haritalar'da üst 3'e girmek organik trafiği %200+ artırabilir",
          ],
        },
        {
          heading: "GBP Hesap Oluşturma ve Doğrulama",
          body: [
            "Henüz bir profiliniz yoksa business.google.com adresinden oluşturabilirsiniz. Doğrulama süreci genellikle posta kartı, telefon veya e-posta ile yapılır.",
          ],
          tips: [
            "İşletme adını tam ve resmi olarak girin (anahtar kelime doldurmayın)",
            "Doğru kategori seçimi kritiktir — birincil kategori en önemli sıralama faktörüdür",
            "Adres, telefon ve çalışma saatlerini eksiksiz doldurun",
            "Doğrulama sürecini mümkün olan en kısa sürede tamamlayın",
          ],
        },
        {
          heading: "Profil Bilgilerini Optimize Etme",
          body: [
            "Profilinizdeki her bilgi alanı bir sıralama sinyalidir. Ne kadar eksiksiz doldurursanız o kadar iyi performans alırsınız.",
          ],
          tips: [
            "İşletme Açıklaması: 750 karakterin tamamını kullanın, anahtar kelimeleri doğal ekleyin",
            "Kategoriler: 1 birincil + 5-9 ikincil kategori ekleyin",
            "Hizmetler/Ürünler bölümünü detaylı doldurun",
            "Özellikler (Attributes): Wi-Fi, otopark, erişilebilirlik gibi detayları işaretleyin",
            "Çalışma saatlerini tatil günleri dahil güncel tutun",
            "Web sitesi, randevu ve menü bağlantılarını ekleyin",
          ],
        },
        {
          heading: "Fotoğraf ve Görsel Optimizasyonu",
          body: [
            "Fotoğrafları olan işletme profilleri, olmayanlara göre %42 daha fazla yol tarifi isteği ve %35 daha fazla web sitesi tıklaması alır.",
          ],
          tips: [
            "Logo ve kapak fotoğrafını yükleyin",
            "İç mekan, dış mekan, ekip ve ürün fotoğrafları ekleyin",
            "En az 10 kaliteli fotoğraf yükleyin, her ay yeni fotoğraf ekleyin",
            "Fotoğraf dosya adlarını anahtar kelime içerecek şekilde adlandırın",
            "EXIF verisinde konum bilgisi (geotag) olmasına dikkat edin",
            "720px genişlik minimum, JPG veya PNG formatı tercih edin",
          ],
        },
        {
          heading: "Google Yorumları Yönetimi",
          body: [
            "Yorum sayısı ve puanı, Local Pack sıralamasının en güçlü faktörlerinden biridir. Aktif yorum stratejisi oluşturmak zorunludur.",
          ],
          tips: [
            "Mutlu müşterilerden yorum isteyin — QR kod veya kısa link kullanın",
            "Her yoruma 24 saat içinde profesyonel şekilde yanıt verin",
            "Olumsuz yorumlara sakin, çözüm odaklı cevap verin",
            "Yanıtlarda anahtar kelimeleri doğal kullanın",
            "Asla sahte yorum satın almayın — Google bunu tespit edip cezalandırır",
            "Yorum bağlantınızı e-posta imzası ve faturalarınıza ekleyin",
          ],
        },
        {
          heading: "Google Posts ve Güncelleme Paylaşımı",
          body: [
            "Google Posts özelliği ile profilinizde haber, teklif, etkinlik ve blog yazısı paylaşabilirsiniz. Aktif profiller daha üst sıralarda yer alır.",
          ],
          tips: [
            "Haftada en az 1 post paylaşın",
            "Her posta göz alıcı bir görsel ve net CTA ekleyin",
            "Kampanya ve sezonsal içeriklerden faydalanın",
            "Post türlerini karıştırın: güncelleme, teklif, etkinlik, ürün",
          ],
        },
        {
          heading: "Soru-Cevap (Q&A) Bölümü",
          body: [
            "GBP'de herkes soru sorabilir. Bu bölümü proaktif şekilde yönetmek önemlidir.",
          ],
          tips: [
            "Sık sorulan soruları kendiniz sorup kendiniz yanıtlayın",
            "Rakiplerin yanlış bilgi eklemesine karşı düzenli kontrol edin",
            "Yanıtlarda anahtar kelimeleri doğal kullanın",
          ],
        },
        {
          heading: "GBP Performans Takibi",
          body: [
            "Google Business Profile kendi içinde performans metrikleri sunar. Bu verileri düzenli takip ederek stratejinizi optimize edin.",
          ],
          tips: [
            "Arama sorguları: Hangi kelimelerle bulunuyorsunuz?",
            "Görüntülenme: Arama vs Haritalar dağılımı",
            "Etkileşimler: Web sitesi tıklaması, arama, yol tarifi",
            "Fotoğraf görüntülenmeleri: Rakiplerle karşılaştırın",
            "Aylık rapor oluşturup trendi takip edin",
          ],
        },
      ],
      pdfFileName: "google-business-profile-optimizasyon-rehberi.pdf",
    },
    "yerel-seo-gorsel-optimizasyon-rehberi": {
      category: "Local SEO & Schema Araçları",
      categorySlug: "local-seo",
      title: "Yerel SEO İçin Görsel Optimizasyon Rehberi",
      subtitle:
        "Google Görsel Arama ve Google Haritalar'da öne çıkmak için görsellerinizi yerel SEO'ya uygun şekilde optimize edin.",
      videos: [],
      sections: [
        {
          heading: "Yerel SEO'da Görsellerin Önemi",
          body: [
            "Görseller, yerel aramalarda sıralama faktörü olmasının yanı sıra kullanıcı etkileşimini doğrudan etkiler. Google Business Profile'daki görseller, Haritalar sonuçlarındaki tıklama oranını %35'e kadar artırabilir.",
            "Doğru optimize edilmiş görseller hem web sitenizden hem de GBP profilinizden ek trafik kanalı oluşturur.",
          ],
        },
        {
          heading: "Dosya Adı Optimizasyonu",
          body: [
            "Görsel dosya adları, Google'ın görselin ne hakkında olduğunu anlamasında ilk referans noktasıdır.",
          ],
          tips: [
            "Anlamlı, açıklayıcı dosya adları kullanın",
            "Şehir/ilçe adını dosya adına ekleyin: ankara-kecioren-dis-klinigi.webp",
            "Türkçe karakter yerine ASCII karakter kullanın: dis-eti-ameliyati.webp",
            "Kelimeler arasında tire (-) kullanın, alt çizgi veya boşluk kullanmayın",
          ],
        },
        {
          heading: "ALT Etiketi (Alt Text) Yazım Kuralları",
          body: [
            "ALT etiketi hem erişilebilirlik hem de SEO için kritiktir. Google görsel aramasında sıralama faktörüdür.",
          ],
          tips: [
            "Her görsele benzersiz ve açıklayıcı ALT metni yazın",
            "Anahtar kelime + konum bilgisi ekleyin: \"Ankara Keçiören diş kliniği bekleme salonu\"",
            "Anahtar kelime doldurmaktan kaçının, doğal olsun",
            "Dekoratif görsellere boş ALT (alt=\"\") bırakın",
            "80-125 karakter arasında tutun",
          ],
        },
        {
          heading: "Görsel Format ve Boyut Optimizasyonu",
          body: [
            "Sayfa hızı yerel SEO'da kritik bir faktördür. Optimize edilmemiş görseller sayfanızı yavaşlatır.",
          ],
          tips: [
            "WebP formatını tercih edin (JPEG'e göre %25-34 daha küçük)",
            "Genişlik: 1200px maks, mobil için 720px yeterli",
            "Dosya boyutu: 100KB altı hedefleyin",
            "Lazy loading uygulayın (above-the-fold görseller hariç)",
            "srcset ile responsive görseller sunun",
          ],
        },
        {
          heading: "GBP Fotoğraf Optimizasyonu",
          body: [
            "Google Business Profile'daki fotoğraflar yerel sıralama faktörüdür ve müşteri kararını doğrudan etkiler.",
          ],
          tips: [
            "Logo (250x250px) ve kapak fotoğrafı (1080x608px) yükleyin",
            "İç mekan: 360° fotoğraf çok etkilidir",
            "Dış mekan: Tabelayı ve girişi net gösteren fotoğraf",
            "Ekip fotoğrafları güven artırır",
            "Ürün/hizmet fotoğrafları satışı destekler",
            "Her ay en az 2-3 yeni fotoğraf ekleyin",
          ],
        },
        {
          heading: "Geotag (Konum Bilgisi) Ekleme",
          body: [
            "Görsel EXIF verisine konum bilgisi eklemek, Google'a görselin coğrafi konumunu söyler ve yerel aramalarda avantaj sağlar.",
          ],
          tips: [
            "GeoImgr veya GeoSetter gibi araçlarla EXIF'e koordinat ekleyin",
            "İşletmenizin gerçek koordinatlarını kullanın",
            "Özellikle GBP'ye yüklenen fotoğraflarda geotag önemlidir",
            "Stok fotoğraflara geotag eklemeyin — sadece gerçek fotoğraflara",
          ],
        },
        {
          heading: "Yapısal Veri ile Görsel İşaretleme",
          body: [
            "Schema markup ile görsellerinizi yapılandırılmış veri olarak işaretleyerek Google'a ek bilgi sağlayabilirsiniz.",
          ],
          tips: [
            "ImageObject schema ile görselleri işaretleyin",
            "LocalBusiness schema'da logo ve image alanlarını doldurun",
            "Product schema'da ürün görsellerini ekleyin",
            "Google Rich Results Test ile doğrulayın",
          ],
        },
      ],
      pdfFileName: "yerel-seo-gorsel-optimizasyon-rehberi.pdf",
    },
    "nap-tutarliligi-kontrol-listesi": {
      category: "Local SEO & Schema Araçları",
      categorySlug: "local-seo",
      title: "NAP Tutarlılığı Kontrol Listesi",
      subtitle:
        "İşletme Adı (Name), Adres (Address) ve Telefon (Phone) bilgilerinizin tüm platformlarda tutarlı olduğunu kontrol edin.",
      type: "checklist",
      videos: [],
      sections: [],
      checklist: [
        {
          title: "Web Sitesi",
          items: [
            "Ana sayfada işletme adı, adres ve telefon görünür durumda",
            "Footer'da NAP bilgileri tüm sayfalarda tutarlı",
            "İletişim sayfasında tam adres, telefon ve harita mevcut",
            "Schema markup (LocalBusiness) ile NAP yapılandırılmış veriye dönüştürülmüş",
            "Telefon numarası tıklanabilir (tel: bağlantısı)",
          ],
        },
        {
          title: "Google Business Profile",
          items: [
            "İşletme adı web sitesiyle birebir aynı",
            "Adres web sitesiyle birebir aynı (apartman no, kat bilgisi dahil)",
            "Telefon numarası web sitesiyle birebir aynı",
            "Çalışma saatleri güncel ve doğru",
            "Kategori seçimi doğru ve eksiksiz",
            "Web sitesi URL'si doğru bağlanmış",
          ],
        },
        {
          title: "Sosyal Medya Platformları",
          items: [
            "Facebook sayfasında NAP bilgileri tutarlı",
            "Instagram biyografisinde doğru iletişim bilgileri",
            "LinkedIn şirket sayfasında adres ve telefon doğru",
            "Twitter/X profilinde konum bilgisi güncel",
            "YouTube kanal açıklamasında iletişim bilgileri mevcut",
          ],
        },
        {
          title: "Harita ve Dizin Platformları",
          items: [
            "Apple Maps / Apple Business Connect'te NAP doğru",
            "Bing Places'da NAP doğru",
            "Yandex Maps'te NAP doğru",
            "Foursquare/Swarm'da NAP doğru",
            "Yelp'te NAP doğru (varsa)",
            "Sektörel dizinlerde NAP tutarlı (doktorlar için doktorsitesi.com vb.)",
          ],
        },
        {
          title: "Sektörel Dizinler ve Rehberler",
          items: [
            "Yerel ticaret odası web sitesinde NAP doğru",
            "Sektörel derneklerin web sitesinde NAP doğru",
            "Yerel haber/blog sitelerinde NAP doğru",
            "İş ortağı sitelerinde NAP doğru (varsa)",
            "Eski/kapanmış şubelerin listeleri kaldırılmış veya güncellenmiş",
          ],
        },
        {
          title: "Format Tutarlılığı",
          items: [
            "Adres formatı her yerde aynı (Mah., Cad., Sok. kısaltmaları tutarlı)",
            "Telefon formatı her yerde aynı (+90 XXX XXX XX XX)",
            "İşletme adında gereksiz anahtar kelime eklenmemiş",
            "Posta kodu tüm platformlarda aynı",
            "Şehir ve ilçe adı aynı şekilde yazılmış",
          ],
        },
        {
          title: "Düzenli Kontrol ve Bakım",
          items: [
            "Üç ayda bir tüm platformlar kontrol ediliyor",
            "Adres veya telefon değişikliğinde tüm platformlar güncelleniyor",
            "Moz Local veya BrightLocal ile NAP tutarlılık skoru kontrol ediliyor",
            "Duplicate (mükerrer) listeler tespit edilip birleştirilmiş veya kaldırılmış",
            "Rakip NAP analizi yapılmış (benchmark)",
          ],
        },
      ],
      pdfFileName: "nap-tutarliligi-kontrol-listesi.pdf",
    },
  },
  "backlink": {
    "google-disavow-araci-rehberi": {
      category: "Backlink & Off-Page SEO",
      categorySlug: "backlink",
      title: "Google Disavow (Reddetme) Aracı Rehberi",
      subtitle:
        "Sitenize zarar veren spam ve düşük kaliteli backlinkleri tespit edin ve Google'a reddettirin.",
      videos: [],
      sections: [
        {
          heading: "Disavow Aracı Nedir ve Neden Kullanılır?",
          body: [
            "Google Disavow Tool, sitenize yönelen zararlı veya spam backlinkleri Google'a bildirmenizi ve bu linklerin sıralama hesaplamalarında dikkate alınmamasını istemenizi sağlayan bir araçtır.",
            "Normalde Google algoritmik olarak spam linkleri görmezden gelir. Ancak manuel ceza aldıysanız veya belirgin bir negatif SEO saldırısına maruz kaldıysanız, disavow aracı kullanmanız gerekebilir.",
          ],
          tips: [
            "Disavow, son çare olarak kullanılmalıdır — önce manuel olarak link kaldırmayı deneyin",
            "Yanlış kullanım sıralamanıza ciddi zarar verebilir",
            "Sadece gerçekten zararlı olduğundan emin olduğunuz linkleri reddettirin",
          ],
        },
        {
          heading: "Zararlı Backlink Nasıl Tespit Edilir?",
          body: [
            "Google Search Console, Ahrefs veya Semrush gibi araçlarla backlink profilinizi analiz edin.",
          ],
          tips: [
            "Spam skoru yüksek sitelerden gelen linkler (DA/DR 0-5 arası)",
            "PBN (Private Blog Network) sitelerinden gelen linkler",
            "Casino, ilaç, yetişkin içerik sitelerinden gelen linkler",
            "Aynı anchor text ile binlerce link gönderen siteler",
            "İçerik kalitesi çok düşük, otomatik oluşturulmuş siteler",
            "Farklı ülke/dil sitelerinden gelen alakasız linkler",
          ],
        },
        {
          heading: "Disavow Dosyası Nasıl Hazırlanır?",
          body: [
            "Disavow dosyası basit bir .txt formatındadır. Her satırda bir URL veya domain bulunur.",
          ],
          tips: [
            "Tek bir sayfayı reddetmek için: https://spam-site.com/sayfa",
            "Tüm domain'i reddetmek için: domain:spam-site.com",
            "Yorum satırları # ile başlar",
            "Dosya UTF-8 kodlamasında olmalıdır",
            "Dosya boyutu 2MB'ı geçmemelidir",
            "Bir seferde maksimum 100.000 satır desteklenir",
          ],
        },
        {
          heading: "Disavow Dosyası Örneği",
          body: [
            "Aşağıda tipik bir disavow.txt dosyası örneği bulunmaktadır:",
          ],
        },
        {
          heading: "Disavow Dosyasını Google'a Gönderme",
          body: [
            "Hazırladığınız dosyayı Google Search Console üzerinden gönderebilirsiniz.",
          ],
          tips: [
            "search.google.com/search-console/disavow-links adresine gidin",
            "İlgili property'yi seçin",
            "Hazırladığınız .txt dosyasını yükleyin",
            "Google'ın dosyayı işlemesi birkaç hafta sürebilir",
            "Dosyayı güncellemek isterseniz önceki dosyanın üzerine yazılır",
          ],
        },
        {
          heading: "Disavow Sonrası Takip",
          body: [
            "Dosyayı gönderdikten sonra sabırlı olun — sonuçlar birkaç hafta ile birkaç ay arasında görünür.",
          ],
          tips: [
            "Search Console'da sıralamaları ve tıklamaları düzenli takip edin",
            "Manuel ceza varsa, yeniden değerlendirme isteği gönderin",
            "Her 3-6 ayda backlink profilinizi tekrar kontrol edin",
            "Yeni zararlı linkler tespit ederseniz dosyayı güncelleyin",
          ],
        },
      ],
      pdfFileName: "google-disavow-araci-rehberi.pdf",
    },
    "tanitim-yazisi-advertorial-sureci": {
      category: "Backlink & Off-Page SEO",
      categorySlug: "backlink",
      title: "Tanıtım Yazısı (Advertorial) Süreci",
      subtitle:
        "Etkili bir tanıtım yazısı (advertorial) kampanyası planlamak, içerik standardı oluşturmak ve yayıncı süreci yönetmek için kapsamlı rehber.",
      videos: [],
      sections: [
        {
          heading: "Advertorial (Tanıtım Yazısı) Nedir?",
          body: [
            "Advertorial, bir marka veya işletmenin ürün/hizmetini tanıtmak amacıyla haber sitelerinde veya bloglarda yayımlanan, editöryel formatta hazırlanmış sponsorlu içeriktir.",
            "SEO açısından doğru yapıldığında hem backlink kazanımı hem de marka bilinirliği sağlar.",
          ],
          tips: [
            "Advertorial ≠ Doğrudan reklam — içerik değer sunmalıdır",
            "Google, aşırı optimize edilmiş advertorial linklerini spam olarak görebilir",
            "Doğal, editoryal formata uygun içerik en etkili sonucu verir",
          ],
        },
        {
          heading: "Doğru Yayıncı/Site Seçimi",
          body: [
            "Advertorial'ın etkili olması için doğru platformda yayımlanması kritiktir.",
          ],
          tips: [
            "Domain Rating (DR) 40+ olan siteleri tercih edin",
            "Sektörünüzle ilgili veya genel haber siteleri seçin",
            "Organik trafiği aktif olan siteleri tercih edin (Ahrefs/Semrush ile kontrol)",
            "Spam skoru düşük sitelerde yayımlayın",
            "Aynı sitede sürekli yayın yapmak yerine çeşitlilik sağlayın",
            "Türk medya siteleri için Worgoo medya planlama hizmetinden faydalanabilirsiniz",
          ],
        },
        {
          heading: "İçerik Hazırlama Standartları",
          body: [
            "Advertorial içeriği, yayımcı sitenin editöryel standartlarına uygun olmalıdır.",
          ],
          tips: [
            "Minimum 800-1200 kelime uzunluğunda olmalı",
            "Doğal, bilgilendirici bir dil kullanın — satış dili kullanmayın",
            "H1, H2, H3 başlık hiyerarşisine uyun",
            "En az 1-2 yüksek kaliteli görsel ekleyin",
            "Hedef anahtar kelimeyi doğal şekilde içeriğe yerleştirin",
            "CTA (eylem çağrısı) içeriğin sonuna doğal olarak ekleyin",
          ],
        },
        {
          heading: "Link Stratejisi",
          body: [
            "Advertorial'daki linklerin doğal görünmesi ve Google kurallarına uyması önemlidir.",
          ],
          tips: [
            "Maks 1-2 dofollow link kullanın",
            "Anchor text çeşitliliği sağlayın (brand, URL, doğal ifade)",
            "Sadece ana sayfaya değil, iç sayfalara da link verin",
            "Aşırı optimize edilmiş anchor text kullanmayın (exact match dikkat)",
            "Gerektiğinde sponsored veya nofollow attribute kullanın",
          ],
        },
        {
          heading: "Yayın Süreci ve Takip",
          body: [
            "Advertorial kampanyasını yönetirken sistematik bir süreç izlemek başarı oranını artırır.",
          ],
          tips: [
            "Yayıncı ile yazılı anlaşma yapın (yayın süresi, link türü, düzenleme hakkı)",
            "İçeriği yayın öncesi yayıncıya onaylatın",
            "Yayınlandıktan sonra linkin doğru çalıştığını kontrol edin",
            "Google Search Console'dan linkin dizinlendiğini doğrulayın",
            "Yayın sonrası 1-2 hafta içinde sıralama etkisini gözlemleyin",
            "Tüm advertorial yayınlarını bir Excel/Sheet'te takip edin",
          ],
        },
        {
          heading: "Advertorial Maliyetleri ve ROI",
          body: [
            "Advertorial maliyetleri siteye, sektöre ve içerik kalitesine göre değişir.",
          ],
          tips: [
            "Küçük/orta bloglar: 500-2.000 TL arası",
            "Büyük haber siteleri: 3.000-15.000 TL arası",
            "Premium medya (ulusal): 10.000 TL ve üzeri",
            "ROI hesabı: Kazanılan organik trafik değeri vs advertorial maliyeti",
            "Tek seferlik değil, sürekli ve çeşitlendirilmiş strateji izleyin",
          ],
        },
      ],
      pdfFileName: "tanitim-yazisi-advertorial-sureci.pdf",
    },
    "dogal-backlink-kazanma-yollari": {
      category: "Backlink & Off-Page SEO",
      categorySlug: "backlink",
      title: "Doğal Backlink Kazanma Yolları",
      subtitle:
        "Satın almadan, manipülasyon yapmadan, doğal ve sürdürülebilir şekilde kaliteli backlink kazanmanın kanıtlanmış yöntemleri.",
      videos: [],
      sections: [
        {
          heading: "Doğal Backlink Nedir ve Neden Önemlidir?",
          body: [
            "Doğal backlink, başka sitelerin sizin içeriğinizi değerli bularak kendi iradesiyle link vermesidir. Google'ın en çok ödüllendirdiği link türüdür.",
            "Doğal backlink profili oluşturmak zaman alır ama en güvenli ve kalıcı SEO stratejisidir.",
          ],
          tips: [
            "Google'ın link spam algoritmalarına takılma riski minimumdur",
            "Doğal linkler genellikle tematik olarak ilişkili sitelerden gelir",
            "Uzun vadede en yüksek ROI'yi sağlayan stratejidir",
          ],
        },
        {
          heading: "1. Kapsamlı ve Derinlemesine İçerik Üretin",
          body: [
            "\"10x İçerik\" prensibi: Rakiplerden 10 kat daha değerli içerik üretin.",
          ],
          tips: [
            "Ultimate guide (kapsamlı rehber) formatında içerikler yazın",
            "Orijinal araştırma, anket ve veri analizi yayımlayın",
            "Case study (vaka çalışması) içerikleri paylaşın",
            "İnfografikler ve görsel içerikler hazırlayın",
            "Sektörel istatistik ve rapor derlemeleri yapın",
          ],
        },
        {
          heading: "2. HARO ve Uzman Yorumları",
          body: [
            "Help A Reporter Out (HARO) ve benzeri platformlarda gazetecilere uzman görüşü vererek backlink kazanabilirsiniz.",
          ],
          tips: [
            "HARO, Qwoted, SourceBottle gibi platformlara kaydolun",
            "Uzmanlık alanınızla ilgili sorulara hızlı ve kaliteli yanıt verin",
            "Biyografinizde site linkinizi ekleyin",
            "Türkiye'de benzer platformlar: BSEO, MediaCat kaynak talepleri",
          ],
        },
        {
          heading: "3. Broken Link Building",
          body: [
            "Rakip sitelerdeki kırık linkleri tespit edip, kendi içeriğinizi alternatif olarak önerin.",
          ],
          tips: [
            "Ahrefs Broken Backlinks raporu ile kırık linkler bulun",
            "Kırık linke karşılık gelen kaliteli bir içerik hazırlayın",
            "Site yöneticisine kibarca e-posta gönderin",
            "Başarı oranı: %5-15 arası (hacim önemli)",
          ],
        },
        {
          heading: "4. Konuk Yazarlık (Guest Posting)",
          body: [
            "Sektörünüzdeki bloglara kaliteli konuk yazılar yazarak doğal backlink kazanabilirsiniz.",
          ],
          tips: [
            "Sadece ilgili ve kaliteli sitelere yazın",
            "Yazar biyografisinde 1 dofollow link kullanın",
            "İçerik içinde doğal bağlamda link verin",
            "Aynı siteye tekrar tekrar yazmaktan kaçının",
            "İçerik kalitesinden ödün vermeyin",
          ],
        },
        {
          heading: "5. Ücretsiz Araç ve Kaynak Oluşturma",
          body: [
            "Sektörünüze özel ücretsiz bir araç, hesap makinesi, şablon veya kaynak oluşturmak doğal link çekmenin en etkili yollarından biridir.",
          ],
          tips: [
            "SEO araçları, ROI hesaplayıcılar, şablon indirmeleri",
            "Sektörel checklist ve kontrol listeleri",
            "Ücretsiz e-kitap ve PDF rehberler",
            "İnteraktif araçlar (quiz, test, hesaplayıcı)",
          ],
        },
        {
          heading: "6. Dijital PR ve Marka Bahsetmeleri",
          body: [
            "Marka bahsetmelerini (brand mention) takip edip linksiz bahsetmeleri linkli hale getirin.",
          ],
          tips: [
            "Google Alerts ile marka adınızı takip edin",
            "Linksiz bahsetmeleri tespit edip site yöneticisinden link isteyin",
            "Basın bültenleri ve medya ilişkileri ile PR linkler kazanın",
            "Sektörel etkinliklerde konuşmacı olarak yer alın",
          ],
        },
      ],
      pdfFileName: "dogal-backlink-kazanma-yollari.pdf",
    },
    "outreach-e-posta-sablonlari": {
      category: "Backlink & Off-Page SEO",
      categorySlug: "backlink",
      title: "Outreach E-posta Şablonları",
      subtitle:
        "Backlink talebi, konuk yazarlık, broken link building ve PR için kullanıma hazır e-posta şablonları.",
      videos: [],
      sections: [
        {
          heading: "Etkili Outreach E-postası Nasıl Yazılır?",
          body: [
            "Backlink outreach e-postaları, doğru yazıldığında %10-20 başarı oranına ulaşabilir. Kötü yazıldığında ise spam klasörüne düşer.",
          ],
          tips: [
            "Kişiselleştirme şarttır — toplu e-posta göndermeyin",
            "Konu satırı kısa ve merak uyandırıcı olsun",
            "İlk cümlede değer önerinizi belirtin",
            "Karşı tarafa fayda sunun — sadece \"link ver\" demeyin",
            "Kısa tutun — maks 150 kelime",
            "Takip e-postası gönderin (3-5 gün sonra)",
          ],
        },
        {
          heading: "Şablon 1: Konuk Yazarlık Talebi",
          body: [
            "Konu: [Site Adı] İçin İçerik Önerim\n\nMerhaba [İsim],\n\n[Site Adı] blogunu düzenli takip ediyorum, özellikle [belirli bir yazı] yazınız çok faydalıydı.\n\nBen [Adınız], [uzmanlık alanınız] konusunda [kısa tanım]. Siteniz için [konu önerisi] hakkında kapsamlı bir konuk yazı hazırlamak isterim.\n\nDaha önce [yayın yaptığınız siteler] gibi platformlarda yazılarım yayımlandı.\n\nİlgilenirseniz detaylı bir taslak gönderebilirim.\n\nSaygılarımla,\n[Adınız]",
          ],
        },
        {
          heading: "Şablon 2: Broken Link Building",
          body: [
            "Konu: [Site Adı]'ndaki Kırık Link Hakkında\n\nMerhaba [İsim],\n\n[Sayfa URL'si] sayfanızda [kırık link anchor text] bağlantısının çalışmadığını fark ettim.\n\nBu konuda hazırladığım [içerik başlığınız] yazısı okuyucularınız için faydalı bir alternatif olabilir: [URL'niz]\n\nSadece bilginize sunmak istedim. İyi çalışmalar!\n\n[Adınız]",
          ],
        },
        {
          heading: "Şablon 3: Kaynak Sayfası Link Talebi",
          body: [
            "Konu: [Konu] Kaynaklar Sayfanız İçin Öneri\n\nMerhaba [İsim],\n\n[Kaynaklar sayfası URL'si] sayfanızı inceliyordum, çok faydalı bir derleme olmuş.\n\nBen de [konu] hakkında kapsamlı bir [rehber/araç/kaynak] hazırladım: [URL'niz]\n\nListenize eklemeye değer bulursanız çok mutlu olurum.\n\nTeşekkürler,\n[Adınız]",
          ],
        },
        {
          heading: "Şablon 4: Linksiz Marka Bahsetmesi",
          body: [
            "Konu: [Yazı Başlığı] Yazınız Hakkında Teşekkür\n\nMerhaba [İsim],\n\n[Yazı URL'si] yazınızda [marka/ürün adınız]'dan bahsettiğinizi gördüm, teşekkür ederim!\n\nOkuyucularınızın daha fazla bilgi edinebilmesi için bahsettiğiniz yere bir link eklemeniz mümkün mü? İşte doğrudan ilgili sayfamız: [URL'niz]\n\nTeşekkürler,\n[Adınız]",
          ],
        },
        {
          heading: "Şablon 5: Advertorial / Sponsorlu İçerik Talebi",
          body: [
            "Konu: [Site Adı] İçin Sponsorlu İçerik Fırsatı\n\nMerhaba [İsim],\n\n[Site Adı] sitenizin [sektör] alanındaki kaliteli içeriklerini takip ediyorum.\n\n[Şirket/Marka Adı] olarak sitenizde sponsorlu bir içerik yayımlamak istiyoruz. Editoryal standartlarınıza uygun, okuyucularınıza değer katacak bir içerik hazırlayabiliriz.\n\nFiyat ve koşullarınızı öğrenebilir miyim?\n\nSaygılarımla,\n[Adınız]\n[Şirket]",
          ],
        },
        {
          heading: "Outreach İpuçları ve En İyi Pratikler",
          body: [
            "E-posta şablonlarını kullanırken dikkat etmeniz gereken önemli noktalar:",
          ],
          tips: [
            "Her e-postayı kişiselleştirin — şablonu birebir kopyalamayın",
            "Gönderdiğiniz kişinin adını ve site adını doğru yazın",
            "Haftada 20-30 outreach e-postası gönderin (spam sınırına dikkat)",
            "Gmail veya iş e-postanızı kullanın — ücretsiz mail servisleri güvenilir değildir",
            "Cevap gelmezse 3-5 gün sonra nazik bir takip e-postası gönderin",
            "Başarılı outreach'leri bir tabloda takip edin",
            "Reddedilmeye hazır olun — %10 başarı oranı normaldir",
          ],
        },
      ],
      pdfFileName: "outreach-e-posta-sablonlari.pdf",
    },
  },
  "otomasyon": {
    "screaming-frog-excel-otomatik-raporlama": {
      category: "SEO Otomasyon & Script'ler",
      categorySlug: "otomasyon",
      title: "Screaming Frog + Excel ile Otomatik Raporlama",
      subtitle:
        "Site tarama verilerinizi Screaming Frog ile çekin, Excel'de otomatik raporlara dönüştürün ve müşterilerinize profesyonel SEO analizi sunun.",
      videos: [],
      sections: [
        {
          heading: "Neden Screaming Frog + Excel?",
          body: [
            "Screaming Frog SEO Spider, web sitelerini tarayarak tüm teknik SEO verilerini toplar. Bu verileri Excel ile birleştirerek otomatik, tekrarlanabilir ve profesyonel raporlar oluşturabilirsiniz.",
            "Bu kombinasyon özellikle ajanslar ve freelance SEO uzmanları için zaman kazandırır ve raporlama sürecini standartlaştırır.",
          ],
          tips: [
            "Screaming Frog ücretsiz sürümde 500 URL'ye kadar tarama yapabilir",
            "Lisanslı sürüm sınırsız tarama + zamanlama + API entegrasyonu sunar",
            "Excel pivot tabloları ile verileri otomatik özetleyebilirsiniz",
          ],
        },
        {
          heading: "1. Screaming Frog Kurulum ve Temel Tarama",
          body: [
            "Screaming Frog'u screamingfrog.co.uk adresinden indirip kurun. Başlangıç ayarlarını doğru yapılandırmak önemlidir.",
          ],
          tips: [
            "Configuration → Spider → Crawl sekmesinde JavaScript rendering'i aktif edin",
            "Crawl Limit'i sitenizin boyutuna göre ayarlayın",
            "Harici bağlantıları (external links) da taramak istiyorsanız \"Check External Links\" aktif edin",
            "User-Agent'ı Googlebot olarak ayarlayarak Google'ın gördüğü haliyle tarayın",
            "Memory Allocation'ı en az 2GB yapın (büyük siteler için 4GB+)",
          ],
        },
        {
          heading: "2. Önemli Tarama Verileri",
          body: [
            "Screaming Frog taraması tamamlandığında analiz edilmesi gereken temel veriler:",
          ],
          tips: [
            "Response Codes: 404, 301, 302, 500 hata sayfaları",
            "Page Titles: Eksik, kopyalanmış veya çok uzun/kısa başlıklar",
            "Meta Descriptions: Eksik, kopyalanmış veya uygunsuz uzunlukta",
            "H1: Eksik, birden fazla veya kopyalanmış H1 etiketleri",
            "Images: ALT etiketi eksik görseller",
            "Canonicals: Hatalı veya eksik canonical etiketler",
            "Directives: Noindex, nofollow sayfalar",
            "Internal Links: Kırık iç linkler ve yetim sayfalar",
          ],
        },
        {
          heading: "3. Verileri Excel'e Aktarma",
          body: [
            "Screaming Frog'dan verileri CSV veya Excel formatında dışa aktarabilirsiniz.",
          ],
          tips: [
            "Bulk Export → All menüsünden tüm verileri tek seferde aktarın",
            "Her sekme (Internal, External, Images, vb.) ayrı sheet olarak aktarılabilir",
            "Dışa aktarma formatı olarak .xlsx tercih edin",
            "Özel raporlar için Filter → Summary bölümünü kullanın",
            "Crawl Overview raporu genel durumu özetler",
          ],
        },
        {
          heading: "4. Excel'de Otomatik Rapor Şablonu Oluşturma",
          body: [
            "Excel'de bir kez oluşturduğunuz rapor şablonunu her taramada tekrar kullanabilirsiniz.",
          ],
          tips: [
            "Sheet 1 — Genel Özet: Toplam sayfa sayısı, hata dağılımı, indexlenebilir sayfalar",
            "Sheet 2 — Durum Kodları: 2xx, 3xx, 4xx, 5xx dağılım grafiği",
            "Sheet 3 — Başlık Analizi: Eksik/kopyalanmış/uzunluk dışı title'lar",
            "Sheet 4 — Meta Description: Eksik/kopyalanmış meta açıklamalar",
            "Sheet 5 — Görsel Analizi: ALT etiketi eksik görseller listesi",
            "Sheet 6 — Hız Metrikleri: Sayfa boyutu ve yüklenme süresi",
            "Pivot Table ile otomatik özetleme yapın",
            "Conditional Formatting ile kritik hataları renklenirin",
          ],
        },
        {
          heading: "5. Zamanlanmış Tarama ve Otomasyon",
          body: [
            "Screaming Frog lisanslı sürümde zamanlanmış taramalar ayarlayabilirsiniz.",
          ],
          tips: [
            "Configuration → Scheduling ile haftalık/aylık otomatik tarama kurun",
            "Tarama sonuçlarını otomatik olarak belirli bir klasöre kaydedin",
            "Google Sheets API entegrasyonu ile sonuçları buluta aktarın",
            "Komut satırı (CLI) ile batch tarama yapabilirsiniz",
            "Screaming Frog API ile özel entegrasyonlar oluşturun",
          ],
        },
        {
          heading: "6. Müşteriye Sunum İpuçları",
          body: [
            "Hazırladığınız raporu müşteriye etkili şekilde sunmak için öneriler:",
          ],
          tips: [
            "Rapor başına yönetici özeti (executive summary) ekleyin",
            "Hataları kritiklik seviyesine göre sınıflandırın (Kritik, Orta, Düşük)",
            "Her hata için aksyon önerisi yazın",
            "Görsellerle (grafik/chart) destekleyin",
            "Önceki taramayla karşılaştırma (trend analizi) ekleyin",
            "PDF olarak dışa aktararak profesyonel görünüm sağlayın",
          ],
        },
      ],
      pdfFileName: "screaming-frog-excel-otomatik-raporlama.pdf",
    },
  },
  "wordpress-seo": {
    "yoast-seo-vs-rank-math": {
      category: "WordPress SEO Araçları",
      categorySlug: "wordpress-seo",
      title: "Yoast SEO vs Rank Math SEO",
      subtitle:
        "WordPress'in iki dev SEO eklentisini detaylı karşılaştırın ve siteniz için en doğru konfigürasyonu yapın.",
      videos: [],
      sections: [
        {
          heading: "Genel Karşılaştırma",
          body: [
            "Yoast SEO ve Rank Math, WordPress ekosisteminin en popüler iki SEO eklentisidir. Yoast 2010'dan beri piyasada olup güvenilirliğiyle bilinirken, Rank Math 2018'de çıkmasına rağmen zengin ücretsiz özellikleriyle hızla yükselmiştir.",
            "Her iki eklenti de temel SEO ihtiyaçlarını karşılar ancak yaklaşımları, arayüzleri ve fiyatlandırmaları farklıdır.",
          ],
          tips: [
            "Yoast: Daha minimalist arayüz, daha az seçenek — yeni başlayanlar için ideal",
            "Rank Math: Daha fazla ücretsiz özellik, modüler yapı — ileri düzey kullanıcılar için cazip",
            "Her ikisi de Schema, Sitemap, Breadcrumbs ve Redirect desteği sunar",
          ],
        },
        {
          heading: "Yoast SEO Konfigürasyonu",
          body: [
            "Yoast SEO kurulumunda adım adım yapılması gerekenler:",
          ],
          tips: [
            "İlk Kurulum Sihirbazı: Yoast → Genel → İlk Yapılandırma'yı çalıştırın",
            "Site Tipi: Kişisel blog mu, şirket sitesi mi belirleyin",
            "Sosyal Profiller: Facebook, Twitter, LinkedIn URL'lerini ekleyin",
            "Arama Görünürlüğü → İçerik Türleri: Yazılar ve sayfalar için SEO başlık şablonu ayarlayın",
            "Arama Görünürlüğü → Taksonomiler: Kategori ve etiket sayfalarında noindex tercihini yapın",
            "XML Sitemaps: Yoast → Genel → Özellikler'den aktif edin",
            "Breadcrumbs: Tema desteği varsa Yoast → Arama Görünürlüğü → Breadcrumbs'dan aktif edin",
            "Cornerstone İçerik: En önemli yazılarınızı 'cornerstone' olarak işaretleyin",
            "Readability analizi: Türkçe desteği sınırlıdır, SEO analizine odaklanın",
          ],
        },
        {
          heading: "Rank Math SEO Konfigürasyonu",
          body: [
            "Rank Math kurulumunda adım adım yapılması gerekenler:",
          ],
          tips: [
            "Kurulum Sihirbazı: Rank Math → Dashboard → Setup Wizard'ı 'Advanced' modda çalıştırın",
            "Modüller: Analytics, Schema, Sitemap, Redirections, 404 Monitor modüllerini aktif edin",
            "Başlık & Meta: Rank Math → Titles & Meta → Posts/Pages için şablon düzenleyin",
            "Sitemap: Rank Math → Sitemap Settings → gereksiz post type'ları hariç tutun",
            "Schema: Varsayılan schema tipini 'Article' olarak ayarlayın, sayfalarda 'WebPage' kullanın",
            "Redirections modülü: 301/302 yönlendirmeleri eklenti içinden yönetin",
            "404 Monitor: Kırık URL'leri tespit edip yönlendirme oluşturun",
            "Google Search Console entegrasyonu: Rank Math → Analytics'ten bağlayın",
            "Instant Indexing: Google Indexing API ile hızlı indeksleme aktif edin",
            "Role Manager: Editör/yazar rollerine SEO erişim seviyesi belirleyin",
          ],
        },
        {
          heading: "Özellik Karşılaştırma Tablosu",
          body: [
            "İki eklentinin temel özelliklerinin karşılaştırması:",
          ],
          tips: [
            "Odak Anahtar Kelime: Yoast ücretsizde 1, Rank Math ücretsizde 5 adet",
            "Schema Markup: Yoast sınırlı (Pro'da genişler), Rank Math ücretsizde 15+ schema tipi",
            "Yönlendirmeler: Yoast Pro, Rank Math ücretsiz",
            "404 İzleme: Yoast yok, Rank Math ücretsiz",
            "İç Link Önerisi: Yoast Pro, Rank Math ücretsiz",
            "Google Analytics Entegrasyonu: Her ikisi de Pro",
            "WooCommerce SEO: Her ikisi de Pro",
            "Fiyat: Yoast Premium ~99$/yıl, Rank Math Pro ~59$/yıl",
            "Performans: Rank Math genelde daha hafif (daha az veritabanı sorgusu)",
          ],
        },
        {
          heading: "Hangisini Seçmeliyim?",
          body: [
            "Seçim sitenizin ihtiyaçlarına ve teknik seviyenize bağlıdır.",
          ],
          tips: [
            "Yeni başlıyorsanız ve basitlik istiyorsanız → Yoast SEO",
            "Ücretsiz planda maksimum özellik istiyorsanız → Rank Math",
            "WooCommerce sitesi yönetiyorsanız → Her ikisi de Pro gerektirir, Rank Math Pro daha uygun fiyatlı",
            "Çoklu site yönetiyorsanız → Rank Math Business planı daha avantajlı",
            "Mevcut Yoast kurulumundan geçiş yapmak istiyorsanız → Rank Math dahili import aracı sunar",
            "Her iki eklenti de düzenli güncellenir ve güvenlidir",
          ],
        },
        {
          heading: "Geçiş (Migration) İpuçları",
          body: [
            "Bir eklentiden diğerine geçerken dikkat edilmesi gerekenler:",
          ],
          tips: [
            "Geçiş öncesi mutlaka tam site yedeği alın",
            "Rank Math'in dahili import aracı Yoast verilerini otomatik taşır",
            "Geçiş sonrası tüm sayfaların meta başlık/açıklamalarını kontrol edin",
            "Schema markup'larını doğrulayın (Google Rich Results Test)",
            "XML Sitemap URL'sini Google Search Console'da güncelleyin",
            "301 yönlendirmelerinizi kontrol edin — eski eklentinin redirect'leri kaybolabilir",
          ],
        },
      ],
      pdfFileName: "yoast-seo-vs-rank-math.pdf",
    },
    "wp-head-optimizasyon-rehberi": {
      category: "WordPress SEO Araçları",
      categorySlug: "wordpress-seo",
      title: "wp_head Optimizasyon Rehberi",
      subtitle:
        "WordPress wp_head çıktısını temizleyerek sayfa hızını artırın, gereksiz meta etiketleri kaldırın ve SEO performansını optimize edin.",
      videos: [],
      sections: [
        {
          heading: "wp_head Nedir ve Neden Optimize Edilmeli?",
          body: [
            "WordPress'in wp_head() fonksiyonu, temanızın <head> bölümüne çeşitli meta etiketler, scriptler ve stiller ekler. Bunların çoğu varsayılan olarak gelir ve siteniz için gereksiz olabilir.",
            "Gereksiz çıktıları temizlemek sayfa boyutunu küçültür, yüklenme hızını artırır ve potansiyel güvenlik açıklarını kapatır.",
          ],
          tips: [
            "wp_head() çıktısını görmek için sayfa kaynağını (Ctrl+U) inceleyebilirsiniz",
            "Her kaldırılan öğe için sitenizi test edin — bazıları tema/eklenti için gerekli olabilir",
            "Tüm değişiklikleri child theme'in functions.php dosyasına ekleyin",
          ],
        },
        {
          heading: "1. WordPress Sürüm Numarasını Kaldırma",
          body: [
            "WordPress varsayılan olarak sürüm numarasını meta etiket ve RSS feed'de gösterir. Bu güvenlik açığı oluşturabilir.",
          ],
          tips: [
            "remove_action('wp_head', 'wp_generator'); ile meta tag'ı kaldırın",
            "RSS feed'deki sürümü kaldırmak için: add_filter('the_generator', '__return_empty_string');",
            "Script ve style URL'lerindeki ?ver= parametresini de kaldırabilirsiniz",
          ],
        },
        {
          heading: "2. RSD ve WLW Manifest Linklerini Kaldırma",
          body: [
            "Really Simple Discovery (RSD) ve Windows Live Writer manifest linkleri çoğu site için gereksizdir.",
          ],
          tips: [
            "remove_action('wp_head', 'rsd_link'); — XML-RPC kullanmıyorsanız kaldırın",
            "remove_action('wp_head', 'wlw_manifest_link'); — Windows Live Writer kullanmıyorsanız kaldırın",
            "XML-RPC'yi tamamen kapatmak için: add_filter('xmlrpc_enabled', '__return_false');",
          ],
        },
        {
          heading: "3. Emoji Script ve Stillerini Devre Dışı Bırakma",
          body: [
            "WordPress wp-emoji-release.min.js dosyasını ve inline CSS'i her sayfaya yükler. Emoji kullanmıyorsanız gereksiz yüktür.",
          ],
          tips: [
            "remove_action('wp_head', 'print_emoji_detection_script', 7); ile JavaScript'i kaldırın",
            "remove_action('wp_print_styles', 'print_emoji_styles'); ile CSS'i kaldırın",
            "Admin panelinden de kaldırmak isterseniz admin_head ve admin_print_styles hook'larını kullanın",
            "Feed'lerden kaldırmak için: remove_filter('the_content_feed', 'wp_staticize_emoji');",
          ],
        },
        {
          heading: "4. Shortlink ve REST API Linkini Kaldırma",
          body: [
            "WordPress her sayfaya kısa link (shortlink) ve REST API endpoint linki ekler.",
          ],
          tips: [
            "remove_action('wp_head', 'wp_shortlink_wp_head'); — Shortlink'i kaldırın",
            "remove_action('wp_head', 'rest_output_link_wp_head'); — REST API linkini kaldırın",
            "remove_action('wp_head', 'wp_oembed_add_discovery_links'); — oEmbed discovery linklerini kaldırın",
            "REST API'yi tamamen kapatmak yerine sadece head çıktısını kaldırmanız yeterlidir",
          ],
        },
        {
          heading: "5. Feed Linklerini Kaldırma",
          body: [
            "Blog kullanmıyorsanız veya RSS feed'e ihtiyacınız yoksa bu linkleri kaldırabilirsiniz.",
          ],
          tips: [
            "remove_action('wp_head', 'feed_links', 2); — Genel feed linklerini kaldırın",
            "remove_action('wp_head', 'feed_links_extra', 3); — Kategori/yorum feed linklerini kaldırın",
            "Blog kullanıyorsanız bu linkleri KALDIRMAYIN — RSS aboneleri etkilenir",
          ],
        },
        {
          heading: "6. DNS Prefetch ve Preconnect Optimizasyonu",
          body: [
            "Harici kaynaklar için DNS prefetch ve preconnect ekleyerek bağlantı süresini kısaltın.",
          ],
          tips: [
            "Google Fonts kullanıyorsanız: <link rel='preconnect' href='https://fonts.googleapis.com' />",
            "CDN kullanıyorsanız: <link rel='dns-prefetch' href='//cdn.example.com' />",
            "Analytics: <link rel='dns-prefetch' href='//www.google-analytics.com' />",
            "Gereksiz dns-prefetch'leri kaldırmak için wp_resource_hints filtresini kullanın",
          ],
        },
        {
          heading: "Tam Optimizasyon Kodu",
          body: [
            "Aşağıdaki kodu child theme'inizin functions.php dosyasına ekleyerek tüm gereksiz wp_head çıktılarını tek seferde temizleyebilirsiniz.",
          ],
          tips: [
            "Her satırı tek tek test edin — bazı temalar veya eklentiler etkilenebilir",
            "Staging ortamında test ettikten sonra production'a alın",
            "Cache eklentiniz varsa değişiklik sonrası cache'i temizleyin",
            "PageSpeed Insights ile önce/sonra karşılaştırma yapın",
          ],
        },
      ],
      pdfFileName: "wp-head-optimizasyon-rehberi.pdf",
    },
    "xml-sitemap-custom-yapilandirma": {
      category: "WordPress SEO Araçları",
      categorySlug: "wordpress-seo",
      title: "XML Sitemap Custom Yapılandırma Rehberi",
      subtitle:
        "WordPress sitemap'inizi özelleştirin, gereksiz URL'leri hariç tutun, öncelikleri ayarlayın ve arama motorlarına doğru sinyaller gönderin.",
      videos: [],
      sections: [
        {
          heading: "XML Sitemap Nedir ve Neden Önemlidir?",
          body: [
            "XML Sitemap, sitenizin tüm önemli URL'lerini listeleyen ve arama motorlarına sunan bir dosyadır. Google ve diğer arama motorları bu dosyayı kullanarak sitenizi daha verimli tarar.",
            "Varsayılan WordPress sitemap'i (wp-sitemap.xml) basittir ve çoğu zaman özelleştirme gerektirir.",
          ],
          tips: [
            "WordPress 5.5+ sürümlerinde dahili sitemap desteği var (wp-sitemap.xml)",
            "SEO eklentileri (Yoast, Rank Math) kendi sitemap'lerini oluşturur",
            "Google Search Console'da sitemap URL'nizi mutlaka gönderin",
            "Birden fazla sitemap kaynağı çakışabilir — sadece birini aktif tutun",
          ],
        },
        {
          heading: "1. Varsayılan WordPress Sitemap'i Devre Dışı Bırakma",
          body: [
            "SEO eklentisi kullanıyorsanız WordPress'in varsayılan sitemap'ini kapatmanız gerekir.",
          ],
          tips: [
            "functions.php'ye ekleyin: add_filter('wp_sitemaps_enabled', '__return_false');",
            "Yoast veya Rank Math kullanıyorsanız otomatik olarak devre dışı bırakılır",
            "Eklenti sitemap URL'si genelde: /sitemap_index.xml veya /sitemap.xml",
          ],
        },
        {
          heading: "2. Gereksiz URL'leri Sitemap'ten Hariç Tutma",
          body: [
            "Tüm URL'lerin sitemap'te olması gerekmez. Kalitesiz veya noindex sayfaları çıkarın.",
          ],
          tips: [
            "Tag (etiket) sayfalarını hariç tutun — genelde ince içeriktir",
            "Yazar arşiv sayfalarını hariç tutun (tek yazarlı sitelerde)",
            "Attachment/media sayfalarını mutlaka hariç tutun",
            "Arama sonuç sayfaları zaten noindex olmalı ve sitemap'te olmamalı",
            "Yoast: SEO → Arama Görünürlüğü → Taksonomiler'den ayarlayın",
            "Rank Math: Sitemap Settings → ilgili post type/taxonomy'yi kapatın",
          ],
        },
        {
          heading: "3. Sitemap Öncelik ve Güncelleme Sıklığı",
          body: [
            "Sitemap'te her URL için priority (öncelik) ve changefreq (güncelleme sıklığı) ayarlayabilirsiniz.",
          ],
          tips: [
            "Ana sayfa: priority 1.0, changefreq daily",
            "Önemli hizmet sayfaları: priority 0.8, changefreq weekly",
            "Blog yazıları: priority 0.6, changefreq monthly",
            "Kategori sayfaları: priority 0.4, changefreq weekly",
            "Google bu değerleri sadece ipucu olarak kullanır — garanti değildir",
            "Rank Math ve Yoast bu ayarları otomatik yönetir",
          ],
        },
        {
          heading: "4. Görsel Sitemap (Image Sitemap)",
          body: [
            "Google görsel aramada sıralama almak için görsel sitemap oluşturabilirsiniz.",
          ],
          tips: [
            "Yoast SEO otomatik olarak görselleri sitemap'e dahil eder",
            "Rank Math da görsel sitemap desteği sunar",
            "Manuel oluşturmak isterseniz <image:image> etiketleri kullanın",
            "Tüm görsellerin ALT etiketi olduğundan emin olun",
            "WebP formatındaki görseller de sitemap'e dahil edilebilir",
          ],
        },
        {
          heading: "5. Video Sitemap",
          body: [
            "Sitenizde video içerik varsa video sitemap ile Google'da rich snippet alma şansınızı artırın.",
          ],
          tips: [
            "Yoast Video SEO eklentisi (premium) video sitemap oluşturur",
            "Rank Math Pro da video sitemap desteği sunar",
            "YouTube embed videolar için de sitemap oluşturulabilir",
            "Video başlığı, açıklaması, thumbnail URL'si ve süresini ekleyin",
          ],
        },
        {
          heading: "6. Sitemap Doğrulama ve Google'a Gönderme",
          body: [
            "Oluşturduğunuz sitemap'i doğrulayın ve arama motorlarına bildirin.",
          ],
          tips: [
            "Google Search Console → Sitemaps → sitemap URL'nizi ekleyin",
            "robots.txt dosyasına ekleyin: Sitemap: https://siteadiniz.com/sitemap_index.xml",
            "Sitemap'i XML validator ile kontrol edin",
            "Büyük siteler için sitemap index dosyası kullanın (50.000 URL/dosya limiti)",
            "Sitemap güncellendikten sonra Search Console'dan yeniden gönderin",
            "Bing Webmaster Tools'a da sitemap ekleyin",
          ],
        },
      ],
      pdfFileName: "xml-sitemap-custom-yapilandirma.pdf",
    },
    "wordpress-seo-kontrol-listesi": {
      category: "WordPress SEO Araçları",
      categorySlug: "wordpress-seo",
      title: "WordPress SEO Kontrol Listesi",
      subtitle:
        "WordPress sitenizin SEO durumunu baştan sona kontrol edin. Teknik SEO, içerik, hız ve güvenlik maddelerini tek bir checklist'te takip edin.",
      videos: [],
      sections: [
        {
          heading: "1. Temel Ayarlar",
          body: [
            "WordPress kurulumunuzun temel SEO ayarlarını kontrol edin.",
          ],
          tips: [
            "☐ Ayarlar → Okuma → 'Arama motorlarını engelle' seçeneği KAPALI olmalı",
            "☐ Kalıcı bağlantılar (Permalinks) SEO dostu yapıda olmalı (/%postname%/)",
            "☐ SSL sertifikası aktif ve tüm sayfalar HTTPS üzerinden sunuluyor",
            "☐ www ve www olmayan sürüm arasında yönlendirme yapılmış",
            "☐ Site başlığı ve alt başlığı doğru ayarlanmış",
            "☐ Zaman dilimi ve tarih formatı doğru",
          ],
        },
        {
          heading: "2. SEO Eklentisi Konfigürasyonu",
          body: [
            "Yoast SEO veya Rank Math eklentisinin doğru yapılandırıldığını kontrol edin.",
          ],
          tips: [
            "☐ SEO eklentisi kurulu ve aktif",
            "☐ İlk kurulum sihirbazı tamamlanmış",
            "☐ Varsayılan başlık şablonları ayarlanmış",
            "☐ Meta description şablonları ayarlanmış",
            "☐ XML Sitemap aktif ve Google Search Console'a gönderilmiş",
            "☐ Breadcrumbs aktif (tema destekliyorsa)",
            "☐ Schema/Yapısal veri ayarları yapılmış",
            "☐ Sosyal medya profilleri eklenmiş",
          ],
        },
        {
          heading: "3. Teknik SEO",
          body: [
            "Sitenizin teknik altyapısını kontrol edin.",
          ],
          tips: [
            "☐ robots.txt dosyası mevcut ve doğru yapılandırılmış",
            "☐ XML Sitemap erişilebilir ve hatasız",
            "☐ 404 sayfası özelleştirilmiş ve yönlendirme içeriyor",
            "☐ 301 yönlendirmeler doğru çalışıyor",
            "☐ Canonical etiketler tüm sayfalarda mevcut",
            "☐ Hreflang etiketleri (çok dilli siteler için) doğru",
            "☐ Schema markup Google Rich Results Test'ten geçiyor",
            "☐ Mobile-friendly (mobil uyumluluk) testi başarılı",
            "☐ Core Web Vitals değerleri kabul edilebilir seviyede",
          ],
        },
        {
          heading: "4. İçerik SEO",
          body: [
            "İçerik kalitesi ve optimizasyonunu kontrol edin.",
          ],
          tips: [
            "☐ Her sayfada benzersiz ve optimize edilmiş title tag var",
            "☐ Her sayfada benzersiz meta description var (140-160 karakter)",
            "☐ H1 etiketi her sayfada tek ve anahtar kelime içeriyor",
            "☐ H2-H6 hiyerarşisi doğru kullanılıyor",
            "☐ Görsellerin ALT etiketleri dolu",
            "☐ İç linkler stratejik olarak yerleştirilmiş",
            "☐ Kırık iç linkler yok (Broken Link Checker ile kontrol)",
            "☐ İnce içerik (thin content) sayfaları tespit edilip iyileştirilmiş",
            "☐ Duplicate content sorunu yok",
          ],
        },
        {
          heading: "5. Sayfa Hızı",
          body: [
            "WordPress sitenizin hız performansını kontrol edin.",
          ],
          tips: [
            "☐ Cache eklentisi kurulu ve aktif (WP Rocket, LiteSpeed Cache vb.)",
            "☐ Görseller optimize edilmiş (WebP formatı, sıkıştırma)",
            "☐ Lazy loading aktif (görseller ve iframe'ler için)",
            "☐ CSS ve JavaScript dosyaları minify edilmiş",
            "☐ Kullanılmayan CSS/JS kaldırılmış veya defer edilmiş",
            "☐ CDN kullanılıyor (Cloudflare, BunnyCDN vb.)",
            "☐ Veritabanı optimize edilmiş (gereksiz revision, transient temizliği)",
            "☐ GZIP/Brotli sıkıştırma aktif",
            "☐ Server response time (TTFB) 200ms altında",
          ],
        },
        {
          heading: "6. Güvenlik",
          body: [
            "SEO'yu doğrudan etkileyen güvenlik ayarlarını kontrol edin.",
          ],
          tips: [
            "☐ WordPress, tema ve eklentiler güncel",
            "☐ Kullanılmayan tema ve eklentiler silinmiş",
            "☐ Güçlü admin şifresi ve iki faktörlü doğrulama aktif",
            "☐ wp-login.php URL'si değiştirilmiş veya korunuyor",
            "☐ XML-RPC devre dışı (kullanılmıyorsa)",
            "☐ Dosya düzenleme deaktif: define('DISALLOW_FILE_EDIT', true);",
            "☐ Güvenlik eklentisi aktif (Wordfence, Sucuri vb.)",
            "☐ Spam koruma aktif (Akismet veya alternatif)",
          ],
        },
        {
          heading: "7. Google Araçları Entegrasyonu",
          body: [
            "Google araçlarının doğru entegre edildiğini kontrol edin.",
          ],
          tips: [
            "☐ Google Search Console doğrulanmış ve aktif",
            "☐ Google Analytics 4 (GA4) kurulu ve çalışıyor",
            "☐ Google Tag Manager kurulu (gerekiyorsa)",
            "☐ Google Business Profile (yerel işletmeler için) güncel",
            "☐ Sitemap Google Search Console'a gönderilmiş",
            "☐ Coverage/Pages raporu kontrol edilmiş — hata yok",
            "☐ Core Web Vitals raporu incelenmiş",
          ],
        },
      ],
      pdfFileName: "wordpress-seo-kontrol-listesi.pdf",
    },
  },
  "kaynaklar": {
    "google-seo-baslangic-rehberi": {
      category: "Kaynaklar & Rehberler",
      categorySlug: "kaynaklar",
      title: "Google SEO Başlangıç Rehberi",
      subtitle:
        "Google'ın resmi SEO dokümantasyonuna dayalı kapsamlı başlangıç rehberi. SEO'nun temellerini, en iyi uygulamaları ve kaçınılması gereken hataları öğrenin.",
      videos: [],
      sections: [
        {
          heading: "SEO Nedir?",
          body: [
            "SEO (Search Engine Optimization — Arama Motoru Optimizasyonu), web sitenizin arama motorlarında organik olarak daha üst sıralarda görünmesini sağlayan teknik ve stratejik çalışmaların bütünüdür.",
            "Google, dünya genelinde en çok kullanılan arama motorudur ve web trafiğinin büyük çoğunluğu organik arama sonuçlarından gelir. Bu nedenle SEO, dijital pazarlamanın en temel taşlarından biridir.",
          ],
          tips: [
            "SEO tek seferlik bir işlem değil, sürekli bir süreçtir",
            "Google'ın amacı kullanıcıya en alakalı ve kaliteli sonucu göstermektir",
            "SEO üç ana alana ayrılır: Teknik SEO, İçerik SEO ve Off-Page SEO",
          ],
        },
        {
          heading: "Google Sitenizi Nasıl Bulur?",
          body: [
            "Google, 'Googlebot' adlı tarayıcılar (crawlers) kullanarak web'deki sayfaları keşfeder. Bu botlar linkleri takip ederek sayfadan sayfaya geçer ve içerikleri indeksler.",
          ],
          tips: [
            "XML Sitemap göndererek Google'ın tüm sayfalarınızı keşfetmesini kolaylaştırın",
            "robots.txt dosyasıyla taranmasını istemediğiniz sayfaları belirtin",
            "Google Search Console üzerinden sitenizin taranma durumunu izleyin",
            "İç link yapınız güçlü olsun — izole sayfalar taranamaz",
            "JavaScript ağırlıklı sitelerde render sorunlarına dikkat edin",
          ],
        },
        {
          heading: "Anahtar Kelime Araştırması",
          body: [
            "Hedef kitlenizin arama motorlarında ne aradığını anlamak, SEO'nun ilk ve en kritik adımıdır. Doğru anahtar kelimeleri hedeflemek, doğru kitleye ulaşmanızı sağlar.",
          ],
          tips: [
            "Google Keyword Planner, Ahrefs, SEMrush gibi araçları kullanın",
            "Arama niyetini (search intent) anlayın: bilgilendirici, ticari, navigasyonel",
            "Uzun kuyruk (long-tail) anahtar kelimeler daha az rekabetçi ve daha dönüşüm odaklıdır",
            "Rakiplerinizin hangi kelimelerden trafik aldığını analiz edin",
            "Her sayfa için tek bir ana anahtar kelime ve 2-3 destekleyici kelime hedefleyin",
          ],
        },
        {
          heading: "Sayfa İçi SEO (On-Page SEO)",
          body: [
            "Sayfa içi SEO, her bir web sayfasının arama motorları ve kullanıcılar için optimize edilmesi sürecidir.",
          ],
          tips: [
            "Title Tag: Anahtar kelimeyi başa yakın yerleştirin, 50-60 karakter arasında tutun",
            "Meta Description: Tıklama oranını artıran, 140-160 karakter arası açıklayıcı metin yazın",
            "H1 Etiketi: Her sayfada tek bir H1 kullanın, anahtar kelimeyi içersin",
            "H2-H6 Hiyerarşisi: İçeriği mantıklı başlıklarla yapılandırın",
            "URL Yapısı: Kısa, anlaşılır ve anahtar kelime içeren URL'ler kullanın",
            "Görsel Optimizasyon: ALT etiketleri, dosya isimleri ve WebP formatı kullanın",
            "İç Linkler: İlgili sayfalar arasında stratejik bağlantılar kurun",
          ],
        },
        {
          heading: "Teknik SEO Temelleri",
          body: [
            "Teknik SEO, arama motorlarının sitenizi doğru şekilde taramasını, indekslemesini ve değerlendirmesini sağlayan altyapı çalışmalarıdır.",
          ],
          tips: [
            "HTTPS kullanın — Google güvenli siteleri tercih eder",
            "Mobil uyumluluk (mobile-first indexing) artık zorunludur",
            "Core Web Vitals metrikleri: LCP < 2.5s, INP < 200ms, CLS < 0.1",
            "XML Sitemap oluşturun ve Google Search Console'a gönderin",
            "Canonical etiketlerle duplicate content sorunlarını önleyin",
            "404 hatalarını düzenli kontrol edin ve 301 yönlendirmeler kullanın",
            "Sayfa hızı optimizasyonu: cache, sıkıştırma, lazy loading",
          ],
        },
        {
          heading: "İçerik Stratejisi",
          body: [
            "Google'ın en önem verdiği faktörlerden biri kaliteli, özgün ve kullanıcıya değer katan içeriktir. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) prensipleri rehberiniz olmalıdır.",
          ],
          tips: [
            "Kullanıcı niyetine uygun, kapsamlı ve özgün içerikler üretin",
            "İnce içerikten (thin content) kaçının — her sayfanın bir amacı olmalı",
            "İçerikleri düzenli olarak güncelleyin ve güncel tutun",
            "E-E-A-T: Deneyim, Uzmanlık, Otorite ve Güvenilirlik gösterin",
            "Yazar bilgisi, kaynakça ve güncellenme tarihi ekleyin",
            "FAQ bölümleri ile kullanıcı sorularını yanıtlayın",
          ],
        },
        {
          heading: "Off-Page SEO ve Backlink",
          body: [
            "Off-Page SEO, sitenizin dışında gerçekleştirilen ve sitenizin otoritesini artıran çalışmalardır. Backlink (geri bağlantı) en önemli off-page faktördür.",
          ],
          tips: [
            "Kaliteli ve alakalı sitelerden doğal backlink kazanın",
            "Link satın almaktan ve link çiftliklerinden uzak durun",
            "Misafir yazıları ve dijital PR ile otorite oluşturun",
            "Kırık link (broken link) stratejisiyle fırsat yakalayın",
            "Sosyal medya paylaşımları doğrudan ranking faktörü değildir ancak dolaylı etkisi vardır",
            "Google Disavow aracını zararlı linkler için kullanın",
          ],
        },
        {
          heading: "Ölçümleme ve Takip",
          body: [
            "SEO çalışmalarınızın etkisini ölçmek ve stratejinizi veriye dayalı şekillendirmek için düzenli takip şarttır.",
          ],
          tips: [
            "Google Search Console: Tıklama, gösterim, pozisyon ve indeksleme verisi",
            "Google Analytics 4: Kullanıcı davranışı, dönüşüm ve trafik kaynakları",
            "Haftalık/aylık SEO raporları oluşturun",
            "Sıralama takip araçları kullanın (Ahrefs, SEMrush, Serpstat)",
            "Core Web Vitals değerlerini PageSpeed Insights ile izleyin",
            "Rakip analizi yaparak pozisyon değişimlerini karşılaştırın",
          ],
        },
        {
          heading: "SEO'da Kaçınılması Gereken Hatalar",
          body: [
            "Google'ın kalite yönergelerini ihlal eden uygulamalar sitenizin ceza almasına neden olabilir.",
          ],
          tips: [
            "Anahtar kelime doldurmaktan (keyword stuffing) kaçının",
            "Gizli metin ve bağlantılar kullanmayın",
            "Otomatik oluşturulmuş düşük kaliteli içerikten uzak durun",
            "Yanıltıcı yönlendirmeler (sneaky redirects) yapmayın",
            "İçerik çalma (scraping) ve spin içerikler Google'ın politikalarına aykırıdır",
            "Link şemaları (link schemes) ciddi cezalara yol açar",
            "Cloaking (arama motoruna farklı, kullanıcıya farklı içerik gösterme) kesinlikle yasaktır",
          ],
        },
      ],
      pdfFileName: "google-seo-baslangic-rehberi.pdf",
    },
    "seo-terminoloji-sozlugu": {
      category: "Kaynaklar & Rehberler",
      categorySlug: "kaynaklar",
      title: "SEO Terminoloji Sözlüğü",
      subtitle:
        "A'dan Z'ye tüm SEO terimlerinin Türkçe açıklamaları. Backlink'ten canonical'e, crawl budget'tan SERP'e kadar her terimi anlayın.",
      videos: [],
      sections: [
        {
          heading: "A - B",
          body: [
            "SEO dünyasında sıkça karşılaşılan A ve B harfleriyle başlayan terimler:",
          ],
          tips: [
            "Alt Tag (ALT Etiketi): Görsellerin arama motorları tarafından anlaşılması için eklenen açıklayıcı metin",
            "Anchor Text: Bir bağlantının (link) tıklanabilir metin kısmı. Doğal ve çeşitli anchor text kullanımı önemlidir",
            "Backlink: Başka bir web sitesinden sizin sitenize verilen bağlantı. SEO'nun en önemli off-page faktörlerinden biri",
            "Black Hat SEO: Google kurallarını ihlal eden agresif SEO teknikleri (link satın alma, cloaking vb.)",
            "Bounce Rate (Hemen Çıkma Oranı): Kullanıcının siteye gelip hiçbir etkileşimde bulunmadan ayrılma oranı",
            "Breadcrumb: Kullanıcının site içindeki konumunu gösteren hiyerarşik navigasyon yolu",
          ],
        },
        {
          heading: "C - D",
          body: [
            "C ve D harfleriyle başlayan temel SEO terimleri:",
          ],
          tips: [
            "Canonical URL: Aynı veya benzer içeriğe sahip sayfalar arasından 'asıl' kabul edilen URL. Duplicate content sorunlarını önler",
            "Cloaking: Arama motoruna ve kullanıcıya farklı içerik gösterme — Google tarafından yasak kabul edilir",
            "Core Web Vitals: Google'ın sayfa deneyimi ölçüm metrikleri — LCP, INP ve CLS",
            "Crawl Budget: Googlebot'un sitenizi taramak için ayırdığı kaynak miktarı. Büyük siteler için kritik",
            "Crawling: Arama motoru botlarının web sayfalarını keşfetme ve tarama süreci",
            "DA (Domain Authority): Moz tarafından geliştirilen, bir sitenin genel otoritesini ölçen metrik (1-100)",
            "Disavow: Google'a belirli backlink'lerin dikkate alınmamasını bildirme işlemi",
            "Duplicate Content: Aynı veya çok benzer içeriğin birden fazla URL'de bulunması sorunu",
          ],
        },
        {
          heading: "E - H",
          body: [
            "E'den H'ye kadar olan temel SEO terimleri:",
          ],
          tips: [
            "E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness — Google'ın içerik kalitesi değerlendirme kriterleri",
            "Featured Snippet: Arama sonuçlarının en üstünde, öne çıkan kutucukta gösterilen içerik",
            "Google Search Console (GSC): Google'ın ücretsiz web yöneticisi aracı — indeksleme, performans ve hata takibi",
            "Google Analytics (GA4): Web sitesi trafiğini ve kullanıcı davranışını analiz eden ücretsiz araç",
            "HTTPS: SSL sertifikası ile güvenli bağlantı protokolü — Google'da sıralama faktörüdür",
            "Heading Tags (H1-H6): İçerik hiyerarşisini belirleyen HTML başlık etiketleri",
            "Hreflang: Çok dilli sitelerde dil ve bölge hedeflemesi için kullanılan HTML etiketi",
          ],
        },
        {
          heading: "I - K",
          body: [
            "I'dan K'ya kadar olan SEO terimleri:",
          ],
          tips: [
            "Indexing (İndeksleme): Taranmış sayfaların arama motoru veritabanına eklenmesi süreci",
            "Internal Link (İç Link): Aynı site içindeki sayfalar arasında kurulan bağlantılar",
            "Keyword (Anahtar Kelime): Kullanıcıların arama motorlarında yazdığı sözcük veya ifadeler",
            "Keyword Cannibalization: Aynı anahtar kelime için birden fazla sayfanın rekabet etmesi sorunu",
            "Keyword Density: Bir anahtar kelimenin içerik içindeki kullanım yoğunluğu",
            "Keyword Stuffing: Anahtar kelimeyi aşırı ve doğal olmayan şekilde kullanma — Google tarafından cezalandırılır",
            "KPI (Key Performance Indicator): SEO performansını ölçmek için kullanılan temel göstergeler",
          ],
        },
        {
          heading: "L - N",
          body: [
            "L'den N'ye kadar olan SEO terimleri:",
          ],
          tips: [
            "Landing Page: Kullanıcının arama sonucundan veya reklamdan tıklayarak ulaştığı ilk sayfa",
            "Link Building: Diğer sitelerden backlink kazanma stratejisi",
            "Link Juice: Bir bağlantının hedef sayfaya aktardığı SEO değeri/otoritesi",
            "Long-tail Keyword: 3+ kelimeden oluşan, daha spesifik ve düşük rekabetli anahtar kelimeler",
            "Meta Description: Arama sonuçlarında başlığın altında görünen açıklama metni (max 160 karakter)",
            "Meta Title (Title Tag): Arama sonuçlarında ve tarayıcı sekmesinde görünen başlık (max 60 karakter)",
            "Nofollow: Bir bağlantının arama motorlarına 'bu linki takip etme' mesajı vermesi",
            "Noindex: Bir sayfanın arama sonuçlarında gösterilmemesi için kullanılan direktif",
          ],
        },
        {
          heading: "O - R",
          body: [
            "O'dan R'ye kadar olan SEO terimleri:",
          ],
          tips: [
            "Organic Traffic: Ücretli reklam olmadan, arama sonuçlarından gelen doğal trafik",
            "PageRank: Google'ın bir sayfanın önemini backlink'lere göre değerlendiren orijinal algoritması",
            "Pogo-sticking: Kullanıcının arama sonucuna tıklayıp hızlıca geri dönmesi — kötü kullanıcı deneyimi sinyali",
            "Redirect 301: Kalıcı yönlendirme — SEO değerinin %90+ aktarılmasını sağlar",
            "Redirect 302: Geçici yönlendirme — SEO değeri aktarımı belirsizdir",
            "Rich Snippet: Schema markup sayesinde arama sonuçlarında zenginleştirilmiş görünüm (yıldız, fiyat, FAQ vb.)",
            "Robots.txt: Arama motoru botlarına hangi sayfaları tarayıp taramayacaklarını bildiren dosya",
          ],
        },
        {
          heading: "S - Z",
          body: [
            "S'den Z'ye kadar olan SEO terimleri:",
          ],
          tips: [
            "Schema Markup: Arama motorlarının içeriği daha iyi anlaması için eklenen yapısal veri (JSON-LD formatı)",
            "SERP (Search Engine Results Page): Arama motoru sonuç sayfası",
            "Sitemap (XML Sitemap): Sitenin tüm önemli URL'lerini listeleyen ve arama motorlarına sunan dosya",
            "Slug: URL'nin son kısmındaki sayfa tanımlayıcı (örn: /seo-nedir)",
            "SSL: Web sitesi ile kullanıcı arasındaki bağlantıyı şifreleyen güvenlik sertifikası",
            "Thin Content: Az veya değersiz içeriğe sahip sayfalar — Google tarafından olumsuz değerlendirilir",
            "TTFB (Time to First Byte): Sunucunun ilk yanıt verme süresi — sayfa hızı metriği",
            "URL: Bir web sayfasının internet üzerindeki benzersiz adresi",
            "UX (User Experience): Kullanıcı deneyimi — Google'ın sıralama faktörlerinden biri",
            "White Hat SEO: Google kurallarına uygun, etik SEO teknikleri",
            "XML: Veri taşıma ve yapılandırma için kullanılan işaretleme dili (sitemap'lerde kullanılır)",
          ],
        },
      ],
      pdfFileName: "seo-terminoloji-sozlugu.pdf",
    },
  },
};

/* ─── Video Card Component ─── */
function VideoCard({ video }: { video: VideoItem }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-primary/30"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
            <Play size={24} className="ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </p>
      </div>
    </a>
  );
}

/* ─── Content Section Component ─── */
function SectionBlock({ section, index }: { section: ContentSection; index: number }) {
  const id = slugify(section.heading);
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      className="scroll-mt-24"
    >
      {(!section.level || section.level === 2) ? (
        <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
          {section.heading}
        </h2>
      ) : (
        <h3 className="font-heading text-lg font-semibold text-white/90">
          {section.heading}
        </h3>
      )}

      <div className="mt-4 space-y-3">
        {section.body.map((paragraph, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      {section.tips && section.tips.length > 0 && (
        <div className="mt-5 space-y-2">
          {section.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3 border border-border">
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-400" />
              <span className="text-sm text-muted">{tip}</span>
            </div>
          ))}
        </div>
      )}

      {section.warnings && section.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {section.warnings.map((warning, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-amber-400" />
              <span className="text-sm text-amber-200/80">{warning}</span>
            </div>
          ))}
        </div>
      )}

      {section.image && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          <img src={section.image} alt={section.imageAlt || ""} className="w-full" />
        </div>
      )}

      {section.imagePlaceholder && (
        <div className="mt-5 flex aspect-[16/9] max-w-md items-center justify-center rounded-2xl border border-border bg-surface">
          <span className="text-sm font-medium text-muted">{section.imagePlaceholder}</span>
        </div>
      )}
    </motion.section>
  );
}

/* ─── Helpers ─── */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ─── Table of Contents Component ─── */
function TableOfContents({ sections, className = "" }: { sections: ContentSection[]; className?: string }) {
  const h2Sections = sections.filter((s) => !s.level || s.level === 2);
  return (
    <nav className={className}>
      <div className="flex items-center gap-2 mb-4">
        <List size={16} className="text-primary" />
        <span className="text-sm font-bold text-white">İçindekiler</span>
      </div>
      <ul className="space-y-1">
        {h2Sections.map((section) => {
          const id = slugify(section.heading);
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block rounded-lg px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-surface-light hover:text-white"
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ─── AI Banner Component (Vertical/Sidebar) ─── */
function AISidebarBanner() {
  const [q, setQ] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!q.trim() || loading) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      if (!res.ok || !res.body) { setResponse("Hata oluştu."); setLoading(false); return; }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setResponse(result);
      }
    } catch { setResponse("AI yanıt veremedi. Lütfen tekrar deneyin."); }
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 to-surface p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className={loading ? "animate-spin text-primary" : "text-primary"} />
        <span className="text-sm font-bold text-white">AI Asistan</span>
      </div>
      <p className="text-xs text-muted mb-4">
        SEO hakkında aklına takılan bir şey mi var? AI asistanımıza sor.
      </p>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-light px-3 py-2">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Sorunuzu yazın..."
          className="w-full bg-transparent text-xs text-white placeholder-muted/50 outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !q.trim()}
          className="flex-shrink-0 rounded-lg bg-primary p-1.5 text-white transition-all hover:bg-primary-light disabled:opacity-50"
        >
          <Send size={12} />
        </button>
      </div>
      {(response || loading) && (
        <div className="mt-3 max-h-60 overflow-y-auto rounded-xl border border-border bg-surface-light p-3">
          {loading && !response && (
            <p className="text-xs text-muted">AI düşünüyor...</p>
          )}
          {response && (
            <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted">{response}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Tabbed Guide View Component ─── */
function TabbedGuideView({ tabs }: { tabs: GuideTab[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeSections = tabs[activeTab]?.sections || [];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="mb-8 flex gap-2 border-b border-border pb-0">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`rounded-t-lg px-5 py-2.5 text-sm font-medium transition-all ${
              i === activeTab
                ? "border-b-2 border-primary bg-surface text-primary"
                : "text-muted hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Sections */}
      <div className="space-y-12">
        {activeSections.map((section, i) => (
          <SectionBlock key={`${activeTab}-${section.heading}`} section={section} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─── Checklist View Component ─── */
function ChecklistView({ categories }: { categories: ChecklistCategory[] }) {
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white">Denetim Tamamlanma Oranı: %{pct}</span>
          <span className="text-xs text-muted">{checkedCount}/{totalItems} Madde</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-light">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2 className="mb-5 font-heading text-lg font-bold text-white">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, idx) => {
                const key = `${cat.title}-${idx}`;
                const isChecked = !!checked[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    className="flex w-full cursor-pointer items-start gap-3 text-left group"
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        isChecked
                          ? "border-primary bg-primary"
                          : "border-border group-hover:border-primary/50"
                      }`}
                    >
                      {isChecked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-white">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm transition-all ${
                        isChecked ? "text-muted/50 line-through decoration-primary/50" : "text-muted"
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page Component ─── */
export default function GuidePage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const slug = params.slug as string;
  const contentRef = useRef<HTMLDivElement>(null);

  const guide = guides[categorySlug]?.[slug];

  if (!guide) {
    return (
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-white">
            Sayfa Bulunamadı
          </h1>
          <p className="mt-4 text-muted">Bu rehber henüz hazırlanmamış.</p>
          <Link
            href="/seo-toolkit"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light"
          >
            <ArrowLeft size={16} />
            SEO Toolkit&apos;e Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleSavePDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-20">
      <div ref={contentRef} className="mx-auto max-w-7xl px-6 py-16">
        {/* Breadcrumb — full width */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="no-print mb-8 flex flex-wrap items-center gap-2 text-sm text-muted"
        >
          <Link href="/seo-toolkit" className="transition-colors hover:text-primary">
            SEO Toolkit
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/seo-toolkit/${guide.categorySlug}`}
            className="transition-colors hover:text-primary"
          >
            {guide.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-white">{guide.title}</span>
        </motion.div>

        {/* ── Two Column Grid ── */}
        <div className="gap-12 lg:grid lg:grid-cols-[1fr_280px]">

          {/* ── Left Column ── */}
          <div className="min-w-0">
            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="no-print mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <BookOpen size={12} />
                Rehber
              </div>
              <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-4 text-lg text-muted">{guide.subtitle}</p>
            </motion.div>

            {/* Videos */}
            {guide.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="no-print mt-12"
              >
                <h2 className="mb-6 flex items-center gap-2 font-heading text-lg font-bold text-white">
                  <Play size={18} className="text-red-500" />
                  Video Rehberler
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {guide.videos.map((video) => (
                    <VideoCard key={video.youtubeId} video={video} />
                  ))}
                </div>
              </motion.div>
            )}

            {guide.type === "checklist" && guide.checklist ? (
              /* ── Checklist Layout ── */
              <div className="mt-12">
                <ChecklistView categories={guide.checklist} />
              </div>
            ) : guide.type === "tabbed" && guide.tabs ? (
              /* ── Tabbed Guide Layout ── */
              <div className="mt-12">
                <TabbedGuideView tabs={guide.tabs} />
              </div>
            ) : (
              <>
                {/* Mobile TOC — visible only on mobile, before first section */}
                <div className="mt-12 mb-10 lg:hidden">
                  <TableOfContents
                    sections={guide.sections}
                    className="rounded-2xl border border-border bg-surface p-5"
                  />
                </div>

                {/* Content Sections */}
                <div className="mt-16 space-y-12 lg:mt-16">
                  {guide.sections.map((section, i) => (
                    <SectionBlock key={section.heading} section={section} index={i} />
                  ))}
                </div>
              </>
            )}

            {/* Save as PDF — only for guide pages */}
            {guide.type !== "checklist" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="no-print mt-16 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-surface p-8 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb size={24} className="text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-white">
                  Rehberi Kaydet!
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Bu kılavuzu PDF olarak kaydederek istediğiniz zaman çevrimdışı erişebilirsiniz.
                </p>
                <button
                  onClick={handleSavePDF}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                >
                  <Download size={16} />
                  Kaydet veya Yazdır
                </button>
              </motion.div>
            )}

            {/* Back links */}
            <div className="no-print mt-12 flex flex-wrap gap-4">
              <Link
                href={`/seo-toolkit/${guide.categorySlug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                <ArrowLeft size={16} />
                {guide.category}
              </Link>
              <Link
                href="/seo-toolkit"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                <ArrowLeft size={16} />
                Tüm Araçlara Dön
              </Link>
            </div>
          </div>

          {/* ── Right: Sticky Sidebar ── */}
          <aside className="no-print hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents — only for guide pages with sections */}
              {guide.sections.length > 0 && guide.type !== "checklist" && (
                <TableOfContents
                  sections={guide.sections}
                  className="rounded-2xl border border-border bg-surface p-5"
                />
              )}

              {/* AI Banner */}
              <AISidebarBanner />
            </div>
          </aside>

        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, footer, nav, .no-print, aside,
          #tidio-chat, .tidio-chat, [id*="tidio"],
          #crisp-chatbox, [class*="crisp"],
          .intercom-lightweight-app, #intercom-container,
          [class*="chat-widget"], [id*="chat-widget"],
          iframe[src*="chat"], .fb_dialog {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .min-h-screen {
            min-height: auto !important;
          }
          .pt-20, .pt-16 {
            padding-top: 0 !important;
          }
          .pb-16 {
            padding-bottom: 0 !important;
          }
          .lg\\:grid-cols-\\[1fr_280px\\] {
            grid-template-columns: 1fr !important;
          }
          h1 {
            color: black !important;
            font-size: 24pt !important;
          }
          h2 {
            color: black !important;
            font-size: 16pt !important;
            page-break-after: avoid;
            margin-top: 1.2rem !important;
          }
          h3 {
            color: black !important;
            page-break-after: avoid;
          }
          p, span, li {
            color: #333 !important;
          }
          section {
            page-break-inside: avoid;
          }
          .space-y-12 > * + * {
            margin-top: 1.2rem !important;
          }
          .space-y-2 > * {
            page-break-inside: avoid;
          }
          .rounded-xl, .rounded-2xl {
            border-radius: 4px !important;
            page-break-inside: avoid;
          }
          .scroll-mt-24 {
            scroll-margin-top: 0 !important;
            page-break-inside: avoid;
          }
          [class*="border"] {
            border-color: #ddd !important;
          }
          [class*="bg-surface"], [class*="bg-amber"], [class*="bg-emerald"] {
            background: #f5f5f5 !important;
          }
          [class*="text-emerald"] {
            color: #166534 !important;
          }
          [class*="text-amber"] {
            color: #92400e !important;
          }
          a {
            color: #1a73e8 !important;
          }
          @page {
            margin: 1.5cm 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}
