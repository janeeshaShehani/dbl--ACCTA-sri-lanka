import type { IndividualApplication } from "@/types/application";

type Props = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

const questions = [
  {
    id: "disciplinaryAction",
    question: "Have you ever been subject to disciplinary action by a professional body or employer?",
  },
  {
    id: "criminalOffence",
    question: "Have you ever been convicted of a criminal offence?",
  },
  {
    id: "professionalInvestigation",
    question: "Are you currently subject to any professional investigation or disciplinary proceedings?",
  },
  {
    id: "bankruptcy",
    question: "Have you ever been declared bankrupt or insolvent?",
  },
  {
    id: "professionalBodyRemoval",
    question: "Have you ever been suspended or removed from membership of a professional body?",
  },
  {
    id: "falseInformation",
    question: "Have you ever provided false or misleading information in a professional or membership application?",
  },
  {
    id: "otherMatter",
    question: "Is there any other matter that may be relevant to your fitness and propriety for membership?",
  },
];

export default function FitProperStep({ data, updateData }: Props) {
  const handleAnswerChange = (
    questionId: string,
    answer: "yes" | "no"
  ) => {
    updateData({
      fitAndProperAnswers: {
        ...data.fitAndProperAnswers,
        [questionId]: answer,
      },
    });
  };

  const hasYesAnswer = Object.values(data.fitAndProperAnswers).includes(
    "yes"
  );

  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION F
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Fit and proper declaration
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please answer all questions honestly. If you answer Yes to any
          question, provide further details below.
        </p>
      </div>

      {/* Questions */}
      <div className="mt-6 space-y-4">
        {questions.map((item, index) => (
          <div
            key={item.id}
            className="rounded-md border border-accta-border bg-white p-5"
          >
            <p className="text-sm font-medium leading-6 text-accta-ink">
              {index + 1}. {item.question}
            </p>

            <div className="mt-4 flex gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-accta-ink">
                <input
                  type="radio"
                  name={item.id}
                  value="no"
                  checked={data.fitAndProperAnswers[item.id] === "no"}
                  onChange={() => handleAnswerChange(item.id, "no")}
                  className="accent-accta-maroon"
                />
                No
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-accta-ink">
                <input
                  type="radio"
                  name={item.id}
                  value="yes"
                  checked={data.fitAndProperAnswers[item.id] === "yes"}
                  onChange={() => handleAnswerChange(item.id, "yes")}
                  className="accent-accta-maroon"
                />
                Yes
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Details */}
      <div className="mt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Details for any Yes answers
          {!hasYesAnswer && (
            <span className="ml-1 font-normal text-accta-muted">
              (leave blank if all answers are No)
            </span>
          )}
        </label>

        <textarea
          value={data.fitAndProperDetails}
          onChange={(e) =>
            updateData({ fitAndProperDetails: e.target.value })
          }
          placeholder="Provide details for any questions answered Yes, including relevant dates and circumstances."
          rows={6}
          disabled={!hasYesAnswer}
          className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon disabled:cursor-not-allowed disabled:bg-accta-surface"
        />
      </div>

      <div className="mt-6 rounded-md border-l-4 border-accta-gold bg-accta-surface px-5 py-4">
        <p className="text-sm leading-6 text-accta-ink">
          Providing additional information does not automatically affect your
          application. ACCTA may contact you if further clarification is
          required.
        </p>
      </div>
    </div>
  );
}