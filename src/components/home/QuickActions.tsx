import Link from "next/link";
import {
    UserRoundPlus,
    CreditCard,
    Search,
    CalendarDays,
    } from "lucide-react";

export default function QuickActions() {

    const quickActions = [
    {
        title: "Apply for membership",
        description:
        "Associate, Fellow, Academic, Affiliate and Corporate categories.",
        href: "/membership/apply",
        icon: UserRoundPlus,
    },
    {
        title: "Renew and pay online",
        description:
        "Annual subscription, licence and CPD payments.",
        href: "/payment",
        icon: CreditCard,
    },
    {
        title: "Find a tax advisor",
        description:
        "Search the public register and verify a member.",
        href: "/find-advisor",
        icon: Search,
    },
    {
        title: "Book a CPD event",
        description:
        "Seminars, workshops and webinars with CPD points.",
        href: "/cpd-events",
        icon: CalendarDays,
    },
    ];


  return (
    <section className="bg-white py-10 md:py-15">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-md border border-accta-border bg-white p-6 transition hover:border-accta-maroon hover:shadow-sm"
              >
                <Icon
                  size={24}
                  strokeWidth={1.8}
                  className="text-accta-maroon"
                />

                <h3 className="mt-3 font-heading text-lg font-bold text-accta-navy transition group-hover:text-accta-maroon">
                  {action.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-accta-muted">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}