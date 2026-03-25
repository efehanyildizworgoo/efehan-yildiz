"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { useState, useMemo } from "react";

const categories = [
  "Tümü",
  "SEO",
  "WordPress",
  "Dijital Pazarlama",
  "E-Ticaret",
  "Web Tasarım",
  "Yapay Zeka",
];

const posts: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}[] = [];

const categoryColors: Record<string, string> = {
  SEO: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  WordPress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Dijital Pazarlama": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "E-Ticaret": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Web Tasarım": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Yapay Zeka": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "Tümü" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Blog
            </p>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Dijital Dünyadan{" "}
              <span className="text-primary">İçerikler</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-muted">
              SEO, WordPress, dijital pazarlama ve web tasarım alanlarında güncel
              rehberler, stratejiler ve pratik ipuçları.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-all hover:border-primary/30 hover:shadow-[0_10px_40px_rgba(29,71,240,0.08)]"
                >
                  <div className="relative h-56 bg-gradient-to-br from-primary/20 to-surface-light">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                          categoryColors[post.category] || ""
                        }`}
                      >
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <span className="text-xs text-primary">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Filter + All Posts */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Blog yazılarında ara..."
                className="w-full rounded-xl border border-border bg-surface-light py-3 pl-11 pr-4 text-sm text-white placeholder-muted/50 outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted hover:border-primary/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-light transition-all hover:border-primary/30"
                >
                  <div className="relative h-40 bg-gradient-to-br from-surface-light to-surface">
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                          categoryColors[post.category] || ""
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold text-white transition-colors group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-1 text-[11px] text-muted">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary transition-transform group-hover:translate-x-1">
                        Oku
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-white">
                Blog yazıları çok yakında burada!
              </p>
              <p className="mt-2 text-sm text-muted">
                SEO, dijital pazarlama ve web teknolojileri hakkında kapsamlı yazılar hazırlanıyor.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
