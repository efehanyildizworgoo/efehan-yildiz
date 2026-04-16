"use client";

import { useEffect, useState } from "react";
import { Plus, GraduationCap, Pencil, Trash2, Loader2, Clock, DollarSign } from "lucide-react";

interface Training {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  price: string | null;
  duration: string | null;
  status: string;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", price: "", duration: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchTrainings() {
    const res = await fetch("/api/admin/trainings");
    const data = await res.json();
    setTrainings(data.trainings || []);
    setLoading(false);
  }

  useEffect(() => { fetchTrainings(); }, []);

  function handleTitleChange(val: string) {
    setForm((f) => ({
      ...f,
      title: val,
      slug: val.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
    }));
  }

  function openEdit(t: Training) {
    setEditId(t.id);
    setForm({ title: t.title, slug: t.slug, description: t.description || "", price: t.price || "", duration: t.duration || "" });
    setShowCreate(true);
  }

  function openCreate() {
    setEditId(null);
    setForm({ title: "", slug: "", description: "", price: "", duration: "" });
    setShowCreate(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const url = editId ? `/api/admin/trainings/${editId}` : "/api/admin/trainings";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setSaving(false); return; }
    setShowCreate(false); setSaving(false);
    fetchTrainings();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu eğitimi silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/trainings/${id}`, { method: "DELETE" });
    fetchTrainings();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Eğitimler</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">Online eğitimlerinizi yönetin</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7]">
          <Plus size={16} /> Yeni Eğitim
        </button>
      </div>

      {/* Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[#0c1029] p-8">
            <h2 className="mb-6 text-lg font-bold text-white">{editId ? "Eğitim Düzenle" : "Yeni Eğitim"}</h2>
            {error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Eğitim Adı</label>
                <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Slug</label>
                <div className="flex items-center rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]">
                  <span className="pl-4 text-xs text-[#7a82a6]">/egitimler/</span>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Açıklama</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Fiyat (₺)</label>
                  <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="2500" className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Süre</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="12 Saat" className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setShowCreate(false)} className="flex-1 rounded-xl border border-[rgba(29,71,240,0.15)] py-2.5 text-sm font-medium text-[#7a82a6] hover:text-white">İptal</button>
              <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1d47f0] py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : editId ? "Güncelle" : "Oluştur"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>
      ) : trainings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] py-20">
          <GraduationCap size={40} className="mb-4 text-[#7a82a6]/30" />
          <p className="text-sm font-medium text-[#7a82a6]">Henüz eğitim eklenmedi</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trainings.map((t) => (
            <div key={t.id} className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-5 transition-all hover:border-[rgba(29,71,240,0.3)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
                  <GraduationCap size={18} className="text-[#1d47f0]" />
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${t.status === "published" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"}`}>
                  {t.status === "published" ? "Yayında" : "Taslak"}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{t.title}</h3>
              {t.description && <p className="mt-1 text-xs text-[#7a82a6] line-clamp-2">{t.description}</p>}
              <div className="mt-3 flex gap-3">
                {t.price && <span className="flex items-center gap-1 text-xs text-[#7a82a6]"><DollarSign size={11} />{t.price} ₺</span>}
                {t.duration && <span className="flex items-center gap-1 text-xs text-[#7a82a6]"><Clock size={11} />{t.duration}</span>}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(t)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[rgba(29,71,240,0.15)] py-2 text-xs font-medium text-[#7a82a6] hover:border-[#1d47f0]/30 hover:text-[#1d47f0]">
                  <Pencil size={12} /> Düzenle
                </button>
                <button onClick={() => handleDelete(t.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] hover:border-red-500/30 hover:text-red-400">
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
