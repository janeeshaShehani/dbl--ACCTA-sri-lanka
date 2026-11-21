import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
  validationErrors?: Record<string, string>;
};

export default function EntityDetailsStep({
  data,
  updateData,
  validationErrors = {},
}: Props) {
  const inputClass = (field: string) =>
    `mt-2 w-full rounded-md border ${
      validationErrors[field] ? "border-red-500" : "border-accta-border"
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

      {/* Basic entity details */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Registered name */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Registered name
          </label>

          <input
            type="text"
            value={data.registeredName}
            onChange={(e) =>
              updateData({ registeredName: e.target.value })
            }
            placeholder="Enter the registered name"
            className={inputClass("registeredName")}
          />

          {showError("registeredName")}
        </div>

        {/* Trading name */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Trading name
          </label>

          <input
            type="text"
            value={data.tradingName}
            onChange={(e) =>
              updateData({ tradingName: e.target.value })
            }
            placeholder="Enter the trading name, if applicable"
            className={inputClass("tradingName")}
          />
        </div>

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
            className={inputClass("legalForm")}
          >
            <option value="">Select legal form</option>
            <option value="partnership">Partnership</option>
            <option value="private-limited">
              Private Limited Company
            </option>
            <option value="public-limited">
              Public Limited Company
            </option>
            <option value="other">Other legal entity</option>
          </select>

          {showError("legalForm")}
        </div>

        {/* Registration number */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Registration number
          </label>

          <input
            type="text"
            value={data.registrationNumber}
            onChange={(e) =>
              updateData({ registrationNumber: e.target.value })
            }
            placeholder="Enter the registration number"
            className={inputClass("registrationNumber")}
          />

          {showError("registrationNumber")}
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
              updateData({ registrationDate: e.target.value })
            }
            className={inputClass("registrationDate")}
          />

          {showError("registrationDate")}
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Country of registration
          </label>

          <input
            type="text"
            value={data.registrationCountry}
            onChange={(e) =>
              updateData({ registrationCountry: e.target.value })
            }
            placeholder="Enter the country of registration"
            className={inputClass("registrationCountry")}
          />

          {showError("registrationCountry")}
        </div>

        {/* TIN */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            TIN number
          </label>

          <input
            type="text"
            value={data.tinNumber}
            onChange={(e) =>
              updateData({ tinNumber: e.target.value })
            }
            placeholder="Enter the TIN number"
            className={inputClass("tinNumber")}
          />
        </div>

        {/* VAT */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            VAT number
          </label>

          <input
            type="text"
            value={data.vatNumber}
            onChange={(e) =>
              updateData({ vatNumber: e.target.value })
            }
            placeholder="Enter the VAT number, if applicable"
            className={inputClass("vatNumber")}
          />
        </div>

        {/* Website */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Website
          </label>

          <input
            type="url"
            value={data.website}
            onChange={(e) =>
              updateData({ website: e.target.value })
            }
            placeholder="https://www.example.com"
            className={inputClass("website")}
          />

          {showError("website")}
        </div>

        {/* Number of employees */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Number of employees
          </label>

          <input
            type="number"
            min="0"
            value={data.staffCount}
            onChange={(e) =>
              updateData({ staffCount: e.target.value })
            }
            placeholder="Enter the number of employees"
            className={inputClass("staffCount")}
          />

          {showError("staffCount")}
        </div>
      </div>

      {/* Addresses */}
      <div className="mt-6 grid gap-5">
        {/* Registered address */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Registered address
          </label>

          <textarea
            value={data.registeredAddress}
            onChange={(e) =>
              updateData({ registeredAddress: e.target.value })
            }
            rows={3}
            placeholder="Enter the registered address"
            className={inputClass("registeredAddress")}
          />

          {showError("registeredAddress")}
        </div>

        {/* Trading address */}
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Trading address
          </label>

          <textarea
            value={data.tradingAddress}
            onChange={(e) =>
              updateData({ tradingAddress: e.target.value })
            }
            rows={3}
            placeholder="Enter the trading address, if different"
            className={inputClass("tradingAddress")}
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
                updateData({ officePhone: e.target.value })
              }
              placeholder="+94 XX XXX XXXX"
              className={inputClass("officePhone")}
            />

            {showError("officePhone")}
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
                updateData({ officialEmail: e.target.value })
              }
              placeholder="organisation@example.com"
              className={inputClass("officialEmail")}
            />

            {showError("officialEmail")}
          </div>
        </div>
      </div>
    </div>
  );
}