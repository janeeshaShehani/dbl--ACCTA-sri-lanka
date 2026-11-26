
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  FileText,
  UserRound,
  Building2,
  CalendarDays,
  Hash,
} from "lucide-react";

import {
  individualFieldGroups,
  corporateFieldGroups,
} from "./application-field-groups";

import ApplicationDocuments from "./ApplicationDocuments";
import DownloadApplicationPDF from "./DownloadApplicationPDF";

type ApplicationRecord = Record<string, unknown> & {
  id: string;
  registrationNumber?: string | null;
  corporateNumber?: string | null;
  applicationNumber?: string | null;
  status?: string;
  submittedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;

  documents?: Array<{
    id: string;
    documentType: string;
    originalName: string;
    fileSize?: string | number | null;
    uploadedAt?: string;
  }>;

  referees?: Array<{
    id: string;
    refereeNumber: number;
    fullName: string;
    email: string;
    phoneNumber: string;
  }>;
};

function formatFieldLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatFieldValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string") {
    const isDate = /^\d{4}-\d{2}-\d{2}T/.test(value);

    if (isDate) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
    }

    return value.replaceAll("_", " ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

function getStatusStyle(status: string) {
  const styles: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-700",
    SUBMITTED: "bg-blue-100 text-blue-700",
    UNDER_REVIEW: "bg-amber-100 text-amber-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return styles[status] ?? "bg-gray-100 text-gray-700";
}

export default function ApplicationDetailsPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id;
  const type = searchParams.get("type");

  const [application, setApplication] =
    useState<ApplicationRecord | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !type || !["individual", "corporate"].includes(type)) {
      setError("Invalid application details.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadApplication() {
      try {
        const response = await fetch(
          `/api/admin/membership-applications/${encodeURIComponent(id)}?type=${type}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load application."
          );
        }

        setApplication(data.application as ApplicationRecord);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadApplication();

    return () => controller.abort();
  }, [id, type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[#4a5263]">
        <Loader2 className="mr-2 animate-spin" size={20} />
        Loading application...
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="space-y-4 rounded-xl border border-[#dde1e8] bg-white p-8">
        <p className="text-red-600">
          {error || "Application not found."}
        </p>

        <button
          onClick={() => router.back()}
          className="text-sm font-semibold text-[#7b2329]"
        >
          Go back
        </button>
      </div>
    );
  }

  const isIndividual = type === "individual";

  const fieldGroups = isIndividual
    ? individualFieldGroups
    : corporateFieldGroups;

  const membershipNumber = isIndividual
    ? application.registrationNumber
    : application.corporateNumber;

  const applicationNumber = application.applicationNumber;

  const excludedFields = new Set([
    "id",
    "registrationNumber",
    "corporateNumber",
    "applicationNumber",
    "status",
    "submittedAt",
    "createdAt",
    "updatedAt",
    "documents",
    "referees",
  ]);

  return (
    <div className="space-y-6">

      {/* Back Button */}
      <button
        onClick={() =>
          router.push(
            isIndividual
              ? "/admin/individual-members"
              : "/admin/corporate-members"
          )
        }
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5263] hover:text-[#7b2329]"
      >
        <ArrowLeft size={17} />
        Back to {isIndividual ? "Individual Members" : "Corporate Members"}
      </button>

      {/* Page Heading */}
      <div>
        <p className="text-sm font-medium capitalize text-[#7b2329]">
          {type} Membership Application
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#1f2e4d]">
          Application Details
        </h1>

        <p className="mt-1 text-sm text-[#4a5263]">
          Review the applicant's submitted information.
        </p>
      </div>

      {/* Application Summary */}
      <section className="rounded-xl border border-[#dde1e8] bg-white p-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4a5263]">
              {isIndividual
                ? "Membership Number"
                : "Corporate Number"}
            </p>

            <h2 className="mt-2 text-lg font-bold text-[#1f2e4d]">
              {formatFieldValue(membershipNumber)}
            </h2>

            {applicationNumber && (
              <p className="mt-2 text-sm text-[#4a5263]">
                Application Number:{" "}
                <span className="font-semibold text-[#1f2e4d]">
                  {formatFieldValue(applicationNumber)}
                </span>
              </p>
            )}

            <p className="mt-2 flex items-center gap-2 text-xs text-[#4a5263]">
              <Hash size={14} />
              Application ID: {application.id}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span
              className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle(
                String(application.status ?? "")
              )}`}
            >
              {formatFieldValue(application.status)}
            </span>

            <span className="text-sm text-[#4a5263]">
              {isIndividual ? "Individual Member" : "Corporate Member"}
            </span>
            <DownloadApplicationPDF
                applicationId={application.id}
                applicationType={type as "individual" | "corporate"}
            />
          </div>
        </div>
      </section>

      {/* Application Tracking Information */}
      <section className="rounded-xl border border-[#dde1e8] bg-white p-6">
        <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-[#1f2e4d]">
          <CalendarDays size={19} />
          Application Tracking
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ["Submitted Date", application.submittedAt],
            ["Created Date", application.createdAt],
            ["Last Updated", application.updatedAt],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#4a5263]">
                {label}
              </p>

              <p className="text-sm text-[#1a1f2b]">
                {value ? formatFieldValue(value) : "—"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Topic-by-Topic Application Information */}
      {fieldGroups.map((group, index) => {
        const visibleFields = group.fields.filter(
          (key) =>
            !excludedFields.has(key) &&
            application[key] !== null &&
            application[key] !== undefined &&
            application[key] !== ""
        );

        if (visibleFields.length === 0) return null;

        return (
          <section
            key={group.title}
            className="rounded-xl border border-[#dde1e8] bg-white p-6"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-[#dde1e8] pb-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1f2e4d] text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2 className="text-lg font-bold text-[#1f2e4d]">
                {group.title}
              </h2>
            </div>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleFields.map((key) => (
                <div key={key} className="min-w-0">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#4a5263]">
                    {formatFieldLabel(key)}
                  </p>

                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#1a1f2b]">
                    {formatFieldValue(application[key])}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Referees - Individual Applications */}
      {isIndividual && (
        <section className="rounded-xl border border-[#dde1e8] bg-white p-6">
          <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-[#1f2e4d]">
            <UserRound size={20} />
            Referees
          </h2>

          {!application.referees?.length ? (
            <p className="text-sm text-[#4a5263]">
              No referees provided.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {application.referees.map((referee) => (
                <div
                  key={referee.id}
                  className="rounded-lg border border-[#dde1e8] bg-[#f4f6f9] p-5"
                >
                  <p className="font-bold text-[#1f2e4d]">
                    Referee {referee.refereeNumber}
                  </p>

                  <p className="mt-3 text-sm font-semibold text-[#1a1f2b]">
                    {referee.fullName}
                  </p>

                  <p className="mt-2 text-sm text-[#4a5263]">
                    {referee.email}
                  </p>

                  <p className="mt-1 text-sm text-[#4a5263]">
                    {referee.phoneNumber}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Uploaded Documents */}
      <section className="rounded-xl border border-[#dde1e8] bg-white p-6">
       
        <ApplicationDocuments
        documents={application.documents ?? []}
        applicationId={application.id}
        applicationType={type as "individual" | "corporate"}
        />

      </section>

    </div>
  );
}
