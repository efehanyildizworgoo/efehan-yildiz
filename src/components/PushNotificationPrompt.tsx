"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export default function PushNotificationPrompt() {
  const [show, setShow] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    if (localStorage.getItem("push-dismissed")) return;

    navigator.serviceWorker.ready.then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        setSubscribed(true);
      } else {
        setTimeout(() => setShow(true), 5000);
      }
    });

    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const res = await fetch("/api/push/vapid-key");
      const { publicKey } = await res.json();
      if (!publicKey) throw new Error("VAPID key not configured");

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });

      setSubscribed(true);
      setShow(false);
    } catch (err) {
      console.error("Push subscription failed:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleDismiss() {
    setShow(false);
    localStorage.setItem("push-dismissed", "1");
  }

  if (!show || subscribed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(29,71,240,0.2)] bg-[#0c1029]/95 p-5 shadow-2xl shadow-[#1d47f0]/10 backdrop-blur-xl">
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-3 rounded-lg p-1 text-[#7a82a6] transition-colors hover:bg-white/5 hover:text-white"
        >
          <X size={14} />
        </button>

        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d47f0]/10">
          <Bell size={20} className="text-[#1d47f0]" />
        </div>

        <h3 className="mb-1 text-sm font-semibold text-white">
          Bildirimleri Aç
        </h3>
        <p className="mb-4 text-xs leading-relaxed text-[#7a82a6]">
          Yeni içerikler ve güncellemelerden anında haberdar ol.
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="flex-1 rounded-xl bg-[#1d47f0] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#1d47f0]/90 disabled:opacity-50"
          >
            {loading ? "Kaydediliyor..." : "Bildirimlere Abone Ol"}
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-xl border border-[rgba(29,71,240,0.15)] px-3 py-2.5 text-xs font-medium text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-white"
          >
            Sonra
          </button>
        </div>
      </div>
    </div>
  );
}
