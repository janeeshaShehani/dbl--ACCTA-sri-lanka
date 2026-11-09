import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function DeclarationStep({ data, updateData }: Props) {
  const declarations = [
    "I confirm that the information provided is true and accurate.",
    "I agree to comply with the Association's rules and regulations.",
    "I understand that my application is subject to approval.",
    "I agree to maintain professional and ethical standards.",
  ];

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        SECTION I
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
        Declaration
      </h2>

      <div className="mt-6 space-y-3">
        {declarations.map((item) => (
          <label
            key={item}
            className="flex gap-3 rounded-md border border-accta-border p-4 text-sm"
          >
            <input type="checkbox" className="mt-1" />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <input
          value={data.declarationName}
          onChange={(e) =>
            updateData({ declarationName: e.target.value })
          }
          placeholder="Typed full name"
          className="rounded-md border border-accta-border p-3"
        />

        <input
          type="date"
          value={data.declarationDate}
          onChange={(e) =>
            updateData({ declarationDate: e.target.value })
          }
          className="rounded-md border border-accta-border p-3"
        />

        <input
          value={data.declarationPlace}
          onChange={(e) =>
            updateData({ declarationPlace: e.target.value })
          }
          placeholder="Place"
          className="rounded-md border border-accta-border p-3"
        />
      </div>
    </div>
  );
}