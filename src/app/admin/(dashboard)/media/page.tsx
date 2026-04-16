"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Loader2, Trash2, Copy, Check, ImageIcon, FileText, Film } from "lucide-react";

interface MediaItem {
  id: number;
  filename: string;
  url: string;
  size: number | null;
  mimeType: string | null;
  createdAt: string;
}

function formatSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function getIcon(mimeType: string | null) {
  if (!mimeType) return <FileText size={24} className="text-[#7a82a6]/40" />;
  if (mimeType.startsWith("image/")) return <ImageIcon size={24} className="text-[#1d47f0]" />;
  if (mimeType.startsWith("video/")) return <Film size={24} className="text-purple-400" />;
  return <FileText size={24} className="text-[#7a82a6]/40" />;
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function fetchMedia() {
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setItems(data.media || []);
    setLoading(false);
  }

  useEffect(() => { fetchMedia(); }, []);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]);
      await fetch("/api/admin/media", { method: "POST", body: fd });
    }
    setUploading(false);
    fetchMedia();
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu dosyayı silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  function copyUrl(item: MediaItem) {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Medya</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">{items.length} dosya</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          Dosya Yükle
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*,video/*,.pdf,.svg" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="mb-6 flex items-center justify-center rounded-2xl border-2 border-dashed border-[rgba(29,71,240,0.15)] py-10 transition-all hover:border-[#1d47f0]/30"
      >
        <div className="text-center">
          <Upload size={32} className="mx-auto mb-2 text-[#7a82a6]/30" />
          <p className="text-sm text-[#7a82a6]">Dosyaları buraya sürükleyin veya yukarıdaki butona tıklayın</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] py-20">
          <ImageIcon size={40} className="mb-4 text-[#7a82a6]/30" />
          <p className="text-sm font-medium text-[#7a82a6]">Henüz medya dosyası yok</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] transition-all hover:border-[rgba(29,71,240,0.3)]">
              {/* Preview */}
              <div className="relative flex h-40 items-center justify-center bg-[#131836]">
                {item.mimeType?.startsWith("image/") ? (
                  <img src={item.url} alt={item.filename} className="h-full w-full object-cover" />
                ) : (
                  getIcon(item.mimeType)
                )}
                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => copyUrl(item)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-red-400 backdrop-blur-sm hover:bg-red-500/20">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="px-3 py-2.5">
                <p className="truncate text-xs font-medium text-white">{item.filename}</p>
                <p className="mt-0.5 text-[10px] text-[#7a82a6]">{formatSize(item.size)} · {new Date(item.createdAt).toLocaleDateString("tr-TR")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
