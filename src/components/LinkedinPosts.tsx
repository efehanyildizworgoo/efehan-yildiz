"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle, Repeat2, Send, ExternalLink } from "lucide-react";

const posts = [
  {
    content:
      "Herkese selamlar 👋\n\nUzun zamandır aktif olamadım. Bunun için öncelikle özür dilerim. Ancak buradaki paylaşımlarımın kara düzen olmamasını tercih ettim.\n\nArtık düzenli paylaşım dönemine tekrardan giriş yapıyorum 🚀 Planlı, her yerde bulabileceğiniz gerçekten özgün içeriklerle burayı yönetmek istediğimden biraz mola verdim.\n\nYarından itibaren düzenli olarak paylaşım yapmaya başlayacağım. SEO, AI, Dijital Pazarlama, Web Tasarım ve WordPress konuları üzerinden paylaşımlar yapacağım.\n\nEkstra olarak bir podcast serisine başlıyorum. İsmi \"Dijital Bir Pazarlama\" olacak. Her hafta cuma günleri bölümleri YouTube ve Spotify üzerinden yayınlanacak. Yaklaşık 10 bölüm sürecek.\n\nDijitali birlikte daha iyi bir yer yapalım 💪",
    likes: 13,
    comments: 0,
    link: "https://www.linkedin.com/posts/efehan-yildiz_herkese-selamlar-uzun-zamand%C4%B1r-aktif-activity-7434874973116112896-1hpo",
    timeAgo: "5g",
  },
  {
    content:
      "Dün Psikolojide Yeni Çağ etkinliğinde Tank Emir & Emir Karaman ile birlikte psikolog ve sağlık sektöründe olanların dijitaldeki mağduriyeti, kısıtlamaları ve dijital stratejilerle alakalı konuştuk!\n\nGayet verimli ve faydalı bir etkinlik oldu bizler için. Umarız bizi dinleyenlere de aynı şekilde olmuştur.\n\nBu etkinliği düzenledikleri için Hasan Aker ve ekibine teşekkürlerimi ve tebriklerimi sunuyorum.\n\nTekrarında görüşmek üzere!",
    likes: 17,
    comments: 0,
    link: "https://www.linkedin.com/posts/efehan-yildiz_d%C3%BCn-psikolojide-yeni-%C3%A7a%C4%9F-etkinli%C4%9Finde-tar%C4%B1k-activity-7420007561506160640-uzwM",
    timeAgo: "1ay",
  },
  {
    content:
      "WordPress'te llms.txt ve llms-full.txt konusu hâlâ adam akıllı çözülmüş değil.\n\nMevcut eklentilerin biri llms.txt üretiyor ama llms-full.txt yok.\n\nDiğeri llms-full.txt üretiyor ama kategori, etiket, e-ticaret ve ilan yapıları tamamen dışarıda kalıyor.\n\nSonuç?\n\nÖzellikle e-ticaret ve ilan siteleri için yarım yamalak, anlamsız bir çıktı.\n\nBen de bu saçmalığı kabullenme yerine, yapay zeka desteğiyle kendi mini WordPress eklentimi yazdım.\n\nllms.txt\nllms-full.txt\nKategori & etiket yapıları\nE-ticaret / ilan sayfaları dahil\n\nEklentiyi ücretsiz paylaşacağım.",
    likes: 17,
    comments: 4,
    link: "https://www.linkedin.com/posts/efehan-yildiz_wordpresste-llmstxt-ve-llms-fulltxt-konusu-activity-7417889317777408000-Kxfw",
    timeAgo: "1ay",
  },
];

export default function LinkedinPosts() {
  return (
    <section className="relative bg-surface py-12 md:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#0077B5]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            LinkedIn Paylaşımları
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Dijital pazarlama dünyasından güncel düşünceler, stratejiler ve sektörel içgörüler.
          </p>
        </motion.div>

        <div className="grid items-start gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group flex flex-col rounded-2xl border border-border bg-surface-light transition-all hover:border-[#0077B5]/30 hover:shadow-[0_10px_40px_rgba(0,119,181,0.08)]"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-5 pb-0">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#0077B5]/30">
                  <Image
                    src="/ey-giris.png"
                    alt="Efehan Yıldız"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">Efehan Yıldız</p>
                  <p className="truncate text-xs text-muted">
                    Founder @ Worgoo | WordPress & SEO
                  </p>
                  <p className="text-[11px] text-muted/60">{post.timeAgo}</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <p className="whitespace-pre-line text-[13px] leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
                  {post.content.length > 280
                    ? post.content.slice(0, 280) + "..."
                    : post.content}
                </p>
                {post.content.length > 280 && (
                  <span className="mt-1 inline-block text-xs font-medium text-[#0077B5]">
                    devamını oku
                  </span>
                )}
              </div>

              {/* Engagement */}
              <div className="mx-5 border-t border-border" />
              <div className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#0077B5] text-[9px] text-white">👍</span>
                  <span className="text-xs text-muted">{post.likes}</span>
                </div>
                {post.comments > 0 && (
                  <span className="text-xs text-muted">{post.comments} yorum</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-around border-t border-border px-2 py-2">
                {[
                  { icon: ThumbsUp, label: "Beğen" },
                  { icon: MessageCircle, label: "Yorum" },
                  { icon: Repeat2, label: "Paylaş" },
                  { icon: Send, label: "Gönder" },
                ].map((action) => (
                  <span
                    key={action.label}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted transition-colors group-hover:hover:text-white"
                  >
                    <action.icon size={14} />
                    <span className="hidden sm:inline">{action.label}</span>
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.linkedin.com/in/efehan-yildiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#0077B5]/30 bg-[#0077B5]/10 px-6 py-3 text-sm font-semibold text-[#0077B5] transition-all hover:bg-[#0077B5]/20"
          >
            LinkedIn Profilimi Ziyaret Edin
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
