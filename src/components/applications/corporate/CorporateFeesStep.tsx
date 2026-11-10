import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
};

export default function CorporateFeesStep({ data }: Props) {
  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION I
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Fees and application review
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Review your application details before submitting.
        </p>
      </div>

      {/* Application summary */}
      <div className="mt-6 rounded-md border border-accta-border p-5">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Application summary
        </h3>

        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-accta-muted">Organisation</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.registeredName || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-accta-muted">Membership category</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.membershipCategory || "Not selected"}
            </p>
          </div>

          <div>
            <p className="text-accta-muted">Official email</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.officialEmail || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-accta-muted">Nominated representative</p>
            <p className="mt-1 font-semibold text-accta-ink">
              {data.nominatedRepresentative || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Fees information */}
      <div className="mt-6 rounded-md bg-accta-surface p-5">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Membership fees
        </h3>

        <p className="mt-3 text-sm leading-6 text-accta-muted">
          The applicable membership and application fees will be confirmed
          during the review process based on your membership category and
          residency.
        </p>

        <p className="mt-3 text-sm font-medium text-accta-ink">
          Payment instructions will be provided after your application has
          been reviewed.
        </p>
      </div>

      {/* Submission notice */}
      <div className="mt-6 rounded-md border-l-4 border-accta-maroon bg-accta-surface p-4">
        <p className="text-sm leading-6 text-accta-ink">
          By proceeding, you confirm that all information and documents
          provided in this application are accurate and complete.
        </p>
      </div>
    </div>
  );
}