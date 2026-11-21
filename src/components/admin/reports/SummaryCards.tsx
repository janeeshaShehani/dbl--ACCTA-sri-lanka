
type Props = {
  summary: {
    totalApplications: number;
    individualApplications: number;
    corporateApplications: number;
    approvedMembers: number;
    pendingApplications: number;
  };
};

const cards = [
  {
    key: "totalApplications",
    label: "Total Applications",
  },
  {
    key: "individualApplications",
    label: "Individual Applications",
  },
  {
    key: "corporateApplications",
    label: "Corporate Applications",
  },
  {
    key: "approvedMembers",
    label: "Approved Applications",
  },
  {
    key: "pendingApplications",
    label: "Pending Applications",
  },
] as const;

export default function SummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-[var(--color-border)] bg-white p-3"
        >
          <p className="text-xs text-[var(--color-muted)]">
            {card.label}
          </p>

          <p className="mt-3 text-xl font-semibold text-[var(--color-navy)]">
            {summary[card.key].toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
