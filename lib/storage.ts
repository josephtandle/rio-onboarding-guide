"use client";

import type { OnboardingState } from "./types";

const STORAGE_KEY = "rio_onboarding_state";

const DEFAULT_STATE: OnboardingState = {
  activePath: null,
  currentStep: {},
  completedSteps: {},
  checkedActions: {},
};

export function loadState(): OnboardingState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return JSON.parse(raw) as OnboardingState;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: OnboardingState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be full or blocked
  }
}

export function resetState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
