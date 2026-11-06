
export default function Committees() {

  const committees= [
    {
      code: "MPC",
      title: "Membership and Professional Conduct",
      description:
        "Members Development (CPD, seminars, recruitment) and Ethics & Professional Conduct (disciplinary matters, professional practice) sub-committees.",
    },
    {
      code: "LTE",
      title: "Learning, Testing and Evaluation",
      description: "Curriculum, programme delivery and examinations.",
    },
    {
      code: "BPR",
      title: "Business Promotion and International Relations",
      description:
        "MOUs, collaboration with schools, universities and professional bodies, international promotion.",
    },
    {
      code: "RTC",
      title: "Research and Technical",
      description:
        "International Tax Conclave, Journal of Compliance Management, technical papers, Tax Case Law book and Tax Manual.",
    },
    {
      code: "FOC",
      title: "Finance and Operations",
      description:
        "Finance and day-to-day operation of the Secretariat. Chaired by the President.",
    },
  ]

  return (
    <section id="committees" className="scroll-mt-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        COMMITTEES
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy md:text-4xl">
        Standing committees of the Council
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {committees.map((committee) => (
          <article
            key={committee.code}
            className="rounded-md border border-accta-border bg-white p-6"
          >
            <div className="flex items-start gap-3">
              <span className="rounded bg-accta-surface px-2 py-1 text-xs font-bold text-accta-navy">
                {committee.code}
              </span>

              <h3 className="font-semibold text-accta-navy">
                {committee.title}
              </h3>
            </div>

            <p className="mt-4 text-sm leading-6 text-accta-muted">
              {committee.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}