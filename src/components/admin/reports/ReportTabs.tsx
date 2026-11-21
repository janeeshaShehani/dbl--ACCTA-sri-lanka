
import type { ReportTab } from "@/lib/admin/reports/report-types";

const tabs: { value: ReportTab; label: string }[] = [
  { value: "applications", label: "Applications" },
  { value: "individual", label: "Individual Members" },
  { value: "corporate", label: "Corporate Members" },
];

type Props = {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
};

export default function ReportTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-[var(--color-border)]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === tab.value
              ? "border-[var(--color-maroon)] text-[var(--color-navy)]"
              : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-navy)]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
