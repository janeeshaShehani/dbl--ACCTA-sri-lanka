import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function ContactDetailsStep({ data, updateData }: Props) {
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
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Residential address
            </label>

            <textarea
              value={data.residentialAddress}
              onChange={(e) =>
                updateData({ residentialAddress: e.target.value })
              }
              placeholder="Enter your residential address"
              rows={4}
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Official address
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <textarea
              value={data.officialAddress}
              onChange={(e) =>
                updateData({ officialAddress: e.target.value })
              }
              placeholder="Enter your official or workplace address"
              rows={4}
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-accta-ink">
              Mailing address
              <span className="ml-1 font-normal text-accta-muted">
                (if different from residential address)
              </span>
            </label>

            <textarea
              value={data.mailingAddress}
              onChange={(e) =>
                updateData({ mailingAddress: e.target.value })
              }
              placeholder="Enter your mailing address"
              rows={3}
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
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
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Mobile number
            </label>

            <input
              type="tel"
              value={data.mobile}
              onChange={(e) => updateData({ mobile: e.target.value })}
              placeholder="Enter your mobile number"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              WhatsApp number
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              type="tel"
              value={data.whatsapp}
              onChange={(e) => updateData({ whatsapp: e.target.value })}
              placeholder="Enter your WhatsApp number"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Office phone
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              type="tel"
              value={data.officePhone}
              onChange={(e) => updateData({ officePhone: e.target.value })}
              placeholder="Enter your office phone number"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              LinkedIn profile
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              type="url"
              value={data.linkedIn}
              onChange={(e) => updateData({ linkedIn: e.target.value })}
              placeholder="https://www.linkedin.com/in/..."
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        </div>
      </div>

      {/* Email Details */}
      <div className="mt-8">
        <h3 className="text-base font-bold text-accta-navy">
          Email details
        </h3>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Personal email address
            </label>

            <input
              type="email"
              value={data.personalEmail}
              onChange={(e) =>
                updateData({ personalEmail: e.target.value })
              }
              placeholder="Enter your personal email address"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Official email address
              <span className="ml-1 font-normal text-accta-muted">
                (optional)
              </span>
            </label>

            <input
              type="email"
              value={data.officialEmail}
              onChange={(e) =>
                updateData({ officialEmail: e.target.value })
              }
              placeholder="Enter your official email address"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}