import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function ExperienceStep({ data, updateData }: Props) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        SECTION E
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
        Employment and experience
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="font-semibold">Current employment</label>
          <textarea
            value={data.employmentDetails}
            onChange={(e) =>
              updateData({ employmentDetails: e.target.value })
            }
            className="mt-2 min-h-28 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label className="font-semibold">Experience</label>
          <textarea
            value={data.experience}
            onChange={(e) => updateData({ experience: e.target.value })}
            className="mt-2 min-h-28 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label className="font-semibold">Areas of expertise</label>
          <input
            type="text"
            value={data.expertise}
            onChange={(e) => updateData({ expertise: e.target.value })}
            className="mt-2 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div>
          <label className="font-semibold">
            Professional statement (if applicable)
          </label>
          <textarea
            value={data.statement}
            onChange={(e) => updateData({ statement: e.target.value })}
            placeholder="Maximum 300 words"
            className="mt-2 min-h-36 w-full rounded-md border border-accta-border p-3"
          />
        </div>
      </div>
    </div>
  );
}