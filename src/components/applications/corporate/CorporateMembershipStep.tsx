import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function CorporateMembershipStep({
  data,
  updateData,
}: Props) {
  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION A
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Membership applied for
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Select the type of legal entity and provide its registration status.
        </p>
      </div>

      {/* Entity type */}
      <div className="mt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Entity type
        </label>

        <p className="mt-1 text-sm text-accta-muted">
          Select the legal structure of your organisation.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {/* Partnership */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-accta-border p-4">
            <input
              type="radio"
              name="membershipCategory"
              value="partnership"
              checked={data.membershipCategory === "partnership"}
              onChange={(e) =>
                updateData({
                  membershipCategory: e.target.value,
                  otherLegalEntity: "",
                })
              }
            />

            <span className="text-sm font-medium text-accta-ink">
              Partnership
            </span>
          </label>

          {/* Company */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-accta-border p-4">
            <input
              type="radio"
              name="membershipCategory"
              value="company"
              checked={data.membershipCategory === "company"}
              onChange={(e) =>
                updateData({
                  membershipCategory: e.target.value,
                  otherLegalEntity: "",
                })
              }
            />

            <span className="text-sm font-medium text-accta-ink">
              Company
            </span>
          </label>

          {/* Other legal entity */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-accta-border p-4">
            <input
              type="radio"
              name="membershipCategory"
              value="other"
              checked={data.membershipCategory === "other"}
              onChange={(e) =>
                updateData({
                  membershipCategory: e.target.value,
                })
              }
            />

            <span className="text-sm font-medium text-accta-ink">
              Other legal entity
            </span>
          </label>
        </div>
      </div>

      {/* Other legal entity input */}
      {data.membershipCategory === "other" && (
        <div className="mt-5">
          <label className="text-sm font-semibold text-accta-ink">
            Specify the legal entity
          </label>

          <input
            type="text"
            value={data.otherLegalEntity}
            onChange={(e) =>
              updateData({
                otherLegalEntity: e.target.value,
              })
            }
            placeholder="Enter the type of legal entity"
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      )}

      {/* Residency status */}
      <div className="mt-8 border-t border-accta-border pt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Registration status
        </label>

        <p className="mt-1 text-sm text-accta-muted">
          Select where the organisation is registered.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          {/* Sri Lanka */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-accta-border p-4">
            <input
              type="radio"
              name="residency"
              value="sri-lanka"
              checked={data.residency === "sri-lanka"}
              onChange={() =>
                updateData({
                  residency: "sri-lanka",
                  country: "",
                })
              }
            />

            <span className="text-sm font-medium text-accta-ink">
              Registered in Sri Lanka
            </span>
          </label>

          {/* International */}
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-accta-border p-4">
            <input
              type="radio"
              name="residency"
              value="international"
              checked={data.residency === "international"}
              onChange={() =>
                updateData({
                  residency: "international",
                })
              }
            />

            <span className="text-sm font-medium text-accta-ink">
              International
            </span>
          </label>
        </div>

        {/* Country input */}
        {data.residency === "international" && (
          <div className="mt-5">
            <label className="text-sm font-semibold text-accta-ink">
              Country of registration
            </label>

            <input
              type="text"
              value={data.country}
              onChange={(e) =>
                updateData({
                  country: e.target.value,
                })
              }
              placeholder="Enter the country of registration"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        )}
      </div>

      {/* Information note */}
      <div className="mt-6 rounded-md border-l-4 border-accta-maroon bg-accta-surface p-4">
        <p className="text-sm text-accta-muted">
          Every Corporate Member must be represented by a nominated individual
          who is an ACCTA member.
        </p>
      </div>
    </div>
  );
}