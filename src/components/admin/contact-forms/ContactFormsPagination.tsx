
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  currentCount: number;
  onPageChange: (page: number) => void;
};

export default function ContactFormsPagination({
  page,
  totalPages,
  total,
  limit,
  currentCount,
  onPageChange,
}: Props) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = (page - 1) * limit + currentCount;

  return (
    <div className="flex flex-col justify-between gap-3 border-t border-[#dde1e8] px-5 py-4 sm:flex-row sm:items-center">
      <p className="text-sm text-[#7a8290]">
        Showing{" "}
        <span className="font-semibold text-[#1f2e4d]">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#1f2e4d]">{total}</span>{" "}
        enquiries
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="px-2 text-sm text-[#4a5263]">
          Page {page} of {Math.max(totalPages, 1)}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
