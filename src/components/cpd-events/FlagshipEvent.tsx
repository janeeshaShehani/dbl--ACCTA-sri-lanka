export default function FlagshipEvent() {
  return (
    <section className="bg-accta-surface pb-14 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col gap-6 rounded-md bg-accta-navy p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-accta-maroon">
              FLAGSHIP EVENT
            </p>

            <h2 className="mt-3 font-serif text-2xl font-bold">
              International Tax Conclave
            </h2>

            <p className="mt-2 text-sm text-white/80">
              Dates, venue, speakers, programme and registration to be announced.
            </p>
          </div>

          <button type="button" disabled title="Registration is not available yet" className="cursor-not-allowed rounded bg-white/80 px-5 py-3 text-sm font-semibold text-accta-navy">
            Register interest
          </button>
        </div>
      </div>
    </section>
  );
}
