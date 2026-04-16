"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Save,
  Eye,
  Globe,
  Loader2,
  GripVertical,
  Trash2,
  Copy,
  Settings,
  Layout,
  Type,
  Grid3x3,
  MousePointerClick,
  CircleHelp,
  BarChart3,
  ListOrdered,
  ImageIcon,
  Quote,
  CreditCard,
  Mail,
  MoveVertical,
  Code,
  ChevronLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Block,
  BlockType,
  BLOCK_REGISTRY,
  getDefaultBlockData,
} from "@/lib/builder/types";
import BlockPreview from "./BlockPreview";
import BlockSettings from "./BlockSettings";

const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout size={16} />,
  Type: <Type size={16} />,
  Grid3x3: <Grid3x3 size={16} />,
  MousePointerClick: <MousePointerClick size={16} />,
  CircleHelp: <CircleHelp size={16} />,
  BarChart3: <BarChart3 size={16} />,
  ListOrdered: <ListOrdered size={16} />,
  Image: <ImageIcon size={16} />,
  Quote: <Quote size={16} />,
  CreditCard: <CreditCard size={16} />,
  Mail: <Mail size={16} />,
  MoveVertical: <MoveVertical size={16} />,
  Code: <Code size={16} />,
};

interface PageBuilderProps {
  pageId: number;
  initialBlocks: Block[];
  initialTitle: string;
  initialSlug: string;
  initialStatus: string;
  initialSeoTitle: string;
  initialSeoDesc: string;
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

// ─── Sortable Block Item ─────────────────────────
function SortableBlock({
  block,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const meta = BLOCK_REGISTRY.find((b) => b.type === block.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-xl border transition-all ${
        isSelected
          ? "border-[#1d47f0] shadow-[0_0_20px_rgba(29,71,240,0.15)]"
          : "border-[rgba(29,71,240,0.1)] hover:border-[rgba(29,71,240,0.25)]"
      } bg-[#0d1230]`}
    >
      {/* Block toolbar */}
      <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.1)] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-[#7a82a6]/40 hover:text-[#7a82a6] active:cursor-grabbing"
          >
            <GripVertical size={14} />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a82a6]">
            {meta?.label || block.type}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {!isFirst && (
            <button onClick={onMoveUp} className="rounded p-1 text-[#7a82a6]/60 hover:bg-[#131836] hover:text-white">
              <ArrowUp size={12} />
            </button>
          )}
          {!isLast && (
            <button onClick={onMoveDown} className="rounded p-1 text-[#7a82a6]/60 hover:bg-[#131836] hover:text-white">
              <ArrowDown size={12} />
            </button>
          )}
          <button onClick={onSelect} className="rounded p-1 text-[#7a82a6]/60 hover:bg-[#131836] hover:text-[#1d47f0]">
            <Settings size={12} />
          </button>
          <button onClick={onDuplicate} className="rounded p-1 text-[#7a82a6]/60 hover:bg-[#131836] hover:text-white">
            <Copy size={12} />
          </button>
          <button onClick={onDelete} className="rounded p-1 text-[#7a82a6]/60 hover:bg-[#131836] hover:text-red-400">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      {/* Block preview */}
      <div className="cursor-pointer p-4" onClick={onSelect}>
        <BlockPreview block={block} />
      </div>
    </div>
  );
}

// ─── Main Page Builder ───────────────────────────
export default function PageBuilder({
  pageId,
  initialBlocks,
  initialTitle,
  initialSlug,
  initialStatus,
  initialSeoTitle,
  initialSeoDesc,
}: PageBuilderProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [status, setStatus] = useState(initialStatus);
  const [seoTitle, setSeoTitle] = useState(initialSeoTitle || "");
  const [seoDesc, setSeoDesc] = useState(initialSeoDesc || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"blocks" | "seo">("blocks");
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      data: getDefaultBlockData(type),
    };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, []);

  const updateBlock = useCallback((updated: Block) => {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  }, [selectedBlockId]);

  const duplicateBlock = useCallback((id: string) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const clone: Block = { ...prev[idx], id: generateId(), data: { ...prev[idx].data } };
      const arr = [...prev];
      arr.splice(idx + 1, 0, clone);
      return arr;
    });
  }, []);

  const moveBlock = useCallback((id: string, direction: "up" | "down") => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      return arrayMove(prev, idx, newIdx);
    });
  }, []);

  function handleDragStart(event: DragStartEvent) {
    setActiveDragId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDragId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBlocks((prev) => {
      const oldIdx = prev.findIndex((b) => b.id === active.id);
      const newIdx = prev.findIndex((b) => b.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  }

  async function handleSave(newStatus?: string) {
    setSaving(true);
    setSaved(false);
    try {
      await fetch(`/api/admin/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          blocks,
          status: newStatus || status,
          seoTitle,
          seoDesc,
        }),
      });
      if (newStatus) setStatus(newStatus);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  const draggedBlock = activeDragId ? blocks.find((b) => b.id === activeDragId) : null;

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* ── Left Panel: Block Palette / SEO ── */}
      <div className="flex w-72 flex-shrink-0 flex-col border-r border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
        {/* Tabs */}
        <div className="flex border-b border-[rgba(29,71,240,0.15)]">
          <button
            onClick={() => setActiveTab("blocks")}
            className={`flex-1 py-3 text-xs font-semibold transition-all ${
              activeTab === "blocks"
                ? "border-b-2 border-[#1d47f0] text-[#1d47f0]"
                : "text-[#7a82a6] hover:text-white"
            }`}
          >
            Bloklar
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`flex-1 py-3 text-xs font-semibold transition-all ${
              activeTab === "seo"
                ? "border-b-2 border-[#1d47f0] text-[#1d47f0]"
                : "text-[#7a82a6] hover:text-white"
            }`}
          >
            SEO
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {activeTab === "blocks" ? (
            <div className="grid grid-cols-2 gap-2">
              {BLOCK_REGISTRY.map((meta) => (
                <button
                  key={meta.type}
                  onClick={() => addBlock(meta.type)}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-[rgba(29,71,240,0.1)] bg-[#131836] p-3 text-center transition-all hover:border-[#1d47f0]/30 hover:bg-[#1d47f0]/5"
                >
                  <div className="text-[#1d47f0]">
                    {ICON_MAP[meta.icon] || <Layout size={16} />}
                  </div>
                  <span className="text-[10px] font-medium text-[#7a82a6]">
                    {meta.label}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">
                  Sayfa Başlığı
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">
                  Slug
                </label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">
                  SEO Başlık
                </label>
                <input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#7a82a6]">
                  SEO Açıklama
                </label>
                <textarea
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-sm text-white outline-none focus:border-[#1d47f0]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Center: Canvas ── */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.15)] bg-[#0c1029]/50 px-4 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <a href="/admin/pages" className="flex items-center gap-1 text-xs text-[#7a82a6] hover:text-white">
              <ChevronLeft size={14} />
              Sayfalar
            </a>
            <span className="text-[#7a82a6]/30">|</span>
            <span className="text-sm font-semibold text-white">{title}</span>
            <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${
              status === "published"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
            }`}>
              {status === "published" ? "Yayında" : "Taslak"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-xs font-medium text-emerald-400">✓ Kaydedildi</span>
            )}
            <a
              href={`/${slug}`}
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(29,71,240,0.15)] px-3 py-1.5 text-xs font-medium text-[#7a82a6] transition-all hover:text-white"
            >
              <Eye size={13} />
              Önizle
            </a>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg border border-[rgba(29,71,240,0.15)] px-3 py-1.5 text-xs font-medium text-[#7a82a6] transition-all hover:text-white disabled:opacity-50"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              Kaydet
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-[#1d47f0] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#3b63f7] disabled:opacity-50"
            >
              <Globe size={13} />
              Yayınla
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto bg-[#060918] p-6">
          <div className="mx-auto max-w-4xl">
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[rgba(29,71,240,0.15)] py-24">
                <Layout size={40} className="mb-4 text-[#7a82a6]/20" />
                <p className="text-sm font-medium text-[#7a82a6]">
                  Sayfa boş — sol panelden blok ekleyin
                </p>
                <p className="mt-1 text-xs text-[#7a82a6]/50">
                  Blokları sürükle-bırak ile sıralayabilirsiniz
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={blocks.map((b) => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {blocks.map((block, i) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() =>
                          setSelectedBlockId(
                            selectedBlockId === block.id ? null : block.id
                          )
                        }
                        onDelete={() => deleteBlock(block.id)}
                        onDuplicate={() => duplicateBlock(block.id)}
                        onMoveUp={() => moveBlock(block.id, "up")}
                        onMoveDown={() => moveBlock(block.id, "down")}
                        isFirst={i === 0}
                        isLast={i === blocks.length - 1}
                      />
                    ))}
                  </div>
                </SortableContext>
                <DragOverlay>
                  {draggedBlock ? (
                    <div className="rounded-xl border border-[#1d47f0] bg-[#0d1230] p-4 opacity-90 shadow-2xl">
                      <BlockPreview block={draggedBlock} />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Block Settings ── */}
      {selectedBlock && (
        <div className="w-80 flex-shrink-0 border-l border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
          <BlockSettings
            block={selectedBlock}
            onChange={updateBlock}
            onClose={() => setSelectedBlockId(null)}
          />
        </div>
      )}
    </div>
  );
}
