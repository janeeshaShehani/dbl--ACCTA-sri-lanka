import { Check } from "lucide-react";
import { practisingLicence } from "@/data/membershipClasses";

const practisingRequirements = [
  "Passed the prescribed examination, or been exempted from it",
  "Complied with the Council's continuing professional development requirements",
  "Satisfied the Council that you are a fit and proper person to practise",
  "Hold professional indemnity insurance as prescribed by the Council",
  "Registered with the IRD as a tax agent / authorised representative, and paid all fees",
];

export default function PractisingLicence() {
  return (
    <section
      id="licence"
      className="mx-auto max-w-7xl scroll-mt-8 px-6 py-16 lg:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        {/* Left content */}
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
            PRACTISING LICENCE
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
            Practising as a Certified Chartered Tax Advisor
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-accta-muted">
            The designation &quot;Certified Chartered Tax Advisor&quot; is
            conferred annually on Standard members who meet the Council&apos;s
            professional practising standards. Practising members follow the
            Professional Conduct in Relation to Taxation and Professional Rules
            and Practice Guidelines adopted by ACCTA.
          </p>

          {/* Requirements */}
          <div className="mt-8 overflow-hidden rounded-md border border-accta-border">
            {practisingRequirements.map((requirement, index) => (
              <div
                key={requirement}
                className={`flex items-center gap-3 px-5 py-4 ${
                  index !== practisingRequirements.length - 1
                    ? "border-b border-accta-border"
                    : ""
                }`}
              >
                <Check
                  size={16}
                  className="shrink-0 text-accta-navy"
                />

                <p className="text-sm text-accta-muted">
                  {requirement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fee card */}
        <aside className="h-fit rounded-md border-t-2 border-t-accta-maroon border border-accta-border bg-white p-6">
          <h3 className="font-serif text-xl font-bold text-accta-navy">
            Licence fees
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-accta-border pb-3">
              <span className="text-sm text-accta-muted">
                Application fee
              </span>

              <span className="text-sm font-bold text-accta-ink">
                {practisingLicence.applicationFee.lkr}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-accta-muted">
                Annual licence fee
              </span>

              <span className="text-sm font-bold text-accta-ink">
                {practisingLicence.annualSubscription.lkr}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-accta-muted">
            Fees shown are provisional and await confirmation. Online applications
            and renewals are not available yet. Please contact ACCTA for guidance.
          </p>

          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-sm bg-accta-navy/70 px-4 py-3 text-sm font-semibold text-white"
          >
            Apply online for a practising licence
          </button>
        </aside>
      </div>
    </section>
  );
}
