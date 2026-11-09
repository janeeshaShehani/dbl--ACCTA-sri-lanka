export default function WhoWeAre() {

    const values= [
    "Integrity",
    "Excellence",
    "Independence",
    "Accountability",
    "Transparency",
    "Public Interest",
    "Innovation",
    "Collaboration",
  ]

  return (
    <section id="who-we-are" className="scroll-mt-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        WHO WE ARE
      </p>

      <h2 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight text-accta-navy ">
        Developing, regulating and recognising competent tax professionals.
      </h2>

      <div className="mt-5 max-w-5xl space-y-4 text-sm leading-7 text-accta-muted">
      ACCTA sets high professional and ethical standards, develops globally aligned 
      qualifications, and fosters continuous professional development among its members.
       Through education, research and advocacy, it seeks to enhance the quality and credibility 
       of tax advisory services delivered to individuals, businesses and public institutions. 
      The Association awards the Certified Chartered Tax Advisor (CCTA) qualification. Members adhere to a strict Code of Ethics and Professional Conduct and engage in ongoing learning to maintain their professional competence.
    
      </div>

      {/* Vision and Mission */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border-t-2 border-accta-navy bg-white p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.18em] text-accta-navy">
            VISION
          </p>

          <p className="mt-4 font-serif text-lg leading-relaxed text-accta-ink">
            To be a globally respected institute advancing excellence and integrity in tax advisory.
          </p>
        </div>

        <div className="rounded-md border-t-2 border-accta-maroon bg-white p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
            MISSION
          </p>

          <p className="mt-4 font-serif text-lg leading-relaxed text-accta-ink">
            To develop competent, ethical, and globally recognised tax advisors while 
            safeguarding the public interest.

          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-4 flex flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={value}
            className="rounded bg-accta-surface px-3 py-1 text-xs font-bold text-accta-navy"
          >
            {value}
          </span>
        ))}
      </div>
    </section>
  );
}
