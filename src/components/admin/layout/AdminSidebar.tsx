
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  UserRound,
  Building2,
  FileSpreadsheet,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Membership Applications",
    href: "/admin/membership-applications",
    icon: Files,
  },
  {
    label: "Individual Members",
    href: "/admin/individual-members",
    icon: UserRound,
  },
  {
    label: "Corporate Members",
    href: "/admin/corporate-members",
    icon: Building2,
  },
  {
    label: "Reports & Exports",
    href: "/admin/reports",
    icon: FileSpreadsheet,
  },
  {
  label: "Contact Forms",
  href: "/admin/contact-forms",
  icon: MessageSquare,
},
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[#1f2e4d] text-white transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
            <Image
              src="/images/logo.png"
              alt="ACCTA Sri Lanka"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold tracking-[1.5px]">
              ADMINISTRATION
            </p>
            <p className="text-[11px] tracking-[1.5px] text-white/65">
              PORTAL
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-md p-1 text-white/70 hover:bg-white/10 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 pt-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-white/45">
          Main Menu
        </p>

        <div className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#7b2329] font-semibold text-white shadow-md"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-5">
        <p className="text-center text-[10px] text-white/40">
          ACCTA Sri Lanka © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
}
