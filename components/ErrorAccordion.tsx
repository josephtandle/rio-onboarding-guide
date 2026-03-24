"use client";

import { useState } from "react";
import Image from "next/image";
import type { CommonError } from "@/lib/types";

interface ErrorAccordionProps {
  errors: CommonError[];
}

export default function ErrorAccordion({ errors }: ErrorAccordionProps) {
  const [open, setOpen] = useState(false);

  if (errors.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 text-left text-sm font-medium text-rio-green hover:text-rio-teal"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        I ran into an error
      </button>

      {open && (
        <div className={`mt-2 pl-2 ${errors.length > 1 ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "space-y-4"}`}>
          {errors.map((err, i) => (
            <div
              key={i}
              className={`rounded-lg border p-4 ${
                err.isDeadEnd
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Branch label */}
              {err.branchId && (
                <span className="mb-2 inline-block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-500">
                  {err.branchId}
                </span>
              )}

              <p className="text-sm font-semibold text-rio-black">{err.title}</p>
              <p className="mt-1 text-sm text-rio-green">{err.description}</p>

              {/* Screenshot */}
              {err.screenshotSrc && (
                <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={err.screenshotSrc}
                    alt={err.title}
                    width={500}
                    height={300}
                    className="w-full"
                  />
                </div>
              )}

              {/* Fix steps */}
              {err.fixSteps && err.fixSteps.length > 0 && (
                <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="mb-2 text-xs font-semibold text-blue-800">How to fix this:</p>
                  <ol className="space-y-1.5">
                    {err.fixSteps.map((step, j) => (
                      <li key={j} className="flex gap-2 text-xs text-blue-900">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-200 font-bold text-blue-800">
                          {j + 1}
                        </span>
                        {step.href ? (
                          <a href={step.href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
                            {step.label}
                          </a>
                        ) : (
                          <span>{step.label}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                  {err.fixScreenshotSrc && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-blue-200">
                      <Image
                        src={err.fixScreenshotSrc}
                        alt="How to fix this issue"
                        width={500}
                        height={300}
                        className="w-full"
                      />
                    </div>
                  )}
                  {err.fixNote && (
                    <p className="mt-3 flex gap-2 rounded bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
                      <span className="shrink-0">⏱</span>
                      {err.fixNote}
                    </p>
                  )}
                </div>
              )}

              {/* Sub-fix (nested blocker within the main fix) */}
              {err.subFix && (
                <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="mb-2 text-xs font-semibold text-gray-700">{err.subFix.trigger}</p>
                  <ol className="space-y-1.5">
                    {err.subFix.steps.map((step, j) => (
                      <li key={j} className="flex gap-2 text-xs text-gray-800">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                          {j + 1}
                        </span>
                        {step.href ? (
                          <a href={step.href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
                            {step.label}
                          </a>
                        ) : (
                          <span>{step.label}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                  {err.subFix.screenshotSrc && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={err.subFix.screenshotSrc}
                        alt={err.subFix.trigger}
                        width={500}
                        height={300}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Dead-end note (placeholder while fix is being researched) */}
              {err.deadEndNote && (
                <p className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs italic text-amber-700">
                  {err.deadEndNote}
                </p>
              )}

              {/* Dead-end terminator */}
              {err.isDeadEnd && (
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-red-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Fix the issue above, then return and try again.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
