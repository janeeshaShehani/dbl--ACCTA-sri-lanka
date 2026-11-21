
import { Search, Filter } from "lucide-react";

type Props = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export default function ContactFormsToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-[#dde1e8] p-5 lg:flex-row lg:items-center">
      <div>
        <h2 className="font-serif text-xl font-bold text-[#1f2e4d]">
          Received Enquiries
        </h2>
        <p className="mt-1 text-sm text-[#4a5263]">
          Search and manage website contact submissions.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search enquiries..."
            className="w-full rounded-lg border border-[#dde1e8] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1f2e4d] sm:w-64"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#dde1e8] bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-[#1f2e4d] sm:w-48"
          >
            <option value="ALL">All statuses</option>
            <option value="NOT_CONTACTED">Not Yet Contacted</option>
            <option value="CONTACTED">Contacted</option>
          </select>
        </div>
      </div>
    </div>
  );
}
