"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Building2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Trash2,
} from "lucide-react";
import DeleteMemberModal from "@/components/admin/members/DeleteMemberModal";

type CorporateMember = {
  id: string;
  applicationNumber: string | null;
  corporateNumber: string | null;
  registeredName: string;
  tradingName: string | null;
  officialEmail: string | null;
  officePhone: string | null;
  residency: string | null;
  countryOfRegistration: string | null;
  status: string;
  createdAt: string;
};

type MembersResponse = {
  success: boolean;
  members: CorporateMember[];
  statusCounts: Record<string, number>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const statusStyles: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  SUBMITTED: "bg-blue-100 text-blue-700",
  UNDER_REVIEW: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export default function CorporateMembersPage() {
  const [members, setMembers] = useState<CorporateMember[]>([]);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState<CorporateMember | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams({
        search,
        page: String(page),
        limit: "10",
        status,
      });
      const response = await fetch(
        `/api/admin/corporate-members?${params.toString()}`,
        { cache: "no-store" },
      );
      const data: MembersResponse = await response.json();
      if (!response.ok || !data.success) {
        throw new Error("Unable to load corporate members.");
      }
      setMembers(data.members ?? []);
      setStatusCounts(data.statusCounts ?? {});
      setTotal(data.pagination?.total ?? 0);
      setTotalPages(data.pagination?.totalPages ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [search, page, status]);

  useEffect(() => {
    const timer = setTimeout(() => void fetchMembers(), 300);
    return () => clearTimeout(timer);
  }, [fetchMembers]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleUpdateStatus = async (memberId: string, newStatus: string) => {
    try {
      setUpdatingId(memberId);
      setNotice("");
      const response = await fetch(`/api/admin/corporate-members/${memberId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update member status.");
      }
      setNotice("Corporate member status updated successfully.");
      await fetchMembers();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Status update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    try {
      setDeleting(true);
      setNotice("");
      const response = await fetch(
        `/api/admin/corporate-members/${selectedMember.id}`,
        { method: "DELETE" },
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete corporate member.");
      }
      const deletedNumber = selectedMember.corporateNumber || selectedMember.applicationNumber || "Corporate member";
      setSelectedMember(null);
      setNotice(`${deletedNumber} deleted successfully.`);
      if (members.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await fetchMembers();
      }
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Deletion failed.");
    } finally {
      setDeleting(false);
    }
  };

  const displayedTotal = status === "ALL" ? total : statusCounts[status] ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2e4d]">Corporate Members</h1>
          <p className="mt-1 text-sm text-[#4a5263]">View and manage corporate membership records.</p>
        </div>
        <button
          type="button"
          onClick={() => void fetchMembers()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dde1e8] bg-white px-4 py-2.5 text-sm font-medium text-[#1f2e4d] hover:bg-gray-50 disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {notice && <div role="status" className="rounded-lg border border-[#dde1e8] bg-white px-4 py-3 text-sm text-[#1f2e4d]">{notice}</div>}

      <div className="rounded-xl border border-[#dde1e8] bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f4f6f9]">
            <Building2 size={22} className="text-[#7b2329]" />
          </div>
          <div>
            <p className="text-sm text-[#4a5263]">Total corporate records</p>
            <p className="text-2xl font-bold text-[#1f2e4d]">{total}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ["Submitted", "SUBMITTED"],
          ["Under Review", "UNDER_REVIEW"],
          ["Approved", "APPROVED"],
          ["Rejected", "REJECTED"],
          ["Draft", "DRAFT"],
        ].map(([label, value]) => (
          <button
            key={value}
            type="button"
            onClick={() => handleFilterStatus(status === value ? "ALL" : value)}
            className={`rounded-xl border bg-white p-4 text-left transition ${status === value ? "border-[#7b2329] ring-1 ring-[#7b2329]" : "border-[#dde1e8] hover:border-[#7b2329]"}`}
          >
            <p className="text-xs text-[#4a5263]">{label}</p>
            <p className="mt-1 text-xl font-bold text-[#1f2e4d]">{statusCounts[value] ?? 0}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-[#dde1e8] bg-white p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search company, email or corporate number..."
            className="w-full rounded-lg border border-[#dde1e8] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#1f2e4d]"
          />
        </div>
        <select
          value={status}
          onChange={(event) => handleFilterStatus(event.target.value)}
          className="rounded-lg border border-[#dde1e8] bg-white px-4 py-3 text-sm text-[#1f2e4d] outline-none focus:border-[#1f2e4d]"
        >
          <option value="ALL">All statuses</option>
          {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#dde1e8] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-left">
            <thead className="bg-[#f4f6f9]">
              <tr className="text-xs font-semibold uppercase tracking-wide text-[#1f2e4d]">
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Corporate No.</th>
                <th className="px-5 py-4">Application No.</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde1e8]">
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center">
                  <Loader2 className="mx-auto animate-spin text-[#1f2e4d]" />
                  <p className="mt-2 text-sm text-[#4a5263]">Loading corporate members...</p>
                </td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-red-600">{error}</td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center">
                  <Building2 size={32} className="mx-auto text-gray-300" />
                  <p className="mt-3 font-semibold text-[#1f2e4d]">No corporate members found</p>
                  <p className="mt-1 text-sm text-[#4a5263]">Try changing your search or status filter.</p>
                </td></tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#1f2e4d]">{member.registeredName}</p>
                      <p className="mt-1 text-xs text-[#4a5263]">{member.tradingName || "No trading name"}</p>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-[#1f2e4d]">{member.corporateNumber || "Not assigned"}</td>
                    <td className="px-5 py-4 text-sm text-[#4a5263]">{member.applicationNumber || "—"}</td>
                    <td className="px-5 py-4 text-sm text-[#4a5263]">{member.officialEmail || "—"}</td>
                    <td className="px-5 py-4 text-sm text-[#4a5263]">{member.officePhone || "—"}</td>
                    <td className="px-5 py-4">
                      <select
                        value={member.status}
                        onChange={(event) => void handleUpdateStatus(member.id, event.target.value)}
                        disabled={updatingId === member.id}
                        aria-label={`Change status for ${member.registeredName}`}
                        className={`rounded-lg border border-[#dde1e8] px-3 py-2 text-xs font-semibold outline-none disabled:opacity-60 ${statusStyles[member.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                      {updatingId === member.id && <Loader2 size={14} className="ml-2 inline animate-spin" />}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/membership-applications/${member.id}?type=corporate`} className="inline-flex items-center gap-1.5 rounded-lg border border-[#dde1e8] px-3 py-2 text-xs font-semibold text-[#1f2e4d] hover:bg-[#f4f6f9]">
                          <Eye size={14} /> View
                        </Link>
                        <Link href={`/admin/corporate-members/${member.id}/edit`} className="inline-flex items-center gap-1.5 rounded-lg bg-[#7b2329] px-3 py-2 text-xs font-semibold text-white hover:bg-[#15203a]">
                          <Pencil size={14} /> Edit
                        </Link>
                        <button type="button" onClick={() => setSelectedMember(member)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#dde1e8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#4a5263]">Showing {members.length} of {displayedTotal} records</p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] disabled:opacity-40"><ChevronLeft size={18} /></button>
            <span className="px-2 text-sm text-[#4a5263]">Page {page} of {Math.max(totalPages, 1)}</span>
            <button type="button" disabled={page >= totalPages || loading} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] disabled:opacity-40"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <DeleteMemberModal
        open={!!selectedMember}
        memberName={selectedMember?.registeredName ?? ""}
        memberNumber={selectedMember?.corporateNumber || selectedMember?.applicationNumber || "Unassigned"}
        deleting={deleting}
        onCancel={() => { if (!deleting) setSelectedMember(null); }}
        onConfirm={handleDeleteMember}
      />
    </div>
  );
}
