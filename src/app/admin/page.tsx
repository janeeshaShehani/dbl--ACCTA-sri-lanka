
import { LayoutDashboard } from "lucide-react";
import ApplicationAnalytics from "@/components/admin/dashboard/ApplicationAnalytics";

export default function AdminDashboard() {
  return (
    <div className="space-y-2">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-[#7b2329]">
        <LayoutDashboard size={15} />
        ACCTA ADMINISTRATION
      </div>

      <p className="text-sm text-[#687184]">
        Welcome to the ACCTA Sri Lanka Administration Portal.
      </p>

      <ApplicationAnalytics />
    </div>
  );
}
