"use client";

interface StepperProps {
  steps: { id: string; title: string }[];
  currentStepIndex: number;
  completedSteps: string[];
}

export default function Stepper({
  steps,
  currentStepIndex,
  completedSteps,
}: StepperProps) {
  return (
    <nav className="mb-6" aria-label="Progress">
      {/* Mobile: horizontal dots */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        {steps.map((step, i) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = i === currentStepIndex;
          return (
            <div
              key={step.id}
              className={`h-2.5 w-2.5 rounded-full ${
                isCompleted
                  ? "bg-rio-aqua"
                  : isCurrent
                    ? "bg-rio-teal"
                    : "bg-gray-300"
              }`}
              title={step.title}
            />
          );
        })}
      </div>

      {/* Desktop: vertical rail */}
      <div className="hidden md:block">
        <ol className="space-y-4">
          {steps.map((step, i) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = i === currentStepIndex;
            return (
              <li key={step.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      isCompleted
                        ? "bg-rio-aqua text-white"
                        : isCurrent
                          ? "bg-rio-teal text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`mt-1 h-6 w-0.5 ${
                        isCompleted ? "bg-rio-mint" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`pt-0.5 text-sm ${
                    isCompleted
                      ? "text-rio-green line-through"
                      : isCurrent
                        ? "font-medium text-rio-black"
                        : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
