"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Globe, Mail, Phone, User, Palette, Search, Code } from "lucide-react";

const SETTING_GROUPS = [
  {
    label: "Genel",
    icon: Globe,
    fields: [
      { key: "site_title", label: "Site Başlığı", placeholder: "Efehan Yıldız" },
      { key: "site_description", label: "Site Açıklaması", placeholder: "SEO & Dijital Pazarlama Uzmanı", textarea: true },
      { key: "site_url", label: "Site URL", placeholder: "https://www.efehanyildiz.com" },
    ],
  },
  {
    label: "İletişim",
    icon: Mail,
    fields: [
      { key: "contact_email", label: "E-posta", placeholder: "me@efehanyildiz.com" },
      { key: "contact_phone", label: "Telefon", placeholder: "+90 552 732 80 55" },
      { key: "contact_whatsapp", label: "WhatsApp", placeholder: "905527328055" },
    ],
  },
  {
    label: "Sosyal Medya",
    icon: User,
    fields: [
      { key: "social_linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
      { key: "social_instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
      { key: "social_youtube", label: "YouTube URL", placeholder: "https://youtube.com/@..." },
      { key: "social_twitter", label: "Twitter/X URL", placeholder: "https://x.com/..." },
    ],
  },
  {
    label: "SEO",
    icon: Search,
    fields: [
      { key: "seo_title", label: "Varsayılan SEO Başlık", placeholder: "Efehan Yıldız | SEO Uzmanı" },
      { key: "seo_description", label: "Varsayılan SEO Açıklama", placeholder: "...", textarea: true },
      { key: "google_analytics", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX" },
      { key: "google_search_console", label: "Search Console Doğrulama", placeholder: "meta tag content" },
    ],
  },
  {
    label: "Özel Kod",
    icon: Code,
    fields: [
      { key: "head_scripts", label: "Head İçi Kod (analytics vb.)", placeholder: "<script>...</script>", textarea: true },
      { key: "body_scripts", label: "Body Sonu Kod", placeholder: "<script>...</script>", textarea: true },
    ],
  },
];

export default function SettingsPage() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => { setData(d.settings || {}); setLoading(false); });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">Site geneli ayarları yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs font-medium text-emerald-400">✓ Kaydedildi</span>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Kaydet
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map((group) => (
          <div key={group.label} className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10">
                <group.icon size={16} className="text-[#1d47f0]" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">{group.label}</h2>
            </div>
            <div className="space-y-4">
              {group.fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">{field.label}</label>
                  {field.textarea ? (
                    <textarea
                      value={data[field.key] || ""}
                      onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                      rows={3}
                      placeholder={field.placeholder}
                      className="w-full resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/30 outline-none focus:border-[#1d47f0]"
                    />
                  ) : (
                    <input
                      value={data[field.key] || ""}
                      onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/30 outline-none focus:border-[#1d47f0]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
