import { qualificationLevels } from "@/data/qualification";

export default function QualificationPathway() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        PATHWAY
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
        From Foundation to Graduate Diploma
      </h2>

      <div className="mt-8 grid w-max max-w-full grid-flow-col auto-cols-max overflow-x-auto rounded-md border border-accta-border">

        {/* Qualification levels */}
        {qualificationLevels.map((level) => (
          <div
            key={level.number}
            className="border-r border-accta-border p-6 last:border-r-0"
          >
            <p className="font-serif text-2xl font-bold text-accta-maroon">
              {level.number}
            </p>

            <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-accta-maroon">
              {level.level}
            </p>

            <h3 className="mt-2 whitespace-nowrap font-serif text-lg font-bold text-accta-navy">
              {level.title}
            </h3>

            <h3 className="mt-2 text-xs text-accta-muted">
              {level.duration}
            </h3>

          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-accta-muted">
        Completing all levels and gaining three years of 
        experience leads to Associate Membership (ACTA).
      </p>
    </section>
  );
}