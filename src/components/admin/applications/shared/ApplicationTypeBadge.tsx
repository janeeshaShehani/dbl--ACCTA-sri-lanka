import type { ApplicationType } from "@/types/admin/application";

interface ApplicationTypeBadgeProps {
  type: ApplicationType;
}

export default function ApplicationTypeBadge({
  type,
}: ApplicationTypeBadgeProps) {
  const isIndividual = type === "individual";

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
        isIndividual
          ? "bg-blue-50 text-blue-700"
          : "bg-purple-50 text-purple-700"
      }`}
    >
      {isIndividual ? "Individual" : "Corporate"}
    </span>
  );
}