import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-accta-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-10 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-18">
        
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accta-maroon">
            Professional body for tax advisors · Sri Lanka
          </p>

          {/* Main Heading */}
          <h1 className="mt-5 font-heading text-5xl font-bold leading-[1.12] text-accta-navy md:text-5xl">
            Raising the standard of tax
            <br />
            advice in Sri Lanka.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-accta-muted md:text-lg">
            ACCTA develops competent, ethical and globally recognised tax advisors —
            and safeguards the public interest through professional standards,
            continuing education and a public register of members.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/membership/apply"
              className="rounded bg-accta-maroon px-6 py-3 text-center text-sm font-bold text-white transition hover:opacity-90"
            >
              Apply for membership
            </Link>

            <Link
              href="/qualification"
              className="rounded border-2 border-accta-navy px-6 py-3 text-center text-sm font-bold text-accta-navy transition hover:bg-accta-navy hover:text-white"
            >
              Explore the CCTA qualification
            </Link>
          </div>
        </div>

        {/* Right Designation Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[400px] rounded-lg bg-accta-navy p-9 text-white">
            
            {/* Logo */}
            <div className="flex justify-center">
              <div className="rounded-md bg-white p-3">
                <Image
                  src="/images/logo.png"
                  alt="ACCTA designation mark"
                  width={140}
                  height={140}
                  className="h-[100px] w-[100px] object-contain"
                  priority
                />
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-white/25" />

            {/* Designation Text */}
            <div className="px-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                Certified
              </p>

              <h2 className="mt-2 font-heading text-xl font-bold leading-tight">
                Chartered Tax Advisor
              </h2>

              <p className="mt-1 text-base text-sm text-white/85">
                සහතිකලත් වරලත් බදු උපදේශක
              </p>
            </div>

            {/* Divider */}
            <div className="my-3 border-t border-white/25" />

            {/* Description */}
            <p className="px-2 text-xs leading-6 text-white/85">
              Only licensed members may use this designation. Always check the
              public register before you engage an advisor.
            </p>

            {/* Register Button */}
            <Link
              href="/find-advisor"
              className="mt-4 block rounded border border-white px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white hover:text-accta-navy"
            >
              Check the register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}