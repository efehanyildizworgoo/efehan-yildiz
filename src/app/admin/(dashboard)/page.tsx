import Link from "next/link";
import { db } from "@/lib/db";
import { posts, leads, pages, services, media } from "@/lib/db/schema";
import { count, eq, desc } from "drizzle-orm";
import {
  FileText,
  Users,
  Layers,
  Briefcase,
  ImageIcon,
  TrendingUp,
  UserPlus,
  Clock,
  Plus,
  ArrowRight,
  Home,
  Settings,
} from "lucide-react";

async function getStats() {
  const [postCount] = await db.select({ value: count() }).from(posts);
  const [leadCount] = await db.select({ value: count() }).from(leads);
  const [pageCount] = await db.select({ value: count() }).from(pages);
  const [serviceCount] = await db.select({ value: count() }).from(services);
  const [mediaCount] = await db.select({ value: count() }).from(media);
  const [publishedPostCount] = await db.select({ value: count() }).from(posts).where(eq(posts.status, "published"));
  const [newLeadCount] = await db
    .select({ value: count() })
    .from(leads)
    .where(eq(leads.pipelineStage, "new"));

  const recentLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(5);

  const recentPosts = await db
    .select({ id: posts.id, title: posts.title, slug: posts.slug, status: posts.status, updatedAt: posts.updatedAt })
    .from(posts)
    .orderBy(desc(posts.updatedAt))
    .limit(5);

  return {
    posts: postCount.value,
    leads: leadCount.value,
    pages: pageCount.value,
    services: serviceCount.value,
    media: mediaCount.value,
    publishedPosts: publishedPostCount.value,
    newLeads: newLeadCount.value,
    recentLeads,
    recentPosts,
  };
}

const pipelineColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  proposal: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  won: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

const pipelineLabels: Record<string, string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  proposal: "Teklif Gönderildi",
  won: "Kazanıldı",
  lost: "Kaybedildi",
};

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Toplam Yazı",
      value: stats.posts,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Toplam Lead",
      value: stats.leads,
      icon: Users,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Yeni Lead",
      value: stats.newLeads,
      icon: UserPlus,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Sayfalar",
      value: stats.pages,
      icon: Layers,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Hizmetler",
      value: stats.services,
      icon: Briefcase,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      label: "Medya",
      value: stats.media,
      icon: ImageIcon,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-[#7a82a6]">
          Sitenizin genel durumuna göz atın
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-5 transition-all hover:border-[rgba(29,71,240,0.3)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#7a82a6]">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <card.icon size={22} className={card.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
        <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.15)] px-6 py-4">
          <h2 className="text-sm font-bold text-white">Son Leadler</h2>
          <a
            href="/admin/leads"
            className="text-xs font-medium text-[#1d47f0] transition-colors hover:text-[#3b63f7]"
          >
            Tümünü Gör →
          </a>
        </div>
        <div className="divide-y divide-[rgba(29,71,240,0.1)]">
          {stats.recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock size={32} className="mb-3 text-[#7a82a6]/30" />
              <p className="text-sm text-[#7a82a6]">Henüz lead bulunmuyor</p>
              <p className="mt-1 text-xs text-[#7a82a6]/50">
                İletişim formundan gelen mesajlar burada görünecek
              </p>
            </div>
          ) : (
            stats.recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between px-6 py-3.5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131836] text-sm font-bold text-[#1d47f0]">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {lead.name}
                    </p>
                    <p className="text-xs text-[#7a82a6]">
                      {lead.email || lead.phone || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                      pipelineColors[lead.pipelineStage] || pipelineColors.new
                    }`}
                  >
                    {pipelineLabels[lead.pipelineStage] || lead.pipelineStage}
                  </span>
                  <span className="text-[11px] text-[#7a82a6]">
                    {new Date(lead.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
          <div className="flex items-center justify-between border-b border-[rgba(29,71,240,0.15)] px-6 py-4">
            <h2 className="text-sm font-bold text-white">Son Blog Yazıları</h2>
            <Link href="/admin/blog" className="text-xs font-medium text-[#1d47f0] hover:text-[#3b63f7]">Tümü →</Link>
          </div>
          <div className="divide-y divide-[rgba(29,71,240,0.1)]">
            {stats.recentPosts.length === 0 ? (
              <div className="py-10 text-center text-sm text-[#7a82a6]/50">Henüz yazı yok</div>
            ) : (
              stats.recentPosts.map((post) => (
                <Link key={post.id} href={`/admin/blog/${post.id}/edit`} className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-[#131836]/50">
                  <div className="flex items-center gap-3">
                    <FileText size={14} className="text-[#1d47f0]" />
                    <span className="text-sm text-white line-clamp-1">{post.title}</span>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${post.status === "published" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"}`}>
                    {post.status === "published" ? "Yayında" : "Taslak"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-[rgba(29,71,240,0.15)] bg-[#0c1029] p-6">
          <h2 className="mb-4 text-sm font-bold text-white">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/blog" className="flex items-center gap-3 rounded-xl border border-[rgba(29,71,240,0.15)] p-4 text-sm text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-white">
              <Plus size={16} className="text-[#1d47f0]" /> Yeni Yazı
            </Link>
            <Link href="/admin/pages" className="flex items-center gap-3 rounded-xl border border-[rgba(29,71,240,0.15)] p-4 text-sm text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-white">
              <Layers size={16} className="text-purple-400" /> Yeni Sayfa
            </Link>
            <Link href="/admin/homepage" className="flex items-center gap-3 rounded-xl border border-[rgba(29,71,240,0.15)] p-4 text-sm text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-white">
              <Home size={16} className="text-emerald-400" /> Ana Sayfa
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl border border-[rgba(29,71,240,0.15)] p-4 text-sm text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-white">
              <Settings size={16} className="text-orange-400" /> Ayarlar
            </Link>
          </div>
          <div className="mt-4 rounded-xl border border-[rgba(29,71,240,0.15)] bg-[#131836]/50 p-4">
            <p className="text-xs text-[#7a82a6]">
              <span className="font-semibold text-white">{stats.publishedPosts}</span> yayında yazı · <span className="font-semibold text-white">{stats.newLeads}</span> yeni lead
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
