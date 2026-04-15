"use client";

import { Bell, User } from "lucide-react";

interface AdminHeaderProps {
  user: { id: number; email: string };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[rgba(29,71,240,0.15)] bg-[#0c1029]/50 px-6 backdrop-blur-sm">
      <div />
      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(29,71,240,0.15)] text-[#7a82a6] transition-all hover:border-[#1d47f0]/30 hover:text-white">
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1d47f0] text-[9px] font-bold text-white">
            0
          </span>
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-[rgba(29,71,240,0.15)] px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d47f0]/10">
            <User size={14} className="text-[#1d47f0]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Admin</p>
            <p className="text-[10px] text-[#7a82a6]">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
