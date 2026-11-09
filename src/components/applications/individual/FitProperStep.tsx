import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function FitProperStep({ data, updateData }: Props) {
  const questions = [
    "Have you been subject to disciplinary action?",
    "Have you been convicted of a criminal offence?",
    "Are you currently subject to a professional investigation?",
    "Have you been declared bankrupt?",
    "Have you been removed from a professional body?",
    "Have you provided false information in an application?",
    "Is there any other matter relevant to your fitness and propriety?",
  ];

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        SECTION F
      </p>

      <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
        Fit and proper
      </h2>

      <div className="mt-6 space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-md border border-accta-border p-4"
          >
            <p className="font-medium text-accta-ink">{question}</p>

            <div className="mt-3 flex gap-4">
              <label>
                <input type="radio" name={`question-${index}`} /> No
              </label>

              <label>
                <input type="radio" name={`question-${index}`} /> Yes
              </label>
            </div>
          </div>
        ))}

        <div>
          <label className="font-semibold">
            Details for any Yes answers
          </label>

          <textarea
            value={data.fitAndProperDetails}
            onChange={(e) =>
              updateData({ fitAndProperDetails: e.target.value })
            }
            className="mt-2 min-h-32 w-full rounded-md border border-accta-border p-3"
          />
        </div>
      </div>
    </div>
  );
}