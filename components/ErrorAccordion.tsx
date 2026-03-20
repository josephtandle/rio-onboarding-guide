"use client";

import { useState } from "react";
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
        Common issues at this step
      </button>
      {open && (
        <div className="mt-2 space-y-3 pl-6">
          {errors.map((err, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-rio-black">{err.title}</p>
              <p className="text-sm text-rio-green">{err.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
