import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function DirectorsStep({ data, updateData }: Props) {
  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION C
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Directors and shareholders
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide details of the directors, key officers, shareholders,
          and any parent firm or group associated with the organisation.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {/* Directors and key officers */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Directors and key officers
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            Include the full name and position of each director or key officer.
          </p>

          <textarea
            value={data.directors}
            onChange={(e) =>
              updateData({
                directors: e.target.value,
              })
            }
            placeholder="Example: John Silva – Managing Director"
            rows={5}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Shareholders */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Shareholders and ownership details
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            Provide the names of shareholders and their ownership percentages,
            where applicable.
          </p>

          <textarea
            value={data.shareholders}
            onChange={(e) =>
              updateData({
                shareholders: e.target.value,
              })
            }
            placeholder="Example: Jane Perera – 60% ownership"
            rows={5}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Parent firm */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Parent firm or group
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            If your organisation is part of a parent firm or group, provide
            the relevant details. Otherwise, enter N/A.
          </p>

          <textarea
            value={data.parentFirm}
            onChange={(e) =>
              updateData({
                parentFirm: e.target.value,
              })
            }
            placeholder="Enter parent firm or group details, or N/A"
            rows={4}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>
    </div>
  );
}