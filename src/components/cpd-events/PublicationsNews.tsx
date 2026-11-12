"use client";

import { useState } from "react";
import { publications, newsUpdates } from "@/data/publications";

export default function PublicationsNews() {
  const [activeTag, setActiveTag] = useState("ALL");

  // Filter news based on the selected tag
  const filteredNews = newsUpdates.filter(
    (item) => activeTag === "ALL" || item.tag === activeTag
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
        <p className="text-[10px] font-bold tracking-[0.18em] text-accta-maroon">
          PUBLICATIONS & KNOWLEDGE
        </p>

        <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
          Research, guidance and tax updates
        </h2>

        <p className="mt-4 text-sm leading-6 text-accta-muted">
          Publication files and approved news are awaiting release. The
          entries below preview the planned content.
        </p>

        {/* Publications */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {publications.map((publication) => (
            <article
              key={publication.id}
              className="overflow-hidden rounded-md border border-accta-border bg-white"
            >
              {/* Publication Image */}
              <div className="h-44 w-full overflow-hidden bg-accta-surface">
                <img
                  src={publication.image}
                  alt={publication.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Publication Details */}
              <div className="p-4">
                <h3 className="font-serif text-base font-bold text-accta-navy">
                  {publication.title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-accta-muted">
                  {publication.description}
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-4 min-h-11 w-full cursor-not-allowed rounded border border-accta-border px-3 py-2 text-sm text-accta-muted"
                >
                  Download unavailable
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* News */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter news"
        >
          {["ALL", "NOTICE", "TAX UPDATE", "NEWS", "NEWSLETTER"].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={`min-h-11 rounded-full border border-accta-navy px-4 py-2 text-xs font-semibold ${
                  activeTag === tag
                    ? "bg-accta-navy text-white"
                    : "bg-white text-accta-navy"
                }`}
              >
                {tag === "ALL" ? "All news" : tag}
              </button>
            )
          )}
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