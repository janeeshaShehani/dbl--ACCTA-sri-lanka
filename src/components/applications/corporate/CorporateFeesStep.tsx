import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
};

export default function CorporateFeesStep({ data }: Props) {
  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          FINAL STEP
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Application review and fees
        </h2>
      </div>

      <div className="mt-6 rounded-md border border-accta-border bg-accta-surface p-5">
        <h3 className="font-semibold text-accta-navy">
          Application summary
        </h3>

        <div className="mt-4 space-y-2 text-sm text-accta-muted">
          <p>
            <span className="font-medium text-accta-ink">Organisation:</span>{" "}
            {data.registeredName || "Not provided"}
          </p>

          <p>
            <span className="font-medium text-accta-ink">
              Membership category:
            </span>{" "}
            {data.membershipCategory || "Not selected"}
          </p>

          <p>
            <span className="font-medium text-accta-ink">Representative:</span>{" "}
            {data.nominatedRepresentative || "Not provided"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-accta-border p-5">
        <h3 className="font-semibold text-accta-navy">Application fees</h3>

        <p className="mt-2 text-sm text-accta-muted">
          The applicable membership and application fees will be confirmed
          based on the selected membership category and organisation details.
        </p>
      </div>
    </div>
  );
}