"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, FileText, Pencil, Trash2, Loader2, Star, Copy, Search } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  status: string;
  featured: boolean;
  updatedAt: string;
}

export default function BlogListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  async function fetchPosts() {
    const res = await fetch("/api/admin/posts");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  function handleTitleChange(val: string) {
    setNewTitle(val);
    setNewSlug(
      val.toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, slug: newSlug, category: newCategory || null }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setCreating(false); return; }
    setShowCreate(false);
    setNewTitle(""); setNewSlug(""); setNewCategory("");
    setCreating(false);
    if (data.post?.id) {
      router.push(`/admin/blog/${data.post.id}/edit`);
    } else {
      fetchPosts();
    }
  }

  async function handleDuplicate(id: number) {
    const res = await fetch(`/api/admin/posts/${id}/duplicate`, { method: "POST" });
    const data = await res.json();
    if (data.post?.id) router.push(`/admin/blog/${data.post.id}/edit`);
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  const filteredPosts = posts.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Yazıları</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">Blog içeriklerinizi yönetin</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3b63f7]">
          <Plus size={16} /> Yeni Yazı
        </button>
      </div>

      {/* Search & Filter */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a82a6]/50" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Yazı ara..." className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] py-2.5 pl-9 pr-4 text-sm text-white placeholder-[#7a82a6]/40 outline-none focus:border-[#1d47f0]" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] px-4 py-2.5 text-sm text-white outline-none focus:border-[#1d47f0]">
          <option value="all">Tümü</option>
          <option value="draft">Taslak</option>
          <option value="published">Yayında</option>
        </select>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreate} className="w-full max-w-md rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[#0c1029] p-8">
            <h2 className="mb-6 text-lg font-bold text-white">Yeni Blog Yazısı</h2>
            {error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</div>}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Başlık</label>
              <input value={newTitle} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/50 outline-none focus:border-[#1d47f0]" placeholder="Blog yazısı başlığı" />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Slug</label>
              <div className="flex items-center rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]">
                <span className="pl-4 text-xs text-[#7a82a6]">/blog/</span>
                <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} required className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none" />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#7a82a6]">Kategori</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]">
                <option value="">Seçiniz</option>
                <option value="SEO">SEO</option>
                <option value="Dijital Pazarlama">Dijital Pazarlama</option>
                <option value="Sosyal Medya">Sosyal Medya</option>
                <option value="Web Geliştirme">Web Geliştirme</option>
                <option value="İçerik Pazarlama">İçerik Pazarlama</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setShowCreate(false); setError(""); }} className="flex-1 rounded-xl border border-[rgba(29,71,240,0.15)] py-2.5 text-sm font-medium text-[#7a82a6] transition-all hover:text-white">İptal</button>
              <button type="submit" disabled={creating} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1d47f0] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3b63f7] disabled:opacity-50">
                {creating ? <Loader2 size={14} className="animate-spin" /> : "Oluştur"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>
      ) : filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] py-20">
          <FileText size={40} className="mb-4 text-[#7a82a6]/30" />
          <p className="text-sm font-medium text-[#7a82a6]">Henüz blog yazısı yok</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(29,71,240,0.1)]">
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Yazı</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Kategori</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Durum</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Tarih</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(29,71,240,0.08)]">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-[#131836]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10">
                        <FileText size={15} className="text-[#1d47f0]" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">{post.title}</span>
                        {post.featured && <Star size={12} className="ml-1.5 inline text-yellow-400" />}
                        <p className="text-xs text-[#7a82a6]">/blog/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7a82a6]">{post.category || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${statusColors[post.status] || statusColors.draft}`}>
                      {post.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7a82a6]">{new Date(post.updatedAt).toLocaleDateString("tr-TR")}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-[#1d47f0]" title="Düzenle">
                        <Pencil size={13} />
                      </Link>
                      <button onClick={() => handleDuplicate(post.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-[#1d47f0]" title="Kopyala">
                        <Copy size={13} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-red-500/30 hover:text-red-400" title="Sil">
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
