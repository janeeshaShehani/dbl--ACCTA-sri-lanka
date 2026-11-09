type FormNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
};

export default function FormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-accta-border pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className="rounded border border-accta-navy px-5 py-2 text-sm font-semibold text-accta-navy disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>

      <button
        type="button"
        onClick={onNext}
        className="rounded bg-accta-maroon px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
      >
        {isLastStep ? "Submit application" : "Save and continue"}
      </button>
    </div>
  );
}