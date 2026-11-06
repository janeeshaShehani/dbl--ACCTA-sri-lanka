const stats = [
  {
    value: "20",
    title: "CPD points every year",
    description:
      "Required to renew membership. A set share may come from non-verifiable learning; the rest must be verifiable.",
  },
  {
    value: "Tracked online",
    title: "Your CPD record in the member portal",
    description:
      "Points for ACCTA seminars, workshops and webinars are added automatically when you attend. Log other learning yourself and upload the evidence.",
    highlight: true,
  },
  {
    value: "2",
    title: "Factors set the points",
    description:
      "Each session is allocated points by level of knowledge and length of session. Organised by the Members Development sub-committee.",
  },
];

export default function CPDStats() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-12 md:grid-cols-3 md:px-8 md:py-16">
        {stats.map((stat) => (
          <article
            key={stat.value}
            className={`rounded-md border bg-white p-6 ${
              stat.highlight
                ? "border-accta-maroon border-t-2"
                : "border-accta-border border-t-2 border-t-accta-navy"
            }`}
          >
            <h2
              className={`font-serif text-3xl font-bold ${
                stat.highlight
                  ? "text-accta-maroon"
                  : "text-accta-navy"
              }`}
            >
              {stat.value}
            </h2>

            <h3 className="mt-2 text-sm font-bold text-accta-ink">
              {stat.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              {stat.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}