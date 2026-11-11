import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function RefereesStep({ data, updateData }: Props) {
  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION G
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Referees
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide the details of two professional referees who can
          support your membership application.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Referee 1 */}
        <div className="rounded-md border border-accta-border bg-white p-5">
          <h3 className="font-heading text-lg font-bold text-accta-navy">
            Referee 1 (ACCTA Member)
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-accta-ink">
                Full name
              </label>
              <input
                type="text"
                value={data.refereeOneName}
                onChange={(e) =>
                  updateData({ refereeOneName: e.target.value })
                }
                placeholder="Enter referee's full name"
                className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-accta-ink">
                Email address
              </label>
              <input
                type="email"
                value={data.refereeOneEmail}
                onChange={(e) =>
                  updateData({ refereeOneEmail: e.target.value })
                }
                placeholder="Enter email address"
                className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-accta-ink">
                Phone number
              </label>
              <input
                type="tel"
                value={data.refereeOnePhone}
                onChange={(e) =>
                  updateData({ refereeOnePhone: e.target.value })
                }
                placeholder="Enter phone number"
                className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
              />
            </div>
          </div>
        </div>

        {/* Referee 2 */}
        <div className="rounded-md border border-accta-border bg-white p-5">
          <h3 className="font-heading text-lg font-bold text-accta-navy">
            Referee 2 (ACCTA Member)
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-accta-ink">
                Full name
              </label>
              <input
                type="text"
                value={data.refereeTwoName}
                onChange={(e) =>
                  updateData({ refereeTwoName: e.target.value })
                }
                placeholder="Enter referee's full name"
                className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-accta-ink">
                Email address
              </label>
              <input
                type="email"
                value={data.refereeTwoEmail}
                onChange={(e) =>
                  updateData({ refereeTwoEmail: e.target.value })
                }
                placeholder="Enter email address"
                className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-accta-ink">
                Phone number
              </label>
              <input
                type="tel"
                value={data.refereeTwoPhone}
                onChange={(e) =>
                  updateData({ refereeTwoPhone: e.target.value })
                }
                placeholder="Enter phone number"
                className="mt-2 w-full rounded-md border border-accta-border px-4 py-3 text-sm outline-none focus:border-accta-maroon"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-md border-l-4 border-accta-gold bg-accta-surface px-5 py-4">
        <p className="text-sm leading-6 text-accta-ink">
          Please ensure that your referees are aware that their details have
          been provided as part of your ACCTA membership application.
        </p>
      </div>
    </div>
  );
}