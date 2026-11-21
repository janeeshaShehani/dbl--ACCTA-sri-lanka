
import type { ApplicationStatus } from "@/lib/admin/reports/report-types";

type Props = {
  search: string;
  status: ApplicationStatus;
  from: string;
  to: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ApplicationStatus) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export default function ReportFilters({
  search,
  status,
  from,
  to,
  onSearchChange,
  onStatusChange,
  onFromChange,
  onToChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 md:grid-cols-2 xl:grid-cols-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search applications..."
        className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs outline-none focus:border-[var(--color-navy)]"
      />

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value as ApplicationStatus)
        }
        className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs"
      >
        <option value="ALL">All statuses</option>
        <option value="DRAFT">Draft</option>
        <option value="SUBMITTED">Submitted</option>
        <option value="UNDER_REVIEW">Under Review</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <input
        type="date"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs"
        aria-label="From date"
      />

      <input
        type="date"
        value={to}
        min={from || undefined}
        onChange={(e) => onToChange(e.target.value)}
        className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs"
        aria-label="To date"
      />
    </div>
  );
}
