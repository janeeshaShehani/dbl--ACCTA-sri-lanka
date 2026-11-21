
import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
  validationErrors?: Record<string, string>;
};

export default function ContactDetailsStep({
  data,
  updateData,
  validationErrors = {},
}: Props) {
  const getInputClass = (field: string) => {
    return `mt-2 w-full rounded-md border bg-white px-4 py-3 text-sm outline-none ${
      validationErrors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-accta-border focus:border-accta-maroon"
    }`;
  };

  const getTextareaClass = (field: string) => {
    return `mt-2 w-full rounded-md border bg-white px-4 py-3 text-sm outline-none ${
      validationErrors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-accta-border focus:border-accta-maroon"
    }`;
  };

  const renderError = (field: string) => {
    if (!validationErrors[field]) return null;

    return (
      <p className="mt-1 text-sm text-red-600">
        {validationErrors[field]}
      </p>
    );
  };

  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION C
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Contact details
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide your current contact information.
        </p>
      </div>

      {/* Address Details */}
      <div className="mt-6">
        <h3 className="text-base font-bold text-accta-navy">
          Address details
        </h3>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {/* Residential Address */}
          <div>
            <label
              htmlFor="residentialAddress"
              className="text-sm font-semibold text-accta-ink"
            >
              Residential address{" "}
              <span className="text-accta-maroon">*</span>
            </label>

            <textarea
              id="residentialAddress"
              value={data.residentialAddress}
              onChange={(e) =>
                updateData({ residentialAddress: e.target.value })
              }
              placeholder="Enter your residential address"
              rows={4}
              required
              maxLength={500}
              aria-invalid={!!validationErrors.residentialAddress}
              className={getTextareaClass("residentialAddress")}
            />

            {renderError("residentialAddress")}
          </div>

          {/* Official Address */}
          <div>
            <label
              htmlFor="officialAddress"
              className="text-sm font-semibold text-accta-ink"
            >
              Official address
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <textarea
              id="officialAddress"
              value={data.officialAddress}
              onChange={(e) =>
                updateData({ officialAddress: e.target.value })
              }
              placeholder="Enter your official or workplace address"
              rows={4}
              maxLength={500}
              className={getTextareaClass("officialAddress")}
            />
          </div>

          {/* Mailing Address */}
          <div className="md:col-span-2">
            <label
              htmlFor="mailingAddress"
              className="text-sm font-semibold text-accta-ink"
            >
              Mailing address
              <span className="ml-1 font-normal text-accta-muted">
                (if different from residential address)
              </span>
            </label>

            <textarea
              id="mailingAddress"
              value={data.mailingAddress}
              onChange={(e) =>
                updateData({ mailingAddress: e.target.value })
              }
              placeholder="Enter your mailing address"
              rows={3}
              maxLength={500}
              className={getTextareaClass("mailingAddress")}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8">
        <h3 className="text-base font-bold text-accta-navy">
          Contact information
        </h3>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobile"
              className="text-sm font-semibold text-accta-ink"
            >
              Mobile number{" "}
              <span className="text-accta-maroon">*</span>
            </label>

            <input
              id="mobile"
              type="tel"
              value={data.mobile}
              onChange={(e) =>
                updateData({ mobile: e.target.value })
              }
              placeholder="Enter your mobile number"
              required
              maxLength={20}
              autoComplete="tel"
              aria-invalid={!!validationErrors.mobile}
              className={getInputClass("mobile")}
            />

            {renderError("mobile")}

            <p className="mt-1 text-xs text-accta-muted">
              Include your country code when applicable.
            </p>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label
              htmlFor="whatsapp"
              className="text-sm font-semibold text-accta-ink"
            >
              WhatsApp number
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              id="whatsapp"
              type="tel"
              value={data.whatsapp}
              onChange={(e) =>
                updateData({ whatsapp: e.target.value })
              }
              placeholder="Enter your WhatsApp number"
              maxLength={20}
              autoComplete="tel"
              aria-invalid={!!validationErrors.whatsapp}
              className={getInputClass("whatsapp")}
            />

            {renderError("whatsapp")}
          </div>

          {/* Office Phone */}
          <div>
            <label
              htmlFor="officePhone"
              className="text-sm font-semibold text-accta-ink"
            >
              Office phone
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              id="officePhone"
              type="tel"
              value={data.officePhone}
              onChange={(e) =>
                updateData({ officePhone: e.target.value })
              }
              placeholder="Enter your office phone number"
              maxLength={20}
              autoComplete="tel"
              aria-invalid={!!validationErrors.officePhone}
              className={getInputClass("officePhone")}
            />

            {renderError("officePhone")}
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label
              htmlFor="linkedIn"
              className="text-sm font-semibold text-accta-ink"
            >
              LinkedIn profile
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              id="linkedIn"
              type="url"
              value={data.linkedIn}
              onChange={(e) =>
                updateData({ linkedIn: e.target.value })
              }
              placeholder="https://www.linkedin.com/in/your-profile"
              maxLength={255}
              aria-invalid={!!validationErrors.linkedIn}
              className={getInputClass("linkedIn")}
            />

            {renderError("linkedIn")}

            <p className="mt-1 text-xs text-accta-muted">
              Enter your complete LinkedIn profile URL.
            </p>
          </div>
        </div>
      </div>

      {/* Email Details */}
      <div className="mt-8">
        <h3 className="text-base font-bold text-accta-navy">
          Email details
        </h3>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {/* Personal Email */}
          <div>
            <label
              htmlFor="personalEmail"
              className="text-sm font-semibold text-accta-ink"
            >
              Personal email address{" "}
              <span className="text-accta-maroon">*</span>
            </label>

            <input
              id="personalEmail"
              type="email"
              value={data.personalEmail}
              onChange={(e) =>
                updateData({ personalEmail: e.target.value })
              }
              placeholder="Enter your personal email address"
              required
              maxLength={254}
              autoComplete="email"
              aria-invalid={!!validationErrors.personalEmail}
              className={getInputClass("personalEmail")}
            />

            {renderError("personalEmail")}
          </div>

          {/* Official Email */}
          <div>
            <label
              htmlFor="officialEmail"
              className="text-sm font-semibold text-accta-ink"
            >
              Official email address
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              id="officialEmail"
              type="email"
              value={data.officialEmail}
              onChange={(e) =>
                updateData({ officialEmail: e.target.value })
              }
              placeholder="Enter your official email address"
              maxLength={254}
              autoComplete="email"
              aria-invalid={!!validationErrors.officialEmail}
              className={getInputClass("officialEmail")}
            />

            {renderError("officialEmail")}
          </div>
        </div>
      </div>
    </div>
  );
}
