import type { CorporateApplication } from "@/types/application";

type Props = {
  data: CorporateApplication;
  updateData: (data: Partial<CorporateApplication>) => void;
  validationErrors?: Record<string, string>;
};

const questions = [
  {
    id: "f1",
    question:
      "Has the entity, or any principal, been convicted of an offence involving fraud, dishonesty or moral turpitude, in Sri Lanka or elsewhere?",
  },
  {
    id: "f2",
    question:
      "Has the entity, or any principal, been found guilty of professional misconduct by any professional or regulatory body?",
  },
  {
    id: "f3",
    question:
      "Is the entity in liquidation, receivership or administration, or has any principal been adjudged insolvent or bankrupt?",
  },
  {
    id: "f4",
    question:
      "Has the entity's registration as a tax agent, or any professional licence, been suspended, cancelled or refused?",
  },
  {
    id: "f5",
    question:
      "Are any criminal, regulatory, disciplinary or tax-related proceedings pending against the entity or any principal?",
  },
  {
    id: "f6",
    question:
      "Does the entity have any outstanding tax liabilities under dispute or in default?",
  },
] as const;

export default function CorporateFitProperStep({
  data,
  updateData,
  validationErrors = {},
}: Props) {
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

  const showError = (field: string) =>
    validationErrors[field] ? (
      <p className="mt-2 text-sm text-red-600">
        {validationErrors[field]}
      </p>
    ) : null;

  const hasYesAnswer = Object.values(
    data.fitAndProperAnswers
  ).some((answer) => answer === "yes");

  return (
    <div>
      {/* Section heading */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION F
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Fit and proper declaration
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Answer for the entity and each director, partner and the nominated
          representative. Give full details of any &quot;Yes&quot; answer.
        </p>
      </div>

      {/* Questions */}
      <div className="mt-6 space-y-5">
        {questions.map((item, index) => {
          const hasError = Boolean(validationErrors[item.id]);

          return (
            <div
              key={item.id}
              className={`rounded-md border p-5 ${
                hasError
                  ? "border-red-500"
                  : "border-accta-border"
              }`}
            >
              <p className="text-sm font-medium leading-6 text-accta-ink">
                <span className="mr-2 font-bold text-accta-maroon">
                  F{index + 1}.
                </span>

                {item.question}
              </p>

              <div className="mt-4 flex gap-6">
                {/* Yes */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-accta-ink">
                  <input
                    type="radio"
                    name={item.id}
                    value="yes"
                    checked={
                      data.fitAndProperAnswers[item.id] === "yes"
                    }
                    onChange={() =>
                      handleAnswerChange(item.id, "yes")
                    }
                    className="h-4 w-4 accent-accta-maroon"
                  />

                  Yes
                </label>

                {/* No */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-accta-ink">
                  <input
                    type="radio"
                    name={item.id}
                    value="no"
                    checked={
                      data.fitAndProperAnswers[item.id] === "no"
                    }
                    onChange={() =>
                      handleAnswerChange(item.id, "no")
                    }
                    className="h-4 w-4 accent-accta-maroon"
                  />

                  No
                </label>
              </div>

              {showError(item.id)}
            </div>
          );
        })}
      </div>

      {/* Details */}
      <div className="mt-6">
        <label className="text-sm font-semibold text-accta-ink">
          Details of any &quot;Yes&quot; answer{" "}
          <span className="text-red-500">*</span>
        </label>

        <p className="mt-1 text-sm text-accta-muted">
          {hasYesAnswer
            ? "Please provide full details of each question answered Yes."
            : "If all answers are No, enter N/A."}
        </p>

        <textarea
          value={data.fitAndProperDetails}
          onChange={(e) =>
            updateData({
              fitAndProperDetails: e.target.value,
            })
          }
          placeholder={
            hasYesAnswer
              ? "Provide full details of the Yes answer(s)"
              : "Enter N/A if all answers are No"
          }
          rows={6}
          className={`mt-2 w-full rounded-md border ${
            validationErrors.fitAndProperDetails
              ? "border-red-500"
              : "border-accta-border"
          } bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon`}
        />

        {showError("fitAndProperDetails")}
      </div>
    </div>
  );
}