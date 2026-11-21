
import {
  Download,
  FileSpreadsheet,
  Users,
  Building2,
} from "lucide-react";

const exportOptions = [
  {
    label: "All Individual Applications",
    description: "All individual application records",
    href: "/api/admin/reports/export?type=individual",
    icon: Users,
    primary: false,
  },
  {
    label: "All Corporate Applications",
    description: "All corporate application records",
    href: "/api/admin/reports/export?type=corporate",
    icon: Building2,
    primary: false,
  },
];

export default function ExportButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {exportOptions.map((option) => {
        const Icon = option.icon;

        return (
          <a
            key={option.href}
            href={option.href}
            title={option.description}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-medium transition ${
              option.primary
                ? "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)]"
                : "border border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:bg-[var(--color-surface)]"
            }`}
          >
            <Icon size={13} />
            {option.label}
            <Download size={12} />
          </a>
        );
      })}
    </div>
  );
}
