import Link from "next/link";

const applicationSteps = [
  {
    number: "1",
    title: "Check eligibility",
    description: "Pick one category and one route of admission.",
  },
  {
    number: "2",
    title: "Apply online",
    description: "Complete the online form and upload certified documents and attachments.",
  },
  {
    number: "3",
    title: "Review and approval",
    description:
      "The MPC Committee reviews; the Council decides. An interview may be required.",
  },
  {
    number: "4",
    title: "Pay and receive certificate",
    description:
      "Pay online, receive your membership number and certificate.",
  },
];

export default function HowToApply() {
  return (
    <section id="how-to-apply" className="bg-accta-navy scroll-mt-8">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-light-blue">
          HOW TO APPLY
        </p>

        <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">
          Four steps to membership
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {applicationSteps.map((step) => (
            <div
              key={step.number}
              className="border-t border-white/40 pt-4"
            >
              <span className="font-serif text-2xl font-bold text-accta-maroon">
                {step.number}
              </span>

              <h3 className="mt-4 text-sm font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-xs leading-5 text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Application buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/membership/apply/individual"
            className="w-fit rounded-sm bg-accta-maroon px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Start individual application (M-01)
          </Link>

          <Link
            href="/membership/apply/corporate"
            className="w-fit rounded-sm border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-accta-navy"
          >
            Start corporate application (M-02)
          </Link>
        </div>
      </div>
    </section>
  );
}
