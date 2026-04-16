"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Layers, Pencil, Trash2, Loader2, Globe, FileText } from "lucide-react";

interface Page {
  id: number;
  title: string;
  slug: string;
  status: string;
  updatedAt: string;
}

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function fetchPages() {
    const res = await fetch("/api/admin/pages");
    const data = await res.json();
    setPages(data.pages || []);
    setLoading(false);
  }

  useEffect(() => { fetchPages(); }, []);

  function handleTitleChange(val: string) {
    setNewTitle(val);
    setNewSlug(
      val
        .toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const res = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, slug: newSlug }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setCreating(false); return; }
    setShowCreate(false);
    setNewTitle("");
    setNewSlug("");
    setCreating(false);
    fetchPages();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu sayfayı silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    fetchPages();
  }

  const statusColors: Record<string, string> = {
    draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const statusLabels: Record<string, string> = {
    draft: "Taslak",
    published: "Yayında",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sayfalar</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">
            Page Builder ile sayfalarınızı düzenleyin
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3b63f7]"
        >
          <Plus size={16} />
          Yeni Sayfa
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-md rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[#0c1029] p-8"
          >
            <h2 className="mb-6 text-lg font-bold text-white">Yeni Sayfa Oluştur</h2>
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">
                Sayfa Başlığı
              </label>
              <input
                value={newTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/50 outline-none focus:border-[#1d47f0]"
                placeholder="Örn: Hakkımda"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">
                Slug (URL)
              </label>
              <div className="flex items-center rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]">
                <span className="pl-4 text-xs text-[#7a82a6]">/</span>
                <input
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  required
                  className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none"
                  placeholder="hakkimda"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setShowCreate(false); setError(""); }}
                className="flex-1 rounded-xl border border-[rgba(29,71,240,0.15)] py-2.5 text-sm font-medium text-[#7a82a6] transition-all hover:text-white"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={creating}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1d47f0] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3b63f7] disabled:opacity-50"
              >
                {creating ? <Loader2 size={14} className="animate-spin" /> : "Oluştur"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[#1d47f0]" />
        </div>
      ) : pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] py-20">
          <Layers size={40} className="mb-4 text-[#7a82a6]/30" />
          <p className="text-sm font-medium text-[#7a82a6]">Henüz sayfa oluşturulmadı</p>
          <p className="mt-1 text-xs text-[#7a82a6]/50">
            &quot;Yeni Sayfa&quot; butonuna tıklayarak başlayın
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(29,71,240,0.1)]">
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">
                  Sayfa
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">
                  Slug
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">
                  Durum
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">
                  Son Güncelleme
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(29,71,240,0.08)]">
              {pages.map((page) => (
                <tr
                  key={page.id}
                  className="transition-colors hover:bg-[#131836]/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10">
                        <FileText size={15} className="text-[#1d47f0]" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {page.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#7a82a6]">/{page.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                        statusColors[page.status] || statusColors.draft
                      }`}
                    >
                      {statusLabels[page.status] || page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7a82a6]">
                    {new Date(page.updatedAt).toLocaleString("tr-TR")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/pages/${page.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-[#1d47f0]"
                      >
                        <Pencil size={13} />
                      </Link>
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                      >
                        <Globe size={13} />
                      </a>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-red-500/30 hover:text-red-400"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
