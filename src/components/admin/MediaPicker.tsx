"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Loader2, Check, ImageIcon, X, Search } from "lucide-react";

interface MediaItem {
  id: number;
  filename: string;
  url: string;
  size: number | null;
  mimeType: string | null;
  createdAt: string;
}

interface MediaPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaPicker({ open, onClose, onSelect }: MediaPickerProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((d) => { setItems(d.media || []); setLoading(false); });
  }, [open]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const data = await res.json();
      if (data.media) setItems((prev) => [data.media, ...prev]);
    }
    setUploading(false);
  }

  const filtered = items.filter((m) =>
    m.mimeType?.startsWith("image/") &&
    (search === "" || m.filename.toLowerCase().includes(search.toLowerCase()))
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[#0c1029]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.15)] px-6 py-4">
          <h2 className="text-sm font-bold text-white">Medya Seç</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-lg bg-[#1d47f0] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50"
            >
              {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
              Yükle
            </button>
            <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
            <button onClick={onClose} className="text-[#7a82a6] hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-[rgba(29,71,240,0.1)] px-6 py-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a82a6]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Dosya adıyla ara..."
              className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-[#1d47f0]"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ImageIcon size={32} className="mb-3 text-[#7a82a6]/30" />
              <p className="text-xs text-[#7a82a6]">Görsel bulunamadı</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onSelect(item.url); onClose(); }}
                  className="group relative overflow-hidden rounded-lg border border-[rgba(29,71,240,0.1)] transition-all hover:border-[#1d47f0]"
                >
                  <img src={item.url} alt={item.filename} className="aspect-square w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Check size={20} className="text-white" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
