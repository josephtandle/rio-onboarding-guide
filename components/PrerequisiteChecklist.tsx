"use client";

import { useState } from "react";

const PREREQUISITES = [
  "I have a Facebook/Meta account I can log into at business.facebook.com",
  "My business has a live website with HTTPS",
  "My business name, address, and phone number are on that website",
  "I know my legal business name (as registered)",
  "I know my business address",
  "I have the phone number I want to connect nearby",
  "That phone number is a real SIM or landline — NOT Google Voice, TextNow, or virtual number apps",
];

interface PrerequisiteChecklistProps {
  onReady: () => void;
}

export default function PrerequisiteChecklist({
  onReady,
}: PrerequisiteChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(PREREQUISITES.length).fill(false)
  );

  const allChecked = checked.every(Boolean);

  function toggle(index: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  return (
    <div className="rounded-xl border border-rio-green/20 bg-rio-white p-5">
      <h3 className="mb-1 text-base font-semibold text-rio-black">
        Before you start
      </h3>
      <p className="mb-4 text-sm text-rio-green">
        Make sure you have everything ready. Check each item below.
      </p>
      <div className="space-y-3">
        {PREREQUISITES.map((item, i) => (
          <label
            key={i}
            className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-rio-beige"
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="mt-0.5"
            />
            <span className="text-sm text-rio-black">{item}</span>
          </label>
        ))}
      </div>
      <button
        onClick={onReady}
        disabled={!allChecked}
        className={`mt-5 w-full rounded-lg px-5 py-3 text-sm font-medium ${
          allChecked
            ? "bg-rio-teal text-white hover:opacity-90"
            : "cursor-not-allowed bg-gray-200 text-gray-400"
        }`}
      >
        {allChecked ? "Let's start \u2192" : "Check all items to continue"}
      </button>
    </div>
  );
}
