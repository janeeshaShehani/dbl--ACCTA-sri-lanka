export default function Functions() {

  const functions= [
    {
      title: "Membership regulation",
      description:
        "Admit, classify and register members; keep the register of members in good standing.",
    },
    {
      title: "Examinations",
      description:
        "Conduct examinations and set standards for entry, progression and certification.",
    },
    {
      title: "Disciplinary oversight",
      description:
        "Investigate complaints and impose disciplinary measures.",
    },
    {
      title: "CPD administration",
      description:
        "Prescribe CPD requirements and monitor compliance.",
    },
    {
      title: "Guidance and standards",
      description:
        "Issue technical guidance, practice notes and standards.",
    },
    {
      title: "Education and training",
      description:
        "Courses, conferences, workshops and webinars.",
    },
    {
      title: "Publications",
      description:
        "Journals, newsletters, research papers and professional materials.",
    },
    {
      title: "Stakeholder engagement",
      description:
        "Work with tax authorities, policymakers, academia and industry.",
    },
    {
      title: "Accreditation",
      description:
        "Recognise educational programmes and training partners.",
    },
  ]

  return (
    <section id="functions" className="scroll-mt-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        FUNCTIONS
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy md:text-4xl">
        How we deliver those objectives
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {functions.map((item) => (
          <div
            key={item.title}
            className="rounded-md border border-accta-border bg-white p-6 transition hover:shadow-md"
          >
            <h3 className="font-semibold text-accta-navy">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}