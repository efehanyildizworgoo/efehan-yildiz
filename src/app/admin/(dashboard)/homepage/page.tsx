"use client";

import { useEffect, useState } from "react";
import { Loader2, GripVertical, Eye, EyeOff, Save, RotateCcw } from "lucide-react";

interface Section {
  id: string;
  label: string;
  visible: boolean;
}

const DEFAULT_SECTIONS: Section[] = [
  { id: "hero", label: "Hero", visible: true },
  { id: "services", label: "Hizmetler", visible: true },
  { id: "trainings", label: "Eğitimler", visible: true },
  { id: "about", label: "Hakkımda", visible: true },
  { id: "references", label: "Referanslar", visible: true },
  { id: "youtube", label: "YouTube Videoları", visible: true },
  { id: "seo-toolkit", label: "SEO Araç Seti", visible: true },
  { id: "linkedin", label: "LinkedIn Paylaşımları", visible: true },
  { id: "podcast", label: "Podcast Bölümleri", visible: true },
  { id: "contact", label: "İletişim", visible: true },
];

export default function HomepageSettingsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings?.homepage_sections) {
          try {
            const saved = JSON.parse(data.settings.homepage_sections) as Section[];
            const savedIds = new Set(saved.map((s) => s.id));
            const merged = [...saved, ...DEFAULT_SECTIONS.filter((d) => !savedIds.has(d.id))];
            setSections(merged);
          } catch {
            setSections(DEFAULT_SECTIONS);
          }
        } else {
          setSections(DEFAULT_SECTIONS);
        }
        setLoading(false);
      });
  }, []);

  function toggle(id: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)));
  }

  function handleDragStart(i: number) {
    setDragIdx(i);
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    const updated = [...sections];
    const [moved] = updated.splice(dragIdx, 1);
    updated.splice(i, 0, moved);
    setSections(updated);
    setDragIdx(i);
  }

  function handleDragEnd() {
    setDragIdx(null);
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ homepage_sections: JSON.stringify(sections) }),
    });
    setSaving(false);
  }

  function reset() {
    setSections(DEFAULT_SECTIONS);
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ana Sayfa Düzeni</h1>
          <p className="mt-1 text-sm text-[#7a82a6]">Bölümleri sürükleyerek sıralayın, göster/gizle ile kontrol edin</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 rounded-xl border border-[rgba(29,71,240,0.15)] px-4 py-2.5 text-sm font-medium text-[#7a82a6] hover:border-[#1d47f0]/30 hover:text-white">
            <RotateCcw size={14} /> Sıfırla
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-1.5 rounded-xl bg-[#1d47f0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3b63f7] disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Kaydet
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((section, i) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
              dragIdx === i
                ? "border-[#1d47f0] bg-[#1d47f0]/5"
                : section.visible
                ? "border-[rgba(29,71,240,0.15)] bg-[#0c1029]"
                : "border-[rgba(29,71,240,0.08)] bg-[#0c1029]/50 opacity-50"
            }`}
          >
            <div className="cursor-grab text-[#7a82a6]/40 hover:text-[#7a82a6]">
              <GripVertical size={18} />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d47f0]/10 text-xs font-bold text-[#1d47f0]">
              {i + 1}
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{section.label}</p>
              <p className="text-[10px] text-[#7a82a6]">#{section.id}</p>
            </div>

            <button
              onClick={() => toggle(section.id)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                section.visible
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-[rgba(29,71,240,0.1)] text-[#7a82a6]/40 hover:text-[#7a82a6]"
              }`}
            >
              {section.visible ? <Eye size={15} /> : <EyeOff size={15} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
