"use client";

import { useState } from "react";
import { Block, BlockType, HeroBlockData, TextBlockData, FeaturesBlockData, CtaBlockData, FaqBlockData, StatsBlockData, ProcessBlockData, ImageBlockData, SpacerBlockData, CustomHtmlBlockData, FeatureItem, FaqItem, StatItem, ProcessStep } from "@/lib/builder/types";
import { Plus, Trash2, X, ImageIcon } from "lucide-react";
import MediaPicker from "@/components/admin/MediaPicker";

interface BlockSettingsProps {
  block: Block;
  onChange: (block: Block) => void;
  onClose: () => void;
}

function Input({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]" />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="w-full resize-none rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]" />
    </div>
  );
}

function Select<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[];
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value as T)}
        className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function NumberInput({ label, value, onChange, min, max }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} min={min} max={max}
        className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]" />
    </div>
  );
}

function updateData<T>(block: Block, partial: Partial<T>): Block {
  return { ...block, data: { ...block.data, ...partial } };
}

function HeroSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as HeroBlockData;
  return (
    <>
      <Input label="Başlık" value={d.title} onChange={(v) => onChange(updateData<HeroBlockData>(block, { title: v }))} />
      <Input label="Alt Başlık" value={d.subtitle} onChange={(v) => onChange(updateData<HeroBlockData>(block, { subtitle: v }))} />
      <Textarea label="Açıklama" value={d.description} onChange={(v) => onChange(updateData<HeroBlockData>(block, { description: v }))} />
      <Input label="Ana Buton Metni" value={d.primaryButtonText} onChange={(v) => onChange(updateData<HeroBlockData>(block, { primaryButtonText: v }))} />
      <Input label="Ana Buton URL" value={d.primaryButtonUrl} onChange={(v) => onChange(updateData<HeroBlockData>(block, { primaryButtonUrl: v }))} />
      <Input label="İkincil Buton Metni" value={d.secondaryButtonText} onChange={(v) => onChange(updateData<HeroBlockData>(block, { secondaryButtonText: v }))} />
      <Input label="İkincil Buton URL" value={d.secondaryButtonUrl} onChange={(v) => onChange(updateData<HeroBlockData>(block, { secondaryButtonUrl: v }))} />
      <Select label="Hizalama" value={d.alignment} onChange={(v) => onChange(updateData<HeroBlockData>(block, { alignment: v }))} options={[{ value: "left", label: "Sol" }, { value: "center", label: "Orta" }, { value: "right", label: "Sağ" }]} />
    </>
  );
}

function TextSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as TextBlockData;
  return (
    <>
      <Input label="Başlık" value={d.heading} onChange={(v) => onChange(updateData<TextBlockData>(block, { heading: v }))} />
      <Select label="Başlık Etiketi" value={d.headingTag} onChange={(v) => onChange(updateData<TextBlockData>(block, { headingTag: v }))} options={[{ value: "h1", label: "H1" }, { value: "h2", label: "H2" }, { value: "h3", label: "H3" }, { value: "h4", label: "H4" }]} />
      <Textarea label="İçerik" value={d.content} onChange={(v) => onChange(updateData<TextBlockData>(block, { content: v }))} rows={5} />
      <Select label="Hizalama" value={d.alignment} onChange={(v) => onChange(updateData<TextBlockData>(block, { alignment: v }))} options={[{ value: "left", label: "Sol" }, { value: "center", label: "Orta" }, { value: "right", label: "Sağ" }]} />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArrayItemEditor<T extends Record<string, any>>({ items, fields, onChange, createItem }: {
  items: T[]; fields: { key: string; label: string; textarea?: boolean }[]; onChange: (items: T[]) => void; createItem: () => T;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a82a6]">#{i + 1}</span>
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-red-400/60 hover:text-red-400"><Trash2 size={12} /></button>
          </div>
          {fields.map((f) => f.textarea ? (
            <Textarea key={String(f.key)} label={f.label} value={String(item[f.key] || "")} onChange={(v) => { const arr = [...items]; arr[i] = { ...arr[i], [f.key]: v }; onChange(arr); }} rows={2} />
          ) : (
            <Input key={String(f.key)} label={f.label} value={String(item[f.key] || "")} onChange={(v) => { const arr = [...items]; arr[i] = { ...arr[i], [f.key]: v }; onChange(arr); }} />
          ))}
        </div>
      ))}
      <button onClick={() => onChange([...items, createItem()])}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[rgba(29,71,240,0.2)] py-2 text-xs font-medium text-[#1d47f0] transition-all hover:bg-[#1d47f0]/5">
        <Plus size={12} /> Ekle
      </button>
    </div>
  );
}

function FeaturesSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as FeaturesBlockData;
  return (
    <>
      <Input label="Başlık" value={d.heading} onChange={(v) => onChange(updateData<FeaturesBlockData>(block, { heading: v }))} />
      <Input label="Alt Başlık" value={d.subtitle} onChange={(v) => onChange(updateData<FeaturesBlockData>(block, { subtitle: v }))} />
      <Select label="Sütun Sayısı" value={String(d.columns) as "2" | "3" | "4"} onChange={(v) => onChange(updateData<FeaturesBlockData>(block, { columns: Number(v) as 2 | 3 | 4 }))} options={[{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }]} />
      <label className="mb-2 mt-4 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Öğeler</label>
      <ArrayItemEditor<FeatureItem> items={d.items} fields={[{ key: "icon", label: "İkon" }, { key: "title", label: "Başlık" }, { key: "description", label: "Açıklama", textarea: true }]} onChange={(items) => onChange(updateData<FeaturesBlockData>(block, { items }))} createItem={() => ({ icon: "Zap", title: "Yeni Özellik", description: "Açıklama" })} />
    </>
  );
}

function CtaSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as CtaBlockData;
  return (
    <>
      <Input label="Başlık" value={d.heading} onChange={(v) => onChange(updateData<CtaBlockData>(block, { heading: v }))} />
      <Textarea label="Açıklama" value={d.description} onChange={(v) => onChange(updateData<CtaBlockData>(block, { description: v }))} />
      <Input label="Buton Metni" value={d.buttonText} onChange={(v) => onChange(updateData<CtaBlockData>(block, { buttonText: v }))} />
      <Input label="Buton URL" value={d.buttonUrl} onChange={(v) => onChange(updateData<CtaBlockData>(block, { buttonUrl: v }))} />
      <Select label="Stil" value={d.style} onChange={(v) => onChange(updateData<CtaBlockData>(block, { style: v }))} options={[{ value: "default", label: "Varsayılan" }, { value: "gradient", label: "Gradient" }, { value: "bordered", label: "Kenarlıklı" }]} />
    </>
  );
}

function FaqSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as FaqBlockData;
  return (
    <>
      <Input label="Başlık" value={d.heading} onChange={(v) => onChange(updateData<FaqBlockData>(block, { heading: v }))} />
      <label className="mb-2 mt-4 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Sorular</label>
      <ArrayItemEditor<FaqItem> items={d.items} fields={[{ key: "question", label: "Soru" }, { key: "answer", label: "Cevap", textarea: true }]} onChange={(items) => onChange(updateData<FaqBlockData>(block, { items }))} createItem={() => ({ question: "Yeni Soru?", answer: "Cevap" })} />
    </>
  );
}

function StatsSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as StatsBlockData;
  return (
    <>
      <Input label="Başlık" value={d.heading} onChange={(v) => onChange(updateData<StatsBlockData>(block, { heading: v }))} />
      <Select label="Sütun" value={String(d.columns) as "2" | "3" | "4"} onChange={(v) => onChange(updateData<StatsBlockData>(block, { columns: Number(v) as 2 | 3 | 4 }))} options={[{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }]} />
      <label className="mb-2 mt-4 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">İstatistikler</label>
      <ArrayItemEditor<StatItem> items={d.items} fields={[{ key: "value", label: "Değer" }, { key: "label", label: "Etiket" }]} onChange={(items) => onChange(updateData<StatsBlockData>(block, { items }))} createItem={() => ({ value: "0", label: "Etiket" })} />
    </>
  );
}

function ProcessSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as ProcessBlockData;
  return (
    <>
      <Input label="Başlık" value={d.heading} onChange={(v) => onChange(updateData<ProcessBlockData>(block, { heading: v }))} />
      <label className="mb-2 mt-4 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">Adımlar</label>
      <ArrayItemEditor<ProcessStep> items={d.items} fields={[{ key: "step", label: "Adım No" }, { key: "title", label: "Başlık" }, { key: "description", label: "Açıklama", textarea: true }]} onChange={(items) => onChange(updateData<ProcessBlockData>(block, { items }))} createItem={() => ({ step: String(d.items.length + 1).padStart(2, "0"), title: "Yeni Adım", description: "Açıklama" })} />
    </>
  );
}

function ImageUrlInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [picker, setPicker] = useState(false);
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">{label}</label>
      {value && <img src={value} alt="" className="mb-2 h-20 w-full rounded-lg object-cover" />}
      <div className="flex gap-1.5">
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL veya medyadan seç"
          className="flex-1 rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-xs text-white outline-none focus:border-[#1d47f0]" />
        <button type="button" onClick={() => setPicker(true)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[rgba(29,71,240,0.15)] text-[#7a82a6] hover:border-[#1d47f0]/30 hover:text-[#1d47f0]">
          <ImageIcon size={13} />
        </button>
      </div>
      <MediaPicker open={picker} onClose={() => setPicker(false)} onSelect={(url) => { onChange(url); setPicker(false); }} />
    </div>
  );
}

function ImageSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as ImageBlockData;
  return (
    <>
      <ImageUrlInput label="Görsel" value={d.src} onChange={(v) => onChange(updateData<ImageBlockData>(block, { src: v }))} />
      <Input label="Alt Metin" value={d.alt} onChange={(v) => onChange(updateData<ImageBlockData>(block, { alt: v }))} />
      <Select label="Genişlik" value={d.width} onChange={(v) => onChange(updateData<ImageBlockData>(block, { width: v }))} options={[{ value: "small", label: "Küçük" }, { value: "medium", label: "Orta" }, { value: "full", label: "Tam" }]} />
    </>
  );
}

function SpacerSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as SpacerBlockData;
  return <NumberInput label="Yükseklik (px)" value={d.height} onChange={(v) => onChange(updateData<SpacerBlockData>(block, { height: v }))} min={10} max={300} />;
}

function CustomHtmlSettings({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const d = block.data as CustomHtmlBlockData;
  return <Textarea label="HTML Kodu" value={d.html} onChange={(v) => onChange(updateData<CustomHtmlBlockData>(block, { html: v }))} rows={8} />;
}

const SETTINGS_MAP: Record<BlockType, React.FC<{ block: Block; onChange: (b: Block) => void }>> = {
  hero: HeroSettings,
  text: TextSettings,
  features: FeaturesSettings,
  cta: CtaSettings,
  faq: FaqSettings,
  stats: StatsSettings,
  process: ProcessSettings,
  image: ImageSettings,
  spacer: SpacerSettings,
  "custom-html": CustomHtmlSettings,
  testimonials: () => <p className="text-xs text-[#7a82a6]">Yakında</p>,
  pricing: () => <p className="text-xs text-[#7a82a6]">Yakında</p>,
  "contact-form": () => <p className="text-xs text-[#7a82a6]">Yakında</p>,
};

export default function BlockSettings({ block, onChange, onClose }: BlockSettingsProps) {
  const SettingsComponent = SETTINGS_MAP[block.type];
  const label = block.type.charAt(0).toUpperCase() + block.type.slice(1).replace("-", " ");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.15)] px-4 py-3">
        <h3 className="text-sm font-bold text-white">{label} Ayarları</h3>
        <button onClick={onClose} className="text-[#7a82a6] hover:text-white"><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {SettingsComponent ? <SettingsComponent block={block} onChange={onChange} /> : <p className="text-xs text-[#7a82a6]">Bu blok için ayar yok</p>}
      </div>
    </div>
  );
}
