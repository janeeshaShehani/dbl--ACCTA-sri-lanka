import { membershipClasses } from "@/data/membershipClasses";
import type { IndividualApplication } from "@/types/application";

type MembershipStepProps = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function MembershipStep({
  data,
  updateData,
}: MembershipStepProps) {
  const selectedMembership = membershipClasses.find(
    (membership) => membership.letters === data.membershipCategory
  );

  const isStandardCategory =
    data.membershipCategory === "ACTA" ||
    data.membershipCategory === "FCTA";

  const selectedFee =
    data.residency === "sri-lanka"
      ? selectedMembership?.applicationFee.lkr
      : selectedMembership?.applicationFee.usd;

  const selectedSubscription =
    data.residency === "sri-lanka"
      ? selectedMembership?.annualSubscription.lkr
      : selectedMembership?.annualSubscription.usd;

  const handleResidencyChange = (
    residency: "sri-lanka" | "international"
  ) => {
    updateData({
      residency,
      country: residency === "sri-lanka" ? "" : data.country,
    });
  };

  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION A
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Membership applied for
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Select the membership category that best matches your qualifications
          and experience.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Membership Category */}
        <div>
          <label
            htmlFor="membershipCategory"
            className="text-sm font-semibold text-accta-ink"
          >
            Membership category <span className="text-red-600">*</span>
          </label>

          <select
            id="membershipCategory"
            value={data.membershipCategory}
            required
            onChange={(e) =>
              updateData({ membershipCategory: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="">Select a category</option>

            {membershipClasses
              .filter(
                (membership) =>
                  membership.id !== "corporate" &&
                  membership.id !== "honorary"
              )
              .map((membership) => (
                <option
                  key={membership.id}
                  value={membership.letters}
                >
                  {membership.category} ({membership.letters})
                </option>
              ))}
          </select>
        </div>

        {/* Residency */}
        <div>
          <label
            htmlFor="residency"
            className="text-sm font-semibold text-accta-ink"
          >
            Residency <span className="text-red-600">*</span>
          </label>

          <select
            id="residency"
            value={data.residency}
            required
            onChange={(e) =>
              handleResidencyChange(
                e.target.value as "sri-lanka" | "international"
              )
            }
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="sri-lanka">Sri Lanka</option>
            <option value="international">International</option>
          </select>
        </div>

        {/* Country */}
        {data.residency === "international" && (
          <div className="md:col-span-2">
            <label
              htmlFor="country"
              className="text-sm font-semibold text-accta-ink"
            >
              Country of residence <span className="text-red-600">*</span>
            </label>

            <input
              id="country"
              type="text"
              value={data.country}
              required
              onChange={(e) =>
                updateData({ country: e.target.value })
              }
              placeholder="Enter your country"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        )}
      </div>

      {/* Selected Membership Information */}
      {selectedMembership && (
        <div className="mt-6 rounded-md border border-accta-border bg-accta-surface p-5">
          <h3 className="font-semibold text-accta-navy">
            {selectedMembership.category}
          </h3>

          <p className="mt-2 text-sm text-accta-muted">
            {selectedMembership.eligibility}
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accta-muted">
                Application Fee
              </p>

              <p className="mt-1 text-lg font-bold text-accta-navy">
                {selectedFee || "Not applicable"}
              </p>
            </div>

            <div className="rounded-md bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accta-muted">
                Annual Subscription
              </p>

              <p className="mt-1 text-lg font-bold text-accta-navy">
                {selectedSubscription || "Not applicable"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admission Route */}
      <div className="mt-6">
        <label
          htmlFor="admissionRoute"
          className="text-sm font-semibold text-accta-ink"
        >
          Route of admission <span className="text-red-600">*</span>
        </label>

        <select
          id="admissionRoute"
          value={data.admissionRoute}
          required
          onChange={(e) =>
            updateData({ admissionRoute: e.target.value })
          }
          className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
        >
          <option value="">Select a route</option>

          <option value="exam">
            ACCTA examination route
          </option>

          <option value="qualification">
            Recognised qualification route
          </option>

          {isStandardCategory && (
            <option value="mature-entry">
              Mature entry route
            </option>
          )}
        </select>
      </div>
    </div>
  );
}