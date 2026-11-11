import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function QualificationsStep({ data, updateData }: Props) {
  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION D
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Qualifications
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide details of your academic and professional
          qualifications relevant to your membership application.
        </p>
      </div>

      {/* Academic Qualifications */}
      <div className="mt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Academic qualifications
        </label>

        <p className="mt-1 text-xs text-accta-muted">
          Include the qualification, institution, and year of completion.
        </p>

        <textarea
          value={data.qualifications}
          onChange={(e) => updateData({ qualifications: e.target.value })}
          placeholder={`Example:
Bachelor's Degree in Accounting – University of Colombo – 2022
Master's Degree in Taxation – University of ... – 2025`}
          rows={7}
          className="mt-3 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
        />
      </div>

      {/* Professional Qualifications and Memberships */}
      <div className="mt-8">
        <label className="text-sm font-semibold text-accta-ink">
          Professional qualifications and memberships
          <span className="ml-1 font-normal text-accta-muted">
            (if applicable)
          </span>
        </label>

        <p className="mt-1 text-xs text-accta-muted">
          Include the name of the professional body, qualification or
          membership, and membership number where applicable.
        </p>

        <textarea
          value={data.professionalMemberships}
          onChange={(e) =>
            updateData({ professionalMemberships: e.target.value })
          }
          placeholder={`Example:
Member – Institute of Chartered Accountants – Membership No. XXXXX
Professional Qualification – ACCA – Completed 2023`}
          rows={7}
          className="mt-3 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
        />
      </div>

      {/* Information Notice */}
      <div className="mt-6 rounded-md border-l-4 border-accta-gold bg-accta-surface px-5 py-4">
        <p className="text-sm leading-6 text-accta-ink">
          Please ensure that the information provided is accurate. You may be
          asked to provide supporting documents to verify your qualifications.
        </p>
      </div>
    </div>
  );
}