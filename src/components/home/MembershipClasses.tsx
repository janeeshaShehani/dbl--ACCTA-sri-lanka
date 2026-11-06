import Link from "next/link";
import { membershipClasses } from "@/data/membershipClasses";

export default function MembershipClasses() {
  // Only show the six primary membership categories on the homepage
  const featuredMemberships = membershipClasses.filter(
    (membership) =>
      !["honorary"].includes(membership.id)
  );

  return (
    <section className="bg-accta-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accta-maroon">
              Membership
            </p>

            <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight text-accta-navy ">
              A membership class for every stage of a tax career.
            </h2>
          </div>

          <Link
            href="/membership"
            className="inline-flex w-fit rounded bg-accta-navy px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            Compare categories and fees
          </Link>
        </div>

        {/* Membership Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredMemberships.map((membership) => (
            <div
              key={membership.id}
              className="rounded-md border border-accta-border bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-heading text-lg font-bold text-accta-navy">
                  {membership.category}
                </h3>

                <span className="shrink-0 text-sm font-bold text-accta-maroon">
                  {membership.letters}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-accta-muted">
                {membership.eligibility}
              </p>
            </div>
          ))}
        </div>

        {/* Mature Entry Banner */}
        <div className="mt-6 flex flex-col gap-6 rounded-md bg-accta-navy p-7 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-heading text-xl font-bold">
              Experienced, but without the formal qualification?
            </h3>

            <p className="mt-2 max-w-4xl text-sm leading-6 text-white/80">
              Mature entry is open for Standard Membership: 15 years&apos;
              taxation experience for Associate, or 25 years including 10 in a
              senior role for Fellow.
            </p>
          </div>

          <Link
            href="/membership/mature-entry"
            className="shrink-0 rounded border border-white px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white hover:text-accta-navy"
          >
            About mature entry
          </Link>
        </div>
      </div>
    </section>
  );
}