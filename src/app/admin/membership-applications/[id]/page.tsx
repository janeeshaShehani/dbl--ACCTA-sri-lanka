
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  CalendarDays,
  UserRound,
  Building2,
  CheckCircle2,
  Clock,
} from "lucide-react";

import applicationData from "@/data/apply-membership-applications.json";

type RecordData = Record<string, unknown>;

const data = applicationData as {
  individualApplications: RecordData[];
  corporateApplications: RecordData[];
};

function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "-";
}

function formatFieldName(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatFieldValue(key: string, value: unknown) {
  if (typeof value !== "string" || !value) {
    return displayValue(value);
  }

  if (key.toLowerCase().includes("date") || key === "submittedAt") {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  }

  return value;
}

function DocumentItem({ document }: { document: RecordData }) {
  const name = displayValue(document.name);
  const path = typeof document.path === "string" ? document.path : "";

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-[#e5e8ee] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="rounded-md bg-[#f7eeee] p-2 text-[#7b2329]">
          <FileText size={19} />
        </div>

        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-[#1f2e4d]">
            {name}
          </p>
          <p className="mt-1 text-[11px] text-[#8992a1]">
            Supporting document
          </p>
        </div>
      </div>

      {path ? (
        <a
          href={`/${path.replace(/^\/+/, "")}`}
          download
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#dde1e8] px-3 py-2 text-xs font-medium text-[#1f2e4d] transition hover:border-[#7b2329] hover:text-[#7b2329]"
        >
          <Download size={14} />
          Download
        </a>
      ) : (
        <span className="text-xs text-[#8992a1]">-</span>
      )}
    </div>
  );
}

function FieldValue({
  fieldKey,
  value,
}: {
  fieldKey: string;
  value: unknown;
}) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-sm text-[#8992a1]">-</span>;
  }

  if (typeof value === "boolean") {
    return (
      <span className="text-sm font-medium text-[#1f2e4d]">
        {value ? "Yes" : "No"}
      </span>
    );
  }

  if (typeof value === "string" || typeof value === "number") {
    return (
      <span className="whitespace-pre-line break-words text-sm text-[#30394a]">
        {formatFieldValue(fieldKey, value)}
      </span>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-sm text-[#8992a1]">-</span>;
    }

    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index}>
            {typeof item === "object" && item !== null ? (
              <NestedFields value={item as RecordData} />
            ) : (
              <FieldValue fieldKey={fieldKey} value={item} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const objectValue = value as RecordData;

    if ("name" in objectValue && "path" in objectValue) {
      return <DocumentItem document={objectValue} />;
    }

    if (Object.keys(objectValue).length === 0) {
      return <span className="text-sm text-[#8992a1]">-</span>;
    }

    return <NestedFields value={objectValue} />;
  }

  return <span className="text-sm text-[#8992a1]">-</span>;
}

function NestedFields({ value }: { value: RecordData }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Object.entries(value).map(([key, fieldValue]) => (
        <div
          key={key}
          className="min-w-0 rounded-md bg-[#f7f8fa] p-3"
        >
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#8992a1]">
            {formatFieldName(key)}
          </p>

          <FieldValue fieldKey={key} value={fieldValue} />
        </div>
      ))}
    </div>
  );
}

function getApplicationName(
  application: RecordData,
  isCorporate: boolean
) {
  return isCorporate
    ? displayValue(application.registeredName)
    : displayValue(application.fullName);
}

function FilesIcon({ size = 18 }: { size?: number }) {
  return <FileText size={size} />;
}

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const individual = data.individualApplications.find(
    (item) => item.id === id
  );

  const corporate = data.corporateApplications.find(
    (item) => item.id === id
  );

  const application = individual || corporate;
  const isCorporate = Boolean(corporate);

  if (!application) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <FileText size={42} className="mb-4 text-[#aab1bd]" />

        <h1 className="font-serif text-2xl font-bold text-[#1f2e4d]">
          Application Not Found
        </h1>

        <p className="mt-2 text-sm text-[#687184]">
          The requested membership application could not be found.
        </p>

        <Link
          href="/admin/membership-applications"
          className="mt-5 rounded-md bg-[#7b2329] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Back to Applications
        </Link>
      </div>
    );
  }

  const status = "Pending";

  const sections = [
    {
      title: "Application Information",
      icon: FilesIcon,
      keys: [
        "id",
        "registrationNumber",
        "membershipCategory",
        "admissionRoute",
        "residency",
        "country",
        "submittedAt",
      ],
    },
    {
      title: isCorporate ? "Company Information" : "Personal Information",
      icon: isCorporate ? Building2 : UserRound,
      keys: isCorporate
        ? [
            "registeredName",
            "tradingName",
            "otherLegalEntity",
            "legalForm",
            "registrationDate",
            "registrationCountry",
            "tinNumber",
            "vatNumber",
          ]
        : [
            "title",
            "fullName",
            "initialsName",
            "preferredName",
            "dateOfBirth",
            "gender",
            "nationality",
            "identificationNumber",
            "preferredLanguage",
          ],
    },
    {
      title: "Contact Information",
      icon: UserRound,
      keys: isCorporate
        ? [
            "registeredAddress",
            "tradingAddress",
            "website",
            "officePhone",
            "officialEmail",
          ]
        : [
            "residentialAddress",
            "officialAddress",
            "mailingAddress",
            "mobile",
            "whatsapp",
            "officePhone",
            "personalEmail",
            "officialEmail",
            "linkedIn",
          ],
    },
    {
      title: isCorporate ? "Company Profile" : "Professional Information",
      icon: Building2,
      keys: isCorporate
        ? [
            "staffCount",
            "directors",
            "shareholders",
            "parentFirm",
            "services",
            "yearsInTaxation",
            "registrations",
            "clientProfile",
            "firmProfile",
          ]
        : [
            "practisingIntention",
            "professionalInsurance",
            "qualifications",
            "professionalMemberships",
            "employmentDetails",
            "experience",
            "expertise",
            "statement",
          ],
    },
    {
      title: isCorporate ? "Representatives" : "Referees",
      icon: UserRound,
      keys: isCorporate
        ? [
            "nominatedRepresentative",
            "nominatedEmail",
            "nominatedPhone",
            "alternateRepresentative",
            "alternateEmail",
            "alternatePhone",
          ]
        : [
            "refereeOneName",
            "refereeOneEmail",
            "refereeOnePhone",
            "refereeTwoName",
            "refereeTwoEmail",
            "refereeTwoPhone",
          ],
    },
    {
      title: "Fit and Proper Declaration",
      icon: CheckCircle2,
      keys: ["fitAndProperAnswers", "fitAndProperDetails"],
    },
    {
      title: "Supporting Documents",
      icon: FileText,
      keys: ["documents"],
    },
    {
      title: isCorporate ? "Payment Information" : "Declaration",
      icon: CalendarDays,
      keys: isCorporate
        ? [
            "signatoryOne",
            "signatoryTwo",
            "resolutionDate",
            "declarationAccepted",
            "totalAmountPaid",
            "paymentMethod",
            "paymentReference",
            "paymentDate",
          ]
        : [
            "declarationInformationAccepted",
            "declarationAgeAccepted",
            "declarationRulesAccepted",
            "declarationDesignationAccepted",
            "declarationRenewalAccepted",
            "declarationChangesAccepted",
            "declarationContributionAccepted",
            "declarationConsentAccepted",
            "declarationName",
            "declarationDate",
            "declarationPlace",
          ],
    },
  ];

  return (
    <div className="w-full px-4 py-5 sm:px-6 lg:px-8">
      {/* MAIN CONTENT: MAXIMUM WIDTH 1300PX */}
      <div className="mx-auto w-full max-w-[1200px] space-y-6">

        {/* Breadcrumb and heading */}
        <section>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#7b2329]">
            ACCTA Administration
            <span className="text-[#a0a5af]">/</span>

            <Link
              href="/admin/membership-applications"
              className="text-[#687184] hover:text-[#7b2329]"
            >
              Membership Applications
            </Link>

            <span className="text-[#a0a5af]">/</span>

            <span className="font-normal normal-case tracking-normal text-[#687184]">
              Application Details
            </span>
          </div>

          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-[#687184] hover:text-[#7b2329]"
          >
            <ArrowLeft size={15} />
            Back to Applications
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#1f2e4d]">
                Application Details
              </h1>

              <p className="mt-1.5 text-sm text-[#687184]">
                Complete submitted {isCorporate ? "corporate" : "individual"} membership application.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff5df] px-3 py-1.5 text-xs font-semibold text-[#986817]">
              <Clock size={14} />
              {status}
            </span>
          </div>
        </section>

        {/* Application summary */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Registration Number",
              value: displayValue(application.registrationNumber),
            },
            {
              label: "Applicant / Company",
              value: getApplicationName(application, isCorporate),
            },
            {
              label: "Membership Category",
              value: displayValue(application.membershipCategory),
            },
            {
              label: "Submitted Date",
              value: formatFieldValue(
                "submittedAt",
                application.submittedAt
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-[#dde1e8] bg-white p-4 shadow-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8992a1]">
                {item.label}
              </p>

              <p className="mt-2 break-words text-sm font-semibold text-[#1f2e4d]">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* All application sections */}
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <section
              key={section.title}
              className="overflow-hidden rounded-lg border border-[#dde1e8] bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 border-b border-[#e9ecf1] px-5 py-4">
                <div className="rounded-md bg-[#f7eeee] p-2 text-[#7b2329]">
                  <Icon size={17} />
                </div>

                <h2 className="font-serif text-lg font-bold text-[#1f2e4d]">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
                {section.keys.map((key) => (
                  <div
                    key={key}
                    className={
                      key === "documents" || key === "fitAndProperAnswers"
                        ? "min-w-0 sm:col-span-2"
                        : "min-w-0"
                    }
                  >
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#8992a1]">
                      {formatFieldName(key)}
                    </p>

                    <FieldValue
                      fieldKey={key}
                      value={application[key]}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom section */}
        <div className="flex flex-col justify-between gap-3 rounded-lg border border-[#dde1e8] bg-white p-4 sm:flex-row sm:items-center">
          <p className="break-all text-xs text-[#687184]">
            Application ID: {displayValue(application.id)}
          </p>

          <Link
            href="/admin/membership-applications"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1f2e4d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#15203a]"
          >
            <ArrowLeft size={14} />
            Back to Applications
          </Link>
        </div>

      </div>
    </div>
  );
}
