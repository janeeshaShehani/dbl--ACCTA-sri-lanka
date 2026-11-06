"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function RegisterSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      alert("Please enter a name, membership number, or firm.");
      return;
    }

    // Temporary frontend behavior.
    // Later this can connect to a member database or API.
    alert(`Searching the register for: ${searchTerm}`);
  };

  return (
    <section className="bg-accta-maroon py-12 md:py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Text Content */}
          <div>
            <h2 className="font-heading text-2xl font-bold leading-tight text-white ">
              Is your tax advisor a member in good standing?
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/80 md:text-base">
              Search the Register of Members by name, membership number, or
              firm.
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-accta-muted"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Name, membership no. or firm"
                className="w-full rounded bg-white py-4 pl-12 pr-4 text-sm text-accta-ink outline-none ring-0 placeholder:text-accta-muted focus:ring-2 focus:ring-white/60"
                aria-label="Search the member register"
              />
            </div>

            <button
              type="submit"
              className="rounded bg-white px-6 py-4 text-sm font-semibold text-accta-maroon transition hover:bg-accta-surface"
            >
              Search the register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}