import type { IndividualApplication } from "@/types/application";

type FeesStepProps = {
  data: IndividualApplication;
};

type FeeDetails = {
  local: string;
  international: string;
};

const membershipFees: Record<string, FeeDetails> = {
  ACTA: {
    local: "Rs. 15,000",
    international: "USD 75",
  },
  FCTA: {
    local: "Rs. 25,000",
    international: "USD 125",
  },
  AACTA: {
    local: "Rs. 12,000",
    international: "USD 60",
  },
  FACTA: {
    local: "Rs. 20,000",
    international: "USD 100",
  },
  AfCTA: {
    local: "Rs. 8,000",
    international: "USD 40",
  },
};

const categoryNames: Record<string, string> = {
  ACTA: "Associate",
  FCTA: "Fellow",
  AACTA: "Associate Academic",
  FACTA: "Fellow Academic",
  AfCTA: "Affiliate",
};

export default function FeesStep({ data }: FeesStepProps) {
  const fee = membershipFees[data.membershipCategory];

  const feeAmount =
    data.residency === "international"
      ? fee?.international
      : fee?.local;

  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION J
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Review and application fees
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please review your application details before submitting.
        </p>
      </div>

      {/* Application Review */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-accta-navy">
          Application summary
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ReviewItem
            label="Membership category"
            value={`${categoryNames[data.membershipCategory] || "Not selected"} ${
              data.membershipCategory
                ? `(${data.membershipCategory})`
                : ""
            }`}
          />

          <ReviewItem
            label="Route of admission"
            value={data.admissionRoute || "Not provided"}
          />

          <ReviewItem
            label="Applicant name"
            value={data.fullName || "Not provided"}
          />

          <ReviewItem
            label="Email address"
            value={data.personalEmail || "Not provided"}
          />

          <ReviewItem
            label="Mobile number"
            value={data.mobile || "Not provided"}
          />

          <ReviewItem
            label="Residency"
            value={
              data.residency === "international"
                ? `International${data.country ? ` – ${data.country}` : ""}`
                : "Sri Lanka"
            }
          />
        </div>
      </div>

      {/* Fee */}
      <div className="mt-8 rounded-lg border border-accta-border bg-accta-surface p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-accta-muted">
              Application fee
            </p>

            <h3 className="mt-1 text-lg font-bold text-accta-navy">
              {categoryNames[data.membershipCategory] || "Membership"}
            </h3>
          </div>

          <p className="text-2xl font-bold text-accta-maroon">
            {feeAmount || "Fee to be confirmed"}
          </p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mt-6 rounded-md border-l-4 border-accta-gold bg-accta-surface px-5 py-4">
        <p className="text-sm leading-6 text-accta-ink">
          Payment will be requested after your application has been reviewed
          and approved by the ACCTA Council.
        </p>
      </div>

      <p className="mt-5 text-xs text-accta-muted">
        By submitting this application, you confirm that the information
        provided is accurate and complete.
      </p>
    </div>
  );
}

type ReviewItemProps = {
  label: string;
  value: string;
};

function ReviewItem({ label, value }: ReviewItemProps) {
  return (
    <div className="rounded-md border border-accta-border p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-accta-muted">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-accta-ink">
        {value}
      </p>
    </div>
  );
}