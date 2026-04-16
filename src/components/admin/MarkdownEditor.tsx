"use client";

import { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Link2,
  ImageIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Eye,
  Edit3,
  Minus,
} from "lucide-react";
import MediaPicker from "./MediaPicker";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-white mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-white mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-white mt-8 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="rounded bg-[#1d47f0]/10 px-1.5 py-0.5 text-[#7cacf8] text-xs">$1</code>')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="my-4 max-w-full rounded-xl" />')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#1d47f0] underline">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-[#1d47f0] pl-4 italic text-[#7a82a6] my-3">$1</blockquote>')
    .replace(/^---$/gm, '<hr class="border-[rgba(29,71,240,0.15)] my-6" />')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal text-sm">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-sm">$1</li>')
    .replace(/^(?!<[hbailou]|<li|<str|<em|<code|<img|<hr|<block)(.+)$/gm, '<p class="mb-3 text-sm leading-relaxed">$1</p>');
}

export default function MarkdownEditor({ value, onChange, rows = 16 }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [mediaPicker, setMediaPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insert = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = value.substring(start, end) || placeholder;
      const newValue =
        value.substring(0, start) + before + selected + after + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        ta.focus();
        ta.selectionStart = start + before.length;
        ta.selectionEnd = start + before.length + selected.length;
      }, 0);
    },
    [value, onChange]
  );

  const tools = [
    { icon: Bold, label: "Kalın", action: () => insert("**", "**", "kalın metin") },
    { icon: Italic, label: "İtalik", action: () => insert("*", "*", "italik metin") },
    { icon: Heading2, label: "Başlık 2", action: () => insert("\n## ", "\n", "Başlık") },
    { icon: Heading3, label: "Başlık 3", action: () => insert("\n### ", "\n", "Alt Başlık") },
    { divider: true },
    { icon: List, label: "Liste", action: () => insert("\n- ", "\n", "madde") },
    { icon: ListOrdered, label: "Sıralı Liste", action: () => insert("\n1. ", "\n", "madde") },
    { icon: Quote, label: "Alıntı", action: () => insert("\n> ", "\n", "alıntı") },
    { icon: Code, label: "Kod", action: () => insert("`", "`", "kod") },
    { icon: Minus, label: "Ayırıcı", action: () => insert("\n---\n") },
    { divider: true },
    { icon: Link2, label: "Link", action: () => insert("[", "](https://)", "link metni") },
    {
      icon: ImageIcon,
      label: "Görsel",
      action: () => setMediaPicker(true),
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.1)] px-3 py-2">
        <div className="flex items-center gap-0.5">
          {tools.map((tool, i) => {
            if ("divider" in tool) {
              return (
                <div
                  key={`d-${i}`}
                  className="mx-1.5 h-4 w-px bg-[rgba(29,71,240,0.15)]"
                />
              );
            }
            const Icon = tool.icon!;
            return (
              <button
                key={tool.label}
                type="button"
                onClick={tool.action}
                title={tool.label}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#7a82a6] transition-colors hover:bg-[#1d47f0]/10 hover:text-[#1d47f0]"
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-[#0c1029] p-0.5">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold transition-all ${
              mode === "write"
                ? "bg-[#1d47f0]/15 text-[#1d47f0]"
                : "text-[#7a82a6] hover:text-white"
            }`}
          >
            <Edit3 size={10} /> Yaz
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold transition-all ${
              mode === "preview"
                ? "bg-[#1d47f0]/15 text-[#1d47f0]"
                : "text-[#7a82a6] hover:text-white"
            }`}
          >
            <Eye size={10} /> Önizle
          </button>
        </div>
      </div>

      {/* Content */}
      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full resize-none bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-white outline-none placeholder-[#7a82a6]/30"
          placeholder="Markdown ile yazın..."
        />
      ) : (
        <div
          className="min-h-[320px] px-4 py-3 text-sm leading-relaxed text-[#7a82a6]"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(value) || '<p class="text-[#7a82a6]/30">Henüz içerik yok...</p>' }}
        />
      )}

      <MediaPicker
        open={mediaPicker}
        onClose={() => setMediaPicker(false)}
        onSelect={(url) => {
          insert(`\n![görsel](${url})\n`);
          setMediaPicker(false);
        }}
      />
    </div>
  );
}
