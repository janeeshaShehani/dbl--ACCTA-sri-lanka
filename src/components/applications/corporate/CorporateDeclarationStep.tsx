import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
  validationErrors?: Record<string, string>;
};

export default function CorporateDeclarationStep({
  data,
  updateData,
  validationErrors = {},
}: Props) {
  const inputClass = (field: string) =>
    `mt-2 w-full rounded-md border ${
      validationErrors[field]
        ? "border-red-500"
        : "border-accta-border"
    } bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon`;

  const showError = (field: string) =>
    validationErrors[field] ? (
      <p className="mt-2 text-sm text-red-600">
        {validationErrors[field]}
      </p>
    ) : null;

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION H
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Declaration
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please confirm that the information provided is accurate.
        </p>
      </div>

      {/* Declaration text */}
      <p className="mt-6 text-sm leading-6 text-accta-muted">
        We confirm that the information provided in this application is true
        and complete and that the signatories are authorised to submit this
        application on behalf of the organisation.
      </p>

      {/* Signatories */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Signatory One */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Authorised signatory one{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={data.signatoryOne}
            onChange={(e) =>
              updateData({
                signatoryOne: e.target.value,
              })
            }
            placeholder="Enter full name"
            className={inputClass("signatoryOne")}
          />

          {showError("signatoryOne")}
        </div>

        {/* Signatory Two */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Authorised signatory two
          </label>

          <input
            type="text"
            value={data.signatoryTwo}
            onChange={(e) =>
              updateData({
                signatoryTwo: e.target.value,
              })
            }
            placeholder="Enter full name (optional)"
            className={inputClass("signatoryTwo")}
          />

          {showError("signatoryTwo")}
        </div>

        {/* Resolution Date */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Resolution date <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={data.resolutionDate}
            onChange={(e) =>
              updateData({
                resolutionDate: e.target.value,
              })
            }
            className={inputClass("resolutionDate")}
          />

          {showError("resolutionDate")}
        </div>
      </div>

      {/* Confirmation */}
      <div className="mt-6">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 ${
            validationErrors.declarationAccepted
              ? "border-red-500"
              : "border-accta-border"
          }`}
        >
          <input
            type="checkbox"
            checked={data.declarationAccepted}
            onChange={(e) =>
              updateData({
                declarationAccepted: e.target.checked,
              })
            }
            className="mt-1 h-4 w-4 accent-accta-maroon"
          />

          <span className="text-sm leading-6 text-accta-muted">
            I confirm that I am authorised to submit this application and that
            all information provided is true and accurate.
            <span className="ml-1 text-red-500">*</span>
          </span>
        </label>

        {showError("declarationAccepted")}
      </div>
    </div>
  );
}