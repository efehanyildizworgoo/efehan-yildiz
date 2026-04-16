"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Briefcase, Pencil, Trash2, Loader2 } from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug: string;
  status: string;
  updatedAt: string;
}

export default function ServicesListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function fetchServices() {
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(data.services || []);
    setLoading(false);
  }

  useEffect(() => { fetchServices(); }, []);

  function handleTitleChange(val: string) {
    setNewTitle(val);
    setNewSlug(val.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true); setError("");
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, slug: newSlug }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setCreating(false); return; }
    setShowCreate(false); setNewTitle(""); setNewSlug(""); setCreating(false);
    fetchServices();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    fetchServices();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hizmetler</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">Hizmet sayfalarınızı Page Builder ile düzenleyin</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7]">
          <Plus size={16} /> Yeni Hizmet
        </button>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreate} className="w-full max-w-md rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[#0c1029] p-8">
            <h2 className="mb-6 text-lg font-bold text-white">Yeni Hizmet</h2>
            {error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Hizmet Adı</label>
              <input value={newTitle} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" placeholder="Örn: SEO Danışmanlığı" />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Slug</label>
              <div className="flex items-center rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]">
                <span className="pl-4 text-xs text-[#7a82a6]">/hizmetler/</span>
                <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} required className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setShowCreate(false); setError(""); }} className="flex-1 rounded-xl border border-[rgba(29,71,240,0.15)] py-2.5 text-sm font-medium text-[#7a82a6] hover:text-white">İptal</button>
              <button type="submit" disabled={creating} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1d47f0] py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
                {creating ? <Loader2 size={14} className="animate-spin" /> : "Oluştur"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] py-20">
          <Briefcase size={40} className="mb-4 text-[#7a82a6]/30" />
          <p className="text-sm font-medium text-[#7a82a6]">Henüz hizmet eklenmedi</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-5 transition-all hover:border-[rgba(29,71,240,0.3)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
                  <Briefcase size={18} className="text-[#1d47f0]" />
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${s.status === "published" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"}`}>
                  {s.status === "published" ? "Yayında" : "Taslak"}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{s.title}</h3>
              <p className="mt-1 text-xs text-[#7a82a6]">/hizmetler/{s.slug}</p>
              <div className="mt-4 flex gap-2">
                <Link href={`/admin/services/${s.id}/edit`} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[rgba(29,71,240,0.15)] py-2 text-xs font-medium text-[#7a82a6] hover:border-[#1d47f0]/30 hover:text-[#1d47f0]">
                  <Pencil size={12} /> Düzenle
                </Link>
                <button onClick={() => handleDelete(s.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] hover:border-red-500/30 hover:text-red-400">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
