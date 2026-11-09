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
            Student registration, payments and exam booking are not available yet. Contact ACCTA for qualification information.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded bg-white/80 px-5 py-3 text-sm font-semibold text-accta-maroon"
          >
            Register as a student
          </button>

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
