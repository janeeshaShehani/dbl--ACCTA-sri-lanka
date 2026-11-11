import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

type DeclarationField =
  | "declarationInformationAccepted"
  | "declarationAgeAccepted"
  | "declarationRulesAccepted"
  | "declarationDesignationAccepted"
  | "declarationRenewalAccepted"
  | "declarationChangesAccepted"
  | "declarationContributionAccepted"
  | "declarationConsentAccepted";

type DeclarationItem = {
  id: DeclarationField;
  text: string;
};

export default function DeclarationStep({ data, updateData }: Props) {
  const declarations: DeclarationItem[] = [
    {
      id: "declarationInformationAccepted",
      text: "The information given in this application and its attachments is true, complete and correct. I understand that any false or misleading statement may result in rejection of this application or later disenrolment.",
    },
    {
      id: "declarationAgeAccepted",
      text: "I have attained eighteen years of age.",
    },
    {
      id: "declarationRulesAccepted",
      text: "If admitted, I will be bound by the Articles of Association, the rules, the Code of Ethics and Professional Conduct, and the CPD requirements of the Association as amended from time to time.",
    },
    {
      id: "declarationDesignationAccepted",
      text: "I will use only the designatory letters to which I am entitled, and will not describe myself as a Certified Chartered Tax Advisor unless granted that designation.",
    },
    {
      id: "declarationRenewalAccepted",
      text: "I will renew my membership annually and understand that membership ceases if the subscription is three months or more in arrears.",
    },
    {
      id: "declarationChangesAccepted",
      text: 'I will inform the Association promptly of any change in my particulars or of any matter that would make an answer in Section F "Yes".',
    },
    {
      id: "declarationContributionAccepted",
      text: "I agree to contribute up to Rs. 1,000 to the assets of the Association in the event of it winding up.",
    },
    {
      id: "declarationConsentAccepted",
      text: "I consent to ACCTA verifying my information with referees, employers and other bodies, and to my name, membership class and number being published in the Register of Members.",
    },
  ];

  const handleDeclarationChange = (
    field: DeclarationField,
    checked: boolean
  ) => {
    updateData({
      [field]: checked,
    } as Partial<IndividualApplication>);
  };

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION I
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Declaration
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please read and confirm each declaration before submitting your
          membership application.
        </p>
      </div>

      {/* Declaration checkboxes */}
      <div className="mt-6 space-y-3">
        {declarations.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer gap-3 rounded-md border border-accta-border bg-white p-4 text-sm text-accta-ink"
          >
            <input
              type="checkbox"
              checked={data[item.id]}
              onChange={(e) =>
                handleDeclarationChange(item.id, e.target.checked)
              }
              className="mt-1 h-4 w-4 accent-accta-maroon"
            />

            <span className="leading-6">{item.text}</span>
          </label>
        ))}
      </div>

      {/* Declaration details */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-accta-navy">
          Applicant declaration
        </h3>

        <p className="mt-1 text-sm text-accta-muted">
          Your typed full name will be treated as your confirmation of this
          declaration.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Full name
            </label>

            <input
              type="text"
              value={data.declarationName}
              onChange={(e) =>
                updateData({ declarationName: e.target.value })
              }
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Date
            </label>

            <input
              type="date"
              value={data.declarationDate}
              onChange={(e) =>
                updateData({ declarationDate: e.target.value })
              }
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-accta-ink">
              Place
            </label>

            <input
              type="text"
              value={data.declarationPlace}
              onChange={(e) =>
                updateData({ declarationPlace: e.target.value })
              }
              placeholder="Enter your city or location"
              className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
            />
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-accta-muted">
        All declarations must be accepted before the application can be
        submitted.
      </p>
    </div>
  );
}