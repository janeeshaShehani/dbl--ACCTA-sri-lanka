"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

const publications = [
  {
    title: "Journal of Compliance Management",
    description: "Research on tax compliance and administration.",
  },
  {
    title: "Tax Case Law",
    description: "Digest of Sri Lankan tax case law and appeal decisions.",
  },
  {
    title: "Tax Manual",
    description: "Practical reference for Sri Lankan taxes.",
  },
  {
    title: "Technical papers",
    description: "Practice notes and technical guidance for members.",
  },
];

const newsItems = [
  {
    date: "15 Nov 2026",
    tag: "NOTICE",
    title: "Member information and professional updates",
  },
  {
    date: "10 Nov 2026",
    tag: "TAX UPDATE",
    title: "Latest developments in taxation",
  },
  {
    date: "05 Nov 2026",
    tag: "NEWS",
    title: "ACCTA news and announcements",
  },
  {
    date: "01 Nov 2026",
    tag: "NEWSLETTER",
    title: "Monthly member newsletter",
  },
];

export default function PublicationsNews() {
  const [activeTag, setActiveTag] = useState("ALL");
  // Apply the selected tag without changing the supplied preview entries.
  const filteredNews = newsItems.filter((item) => activeTag === "ALL" || item.tag === activeTag);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <p className="text-[10px] font-bold tracking-[0.18em] text-accta-maroon">
          PUBLICATIONS & KNOWLEDGE
        </p>

        <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
          Research, guidance and tax updates
        </h2>
        <p className="mt-4 text-sm leading-6 text-accta-muted">Publication files and approved news are awaiting release. The entries below preview the planned content.</p>

        {/* Publications */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {publications.map((publication) => (
            <article
              key={publication.title}
              className="rounded-md border border-accta-border p-4"
            >
              <div className="flex h-44 flex-col items-center justify-center gap-3 rounded bg-accta-surface text-xs text-accta-muted">
                <BookOpen aria-hidden="true" className="text-accta-navy" size={32} />
                Publication preview
              </div>

              <h3 className="mt-4 font-serif text-base font-bold text-accta-navy">
                {publication.title}
              </h3>

              <p className="mt-2 text-sm leading-5 text-accta-muted">
                {publication.description}
              </p>
              <button type="button" disabled className="mt-4 min-h-11 w-full cursor-not-allowed rounded border border-accta-border px-3 py-2 text-sm text-accta-muted">Download unavailable</button>
            </article>
          ))}
        </div>

        {/* News */}
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter news">
          {["ALL", "NOTICE", "TAX UPDATE", "NEWS", "NEWSLETTER"].map((tag) => <button key={tag} type="button" onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag} className={`min-h-11 rounded-full border border-accta-navy px-4 py-2 text-xs font-semibold ${activeTag === tag ? "bg-accta-navy text-white" : "bg-white text-accta-navy"}`}>{tag === "ALL" ? "All news" : tag}</button>)}
        </div>
        <div className="mt-6 overflow-hidden rounded-md border border-accta-border">
          {filteredNews.map((item) => (
            <div
              key={`${item.date}-${item.tag}`}
              className="grid gap-3 border-b border-accta-border px-5 py-4 last:border-b-0 md:grid-cols-[120px_100px_1fr] md:items-center"
            >
              <span className="text-xs text-accta-muted">
                {item.date}
              </span>

              <span className="text-[10px] font-bold tracking-wider text-accta-maroon">
                {item.tag}
              </span>

              <span className="text-sm font-semibold text-accta-ink">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
