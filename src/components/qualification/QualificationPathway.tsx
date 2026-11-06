import { qualificationLevels } from "@/data/qualification";

export default function QualificationPathway() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        PATHWAY
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
        From foundation to Graduate Diploma
      </h2>

      <div className="mt-8 grid overflow-hidden rounded-md border border-accta-border md:grid-cols-4">
        {/* Optional entry route */}
        <div className="border-b border-accta-border bg-accta-surface p-6 md:border-b-0 md:border-r">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accta-muted">
            Entry route · if needed
          </p>

          <h3 className="mt-3 font-serif text-lg font-bold text-accta-ink">
            Certificate of Associate Tax Technician (CATT)
          </h3>

          <p className="mt-3 text-sm leading-6 text-accta-muted">
            For candidates without an accounting, business or law background.
            Equal to SLQF Level 3 / NVQ Level 4.
          </p>
        </div>

        {/* Qualification levels */}
        {qualificationLevels.map((level) => (
          <div
            key={level.number}
            className="border-b border-accta-border p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <p className="font-serif text-2xl font-bold text-accta-border">
              {level.number}
            </p>

            <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-accta-maroon">
              {level.level}
            </p>

            <h3 className="mt-2 font-serif text-lg font-bold text-accta-navy">
              {level.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              {level.duration}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-accta-muted">
        Completing all three levels and the required experience leads to
        Associate membership (ACTA).
      </p>
    </section>
  );
}