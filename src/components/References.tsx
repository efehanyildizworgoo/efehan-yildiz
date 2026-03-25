"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const references = [
  { name: "SK Hukuk", logo: "/refs/sk-hukuk.png" },
  { name: "Leto", logo: "/refs/worgoo-ref-leto-1.svg" },
  { name: "2K", logo: "/refs/worgoo-ref-2k.svg" },
  { name: "NetGSM", logo: "/refs/netgsm.svg" },
  { name: "Cengiz Açıkel", logo: "/refs/worgoo-ref-cengiz-acikel-1.svg" },
  { name: "Homcap", logo: "/refs/homcap.png" },
  { name: "Türkticaret.net", logo: "/refs/turkticaret-net-ref-1.png" },
  { name: "Heqa", logo: "/refs/heqa-ref-1.png" },
  { name: "Hosting.com.tr", logo: "/refs/hosting-com-tr-ref-1.png" },
];

const VISIBLE = 5;

export default function References() {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, references.length - VISIBLE);

  const next = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Referanslar
          </p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Referans Firmalar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Birlikte çalıştığım ve dijital dünyada büyümelerine katkı sağladığım markalar.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-primary hover:text-white md:-left-5 md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-primary hover:text-white md:-right-5 md:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel track — touch/drag scrollable */}
          <div
            className="scrollbar-hide flex gap-4 overflow-x-auto px-1 snap-x snap-mandatory md:gap-5"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
          >
            {references.map((ref) => (
              <div
                key={ref.name}
                className="w-[calc(50%-8px)] flex-shrink-0 snap-start md:w-[calc((100%-80px)/5)]"
              >
                <div className="flex h-20 items-center justify-center rounded-2xl bg-white p-4 transition-all hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] md:h-24 md:p-5">
                  <Image
                    src={ref.logo}
                    alt={ref.name}
                    width={140}
                    height={56}
                    className="h-auto max-h-10 w-auto object-contain md:max-h-12"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted/30 hover:bg-muted/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
