import type { StepData } from "./types";

export const pathCSteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Enter Your WhatsApp Business Phone Number",
    estimatedTime: "1 min",
    actions: [
      { label: "Select your country code from the dropdown." },
      { label: "Enter the phone number that is currently running on WhatsApp Business App." },
      { label: 'Click "Next".' },
    ],
    screenshotSrc: "/screenshot-connect-wba-enter-phone.png",
    screenshotPlaceholder:
      "Meta embedded signup — Enter your WhatsApp Business phone number form",
    tellMeMore:
      'If your number has not yet been added to your Business Portfolio, Meta will ask you to verify it before continuing.',
    commonErrors: [
      {
        branchId: "C1.I",
        title: "To use this phone number, you'll need to delete an existing one from WhatsApp Manager or request additional numbers on your account.",
        description:
          "Your account has reached its phone number limit. You either need to remove an existing number from WhatsApp Manager, or request that Meta increase your number limit.",
        screenshotSrc: "/screenshot-error-wba-number-limit.png",
        isDeadEnd: true,
        deadEndNote: "I will research the instructions to give them this.",
      },
    ],
  },
  {
    id: "step-2",
    number: 2,
    title: "Confirm Permissions",
    estimatedTime: "1 min",
    actions: [
      { label: "Review the permissions Rio is requesting." },
      { label: 'Click "Continue" or "Allow".' },
    ],
    screenshotPlaceholder: "Meta embedded signup — permissions confirmation screen",
  },
  {
    id: "step-3",
    number: 3,
    title: "You're Connected!",
    estimatedTime: "",
    actions: [],
    successState: {
      title: "Your WhatsApp Business number is now connected to Rio.",
      bullets: [
        "Your display name is being reviewed by Meta. This can take a few minutes to a few days. Your number works while they review it.",
        "To send first messages to customers, you will need to set up message templates in Rio.",
      ],
      ctaLabel: "Go to Rio Dashboard",
      ctaHref: "https://app.joinrio.app",
    },
  },
];
