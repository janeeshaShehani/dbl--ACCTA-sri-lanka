
import type { ReportRow } from "@/lib/admin/reports/report-types";

type Props = {
  rows: ReportRow[];
  loading: boolean;
};

export default function ReportTable({ rows, loading }: Props) {
  if (loading) {
    return <p className="py-10 text-center text-sm text-[var(--color-muted)]">Loading reports...</p>;
  }

  if (!rows.length) {
    return <p className="py-10 text-center text-sm text-[var(--color-muted)]">No applications found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white">
      <table className="w-full min-w-[850px] text-left text-xs">
        <thead className="bg-[var(--color-surface)] text-[var(--color-navy)]">
          <tr>
            <th className="px-4 py-3">Application No.</th>
            <th className="px-4 py-3">Applicant</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Submitted</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={`${row.type}-${row.id}`} className="border-t border-[var(--color-border)]">
              <td className="px-4 py-3 font-medium">{row.applicationNumber}</td>
              <td className="px-4 py-3">{row.applicant}</td>
              <td className="px-4 py-3">{row.type}</td>
              <td className="px-4 py-3">{row.category}</td>
              <td className="px-4 py-3">{row.status.replaceAll("_", " ")}</td>
              <td className="px-4 py-3">
                {row.submittedAt
                  ? new Date(row.submittedAt).toLocaleDateString()
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
