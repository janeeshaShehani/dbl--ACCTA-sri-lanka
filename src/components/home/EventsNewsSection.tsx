import Link from "next/link";
import { upcomingEvents } from "@/data/events";
import { newsItems } from "@/data/news";

export default function EventsNews() {
  return (
    <section className="bg-accta-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-accta-navy">
                Upcoming CPD & Events
              </h2>

              <Link
                href="/cpd-events"
                className="text-sm font-semibold text-accta-navy underline underline-offset-4 hover:text-accta-maroon"
              >
                All events →
              </Link>
            </div>

            <p className="mt-4 text-xs leading-5 text-accta-muted">Preview listings — details are awaiting confirmation. Registration is not yet available.</p>
            <div className="mt-6 space-y-4">
              {upcomingEvents.slice(0, 3).map((event) => (
                <article
                  key={event.id}
                  className="flex flex-wrap items-center gap-4 rounded-md border border-accta-border bg-white p-5"
                >
                  {/* Date */}
                  <div className="flex min-w-16 flex-col items-center border-r border-accta-border pr-4">
                    <span className="font-heading text-2xl font-bold text-accta-navy">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-xs font-bold text-accta-maroon">
                      {event.date.split(" ")[1]}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded bg-accta-surface px-2 py-1 text-[10px] font-semibold text-accta-navy">
                        {event.type}
                      </span>

                      <span className="rounded bg-accta-surface px-2 py-1 text-[10px] font-semibold text-accta-navy">
                        {event.points}
                      </span>
                    </div>

                    <h3 className="mt-2 font-heading text-[15px] font-semibold text-accta-ink">
                      {event.title}
                    </h3>

                    <p className="mt-1 text-xs text-accta-muted">
                      {event.time} · {event.venue}
                    </p>
                  </div>

                  {/* Register Button */}
                  {event.registrationLink ? (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded border border-accta-navy px-4 py-2 text-sm font-semibold text-accta-navy transition hover:bg-accta-navy hover:text-white"
                    >
                      Register
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex min-h-11 cursor-not-allowed items-center rounded border border-accta-border bg-accta-surface px-4 py-2 text-sm font-semibold text-accta-muted opacity-60"
                    >
                      Register
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* News & Notices */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-accta-navy">
                News & Notices
              </h2>

              <Link
                href="/publications"
                className="text-sm font-semibold text-accta-navy underline underline-offset-4 hover:text-accta-maroon"
              >
                All news →
              </Link>
            </div>

            <div className="mt-6 rounded-md border border-accta-border bg-white p-6">
              {newsItems.map((news, index) => (
                <article
                  key={news.id}
                  className={
                    index !== newsItems.length - 1
                      ? "border-b border-accta-border py-5 first:pt-0"
                      : "pt-5"
                  }
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-accta-maroon">
                    {news.category}
                  </p>

                  <h3 className="mt-2 font-semibold text-accta-ink">
                    {news.title}
                  </h3>

                  <p className="mt-1 text-xs text-accta-muted">
                    {news.date}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
