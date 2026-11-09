type CorporateMembershipStepProps = {
  data: {
    membershipCategory: string;
    residency: "sri-lanka" | "international";
    country: string;
  };
  updateData: (data: Record<string, string>) => void;
};

export default function CorporateMembershipStep({
  data,
  updateData,
}: CorporateMembershipStepProps) {
  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION A
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Corporate membership
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Select the membership category and provide your residency details.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
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
            <option value="corporate">Corporate Membership</option>
            <option value="institutional">Institutional Membership</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Residency
          </label>

          <select
            value={data.residency}
            onChange={(e) =>
              updateData({
                residency: e.target.value,
              })
            }
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="sri-lanka">Sri Lanka</option>
            <option value="international">International</option>
          </select>
        </div>

        {data.residency === "international" && (
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Country of residence
            </label>

            <input
              type="text"
              value={data.country}
              onChange={(e) => updateData({ country: e.target.value })}
              placeholder="Enter your country"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        )}
      </div>
    </div>
  );
}