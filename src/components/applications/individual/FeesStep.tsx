import { membershipClasses } from "@/data/membershipClasses";
import type { IndividualApplication } from "@/types/application";

type FeesStepProps = {
  data: IndividualApplication;
};

export default function FeesStep({ data }: FeesStepProps) {
  // Find the selected membership from the central membership data
  const selectedMembership = membershipClasses.find(
    (membership) => membership.letters === data.membershipCategory
  );

  // Select the correct currency based on residency
  const currency =
    data.residency === "international" ? "usd" : "lkr";

  const applicationFee = selectedMembership
    ? selectedMembership.applicationFee[currency]
    : "";

  const annualSubscription = selectedMembership
    ? selectedMembership.annualSubscription[currency]
    : "";

  return (
    <div>
      {/* Header */}
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
            value={
              selectedMembership
                ? `${selectedMembership.category} (${selectedMembership.letters})`
                : "Not selected"
            }
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
                ? `International${
                    data.country ? ` – ${data.country}` : ""
                  }`
                : "Sri Lanka"
            }
          />
        </div>
      </div>

      {/* Fees */}
      {selectedMembership ? (
        <div className="mt-8 rounded-lg border border-accta-border bg-accta-surface p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-accta-navy">
              {selectedMembership.category}
            </h3>

            <p className="text-sm text-accta-muted">
              The applicable fees are based on your selected membership category
              and residency.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* Application Fee */}
            <div className="rounded-md bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-accta-muted">
                Application fee
              </p>

              <p className="mt-2 text-2xl font-bold text-accta-maroon">
                {applicationFee || "Fee to be confirmed"}
              </p>
            </div>

            {/* Annual Subscription */}
            <div className="rounded-md bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-accta-muted">
                Annual subscription
              </p>

              <p className="mt-2 text-2xl font-bold text-accta-navy">
                {annualSubscription || "Fee to be confirmed"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-accta-border bg-accta-surface p-6">
          <p className="text-sm text-accta-muted">
            Please select a membership category to view the applicable fees.
          </p>
        </div>
      )}

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