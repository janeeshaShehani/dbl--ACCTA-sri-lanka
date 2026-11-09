"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  upcomingEvents,
  type EventType,
} from "@/data/events";

type FilterType = "All" | EventType;

const filters: FilterType[] = [
  "All",
  "Seminar",
  "Workshop",
  "Webinar",
  "Conference",
];

export default function UpcomingEvents() {
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("All");

  const filteredEvents =
    activeFilter === "All"
      ? upcomingEvents
      : upcomingEvents.filter(
          (event) => event.type === activeFilter
        );

  return (
    <section className="bg-accta-surface">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="font-serif text-3xl font-bold text-accta-navy">
            Upcoming events
          </h2>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "border-accta-navy bg-accta-navy text-white"
                    : "border-accta-navy bg-white text-accta-navy hover:bg-accta-navy hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-accta-muted">Preview listings — event details are awaiting confirmation. Online registration is not available yet.</p>

        {filteredEvents.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-md border border-accta-border bg-white"
              >
                {/* Event image */}
                <div className="flex h-48 items-center justify-center bg-accta-light-blue text-xs text-accta-muted">
                  {event.image ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={640}
                        height={384}
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="h-48 w-full object-cover"
                    />
                    ) : (
                    <div className="flex h-48 items-center justify-center bg-accta-surface text-sm text-accta-muted">
                        Event image
                    </div>
                    )}
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-accta-light-blue px-2 py-1 text-[10px] font-bold text-accta-navy">
                      {event.type}
                    </span>

                    <span className="bg-red-50 px-2 py-1 text-[10px] font-bold text-accta-maroon">
                      {event.points}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-lg font-bold text-accta-ink">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm text-accta-muted">
                    {event.date} · {event.time} · {event.venue}
                  </p>

                  <p className="mt-2 text-sm text-accta-muted">
                    Members {event.memberFee} · Non-members{" "}
                    {event.nonMemberFee}
                  </p>

                  <Link href={`/cpd-events/${event.id}`} className="mt-5 block w-full rounded border border-accta-navy px-4 py-3 text-center text-sm font-semibold text-accta-navy transition hover:bg-accta-navy hover:text-white">
                    Register
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-md border border-accta-border bg-white p-8 text-center text-accta-muted">
            No upcoming {activeFilter.toLowerCase()} events at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
