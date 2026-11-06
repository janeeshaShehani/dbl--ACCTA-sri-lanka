import Link from "next/link";

export default function MembershipHero() {
  return (
    <section className="bg-accta-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <p className="text-xs text-white/70">
          Home / Membership
        </p>

        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              Membership
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
              Join a professional community committed to competence, ethics and
              the public interest. Applicants must be at least 18 years old.
              Admission is at the discretion of the Council.
            </p>
          </div>

          <Link
            href="#how-to-apply"
            className="inline-flex w-fit items-center justify-center rounded-sm bg-accta-maroon px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Apply online
          </Link>
        </div>
      </div>
    </section>
  );
}