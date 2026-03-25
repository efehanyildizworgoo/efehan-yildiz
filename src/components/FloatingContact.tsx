"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end no-print">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="bg-primary p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20">
                  <Image
                    src="/ey-giris.png"
                    alt="Efehan Yıldız"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Efehan Yıldız</p>
                  <p className="text-xs text-white/70">
                    SEO & Dijital Pazarlama Uzmanı
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-sm leading-relaxed text-muted">
                Merhaba! Markanızı büyütmek, SEO sürecinize destek almak veya
                eğitimler hakkında bilgi edinmek ister misiniz? Hemen iletişime
                geçelim.
              </p>
              <a
                href="https://wa.me/905527328055"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light"
              >
                İletişime Geç
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_20px_rgba(29,71,240,0.4)] transition-all hover:bg-primary-light hover:shadow-[0_4px_30px_rgba(29,71,240,0.6)]"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
