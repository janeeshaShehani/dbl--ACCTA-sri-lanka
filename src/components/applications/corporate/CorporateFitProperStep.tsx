import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function CorporateFitProperStep({
  data,
  updateData,
}: Props) {
  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION F
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Fit and proper declaration
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Provide details of any matter relevant to the firm's fitness and
          propriety for membership.
        </p>
      </div>

      <div className="mt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Declaration details
        </label>

        <textarea
          value={data.fitAndProperDetails}
          onChange={(e) =>
            updateData({ fitAndProperDetails: e.target.value })
          }
          placeholder="Enter relevant details. If there are no matters to declare, enter N/A."
          rows={8}
          className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
        />
      </div>
    </div>
  );
}