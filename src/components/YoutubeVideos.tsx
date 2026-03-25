"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

const videos = [
  {
    title: "Ahrefs ile SEO Rakip Analizi Nasıl Yapılır?",
    videoId: "uj5vBIIV_aA",
  },
  {
    title: "Floating Elements Kullanımı — WordPress Rehberi",
    videoId: "JO1BkHnw0t4",
  },
  {
    title: "Google Search Console Kullanım Rehberi",
    videoId: "k7Jjet9hups",
  },
  {
    title: "Google Trends ile Anahtar Kelime Araştırması",
    videoId: "4sXfo1lD_7Q",
  },
];

export default function YoutubeVideos() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            YouTube Videoları
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Dijital pazarlama dünyasından güncel bilgiler, eğitim serileri ve pratik ipuçları.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Featured */}
          <motion.a
            href={`https://www.youtube.com/watch?v=${videos[0].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-border group overflow-hidden rounded-2xl bg-surface transition-all hover:bg-surface-light lg:col-span-3"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${videos[0].videoId}/maxresdefault.jpg`}
                alt={videos[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-transform group-hover:scale-110">
                  <Play size={28} fill="white" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                {videos[0].title}
              </h3>
            </div>
          </motion.a>

          {/* Side list */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {videos.slice(1).map((video, i) => (
              <motion.a
                key={video.videoId}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gradient-border group flex gap-4 rounded-2xl bg-surface p-3 transition-all hover:bg-surface-light"
              >
                <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/90 text-white transition-transform group-hover:scale-110">
                      <Play size={14} fill="white" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </motion.a>
            ))}

            <a
              href="https://www.youtube.com/@efehanyildizcom"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-4 text-sm font-semibold text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10"
            >
              Tüm Videoları İzle
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
