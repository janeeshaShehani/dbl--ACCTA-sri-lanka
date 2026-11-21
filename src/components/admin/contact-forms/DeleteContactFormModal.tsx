
import { AlertTriangle, X } from "lucide-react";
import { ContactEnquiry } from "./types";

type Props = {
  enquiry: ContactEnquiry | null;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteContactFormModal({
  enquiry,
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  if (!enquiry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="ml-auto block text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <AlertTriangle size={36} className="mx-auto text-red-600" />

          <h2 className="mt-4 font-serif text-xl font-bold text-[#1f2e4d]">
            Delete Enquiry?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#4a5263]">
            Are you sure you want to permanently delete the enquiry submitted
            by <strong>{enquiry.fullName}</strong>?
          </p>
          <p className="mt-1 text-xs text-red-600">
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-[#dde1e8] px-4 py-2.5 text-sm font-semibold text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-lg bg-[#7b2329] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#641c21] disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
