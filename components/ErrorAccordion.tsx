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
        <div className="mt-2 space-y-4 pl-2">
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

              {/* Dead-end note */}
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
                  This path ends here. Fix the issue above, then start again from the beginning.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
