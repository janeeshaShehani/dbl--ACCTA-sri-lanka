const competencyAreas = [
  {
    title: "Direct tax",
    topics: [
      "Individual income tax",
      "Partnership tax",
      "Corporate tax",
      "Banking and finance",
      "Trusts",
      "Withholding tax",
    ],
  },
  {
    title: "Indirect tax",
    topics: ["VAT", "SSCL", "Stamp duty"],
  },
  {
    title: "Other taxes",
    topics: [
      "Customs duty",
      "PAL",
      "Excise duty",
      "Telecommunication levy",
      "Vehicle tax",
      "TDL",
    ],
  },
  {
    title: "Professional and cross-cutting modules",
    topics: [
      "International taxation",
      "Transfer pricing",
      "Tax administration",
      "Case law application",
      "Digital taxation",
      "Tax psychology and behavioural economics",
      "Tax forensics",
      "Accounting and finance",
      "Business strategy",
      "Legal principles",
      "Governance and ethics",
    ],
  },
];

export default function CompetencyFramework() {
  return (
    <section className="bg-accta-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          COMPETENCY FRAMEWORK
        </p>

        <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
          What you will learn
        </h2>

        <p className="mt-3 text-sm text-accta-muted">
          Every paper maps to the ACCTA taxation competency framework.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {competencyAreas.slice(0, 3).map((area) => (
            <article
              key={area.title}
              className="rounded-md border border-accta-border bg-white p-5"
            >
              <h3 className="font-serif text-lg font-bold text-accta-navy">
                {area.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {area.topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-accta-surface px-2 py-1 text-[11px] font-medium text-accta-ink"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Professional modules */}
        <article className="mt-4 rounded-md border border-accta-border bg-white p-5">
          <h3 className="font-serif text-lg font-bold text-accta-navy">
            {competencyAreas[3].title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {competencyAreas[3].topics.map((topic) => (
              <span
                key={topic}
                className={`px-2 py-1 text-[11px] font-medium ${
                  topic === "Governance and ethics"
                    ? "bg-accta-maroon text-white"
                    : "bg-accta-surface text-accta-ink"
                }`}
              >
                {topic}
              </span>
            ))}
          </div>
        </article>

        <p className="mt-6 rounded-md bg-white p-4 text-sm leading-6 text-accta-muted">
          The Governance and Ethics module follows the UK tax advisers&apos;
          framework. Affiliate members who pass this paper become eligible for
          Associate membership.
        </p>
      </div>
    </section>
  );
}