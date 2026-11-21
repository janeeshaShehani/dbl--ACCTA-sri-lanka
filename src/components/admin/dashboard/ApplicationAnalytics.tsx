
"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Statistics = {
  total: number;
  individual: number;
  corporate: number;
  draft: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
};

const statusItems = [
  { key: "draft", label: "Draft", color: "bg-gray-400", icon: Clock },
  { key: "pending", label: "Pending", color: "bg-amber-500", icon: Clock },
  { key: "underReview", label: "Under Review", color: "bg-blue-500", icon: FileCheck },
  { key: "approved", label: "Approved", color: "bg-green-600", icon: CheckCircle2 },
  { key: "rejected", label: "Rejected", color: "bg-[#7b2329]", icon: XCircle },
] as const;

export default function ApplicationAnalytics() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const response = await fetch("/api/admin/dashboard");
        const result = await response.json();

        if (result.success) {
          setStats(result.statistics);
        }
      } catch (error) {
        console.error("Failed to load application analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStatistics();
  }, []);

  if (loading) {
    return <p className="mt-10 text-sm text-[#687184]">Loading analytics...</p>;
  }

  if (!stats) {
    return <p className="mt-10 text-sm text-red-600">Unable to load analytics.</p>;
  }

  const individualPercentage = stats.total
    ? (stats.individual / stats.total) * 100
    : 0;

  const corporatePercentage = stats.total
    ? (stats.corporate / stats.total) * 100
    : 0;

  return (
    <section className="mt-3 space-y-6">

      {/* Application type comparison */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-[#dde1e8] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#687184]">Individual Applications</p>
              <h3 className=" text-xl font-bold text-[#1f2e4d]">
                {stats.individual}
              </h3>
            </div>
            <div className="rounded-lg bg-[#1f2e4d] p-3 text-white">
              <Users size={10} />
            </div>
          </div>

          <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#1f2e4d]"
              style={{ width: `${individualPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#687184]">
            {individualPercentage.toFixed(1)}% of total applications
          </p>
        </div>

        <div className="rounded-xl border border-[#dde1e8] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#687184]">Corporate Applications</p>
              <h3 className=" text-xl font-bold text-[#1f2e4d]">
                {stats.corporate}
              </h3>
            </div>
            <div className="rounded-lg bg-[#7b2329] p-3 text-white">
              <Building2 size={10} />
            </div>
          </div>

          <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#7b2329]"
              style={{ width: `${corporatePercentage}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#687184]">
            {corporatePercentage.toFixed(1)}% of total applications
          </p>
        </div>
      </div>

      {/* Application status */}
      <div className="rounded-xl border border-[#dde1e8] bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#1f2e4d]">
              Application Status Distribution
            </h3>
            <p className="mt-1 text-xs text-[#687184]">
              Total applications: {stats.total}
            </p>
          </div>
          <FileCheck className="text-[#7b2329]" size={20} />
        </div>

        <div className="space-y-3">
          {statusItems.map((item) => {
            const count = stats[item.key];
            const percentage = stats.total
              ? (count / stats.total) * 100
              : 0;
            const Icon = item.icon;

            return (
              <div key={item.key}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-sm text-[#1a1f2b]">
                    <Icon size={16} className="text-[#687184]" />
                    {item.label}
                  </div>
                  <span className="text-xs font-semibold text-[#1f2e4d]">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
