import type { StepData } from "./types";

export const pathDSteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Who is your current provider?",
    estimatedTime: "1 min",
    actions: [],
    branch: {
      question: "Select your current WhatsApp API provider:",
      options: [
        { label: "ManyChat", action: "show-manychat" },
        { label: "Wati", action: "show-wati" },
        { label: "Other provider", action: "show-other" },
      ],
    },
  },
  {
    id: "step-2-manychat",
    number: 2,
    title: "Disconnect from ManyChat",
    estimatedTime: "5-10 min",
    actions: [
      { label: "Log into ManyChat. Go to WhatsApp channel settings." },
      { label: "Remove your phone number from ManyChat." },
      { label: "In Meta Business Manager, go to Business Settings > Billing > Credit Lines. Remove any credit lines attached to ManyChat." },
      { label: "In Business Settings > Partners, find ManyChat and remove their access." },
    ],
    screenshotPlaceholder:
      "ManyChat WhatsApp channel settings showing number removal option",
  },
  {
    id: "step-2-wati",
    number: 2,
    title: "Disconnect from Wati",
    estimatedTime: "5-10 min",
    actions: [
      { label: "Log into Wati. Go to Settings > WhatsApp API > Disconnect Number." },
      { label: "Confirm disconnection." },
      { label: "In Meta Business Manager, go to Business Settings > Partners and remove Wati." },
    ],
    screenshotPlaceholder:
      "Wati settings showing disconnect number option",
  },
  {
    id: "step-2-other",
    number: 2,
    title: "Contact Your Current Provider",
    estimatedTime: "varies",
    actions: [
      { label: "Contact your current provider's support team" },
      { label: "Ask them to 'release your WhatsApp number from their BSP'" },
      { label: "Once done, remove them from Meta Business Manager > Business Settings > Partners" },
    ],
    tellMeMore:
      "BSP stands for Business Solution Provider. This is the technical term for a company that connects your number to the WhatsApp API. Ask them to release it.",
  },
  {
    id: "step-3",
    number: 3,
    title: "Disable Your Two-Step PIN (if set)",
    estimatedTime: "2 min",
    actions: [
      { label: "In Meta Business Manager, go to Business Settings > WhatsApp Accounts" },
      { label: "Select your account, then click the phone number" },
      { label: "Click Manage, then Two-Step Verification, then Disable" },
    ],
    tellMeMore:
      "Skip this step if you never set up a two-step verification PIN. This is separate from your Facebook password.",
  },
  {
    id: "step-4",
    number: 4,
    title: "Wait for Release",
    estimatedTime: "24-48 hours",
    actions: [
      { label: "I understand I need to wait 24-48 hours before connecting to Rio" },
      { label: "I have bookmarked this page to come back later" },
    ],
    warningCallout:
      "Meta needs 24 to 48 hours to release your number. Do not connect to Rio during this time. You will know it is ready when your number no longer shows a provider under Business Settings > Partners.",
  },
  {
    id: "step-5",
    number: 5,
    title: "Connect to Rio",
    estimatedTime: "5 min",
    actions: [],
    successState: {
      title: "Your waiting period is over. Now connect your number to Rio.",
      bullets: [
        "Your number should now be free from your previous provider.",
        "Follow the steps in Path B to complete the connection.",
      ],
      ctaLabel: "Continue with Path B \u2192",
      ctaHref: "/path-b",
    },
  },
];
