"use client";

import { useState, useMemo } from "react";
import PathPage from "@/components/PathPage";
import { pathDSteps } from "@/lib/path-d-steps";

type Provider = "manychat" | "wati" | "other" | null;

export default function PathDPage() {
  const [provider, setProvider] = useState<Provider>(null);

  const filteredSteps = useMemo(() => {
    if (!provider) return pathDSteps;

    // Filter step-2 variants based on provider choice
    return pathDSteps.filter((step) => {
      if (step.id === "step-2-manychat") return provider === "manychat";
      if (step.id === "step-2-wati") return provider === "wati";
      if (step.id === "step-2-other") return provider === "other";
      return true;
    });
  }, [provider]);

  // Re-number steps
  const renumberedSteps = filteredSteps.map((step, i) => ({
    ...step,
    number: i + 1,
  }));

  return (
    <PathDInner
      steps={renumberedSteps}
      provider={provider}
      onProviderSelect={setProvider}
    />
  );
}

function PathDInner({
  steps,
  provider,
  onProviderSelect,
}: {
  steps: typeof pathDSteps;
  provider: Provider;
  onProviderSelect: (p: Provider) => void;
}) {
  // Override branch handler for step 1 to set provider
  const stepsWithBranch = steps.map((step) => {
    if (step.id === "step-1") {
      return {
        ...step,
        branch: {
          question: "Select your current WhatsApp API provider:",
          options: [
            { label: "ManyChat", action: "provider-manychat" },
            { label: "Wati", action: "provider-wati" },
            { label: "Other provider", action: "provider-other" },
          ],
        },
      };
    }
    return step;
  });

  return (
    <PathPageWithBranch
      pathId="path-d"
      pathTitle="Migration From Another Provider"
      steps={stepsWithBranch}
      provider={provider}
      onProviderSelect={onProviderSelect}
    />
  );
}

// Custom PathPage that intercepts provider branch actions
import { useState as useStateAlias, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter as useRouterAlias } from "next/navigation";
import { loadState, saveState } from "@/lib/storage";
import Header from "@/components/Header";
import StepCard from "@/components/StepCard";
import SupportWidget from "@/components/SupportWidget";
import type { StepData } from "@/lib/types";

function PathPageWithBranch({
  pathId,
  pathTitle,
  steps,
  provider,
  onProviderSelect,
}: {
  pathId: string;
  pathTitle: string;
  steps: StepData[];
  provider: Provider;
  onProviderSelect: (p: Provider) => void;
}) {
  const router = useRouterAlias();
  const [currentIndex, setCurrentIndex] = useStateAlias(0);
  const [completedSteps, setCompletedSteps] = useStateAlias<string[]>([]);
  const [checkedActions, setCheckedActions] = useStateAlias<
    Record<string, boolean[]>
  >({});

  useEffect(() => {
    const state = loadState();
    if (state.currentStep[pathId] !== undefined) {
      setCurrentIndex(state.currentStep[pathId]);
    }
    if (state.completedSteps[pathId]) {
      setCompletedSteps(state.completedSteps[pathId]);
    }
    if (state.checkedActions[pathId]) {
      setCheckedActions(state.checkedActions[pathId] as Record<string, boolean[]>);
    }
  }, [pathId]);

  const persist = useCallback(
    (idx: number, completed: string[], actions: Record<string, boolean[]>) => {
      const state = loadState();
      state.activePath = pathId;
      state.currentStep[pathId] = idx;
      state.completedSteps[pathId] = completed;
      state.checkedActions[pathId] = actions;
      saveState(state);
    },
    [pathId]
  );

  function handleComplete(stepId: string) {
    const next = [...completedSteps, stepId];
    setCompletedSteps(next);
    const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
    setCurrentIndex(nextIndex);
    persist(nextIndex, next, checkedActions);
  }

  function handleToggleAction(stepId: string, actionIndex: number) {
    setCheckedActions((prev) => {
      const stepActions = [...(prev[stepId] || [])];
      stepActions[actionIndex] = !stepActions[actionIndex];
      const updated = { ...prev, [stepId]: stepActions };
      persist(currentIndex, completedSteps, updated);
      return updated;
    });
  }

  function handleBranch(_stepId: string, action: string) {
    if (action.startsWith("provider-")) {
      const p = action.replace("provider-", "") as Provider;
      onProviderSelect(p);
      // Auto-complete step 1
      handleComplete(_stepId);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              if (currentIndex === 0) {
                router.push("/");
              } else {
                const prev = Math.max(currentIndex - 1, 0);
                setCurrentIndex(prev);
                persist(prev, completedSteps, checkedActions);
              }
            }}
            className="mb-3 flex items-center gap-1 text-sm text-rio-green hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            {currentIndex === 0 ? "Back to questions" : "Back"}
          </button>
          <h1 className="text-2xl font-bold text-rio-black">{pathTitle}</h1>
          <p className="mt-1 text-sm text-rio-green">
            Step {Math.min(currentIndex + 1, steps.length)} of {steps.length}
            {provider && (
              <span className="ml-2 rounded-full bg-rio-mint px-2 py-0.5 text-xs font-medium text-rio-teal">
                {provider === "manychat"
                  ? "ManyChat"
                  : provider === "wati"
                    ? "Wati"
                    : "Other provider"}
              </span>
            )}
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              isActive={i === currentIndex}
              isCompleted={completedSteps.includes(step.id)}
              checkedActions={checkedActions[step.id] || []}
              onToggleAction={(actionIdx) =>
                handleToggleAction(step.id, actionIdx)
              }
              onComplete={() => handleComplete(step.id)}
              onBack={currentIndex === 0 ? () => router.push("/") : () => setCurrentIndex((idx) => Math.max(idx - 1, 0))}
              onBranch={(action) => handleBranch(step.id, action)}
              totalSteps={steps.length}
              screenId={`D-${step.number}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-rio-green hover:underline">
            &larr; This doesn&apos;t match what I&apos;m seeing
          </Link>
        </div>
      </main>
      <SupportWidget />
    </div>
  );
}
