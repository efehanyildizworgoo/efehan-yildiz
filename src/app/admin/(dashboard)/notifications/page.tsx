"use client";

import { useEffect, useState } from "react";
import { Bell, Send, Users, Clock, CheckCircle, XCircle } from "lucide-react";

interface NotificationHistory {
  id: number;
  title: string;
  body: string;
  url: string | null;
  sentCount: number;
  failCount: number;
  createdAt: string;
}

export default function NotificationsPage() {
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [history, setHistory] = useState<NotificationHistory[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch("/api/admin/push/subscribers");
    if (res.ok) {
      const data = await res.json();
      setSubscriberCount(data.subscriberCount);
      setHistory(data.history);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, url: url || undefined }),
      });
      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: `${data.sentCount} aboneye gönderildi${data.failCount > 0 ? `, ${data.failCount} başarısız` : ""}`,
        });
        setTitle("");
        setBody("");
        setUrl("");
        fetchData();
      } else {
        setResult({ success: false, message: data.error || "Hata oluştu" });
      }
    } catch {
      setResult({ success: false, message: "Bağlantı hatası" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Push Bildirimleri</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">
            Abonelerinize anlık bildirim gönderin
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] px-4 py-2.5">
          <Users size={16} className="text-[#1d47f0]" />
          <span className="text-sm font-semibold text-white">{subscriberCount}</span>
          <span className="text-xs text-[#7a82a6]">Abone</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Send Form */}
        <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
              <Send size={18} className="text-[#1d47f0]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Bildirim Gönder</h2>
              <p className="text-xs text-[#7a82a6]">Tüm abonelere anlık bildirim</p>
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#7a82a6]">
                Başlık *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Yeni Blog Yazısı Yayınlandı!"
                className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#060918] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/50 outline-none transition-all focus:border-[#1d47f0]/50"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#7a82a6]">
                İçerik *
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="SEO stratejileri hakkında yeni bir yazı yayınladım..."
                rows={3}
                className="w-full resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#060918] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/50 outline-none transition-all focus:border-[#1d47f0]/50"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#7a82a6]">
                Bağlantı URL (opsiyonel)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://efehanyildiz.com/blog/yeni-yazi"
                className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#060918] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/50 outline-none transition-all focus:border-[#1d47f0]/50"
              />
            </div>

            {result && (
              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                  result.success
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {result.success ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {result.message}
              </div>
            )}

            <button
              type="submit"
              disabled={sending || subscriberCount === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d47f0] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1d47f0]/90 disabled:opacity-50"
            >
              <Bell size={16} />
              {sending
                ? "Gönderiliyor..."
                : subscriberCount === 0
                  ? "Henüz abone yok"
                  : `${subscriberCount} Aboneye Gönder`}
            </button>
          </form>
        </div>

        {/* History */}
        <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
              <Clock size={18} className="text-[#1d47f0]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Gönderim Geçmişi</h2>
              <p className="text-xs text-[#7a82a6]">Son gönderilen bildirimler</p>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell size={40} className="mb-3 text-[#7a82a6]/30" />
              <p className="text-sm text-[#7a82a6]">Henüz bildirim gönderilmedi</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[rgba(29,71,240,0.08)] bg-[#060918] p-4"
                >
                  <div className="mb-1 flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <span className="ml-2 shrink-0 text-[10px] text-[#7a82a6]">
                      {new Date(item.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mb-2 text-xs text-[#7a82a6] line-clamp-2">{item.body}</p>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle size={10} /> {item.sentCount} başarılı
                    </span>
                    {item.failCount > 0 && (
                      <span className="flex items-center gap-1 text-red-400">
                        <XCircle size={10} /> {item.failCount} başarısız
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
