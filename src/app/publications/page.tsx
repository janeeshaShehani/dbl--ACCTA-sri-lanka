import type { Metadata } from "next";
import Link from "next/link";
import PublicationsNews from "@/components/cpd-events/PublicationsNews";

export const metadata: Metadata = {
  title: "Publications & News | ACCTA Sri Lanka",
  description: "Explore ACCTA publications, professional guidance, news and tax updates.",
};

export default function PublicationsPage() {
  return (
    <>
      <section className="bg-accta-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
          <p className="mb-5 text-sm text-white/70"><Link href="/">Home</Link> / Publications & News</p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Publications & News</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/85">Research, professional guidance and updates for the tax community.</p>
        </div>
      </section>
      <PublicationsNews />
    </>
  );
}
