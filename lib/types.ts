export interface StepAction {
  label: string;
}

export interface CommonError {
  title: string;
  description: string;
}

export interface StepData {
  id: string;
  number: number;
  title: string;
  estimatedTime: string;
  actions: StepAction[];
  tellMeMore?: string;
  whatYouShouldSee?: string;
  warningCallout?: string;
  screenshotPlaceholder?: string;
  commonErrors?: CommonError[];
  branch?: {
    question: string;
    options: { label: string; action: string }[];
  };
  successState?: {
    title: string;
    bullets: string[];
    ctaLabel?: string;
    ctaHref?: string;
  };
  customContent?: string;
}

export interface OnboardingState {
  activePath: string | null;
  currentStep: Record<string, number>;
  completedSteps: Record<string, string[]>;
  checkedActions: Record<string, Record<string, boolean[]>>;
}
