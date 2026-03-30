"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Stage = "migration" | "wba-type";

// Screen ID badge — shown bottom-right of every quiz card
function ScreenId({ id }: { id: string }) {
  return (
    <span className="absolute bottom-3 right-3 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400 font-mono select-none">
      {id}
    </span>
  );
}

export default function TriageQuiz() {
  const [stage, setStage] = useState<Stage>("migration");
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

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Progress dots */}
      <div className="mb-6 flex justify-center gap-2">
        {(["migration", "wba-type"] as Stage[]).map((s) => (
          <div
            key={s}
            className={`h-2 w-2 rounded-full ${
              stage === s ? "bg-rio-teal" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Q1: Migration check */}
      {stage === "migration" && (
        <QuizCard
          screenId="1A"
          pageTitle="Step 1 of 2"
          question="Is your number currently connected to another WhatsApp API provider (ManyChat, Wati, 360dialog, etc.)?"
          options={[
            { label: "No", onClick: () => advance("wba-type") },
            { label: "Yes, I am migrating from another provider", onClick: () => goTo("/path-d") },
          ]}
          onBack={null}
        />
      )}

      {/* Q2: WBA type selection */}
      {stage === "wba-type" && (
        <div className="relative rounded-xl bg-rio-white p-6 shadow-sm">
          <ScreenId id="1B" />
          <p className="mb-1 text-xs font-medium text-rio-green uppercase tracking-wide">Step 2 of 2</p>
          <h3 className="mb-4 text-lg font-semibold text-rio-black">
            Choose Your Business Portfolio
          </h3>

          {/* Business Portfolio */}
          <div className="mb-4 rounded-lg border border-gray-200 p-4">
            <p className="mb-3 text-sm text-rio-black">
              Pick an existing business portfolio or create one during the signup flow. If you have one, pick your existing portfolio; if not, you can set up a new one during the flow.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image
                  src="/screenshot-embedded-signup-portfolio-pick-existing.png"
                  alt="Business portfolio dropdown showing a list of existing portfolios to choose from"
                  width={400}
                  height={280}
                  className="w-full rounded-lg border border-gray-200"
                />
                <p className="mt-1 text-center text-xs text-gray-500">Option A: Pick existing</p>
              </div>
              <div>
                <Image
                  src="/screenshot-embedded-signup-portfolio-create-new.png"
                  alt="Business portfolio dropdown showing the option to create a new business portfolio"
                  width={400}
                  height={280}
                  className="w-full rounded-lg border border-gray-200"
                />
                <p className="mt-1 text-center text-xs text-gray-500">Option B: Create new</p>
              </div>
            </div>
          </div>

          {/* WBA type */}
          <div className="mb-5 rounded-lg border border-gray-200 p-4">
            <p className="mb-1 text-xs font-semibold text-rio-teal uppercase tracking-wide">2 · WhatsApp Business Account</p>
            <p className="mb-3 text-sm text-rio-black">
              After choosing your portfolio, you will see this option:
            </p>
            <div className="mb-3">
              <Image
                src="/screenshot-embedded-signup-waba-connect-existing.png"
                alt="WhatsApp Business account dropdown showing Connect a WhatsApp Business App option"
                width={600}
                height={200}
                className="w-full rounded-lg border border-gray-200"
              />
            </div>
            <p className="mb-4 text-sm text-rio-black">
              Choose <strong>Connect a WhatsApp Business App</strong>. This is for numbers already running on WhatsApp for Business, which is the case for most people.
            </p>
            <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
              <button
                onClick={() => goTo("/path-c")}
                className="w-full rounded-lg bg-rio-teal px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Connect a WhatsApp Business App
              </button>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Other</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => goTo("/path-b")}
                  className="text-left text-sm text-gray-500 underline hover:text-rio-teal"
                >
                  I&apos;ve never used this number on WhatsApp, on my phone or desktop
                </button>
                <button
                  onClick={() => goTo("/path-e")}
                  className="text-left text-sm text-gray-500 underline hover:text-rio-teal"
                >
                  I already have a WhatsApp for Business account set up inside Meta Business Suite
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={goBack}
            className="mt-5 flex items-center gap-1 text-sm text-rio-green hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
        </div>
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
      <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={opt.onClick}
            className="w-full rounded-lg bg-rio-teal px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
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
