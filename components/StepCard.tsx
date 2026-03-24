"use client";

import { useState } from "react";
import type { StepData } from "@/lib/types";
import ErrorAccordion from "./ErrorAccordion";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";
import SupportModal from "./SupportModal";

interface StepCardProps {
  step: StepData;
  isActive: boolean;
  isCompleted: boolean;
  checkedActions: boolean[];
  onToggleAction: (actionIndex: number) => void;
  onComplete: () => void;
  onBranch?: (action: string) => void;
  totalSteps: number;
  screenId?: string; // e.g. "A-1", "B-3"
}

export default function StepCard({
  step,
  isActive,
  isCompleted,
  checkedActions,
  onToggleAction,
  onComplete,
  onBranch,
  totalSteps,
  screenId,
}: StepCardProps) {
  const [showTellMeMore, setShowTellMeMore] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const actions = step.actions ?? [];
  const allChecked =
    actions.length > 0 &&
    checkedActions.length === actions.length &&
    checkedActions.every(Boolean);

  // Collapsed completed card (non-clickable)
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

  // Upcoming (not active, not completed)
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

  // Active card — expanded
  return (
    <>
      <div
        id={`step-${step.number}`}
        className="rounded-xl bg-rio-white p-5 border-2 border-rio-teal shadow-sm"
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white bg-rio-teal">
              {step.number}
            </div>
            <div>
              {screenId && (
                <span className="block font-mono text-xs text-gray-400">[{screenId}]</span>
              )}
              <h3 className="text-base font-semibold text-rio-black">
                Step {step.number} of {totalSteps}: {step.title}
              </h3>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {step.estimatedTime && (
              <span className="rounded-full bg-rio-mint px-2.5 py-0.5 text-xs font-medium text-rio-teal">
                {step.estimatedTime}
              </span>
            )}
          </div>
        </div>

        {/* Success state (final step) */}
        {step.successState && (
          <div className="mb-4 rounded-lg border border-rio-mint bg-rio-mint/30 p-5 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rio-aqua text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-rio-black">
              {step.successState.title}
            </h4>
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

        {/* Actions as checkboxes */}
        {actions.length > 0 && (
          <div className="mb-4 space-y-3">
            {actions.map((action, i) => (
              <label
                key={i}
                className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-rio-beige"
              >
                <input
                  type="checkbox"
                  checked={checkedActions[i] || false}
                  onChange={() => onToggleAction(i)}
                  className="mt-0.5"
                />
                <span className="text-sm text-rio-black">
                  {action.href ? (
                    <>
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-rio-teal underline hover:opacity-80"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {action.label}
                      </a>
                    </>
                  ) : (
                    action.label
                  )}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Warning callout */}
        {step.warningCallout && (
          <div className="mb-4 rounded-lg bg-rio-sand p-4 text-sm text-rio-black">
            <strong className="mr-1">Heads up:</strong>
            {step.warningCallout}
          </div>
        )}

        {/* Screenshot placeholder */}
        {step.screenshotPlaceholder && (
          <ScreenshotPlaceholder description={step.screenshotPlaceholder} />
        )}

        {/* Tell me more */}
        {step.tellMeMore && (
          <div className="mb-4">
            <button
              onClick={() => setShowTellMeMore(!showTellMeMore)}
              className="flex items-center gap-1 text-sm font-medium text-rio-teal hover:underline"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform ${showTellMeMore ? "rotate-90" : ""}`}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              Tell me more
            </button>
            {showTellMeMore && (
              <p className="mt-2 rounded-lg bg-rio-beige p-3 text-sm text-rio-green">
                {step.tellMeMore}
              </p>
            )}
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
            <p className="mb-3 text-sm font-medium text-rio-black">
              {step.branch.question}
            </p>
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

        {/* Common errors */}
        {step.commonErrors && <ErrorAccordion errors={step.commonErrors} />}

        {/* Buttons row */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {!step.successState && (
            <>
              <button
                onClick={onComplete}
                disabled={!allChecked}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium ${
                  allChecked
                    ? "bg-rio-teal text-white hover:opacity-90"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
              >
                Mark complete &rarr; Next step
              </button>
              {!allChecked && (
                <button
                  onClick={onComplete}
                  className="text-sm text-rio-green hover:underline"
                >
                  Skip to next
                </button>
              )}
            </>
          )}

          <button
            onClick={() => setSupportOpen(true)}
            className="ml-auto rounded-lg bg-rio-sand px-4 py-2 text-sm font-medium text-rio-black hover:opacity-90"
          >
            I&apos;m getting an error
          </button>
        </div>
      </div>

      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  );
}
