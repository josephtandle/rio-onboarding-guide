"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import type { StepData } from "@/lib/types";
import { loadState, saveState } from "@/lib/storage";
import Header from "./Header";
import StepCard from "./StepCard";
import SupportWidget from "./SupportWidget";

interface PathPageProps {
  pathId: string;
  pathTitle: string;
  steps: StepData[];
  prerequisiteNode?: React.ReactNode;
}

export default function PathPage({
  pathId,
  pathTitle,
  steps,
  prerequisiteNode,
}: PathPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [checkedActions, setCheckedActions] = useState<
    Record<string, boolean[]>
  >({});
  const [prereqDone, setPrereqDone] = useState(!prerequisiteNode);
  const [hiddenSteps, setHiddenSteps] = useState<string[]>([]);

  // Load saved state
  useEffect(() => {
    const state = loadState();
    if (state.currentStep[pathId] !== undefined) {
      setCurrentIndex(state.currentStep[pathId]);
    }
    if (state.completedSteps[pathId]) {
      setCompletedSteps(state.completedSteps[pathId]);
      if (prerequisiteNode) setPrereqDone(true);
    }
    if (state.checkedActions[pathId]) {
      setCheckedActions(state.checkedActions[pathId] as Record<string, boolean[]>);
    }
  }, [pathId, prerequisiteNode]);

  // Persist state changes
  const persist = useCallback(
    (
      idx: number,
      completed: string[],
      actions: Record<string, boolean[]>
    ) => {
      const state = loadState();
      state.activePath = pathId;
      state.currentStep[pathId] = idx;
      state.completedSteps[pathId] = completed;
      state.checkedActions[pathId] = actions;
      saveState(state);
    },
    [pathId]
  );

  // Deep-link: scroll to current step on hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const match = window.location.hash.match(/step-(\d+)/);
      if (match) {
        const stepNum = parseInt(match[1], 10);
        const idx = visibleSteps.findIndex((s) => s.number === stepNum);
        if (idx >= 0) setCurrentIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleSteps = steps.filter((s) => !hiddenSteps.includes(s.id));

  function handleComplete(stepId: string) {
    const next = [...completedSteps, stepId];
    setCompletedSteps(next);
    const nextIndex = Math.min(currentIndex + 1, visibleSteps.length - 1);
    setCurrentIndex(nextIndex);
    persist(nextIndex, next, checkedActions);
    // Update hash
    if (typeof window !== "undefined") {
      const nextStep = visibleSteps[nextIndex];
      if (nextStep) {
        window.history.replaceState(null, "", `#step-${nextStep.number}`);
        document
          .getElementById(`step-${nextStep.number}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function handleToggleAction(stepId: string, actionIndex: number) {
    setCheckedActions((prev) => {
      const stepActions = [...(prev[stepId] || [])];
      stepActions[actionIndex] = !stepActions[actionIndex];
      const next = { ...prev, [stepId]: stepActions };
      persist(currentIndex, completedSteps, next);
      return next;
    });
  }

  function handleBranch(stepId: string, action: string) {
    if (action === "show-step-1b") {
      setHiddenSteps((prev) => prev.filter((id) => id !== "step-1b"));
    } else if (action === "skip-step-1b") {
      setHiddenSteps((prev) =>
        prev.includes("step-1b") ? prev : [...prev, "step-1b"]
      );
      handleComplete(stepId);
    } else if (action.startsWith("/")) {
      window.location.href = action;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rio-black">{pathTitle}</h1>
          <p className="mt-1 text-sm text-rio-green">
            Step {Math.min(currentIndex + 1, visibleSteps.length)} of{" "}
            {visibleSteps.length}
          </p>
        </div>

        {/* Prerequisites */}
        {prerequisiteNode && !prereqDone && (
          <div className="mb-6">
            {typeof prerequisiteNode === "function"
              ? null
              : prerequisiteNode}
            <div className="mt-4">
              <button
                onClick={() => setPrereqDone(true)}
                className="hidden"
                id="prereq-done-trigger"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Steps */}
        {(prereqDone || !prerequisiteNode) && (
          <div className="space-y-4">
            {visibleSteps.map((step, i) => (
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
                onBranch={(action) => handleBranch(step.id, action)}
                totalSteps={visibleSteps.length}
              />
            ))}
          </div>
        )}

        {/* Wrong path link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-rio-green hover:underline"
          >
            &larr; This doesn&apos;t match what I&apos;m seeing
          </Link>
        </div>
      </main>

      <SupportWidget />
    </div>
  );
}
