import { membershipClasses } from "@/data/membershipClasses";

const categoryGroups = [
  {
    title: "Standard Membership",
    badge: "For practitioners",
    ids: ["associate", "fellow"],
    description: "Persons professionally engaged in taxation practice.",
  },
  {
    title: "Academic Membership",
    badge: "For educators",
    ids: ["associate-academic", "fellow-academic"],
    description:
      "Persons engaged primarily in teaching, research or academic leadership in taxation.",
  },
  {
    title: "Affiliate Membership",
    badge: "",
    ids: ["affiliate"],
    description:
      "For people interested or engaged in taxation-related work who do not yet meet the requirements for Associate membership.",
  },
  {
    title: "Corporate Membership",
    badge: "Firms",
    ids: ["corporate"],
    description:
      "For partnerships, companies and other legal entities engaged in taxation and related services.",
  },
];

export default function MembershipCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        CATEGORIES
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy md:text-4xl">
        Choose the class that fits you
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {categoryGroups.map((group) => {
          const members = membershipClasses.filter((item) =>
            group.ids.includes(item.id)
          );

          return (
            <article
              key={group.title}
              className="border-t-2 border-accta-navy rounded-md border border-accta-border bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl font-bold text-accta-navy">
                  {group.title}
                </h3>

                {group.badge && (
                  <span className="rounded bg-accta-surface px-2 py-1 text-[10px] font-semibold text-accta-navy">
                    {group.badge}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-accta-muted">
                {group.description}
              </p>

              <div className="mt-5 space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="text-sm">
                    <div className="flex gap-4">
                      <span className="min-w-12 font-serif font-bold text-accta-maroon">
                        {member.letters}
                      </span>

                      <div>
                        <span className="font-semibold text-accta-ink">
                          {member.category}.
                        </span>{" "}
                        <span className="text-accta-muted">
                          {member.eligibility}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}

        {/* Honorary Membership */}
        <article className="md:col-span-2 rounded-md border border-accta-border bg-accta-surface p-6">
          <h3 className="font-serif text-xl font-bold text-accta-navy">
            Honorary Membership – FCTA (Hons) / FACTA (Hons)
          </h3>

          <p className="mt-3 text-sm leading-6 text-accta-muted">
            Conferred by the Council, by invitation only, on distinguished
            persons who promote the objectives of the Association. No fees are
            payable.
          </p>
        </article>
      </div>
    </section>
  );
}