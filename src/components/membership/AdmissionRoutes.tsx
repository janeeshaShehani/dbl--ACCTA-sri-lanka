const admissionRoutes = [
  {
    title: "ACCTA examinations and practical experience",
    category: "Associate",
  },
  {
    title: "Membership of a recognised local professional body",
    category: "All categories",
  },
  {
    title: "Recognised foreign qualification or professional membership",
    category: "All categories",
  },
  {
    title: "Upgrade from existing ACCTA membership",
    category: "Fellow, Fellow Academic, Affiliate to Associate",
  },
  {
    title: "Mature entry — at least 15 years' taxation experience",
    category: "Associate (Standard only)",
    highlight: true,
  },
  {
    title:
      "Mature entry — at least 25 years' experience, 10 in a senior role",
    category: "Fellow (Standard only)",
    highlight: true,
  },
];

export default function AdmissionRoutes() {
  return (
    <section id="admission-routes" className="bg-accta-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left content */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
              ROUTES OF ADMISSION
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
              More than one way in
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-accta-muted">
              Select one route when you apply. The Council may call you for an
              interview or ask for further evidence.
            </p>
          </div>

          {/* Routes */}
          <div className="space-y-3">
            {admissionRoutes.map((route) => (
              <div
                key={route.title}
                className={`flex flex-col justify-between gap-2 rounded-md border border-accta-border bg-white px-5 py-4 sm:flex-row sm:items-center ${
                  route.highlight
                    ? "border-l-2 border-l-accta-maroon"
                    : ""
                }`}
              >
                <p className="text-sm font-medium text-accta-ink">
                  {route.title}
                </p>

                <span className="shrink-0 text-xs text-accta-muted">
                  {route.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
