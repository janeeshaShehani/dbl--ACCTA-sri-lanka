export default function QualificationHero() {
  return (
    <section className="bg-accta-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <p className="text-xs text-white/70">
          Home / Qualification
          
        </p>

        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">
          The Certified Chartered Tax Advisor (CCTA) qualification
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/85 md:text-base">
          Advanced competence in taxation, regulatory compliance and ethical
          professional conduct. Open to anyone who wants a career in taxation.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Designed for SLQF Level 6",
            "On-demand computer based exams",
            "Study at your own pace",
          ].map((item) => (
            <span
              key={item}
              className="rounded bg-white/10 px-3 py-1.5 text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}