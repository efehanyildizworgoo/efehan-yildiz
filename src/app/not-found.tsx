import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya aşağıdaki bağlantıları kullanın.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface-light">
          <Search size={32} className="text-primary" />
        </div>
        <h1 className="font-heading text-6xl font-bold text-white">404</h1>
        <p className="mt-4 text-lg text-muted">
          Aradığınız sayfa bulunamadı veya taşınmış olabilir.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            <ArrowLeft size={16} />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/seo-toolkit"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-primary/30"
          >
            SEO Toolkit
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-primary/30"
          >
            İletişim
          </Link>
        </div>
      </div>
    </div>
  );
}
