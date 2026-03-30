import type { StepData } from "./types";

export const pathESteps: StepData[] = [
  {
    id: "step-1",
    number: 1,
    title: "Check Your Phone Number Status in Meta",
    estimatedTime: "2 min",
    actions: [
      { label: "Open your WhatsApp accounts in Meta Business Settings", href: "https://business.facebook.com/settings/whatsapp_account/" },
      { label: "Click into your WhatsApp account from the list on the left." },
      { label: "Click the Phone Numbers tab." },
      { label: "Find your phone number and check its Status column." },
    ],
    screenshotSrc: "/screenshot-bm-whatsapp-phone-numbers.png",
    whatYouShouldSee: "Your phone number listed under the Phone Numbers tab with a status shown.",
    tellMeMore:
      "This confirms your WABA and phone number are fully registered for Cloud API. If the status is not Connected or Active, your WABA exists but the registration is not complete. Contact Rio support before continuing.",
    warningCallout:
      "If you see another provider listed next to your number, your account is already connected to a different service. You need the migration path, not this one.",
    commonErrors: [
      {
        title: "Another provider is connected to my number",
        description:
          "Your number is partner-locked to another WhatsApp provider. Rio cannot connect until that provider releases the number.",
        screenshotSrc: "/screenshot-bm-waba-partner-lock.png",
        isDeadEnd: true,
        deadEndNote:
          "Go back to the start and select 'Yes, I am migrating from another provider' to follow the migration path.",
      },
      {
        title: "My number status is not Connected",
        description:
          "Your WABA exists but the phone number has not been fully registered for Cloud API. This needs to be completed before Rio can connect.",
        isDeadEnd: true,
        deadEndNote:
          "Contact Rio support at support@joinrio.app. Share a screenshot of what you see and they will walk you through completing the registration.",
      },
    ],
  },
  {
    id: "step-2",
    number: 2,
    title: "Open Rio's Setup Link",
    estimatedTime: "1 min",
    actions: [
      { label: "Log in to Rio and click \"Connect WhatsApp\"", href: "https://www.joinrio.app/login" },
      { label: "A popup window from Facebook will open. Do not close it." },
      { label: "Log in with your Facebook account in the popup." },
    ],
    whatYouShouldSee: "A Facebook login screen inside the popup window.",
    tellMeMore:
      "Popup blockers may prevent this from opening. Look for a notification in your browser address bar and choose Allow popups from Rio.",
  },
  {
    id: "step-3",
    number: 3,
    title: "Select Your Business Portfolio and Existing Account",
    estimatedTime: "2 min",
    actions: [
      { label: "Select your Business Portfolio from the dropdown." },
      { label: "In the WhatsApp Business account section, open the dropdown." },
      { label: "Select your existing account from the list. Do not click Create or Connect." },
      { label: "Click Continue." },
    ],
    screenshotPlaceholder:
      "TODO: Screenshot needed — Meta embedded signup WhatsApp Business account dropdown showing an existing account name in the list (not the Create or Connect options). To get this: log in to Rio, click Connect WhatsApp, pick your Business Portfolio, then open the WhatsApp Business account dropdown before selecting anything.",
    tellMeMore:
      "Your existing WhatsApp Business Account should appear as an option in the dropdown. If it does not appear, it may be under a different Business Portfolio or may not be fully registered.",
    warningCallout:
      "Do not select 'Create a WhatsApp Business account' or 'Connect a WhatsApp Business App'. Look for your existing account name in the dropdown.",
    commonErrors: [
      {
        title: "My account does not appear in the dropdown",
        description:
          "Your WABA may be under a different Business Portfolio, or it may not be fully registered yet.",
        isDeadEnd: true,
        deadEndNote:
          "Check that you selected the correct Business Portfolio. If the account still does not appear, contact Rio support.",
      },
    ],
  },
  {
    id: "step-4",
    number: 4,
    title: "Confirm Permissions",
    estimatedTime: "1 min",
    actions: [
      { label: "Review the permissions Rio is requesting." },
      { label: "Click Continue or Allow." },
    ],
    screenshotSrc: "/screenshot-create-waba-review-permissions.png",
  },
  {
    id: "step-5",
    number: 5,
    title: "You're Connected!",
    estimatedTime: "",
    actions: [],
    successState: {
      title: "Your WhatsApp Business account is now connected to Rio.",
      bullets: [
        "Your display name is being reviewed by Meta. This can take a few minutes to a few days. Your number works while they review it.",
        "To send first messages to customers, you will need to set up message templates in Rio.",
      ],
      ctaLabel: "Go to Rio Dashboard",
      ctaHref: "https://app.joinrio.app",
    },
  },
];
