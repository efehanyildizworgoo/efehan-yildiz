"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Eğitimler", href: "/egitimler" },
  { label: "Blog", href: "/blog" },
  { label: "SEO Toolkit", href: "/seo-toolkit" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Efehan Yıldız"
              width={180}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/iletisim"
            className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(29,71,240,0.4)] md:block"
          >
            İletişime Geçin
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white md:hidden"
            aria-label="Menü"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu — OUTSIDE header to avoid backdrop-blur stacking context */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: mobileOpen ? "auto" : "none",
          visibility: mobileOpen ? "visible" : "hidden",
        }}
        className="md:hidden"
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: mobileOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Panel — slides from right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#060918",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "80px",
              padding: "0 24px",
              borderBottom: "1px solid rgba(29, 71, 240, 0.15)",
            }}
          >
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image src="/logo.svg" alt="Efehan Yıldız" width={140} height={32} />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Kapat"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "1px solid rgba(29, 71, 240, 0.15)",
                color: "#7a82a6",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "16px 8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#e8eaf0",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(29, 71, 240, 0.15)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div style={{ padding: "24px", borderTop: "1px solid rgba(29, 71, 240, 0.15)" }}>
            <Link
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "14px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#1d47f0",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
