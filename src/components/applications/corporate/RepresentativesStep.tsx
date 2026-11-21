import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
  validationErrors?: Record<string, string>;
};

export default function RepresentativesStep({
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
          SECTION E
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Company representatives
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide the details of the individuals nominated to represent
          your organisation.
        </p>
      </div>

      {/* Nominated representative */}
      <div className="mt-6">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Nominated representative
        </h3>

        <p className="mt-1 text-sm text-accta-muted">
          The nominated representative will act as the primary contact for the
          organisation.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Full name */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Full name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={data.nominatedRepresentative}
              onChange={(e) =>
                updateData({
                  nominatedRepresentative: e.target.value,
                })
              }
              placeholder="Enter the representative's full name"
              className={inputClass("nominatedRepresentative")}
            />

            {showError("nominatedRepresentative")}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Email address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              value={data.nominatedEmail}
              onChange={(e) =>
                updateData({
                  nominatedEmail: e.target.value,
                })
              }
              placeholder="representative@example.com"
              className={inputClass("nominatedEmail")}
            />

            {showError("nominatedEmail")}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Phone number <span className="text-red-500">*</span>
            </label>

            <input
              type="tel"
              value={data.nominatedPhone}
              onChange={(e) =>
                updateData({
                  nominatedPhone: e.target.value,
                })
              }
              placeholder="+94 XX XXX XXXX"
              className={inputClass("nominatedPhone")}
            />

            {showError("nominatedPhone")}
          </div>
        </div>
      </div>

      {/* Alternate representative */}
      <div className="mt-8 border-t border-accta-border pt-6">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Alternate representative
        </h3>

        <p className="mt-1 text-sm text-accta-muted">
          You may provide an alternate representative who can be contacted when
          the nominated representative is unavailable.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Full name */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Full name
            </label>

            <input
              type="text"
              value={data.alternateRepresentative}
              onChange={(e) =>
                updateData({
                  alternateRepresentative: e.target.value,
                })
              }
              placeholder="Enter the alternate representative's full name"
              className={inputClass("alternateRepresentative")}
            />

            {showError("alternateRepresentative")}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Email address
            </label>

            <input
              type="email"
              value={data.alternateEmail}
              onChange={(e) =>
                updateData({
                  alternateEmail: e.target.value,
                })
              }
              placeholder="alternate@example.com"
              className={inputClass("alternateEmail")}
            />

            {showError("alternateEmail")}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Phone number
            </label>

            <input
              type="tel"
              value={data.alternatePhone}
              onChange={(e) =>
                updateData({
                  alternatePhone: e.target.value,
                })
              }
              placeholder="+94 XX XXX XXXX"
              className={inputClass("alternatePhone")}
            />

            {showError("alternatePhone")}
          </div>
        </div>
      </div>

      {/* Important information */}
      <div className="mt-6 rounded-md border-l-4 border-accta-maroon bg-accta-surface p-4">
        <p className="text-sm text-accta-muted">
          Please ensure that the nominated representative&apos;s contact
          details are accurate, as they may be used for communication regarding
          the membership application.
        </p>
      </div>
    </div>
  );
}