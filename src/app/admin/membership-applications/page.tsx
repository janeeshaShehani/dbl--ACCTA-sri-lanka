
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Files,
  UserRound,
  Building2,
  Eye,
  SlidersHorizontal,
  CalendarDays,
  ChevronDown,
  FileSpreadsheet,
} from "lucide-react";

import applicationData from "@/data/apply-membership-applications.json";

type RecordData = Record<string, unknown>;

type Application = {
  id: string;
  registrationNumber: string;
  name: string;
  email: string;
  membershipCategory: string;
  submittedAt: string;
  type: "Individual" | "Corporate";
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
};

const getString = (value: unknown): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "";
};

// Convert JSON individual and corporate records into one list.
const individualRecords = (
  applicationData as {
    individualApplications?: RecordData[];
    corporateApplications?: RecordData[];
  }
).individualApplications ?? [];

const corporateRecords = (
  applicationData as {
    individualApplications?: RecordData[];
    corporateApplications?: RecordData[];
  }
).corporateApplications ?? [];

const applications: Application[] = [
  ...individualRecords.map((record): Application => ({
    id: getString(record.id),
    registrationNumber: getString(record.registrationNumber),
    name: getString(record.fullName),
    email:
      getString(record.personalEmail) ||
      getString(record.officialEmail),
    membershipCategory: getString(record.membershipCategory),
    submittedAt: getString(record.submittedAt),
    type: "Individual",
    status: "Pending",
  })),

  ...corporateRecords.map((record): Application => ({
    id: getString(record.id),
    registrationNumber: getString(record.registrationNumber),
    name: getString(record.registeredName),
    email: getString(record.officialEmail),
    membershipCategory: getString(record.membershipCategory),
    submittedAt: getString(record.submittedAt),
    type: "Corporate",
    status: "Pending",
  })),
];

const statusStyles: Record<string, string> = {
  Pending: "bg-[#fff5df] text-[#986817]",
  "Under Review": "bg-[#eaf1fb] text-[#416b9d]",
  Approved: "bg-[#e9f4ec] text-[#39764d]",
  Rejected: "bg-[#f9eaea] text-[#a34343]",
};

const formatDate = (date: string) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function MembershipApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const individualCount = applications.filter(
    (item) => item.type === "Individual"
  ).length;

  const corporateCount = applications.filter(
    (item) => item.type === "Corporate"
  ).length;

  const categories = [
    ...new Set(
      applications
        .map((item) => item.membershipCategory)
        .filter(Boolean)
    ),
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesTab =
        activeTab === "All" || item.type === activeTab;

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.registrationNumber.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.membershipCategory === categoryFilter;

      const matchesDate =
        !dateFilter ||
        item.submittedAt.slice(0, 10) === dateFilter;

      return (
        matchesTab &&
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesDate
      );
    });
  }, [activeTab, search, statusFilter, categoryFilter, dateFilter]);

  return (
    <div className="mx-auto w-full max-w-[1300px] space-y-6 p-5 sm:p-7 lg:p-8">

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.8px] text-[#7b2329]">
            ACCTA Administration
            <span className="text-[#a0a5af]">/</span>
            <span className="font-normal normal-case tracking-normal text-[#7a8290]">
              Membership Applications
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#1f2e4d]">
            Membership Applications
          </h1>

          <p className="mt-1.5 text-sm text-[#687184]">
            View, search and manage individual and corporate applications.
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Excel export will be implemented in the next step"
          className="inline-flex h-10 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-[#dde1e8] bg-white px-4 text-sm font-medium text-[#9ba2ad]"
        >
          <FileSpreadsheet size={17} />
          Export Applications
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            title: "Total Applications",
            value: applications.length,
            icon: Files,
            color: "text-[#1f2e4d]",
            bg: "bg-[#edf1f7]",
          },
          {
            title: "Individual Applications",
            value: individualCount,
            icon: UserRound,
            color: "text-[#1f2e4d]",
            bg: "bg-[#edf1f7]",
          },
          {
            title: "Corporate Applications",
            value: corporateCount,
            icon: Building2,
            color: "text-[#7b2329]",
            bg: "bg-[#f7eeee]",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-lg border border-[#dde1e8] bg-white px-5 py-4 shadow-sm"
            >
              <div>
                <p className="text-xs font-medium text-[#687184]">
                  {stat.title}
                </p>
                <p className="mt-1 font-serif text-2xl font-bold text-[#1f2e4d]">
                  {stat.value}
                </p>
              </div>

              <div className={`rounded-lg p-2.5 ${stat.bg} ${stat.color}`}>
                <Icon size={21} strokeWidth={1.8} />
              </div>
            </div>
          );
        })}
      </section>

      {/* Applications section */}
      <section className="overflow-hidden rounded-lg border border-[#dde1e8] bg-white shadow-sm">

        {/* Section heading */}
        <div className="flex flex-col justify-between gap-3 border-b border-[#e9ecf1] px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1f2e4d]">
              Submitted Applications
            </h2>
            <p className="mt-1 text-xs text-[#7a8290]">
              Review and manage membership application records.
            </p>
          </div>

          <span className="text-xs text-[#687184]">
            {filteredApplications.length} records found
          </span>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-5 border-b border-[#e9ecf1] px-5">
          {[
            { label: "All", count: applications.length },
            { label: "Individual", count: individualCount },
            { label: "Corporate", count: corporateCount },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`relative py-3.5 text-sm transition ${
                activeTab === tab.label
                  ? "font-semibold text-[#7b2329] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#7b2329]"
                  : "text-[#687184] hover:text-[#1f2e4d]"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === tab.label
                    ? "bg-[#f7eeee] text-[#7b2329]"
                    : "bg-[#f1f3f6] text-[#687184]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-[#e9ecf1] bg-[#fcfcfd] p-4 sm:grid-cols-2 xl:grid-cols-[minmax(240px,1.6fr)_minmax(145px,0.8fr)_minmax(170px,1fr)_minmax(150px,0.8fr)]">

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8992a1]"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or registration no."
              className="h-10 w-full rounded-md border border-[#dde1e8] bg-white pl-9 pr-3 text-xs text-[#1a1f2b] outline-none transition placeholder:text-[#9299a6] focus:border-[#7b2329]"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <SlidersHorizontal
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#687184]"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-[#dde1e8] bg-white pl-9 pr-8 text-xs text-[#4a5263] outline-none focus:border-[#7b2329]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#687184]"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-[#dde1e8] bg-white px-3 pr-8 text-xs text-[#4a5263] outline-none focus:border-[#7b2329]"
            >
              <option value="All">All Membership Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#687184]"
            />
          </div>

          {/* Date filter */}
          <div className="relative">
            <CalendarDays
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#687184]"
            />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              aria-label="Filter by submission date"
              className="h-10 w-full rounded-md border border-[#dde1e8] bg-white pl-9 pr-2 text-xs text-[#4a5263] outline-none focus:border-[#7b2329]"
            />
          </div>
        </div>

        {/* Applications table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="border-b border-[#e9ecf1] bg-[#f7f8fa] text-[10px] font-semibold uppercase tracking-[0.7px] text-[#687184]">
                <th className="px-5 py-3.5">Registration Number</th>
                <th className="px-5 py-3.5">Applicant / Company</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Submitted Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf0f4]">
              {filteredApplications.map((application) => (
                <tr
                  key={`${application.type}-${application.id}`}
                  className="text-xs transition-colors hover:bg-[#fafbfc]"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#1f2e4d]">
                    {application.registrationNumber || "-"}
                  </td>

                  <td className="px-5 py-4 font-medium text-[#1a1f2b]">
                    {application.name || "-"}
                  </td>

                  <td className="px-5 py-4 text-[#687184]">
                    {application.type}
                  </td>

                  <td className="px-5 py-4 text-[#687184]">
                    {application.membershipCategory || "-"}
                  </td>

                  <td className="px-5 py-4 text-[#687184]">
                    {application.email || "-"}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-[#687184]">
                    {formatDate(application.submittedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        statusStyles[application.status]
                      }`}
                    >
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                      {application.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/membership-applications/${application.id}`}
                      title="View application details"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#dde1e8] text-[#1f2e4d] transition hover:border-[#7b2329] hover:bg-[#f9eeee] hover:text-[#7b2329]"
                    >
                      <Eye size={15} />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-14 text-center text-sm text-[#8992a1]"
                  >
                    <Files size={28} className="mx-auto mb-2 text-[#b2bac6]" />
                    No applications found.
                    <p className="mt-1 text-xs">
                      Try changing your search or filter criteria.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-2 border-t border-[#e9ecf1] bg-white px-5 py-3 text-[11px] text-[#7a8290] sm:flex-row sm:items-center">
          <span>
            Showing {filteredApplications.length} of {applications.length} applications
          </span>
          <span>ACCTA Membership Management</span>
        </div>
      </section>
    </div>
  );
}
