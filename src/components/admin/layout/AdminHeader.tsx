
"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between border-b border-[#dde1e8] bg-white px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs text-[#4a5263]">Administration</p>
          <p className="font-semibold text-[#1f2e4d]">
            Membership Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Search"
          className="rounded-lg p-2 text-[#4a5263] hover:bg-[#f4f6f9]"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-[#4a5263] hover:bg-[#f4f6f9]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#7b2329]" />
        </button>

        <div className="flex items-center gap-3 border-l border-[#dde1e8] pl-3 sm:pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7b2329] text-sm font-bold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#1f2e4d]">
              Admin
            </p>
            <p className="text-xs text-[#4a5263]">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
