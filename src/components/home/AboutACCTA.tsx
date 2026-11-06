import Link from "next/link";


export default function AboutACCTA() {

const values = [
  "Integrity",
  "Excellence",
  "Independence",
  "Accountability",
  "Transparency",
  "Public Interest",
  "Innovation",
  "Collaboration",
];
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
        
        {/* Left Content */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accta-maroon">
            About ACCTA
          </p>

          <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold leading-tight text-accta-navy md:text-4xl">
            A member-focused, public-interest professional body.
          </h2>

          <div className="mt-6 max-w-xl space-y-5 text-sm leading-6 text-accta-muted ">
            <p>
              The Association of Certified Chartered Tax Advisors sets
              professional and ethical standards for tax advisory practice,
              awards the Certified Chartered Tax Advisor (CCTA) qualification,
              and supports members through continuing professional development,
              research and advocacy.
            </p>

            <p>
              We work with government, regulators, academic institutions and
              international professional bodies to support transparent, fair and
              efficient tax systems.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-bold text-accta-navy underline underline-offset-4 transition hover:text-accta-maroon"
          >
            Read more about ACCTA →
          </Link>
        </div>

        {/* Right Content */}
        <div className="space-y-4">
          
          {/* Vision */}
          <div className="rounded-md border border-accta-border border-t-[3px] border-t-accta-navy bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accta-navy">
              Vision
            </p>

            <p className="mt-3 font-heading text-[15px] leading-relaxed text-accta-ink">
              To be a globally respected institute advancing excellence and
              integrity in tax advisory.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-md border border-accta-border border-t-[3px] border-t-accta-maroon bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accta-maroon">
              Mission
            </p>

            <p className="mt-3 font-heading text-[15px] leading-relaxed text-accta-ink">
              To develop competent, ethical, and globally recognised tax
              advisors while safeguarding the public interest.
            </p>
          </div>

          {/* Values */}
          <div className="flex flex-wrap gap-2 pt-2">
            {values.map((value) => (
              <span
                key={value}
                className="rounded-sm bg-accta-surface px-3 py-1.5 text-xs font-bold text-accta-navy"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}