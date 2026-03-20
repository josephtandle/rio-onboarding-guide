import type { StepData } from "./types";

export const pathCSteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Quick Check",
    estimatedTime: "1 min",
    actions: [
      { label: "Your OTP verification was completed on this number" },
      { label: 'Your number shows "Connected" or green status in Meta Business Manager' },
      { label: "No other provider is listed under Business Settings > Partners" },
    ],
    tellMeMore:
      "If another provider is listed under Partners, you may need to remove them first. Go back and choose Path D (Migration) if that is the case.",
  },
  {
    id: "step-2",
    number: 2,
    title: "Connect to Rio",
    estimatedTime: "2 min",
    actions: [
      { label: 'Click "Connect WhatsApp" in Rio' },
      { label: "Log in with Facebook in the popup" },
      { label: "Select your existing business account and number" },
      { label: "Confirm permissions" },
    ],
    screenshotPlaceholder: "Rio connection popup showing permission confirmation",
  },
  {
    id: "step-3",
    number: 3,
    title: "Done!",
    estimatedTime: "",
    actions: [],
    successState: {
      title: "Your WhatsApp number is now connected to Rio.",
      bullets: [
        "Your display name is being reviewed by Meta. This can take a few minutes to a few days. Your number works while they review it.",
        "To send first messages to customers, you will need to set up message templates in Rio.",
      ],
      ctaLabel: "Go to Rio Dashboard",
      ctaHref: "https://app.joinrio.app",
    },
  },
];
