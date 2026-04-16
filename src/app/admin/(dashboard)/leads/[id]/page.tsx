"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Loader2,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  Send,
  Trash2,
  FileText,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  subject: string | null;
  message: string | null;
  pipelineStage: string;
  value: string | null;
  createdAt: string;
}

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

const stages = [
  { value: "new", label: "Yeni", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { value: "contacted", label: "İletişime Geçildi", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { value: "proposal", label: "Teklif", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { value: "won", label: "Kazanıldı", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { value: "lost", label: "Kaybedildi", color: "bg-red-500/10 text-red-400 border-red-500/20" },
];

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [sending, setSending] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function fetchLead() {
    const res = await fetch(`/api/admin/leads/${params.id}`);
    if (!res.ok) { router.push("/admin/leads"); return; }
    const data = await res.json();
    setLead(data.lead);
    setNotes(data.notes || []);
    setLoading(false);
  }

  useEffect(() => { fetchLead(); }, [params.id]);

  async function updateStage(stage: string) {
    if (!lead) return;
    setUpdating(true);
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pipelineStage: stage }),
    });
    setLead({ ...lead, pipelineStage: stage });
    setUpdating(false);
  }

  async function addNote() {
    if (!lead || !noteText.trim()) return;
    setSending(true);
    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteContent: noteText.trim() }),
    });
    const data = await res.json();
    if (data.note) setNotes([data.note, ...notes]);
    setNoteText("");
    setSending(false);
  }

  async function deleteLead() {
    if (!lead || !confirm("Bu lead'i silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
    router.push("/admin/leads");
  }

  if (loading || !lead) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  const currentStage = stages.find((s) => s.value === lead.pipelineStage) || stages[0];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/admin/leads" className="flex items-center gap-1 text-xs text-[#7a82a6] hover:text-white">
            <ChevronLeft size={14} /> Leads
          </a>
          <span className="text-[#7a82a6]/30">|</span>
          <h1 className="text-xl font-bold text-white">{lead.name}</h1>
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${currentStage.color}`}>
            {currentStage.label}
          </span>
        </div>
        <button onClick={deleteLead} className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10">
          <Trash2 size={13} /> Sil
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sol: Detay + Notlar */}
        <div className="flex-1 space-y-5">
          {/* İletişim Bilgileri */}
          <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#7a82a6]">İletişim Bilgileri</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10"><User size={15} className="text-[#1d47f0]" /></div>
                <div>
                  <p className="text-[10px] text-[#7a82a6]">İsim</p>
                  <p className="text-sm font-medium text-white">{lead.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10"><Mail size={15} className="text-[#1d47f0]" /></div>
                <div>
                  <p className="text-[10px] text-[#7a82a6]">E-posta</p>
                  <p className="text-sm font-medium text-white">{lead.email || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10"><Phone size={15} className="text-[#1d47f0]" /></div>
                <div>
                  <p className="text-[10px] text-[#7a82a6]">Telefon</p>
                  <p className="text-sm font-medium text-white">{lead.phone || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d47f0]/10"><Calendar size={15} className="text-[#1d47f0]" /></div>
                <div>
                  <p className="text-[10px] text-[#7a82a6]">Tarih</p>
                  <p className="text-sm font-medium text-white">{new Date(lead.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
            </div>

            {/* Konu + Mesaj */}
            {(lead.subject || lead.message) && (
              <div className="mt-5 border-t border-[rgba(29,71,240,0.1)] pt-5">
                {lead.subject && (
                  <div className="mb-3">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7a82a6]">Konu</p>
                    <p className="text-sm text-white">{lead.subject}</p>
                  </div>
                )}
                {lead.message && (
                  <div>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7a82a6]">Mesaj</p>
                    <div className="rounded-xl bg-[#131836] p-4 text-sm leading-relaxed text-[#c4c9e0]">
                      {lead.message}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Not Ekle */}
          <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#7a82a6]">Notlar</h2>
            <div className="mb-4 flex gap-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={2}
                placeholder="Not ekle..."
                className="flex-1 resize-none rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836] px-4 py-3 text-sm text-white placeholder-[#7a82a6]/40 outline-none focus:border-[#1d47f0]"
              />
              <button
                onClick={addNote}
                disabled={sending || !noteText.trim()}
                className="flex h-auto w-12 items-center justify-center rounded-xl bg-[#1d47f0] text-white transition-all hover:bg-[#3b63f7] disabled:opacity-40"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>

            {notes.length === 0 ? (
              <div className="flex flex-col items-center py-8">
                <MessageSquare size={28} className="mb-2 text-[#7a82a6]/20" />
                <p className="text-xs text-[#7a82a6]">Henüz not yok</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="rounded-xl border border-[rgba(29,71,240,0.08)] bg-[#131836] p-4">
                    <p className="text-sm leading-relaxed text-[#c4c9e0]">{note.content}</p>
                    <p className="mt-2 text-[10px] text-[#7a82a6]">
                      {new Date(note.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sağ: Pipeline + Kaynak */}
        <div className="w-72 space-y-4">
          {/* Pipeline Stage */}
          <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#7a82a6]">Pipeline</h3>
            <div className="space-y-2">
              {stages.map((s) => (
                <button
                  key={s.value}
                  onClick={() => updateStage(s.value)}
                  disabled={updating}
                  className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                    lead.pipelineStage === s.value
                      ? s.color + " ring-1 ring-current/20"
                      : "border-[rgba(29,71,240,0.1)] text-[#7a82a6] hover:border-[rgba(29,71,240,0.25)] hover:text-white"
                  }`}
                >
                  <div className={`h-2 w-2 rounded-full ${lead.pipelineStage === s.value ? "bg-current" : "bg-[#7a82a6]/30"}`} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Kaynak */}
          <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#7a82a6]">Kaynak</h3>
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-[#1d47f0]" />
              <span className="text-sm font-medium text-white capitalize">{lead.source || "Bilinmiyor"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
