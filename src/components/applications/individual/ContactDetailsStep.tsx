import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function ContactDetailsStep({ data, updateData }: Props) {
  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION C
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Contact details
        </h2>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label>Residential address</label>
          <textarea
            value={data.residentialAddress}
            onChange={(e) =>
              updateData({ residentialAddress: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label>Official address</label>
          <textarea
            value={data.officialAddress}
            onChange={(e) =>
              updateData({ officialAddress: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label>Mobile number</label>
          <input
            type="tel"
            value={data.mobile}
            onChange={(e) => updateData({ mobile: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label>WhatsApp number</label>
          <input
            type="tel"
            value={data.whatsapp}
            onChange={(e) => updateData({ whatsapp: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label>Personal email</label>
          <input
            type="email"
            value={data.personalEmail}
            onChange={(e) => updateData({ personalEmail: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label>Official email</label>
          <input
            type="email"
            value={data.officialEmail}
            onChange={(e) => updateData({ officialEmail: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>
      </div>
    </div>
  );
}