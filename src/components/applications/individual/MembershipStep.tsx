import type { IndividualApplication } from "@/types/application";

type MembershipStepProps = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function MembershipStep({
  data,
  updateData,
}: MembershipStepProps) {
  const isStandardCategory =
    data.membershipCategory === "ACTA" ||
    data.membershipCategory === "FCTA";

  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION A
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Membership applied for
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Select the membership category and route that best matches your
          qualifications and experience.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Membership Category */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Membership category
          </label>

          <select
            value={data.membershipCategory}
            onChange={(e) =>
              updateData({ membershipCategory: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="">Select a category</option>
            <option value="ACTA">Associate (ACTA)</option>
            <option value="FCTA">Fellow (FCTA)</option>
            <option value="AACTA">Associate Academic (AACTA)</option>
            <option value="FACTA">Fellow Academic (FACTA)</option>
            <option value="AfCTA">Affiliate (AfCTA)</option>
          </select>
        </div>

        {/* Residency */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Residency
          </label>

          <select
            value={data.residency}
            onChange={(e) =>
              updateData({
                residency: e.target.value as
                  | "sri-lanka"
                  | "international",
              })
            }
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="sri-lanka">Sri Lanka</option>
            <option value="international">International</option>
          </select>
        </div>

        {/* Country - shown only for international applicants */}
        {data.residency === "international" && (
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-accta-ink">
              Country of residence
            </label>

            <input
              type="text"
              value={data.country}
              onChange={(e) =>
                updateData({ country: e.target.value })
              }
              placeholder="Enter your country"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        )}
      </div>

      {/* Admission Route */}
      <div className="mt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Route of admission
        </label>

        <select
          value={data.admissionRoute}
          onChange={(e) =>
            updateData({ admissionRoute: e.target.value })
          }
          className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
        >
          <option value="">Select a route</option>
          <option value="exam">ACCTA examination route</option>
          <option value="qualification">
            Recognised qualification route
          </option>

          {/* Mature entry is available only for Standard categories */}
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