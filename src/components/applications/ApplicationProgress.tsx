type ApplicationProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ApplicationProgress({
  currentStep,
  totalSteps,
}: ApplicationProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-accta-navy">
          Step {currentStep} of {totalSteps}
        </span>

        <span className="text-sm text-accta-muted">
          {percentage}% complete
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-accta-surface">
        <div
          className="h-full rounded-full bg-accta-maroon transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}