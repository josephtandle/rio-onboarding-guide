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
    <div className="mx-auto w-full max-w-xl">
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
          <h3 className="mb-2 text-lg font-semibold text-rio-black">
            What happens during setup
          </h3>
          <p className="mb-4 text-sm text-rio-black">
            When you open Rio&apos;s setup link, you&apos;ll see a screen to select your business assets. There are two selections to make:
          </p>

          {/* Business Portfolio */}
          <div className="mb-4 rounded-lg border border-gray-200 p-4">
            <p className="mb-1 text-xs font-semibold text-rio-teal uppercase tracking-wide">1 · Business Portfolio</p>
            <p className="mb-3 text-sm text-rio-black">
              Pick an existing Business Portfolio or create a new one. You don&apos;t need to set this up in advance — it can be done directly in the signup flow.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Image
                  src="/screenshot-embedded-signup-portfolio-pick-existing.png"
                  alt="Business portfolio dropdown showing a list of existing portfolios to choose from"
                  width={280}
                  height={200}
                  className="w-full rounded-lg border border-gray-200"
                />
                <p className="mt-1 text-center text-xs text-gray-500">Pick existing</p>
              </div>
              <div>
                <Image
                  src="/screenshot-embedded-signup-portfolio-create-new.png"
                  alt="Business portfolio dropdown showing the option to create a new business portfolio"
                  width={280}
                  height={200}
                  className="w-full rounded-lg border border-gray-200"
                />
                <p className="mt-1 text-center text-xs text-gray-500">Create new</p>
              </div>
            </div>
          </div>

          {/* WBA type */}
          <div className="mb-5 rounded-lg border border-gray-200 p-4">
            <p className="mb-1 text-xs font-semibold text-rio-teal uppercase tracking-wide">2 · WhatsApp Business Account</p>
            <p className="mb-3 text-sm text-rio-black">
              After choosing your portfolio, select one of two options:
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <Image
                  src="/screenshot-embedded-signup-waba-create-new.png"
                  alt="WhatsApp Business account dropdown showing Create a WhatsApp Business account option"
                  width={280}
                  height={160}
                  className="w-full rounded-lg border border-gray-200"
                />
                <p className="mt-1 text-center text-xs text-gray-500">For new numbers</p>
              </div>
              <div>
                <Image
                  src="/screenshot-embedded-signup-waba-connect-existing.png"
                  alt="WhatsApp Business account dropdown showing Connect a WhatsApp Business App option"
                  width={280}
                  height={160}
                  className="w-full rounded-lg border border-gray-200"
                />
                <p className="mt-1 text-center text-xs text-gray-500">For existing WBA</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-rio-black">
              <li className="flex gap-2">
                <span className="mt-0.5 flex-shrink-0 font-bold text-rio-teal">→</span>
                <span><strong>Create a WhatsApp Business account</strong> — converts a regular phone number into a WhatsApp Business number.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 flex-shrink-0 font-bold text-rio-teal">→</span>
                <span><strong>Connect a WhatsApp Business App</strong> — use this only if you already have a WhatsApp Business phone number inside your Business Portfolio.</span>
              </li>
            </ul>
          </div>

          <p className="mb-3 text-sm font-semibold text-rio-black">
            Which option applies to you?
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => goTo("/path-b")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Create a WhatsApp Business account
            </button>
            <button
              onClick={() => goTo("/path-c")}
              className="rounded-lg bg-rio-teal px-4 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Connect a WhatsApp Business App
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
