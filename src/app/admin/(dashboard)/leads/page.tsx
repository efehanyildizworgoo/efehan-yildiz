"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users, Mail, Phone, MessageSquare, Calendar, Trash2, ChevronRight, Send, DollarSign } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string;
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

const STAGES = [
  { key: "new", label: "Yeni", color: "border-blue-500/30 bg-blue-500/5", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { key: "contacted", label: "İletişime Geçildi", color: "border-yellow-500/30 bg-yellow-500/5", badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { key: "proposal", label: "Teklif", color: "border-purple-500/30 bg-purple-500/5", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { key: "won", label: "Kazanıldı", color: "border-emerald-500/30 bg-emerald-500/5", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { key: "lost", label: "Kaybedildi", color: "border-red-500/30 bg-red-500/5", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
];

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [view, setView] = useState<"pipeline" | "list">("pipeline");

  async function fetchLeads() {
    const res = await fetch("/api/admin/leads");
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  useEffect(() => { fetchLeads(); }, []);

  function openDetail(lead: Lead) {
    router.push(`/admin/leads/${lead.id}`);
  }

  async function updateStage(id: number, stage: string) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pipelineStage: stage }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, pipelineStage: stage } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, pipelineStage: stage });
  }

  async function addNote() {
    if (!selectedLead || !newNote.trim()) return;
    const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteContent: newNote }),
    });
    const data = await res.json();
    setNotes((prev) => [data.note, ...prev]);
    setNewNote("");
  }

  async function deleteLead(id: number) {
    if (!confirm("Bu lead'i silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#1d47f0]" /></div>;
  }

  return (
    <div className="flex h-[calc(100vh-128px)]">
      {/* Main */}
      <div className="flex flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <p className="mt-1 text-sm text-[#7a82a6]">{leads.length} lead · CRM pipeline</p>
          </div>
          <div className="flex rounded-lg border border-[rgba(29,71,240,0.15)]">
            <button onClick={() => setView("pipeline")} className={`px-3 py-1.5 text-xs font-medium ${view === "pipeline" ? "bg-[#1d47f0]/10 text-[#1d47f0]" : "text-[#7a82a6]"}`}>Pipeline</button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 text-xs font-medium ${view === "list" ? "bg-[#1d47f0]/10 text-[#1d47f0]" : "text-[#7a82a6]"}`}>Liste</button>
          </div>
        </div>

        {view === "pipeline" ? (
          <div className="flex flex-1 gap-3 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const stageLeads = leads.filter((l) => l.pipelineStage === stage.key);
              return (
                <div key={stage.key} className={`w-64 flex-shrink-0 rounded-xl border ${stage.color} p-3`}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7a82a6]">{stage.label}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${stage.badge}`}>{stageLeads.length}</span>
                  </div>
                  <div className="space-y-2">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => openDetail(lead)}
                        className="cursor-pointer rounded-lg border border-[rgba(29,71,240,0.1)] bg-[#0c1029] p-3 transition-all hover:border-[rgba(29,71,240,0.25)]"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">{lead.name}</p>
                          <ChevronRight size={12} className="text-[#7a82a6]/40" />
                        </div>
                        {lead.email && <p className="mt-1 flex items-center gap-1 text-[10px] text-[#7a82a6]"><Mail size={9} />{lead.email}</p>}
                        {lead.subject && <p className="mt-1 text-[10px] text-[#7a82a6] line-clamp-1">{lead.subject}</p>}
                        <p className="mt-1.5 text-[9px] text-[#7a82a6]/50">{new Date(lead.createdAt).toLocaleDateString("tr-TR")}</p>
                      </div>
                    ))}
                    {stageLeads.length === 0 && (
                      <p className="py-4 text-center text-[10px] text-[#7a82a6]/30">Boş</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(29,71,240,0.1)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">İsim</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">İletişim</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Aşama</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Kaynak</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">Tarih</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#7a82a6]">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(29,71,240,0.08)]">
                {leads.map((lead) => {
                  const stage = STAGES.find((s) => s.key === lead.pipelineStage);
                  return (
                    <tr key={lead.id} onClick={() => openDetail(lead)} className="cursor-pointer transition-colors hover:bg-[#131836]/50">
                      <td className="px-4 py-3 text-sm font-medium text-white">{lead.name}</td>
                      <td className="px-4 py-3 text-xs text-[#7a82a6]">{lead.email || lead.phone || "—"}</td>
                      <td className="px-4 py-3"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${stage?.badge}`}>{stage?.label}</span></td>
                      <td className="px-4 py-3 text-xs text-[#7a82a6]">{lead.source}</td>
                      <td className="px-4 py-3 text-xs text-[#7a82a6]">{new Date(lead.createdAt).toLocaleDateString("tr-TR")}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }} className="text-[#7a82a6]/40 hover:text-red-400"><Trash2 size={13} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedLead && (
        <div className="ml-4 w-96 flex-shrink-0 overflow-y-auto rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
          <div className="border-b border-[rgba(29,71,240,0.15)] px-5 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{selectedLead.name}</h3>
              <button onClick={() => setSelectedLead(null)} className="text-xs text-[#7a82a6] hover:text-white">✕</button>
            </div>
            <div className="mt-3 space-y-1.5">
              {selectedLead.email && <p className="flex items-center gap-2 text-xs text-[#7a82a6]"><Mail size={12} />{selectedLead.email}</p>}
              {selectedLead.phone && <p className="flex items-center gap-2 text-xs text-[#7a82a6]"><Phone size={12} />{selectedLead.phone}</p>}
              <p className="flex items-center gap-2 text-xs text-[#7a82a6]"><Calendar size={12} />{new Date(selectedLead.createdAt).toLocaleString("tr-TR")}</p>
            </div>
          </div>

          {/* Pipeline Stage Selector */}
          <div className="border-b border-[rgba(29,71,240,0.15)] px-5 py-3">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#7a82a6]">Aşama</label>
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => updateStage(selectedLead.id, s.key)}
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all ${
                    selectedLead.pipelineStage === s.key ? s.badge : "border-[rgba(29,71,240,0.1)] text-[#7a82a6]/60 hover:text-[#7a82a6]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          {selectedLead.message && (
            <div className="border-b border-[rgba(29,71,240,0.15)] px-5 py-3">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#7a82a6]">
                <MessageSquare size={10} className="mr-1 inline" />Mesaj
              </label>
              <p className="text-xs leading-relaxed text-[#7a82a6]">{selectedLead.message}</p>
            </div>
          )}

          {/* Notes */}
          <div className="px-5 py-3">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#7a82a6]">Notlar</label>
            <div className="mb-3 flex gap-2">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                placeholder="Not ekle..."
                className="flex-1 rounded-lg border border-[rgba(29,71,240,0.15)] bg-[#131836] px-3 py-2 text-xs text-white outline-none focus:border-[#1d47f0]"
              />
              <button onClick={addNote} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d47f0] text-white hover:bg-[#3b63f7]">
                <Send size={12} />
              </button>
            </div>
            <div className="space-y-2">
              {notes.map((note) => (
                <div key={note.id} className="rounded-lg border border-[rgba(29,71,240,0.08)] bg-[#131836] px-3 py-2">
                  <p className="text-xs text-[#7a82a6]">{note.content}</p>
                  <p className="mt-1 text-[9px] text-[#7a82a6]/40">{new Date(note.createdAt).toLocaleString("tr-TR")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
