import Image from "next/image";

export default function Emblem() {
  return (
    <section
      id="our-emblem"
      className="scroll-mt-8 rounded-lg bg-accta-surface p-6 md:p-10"
    >
      <div className="grid items-center gap-10 md:grid-cols-[220px_1fr]">
        <div className="flex justify-center">
          <Image
            src="/images/logo.png"
            alt="ACCTA Sri Lanka emblem"
            width={220}
            height={220}
            className="h-auto w-full max-w-[220px] object-contain"
          />
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
            OUR EMBLEM
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
            Protection, strength and balance
          </h2>

          <p className="mt-5 leading-7 text-accta-muted">
            <strong className="text-accta-ink">The shield</strong> stands for
            trust and institutional authority.{" "}
            <strong className="text-accta-ink">The central pillar</strong>{" "}
            stands for strength, stability and enduring principles.{" "}
            <strong className="text-accta-ink">The scales</strong> stand for
            fairness, equity and impartial judgment between taxpayer and state.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-accta-muted">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-accta-navy" />
              Navy — trust, credibility
            </div>

            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-accta-maroon" />
              Maroon — integrity, leadership
            </div>

            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded border border-accta-border bg-white" />
              White — clarity, transparency
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}