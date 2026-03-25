"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Headphones, ArrowRight, Music2, Radio } from "lucide-react";

export default function PodcastBanner() {
  return (
    <section id="podcast" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[#1DB954]/20"
          style={{
            background: "linear-gradient(135deg, #0c1029 0%, #0a1a0f 40%, #0c1029 100%)",
            boxShadow: "0 0 60px rgba(29, 185, 84, 0.08), 0 0 120px rgba(29, 185, 84, 0.04)",
          }}
        >
          {/* Spotify green glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1DB954]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-16 left-20 h-52 w-52 rounded-full bg-[#1DB954]/5 blur-[80px]" />

          {/* Decorative sound waves */}
          <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03]">
            <Music2 size={300} strokeWidth={0.5} />
          </div>

          <div className="relative flex flex-col items-center gap-10 p-10 md:flex-row md:p-16">
            {/* Podcast artwork */}
            <div className="relative flex-shrink-0">
              <Image
                src="/dijital-bir-pazarlama.jpg"
                alt="Dijital Bir Pazarlama Podcast"
                width={220}
                height={220}
                className="rounded-2xl border border-[#1DB954]/30 shadow-[0_0_40px_rgba(29,185,84,0.15)] object-cover"
              />
              {/* Floating music note */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] shadow-[0_0_20px_rgba(29,185,84,0.4)]"
              >
                <Radio size={18} className="text-black" />
              </motion.div>
            </div>

            {/* Text content */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1DB954]/30 bg-[#1DB954]/10 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1DB954]" />
                </span>
                <span className="text-xs font-semibold text-[#1DB954]">Spotify&apos;da Yayında</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Dijital Bir Pazarlama
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                Her hafta dijital pazarlama dünyasından güncel konuları,
                stratejileri ve sektör trendlerini konuşuyorum. SEO&apos;dan sosyal
                medyaya, içerik pazarlamasından reklam yönetimine kadar her şey
                bu podcast&apos;te.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
                <a
                  href="https://open.spotify.com/episode/5495k9jdyOw5NZ2V8Qc3fM?si=bVMIkdNmRiGrY2u_KntfYg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full bg-[#1DB954] px-8 py-4 text-sm font-bold text-black transition-all hover:bg-[#1ed760] hover:shadow-[0_0_30px_rgba(29,185,84,0.4)]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Spotify&apos;da Dinle
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://open.spotify.com/episode/5495k9jdyOw5NZ2V8Qc3fM?si=bVMIkdNmRiGrY2u_KntfYg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-[#1DB954]/30 px-6 py-4 text-sm font-medium text-[#1DB954] transition-all hover:bg-[#1DB954]/10"
                >
                  <Headphones size={16} />
                  Tüm Bölümler
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
