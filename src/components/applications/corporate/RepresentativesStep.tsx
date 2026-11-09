import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
};

export default function RepresentativesStep({ data, updateData }: Props) {
  return (
    <div>
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION E
        </p>
        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Company representatives
        </h2>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Nominated representative
          </label>
          <input
            value={data.nominatedRepresentative}
            onChange={(e) =>
              updateData({ nominatedRepresentative: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Nominated representative email
          </label>
          <input
            type="email"
            value={data.nominatedEmail}
            onChange={(e) => updateData({ nominatedEmail: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Alternate representative
          </label>
          <input
            value={data.alternateRepresentative}
            onChange={(e) =>
              updateData({ alternateRepresentative: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-accta-ink">
            Alternate representative email
          </label>
          <input
            type="email"
            value={data.alternateEmail}
            onChange={(e) => updateData({ alternateEmail: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>
      </div>
    </div>
  );
}