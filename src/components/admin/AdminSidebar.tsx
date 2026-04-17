"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  GraduationCap,
  Users,
  ImageIcon,
  Settings,
  Layers,
  LogOut,
  Home,
  Bell,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Ana Sayfa", href: "/admin/homepage", icon: Home },
  { label: "Sayfalar", href: "/admin/pages", icon: Layers },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Hizmetler", href: "/admin/services", icon: Briefcase },
  { label: "Eğitimler", href: "/admin/trainings", icon: GraduationCap },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Medya", href: "/admin/media", icon: ImageIcon },
  { label: "Bildirimler", href: "/admin/notifications", icon: Bell },
  { label: "Ayarlar", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[rgba(29,71,240,0.15)] bg-[#0c1029]">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[rgba(29,71,240,0.15)] px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Efehan Yıldız" width={120} height={28} />
          <span className="rounded-md bg-[#1d47f0]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1d47f0]">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1d47f0]/10 text-[#1d47f0]"
                    : "text-[#7a82a6] hover:bg-[#131836] hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-[rgba(29,71,240,0.15)] px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="mb-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#7a82a6] transition-all hover:bg-[#131836] hover:text-white"
        >
          <Layers size={18} />
          Siteyi Görüntüle
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400/70 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
