import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function DirectorsStep({ data, updateData }: Props) {
  const fields = [
    {
      key: "directors",
      label: "Directors and key officers",
      placeholder: "Enter names and positions",
    },
    {
      key: "shareholders",
      label: "Shareholders and ownership details",
      placeholder: "Enter shareholder information",
    },
    {
      key: "parentFirm",
      label: "Parent firm or group",
      placeholder: "Enter parent firm details if applicable",
    },
  ] as const;

  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION C
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Directors and shareholders
        </h2>
      </div>

      <div className="mt-6 space-y-5">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-semibold text-accta-ink">
              {label}
            </label>
            <textarea
              value={data[key]}
              onChange={(e) => updateData({ [key]: e.target.value })}
              placeholder={placeholder}
              rows={4}
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}