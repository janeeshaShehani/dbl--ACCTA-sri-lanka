
"use client";

import { useCallback, useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import ReportTabs from "./ReportTabs";
import ReportFilters from "./ReportFilters";
import ReportTable from "./ReportTable";
import ExportButtons from "./ExportButtons";

import type {
  ReportTab,
  ReportRow,
  ApplicationStatus,
} from "@/lib/admin/reports/report-types";

type Summary = {
  totalApplications: number;
  individualApplications: number;
  corporateApplications: number;
  approvedMembers: number;
  pendingApplications: number;
};

const emptySummary: Summary = {
  totalApplications: 0,
  individualApplications: 0,
  corporateApplications: 0,
  approvedMembers: 0,
  pendingApplications: 0,
};

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("overview");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("ALL");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [summary, setSummary] = useState(emptySummary);
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReports = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        tab,
        search,
        status,
        from,
        to,
        page: String(page),
        limit: "10",
      });

      const response = await fetch(
        `/api/admin/reports?${params.toString()}`,
        { cache: "no-store" },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Unable to load reports.");
      }

      setSummary(result.summary);
      setRows(result.rows);
      setTotalPages(result.pagination.totalPages || 1);
    } catch (error) {
      console.error("Reports loading error:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [tab, search, status, from, to, page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchReports();
    }, 300);

    return () => clearTimeout(timeout);
  }, [fetchReports]);

  function changeTab(value: ReportTab) {
    setTab(value);
    setPage(1);
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[var(--color-navy)]">
            Reports & Exports
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            View application reports and export ACCTA records.
          </p>
        </div>

        <ExportButtons />
      </div>

      <SummaryCards summary={summary} />

      <ReportTabs activeTab={tab} onChange={changeTab} />

      <ReportFilters
        search={search}
        status={status}
        from={from}
        to={to}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onFromChange={(value) => {
          setFrom(value);
          setPage(1);
        }}
        onToChange={(value) => {
          setTo(value);
          setPage(1);
        }}
      />

      <ReportTable rows={rows} loading={loading} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-muted)]">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={page >= totalPages || loading}
            onClick={() => setPage((current) => current + 1)}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
