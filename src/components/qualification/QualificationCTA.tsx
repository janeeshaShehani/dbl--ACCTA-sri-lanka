import Link from "next/link";

export default function QualificationCTA() {
  return (
    <section className="bg-accta-maroon">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div>
          <h2 className="font-serif text-3xl font-bold text-white">
            Start your CCTA journey
          </h2>

          <p className="mt-2 text-sm text-white/80">
            Register online, pay your student fee and book your first exam.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="#"
            className="rounded bg-white px-5 py-3 text-sm font-semibold text-accta-maroon transition hover:bg-accta-surface"
          >
            Register as a student
          </Link>

          <Link
            href="/contact"
            className="rounded border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Talk to an advisor
          </Link>
        </div>
      </div>
    </section>
  );
}