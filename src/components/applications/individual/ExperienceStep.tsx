import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function ExperienceStep({ data, updateData }: Props) {
  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION E
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Employment and professional experience
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide details of your current employment and relevant
          professional experience.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {/* Current Employment */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Current employment
          </label>

          <p className="mt-1 text-xs text-accta-muted">
            Include your job title, organisation, and main responsibilities.
          </p>

          <textarea
            value={data.employmentDetails}
            onChange={(e) =>
              updateData({ employmentDetails: e.target.value })
            }
            placeholder={`Example:
Senior Tax Consultant
ABC Consultants (Pvt) Ltd
Responsible for providing tax advisory and compliance services.`}
            rows={6}
            className="mt-3 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Previous and Relevant Experience */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Relevant professional experience
          </label>

          <p className="mt-1 text-xs text-accta-muted">
            Summarise your previous employment and experience relevant to
            taxation or related professional areas.
          </p>

          <textarea
            value={data.experience}
            onChange={(e) => updateData({ experience: e.target.value })}
            placeholder="Describe your relevant professional experience"
            rows={6}
            className="mt-3 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Areas of Expertise */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Areas of expertise
          </label>

          <p className="mt-1 text-xs text-accta-muted">
            List your main areas of professional expertise.
          </p>

          <input
            type="text"
            value={data.expertise}
            onChange={(e) => updateData({ expertise: e.target.value })}
            placeholder="Example: Tax advisory, tax compliance, corporate taxation"
            className="mt-3 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Professional Statement */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Professional statement
            <span className="ml-1 font-normal text-accta-muted">
              (optional)
            </span>
          </label>

          <p className="mt-1 text-xs text-accta-muted">
            Briefly explain why you are applying for ACCTA membership and how
            your experience supports your application.
          </p>

          <textarea
            value={data.statement}
            onChange={(e) => updateData({ statement: e.target.value })}
            placeholder="Tell us briefly about your professional background and membership interest"
            rows={7}
            className="mt-3 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>
    </div>
  );
}