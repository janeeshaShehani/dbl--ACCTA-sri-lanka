"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Top Utility Bar */}
      <div className="bg-accta-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          {/* Contact Information */}
          <div className="hidden items-center gap-6 md:flex">
            <span>Hotline : +94 77 714 8839</span>
            <span>info@acctasl.com</span>
          </div>

          {/* Right Side Links */}
          <div className="ml-auto flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              <button className="rounded bg-white px-2 py-1 text-xs font-semibold text-accta-navy">
                EN
              </button>
              <button className="rounded border border-white/40 px-2 py-1 text-xs">
                සිං
              </button>
              <button className="rounded border border-white/40 px-2 py-1 text-xs">
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
              className="rounded bg-accta-maroon px-4 py-2 font-semibold transition hover:opacity-90"
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
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="ACCTA Sri Lanka Logo"
                width={90}
                height={90}
                className="h-[60px] w-auto object-contain"
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
              className="rounded p-2 text-accta-navy lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center justify-between pb-2 lg:flex">
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-accta-ink transition hover:text-accta-maroon"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link
              href="/membership/apply"
              className="rounded bg-accta-maroon px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Become a member
            </Link>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="border-t border-accta-border py-4 lg:hidden">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded px-3 py-3 font-medium text-accta-ink hover:bg-accta-surface"
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="/membership/apply"
                  className="mt-2 rounded bg-accta-maroon px-4 py-3 text-center font-semibold text-white"
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