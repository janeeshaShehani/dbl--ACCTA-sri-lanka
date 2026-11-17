
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  UserRound,
  Building2,
  FileSpreadsheet,
  Settings,
  LogOut,
  Bell,
  Search,
  CalendarDays,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  Eye,
  Download,
  Menu,
  ChevronRight,
  Files,
  TrendingUp,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, active: true },
  {
    label: "Membership Applications",
    href: "/admin/membership-applications",
    icon: Files,
  },
  {
    label: "Individual Members",
    href: "/admin/membership-applications/individual",
    icon: UserRound,
  },
  {
    label: "Corporate Members",
    href: "/admin/membership-applications/corporate",
    icon: Building2,
  },
  {
    label: "Reports & Exports",
    href: "/admin/reports",
    icon: FileSpreadsheet,
  },
];

const statistics = [
  {
    title: "Total Applications",
    value: "125",
    description: "All submitted applications",
    icon: Files,
    color: "text-[#1f2e4d]",
    bg: "bg-[#edf1f7]",
  },
  {
    title: "Individual Applications",
    value: "95",
    description: "Individual membership",
    icon: UserRound,
    color: "text-[#1f2e4d]",
    bg: "bg-[#edf1f7]",
  },
  {
    title: "Corporate Applications",
    value: "30",
    description: "Corporate membership",
    icon: Building2,
    color: "text-[#7b2329]",
    bg: "bg-[#f7eeee]",
  },
  {
    title: "Pending Applications",
    value: "28",
    description: "Awaiting review",
    icon: Clock3,
    color: "text-[#9a6818]",
    bg: "bg-[#faf3e5]",
  },
];

const recentApplications = [
  {
    number: "FAA261100001",
    name: "Janeesha Perera",
    type: "Individual",
    category: "Fellow Academic",
    date: "16 Nov 2026",
    status: "Pending",
  },
  {
    number: "ASA261100002",
    name: "Kasun De Silva",
    type: "Individual",
    category: "Associate Standard",
    date: "15 Nov 2026",
    status: "Under Review",
  },
  {
    number: "CMA261100001",
    name: "ABC Holdings (Pvt) Ltd",
    type: "Corporate",
    category: "Corporate Member",
    date: "14 Nov 2026",
    status: "Approved",
  },
  {
    number: "FSA261100003",
    name: "Nimesh Fernando",
    type: "Individual",
    category: "Fellow Standard",
    date: "13 Nov 2026",
    status: "Rejected",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending: "bg-[#faf0d9] text-[#94620e]",
    "Under Review": "bg-[#e8effa] text-[#315b91]",
    Approved: "bg-[#e7f3e9] text-[#327044]",
    Rejected: "bg-[#f8e8e8] text-[#a43c3c]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#1a1f2b]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col bg-[#1f2e4d] text-white lg:flex">
        <div className="flex h-[82px] items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
            <Image
                src="/images/logo.png"
                alt="ACCTA Sri Lanka Logo"
                width={44}
                height={44}
                priority
                className="h-full w-full object-contain"
            />
            </div>
          <div>
            <p className="text-[10px] tracking-[1.5px] text-white/60">
              ADMINISTRATION PORTAL
            </p>
          </div>
        </div>

        <div className="px-5 pt-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[2px] text-white/45">
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    item.active
                      ? "bg-[#7b2329] font-semibold text-white shadow-md"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/75 hover:bg-white/10">
            <LogOut size={18} />
            Logout
          </button>
          <p className="mt-5 text-center text-[10px] text-white/40">
            ACCTA Sri Lanka © 2026
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-h-screen lg:pl-[260px]">
        {/* Top header */}
        <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between border-b border-[#dde1e8] bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
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

          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="hidden rounded-lg p-2 text-[#4a5263] hover:bg-[#f4f6f9] sm:block"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Notifications"
              className="relative rounded-lg p-2 text-[#4a5263] hover:bg-[#f4f6f9]"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#7b2329]" />
            </button>
            <div className="flex items-center gap-3 border-l border-[#dde1e8] pl-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7b2329] text-sm font-bold text-white">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#1f2e4d]">Admin</p>
                <p className="text-xs text-[#4a5263]">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-8">
          {/* Page heading */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs text-[#7b2329]">
                <span className="font-semibold uppercase tracking-[2px]">
                  ACCTA Administration
                </span>
                <ChevronRight size={14} />
                <span className="text-[#4a5263]">Dashboard</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#1f2e4d] ">
                Dashboard
              </h2>
              <p className="mt-2 text-sm text-[#4a5263]">
                Overview of membership applications and administrative
                activities.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#dde1e8] bg-white px-4 py-2.5 text-sm text-[#4a5263]">
              <CalendarDays size={17} />
              16 November 2026
            </div>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#dde1e8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#4a5263]">
                        {item.title}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl font-bold text-[#1f2e4d]">
                        {item.value}
                      </h3>
                    </div>
                    <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                      <Icon size={23} />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[#7a8290]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Application overview and status */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-xl border border-[#dde1e8] bg-white p-6 xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1f2e4d]">
                    Application Overview
                  </h3>
                  <p className="mt-1 text-sm text-[#4a5263]">
                    Membership application distribution
                  </p>
                </div>
                <TrendingUp className="text-[#7b2329]" size={22} />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col justify-center gap-5 rounded-lg bg-[#f4f6f9] p-5">
                  <div>
                    <p className="text-sm text-[#4a5263]">Individual</p>
                    <p className="mt-1 font-serif text-3xl font-bold text-[#1f2e4d]">
                      95
                    </p>
                    <p className="text-xs text-[#4a5263]">76% of applications</p>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#dde1e8]">
                    <div className="h-full w-[76%] rounded-full bg-[#1f2e4d]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#4a5263]">Corporate</p>
                    <p className="mt-1 font-serif text-3xl font-bold text-[#7b2329]">
                      30
                    </p>
                    <p className="text-xs text-[#4a5263]">24% of applications</p>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#dde1e8]">
                    <div className="h-full w-[24%] rounded-full bg-[#7b2329]" />
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  {[
                    { label: "Approved", value: 56, color: "bg-[#42845a]" },
                    { label: "Under Review", value: 18, color: "bg-[#4976a8]" },
                    { label: "Pending", value: 28, color: "bg-[#d59b32]" },
                    { label: "Rejected", value: 23, color: "bg-[#a74747]" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-[#4a5263]">
                          <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-[#1f2e4d]">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#edf0f4]">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${(item.value / 125) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-xl bg-[#1f2e4d] p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-white/60">
                Quick Access
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold">
                Manage Applications
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Access submitted membership applications and manage applicant
                records.
              </p>

              <div className="mt-7 space-y-3">
                <Link
                  href="/admin/membership-applications/individual"
                  className="flex items-center justify-between rounded-lg bg-white/10 p-4 text-sm transition hover:bg-white/20"
                >
                  <span className="flex items-center gap-3">
                    <UserRound size={19} />
                    Individual Applications
                  </span>
                  <ArrowUpRight size={18} />
                </Link>
                <Link
                  href="/admin/membership-applications/corporate"
                  className="flex items-center justify-between rounded-lg bg-white/10 p-4 text-sm transition hover:bg-white/20"
                >
                  <span className="flex items-center gap-3">
                    <Building2 size={19} />
                    Corporate Applications
                  </span>
                  <ArrowUpRight size={18} />
                </Link>
                <Link
                  href="/admin/reports"
                  className="flex items-center justify-between rounded-lg bg-[#7b2329] p-4 text-sm font-semibold transition hover:bg-[#922d34]"
                >
                  <span className="flex items-center gap-3">
                    <Download size={19} />
                    Reports & Excel Exports
                  </span>
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </section>

          {/* Recent applications */}
          <section className="overflow-hidden rounded-xl border border-[#dde1e8] bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b border-[#dde1e8] p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1f2e4d]">
                  Recent Applications
                </h3>
                <p className="mt-1 text-sm text-[#4a5263]">
                  Latest membership forms submitted through the website.
                </p>
              </div>
              <Link
                href="/admin/membership-applications"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7b2329] hover:underline"
              >
                View all applications <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#f4f6f9]">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-[#4a5263]">
                    <th className="px-6 py-4">Registration No.</th>
                    <th className="px-6 py-4">Applicant Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0f4]">
                  {recentApplications.map((application) => (
                    <tr
                      key={application.number}
                      className="text-sm transition hover:bg-[#fafbfc]"
                    >
                      <td className="px-6 py-4 font-semibold text-[#1f2e4d]">
                        {application.number}
                      </td>
                      <td className="px-6 py-4 font-medium text-[#1a1f2b]">
                        {application.name}
                      </td>
                      <td className="px-6 py-4 text-[#4a5263]">
                        {application.type}
                      </td>
                      <td className="px-6 py-4 text-[#4a5263]">
                        {application.category}
                      </td>
                      <td className="px-6 py-4 text-[#4a5263]">
                        {application.date}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/membership-applications/${application.number}`}
                          aria-label={`View ${application.name}`}
                          className="inline-flex rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] transition hover:border-[#7b2329] hover:text-[#7b2329]"
                        >
                          <Eye size={17} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-[#dde1e8] px-6 py-4 text-xs text-[#7a8290] sm:flex-row">
              <span>Showing 4 sample applications</span>
              <span>Dashboard overview</span>
            </div>
          </section>

          
        </main>
      </div>
    </div>
  );
}
