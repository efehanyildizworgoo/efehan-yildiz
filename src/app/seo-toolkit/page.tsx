"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Search,
  Code2,
  FileText,
  MapPin,
  Link2,
  Cpu,
  Globe,
  BookOpen,
  Sparkles,
  ArrowRight,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { useState, useRef } from "react";

const categories = [
  {
    icon: BarChart3,
    title: "Analiz & Ölçüm Araçları",
    description: "SEO, GA4, GTM ve site denetim araçları ile sitenizin performansını ölçün. Rehberler ve kapsamlı kaynaklar eşliğinde veriye dayalı kararlar alın.",
    href: "/seo-toolkit/analiz-olcum",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Search,
    title: "Anahtar Kelime Araçları",
    description: "Anahtar kelime araştırma, SERP analizi ve arama hacmi araçlarıyla doğru kelimeleri hedefleyin. Rakip analizi ve fırsat tespiti yapın.",
    href: "/seo-toolkit/anahtar-kelime",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Code2,
    title: "Teknik SEO Araçları",
    description: "Robots.txt, sitemap, schema ve sayfa hızı gibi teknik SEO araçlarıyla sitenizin altyapısını güçlendirin ve taranabilirliğini artırın.",
    href: "/seo-toolkit/teknik-seo",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    icon: FileText,
    title: "İçerik & Meta Araçları",
    description: "Meta başlık ve açıklama optimizasyonu, SERP önizleme ve SEO uyumlu içerik yazım araçlarıyla organik tıklama oranınızı yükseltin.",
    href: "/seo-toolkit/icerik-meta",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    icon: MapPin,
    title: "Local SEO & Schema Araçları",
    description: "Google Business Profile optimizasyonu, yerel arama listeleri ve FAQ/How-to schema oluşturma araçlarıyla yerel görünürlüğünüzü artırın.",
    href: "/seo-toolkit/local-seo",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
  {
    icon: Link2,
    title: "Backlink & Off-Page SEO",
    description: "Backlink analiz araçları, Google Disavow rehberi ve sosyal sinyal stratejileriyle sitenizin otorite puanını yükseltin.",
    href: "/seo-toolkit/backlink",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    icon: Cpu,
    title: "SEO Otomasyon ve Script'ler",
    description: "ChatGPT promptları, Python scriptleri ve Google Sheets araçlarıyla SEO süreçlerinizi otomatikleştirin ve zamandan tasarruf edin.",
    href: "/seo-toolkit/otomasyon",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
  {
    icon: Globe,
    title: "WordPress SEO Araçları",
    description: "Yoast vs Rank Math karşılaştırması, functions.php snippet arşivi, schema eklentileri ve WordPress güvenlik rehberleriyle sitenizi optimize edin.",
    href: "/seo-toolkit/wordpress-seo",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
  {
    icon: BookOpen,
    title: "Kaynaklar & Rehberler",
    description: "En iyi SEO blogları, Google başlangıç rehberi, terminoloji sözlüğü ve indirilebilir e-kitaplarla SEO bilginizi sürekli güncel tutun.",
    href: "/seo-toolkit/kaynaklar",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Sparkles,
    title: "Mini SEO Uygulamaları",
    description: "SERP önizleme, AI meta etiket oluşturucu, robots.txt/sitemap generator ve daha fazlası — tüm mini SEO araçları tek bir sayfada.",
    href: "/seo-toolkit/mini-uygulamalar",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
  },
];

const partners = [
  { name: "worgoo", src: "/sponsors/worgoo-logo-beyaz.svg", width: 100 },
  { name: "seo egitimi", src: "/sponsors/seo-egitimi.svg", width: 110 },
  { name: "netgsm", src: "/sponsors/netgsm.svg", width: 90 },
  { name: "sk marka", src: "/sponsors/sk-marka.svg", width: 100 },
  { name: "ideasoft", src: "/sponsors/ideasoft.svg", width: 100 },
];

export default function SeoToolkitPage() {
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAskAI = async () => {
    const q = query.trim();
    if (!q || isLoading) return;
    setIsLoading(true);
    setShowResponse(true);
    setAiResponse("");
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      if (!res.ok) throw new Error("API error");
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader");
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setAiResponse(fullText);
      }
    } catch {
      setAiResponse("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              SEO Sürecini{" "}
              <span className="text-primary">Hızlandır</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              İhtiyacın olan tüm analiz araçları, rehberler ve yapay zeka asistanı tek bir
              platformda.
            </p>
          </motion.div>

          {/* AI Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface p-2">
              <div className="flex flex-1 items-center gap-3 px-4">
                <Sparkles size={18} className="flex-shrink-0 text-primary" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                  placeholder="SEO ile ilgili neye ihtiyacın var? (Örn: Meta description yaz, site hızı...)"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder-muted/50 outline-none"
                />
              </div>
              <button
                onClick={handleAskAI}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(29,71,240,0.4)] disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                Sor
              </button>
            </div>

            {/* AI Response */}
            <AnimatePresence>
              {showResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">AI Asistan</span>
                    </div>
                    <button
                      onClick={() => { setShowResponse(false); setAiResponse(""); }}
                      className="text-muted transition-colors hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="px-5 py-4">
                    {isLoading && !aiResponse ? (
                      <div className="flex items-center gap-3">
                        <Loader2 size={16} className="animate-spin text-primary" />
                        <span className="text-sm text-muted">Düşünüyorum...</span>
                      </div>
                    ) : (() => {
                      const linkRegex = /\[\[link:(\/[^\]|]+)\|([^\]]+)\]\]/g;
                      const links: { href: string; label: string }[] = [];
                      let cleanText = aiResponse;
                      let match;
                      while ((match = linkRegex.exec(aiResponse)) !== null) {
                        links.push({ href: match[1], label: match[2] });
                      }
                      cleanText = cleanText.replace(linkRegex, "").trimEnd();

                      return (
                        <>
                          <div className="prose prose-sm prose-invert max-w-none text-sm leading-relaxed text-muted">
                            {cleanText.split("\n").map((line, i) => (
                              <p key={i} className={line ? "mb-2" : "mb-1"}>{line || "\u00A0"}</p>
                            ))}
                            {isLoading && <span className="inline-block h-4 w-1.5 animate-pulse bg-primary" />}
                          </div>
                          {links.length > 0 && !isLoading && (
                            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                              <span className="mr-1 text-xs text-muted/60">İlgili araçlar:</span>
                              {links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/10"
                                >
                                  <ArrowRight size={12} />
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-y border-border bg-surface py-8">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted/60">
            Güvenilir Partnerler & Sponsorlar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {partners.map((p) => (
              <Image
                key={p.name}
                src={p.src}
                alt={p.name}
                width={p.width}
                height={30}
                unoptimized
                className="opacity-30 transition-opacity hover:opacity-60"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={cat.href}
                  className="gradient-border group flex flex-col rounded-2xl bg-surface p-6 transition-all hover:bg-surface-light hover:shadow-[0_10px_40px_rgba(29,71,240,0.08)]"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.bgColor}`}>
                    <cat.icon size={22} className={cat.color} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {cat.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-muted">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5">
                    Keşfet <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
