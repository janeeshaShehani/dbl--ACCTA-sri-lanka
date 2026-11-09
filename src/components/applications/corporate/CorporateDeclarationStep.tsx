import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function CorporateDeclarationStep({ data, updateData }: Props) {
  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION H
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Declaration
        </h2>
      </div>

      <p className="mt-6 text-sm leading-6 text-accta-muted">
        We confirm that the information provided in this application is true
        and complete and that the signatories are authorised to submit this
        application on behalf of the organisation.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Authorised signatory one
          </label>
          <input
            value={data.signatoryOne}
            onChange={(e) => updateData({ signatoryOne: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Authorised signatory two
          </label>
          <input
            value={data.signatoryTwo}
            onChange={(e) => updateData({ signatoryTwo: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Resolution date
          </label>
          <input
            type="date"
            value={data.resolutionDate}
            onChange={(e) =>
              updateData({ resolutionDate: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>
    </div>
  );
}