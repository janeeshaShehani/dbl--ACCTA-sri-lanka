import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { upcomingEvents } from "@/data/events";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = upcomingEvents.find((item) => String(item.id) === id);
  return { title: `${event?.title ?? "Event"} | ACCTA Sri Lanka`, robots: { index: false, follow: true } };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = upcomingEvents.find((item) => String(item.id) === id);
  if (!event) notFound();
  return <section className="bg-accta-surface px-5 py-14 md:py-20">
    <article className="mx-auto max-w-3xl rounded-md border border-accta-border bg-white p-6 sm:p-10">
      <Link href="/cpd-events" className="text-sm font-semibold text-accta-navy underline underline-offset-4">Back to CPD & Events</Link>
      <p className="mt-8 text-xs font-bold tracking-wider text-accta-maroon">{event.type} · {event.points}</p>
      <h1 className="mt-3 font-heading text-3xl font-bold text-accta-navy md:text-4xl">{event.title}</h1>
      <p className="mt-5 leading-7 text-accta-muted">{event.date} · {event.time} · {event.venue}</p>
      <p className="mt-3 text-sm text-accta-muted">Members {event.memberFee} · Non-members {event.nonMemberFee}</p>
      <p id="event-availability" className="mt-8 rounded border border-accta-border bg-accta-surface p-4 text-sm leading-6 text-accta-muted">This is a preview listing. Event details are awaiting confirmation, and online registration is not available yet.</p>
      <button type="button" disabled aria-describedby="event-availability" className="mt-6 min-h-11 cursor-not-allowed rounded bg-accta-maroon/70 px-6 py-3 font-semibold text-white">Register</button>
    </article>
  </section>;
}
