"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
  Building2,
  RefreshCw,
} from "lucide-react";

import ApplicationStatusBadge from "../shared/ApplicationStatusBadge";
import type {
  ApplicationListResponse,
  MembershipApplication,
  ApplicationStatus,
} from "@/types/admin/application";

const PAGE_SIZE = 10;

export default function ApplicationsPage() {
  const router = useRouter();

  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        search,
        status: status === "ALL" ? "" : status,
        type,
        page: String(page),
        limit: String(PAGE_SIZE),
      });

      const response = await fetch(
        `/api/admin/membership-applications?${params.toString()}`,
        { cache: "no-store" }
      );

      const data: ApplicationListResponse & { message?: string } =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load applications.");
      }

      setApplications(data.applications);
      setTotal(data.pagination.total);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, type, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchApplications();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchApplications]);

  const updateFilter = (filter: "status" | "type", value: string) => {
    if (filter === "status") setStatus(value);
    else setType(value);

    setPage(1);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const openApplication = (application: MembershipApplication) => {
    router.push(
      `/admin/membership-applications/${application.id}?type=${application.type}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1f2e4d]">
            Membership Applications
          </h1>
          <p className="mt-1 text-sm text-[#4a5263]">
            Review and manage individual and corporate membership applications.
          </p>
        </div>

        <button
          onClick={() => void fetchApplications()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dde1e8] bg-white px-4 py-2.5 text-sm font-medium text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-[#dde1e8] bg-white p-5">
        <p className="text-sm text-[#4a5263]">Total applications</p>
        <p className="mt-1 text-3xl font-bold text-[#1f2e4d]">{total}</p>
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border border-[#dde1e8] bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_190px_190px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5263]"
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search name, email or application number..."
              className="w-full rounded-lg border border-[#dde1e8] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#1f2e4d]"
            />
          </div>

          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5263]"
            />
            <select
              value={type}
              onChange={(event) => updateFilter("type", event.target.value)}
              className="w-full appearance-none rounded-lg border border-[#dde1e8] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1f2e4d]"
            >
              <option value="all">All application types</option>
              <option value="individual">Individual</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          <select
            value={status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="rounded-lg border border-[#dde1e8] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1f2e4d]"
          >
            <option value="ALL">All statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications table */}
      <div className="overflow-hidden rounded-xl border border-[#dde1e8] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#f4f6f9] text-xs uppercase tracking-wide text-[#4a5263]">
              <tr>
                <th className="px-5 py-4 font-semibold">Applicant</th>
                <th className="px-5 py-4 font-semibold">Application No.</th>
                <th className="px-5 py-4 font-semibold">Type</th>
                <th className="px-5 py-4 font-semibold">Submitted</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#dde1e8]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#4a5263]">
                    Loading applications...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#4a5263]">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={`${application.type}-${application.id}`}
                    className="transition hover:bg-[#f9fafb]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#1f2e4d]">
                        {application.name}
                      </p>
                      <p className="mt-1 text-xs text-[#4a5263]">
                        {application.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium text-[#1f2e4d]">
                      {application.applicationNumber}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-[#4a5263]">
                        {application.type === "individual" ? (
                          <Users size={16} />
                        ) : (
                          <Building2 size={16} />
                        )}
                        <span className="capitalize">{application.type}</span>
                      </span>
                    </td>

                    <td className="px-5 py-4 text-[#4a5263]">
                      {application.submittedAt
                        ? formatDate(application.submittedAt)
                        : "Not submitted"}
                    </td>

                    <td className="px-5 py-4">
                      <ApplicationStatusBadge
                        status={application.status as ApplicationStatus}
                      />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openApplication(application)}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#dde1e8] px-3 py-2 text-xs font-semibold text-[#1f2e4d] hover:border-[#7b2329] hover:text-[#7b2329]"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-[#dde1e8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#4a5263]">
            Showing {applications.length ? (page - 1) * PAGE_SIZE + 1 : 0}
            {" – "}
            {(page - 1) * PAGE_SIZE + applications.length} of {total}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1 || loading}
              className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="px-2 text-sm text-[#1f2e4d]">
              Page {page} of {Math.max(totalPages, 1)}
            </span>

            <button
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page >= totalPages || loading || totalPages === 0}
              className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}