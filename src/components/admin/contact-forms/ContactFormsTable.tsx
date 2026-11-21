
import { Eye, Trash2 } from "lucide-react";
import { ContactEnquiry, ContactStatus } from "./types";

type Props = {
  enquiries: ContactEnquiry[];
  loading: boolean;
  onView: (enquiry: ContactEnquiry) => void;
  onDelete: (enquiry: ContactEnquiry) => void;
  onStatusChange: (id: string, status: ContactStatus) => void;
};

export default function ContactFormsTable({
  enquiries,
  loading,
  onView,
  onDelete,
  onStatusChange,
}: Props) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-left">
        <thead className="bg-[#f4f6f9]">
          <tr className="text-xs font-semibold uppercase text-[#4a5263]">
            <th className="px-5 py-4">Name / Email</th>
            <th className="px-5 py-4">Enquiry Type</th>
            <th className="px-5 py-4">Date Received</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#edf0f4]">
          {loading ? (
            <tr>
              <td colSpan={5} className="p-10 text-center text-gray-500">
                Loading enquiries...
              </td>
            </tr>
          ) : enquiries.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-10 text-center text-gray-500">
                No enquiries found.
              </td>
            </tr>
          ) : (
            enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-[#fafbfc]">
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#1f2e4d]">
                    {enquiry.fullName}
                  </p>
                  <p className="mt-1 text-sm text-[#7a8290]">
                    {enquiry.email}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-[#4a5263]">
                  {enquiry.enquiryType}
                </td>

                <td className="px-5 py-4 text-sm text-[#4a5263]">
                  {formatDate(enquiry.createdAt)}
                </td>

                <td className="px-5 py-4">
                  <select
                    value={enquiry.status}
                    onChange={(e) =>
                      onStatusChange(
                        enquiry.id,
                        e.target.value as ContactStatus
                      )
                    }
                    className={`rounded-full border px-3 py-2 text-xs font-semibold outline-none ${
                      enquiry.status === "CONTACTED"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    <option value="NOT_CONTACTED">Not Yet Contacted</option>
                    <option value="CONTACTED">Contacted</option>
                  </select>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      title="View enquiry"
                      onClick={() => onView(enquiry)}
                      className="rounded-lg border border-[#dde1e8] p-2 text-[#1f2e4d] hover:bg-[#f4f6f9]"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      title="Delete enquiry"
                      onClick={() => onDelete(enquiry)}
                      className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
