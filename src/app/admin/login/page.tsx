"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Giriş başarısız");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Sunucu hatası");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060918] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image src="/logo.svg" alt="Efehan Yıldız" width={160} height={36} />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[rgba(29,71,240,0.1)]">
              <Lock size={24} className="text-[#1d47f0]" />
            </div>
            <h1 className="text-xl font-bold text-white">Yönetim Paneli</h1>
            <p className="mt-1 text-sm text-[#7a82a6]">
              Devam etmek için giriş yapın
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">
                E-posta
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a82a6]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] py-3 pl-11 pr-4 text-sm text-white placeholder-[#7a82a6]/50 outline-none transition-colors focus:border-[#1d47f0]"
                  placeholder="admin@efehanyildiz.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">
                Şifre
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a82a6]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] py-3 pl-11 pr-11 text-sm text-white placeholder-[#7a82a6]/50 outline-none transition-colors focus:border-[#1d47f0]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a82a6] transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d47f0] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#3b63f7] hover:shadow-[0_0_30px_rgba(29,71,240,0.4)] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#7a82a6]/50">
          © {new Date().getFullYear()} Efehan Yıldız — Admin Panel
        </p>
      </div>
    </div>
  );
}
