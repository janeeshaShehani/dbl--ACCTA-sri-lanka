export default function PatronAdvisory() {
  return (
    <section
      id="patron-advisory"
      className="scroll-mt-8 grid gap-4 md:grid-cols-2"
    >
      <article className="rounded-md border border-accta-border bg-white p-6">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          PATRON
        </p>

        <h2 className="mt-5 font-serif text-2xl font-bold text-accta-navy">
          [Patron name]
        </h2>

        <p className="mt-4 text-sm leading-7 text-accta-muted">
          A distinguished individual who lends moral authority and high-level
          guidance, supports advocacy, and attends convocations and milestone
          events. Not involved in day-to-day management.
        </p>
      </article>

      <article className="rounded-md border border-accta-border bg-white p-6">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          ADVISORY BOARD
        </p>

        <h2 className="mt-5 font-serif text-2xl font-bold text-accta-navy">
          Up to five eminent persons
        </h2>

        <p className="mt-4 text-sm leading-7 text-accta-muted">
          Appointed by the Council for up to two years to advise on strategy.
          The Council seeks its views but is not bound by them.
        </p>
      </article>
    </section>
  );
}