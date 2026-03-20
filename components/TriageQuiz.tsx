"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

type Stage =
  | "q1"
  | "q1-help"
  | "q2"
  | "disambiguation";

export default function TriageQuiz() {
  const [stage, setStage] = useState<Stage>("q1");
  const router = useRouter();

  function goTo(path: string) {
    router.push(path);
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress dots */}
      <div className="mb-6 flex justify-center gap-2">
        {["q1", "q2", "disambiguation"].map((s) => (
          <div
            key={s}
            className={`h-2 w-2 rounded-full ${
              stage === s || (s === "q1" && stage === "q1-help")
                ? "bg-rio-teal"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Q1 */}
      {stage === "q1" && (
        <QuizCard
          question="Have you ever set up your number in Meta Business Manager (business.facebook.com)?"
          options={[
            { label: "Yes", onClick: () => setStage("q2") },
            { label: "No / Not sure", onClick: () => setStage("q1-help") },
          ]}
        />
      )}

      {/* Q1 help */}
      {stage === "q1-help" && (
        <div className="rounded-xl bg-rio-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-rio-black">
            How to check
          </h3>
          <ol className="mb-4 space-y-2 text-sm text-rio-black">
            <li>1. Go to business.facebook.com in your browser.</li>
            <li>2. Log in with your Facebook account.</li>
            <li>
              3. Look at the top left. Do you see a business name (not your
              personal name)?
            </li>
          </ol>
          <ScreenshotPlaceholder description="Meta Business Manager dashboard showing business name at top left" />
          <p className="mb-4 text-sm text-rio-green">
            After checking, answer below:
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setStage("q2")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Yes, I see my business name
            </button>
            <button
              onClick={() => goTo("/path-a")}
              className="rounded-lg border border-rio-teal px-4 py-3 text-sm font-medium text-rio-teal hover:bg-rio-teal hover:text-white"
            >
              No, I do not have a business account
            </button>
          </div>
        </div>
      )}

      {/* Q2 */}
      {stage === "q2" && (
        <QuizCard
          question="Is your number currently connected to another WhatsApp API provider (ManyChat, Wati, 360dialog, etc.)?"
          options={[
            { label: "Yes", onClick: () => goTo("/path-d") },
            { label: "No", onClick: () => setStage("disambiguation") },
          ]}
        />
      )}

      {/* Disambiguation */}
      {stage === "disambiguation" && (
        <QuizCard
          question='When you log into Meta Business Manager and go to WhatsApp Accounts, does your number show as "Connected" or have a green status?'
          options={[
            { label: "Yes, it shows connected", onClick: () => goTo("/path-c") },
            { label: "No, it does not", onClick: () => goTo("/path-b") },
          ]}
        />
      )}

      {/* Start over */}
      {stage !== "q1" && (
        <button
          onClick={() => setStage("q1")}
          className="mt-4 block w-full text-center text-sm text-rio-green hover:underline"
        >
          &larr; Start over
        </button>
      )}
    </div>
  );
}

function QuizCard({
  question,
  options,
}: {
  question: string;
  options: { label: string; onClick: () => void }[];
}) {
  return (
    <div className="rounded-xl bg-rio-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-rio-black">{question}</h3>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={opt.onClick}
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              i === 0
                ? "bg-rio-teal text-white hover:opacity-90"
                : "border border-rio-teal text-rio-teal hover:bg-rio-teal hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
