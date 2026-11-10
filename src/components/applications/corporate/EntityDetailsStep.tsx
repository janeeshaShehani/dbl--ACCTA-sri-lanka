import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function EntityDetailsStep({
  data,
  updateData,
}: Props) {
  const fields = [
    ["registeredName", "Registered name"],
    ["tradingName", "Trading name"],
    ["registrationNumber", "Registration number"],
    ["registrationCountry", "Country of registration"],
    ["tinNumber", "TIN number"],
    ["vatNumber", "VAT number"],
    ["website", "Website"],
    ["staffCount", "Number of employees"],
  ] as const;

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION B
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Entity details
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide the registered details and contact information of
          your organisation.
        </p>
      </div>

      {/* Entity details */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {fields.map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-semibold text-accta-ink">
              {label}
            </label>

            <input
              type="text"
              value={data[key]}
              onChange={(e) =>
                updateData({ [key]: e.target.value })
              }
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        ))}

        {/* Legal form */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Legal form
          </label>

          <select
            value={data.legalForm}
            onChange={(e) =>
              updateData({ legalForm: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="">Select legal form</option>
            <option value="private">
              Private Limited Company
            </option>
            <option value="public">
              Public Limited Company
            </option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Registration date */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Registration date
          </label>

          <input
            type="date"
            value={data.registrationDate}
            onChange={(e) =>
              updateData({
                registrationDate: e.target.value,
              })
            }
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>

      {/* Addresses */}
      <div className="mt-5 grid gap-5">
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Registered address
          </label>

          <textarea
            value={data.registeredAddress}
            onChange={(e) =>
              updateData({
                registeredAddress: e.target.value,
              })
            }
            rows={3}
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Trading address
          </label>

          <textarea
            value={data.tradingAddress}
            onChange={(e) =>
              updateData({
                tradingAddress: e.target.value,
              })
            }
            rows={3}
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>

      {/* Corporate contact details */}
      <div className="mt-8 border-t border-accta-border pt-6">
        <h3 className="font-serif text-lg font-bold text-accta-navy">
          Corporate contact details
        </h3>

        <p className="mt-1 text-sm text-accta-muted">
          Please provide the official contact details for the organisation.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Office phone */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Office phone
            </label>

            <input
              type="tel"
              value={data.officePhone}
              onChange={(e) =>
                updateData({
                  officePhone: e.target.value,
                })
              }
              placeholder="+94 XX XXX XXXX"
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          {/* Official email */}
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Official email
            </label>

            <input
              type="email"
              value={data.officialEmail}
              onChange={(e) =>
                updateData({
                  officialEmail: e.target.value,
                })
              }
              placeholder="organisation@example.com"
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}