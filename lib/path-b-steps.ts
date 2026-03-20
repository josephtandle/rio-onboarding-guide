import type { StepData } from "./types";

export const pathBSteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Confirm Your Account Exists",
    estimatedTime: "2 min",
    actions: [
      { label: "Go to business.facebook.com" },
      { label: "Click Business Settings, then Accounts, then WhatsApp Accounts" },
      { label: "Find your number in the list" },
    ],
    screenshotPlaceholder:
      "Meta Business Manager > WhatsApp Accounts page showing your number",
  },
  {
    id: "step-2",
    number: 2,
    title: "Start the Connection in Rio",
    estimatedTime: "2 min",
    actions: [
      { label: 'Click "Connect WhatsApp" in Rio' },
      { label: "Log in with Facebook in the popup" },
      { label: "Select your existing business account (do not create a new one)" },
      { label: "Select your existing WhatsApp Business Account (do not create a new one)" },
    ],
    screenshotPlaceholder:
      "Rio Connect WhatsApp popup showing existing accounts",
  },
  {
    id: "step-3",
    number: 3,
    title: "Verify Your Phone Number",
    estimatedTime: "2 min",
    actions: [
      { label: "Choose your existing number from the list" },
      { label: "Choose SMS or voice call" },
      { label: "Enter the code when you receive it" },
    ],
    commonErrors: [
      {
        title: "Code not arriving",
        description:
          "Try voice call instead of SMS. Make sure call-blocking apps are disabled.",
      },
    ],
  },
  {
    id: "step-4",
    number: 4,
    title: "You're Connected!",
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
