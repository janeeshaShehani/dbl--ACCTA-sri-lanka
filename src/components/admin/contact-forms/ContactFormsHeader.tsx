
import { RefreshCw } from "lucide-react";

type Props = {
  onRefresh: () => void;
  loading: boolean;
};

export default function ContactFormsHeader({ onRefresh, loading }: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-1 text-sm font-medium text-[#7b2329]">
          Administration
        </p>
        <h1 className="font-serif text-3xl font-bold text-[#1f2e4d]">
          Contact Forms
        </h1>
        <p className="mt-2 text-sm text-[#4a5263]">
          Manage and respond to website enquiries.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-lg border border-[#dde1e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#1f2e4d] hover:bg-gray-50 disabled:opacity-50"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        Refresh
      </button>
    </div>
  );
}
next