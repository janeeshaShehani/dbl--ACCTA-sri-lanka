import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sitemap | ACCTA Sri Lanka" };

const pages = [
  ["Home", "/"], ["About ACCTA", "/about"], ["Membership", "/membership"],
  ["Apply for membership", "/membership/apply"], ["Qualification", "/qualification"],
  ["CPD & Events", "/cpd-events"], ["Practising licence", "/practising-licence"],
  ["Find a Tax Advisor", "/find-advisor"], ["Publications & News", "/publications"],
  ["Contact", "/contact"], ["Member login", "/login"], ["Online payments", "/payment"],
  ["Verify a member", "/verify-member"], ["Raise a concern", "/complaint"],
  ["Code of Ethics", "/code-of-ethics"], ["Privacy policy", "/privacy-policy"],
  ["Terms of use", "/terms-of-use"], ["Cookie notice", "/cookie-notice"],
];

export default function SitemapPage() {
  return <section className="mx-auto max-w-7xl px-6 py-14 md:px-8">
    <h1 className="font-heading text-4xl font-bold text-accta-navy">Sitemap</h1>
    <p className="mt-4 text-accta-muted">Find pages and services across the ACCTA website. Services that are not yet available are marked on their pages.</p>
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{pages.map(([label, href]) => <li key={href}><Link href={href} className="block rounded border border-accta-border p-4 font-semibold text-accta-navy hover:bg-accta-surface">{label}</Link></li>)}</ul>
  </section>;
}
