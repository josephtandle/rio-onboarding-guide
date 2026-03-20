"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

type Stage = "q1" | "q1-help" | "q2" | "disambiguation";

// Screen ID badge — shown bottom-right of every quiz card
function ScreenId({ id }: { id: string }) {
  return (
    <span className="absolute bottom-3 right-3 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400 font-mono select-none">
      {id}
    </span>
  );
}

export default function TriageQuiz() {
  const [stage, setStage] = useState<Stage>("q1");
  const [history, setHistory] = useState<Stage[]>([]);
  const router = useRouter();

  function goTo(path: string) {
    router.push(path);
  }

  function advance(next: Stage) {
    setHistory((h) => [...h, stage]);
    setStage(next);
  }

  function goBack() {
    setHistory((h) => {
      const prev = [...h];
      const last = prev.pop();
      if (last) setStage(last);
      return prev;
    });
  }

  const canGoBack = history.length > 0;

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress dots */}
      <div className="mb-6 flex justify-center gap-2">
        {(["q1", "q2", "disambiguation"] as Stage[]).map((s) => (
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
          screenId="1A"
          pageTitle="Step 1 of 3"
          question="Have you ever set up your number in Meta Business Manager (business.facebook.com)?"
          options={[
            { label: "No / Not sure", onClick: () => advance("q1-help") },
            { label: "Yes", onClick: () => advance("q2") },
          ]}
          onBack={null}
        />
      )}

      {/* Q1 help */}
      {stage === "q1-help" && (
        <div className="relative rounded-xl bg-rio-white p-6 shadow-sm">
          <ScreenId id="1B" />
          <p className="mb-1 text-xs font-medium text-rio-green uppercase tracking-wide">How to check</p>
          <h3 className="mb-4 text-lg font-semibold text-rio-black">
            Do you have a Business Portfolio?
          </h3>
          <ol className="mb-4 space-y-3 text-sm text-rio-black">
            <li className="flex gap-2">
              <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-rio-mint text-rio-teal text-xs font-bold">1</span>
              <span>
                Go to{" "}
                <a
                  href="https://business.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rio-teal underline hover:opacity-80"
                >
                  business.facebook.com
                </a>{" "}
                in your browser.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-rio-mint text-rio-teal text-xs font-bold">2</span>
              <span>Log in with your Facebook account.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-rio-mint text-rio-teal text-xs font-bold">3</span>
              <span>Look at the top left. Do you see a business name (not your personal name)?</span>
            </li>
          </ol>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Image
              src="/screenshot-1b-business-portfolio.png"
              alt="Meta Business Suite showing a list of business portfolios on the left side"
              width={667}
              height={600}
              className="w-full"
            />
            <p className="bg-gray-50 px-3 py-2 text-xs text-gray-500">
              Your business portfolios appear in the left column. If you see names like these, you have a Business Portfolio.
            </p>
          </div>
          <p className="mt-4 mb-3 text-sm font-medium text-rio-black">
            After checking, answer below:
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => advance("q2")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Yes, I see my business name
            </button>
            <button
              onClick={() => goTo("/path-a")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              No, I do not have a business account
            </button>
          </div>
          <button
            onClick={goBack}
            className="mt-4 flex items-center gap-1 text-sm text-rio-green hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
        </div>
      )}

      {/* Q2 */}
      {stage === "q2" && (
        <QuizCard
          screenId="2A"
          pageTitle="Step 2 of 3"
          question="Is your number currently connected to another WhatsApp API provider (ManyChat, Wati, 360dialog, etc.)?"
          options={[
            { label: "No", onClick: () => advance("disambiguation") },
            { label: "Yes, I am migrating from another provider", onClick: () => goTo("/path-d") },
          ]}
          onBack={goBack}
        />
      )}

      {/* Disambiguation */}
      {stage === "disambiguation" && (
        <div className="relative rounded-xl bg-rio-white p-6 shadow-sm">
          <ScreenId id="2B" />
          <p className="mb-1 text-xs font-medium text-rio-green uppercase tracking-wide">Step 3 of 3</p>
          <h3 className="mb-4 text-lg font-semibold text-rio-black">
            Is your number Connected in Meta?
          </h3>
          <p className="mb-4 text-sm text-rio-black">
            Log into{" "}
            <a
              href="https://business.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rio-teal underline hover:opacity-80"
            >
              business.facebook.com
            </a>{" "}
            → click the <strong>Settings gear</strong> (top left) → <strong>Accounts</strong> → <strong>WhatsApp Accounts</strong>
          </p>
          <p className="mb-3 text-sm font-medium text-rio-black">
            Does your number show as &ldquo;Connected&rdquo; or have a green status?
          </p>
          <ScreenshotPlaceholder description="Meta Business Manager — WhatsApp Accounts page showing a number with 'Connected' green status" />
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => goTo("/path-b")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              No, it does not show as Connected
            </button>
            <button
              onClick={() => goTo("/path-c")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Yes, it shows Connected or green
            </button>
          </div>
          <button
            onClick={goBack}
            className="mt-4 flex items-center gap-1 text-sm text-rio-green hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
        </div>
      )}

      {/* Start over link — always visible except Q1 */}
      {canGoBack && stage !== "q1-help" && stage !== "disambiguation" && (
        <button
          onClick={() => { setHistory([]); setStage("q1"); }}
          className="mt-4 block w-full text-center text-sm text-rio-green hover:underline"
        >
          &larr; Start over
        </button>
      )}
    </div>
  );
}

function QuizCard({
  screenId,
  pageTitle,
  question,
  options,
  onBack,
}: {
  screenId: string;
  pageTitle: string;
  question: string;
  options: { label: string; onClick: () => void }[];
  onBack: (() => void) | null;
}) {
  return (
    <div className="relative rounded-xl bg-rio-white p-6 shadow-sm">
      <ScreenId id={screenId} />
      <p className="mb-1 text-xs font-medium text-rio-green uppercase tracking-wide">{pageTitle}</p>
      <h3 className="mb-5 text-lg font-semibold text-rio-black">{question}</h3>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={opt.onClick}
            className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            {opt.label}
          </button>
        ))}
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="mt-4 flex items-center gap-1 text-sm text-rio-green hover:underline"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
      )}
    </div>
  );
}
