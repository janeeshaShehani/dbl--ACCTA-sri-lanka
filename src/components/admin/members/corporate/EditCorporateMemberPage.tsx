
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { corporateFieldGroups } from "@/components/admin/applications/details/application-field-groups";

type FormData = Record<string, unknown>;

const dateFields = [
  "registrationDate",
  "resolutionDate",
  "paymentDate",
];

const numberFields = [
  "numberOfEmployees",
  "yearsOfTaxExperience",
];

const amountFields = [
  "applicationFee",
  "annualSubscription",
  "totalAmountPaid",
];

const nullableBooleanFields = [
  "fitProperF1",
  "fitProperF2",
  "fitProperF3",
  "fitProperF4",
  "fitProperF5",
  "fitProperF6",
];

const textareaFields = [
  "registeredAddress",
  "tradingAddress",
  "directorsAndKeyOfficers",
  "shareholdersAndOwnership",
  "parentFirmOrGroup",
  "servicesOffered",
  "professionalRegistrations",
  "typicalClientProfile",
  "briefFirmProfile",
  "fitProperDetails",
];

const protectedFields = [
  "id",
  "applicationNumber",
  "corporateNumber",
  "status",
  "createdAt",
  "updatedAt",
  "submittedAt",
];

const legalFormOptions = [
  "Partnership",
  "Private Limited Company",
  "Public Limited Company",
  "Other legal entity",
];

const paymentMethodOptions = [
  { value: "bank-transfer", label: "Bank transfer" },
  { value: "cheque", label: "Cheque" },
  { value: "online-payment", label: "Online payment" },
];

function formatLabel(field: string) {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatDate(value: unknown) {
  if (!value) return "";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) return "";

  // Avoid timezone-related date changes.
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getEntityTypeKey(value: unknown) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  if (normalized === "partnership") return "partnership";
  if (normalized === "company") return "company";

  if (
    normalized === "other" ||
    normalized === "otherlegalentity"
  ) {
    return "other";
  }

  return normalized;
}

export default function EditCorporateMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id ?? "");

  const [formData, setFormData] = useState<FormData>({});
  const [applicationNumber, setApplicationNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadApplication() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/admin/membership-applications/${id}?type=corporate`,
          { cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load corporate application."
          );
        }

        const application =
          data.application ??
          data.data?.application ??
          data.data ??
          data;

        const initialData: FormData = {};

        for (const group of corporateFieldGroups) {
          for (const field of group.fields) {
            initialData[field] = application[field] ?? "";
          }
        }

        setFormData(initialData);

        setApplicationNumber(
          String(
            application.applicationNumber ??
              application.corporateNumber ??
              ""
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load corporate application."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadApplication();
  }, [id]);

  function updateField(field: string, value: unknown) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function renderField(field: string) {
    const value = formData[field];
    const stringValue = value == null ? "" : String(value);

    const commonClass =
      "w-full rounded-lg border border-[#dde1e8] bg-white px-3 py-2.5 text-sm text-[#1a1f2b] outline-none focus:border-[#7b2329] focus:ring-1 focus:ring-[#7b2329]";

    // Entity type radio buttons
    if (field === "entityType") {
      const entityType = getEntityTypeKey(value);

      const options = [
        { value: "partnership", label: "Partnership" },
        { value: "company", label: "Company" },
        { value: "other", label: "Other legal entity" },
      ];

      return (
        <div key={field} className="space-y-3 md:col-span-2">
          <div>
            <label className="text-sm font-semibold text-[#1f2e4d]">
              Entity type
            </label>

            <p className="mt-1 text-xs text-[#4a5263]">
              Select the legal structure of your organisation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#dde1e8] p-3 text-sm hover:border-[#7b2329]"
              >
                <input
                  type="radio"
                  name="entityType"
                  value={option.value}
                  checked={entityType === option.value}
                  onChange={() => {
                    updateField("entityType", option.value);

                    if (option.value !== "other") {
                      updateField("otherEntityType", null);
                    }
                  }}
                  className="h-4 w-4 accent-[#7b2329]"
                />

                {option.label}
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Specify legal entity - only when Other is selected
    if (field === "otherEntityType") {
      if (getEntityTypeKey(formData.entityType) !== "other") {
        return null;
      }

      return (
        <div key={field} className="space-y-1.5 md:col-span-2">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            Specify the legal entity
          </label>

          <input
            id={field}
            type="text"
            value={stringValue}
            onChange={(event) =>
              updateField(field, event.target.value)
            }
            placeholder="Enter the type of legal entity"
            className={commonClass}
          />
        </div>
      );
    }

    // Registration status / Residency
    if (field === "residency") {
      return (
        <div key={field} className="space-y-3 md:col-span-2">
          <div>
            <label
              htmlFor={field}
              className="text-sm font-semibold text-[#1f2e4d]"
            >
              Registration status
            </label>

            <p className="mt-1 text-xs text-[#4a5263]">
              Select where the organisation is registered.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { value: "SRI_LANKA", label: "Registered in Sri Lanka" },
              { value: "INTERNATIONAL", label: "International" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#dde1e8] p-3 text-sm hover:border-[#7b2329]"
              >
                <input
                  type="radio"
                  name="residency"
                  value={option.value}
                  checked={stringValue === option.value}
                  onChange={() => {
                    updateField("residency", option.value);

                    if (option.value !== "INTERNATIONAL") {
                      updateField("countryOfRegistration", null);
                    }
                  }}
                  className="h-4 w-4 accent-[#7b2329]"
                />

                {option.label}
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Country of registration - only for International
    if (field === "countryOfRegistration") {
      if (formData.residency !== "INTERNATIONAL") {
        return null;
      }

      return (
        <div key={field} className="space-y-1.5 md:col-span-2">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            Country of registration
          </label>

          <input
            id={field}
            type="text"
            value={stringValue}
            onChange={(event) =>
              updateField(field, event.target.value)
            }
            placeholder="Enter the country of registration"
            className={commonClass}
          />
        </div>
      );
    }

    // Legal form dropdown
    if (field === "legalForm") {
      return (
        <div key={field} className="space-y-1.5">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            Legal form
          </label>

          <select
            id={field}
            value={stringValue}
            onChange={(event) =>
              updateField(field, event.target.value || null)
            }
            className={commonClass}
          >
            <option value="">Select legal form</option>

            {legalFormOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // Payment method dropdown
    if (field === "paymentMethod") {
      return (
        <div key={field} className="space-y-1.5">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            Payment method
          </label>

          <select
            id={field}
            value={stringValue}
            onChange={(event) =>
              updateField(field, event.target.value || null)
            }
            className={commonClass}
          >
            <option value="">Select payment method</option>

            {paymentMethodOptions.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // Nullable Boolean dropdowns
    if (nullableBooleanFields.includes(field)) {
      return (
        <div key={field} className="space-y-1.5">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            {formatLabel(field)}
          </label>

          <select
            id={field}
            value={
              value === true
                ? "true"
                : value === false
                  ? "false"
                  : ""
            }
            onChange={(event) => {
              const selected = event.target.value;

              updateField(
                field,
                selected === "" ? null : selected === "true"
              );
            }}
            className={commonClass}
          >
            <option value="">Not provided</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      );
    }

    // Declaration accepted checkbox
    if (field === "declarationAccepted") {
      return (
        <div
          key={field}
          className="flex items-center gap-3 rounded-lg border border-[#dde1e8] bg-white p-3"
        >
          <input
            id={field}
            type="checkbox"
            checked={value === true}
            onChange={(event) =>
              updateField(field, event.target.checked)
            }
            className="h-4 w-4 accent-[#7b2329]"
          />

          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            Declaration Accepted
          </label>
        </div>
      );
    }

    // Date fields
    if (dateFields.includes(field)) {
      return (
        <div key={field} className="space-y-1.5">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            {formatLabel(field)}
          </label>

          <input
            id={field}
            type="date"
            value={formatDate(value)}
            onChange={(event) =>
              updateField(field, event.target.value || null)
            }
            className={commonClass}
          />
        </div>
      );
    }

    // Integer fields
    if (numberFields.includes(field)) {
      return (
        <div key={field} className="space-y-1.5">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            {formatLabel(field)}
          </label>

          <input
            id={field}
            type="number"
            min="0"
            step="1"
            value={stringValue}
            onChange={(event) =>
              updateField(
                field,
                event.target.value === ""
                  ? null
                  : event.target.value
              )
            }
            className={commonClass}
          />
        </div>
      );
    }

    // Fee and payment amount fields
    if (amountFields.includes(field)) {
      return (
        <div key={field} className="space-y-1.5">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            {formatLabel(field)}
          </label>

          <input
            id={field}
            type="number"
            min="0"
            step="0.01"
            value={stringValue}
            onChange={(event) =>
              updateField(
                field,
                event.target.value === ""
                  ? null
                  : event.target.value
              )
            }
            className={commonClass}
          />
        </div>
      );
    }

    // Long text fields
    if (textareaFields.includes(field)) {
      return (
        <div key={field} className="space-y-1.5 md:col-span-2">
          <label
            htmlFor={field}
            className="text-sm font-medium text-[#1f2e4d]"
          >
            {formatLabel(field)}
          </label>

          <textarea
            id={field}
            rows={4}
            value={stringValue}
            onChange={(event) =>
              updateField(field, event.target.value)
            }
            className={`${commonClass} resize-y`}
          />
        </div>
      );
    }

    // Normal text fields
    return (
      <div key={field} className="space-y-1.5">
        <label
          htmlFor={field}
          className="text-sm font-medium text-[#1f2e4d]"
        >
          {formatLabel(field)}
        </label>

        <input
          id={field}
          type="text"
          value={stringValue}
          onChange={(event) =>
            updateField(field, event.target.value)
          }
          className={commonClass}
        />
      </div>
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload: FormData = {};

      for (const group of corporateFieldGroups) {
        for (const field of group.fields) {
          if (protectedFields.includes(field)) continue;

          let value = formData[field];

          if (dateFields.includes(field)) {
            value = value
              ? String(value).slice(0, 10)
              : null;
          } else if (
            numberFields.includes(field) ||
            amountFields.includes(field)
          ) {
            value =
              value === "" || value == null
                ? null
                : Number(value);
          } else if (nullableBooleanFields.includes(field)) {
            value =
              value === true || value === false
                ? value
                : null;
          } else if (field === "declarationAccepted") {
            value = value === true;
          } else if (typeof value === "string") {
            value = value.trim() || null;
          }

          payload[field] = value;
        }
      }

      // Do not save a hidden conditional value.
      if (getEntityTypeKey(formData.entityType) !== "other") {
        payload.otherEntityType = null;
      }

      if (formData.residency !== "INTERNATIONAL") {
        payload.countryOfRegistration = null;
      }

      const response = await fetch(
        `/api/admin/corporate-members/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update corporate application."
        );
      }

      setSuccess("Corporate application updated successfully.");

      router.push(
        `/admin/membership-applications/${id}?type=corporate`
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update corporate application."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center gap-3 text-[#4a5263]">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading corporate application...
      </div>
    );
  }

  if (error && Object.keys(formData).length === 0) {
    return (
      <div className="p-6">
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 text-sm font-medium text-[#1f2e4d]"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/corporate-members")}
            className="mb-3 flex items-center gap-2 text-sm text-[#4a5263] hover:text-[#7b2329]"
          >
            <ArrowLeft size={17} />
            Back to Corporate Members
          </button>

          <h1 className="text-2xl font-bold text-[#1f2e4d]">
            Edit Corporate Application
          </h1>

          <p className="mt-1 text-sm text-[#4a5263]">
            Application number: {applicationNumber || "Not assigned"}
          </p>
        </div>

        <button
          type="submit"
          form="corporate-edit-form"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#7b2329] px-5 py-3 text-sm font-semibold text-white hover:bg-[#651c22] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Save size={17} />
          )}

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      <form
        id="corporate-edit-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {corporateFieldGroups.map((group) => (
          <section
            key={group.title}
            className="overflow-hidden rounded-xl border border-[#dde1e8] bg-white"
          >
            <div className="border-b border-[#dde1e8] bg-[#f4f6f9] px-5 py-4">
              <h2 className="font-semibold text-[#1f2e4d]">
                {group.title}
              </h2>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              {group.fields
                .filter(
                  (field) => !protectedFields.includes(field)
                )
                .filter((field) => {
                  if (
                    field === "otherEntityType" &&
                    getEntityTypeKey(formData.entityType) !== "other"
                  ) {
                    return false;
                  }

                  if (
                    field === "countryOfRegistration" &&
                    formData.residency !== "INTERNATIONAL"
                  ) {
                    return false;
                  }

                  return true;
                })
                .map((field) => renderField(field))}
            </div>
          </section>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#7b2329] px-6 py-3 text-sm font-semibold text-white hover:bg-[#651c22] disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
