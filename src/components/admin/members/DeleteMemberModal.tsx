"use client";

import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

type DeleteMemberModalProps = {
  open: boolean;
  memberName: string;
  memberNumber: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteMemberModal({
  open,
  memberName,
  memberNumber,
  deleting,
  onCancel,
  onConfirm,
}: DeleteMemberModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-member-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="text-red-600" size={22} />
          </div>
          <div>
            <h2 id="delete-member-title" className="text-lg font-bold text-[#1f2e4d]">
              Delete member?
            </h2>
            <p className="mt-1 text-sm text-[#4a5263]">This action cannot be undone.</p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#dde1e8] bg-[#f4f6f9] p-4">
          <p className="text-xs text-[#4a5263]">Member name</p>
          <p className="mt-1 font-semibold text-[#1f2e4d]">{memberName}</p>
          <p className="mt-3 text-xs text-[#4a5263]">Member number</p>
          <p className="mt-1 font-semibold text-[#7b2329]">{memberNumber}</p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-lg border border-[#dde1e8] px-4 py-2.5 text-sm font-semibold text-[#1f2e4d] hover:bg-[#f4f6f9] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <><Loader2 size={16} className="animate-spin" /> Deleting...</>
            ) : (
              <><Trash2 size={16} /> Delete {memberNumber}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
