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
          "Your account has reached its phone number limit. Follow the steps below to remove an existing WhatsApp account from your Business Portfolio, then return here and try again.",
        screenshotSrc: "/screenshot-error-wba-number-limit.png",
        isDeadEnd: true,
        fixSteps: [
          { label: "Go to business.facebook.com", href: "https://business.facebook.com" },
          { label: "In the left sidebar, click Accounts → WhatsApp accounts." },
          { label: "Select the WhatsApp account you want to remove." },
          { label: "Click the three-dot menu (⋯) in the top right of the account panel." },
          { label: 'Choose "Remove from business portfolio".' },
          { label: "Return to this page and try again." },
        ],
        fixScreenshotSrc: "/screenshot-fix-remove-waba-from-portfolio.png",
        fixNote: "After removing, wait at least 3 minutes before trying again. It can take up to 24 hours to clear. In most cases, waiting a few hours solves the problem.",
        subFix: {
          trigger: "If you get a permission error when trying to remove:",
          steps: [
            { label: 'Click "Assign People" on the WhatsApp account.' },
            { label: "Select yourself from the list." },
            { label: 'Under Full control, enable "Everything".' },
            { label: 'Click "Assign".' },
            { label: "Then retry step 5 above." },
          ],
          screenshotSrc: "/screenshot-fix-assign-full-control.png",
        },
      },
      {
        branchId: "C1.II",
        title: "The business is already sharing this WhatsApp Business Account with a partner. Switching partners is not supported in this flow.",
        description:
          "You need to remove the WhatsApp account from your Business Portfolio first, then return here to connect Rio as the new partner.",
        screenshotSrc: "/screenshot-error-wba-already-sharing-partner.png",
        isDeadEnd: true,
        fixSteps: [
          { label: "Go to business.facebook.com", href: "https://business.facebook.com" },
          { label: "In the left sidebar, click Accounts → WhatsApp accounts." },
          { label: "Find your WhatsApp account in the list and select it." },
          { label: "Click the three-dot menu (⋯) in the top right of the account panel." },
          { label: 'Choose "Remove from business portfolio".' },
          { label: "Return to this page and try again." },
        ],
        fixScreenshotSrc: "/screenshot-fix-remove-wba-partner-portfolio.png",
        fixNote: "After removing, wait at least 3 minutes before trying again. It can take up to 24 hours to clear. In most cases, waiting a few hours solves the problem.",
        subFix: {
          trigger: "If you get a permission error when trying to remove:",
          steps: [
            { label: 'Click "Assign People" on the WhatsApp account.' },
            { label: "Select yourself from the list." },
            { label: 'Under Full control, enable "Everything".' },
            { label: 'Click "Assign".' },
            { label: 'Then retry "Remove from business portfolio" (step 5 above).' },
          ],
          screenshotSrc: "/screenshot-fix-assign-full-control.png",
        },
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
