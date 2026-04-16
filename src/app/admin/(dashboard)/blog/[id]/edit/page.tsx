"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Loader2, ChevronLeft, Globe, Eye, Star } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string | null;
  status: string;
  featured: boolean;
  featuredImage: string | null;
  seoTitle: string | null;
  seoDesc: string | null;
  readTime: string | null;
}

export default function BlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  useEffect(() => {
    fetch(`/api/admin/posts/${params.id}`)
      .then((r) => r.json())
      .then((data) => { setPost(data.post); setLoading(false); })
      .catch(() => router.push("/admin/blog"));
  }, [params.id, router]);

  async function handleSave(newStatus?: string) {
    if (!post) return;
    setSaving(true);
    setSaved(false);
    const body = { ...post, status: newStatus || post.status };
    const res = await fetch(`/api/admin/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      setPost(data.post);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  if (loading || !post) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="-mx-6 -mt-6 mb-6 flex items-center justify-between border-b border-[rgba(29,71,240,0.15)] bg-[#0c1029]/50 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <a href="/admin/blog" className="flex items-center gap-1 text-xs text-[#7a82a6] hover:text-white">
            <ChevronLeft size={14} /> Blog
          </a>
          <span className="text-[#7a82a6]/30">|</span>
          <span className="text-sm font-semibold text-white">{post.title}</span>
          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${post.status === "published" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"}`}>
            {post.status === "published" ? "Yayında" : "Taslak"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs font-medium text-emerald-400">✓ Kaydedildi</span>}
          <a href={`/blog/${post.slug}`} target="_blank" className="flex items-center gap-1.5 rounded-lg border border-[rgba(29,71,240,0.15)] px-3 py-1.5 text-xs font-medium text-[#7a82a6] hover:text-white">
            <Eye size={13} /> Önizle
          </a>
          <button onClick={() => handleSave()} disabled={saving} className="flex items-center gap-1.5 rounded-lg border border-[rgba(29,71,240,0.15)] px-3 py-1.5 text-xs font-medium text-[#7a82a6] hover:text-white disabled:opacity-50">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Kaydet
          </button>
          <button onClick={() => handleSave("published")} disabled={saving} className="flex items-center gap-1.5 rounded-lg bg-[#1d47f0] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
            <Globe size={13} /> Yayınla
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
            {/* Tabs */}
            <div className="mb-6 flex border-b border-[rgba(29,71,240,0.15)]">
              <button onClick={() => setActiveTab("content")} className={`pb-3 pr-6 text-xs font-semibold ${activeTab === "content" ? "border-b-2 border-[#1d47f0] text-[#1d47f0]" : "text-[#7a82a6]"}`}>İçerik</button>
              <button onClick={() => setActiveTab("seo")} className={`pb-3 pr-6 text-xs font-semibold ${activeTab === "seo" ? "border-b-2 border-[#1d47f0] text-[#1d47f0]" : "text-[#7a82a6]"}`}>SEO</button>
            </div>

            {activeTab === "content" ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Başlık</label>
                  <input value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Slug</label>
                  <div className="flex items-center rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]">
                    <span className="pl-4 text-xs text-[#7a82a6]">/blog/</span>
                    <input value={post.slug} onChange={(e) => setPost({ ...post, slug: e.target.value })} className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Özet</label>
                  <textarea value={post.excerpt} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} rows={3} className="w-full resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">İçerik (Markdown)</label>
                  <textarea value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} rows={16} className="w-full resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 font-mono text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">SEO Başlık</label>
                  <input value={post.seoTitle || ""} onChange={(e) => setPost({ ...post, seoTitle: e.target.value })} className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">SEO Açıklama</label>
                  <textarea value={post.seoDesc || ""} onChange={(e) => setPost({ ...post, seoDesc: e.target.value })} rows={3} className="w-full resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white outline-none focus:border-[#1d47f0]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 space-y-4">
          <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#7a82a6]">Ayarlar</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#7a82a6]">Kategori</label>
                <select value={post.category || ""} onChange={(e) => setPost({ ...post, category: e.target.value || null })} className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]">
                  <option value="">Seçiniz</option>
                  <option value="SEO">SEO</option>
                  <option value="Dijital Pazarlama">Dijital Pazarlama</option>
                  <option value="Sosyal Medya">Sosyal Medya</option>
                  <option value="Web Geliştirme">Web Geliştirme</option>
                  <option value="İçerik Pazarlama">İçerik Pazarlama</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#7a82a6]">Okuma Süresi</label>
                <input value={post.readTime || ""} onChange={(e) => setPost({ ...post, readTime: e.target.value })} placeholder="5 dk" className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#7a82a6]">Kapak Görseli URL</label>
                <input value={post.featuredImage || ""} onChange={(e) => setPost({ ...post, featuredImage: e.target.value })} placeholder="https://..." className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]" />
              </div>
              <button onClick={() => setPost({ ...post, featured: !post.featured })} className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${post.featured ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" : "border-[rgba(29,71,240,0.15)] text-[#7a82a6] hover:text-white"}`}>
                <Star size={14} /> {post.featured ? "Öne Çıkarılmış" : "Öne Çıkar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
