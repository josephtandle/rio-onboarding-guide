"use client";

import { useState } from "react";
import Image from "next/image";
import type { StepData, CommonError } from "@/lib/types";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

interface StepCardProps {
  step: StepData;
  isActive: boolean;
  isCompleted: boolean;
  checkedActions: boolean[];
  onToggleAction: (actionIndex: number) => void;
  onComplete: () => void;
  onBranch?: (action: string) => void;
  totalSteps: number;
  screenId?: string;
}

export default function StepCard({
  step,
  isActive,
  isCompleted,
  onComplete,
  onBranch,
  totalSteps,
  screenId,
}: StepCardProps) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [selectedError, setSelectedError] = useState<number | null>(null);

  const actions = step.actions ?? [];
  const errors = step.commonErrors ?? [];

  // Collapsed completed card
  if (isCompleted && !isActive) {
    return (
      <div className="rounded-xl border border-rio-mint bg-rio-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rio-aqua text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <span className="text-sm font-medium text-rio-green">
            {screenId && <span className="mr-2 font-mono text-xs text-gray-400">[{screenId}]</span>}
            Step {step.number} of {totalSteps}: {step.title}
          </span>
        </div>
      </div>
    );
  }

  // Upcoming
  if (!isActive) {
    return (
      <div className="rounded-xl border border-gray-200 bg-rio-white/60 p-4 opacity-60">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500">
            {step.number}
          </div>
          <span className="text-sm text-gray-400">
            {screenId && <span className="mr-1 font-mono text-xs text-gray-300">[{screenId}]</span>}
            Step {step.number} of {totalSteps}: {step.title}
          </span>
          <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
            {step.estimatedTime}
          </span>
        </div>
      </div>
    );
  }

  // Active card
  return (
    <div id={`step-${step.number}`} className="rounded-xl border-2 border-rio-teal bg-rio-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rio-teal text-xs font-semibold text-white">
            {step.number}
          </div>
          <div>
            {screenId && (
              <span className="block font-mono text-xs text-gray-400">[{screenId}]</span>
            )}
            <h3 className="text-base font-semibold text-rio-black">{step.title}</h3>
          </div>
        </div>
        {step.estimatedTime && (
          <span className="shrink-0 rounded-full bg-rio-mint px-2.5 py-0.5 text-xs font-medium text-rio-teal">
            {step.estimatedTime}
          </span>
        )}
      </div>

      {/* Success state */}
      {step.successState && (
        <div className="mb-4 rounded-lg border border-rio-mint bg-rio-mint/30 p-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rio-aqua text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h4 className="mb-2 text-lg font-semibold text-rio-black">{step.successState.title}</h4>
          <ul className="mb-4 space-y-2 text-left text-sm text-rio-black">
            {step.successState.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 text-rio-aqua">&#8226;</span>
                {b}
              </li>
            ))}
          </ul>
          {step.successState.ctaHref && (
            <a
              href={step.successState.ctaHref}
              className="inline-block rounded-lg bg-rio-teal px-6 py-3 text-sm font-medium text-white no-underline hover:opacity-90"
            >
              {step.successState.ctaLabel || "Continue"}
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      {actions.length > 0 && (
        <ul className="mb-4 space-y-2">
          {actions.map((action, i) => (
            <li key={i} className="text-sm text-rio-black">
              {action.href ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-rio-teal underline hover:opacity-80"
                >
                  {action.label}
                </a>
              ) : (
                <span>{action.label}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Warning callout */}
      {step.warningCallout && (
        <div className="mb-4 rounded-lg bg-rio-sand p-4 text-sm text-rio-black">
          <strong className="mr-1">Heads up:</strong>
          {step.warningCallout}
        </div>
      )}

      {/* Screenshot */}
      {step.screenshotSrc ? (
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={step.screenshotSrc}
            alt={step.screenshotPlaceholder || "Screenshot"}
            width={600}
            height={400}
            className="w-full"
          />
        </div>
      ) : step.screenshotPlaceholder ? (
        <ScreenshotPlaceholder description={step.screenshotPlaceholder} />
      ) : null}

      {/* Note */}
      {step.tellMeMore && (
        <div className="mb-4 rounded-lg bg-rio-beige p-3 text-sm text-rio-green">
          <strong className="mr-1">Note:</strong>{step.tellMeMore}
        </div>
      )}

      {/* What you should see */}
      {step.whatYouShouldSee && !step.screenshotPlaceholder && (
        <div className="mb-4 rounded-lg border border-rio-mint bg-rio-mint/20 p-3 text-sm text-rio-black">
          <strong>What you should see:</strong> {step.whatYouShouldSee}
        </div>
      )}

      {/* Branch */}
      {step.branch && (
        <div className="mb-4 rounded-lg border border-rio-green/20 p-4">
          <p className="mb-3 text-sm font-medium text-rio-black">{step.branch.question}</p>
          <div className="flex flex-wrap gap-2">
            {step.branch.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onBranch?.(opt.action)}
                className="rounded-lg border border-rio-teal px-4 py-2 text-sm font-medium text-rio-teal hover:bg-rio-teal hover:text-white"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inline error panel */}
      {errors.length > 0 && errorOpen && (
        <div className="mb-4 rounded-lg border border-rio-green/20 bg-rio-white p-4">
          {selectedError === null ? (
            <>
              <p className="mb-3 text-sm font-semibold text-rio-black">Which error are you getting?</p>
              <div className="flex flex-col gap-2">
                {errors.map((err, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedError(i)}
                    className="rounded-lg border border-rio-green/20 bg-rio-white px-4 py-3 text-left text-sm text-red-600 hover:border-rio-teal hover:bg-rio-mint/20"
                  >
                    {err.title}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <ErrorDetail error={errors[selectedError]} onBack={() => setSelectedError(null)} />
          )}
        </div>
      )}

      {/* Bottom row */}
      {!step.successState && (
        <div className="mt-5 flex items-center justify-between gap-3">
          {errors.length > 0 ? (
            <button
              onClick={() => { setErrorOpen(!errorOpen); setSelectedError(null); }}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              I&apos;m getting an error
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={onComplete}
            className="rounded-lg bg-rio-teal px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Next step &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

function ErrorDetail({ error, onBack }: { error: CommonError; onBack: () => void }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-3 flex items-center gap-1 text-xs font-medium text-rio-green hover:underline"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to error list
      </button>

      {/* Error message */}
      <div className="mb-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-rio-teal">Error Message</p>
        <p className="rounded-lg border border-rio-green/20 bg-rio-white px-3 py-2 text-sm font-medium text-rio-black">
          {error.title}
        </p>
      </div>

      {/* Error screenshot */}
      {error.screenshotSrc && (
        <div className="mb-3 overflow-hidden rounded-lg border border-red-200">
          <Image src={error.screenshotSrc} alt={error.title} width={500} height={300} className="w-full" />
        </div>
      )}

      {/* Context */}
      <div className="mb-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-rio-teal">What this means</p>
        <p className="text-sm text-rio-black">{error.description}</p>
      </div>

      {/* How to fix */}
      {error.fixSteps && error.fixSteps.length > 0 && (
        <div className="rounded-lg border border-rio-mint bg-rio-mint/20 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-rio-teal">How to Fix</p>
          <ol className="space-y-2">
            {error.fixSteps.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-rio-black">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rio-teal/20 text-xs font-bold text-rio-teal">
                  {i + 1}
                </span>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
                    {s.label}
                  </a>
                ) : (
                  <span>{s.label}</span>
                )}
              </li>
            ))}
          </ol>
          {error.fixScreenshotSrc && (
            <div className="mt-3 overflow-hidden rounded-lg border border-blue-200">
              <Image src={error.fixScreenshotSrc} alt="Fix screenshot" width={500} height={300} className="w-full" />
            </div>
          )}
          {error.fixNote && (
            <p className="mt-3 flex gap-2 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <span className="shrink-0">⏱</span>
              {error.fixNote}
            </p>
          )}
        </div>
      )}

      {/* Sub-fix */}
      {error.subFix && (
        <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="mb-2 text-xs font-semibold text-gray-700">{error.subFix.trigger}</p>
          <ol className="space-y-1.5">
            {error.subFix.steps.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-800">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                  {i + 1}
                </span>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
                    {s.label}
                  </a>
                ) : (
                  <span>{s.label}</span>
                )}
              </li>
            ))}
          </ol>
          {error.subFix.screenshotSrc && (
            <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
              <Image src={error.subFix.screenshotSrc} alt={error.subFix.trigger} width={500} height={300} className="w-full" />
            </div>
          )}
        </div>
      )}

      {/* Dead-end note */}
      {error.deadEndNote && (
        <p className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs italic text-amber-700">
          {error.deadEndNote}
        </p>
      )}
    </div>
  );
}
