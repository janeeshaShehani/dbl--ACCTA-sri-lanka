import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function ServicesStep({ data, updateData }: Props) {
  const fields = [
    ["services", "Tax and professional services offered"],
    ["yearsInTaxation", "Years of experience in taxation"],
    ["registrations", "Professional registrations or licences"],
    ["clientProfile", "Typical client profile"],
    ["firmProfile", "Brief firm profile"],
  ] as const;

  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION D
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Services and experience
        </h2>
      </div>

      <div className="mt-6 space-y-5">
        {fields.map(([key, label]) => (
          <div key={key}>
            <label className="text-sm font-semibold text-accta-ink">
              {label}
            </label>
            <textarea
              value={data[key]}
              onChange={(e) => updateData({ [key]: e.target.value })}
              rows={key === "yearsInTaxation" ? 2 : 4}
              className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}