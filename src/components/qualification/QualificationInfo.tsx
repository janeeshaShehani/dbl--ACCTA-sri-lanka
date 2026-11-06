export default function QualificationInfo() {
  const information = [
    {
      label: "EXAMINATIONS",
      title: "Book an exam when you are ready",
      description:
        "Exams are computer-based and available on demand throughout the year. Exam centres and online proctoring details will be confirmed.",
    },
    {
      label: "EXEMPTIONS",
      title: "Recognition of prior learning",
      description:
        "Holders of recognised professional and academic qualifications may apply for exemptions.",
    },
    {
      label: "RESOURCES",
      title: "Syllabus and student guide",
      description:
        "Student guide (PDF) · Syllabus (PDF) · Exam regulations · FAQs",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-10 md:grid-cols-3">
        {information.map((item) => (
          <article key={item.label}>
            <p className="text-[10px] font-bold tracking-[0.18em] text-accta-maroon">
              {item.label}
            </p>

            <h3 className="mt-3 font-serif text-xl font-bold text-accta-navy">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}