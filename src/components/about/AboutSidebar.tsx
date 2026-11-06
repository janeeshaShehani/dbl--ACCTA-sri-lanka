"use client";

export default function AboutSidebar() {
  const sidebarLinks = [
    { name: "Who we are", id: "who-we-are" },
    { name: "Objectives", id: "objectives" },
    { name: "Functions", id: "functions" },
    { name: "Our emblem", id: "our-emblem" },
    { name: "Governance", id: "governance" },
    { name: "Committees", id: "committees" },
    { name: "Patron & Advisory Board", id: "patron-advisory" },
    { name: "Governing documents", id: "governing-documents" },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-6 rounded-md border border-accta-border bg-white p-3">
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="rounded px-3 py-3 text-left text-sm font-medium text-accta-ink transition hover:bg-accta-surface hover:text-accta-maroon"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}