
export default function Objectives() {

  const objectives= [
    {
      number: "01",
      title: "Promote professional excellence",
      description:
        "The highest standards of competence, integrity and ethical conduct among Certified Chartered Tax Advisors.",
    },
    {
      number: "02",
      title: "Advance the tax advisory profession",
      description:
        "Develop, regulate and strengthen the profession in line with national and international best practice.",
    },
    {
      number: "03",
      title: "Safeguard the public interest",
      description:
        "Tax advice delivered in a way that protects the public and supports sound tax governance.",
    },
    {
      number: "04",
      title: "Education and qualification",
      description:
        "Design, award and regulate the CCTA qualification and other approved programmes.",
    },
    {
      number: "05",
      title: "Continuing professional development",
      description:
        "Lifelong learning through mandatory CPD, training, seminars and workshops.",
    },
    {
      number: "06",
      title: "Ethics and professional conduct",
      description:
        "Establish, monitor and enforce a code of ethics for all members.",
    },
    {
      number: "07",
      title: "Research and knowledge",
      description:
        "Research, publications and thought leadership in taxation and public finance.",
    },
    {
      number: "08",
      title: "Representation and advocacy",
      description:
        "Represent members in consultations with government and regulators.",
    },
    {
      number: "09",
      title: "International collaboration",
      description:
        "Relationships with local, regional and international professional bodies.",
    },
    {
      number: "10",
      title: "Capacity building",
      description:
        "Build tax advisory capacity among practitioners, institutions and the community.",
    },
  ]

  return (
    <section id="objectives" className="scroll-mt-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        OBJECTIVES
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy md:text-4xl">
        What the Association exists to do
      </h2>

      <div className="mt-6 grid border-t border-accta-border md:grid-cols-2">
        {objectives.map((objective) => (
          <div
            key={objective.number}
            className="flex gap-5 border-b border-accta-border py-6 md:px-6 md:odd:border-r"
          >
            <span className="font-serif text-2xl font-bold text-accta-maroon">
              {objective.number}
            </span>

            <div>
              <h3 className="font-semibold text-accta-ink">
                {objective.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-accta-muted">
                {objective.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}