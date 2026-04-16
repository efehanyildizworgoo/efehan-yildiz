"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, User, Lock, Mail } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [msg, setMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name);
          setEmail(data.user.email);
        }
        setLoading(false);
      });
  }, []);

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    setSaving(false);
    setMsg(data.error || "Profil güncellendi.");
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg("");
    if (newPassword !== confirmPassword) {
      setPwMsg("Şifreler eşleşmiyor.");
      return;
    }
    setSavingPw(true);
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setSavingPw(false);
    if (data.error) {
      setPwMsg(data.error);
    } else {
      setPwMsg("Şifre başarıyla güncellendi.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-bold text-white">Profil</h1>
      <p className="mb-8 text-sm text-[#7a82a6]">Hesap bilgilerinizi ve şifrenizi yönetin</p>

      {/* Profile Info */}
      <form onSubmit={handleProfile} className="mb-8 rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
            <User size={18} className="text-[#1d47f0]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Profil Bilgileri</h2>
            <p className="text-xs text-[#7a82a6]">Ad ve e-posta bilgileriniz</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Ad Soyad</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">E-posta</label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a82a6]/40" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] py-3 pl-9 pr-4 text-sm text-white outline-none focus:border-[#1d47f0]" />
          </div>
        </div>

        {msg && <p className={`mb-4 text-sm ${msg.includes("hata") || msg.includes("error") ? "text-red-400" : "text-emerald-400"}`}>{msg}</p>}

        <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Kaydet
        </button>
      </form>

      {/* Password */}
      <form onSubmit={handlePassword} className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
            <Lock size={18} className="text-[#1d47f0]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Şifre Değiştir</h2>
            <p className="text-xs text-[#7a82a6]">Hesap şifrenizi güncelleyin</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Mevcut Şifre</label>
          <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" required className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Yeni Şifre</label>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" required minLength={6} className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Yeni Şifre (Tekrar)</label>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required minLength={6} className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
        </div>

        {pwMsg && <p className={`mb-4 text-sm ${pwMsg.includes("hata") || pwMsg.includes("Hatalı") || pwMsg.includes("eşleşmiyor") ? "text-red-400" : "text-emerald-400"}`}>{pwMsg}</p>}

        <button type="submit" disabled={savingPw} className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
          {savingPw ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
}
