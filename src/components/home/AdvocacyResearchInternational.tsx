

export default function AdvocacyResearch() {

    const insightItems = [
        {
            id: 1,
            label: "Advocacy",
            title: "A voice in tax policy",
            description:
            "We represent members in consultations with government, the Inland Revenue Department, regulators and other stakeholders.",
        },
        {
            id: 2,
            label: "Research",
            title: "Journal, case law and tax manuals",
            description:
            "The Research & Technical Committee publishes the Journal of Compliance Management, technical papers and a Tax Case Law book.",
        },
        {
            id: 3,
            label: "International",
            title: "Chapters overseas",
            description:
            "Where 15 or more members live in one country, they may form an ACCTA Chapter. International members pay fees in USD.",
        },
        ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {insightItems.map((item) => (
            <article key={item.id}>
              {/* Section Label */}
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-accta-maroon">
                {item.label}
              </p>

              {/* Title */}
              <h2 className="mt-1 font-heading text-xl font-bold text-accta-navy">
                {item.title}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-accta-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}