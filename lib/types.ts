export interface StepAction {
  label: string;
  href?: string; // optional link for the action label
}

export interface CommonError {
  title: string;
  description: string;
  branchId?: string;      // e.g. "B6.I"
  screenshotSrc?: string;
  isDeadEnd?: boolean;
  deadEndNote?: string;
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
  screenshotSrc?: string; // path to real screenshot in /public
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
