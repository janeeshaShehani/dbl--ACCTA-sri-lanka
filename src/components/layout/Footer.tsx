import Image from "next/image";
import Link from "next/link";

const aboutLinks = [
  { name: "Vision & mission", href: "/about" },
  { name: "Governing Council", href: "/about#governance" },
  { name: "Committees", href: "/about#committees" },
];

const memberLinks = [
  { name: "Membership categories", href: "/membership" },
  { name: "Fees", href: "/membership#fees" },
  { name: "Practising licence", href: "/practising-licence" },
  { name: "CPD requirements", href: "/cpd-events" },
  { name: "Code of Ethics", href: "/code-of-ethics" },
];

const publicLinks = [
  { name: "Find a tax advisor", href: "/find-advisor" },
  { name: "Verify a member", href: "/verify-member" },
  { name: "Make a complaint", href: "/complaint" },
  { name: "Contact us", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accta-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          
          {/* Organization Information */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-white p-1">
                <Image
                  src="/images/logo.png"
                  alt="ACCTA Sri Lanka"
                  width={42}
                  height={42}
                  className="h-auto w-full object-contain"
                />
              </div>

              <h2 className="font-heading text-xl font-bold text-white">
                ACCTA Sri Lanka
              </h2>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-6 text-white/70">
              <p>
                Association of Certified Chartered Tax
                <br />
                Advisors
              </p>

              <p>
                101, Olcott Mawatha, Colombo 11. <br/>Sri Lanka
              </p>

              <p>
               +94 77 714 8839 · info@acctasl.com
              </p>
            </div>
          </div>

          {/* About Links */}
          <FooterColumn title="About" links={aboutLinks} />

          {/* Members Links */}
          <FooterColumn title="Members" links={memberLinks} />

          {/* Public Links */}
          <FooterColumn title="Public" links={publicLinks} />
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} Association of Certified Chartered Tax Advisors.
            All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy policy
            </Link>

            <Link
              href="/terms-of-use"
              className="transition hover:text-white"
            >
              Terms of use
            </Link>

            <Link href="/sitemap" className="transition hover:text-white">
              Sitemap
            </Link>
            <Link href="/cookie-notice" className="transition hover:text-white">
              Cookie notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = {
  name: string;
  href: string;
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold text-white">{title}</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
