import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apply for Membership | ACCTA Sri Lanka",
  description: "Choose an individual or corporate ACCTA membership application.",
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  return <section className="bg-accta-surface px-5 py-14 md:py-20">
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">JOIN ACCTA</p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-accta-navy">Apply for membership</h1>
      <p className="mt-5 max-w-3xl leading-7 text-accta-muted">Choose the application that matches your membership. </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-md border border-accta-border border-t-2 border-t-accta-navy bg-white p-6 sm:p-8">
          <p className="text-xs font-bold tracking-wider text-accta-maroon">FORM M-01</p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-accta-navy">Individual membership</h2>
          <p className="mt-4 text-sm leading-6 text-accta-muted">For Associate, Fellow, Academic and Affiliate applicants. Applicants must be at least 18 years old.</p>
          <Link
            href="/apply-membership/individual"
            className="mt-6 inline-block rounded bg-accta-maroon px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Individual application
          </Link>
        </article>
        <article className="rounded-md border border-accta-border border-t-2 border-t-accta-maroon bg-white p-6 sm:p-8">
          <p className="text-xs font-bold tracking-wider text-accta-maroon">FORM M-02</p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-accta-navy">Corporate membership</h2>
          <p className="mt-4 text-sm leading-6 text-accta-muted">For firms and organisations providing taxation services, represented by a nominated ACCTA member.</p>
          <Link
            href="/apply-membership/corporate"
            className="mt-6 inline-block rounded border border-accta-navy px-5 py-3 text-sm font-semibold text-accta-navy transition hover:bg-accta-navy hover:text-white"
          >
            Corporate application
          </Link>
        </article>
      </div>
      <Link href="/membership#how-to-apply" className="mt-8 inline-block py-2 text-sm font-semibold text-accta-navy underline underline-offset-4">Read the membership requirements</Link>
    </div>
  </section>;
}
