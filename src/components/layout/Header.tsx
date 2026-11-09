"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Qualification", href: "/qualification" },
  { name: "CPD & Events", href: "/cpd-events" },
  { name: "Practising Licence", href: "/practising-licence" },
  { name: "Find a Tax Advisor", href: "/find-advisor" },
  { name: "Publications", href: "/publications" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full" onKeyDown={(event) => {
      // Close the mobile navigation with Escape and restore keyboard focus.
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }}>
      {/* Top Utility Bar */}
      <div className="bg-accta-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          {/* Contact Information */}
          <div className="hidden items-center gap-6 md:flex">
            <a href="tel:+94777148839">Hotline : +94 77 714 8839</a>
            <a href="mailto:info@acctasl.com">info@acctasl.com</a>
          </div>

          {/* Right Side Links */}
          <div className="ml-auto flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              <button type="button" aria-label="English — current language" aria-pressed="true" className="min-h-11 min-w-11 rounded bg-white px-2 py-1 text-xs font-semibold text-accta-navy">
                EN
              </button>
              <button type="button" disabled title="Sinhala translation is not available yet" aria-label="Sinhala — not available yet" className="min-h-11 min-w-11 cursor-not-allowed rounded border border-white/40 px-2 py-1 text-xs text-white/70">
                සිං
              </button>
              <button type="button" disabled title="Tamil translation is not available yet" aria-label="Tamil — not available yet" className="min-h-11 min-w-11 cursor-not-allowed rounded border border-white/40 px-2 py-1 text-xs text-white/70">
                தமிழ்
              </button>
            </div>

            <Link href="/payment" className="hidden sm:block">
              Pay online
            </Link>

            <Link href="/verify-member" className="hidden sm:block">
              Verify a member
            </Link>

            <Link
              href="/login"
              className="inline-flex min-h-11 items-center rounded bg-accta-maroon px-3 py-2 text-xs font-semibold transition hover:opacity-90 sm:text-sm"
            >
              Member login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-accta-border bg-white">
        <div className="mx-auto max-w-7xl px-3">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" onClick={() => setIsOpen(false)} className="flex min-w-0 items-center gap-2 sm:gap-3">
              <Image
                src="/images/logo.png"
                alt="ACCTA Sri Lanka Logo"
                width={90}
                height={90}
                className="h-[50px] w-auto shrink-0 object-contain sm:h-[60px]"
                priority
              />

              {/* Organization Name */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-l font-bold text-accta-navy">
                    ACCTA
                  </span>
                  <span className="font-heading text-l font-bold text-accta-maroon">
                    Sri Lanka
                  </span>
                </div>

                <p className="text-xs text-accta-muted">
                  Association of Certified Chartered Tax Advisors
                </p>

                <p className="mt- text-xs text-accta-muted">
                  සහතිකලත් වරලත් බදු උපදේශකයින්ගේ ආයතනය
                </p>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              ref={menuButton}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="shrink-0 rounded p-2 text-accta-navy min-[900px]:hidden"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center justify-between gap-3 pb-2 min-[900px]:flex">
            <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 xl:gap-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="text-sm font-semibold text-accta-ink transition hover:text-accta-maroon"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link
              href="/membership/apply"
              className="shrink-0 rounded bg-accta-maroon px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Become a member
            </Link>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div id="mobile-navigation" className="max-h-[65dvh] overflow-y-auto border-t border-accta-border py-4 min-[900px]:hidden">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="rounded px-3 py-3 font-medium text-accta-ink hover:bg-accta-surface"
                  >
                    {link.name}
                  </Link>
                ))}

                <Link href="/payment" onClick={() => setIsOpen(false)} className="rounded px-3 py-3 font-medium text-accta-ink hover:bg-accta-surface sm:hidden">Pay online</Link>
                <Link href="/verify-member" onClick={() => setIsOpen(false)} className="rounded px-3 py-3 font-medium text-accta-ink hover:bg-accta-surface sm:hidden">Verify a member</Link>

                <Link
                  href="/membership/apply"
                  className="rounded bg-accta-maroon px-5 py-3 text-sm font-semibold text-white"
                >
                  Become a member
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
