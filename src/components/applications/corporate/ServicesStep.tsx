import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function ServicesStep({ data, updateData }: Props) {
  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION D
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Services and experience
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide information about the professional services offered
          by your organisation and its relevant experience.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {/* Services offered */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Tax and professional services offered
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            Describe the taxation and other professional services provided by
            your organisation.
          </p>

          <textarea
            value={data.services}
            onChange={(e) =>
              updateData({
                services: e.target.value,
              })
            }
            placeholder="Example: Tax advisory, tax compliance, accounting and business consultancy services"
            rows={5}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Years of experience in taxation
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            State the number of years your organisation has been involved in
            taxation or related professional services.
          </p>

          <input
            type="text"
            value={data.yearsInTaxation}
            onChange={(e) =>
              updateData({
                yearsInTaxation: e.target.value,
              })
            }
            placeholder="Example: 10 years"
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Professional registrations */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Professional registrations or licences
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            Provide details of any relevant professional registrations,
            licences, or regulatory approvals.
          </p>

          <textarea
            value={data.registrations}
            onChange={(e) =>
              updateData({
                registrations: e.target.value,
              })
            }
            placeholder="Enter registration, licence, or professional membership details"
            rows={4}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Client profile */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Typical client profile
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            Briefly describe the types of clients your organisation usually
            serves.
          </p>

          <textarea
            value={data.clientProfile}
            onChange={(e) =>
              updateData({
                clientProfile: e.target.value,
              })
            }
            placeholder="Example: Small and medium enterprises, individuals and corporate clients"
            rows={4}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Firm profile */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Brief firm profile
          </label>

          <p className="mt-1 text-sm text-accta-muted">
            Provide a short overview of your organisation, its background, and
            its main areas of operation.
          </p>

          <textarea
            value={data.firmProfile}
            onChange={(e) =>
              updateData({
                firmProfile: e.target.value,
              })
            }
            placeholder="Provide a brief profile of your organisation"
            rows={5}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>
    </div>
  );
}