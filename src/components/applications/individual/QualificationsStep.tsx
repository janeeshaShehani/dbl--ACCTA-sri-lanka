import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function QualificationsStep({ data, updateData }: Props) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        SECTION D
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
        Qualifications
      </h2>

      <p className="mt-2 text-sm text-accta-muted">
        Add your academic and professional qualifications.
      </p>

      <div className="mt-6">
        <label className="font-semibold">Academic qualifications</label>
        <textarea
          value={data.qualifications}
          onChange={(e) => updateData({ qualifications: e.target.value })}
          placeholder="Enter your qualifications"
          className="mt-2 min-h-32 w-full rounded-md border border-accta-border p-3"
        />
      </div>

      <div className="mt-5">
        <label className="font-semibold">Professional memberships</label>
        <textarea
          value={data.professionalMemberships}
          onChange={(e) =>
            updateData({ professionalMemberships: e.target.value })
          }
          placeholder="Enter professional memberships"
          className="mt-2 min-h-32 w-full rounded-md border border-accta-border p-3"
        />
      </div>
    </div>
  );
}