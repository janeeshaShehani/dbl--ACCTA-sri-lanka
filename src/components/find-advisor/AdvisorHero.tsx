"use client";

import { useState } from "react";

type FindAdvisorHeroProps = {
  onSearch: (filters: {
    search: string;
    category: string;
    city: string;
    licensedOnly: boolean;
  }) => void;
};

export default function FindAdvisorHero({
  onSearch,
}: FindAdvisorHeroProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [licensedOnly, setLicensedOnly] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch({
      search,
      category,
      city,
      licensedOnly,
    });
  };

  return (
    <section className="bg-accta-navy py-12 text-white md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Breadcrumb */}
        <p className="text-xs text-white/60">
          Home / Register of Members
        </p>

        {/* Heading */}
        <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
          Find a tax advisor
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
          Search the Register of Members to confirm that an individual or firm
          is an ACCTA member in good standing, and whether they hold a current
          practising licence.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-md bg-white p-4 text-accta-ink md:p-5"
        >
          <div className="grid gap-4 md:grid-cols-4">
            {/* Name or membership number */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-semibold">
                Name or membership number
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. surname or ACCTA no."
                className="w-full rounded border border-accta-border px-3 py-2 text-sm outline-none focus:border-accta-maroon"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-xs font-semibold">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded border border-accta-border px-3 py-2 text-sm outline-none focus:border-accta-maroon"
              >
                <option value="">All categories</option>
                <option value="Associate">Associate</option>
                <option value="Fellow">Fellow</option>
                <option value="Academic">Academic</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            {/* District / City */}
            <div>
              <label className="mb-2 block text-xs font-semibold">
                District / city
              </label>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded border border-accta-border px-3 py-2 text-sm outline-none focus:border-accta-maroon"
              >
                <option value="">Anywhere</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Negombo">Negombo</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            {/* Licensed only */}
            <label className="flex items-center gap-2 text-xs font-medium">
              <input
                type="checkbox"
                checked={licensedOnly}
                onChange={(e) => setLicensedOnly(e.target.checked)}
                className="h-4 w-4"
              />

              Show only licensed Certified Chartered Tax Advisors
            </label>

            <button
              type="submit"
              className="rounded bg-accta-maroon px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Search the register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}