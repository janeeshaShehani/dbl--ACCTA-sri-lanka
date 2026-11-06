import Link from "next/link";
import { qualificationLevels } from "@/data/qualification";

export default function QualificationSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accta-maroon">
            The CCTA Qualification
          </p>

          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-accta-navy ">
            Three levels. On-demand, computer-based exams.
          </h2>

          <p className="mt-4 text-sm leading-6 text-accta-muted md:text-base">
            Built on a taxation competency framework and designed to be
            compatible with SLQF Level 6 / NVQ Level 7. Sit exams at any time
            of the year.
          </p>
        </div>

        {/* Qualification Levels */}
        <div className="mt-10 grid overflow-hidden rounded-md border border-accta-border md:grid-cols-3">
          {qualificationLevels.map((qualification, index) => (
            <div
              key={qualification.number}
              className={`p-7 ${
                index !== qualificationLevels.length - 1
                  ? "border-b border-accta-border md:border-b-0 md:border-r"
                  : "bg-accta-surface"
              }`}
            >
              <p className="font-heading text-4xl font-bold text-slate-300">
                {qualification.number}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-accta-navy">
                {qualification.level}
              </p>

              <h3 className="mt-4 font-heading text-lg font-semibold text-accta-ink">
                {qualification.title}
              </h3>

              <p className="mt-4 text-sm text-accta-muted">
                {qualification.duration}
              </p>
            </div>
          ))}
        </div>

        {/* CATT Entry Route */}
        <p className="mt-7 text-sm leading-6 text-accta-muted">
          No accounting, business or law background? Start with the Certificate
          of Associate Tax Technician (CATT), equal to SLQF Level 3 / NVQ Level
          4.{" "}
          <Link
            href="/qualification"
            className="font-bold text-accta-navy underline underline-offset-4 hover:text-accta-maroon"
          >
            See the full pathway →
          </Link>
        </p>
      </div>
    </section>
  );
}