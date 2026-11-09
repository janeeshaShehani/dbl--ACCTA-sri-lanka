import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function RefereesStep({ data, updateData }: Props) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        SECTION G
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
        Referees
      </h2>

      <p className="mt-2 text-sm text-accta-muted">
        Please provide details for two referees.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-md border border-accta-border p-5">
          <h3 className="font-bold text-accta-navy">Referee 1</h3>

          <input
            value={data.refereeOneName}
            onChange={(e) =>
              updateData({ refereeOneName: e.target.value })
            }
            placeholder="Full name"
            className="mt-4 w-full rounded-md border border-accta-border p-3"
          />

          <input
            type="email"
            value={data.refereeOneEmail}
            onChange={(e) =>
              updateData({ refereeOneEmail: e.target.value })
            }
            placeholder="Email address"
            className="mt-3 w-full rounded-md border border-accta-border p-3"
          />

          <input
            value={data.refereeOnePhone}
            onChange={(e) =>
              updateData({ refereeOnePhone: e.target.value })
            }
            placeholder="Phone number"
            className="mt-3 w-full rounded-md border border-accta-border p-3"
          />
        </div>

        <div className="rounded-md border border-accta-border p-5">
          <h3 className="font-bold text-accta-navy">Referee 2</h3>

          <input
            value={data.refereeTwoName}
            onChange={(e) =>
              updateData({ refereeTwoName: e.target.value })
            }
            placeholder="Full name"
            className="mt-4 w-full rounded-md border border-accta-border p-3"
          />

          <input
            type="email"
            value={data.refereeTwoEmail}
            onChange={(e) =>
              updateData({ refereeTwoEmail: e.target.value })
            }
            placeholder="Email address"
            className="mt-3 w-full rounded-md border border-accta-border p-3"
          />

          <input
            value={data.refereeTwoPhone}
            onChange={(e) =>
              updateData({ refereeTwoPhone: e.target.value })
            }
            placeholder="Phone number"
            className="mt-3 w-full rounded-md border border-accta-border p-3"
          />
        </div>
      </div>
    </div>
  );
}