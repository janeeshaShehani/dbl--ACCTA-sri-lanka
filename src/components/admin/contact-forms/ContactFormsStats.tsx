
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import { ContactStats } from "./types";

type Props = {
  stats: ContactStats;
};

export default function ContactFormsStats({ stats }: Props) {
  const cards = [
    {
      label: "Total Enquiries",
      value: stats.total,
      icon: MessageSquare,
    },
    {
      label: "Not Yet Contacted",
      value: stats.notContacted,
      icon: Clock,
    },
    {
      label: "Contacted",
      value: stats.contacted,
      icon: CheckCircle2,
    },
    {
      label: "Today's Enquiries",
      value: stats.today,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-xl border border-[#dde1e8] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[#4a5263]">
                {card.label}
              </p>
              <div className="rounded-lg bg-[#f4f6f9] p-2.5 text-[#7b2329]">
                <Icon size={15} />
              </div>
            </div>

            <p className="mt-3 text-xl font-bold text-[#1f2e4d]">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
