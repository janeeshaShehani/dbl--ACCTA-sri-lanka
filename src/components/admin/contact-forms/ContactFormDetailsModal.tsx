
import { X, Mail, Phone, CalendarDays } from "lucide-react";
import { ContactEnquiry } from "./types";

type Props = {
  enquiry: ContactEnquiry | null;
  onClose: () => void;
};

export default function ContactFormDetailsModal({
  enquiry,
  onClose,
}: Props) {
  if (!enquiry) return null;

  const receivedDate = new Date(enquiry.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <p className="text-sm text-[#7b2329]">Contact submission</p>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#1f2e4d]">
              Enquiry Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={21} />
          </button>
        </div>

        {/* Enquiry information */}
        <div className="space-y-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-[#f4f6f9] p-4">
              <p className="text-xs font-semibold uppercase text-[#7a8290]">
                Full Name
              </p>
              <p className="mt-2 font-semibold text-[#1f2e4d]">
                {enquiry.fullName}
              </p>
            </div>

            <div className="rounded-lg bg-[#f4f6f9] p-4">
              <p className="text-xs font-semibold uppercase text-[#7a8290]">
                Enquiry Type
              </p>
              <p className="mt-2 font-semibold text-[#1f2e4d]">
                {enquiry.enquiryType}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-[#4a5263]">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#7b2329]" />
              <span>{enquiry.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#7b2329]" />
              <span>{enquiry.phone || "Not provided"}</span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays size={18} className="text-[#7b2329]" />
              <span>{receivedDate}</span>
            </div>
          </div>

          {/* Complete message */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7a8290]">
              Submitted Message
            </p>

            <div className="min-h-32 whitespace-pre-wrap break-words rounded-lg border border-[#dde1e8] bg-white p-4 text-sm leading-7 text-[#1a1f2b]">
              {enquiry.message}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-semibold uppercase text-[#7a8290]">
              Current Status
            </p>
            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                enquiry.status === "CONTACTED"
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {enquiry.status === "CONTACTED"
                ? "Contacted"
                : "Not Yet Contacted"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
