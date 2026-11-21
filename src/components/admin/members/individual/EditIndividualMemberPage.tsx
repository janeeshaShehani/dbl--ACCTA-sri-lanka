"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { membershipClasses } from "@/data/membershipClasses";
import { individualFieldGroups } from "@/components/admin/applications/details/application-field-groups";

type ApplicationData = Record<string, unknown> & {
  id: string;
  status: string;
  registrationNumber?: string | null;
  applicationNumber?: string | null;
};

type SelectOption = {
  label: string;
  value: string;
};

const protectedFields = new Set([
  "registrationNumber",
  "applicationNumber",
  "normalizedIdentificationNumber",
  "status",
  "id",
  "createdAt",
  "updatedAt",
  "submittedAt",
]);

const booleanFields = new Set([
  "disciplinaryAction",
  "criminalOffence",
  "currentInvestigation",
  "bankruptOrInsolvent",
  "membershipSuspended",
  "falseInformation",
  "otherRelevantMatter",
  "informationAccepted",
  "ageAccepted",
  "rulesAccepted",
  "designationAccepted",
  "renewalAccepted",
  "changesAccepted",
  "contributionAccepted",
  "consentAccepted",
]);

const dateFields = new Set(["dateOfBirth", "declarationDate"]);

const selectOptions: Record<string, SelectOption[]> = {
  residency: [
    { label: "Sri Lanka", value: "SRI_LANKA" },
    { label: "International", value: "INTERNATIONAL" },
  ],
  title: [
    { label: "Mr.", value: "Mr." },
    { label: "Mrs.", value: "Mrs." },
    { label: "Ms.", value: "Ms." },
    { label: "Miss", value: "Miss" },
    { label: "Dr.", value: "Dr." },
    { label: "Prof.", value: "Prof." },
  ],
  gender: [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
    { label: "Other", value: "Other" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ],
  preferredLanguage: [
    { label: "English", value: "English" },
    { label: "Sinhala", value: "Sinhala" },
    { label: "Tamil", value: "Tamil" },
  ],
  feeCurrency: [
    { label: "LKR", value: "LKR" },
    { label: "USD", value: "USD" },
  ],
};

const textareaFields = new Set([
  "residentialAddress",
  "officialAddress",
  "mailingAddress",
  "academicQualifications",
  "professionalQualifications",
  "currentEmployment",
  "relevantExperience",
  "areasOfExpertise",
  "professionalStatement",
  "fitAndProperDetails",
]);

const emailFields = new Set(["personalEmail", "officialEmail"]);
const numberFields = new Set(["applicationFee", "annualSubscription"]);

const individualMembershipClasses = membershipClasses.filter(
  (membership) =>
    membership.id !== "corporate" && membership.id !== "honorary"
);

function formatLabel(field: string) {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function inputValue(value: unknown, field: string): string {
  if (value === null || value === undefined) return "";

  if (dateFields.has(field)) {
    const rawValue = value instanceof Date ? value.toISOString() : String(value);
    return rawValue.slice(0, 10);
  }

  return String(value);
}

export default function EditIndividualMemberPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadApplication() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/membership-applications/${encodeURIComponent(id)}?type=individual`,
          { cache: "no-store" }
        );
        const data = await response.json();

        if (!response.ok || !data.success || !data.application) {
          throw new Error(data.message || "Unable to load application.");
        }

        const applicationData = data.application as ApplicationData;
        setApplication(applicationData);

        const editableData: Record<string, unknown> = {};
        for (const group of individualFieldGroups) {
          for (const field of group.fields) {
            if (!protectedFields.has(field)) {
              editableData[field] = applicationData[field] ?? null;
            }
          }
        }
        setFormData(editableData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load application."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) void loadApplication();
  }, [id]);

  function updateField(field: string, value: unknown) {
    setFormData((previous) => ({ ...previous, [field]: value }));
  }

  const selectedMembership = useMemo(
    () =>
      individualMembershipClasses.find(
        (membership) => membership.letters === formData.membershipCategory
      ),
    [formData.membershipCategory]
  );

  const isStandardCategory =
    formData.membershipCategory === "ACTA" ||
    formData.membershipCategory === "FCTA";

  const selectedFee =
    formData.residency === "SRI_LANKA" || formData.residency === "sri-lanka"
      ? selectedMembership?.applicationFee?.lkr
      : selectedMembership?.applicationFee?.usd;

  const selectedSubscription =
    formData.residency === "SRI_LANKA" || formData.residency === "sri-lanka"
      ? selectedMembership?.annualSubscription?.lkr
      : selectedMembership?.annualSubscription?.usd;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload: Record<string, unknown> = { ...formData };

      // Empty optional strings and dates are sent as null.
      for (const [field, value] of Object.entries(payload)) {
        if (typeof value === "string" && value.trim() === "") {
          payload[field] = null;
        }
      }

      for (const field of dateFields) {
        if (payload[field] === "" || payload[field] === undefined) {
          payload[field] = null;
        }
      }

      // Validate and convert fee fields to numbers.
      for (const field of numberFields) {
        const value = payload[field];
        if (value === null || value === undefined) continue;

        const numberValue = Number(value);
        if (!Number.isFinite(numberValue) || numberValue < 0) {
          throw new Error(`Please enter a valid ${formatLabel(field)}.`);
        }
        payload[field] = numberValue;
      }

      const response = await fetch(
        `/api/admin/individual-members/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save changes.");
      }

      setSuccess("Individual application updated successfully.");
      window.setTimeout(() => {
        router.push(`/admin/membership-applications/${id}?type=individual`);
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setSaving(false);
    }
  }

  function renderMembershipCategory() {
    const currentValue = String(formData.membershipCategory ?? "");
    const currentValueExists = individualMembershipClasses.some(
      (membership) => membership.letters === currentValue
    );

    return (
      <div className="space-y-1.5 md:col-span-2" key="membershipCategory">
        <label
          htmlFor="membershipCategory"
          className="text-sm font-medium text-[#1f2e4d]"
        >
          Membership Category
        </label>
        <select
          id="membershipCategory"
          value={currentValue}
          onChange={(event) =>
            updateField("membershipCategory", event.target.value || null)
          }
          className="w-full rounded-lg border border-[#dde1e8] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1f2e4d]"
        >
          <option value="">Select a category</option>
          {!currentValueExists && currentValue && (
            <option value={currentValue}>{currentValue} (Existing value)</option>
          )}
          {individualMembershipClasses.map((membership) => (
            <option key={membership.id} value={membership.letters}>
              {membership.category} ({membership.letters})
            </option>
          ))}
        </select>

        {selectedMembership && (
          <div className="mt-3 rounded-lg border border-[#dde1e8] bg-[#f4f6f9] p-4">
            <h3 className="font-semibold text-[#1f2e4d]">
              {selectedMembership.category}
            </h3>
            <p className="mt-2 text-sm text-[#4a5263]">
              {selectedMembership.eligibility}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#4a5263]">
                  Application Fee
                </p>
                <p className="mt-1 font-bold text-[#1f2e4d]">
                  {selectedFee || "Not applicable"}
                </p>
              </div>
              <div className="rounded-md bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#4a5263]">
                  Annual Subscription
                </p>
                <p className="mt-1 font-bold text-[#1f2e4d]">
                  {selectedSubscription || "Not applicable"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderField(field: string) {
    if (protectedFields.has(field)) return null;

    const value = formData[field];

    if (field === "membershipCategory") {
      return renderMembershipCategory();
    }

    if (booleanFields.has(field)) {
      return (
        <label
          key={field}
          className="flex items-center gap-3 rounded-lg border border-[#dde1e8] p-3"
        >
          <input
            type="checkbox"
            checked={value === true}
            onChange={(event) => updateField(field, event.target.checked)}
            className="h-4 w-4 accent-[#7b2329]"
          />
          <span className="text-sm text-[#1a1f2b]">{formatLabel(field)}</span>
        </label>
      );
    }

    if (field === "admissionRoute") {
      const options: SelectOption[] = [
        { label: "ACCTA Examination Route", value: "ACCTA_EXAMINATION" },
        {
          label: "Recognised Qualification Route",
          value: "RECOGNISED_QUALIFICATION",
        },
        ...(isStandardCategory
          ? [{ label: "Mature Entry Route", value: "MATURE_ENTRY" }]
          : []),
      ];
      const currentValue = String(value ?? "");
      const hasCurrentValue = options.some(
        (option) => option.value === currentValue
      );

      return (
        <div key={field} className="space-y-1.5">
          <label htmlFor={field} className="text-sm font-medium text-[#1f2e4d]">
            Route of Admission
          </label>
          <select
            id={field}
            value={currentValue}
            onChange={(event) => updateField(field, event.target.value || null)}
            className="w-full rounded-lg border border-[#dde1e8] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1f2e4d]"
          >
            <option value="">Select a route</option>
            {!hasCurrentValue && currentValue && (
              <option value={currentValue}>{currentValue} (Existing value)</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (selectOptions[field]) {
      const options = [...selectOptions[field]];
      const currentValue = String(value ?? "");
      if (
        currentValue &&
        !options.some((option) => option.value === currentValue)
      ) {
        options.unshift({ label: currentValue, value: currentValue });
      }

      return (
        <div key={field} className="space-y-1.5">
          <label htmlFor={field} className="text-sm font-medium text-[#1f2e4d]">
            {formatLabel(field)}
          </label>
          <select
            id={field}
            value={currentValue}
            onChange={(event) => updateField(field, event.target.value || null)}
            className="w-full rounded-lg border border-[#dde1e8] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1f2e4d]"
          >
            <option value="">Select {formatLabel(field)}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    const isTextarea = textareaFields.has(field);
    const inputType = dateFields.has(field)
      ? "date"
      : emailFields.has(field)
        ? "email"
        : numberFields.has(field)
          ? "number"
          : "text";

    return (
      <div key={field} className="space-y-1.5">
        <label htmlFor={field} className="text-sm font-medium text-[#1f2e4d]">
          {formatLabel(field)}
        </label>
        {isTextarea ? (
          <textarea
            id={field}
            rows={4}
            value={inputValue(value, field)}
            onChange={(event) => updateField(field, event.target.value)}
            className="w-full rounded-lg border border-[#dde1e8] px-3 py-2.5 text-sm outline-none focus:border-[#1f2e4d]"
          />
        ) : (
          <input
            id={field}
            type={inputType}
            min={numberFields.has(field) ? "0" : undefined}
            step={numberFields.has(field) ? "0.01" : undefined}
            value={inputValue(value, field)}
            onChange={(event) => updateField(field, event.target.value)}
            className="w-full rounded-lg border border-[#dde1e8] px-3 py-2.5 text-sm outline-none focus:border-[#1f2e4d]"
          />
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-2 text-[#4a5263]">
        <Loader2 className="animate-spin" />
        Loading application...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="rounded-xl border border-[#dde1e8] bg-white p-8 text-center">
        <p className="font-semibold text-[#1f2e4d]">Application not found</p>
        <p className="mt-2 text-sm text-[#4a5263]">{error}</p>
        <Link
          href="/admin/individual-members"
          className="mt-4 inline-flex text-sm font-semibold text-[#7b2329]"
        >
          Back to Individual Members
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/admin/individual-members"
            className="mb-3 inline-flex items-center gap-2 text-sm text-[#4a5263] hover:text-[#7b2329]"
          >
            <ArrowLeft size={16} />
            Back to Individual Members
          </Link>
          <h1 className="text-2xl font-bold text-[#1f2e4d]">
            Edit Individual Application
          </h1>
          <p className="mt-1 text-sm text-[#4a5263]">
            Application number: {String(
              application.applicationNumber ??
                application.registrationNumber ??
                "Not assigned"
            )}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7b2329] px-5 py-3 text-sm font-semibold text-white hover:bg-[#15203a] disabled:opacity-60"
        >
          {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {individualFieldGroups.map((group) => {
        const fields = group.fields.filter(
          (field) => !protectedFields.has(field)
        );
        if (!fields.length) return null;

        return (
          <section
            key={group.title}
            className="overflow-hidden rounded-xl border border-[#dde1e8] bg-white"
          >
            <div className="border-b border-[#dde1e8] bg-[#f4f6f9] px-5 py-4">
              <h2 className="font-semibold text-[#1f2e4d]">{group.title}</h2>
            </div>
            <div className="grid gap-5 p-5 md:grid-cols-2">
              {fields.map((field) => renderField(field))}
            </div>
          </section>
        );
      })}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7b2329] px-6 py-3 text-sm font-semibold text-white hover:bg-[#15203a] disabled:opacity-60"
        >
          <Save size={17} />
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
